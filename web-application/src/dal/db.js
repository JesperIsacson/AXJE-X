const mysql = require('mysql')

const dbConnect = mysql.createConnection({
    host: "database",
    user: "root",
    password: "hemligt",
    database: "webAppDatabase"
})

module.exports = dbConnect