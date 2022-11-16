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
    sql.query(`SELECT * FROM track WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        if(res.length) {

            sql.query(`SELECT * FROM album WHERE id = ${res[0]["albumID"]}`, (err, albumRes) => {
                console.log(`SELECT * FROM album WHERE id = ${res[0]["albumID"]}`)
                if(err) {
                    console.log("Error: ", err)
                    result(err, null)
                    return
                }

                if(albumRes.length) {
                    res[0]["album"] = albumRes
                } else {
                    console.log("Couldn't find the associated Album with ID " + res[0]["albumID"])
                    res[0]["album"] = [{"title": "Unknown"}]
                    // result({ans: "Not Found", more: "Couldn't find the associated Album with id " + res[0]["albumID"]}, null)
                }

                console.log(`SELECT * FROM artist WHERE id = ${res[0]["artistID"]}`)
                sql.query(`SELECT * FROM artist WHERE id = ${res[0]["artistID"]}`, (err, artistRes) => {
                    if(err) {
                        console.log("Error: ", err)
                        result(err, null)
                        return
                    }
    
                    if(artistRes.length) {
                        res[0]["artist"] = artistRes
                        
                        console.log("Found Artist: ", res[0])
                        result(null, res[0])
                        return
                    } else {
                        console.log("Couldn't find the associated Artist with ID " + res[0]["artistID"])
                        res[0]["artist"] = [{"name": "Unknown"}]
                        result(null, res[0])
                        // result({ans: "Not Found", more: "Couldn't find the associated Artist with id " + res[0]["artistID"]}, null)
                    }
                });
            });
        } else {
            console.log("Couldn't find any tracks with ID " + id)
            result({ans: "Not Found", more: "Couldn't find any tracks with ID " + id}, null)
        }        
    })
}

Track.getAll = (req, result) => {

    let artistQuery = req.artist ? `WHERE name LIKE '%${req.artist}%'` : ''
    let genreQuery = req.genre ? `WHERE genreID in (${req.genre.join(",")})` : ''
    let titleQuery = req.title ? `WHERE t.title LIKE '%${req.title}%'` : ''

    let query = `SELECT DISTINCT * FROM track t
                    JOIN (SELECT id as artistID, name FROM artist ${artistQuery}) AS a
                    ON t.artistID = a.artistID
                    JOIN (
                            SELECT * FROM trackGenre
                            JOIN (SELECT id as gId, title as gTitle FROM genre) as genre
                            ON genre.gId = trackGenre.genreID
                            ${genreQuery}
                        ) as g
                    ON t.id = g.trackID
                    ${titleQuery}`

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