const sql = require('../dbseed.js')

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
            console.log("Found Track: ", res[0])
            result(null, res[0])
            return
        }

        result({ans: "Not Found"}, null)
    })
}

Track.getAll = (req, result) => {
    let query = `SELECT * FROM track`

    let additional = ``

    if (req.title) {
        additional += ` WHERE title LIKE '%${req.title}%'`
    }

    if (req.artistID) {
        if(additional == ``) {
            additional += ` WHERE `
        } else {
            additional += ` AND `
        }
        query += `artistID = ${req.artistID}`
    }

    if (req.albumID) {
        if(additional == ``) {
            additional += ` WHERE `
        } else {
            additional += ` AND `
        }
        query += `albumID = ${req.albumID}`
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