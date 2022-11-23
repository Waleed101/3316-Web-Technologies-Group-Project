const sql = require('../dbseed.js')

const MAX_TRACKS_TO_RETURN = 50

const Track = function(track) {
    this.id = track.id
    this.title = track.title
    this.albumID = track.albumID
    this.artistID = track.artistID
    this.dateRecorded = track.dateRecorded
    this.datePublished = track.datePublished
    this.duration = track.duration
    this.interest = track.interest
    this.listens = track.listens
    this.genres = track.genres
    this.tags = track.tags
    this.trackNum = track.trackNum
}

Track.create = (newTrack, result) => {
    console.log(newTrack)
    sql.query(`INSERT INTO track SET id=${newTrack.id}, title="${newTrack.title}", albumID=${newTrack.albumID}, artistID=${newTrack.artistID}` +
    `, dateRecorded="${newTrack.dateRecorded}", datePublished="${newTrack.datePublished}", duration="${newTrack.duration}", interest=${newTrack.interest},` +
    `listens=${newTrack.listens}, genres="[${newTrack.genres}]", tags="${newTrack.tags}", trackNum=${newTrack.trackNum}`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        console.log("Created Track: ", { id: res.insertId, ...newTrack })
        result(null, { id: res.insertId, ...newTrack })

    })
}

Track.findById = (id, result) => {

    let query = `SELECT DISTINCT id, title, albumID, artistID, datePublished, duration, interest, listens, artistName, genres FROM 
                    (SELECT * FROM track t
                    JOIN (SELECT id as artist, name as artistName FROM artist) AS a
                    ON t.artistID = a.artist
                    JOIN (
                            SELECT * FROM trackGenre
                            JOIN (SELECT id as gId, title as gTitle FROM genre) as genre
                            ON genre.gId = trackGenre.genreID
                        ) as g
                    ON t.id = g.trackID
                    WHERE id=${id}) as res`

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        
        res["albumName"] = res["name"]
        delete res["name"]
        
        if (res[0]['genres'] != "[undefined]") {
            let genresToSearch = res[0]['genres'].replace("[", "(")
            genresToSearch = genresToSearch.replace("]", ")")
            
            sql.query(`SELECT * FROM genre WHERE id in ${genresToSearch}`, (eGenres, rGenres) => {
                res[0]['genres'] = rGenres
                
                console.log("Done.")
                result(null, res[0])
                return
            })
        }
    })
}

Track.getAll = (req, result) => {

    let artistQuery = req.artist ? `WHERE name LIKE '%${req.artist}%'` : ''
    let genreQuery = req.genre ? `WHERE genreID in (${req.genre.join(",")})` : ''
    let titleQuery = req.title ? `WHERE t.title LIKE '%${req.title}%'` : ''
    let idQuery = req.id ? `WHERE id in (${req.id})` : ''

    let query = `SELECT DISTINCT id, title, albumID, artistID, datePublished, duration, interest, listens, artistName, genres FROM 
                    (SELECT * FROM track t
                    JOIN (SELECT id as artist, name as artistName FROM artist ${artistQuery}) AS a
                    ON t.artistID = a.artist
                    JOIN (
                            SELECT * FROM trackGenre
                            JOIN (SELECT id as gId, title as gTitle FROM genre) as genre
                            ON genre.gId = trackGenre.genreID
                            ${genreQuery}
                        ) as g
                    ON t.id = g.trackID
                    ${titleQuery == '' ? idQuery : titleQuery}) as res`

    console.log(idQuery)
    console.log(query)

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
      
        res["albumName"] = res["name"]
        delete res["name"]
        
        for (let i = 0; i < res.length; i++) {
            if (res[i]['genres'] != "[undefined]") {
                let genresToSearch = res[i]['genres'].replace("[", "(")
                genresToSearch = genresToSearch.replace("]", ")")
                
                sql.query(`SELECT * FROM genre WHERE id in ${genresToSearch}`, (eGenres, rGenres) => {
                    res[i]['genres'] = rGenres

                    if ((i + 1) == res.length) {
                        console.log("Done.")
                        result(null, res)
                    }
                })
            }
        }
    })
}
  
Track.remove = (id, result) => {
    sql.query("DELETE FROM track WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            result({ans: "Not Found"}, null)
            return
        }

        console.log("Deleted Track with ID: ", id)
        result(null, res)
    })
}

Track.removeAll = result => {
    sql.query("DELETE FROM track", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} track`)
        result(null, res)
    })
}

module.exports = Track