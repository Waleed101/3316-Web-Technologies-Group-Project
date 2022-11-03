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
                    console.log(`SELECT * FROM artist WHERE id = ${res[0]["artistID"]}`)
                    sql.query(`SELECT * FROM artist WHERE id = ${res[0]["artistID"]}`, (err, artistRes) => {
                        if(err) {
                            console.log("Error: ", err)
                            result(err, null)
                            return
                        }
        
                        if(artistRes.length) {
                            res[0]["artist"] = artistRes
                            
                            console.log("Found Track: ", res[0])
                            result(null, res[0])
                            return
                        } else {
                            console.log("Couldn't find the associated Artist with ID " + res[0]["artistID"])
                            result({ans: "Not Found", more: "Couldn't find the associated Artist with id " + res[0]["artistID"]}, null)
                        }
                    });
                } else {
                    console.log("Couldn't find the associated Album with ID " + res[0]["albumID"])
                    result({ans: "Not Found", more: "Couldn't find the associated Album with id " + res[0]["albumID"]}, null)
                }
            });
        } else {
            console.log("Couldn't find any tracks with ID " + id)
            result({ans: "Not Found", more: "Couldn't find any tracks with ID " + id}, null)
        }        
    })
}

Track.getAll = (req, result) => {
    let query = `SELECT * FROM track`

    if (req.title) {
        query = `SELECT * FROM (((SELECT trackID
            FROM (
                    SELECT id as albumID 
                    FROM album
                    WHERE album.title LIKE '%${req.title}%'
            ) as album
            LEFT JOIN
            (
                    SELECT id as trackID, albumID
                    FROM track
                    WHERE track.title LIKE '%${req.title}%'
            ) as track
            on album.albumID = track.albumID)
            UNION 
            (SELECT trackID
            FROM (
                    SELECT id as albumID 
                    FROM album
                    WHERE album.title LIKE '%${req.title}%'
            ) as album
            RIGHT JOIN
            (
                    SELECT id as trackID, albumID
                    FROM track
                    WHERE track.title LIKE '%${req.title}%'
            ) as track
            on album.albumID = track.albumID)) LIMIT ${MAX_TRACKS_TO_RETURN}) 
            AS final WHERE trackID IS NOT NULL`
    }

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
      
        console.log("Tracks: ", res);
        result(null, res);
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