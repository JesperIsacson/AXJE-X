const db = require("./db")

module.exports = function({}){
    
    return{
        getAllParticipantsForActivity: function(activityId, callback){
            const query = "SELECT * FROM Participants WHERE ActivityId = ?"
            const values = [activityId]

            db.query(query, values, function(error, participants){
                callback(error, participants)
            })
        },

        participateInActivity: function(user, activityId, callback){
            const query = "INSERT INTO Participants (_username, ActivityId, UserEmail) VALUES (?, ?, ?)"
            const values = [user[0]._username, activityId, user[0]._email]

            db.query(query, values, function(error){
                callback(error)
            })
        },

        unparticipateInActivity: function(activityId, userEmail, callback){
            const query = "DELETE FROM Participants WHERE ActivityId = ? AND UserEmail = ?"
            const values = [activityId, userEmail]

            db.query(query, values, function(error){
                callback(error)
            })
        }
    }
}