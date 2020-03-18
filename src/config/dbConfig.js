const mysql = require('mysql');
const dotenv = require('dotenv/config')


const connection = mysql.createConnection({
    user: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`

});

module.exports = connection;


