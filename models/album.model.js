const sql = require('../dbseed.js')

const Album = function(album) {
    this.id = album.id
    this.artistID = album.artistID
    this.artistName = album.artistName
    this.dateReleased = album.dateReleased
    this.dateUploaded = album.dateUploaded
    this.handle = album.handle
    this.listens = album.listens
    this.title = album.title
    this.tracks = album.tracks
    this.tags = album.tags
    this.type = album.type
}

Album.create = (newAlbum, result) => {
    console.log(newAlbum)
    sql.query(`INSERT INTO album SET id=${newAlbum.id}, artistID=${newAlbum.artistID}, dateReleased="${newAlbum.dateReleased}", dateUploaded="${newAlbum.dateUploaded}"` +
    `, handle="${newAlbum.handle}", listens="${newAlbum.listens}", title="${newAlbum.title}", tracks=${newAlbum.tracks},` +
    `tags="${newAlbum.tags}", type="${newAlbum.type}", artistName="${newAlbum.artistName}"`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        console.log("Created Album: ", { id: res.insertId, ...newAlbum })
        result(null, { id: res.insertId, ...newAlbum })

    })
}

Album.findById = (id, result) => {
    sql.query(`SELECT * FROM album WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        if(res.length) {
            console.log("Found Album: ", res[0])
            result(null, res[0])
            return
        }

        result({ans: "Not Found"}, null)
    })
}

Album.getAll = (req, result) => {
    let query = `SELECT * FROM album`

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

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
      
        console.log("Albums: ", res);
        result(null, res);
    })
}
  
Album.remove = (id, result) => {
    sql.query("DELETE FROM album WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            result({ans: "Not Found"}, null)
            return
        }

        console.log("Deleted Album with ID: ", id)
        result(null, res)
    })
}

Album.removeAll = result => {
    sql.query("DELETE FROM album", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} album`)
        result(null, res)
    })
}

module.exports = Album