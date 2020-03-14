const db = require("./db")

module.exports = function({}){

    return{
        getAllActivities: function(callback){
            
            const query = "SELECT * FROM Activities"

            db.query(query, function(error, activities){
                callback(error, activities)
            })
        },

        getActivityById: function(id, callback){
            
            const query = "SELECT * FROM Activities WHERE id = ?"
            const values = [id]

            db.query(query, values, function(error, activity){
                callback(error, activity)
            })
        },

        createActivity: function(activity, username, callback){
            const date = new Date()

            const query = "INSERT INTO Activities (_activityName, _activityDate, _activityTime, _activityLocation, _activityDescription, _activityAuthor, UserEmail, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
            const values = [activity.title, activity.date, activity.time, activity.location, activity.description, username, activity.activityAuthor, date]

            db.query(query, values, function(error){
                const id = this.lastID
                callback(error, id)
            })
        },

        updateActivity: function(activity, callback){

            const query = "UPDATE Activities SET _activityName = ?, _activityDate = ?, _activityTime = ?, _activityLocation = ?, _activityDescription = ? WHERE id = ?"
            const values = [activity.title, activity.date, activity.time, activity.location, activity.description, activity.id]

            db.query(query, values, function(error){
                callback(error)
            })
        },

        deleteActivity: function(id, callback){
            const query = "DELETE FROM Activities WHERE id = ?"
            const values = [id]

            db.query(query, values, function(error){
                callback(error)
            })
        },

        getAllActivitiesByUser: function (username, callback){
            const query = "SELECT * FROM Activities WHERE _activityAuthor = ?"
            const values = [username]

            db.query(query, values, function(error, activities){
                callback(error, activities)
            })
        }

    }
}