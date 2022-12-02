const sql = require('../dbseed.js')

const List = function(list) {
    this.name = list.name
    this.tracks = list.tracks
    this.totalPlayTime = list.totalPlayTime
    this.description = list.description
    this.isPublic = list.isPublic
    
}

List.create = (newList, result) => {
    
    console.log(newList)

    let query = `SELECT COUNT(1) as numOfLists FROM list WHERE createdBy="${newList.createdBy}"`

    sql.query(query, (err, res) => {
        if (res[0].numOfLists >= 20) {
            result({message: `You've already created your maximum number of lists (${res[0].numOfLists}).`}, null)
            return
        } else {

            let queryCheckName = `SELECT * FROM list WHERE name = '${newList.name}'`

            sql.query(queryCheckName, (err, res) => {
                if(!res || res.length != 0) {
                    console.log("Exisits...")
                    result({message: `A list with name ${newList.name} already exisits.`}, null)
                    return
                }

                let lists = "(" + newList.tracks.join(",") + ")" 

                query = `SELECT id, duration FROM track WHERE id in ${lists}`
            
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


                    sql.query(`INSERT INTO list SET name="${newList.name}", createdBy="${newList.createdBy}", tracks="${newList.tracks.join(",")}",
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

List.getAll = (info, result) => {
    console.log("Hello")
    let query = `SELECT * FROM list`
    let removeTracks = false

    if (info.isPublic){
        console.log('In tha loop')
        query+= ` WHERE isPublic = 1 ORDER BY updated DESC LIMIT 10`
        console.log(query)
    }
    else if(info.name) {
        query += ` WHERE name = "${info.name}" `
        removeTracks = false
    } else if (info.user) {
        query += ` WHERE createdBy = "${info.user}"`
        removeTracks = false
    }

    sql.query(query, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        for(let i = 0; i < res.length; i+=1) {
            res[i]["numberOfTracks"] = res[i]["tracks"].split(",").length
            if(removeTracks) {
                delete res[i]["tracks"]
            }
        }
        // var dates = {}
        // for(let i = 0; i < res.length; i++) {
        //     if(res[i]['updated']=='0000-00-00 00:00:00') {
        //         res[i]['updated']=res[i]['created']
        //     }
        //     console.log("Playlist"+res[i]['name']+" TIME "+res[i]['updated'])
        //     dates[i] = res[i]['updated'].toString()
        // }

        // console.log(typeof(dates[]))
        // // dates['1'] = new Date(2022-12-12T05:05:52.000Z).toString()

        // var items = Object.keys(dates).map(function(key) {
        //     return [key, dates[key]];
        //   });

        // items.sort(function(first, second) {
        //     return second[1] - first[1];
        //   });

        //   console.log(dates)
       
        // console.log(res[1]['updated'])    
        // for (i = 0; i < timeArr.length; i++)
        // console.log();        
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

List.update = (id, body, result) => {

    console.log(id)
    console.log(body)

    let query = `SELECT * FROM list WHERE id=${id} AND createdBy='${body.createdBy}'`

    console.log(query)

    var listExisitsAndUserOwns = new Promise((resolve, reject) => {
        sql.query(
            query,
            (err, res) => {
                if (err) {
                  console.log("Error: ", err)
                  result(null, err)
                  return
                }
          
                if (res.length == 0) {
                    console.log("Not Found")
                  result({kind: "not_found"}, null)
                  return
                }

                console.log(1)
                
                resolve()

            })
    })

    listExisitsAndUserOwns.then(() => {

        let lists = "(" + body.tracks + ")" 

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

            query = `UPDATE list SET name='${body.name}', description='${body.description}', tracks='${body.tracks}', 
                        totalPlaytime=${totalDuration}, isPublic=${body.isPublic ? 1 : 0}
                        WHERE id=${id}`

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
            
                    result(null, { name: body.name, ...body })
                }
            )     
        })        
    })

}

module.exports = List