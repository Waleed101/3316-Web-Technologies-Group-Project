const sql = require('../dbseed.js')

const List = function(list) {
    this.name = list.name
    this.tracks = list.tracks
    this.totalPlayTime = list.totalPlayTime
    this.description = list.description
    this.isPublic = list.isPublic
}

List.create = (newList, result) => {
    
    let query = `SELECT COUNT(1) as numOfLists FROM list WHERE createdBy="${newList.user}"`

    sql.query(query, (err, res) => {
        if (res[0].numOfLists >= 20) {
            result({message: `You've already created your maximum number of lists (${res[0].numOfLists}).`}, null)
            return
        } else {
            let lists = "(" + newList.tracks.join(",") + ")" 

        query = `SELECT id, duration FROM track WHERE id in ${lists}`

        console.log(query)
        
            sql.query(query, (err, res) => {
                if(err) {
                    console.log("Error: ", err)
                    result(null, err)
                    return
                }

                let totalDuration = 0

                res.forEach(val => {
                    const time = val.duration.split(":")
                    totalDuration += (parseInt(time[0]) * 60 + parseInt(time[1]))
                })

                console.log(totalDuration)

                sql.query(`INSERT INTO list SET name="${newList.title}", createdBy="${newList.user}", tracks="${newList.tracks.join(",")}",
                            totalPlayTime=${totalDuration}, description="${newList.description}", isPublic=${newList.isPublic ? 1 : 0}`, (err, res) => {
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
    let removeTracks = true

    if(name) {
        query += ` WHERE name = "${name}"`
        removeTracks = false
    }

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if(removeTracks) {
            for(let i = 0; i < res.length; i+=1) {
                res[i]["numberOfTracks"] = res[i]["tracks"].split(",").length
                delete res[i]["tracks"]
            }
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
    let lists = "(" + list + ")" 

    let query = `SELECT id, duration FROM track WHERE id in ${lists}`

    console.log(query)
    
    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(null, err)
            return
        }

        let totalDuration = 0

        res.forEach(val => {
            const time = val.duration.split(":")
            totalDuration += (parseInt(time[0]) * 60 + parseInt(time[1]))
        })

        query = `UPDATE list SET tracks = "${list}", totalPlayTime = ${totalDuration} WHERE name = "${name}"`
        
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
        
              result(null, { name: name, ...list })
            }
          )

    })

}

module.exports = List