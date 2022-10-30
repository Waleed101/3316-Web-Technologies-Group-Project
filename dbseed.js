const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "database-1.cjrkveiinmqa.us-east-1.rds.amazonaws.com",
    port: '3306',
    user: "admin",
    password: "Waleed123-"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    conn.query('CREATE DATABASE IF NOT EXISTS my_db;');
    conn.query('USE my_db;');
    conn.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });
    conn.end();
});