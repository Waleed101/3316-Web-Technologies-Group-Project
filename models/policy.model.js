const sql = require('../dbseed.js')

const Policy = function(policy) {
    this.type = policy.type;
    this.content = policy.content;
}

Policy.getPolicy = (type, result) => {
    sql.query(`SELECT * FROM policy WHERE type = '${type}'`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        if(res.length) {
            result(null, res)
            return
        }

        result({kind: "not_found"}, null)
    })
}

Policy.update = (policy, result) => {
    sql.query(`UPDATE policy SET content = '${policy.content}' WHERE type = '${policy.type}'`, (err, res) => {
        if(err) {
            console.log("Error: ", err)
            result(err, null)
            return
        }
        if(res) {
            result(null, res)
            return
        }

        result({kind: "not_found"}, null)
    })
}

module.exports = Policy