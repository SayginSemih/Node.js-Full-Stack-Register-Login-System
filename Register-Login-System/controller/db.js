const mysql = require("mysql2");

let con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'users'
});

module.exports = con;

