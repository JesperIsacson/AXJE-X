const db = require("./db")

exports.getAllActivities = function(callback){
    const query = "SELECT * FROM activities"

    db.all(query, function(error, activity){
        callback(error, activity)
    })
}

exports.getActivityById = function(id, callback){
    const query = "SELECT * FROM activities WHERE _id = ?"
    const values = [id]

    db.get(query, values, function(error, activity){
        callback(error, activity)
    })
}

exports.createActivity = function(activity, callback){
    const query = "INSERT INTO activities (_id, _activityName, _activityDate, _activityTime, _activityLocation, _activityDescription) VALUES (?, ?, ?, ?, ?, ?)"
    const values = [title, date, time, location, description]

    db.query(query, values, function(error){
        const id = this.lastID
        callback(error, id)
    })
}