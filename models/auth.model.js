const sql = require('../dbseed.js');

const bcrypt = require("bcrypt");
const saltRounds = 11;

/*
    Status:
    1 => Activated
    2 => Deactiviated

    Role:
    1 => Normal
    2 => Admin
*/

const Auth = function(auth) {
    this.email = auth.email;
    this.password = auth.password;
    this.name = auth.name
    this.status = auth.status
}

Auth.register = (auth, result) => {
    bcrypt.hash(auth.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }

        sql.query(
            "INSERT INTO account (email, password, status, role, name) VALUES (?,?,?,?,?)",
            [auth.email, hash, 1, "1", auth.name],
            (err, res) => {
                if (err) {
                    console.log("Error: " + err)
                    result(err, null)
                    return
                }

                result(null, res)
            }
        )
    })
}

Auth.login = (auth, result) => {
    sql.query(
        "SELECT * FROM account WHERE email = ?;",
        auth.email,
        (err, res) => {
            if (err) {
                console.log("Error: " + err)
                result(err, null)
                return
            }

            if (res.length > 0) {
                bcrypt.compare(auth.password, res[0].password, (error, response) => {
                    console.log(response)
                    if (response) {
                        console.log(res)
                        result(null, res[0])
                    } else {
                        result({ message: "Wrong email & password combination."}, null)
                    }
                })
            } else {
                result({ message: "User with that email doesn't exist."}, null)                
            }
        }
    )
}


Auth.updatePassword = (auth, result) => {
    console.log("w")
    bcrypt.hash(auth.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }
    sql.query(
        `UPDATE account SET password = '${hash}' WHERE email = '${auth.email}';`,
        (err, res) => {
            if (err) {
                console.log("Error: " + err)
                result(err, null)
                return
            }
            console.log(res)
            result({ message: `Password was updated for: ${auth.email}`})
        }
    )
    })
}

Auth.delete = (auth, result) => {
    console.log(auth.email)
    sql.query(
        `DELETE FROM account WHERE email = '${auth.email}';`,
        (err, res) => {
            if (err) {
                console.log("Error: " + err)
                result(err, null)
                return
            }
            console.log(res)
            result({ message: `Deleted account associated to: ${auth.email}`})
        }
    )
}

Auth.setActivation = (auth, result) => {
    console.log(auth.email)
    sql.query(
        `UPDATE account SET status = ${auth.status} WHERE email = '${auth.email}';`,
        (err, res) => {
            if (err) {
                console.log("Error: " + err)
                result(err, null)
                return
            }
            console.log(res)
            result({ message: `Updated status of account associated to: ${auth.email}`})
        }
    )
}

Auth.setAdmin = (auth, result) => {
    console.log(auth.email, "t")
    sql.query(
        `UPDATE account SET role = '2' WHERE email = '${auth.email}';`,
        (err, res) => {
            if (err) {
                console.log("Error: " + err)
                result(err, null)
                return
            }
            console.log(res)
            result({ message: `Updated admin access of account associated to: ${auth.email}`})
        }
    )
}

module.exports = Auth