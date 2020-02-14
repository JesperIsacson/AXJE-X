const mysql = require("mysql")

const db = mysql.createConnection({
    host: "database",
    user: "root",
    password: "hemligt",
    database: "myDB"
})

exports.createActivity = function(activity, callback){
    const query = "INSERT INTO activities (_id, _activityName, _activityDate, _activityTime, _activityLocation, _activityDescription) VALUES (?, ?, ?, ?, ?, ?)"
    const values = [title, date, time, location, description]

    db.query(query, values, function(error){
        const id = this.lastID
        callback(error, id)
    })
}