require('dotenv').config();
const mysql = require('mysql2/promise');

const connPromise = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    namedPlaceholders: true,
});

connPromise
    .then(conn => {
        console.log("Database Connected");
    })
    .catch(err => {
        console.log("Failed to connect database")
    })

module.exports = connPromise;