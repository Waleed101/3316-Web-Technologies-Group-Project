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
    sql.query(`SELECT tracks FROM list WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        if(res.length) {
            let final = res[0]["tracks"].split(",")
            final[0] = final[0].slice(1)
            let l = final.length - 1
            final[l] = final[l].slice(0, final[l].length - 1)
            console.log("Found List: ", final)
            result(null, final)
            return
        }

        result({kind: "not_found"}, null)
    })
}

List.getAll = (name, result) => {
    let query = `SELECT name, tracks, totalPlayTime FROM list`

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        for(let i = 0; i < res.length; i+=1) {
            res[i]["numberOfTracks"] = res[i]["tracks"].split(",").length
            delete res[i]["tracks"]
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
            console.log("Not Found")
            result({kind: "not_found"}, null)
            return
        }

        console.log("Deleted List with Name: ", name)
        result(null, res)
    })
}

List.updateByName = (name, list, result) => {
    let query = `UPDATE list SET tracks = "${list.tracks}", totalPlayTime = ${list.totalPlayTime} WHERE name = "${name}"`
    console.log(query)
    
    sql.query(
      query,
      (err, res) => {
        if (err) {
          console.log("Error: ", err)
          result(null, err)
          return
        }
  
        if (res.affectedRows == 0) {
          result({kind: "not_found"}, null)
          return
        }
  
        console.log("Updated List: ", { name: name, ...list })
        result(null, { name: name, ...list })
      }
    )
}

module.exports = List