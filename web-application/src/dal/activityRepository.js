const db = require("./db")

module.exports = function({}){

    return{
        getAllActivities: function(callback){
            
            const query = "SELECT * FROM Activities"

            db.query(query, function(error, activity){
                callback(error, activity)
            })
        },

        getActivityById: function(id, callback){
            
            const query = "SELECT * FROM Activities WHERE _id = ?"
            const values = [id]

            db.query(query, values, function(error, activity){
                callback(error, activity)
            })
        },

        createActivity: function(activity, callback){
            
            const query = "INSERT INTO Activities (_activityName, _activityDate, _activityTime, _activityLocation, _activityDescription, _datePosted) VALUES (?, ?, ?, ?, ?, ?)"
            const values = [activity.title, activity.date, activity.time, activity.location, activity.description, activity.datePosted]

            db.query(query, values, function(error){
                const id = this.lastID
                callback(error, id)
            })
        },

        updateActivity: function(activity, callback){

            const query = "UPDATE Activities SET _activityName = ?, _activityDate = ?, _activityTime = ?, _activityLocation = ?, _activityDescription = ? WHERE _id = ?"
            const values = [activity.title, activity.date, activity.time, activity.location, activity.description, activity.id]

            db.query(query, values, function(error){
                callback(error)
            })
        },

        deleteActivity: function(id, callback){

            const query = "DELETE FROM Activities WHERE _id = ?"

            db.query(query, [id], function(error){
                callback(error)
            })
        }

    }
}