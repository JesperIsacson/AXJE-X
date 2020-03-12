const Comments = require('./models/comments')
const sequelize = require('sequelize')

const Op = sequelize.Op

module.exports = function({}){
    return{

        createComment: function(packet, author, callback){
            Comments.create({
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
        },

        deleteComment: function(commentId, userEmail, callback){
            Comments.destroy({
                where:{
                    [Op.and]: [{id: commentId}, {UserEmail: userEmail}]
                }
            })
            .then(status =>{
                callback(null)
            })
            .catch(error =>{
                callback(error)
            })
        },

        getCommentById: function(commentId, callback){
            Comments.findAll({
                where:{
                    id: commentId
                }
            })
            .then(comment =>{
                callback(null, comment)
            })
            .catch(error =>{
                callback(error)
            })
        }

    }

}