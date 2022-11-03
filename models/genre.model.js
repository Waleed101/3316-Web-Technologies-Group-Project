const sql = require('../dbseed.js')

const Genre = function(genre) {
    this.id = genre.id
    this.parent = genre.parent
    this.title = genre.title
}

Genre.create = (newGenre, result) => {
    console.log(newGenre)
    sql.query(`INSERT INTO genre SET id=${newGenre.id}, parent=${newGenre.parent}, title="${newGenre.title}"`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        console.log("Created Genre: ", { id: res.insertId, ...newGenre })
        result(null, { id: res.insertId, ...newGenre })

    })
}

Genre.findById = (id, result) => {
    sql.query(`SELECT * FROM genre WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        if(res.length) {
            console.log("Found Genre: ", res[0])
            result(null, res[0])
            return
        }

        result({ans: "Not Found"}, null)
    })
}

Genre.getAll = (title, result) => {
    let query = `SELECT * FROM genre`

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`
    }

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
      
        // console.log("genres: ", res);
        result(null, res);
    })
}

Genre.updateById = (id, genre, result) => {
    sql.query(
      "UPDATE genre SET title = ? WHERE id = ?",
      [genre.title, id],
      (err, res) => {
        if (err) {
          console.log("Error: ", err)
          result(null, err)
          return
        }
  
        if (res.affectedRows == 0) {
          result({ans: "Not Found"}, null)
          return
        }
  
        console.log("Updated Genre: ", { id: id, ...genre })
        result(null, { id: id, ...genre })
      }
    )
}
  
Genre.remove = (id, result) => {
    sql.query("DELETE FROM genre WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            result({ans: "Not Found"}, null)
            return
        }

        console.log("Deleted Genre with ID: ", id)
        result(null, res)
    })
}

Genre.removeAll = result => {
    sql.query("DELETE FROM genre", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} genre`)
        result(null, res)
    })
}

module.exports = Genre