if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const mysql = require('mysql2');
var db = null;

module.exports = function () {
    if(!db) {
        db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DB
        });
    }
    return db;
};