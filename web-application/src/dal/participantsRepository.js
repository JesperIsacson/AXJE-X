const Participants = require('./models/participants')
const sequelize = require('sequelize')

const Op = sequelize.Op

module.exports = function({}){

    return{

        getAllParticipantsForActivity: function(activityId, callback){
            Participants.findAll({
                raw: true,
                where: {ActivityId: activityId}
            })
            .then(participants =>{
                callback(null, participants)
            })
            .catch(error =>{
                callback(error)
            })
        },

        participateInActivity: function(user, activityId, callback){
            Participants.create({
                _username: user[0]._username,
                ActivityId: activityId,
                UserEmail: user[0]._email
            })
            .then(status =>{
                callback(null)
            })
            .catch(error =>{
                callback(error)
            })
        }
    }
}