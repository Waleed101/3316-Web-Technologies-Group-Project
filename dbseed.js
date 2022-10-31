const mysql = require('mysql');
const dbConfig = require('./config/db.config.js')

const conn = mysql.createConnection({
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the Database!");
    conn.query("CREATE TABLE IF NOT EXISTS `genre` (" +
                "id int NOT NULL," +
                "title varchar(255) NOT NULL," +
                "PRIMARY KEY(id))", function(error, result, fields) {
        if(error) throw error
        console.log(result);
    });
    // conn.end()
});

module.exports = conn