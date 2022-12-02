const sql = require('../dbseed.js')
var similar = require('string-similarity')

const MAX_TRACKS_TO_RETURN = 50
const OPEN_TRACKS = 150000

const POSSIBLE_DISTANCE = 0.5

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
                    WHERE id=${id}) as res
                    LIMIT ${MAX_TRACKS_TO_RETURN}`

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

    let query = `SELECT DISTINCT id, title, albumID, artistID, datePublished, duration, interest, listens, artistName, genres FROM 
                    (SELECT * FROM track t
                    JOIN (SELECT id as artist, name as artistName FROM artist) AS a
                    ON t.artistID = a.artist
                    JOIN (
                            SELECT * FROM trackGenre
                            JOIN (SELECT id as gId, title as gTitle FROM genre) as genre
                            ON genre.gId = trackGenre.genreID
                            ${req.genre ? `WHERE genreID in (${req.genre.join(",")})` : ''}
                        ) as g
                    ON t.id = g.trackID
                    ${req.id == '' ? `WHERE id in (${req.id})` : ''}) as res
                    LIMIT ${req.id ? MAX_TRACKS_TO_RETURN : OPEN_TRACKS}`

    console.log(query)

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        let filteredResult = []

        var fuzzySearch = new Promise((resolve, reject) => {
            if(!req.id) {
                let resultCount = 0
                
                for (let i = 0; i < res.length; i++) {
                    var artistSimilar = req.artist ? similar.compareTwoStrings(req.artist, res[i]["artistName"]) : 1
                    var titleSimilar = req.title ? similar.compareTwoStrings(req.title, res[i]["title"]) : 1

                    if (artistSimilar >= POSSIBLE_DISTANCE && titleSimilar >= POSSIBLE_DISTANCE) {
                        filteredResult.push(res[i])
                        resultCount += 1
                    }

                    if (resultCount >= MAX_TRACKS_TO_RETURN || i == (res.length - 1)) {
                        if (resultCount == 0) {
                            console.log("No results...")
                            result(null, [])
                            return
                        }
                        resolve()
                    }
                }
            } else {
                filteredResult = res
                resolve()
            }
        })
        
        fuzzySearch.then(() => {
            for (let i = 0; i < filteredResult.length; i++) {
            
                filteredResult["albumName"] = filteredResult["name"]
                delete filteredResult["name"]
                if (filteredResult[i]['genres'] != "[undefined]") {
                    let genresToSearch = filteredResult[i]['genres'].replace("[", "(")
                    genresToSearch = genresToSearch.replace("]", ")")
                    
                    sql.query(`SELECT * FROM genre WHERE id in ${genresToSearch}`, (eGenres, rGenres) => {
                        filteredResult[i]['genres'] = rGenres
    
                        if ((i + 1) == filteredResult.length) {
                            console.log("Done.")
                            result(null, filteredResult)
                        }
                    })
                }
            }
        })
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