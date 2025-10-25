const mysql = require('mysql2')

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Admin@12",
    database: "airbnb"
})

module.exports = pool.promise()