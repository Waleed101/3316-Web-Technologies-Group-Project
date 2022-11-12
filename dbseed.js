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

    conn.query("CREATE TABLE IF NOT EXISTS `account` (" +
                "email varchar(255) NOT NULL," +
                "name varchar(255) NOT NULL," + 
                "password varchar(255) NOT NULL," + 
                "status int NOT NULL," +
                "role varchar(5) NOT NULL," + 
                "updated TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP," +
                "created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP," +
                "PRIMARY KEY (email))", function(error, result, fields) {
                    if (error) 
                        throw error
                    console.log(result)
                });

    // conn.query("CREATE TABLE IF NOT EXISTS `genre` (" +
    //             "id int NOT NULL," +
    //             "title varchar(255) NOT NULL," +
    //             "parent int," +
    //             "PRIMARY KEY(id))", function(error, result, fields) {
    //     if(error) throw error
    //     console.log(result);
    // });

    // conn.query("CREATE TABLE IF NOT EXISTS `track` (" +
    //             "id int NOT NULL," +
    //             "title varchar(255) NOT NULL," +
    //             "albumID int NOT NULL," +
    //             "artistID int NOT NULL," + 
    //             "dateRecorded varchar(255)," +
    //             "datePublished varchar(255)," +
    //             "duration varchar(255)," +
    //             "interest varchar(255)," +
    //             "listens varchar(255)," +
    //             "genres varchar(255)," +
    //             "tags varchar(255)," +
    //             "trackNum int," +
    //             "PRIMARY KEY(id))", function(error, result, fields) {
    //     if(error) throw error
    //     console.log(result);
    // });
    
    // conn.query("CREATE TABLE IF NOT EXISTS `artist` (" +
    //             "id int NOT NULL," +
    //             "name varchar(255) NOT NULL," +
    //             "yearStart varchar(50)," +
    //             "yearEnd  varchar(50)," + 
    //             "contact varchar(255)," +
    //             "dateCreated varchar(255)," +
    //             "handle varchar(255)," +
    //             "location varchar(255)," +
    //             "members varchar(255)," +
    //             "tags varchar(255)," +
    //             "PRIMARY KEY(id))", function(error, result, fields) {
    //     if(error) throw error
    //     console.log(result);
    // });

    //  conn.query("CREATE TABLE IF NOT EXISTS `list` (" +
    //             "id int NOT NULL AUTO_INCREMENT," +
    //             "name varchar(255) NOT NULL," +
    //             "tracks varchar(510) NOT NULL," +
    //             "totalPlayTime int NOT NULL," +
    //             "PRIMARY KEY(id))", function(error, result, fields) {
    //     if(error) throw error
    //     console.log(result);
    // });
    // conn.end()
});

module.exports = conn