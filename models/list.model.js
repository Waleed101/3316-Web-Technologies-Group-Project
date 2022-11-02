const sql = require('../dbseed.js')

const List = function(list) {
    this.name = list.name
    this.tracks = list.tracks
    this.totalPlayTime = list.totalPlayTime
}

function getList(name) {
    result = false

   

    return result
}

List.create = (newList, result) => {
    sql.query(`SELECT id FROM list WHERE name = "${newList.name}"`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        if(res.length) {
            console.log(`List with name ${newList.name} exists.`)
            result({"message": "List already exists"}, null)
            return
        }

        sql.query(`INSERT INTO list SET name="${newList.name}", tracks="${newList.tracks}", totalPlayTime=${newList.totalPlayTime}`, (err, res) => {
            if(err) {
                console.log("Error: ", err)
                result(err, null)
                return
            }
    
            console.log("Created List: ", { id: res.insertId, ...newList })
            result(null, { id: res.insertId, ...newList })
        })
    })
    
}

List.findById = (id, result) => {
    sql.query(`SELECT * FROM list WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        if(res.length) {
            console.log("Found List: ", res[0])
            result(null, res[0])
            return
        }

        result({ans: "Not Found"}, null)
    })
}

List.getAll = (name, result) => {
    let query = `SELECT * FROM list`

    let additional = ``

    if (name) {
        additional += ` WHERE name LIKE '%${req.name}%'`
    }

    query += additional

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
      
        console.log("Lists: ", res);
        result(null, res);
    })
}
  
List.remove = (name, result) => {
    sql.query("DELETE FROM list WHERE name = ?", name, (err, res) => {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            result({ans: "Not Found"}, null)
            return
        }

        console.log("Deleted List with Name: ", name)
        result(null, res)
    })
}

List.updateByName = (name, list, result) => {
    sql.query(
      "UPDATE list SET tracks = ?, totalPlayTime = ? WHERE name = ?",
      [list.tracks, list.totalPlayTime, name],
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
  
        console.log("Updated List: ", { id: id, ...list })
        result(null, { id: id, ...list })
      }
    )
}

module.exports = List