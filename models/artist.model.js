const sql = require('../dbseed.js')

const Artist = function(artist) {
    this.id = artist.id
    this.name = artist.name
    this.yearStart = artist.yearStart
    this.yearEnd = artist.yearEnd
    this.bio = artist.bio
    this.contact = artist.contact
    this.dateCreated = artist.dateCreated
    this.handle = artist.handle
    this.location = artist.location
    this.members = artist.members
    this.tags = artist.tags
}

Artist.create = (newArtist, result) => {
    console.log(newArtist)
    sql.query(`INSERT INTO artist SET id=${newArtist.id}, name="${newArtist.name}", yearStart="${newArtist.yearStart}", yearEnd="${newArtist.yearEnd}"` +
    `, contact="${newArtist.contact}", dateCreated="${newArtist.dateCreated}", handle="${newArtist.handke}",` +
    `tags="${newArtist.tags}", location="${newArtist.location}", members="${newArtist.members}"`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        console.log("Created Artist: ", { id: res.insertId, ...newArtist })
        result(null, { id: res.insertId, ...newArtist })

    })
}

Artist.findById = (id, result) => {
    sql.query(`SELECT * FROM artist WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        if(res.length) {
            console.log("Found Artist: ", res[0])
            result(null, res[0])
            return
        }

        result({ans: "Not Found"}, null)
    })
}

Artist.getAll = (req, result) => {
    let query = `SELECT * FROM artist`
    let additional = ``

    if (req.name != undefined) {
        additional += ` WHERE name LIKE "%${req.name}%"`
    }

    if (req.members != undefined) {
        additional += ` WHERE members LIKE '%${req.members}%'`
    }

    query += additional

    console.log(query)

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
      
        // console.log("Artists: ", res);
        result(null, res);
    })
}
  
Artist.remove = (id, result) => {
    sql.query("DELETE FROM artist WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            result({ans: "Not Found"}, null)
            return
        }

        console.log("Deleted Artist with ID: ", id)
        result(null, res)
    })
}

Artist.removeAll = result => {
    sql.query("DELETE FROM artist", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} artists`)
        result(null, res)
    })
}

module.exports = Artist