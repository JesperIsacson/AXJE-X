const db = require("./db")

exports.getAllActivities = function(callback){
    
    const query = "SELECT * FROM Activities"

    db.query(query, function(error, activity){
        callback(error, activity)
    })
}

exports.getActivityById = function(id, callback){
    
    const query = "SELECT * FROM Activities WHERE _id = ?"
    const values = [id]

    db.query(query, values, function(error, activity){
        callback(error, activity)
    })
}

exports.createActivity = function(activity, callback){
    
    const query = "INSERT INTO Activities (_activityName, _activityDate, _activityTime, _activityLocation, _activityDescription) VALUES (?, ?, ?, ?, ?)"
    const values = [activity.title, activity.date, activity.time, activity.location, activity.description]

    db.query(query, values, function(error){
        const id = this.lastID
        callback(error, id)
    })
}