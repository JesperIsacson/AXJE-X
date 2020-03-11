const Comments = require('./models/comments')
const sequelize = require('sequelize')

const Op = sequelize.Op

module.exports = function({}){
    return{

        createComment: function(packet, author, callback){
            Comments.create({
                raw: true,
                _content: packet.content,
                _author: author,
                UserEmail: packet.activeUser,
                ActivityId: packet.activityId
            })
            .then(status =>{
                callback(null)
            })
            .catch(error =>{
                callback(error)
            })
        },

        getAllCommentsForActivity: function(activityId, callback){
            Comments.findAll({
                raw: true,
                where: {ActivityId: activityId}
            })
            .then(comments =>{
                callback(null, comments)
            })
            .catch(error =>{
                callback(error)
            })
        }

    }

}