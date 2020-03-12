const db = require("./db")

module.exports = function({}){

    return{
        createComment: function(packet, author, callback){
            const query = "INSERT INTO Comments (_content, _author, UserEmail, ActivityId) VALUES (?, ?, ?, ?)"
            const values = [packet.content, author, packet.activeUser, packet.activityId]

            db.query(query, values, function(error){
                callback(error)
            })
        },

        getAllCommentsForActivity: function(activityId, callback){
            const query = "SELECT * FROM Comments WHERE ActivityId = ?"
            const values = [activityId]

            db.query(query, values, function(error, comments){
                callback(error, comments)
            })
        },

        deleteComment: function(commentId, userEmail, callback){
            const query = "DELETE FROM Comments WHERE id = ? AND UserEmail = ?"
            const values = [commentId, userEmail]

            db.query(query, values, function(error){
                callback(error)
            })
        },

        getCommentById: function(commentId, callback){
            const query = "SELECT * FROM Comments WHERE id = ?"
            const values = [commentId]

            db.query(query, values, function(error, comment){
                callback(error, comment)
            })
        }

    }
}