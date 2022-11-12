const sql = require('../dbseed.js');

const saltRounds = 11;

/*
    Status:
    1 => Registered & Unverified
    2 => Verified
    3 => Deactiviated
*/

const Auth = function(auth) {
    this.email = email;
    this.password = password;
}

Auth.register = (auth, result) => {
    bcrypt.hash(auth.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }

        sql.query(
            "INSERT INTO account (email, password, status, role) VALUES (?,?,?,?)",
            [auth.email, hash, 1, "1"],
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
                    if (response) {
                        console.log(res)
                        result(null, result)
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


module.exports = Auth