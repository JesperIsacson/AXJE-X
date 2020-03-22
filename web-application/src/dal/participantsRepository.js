const Participants = require('./models/participants')
const sequelize = require('sequelize')

const Op = sequelize.Op

module.exports = function ({ }) {

    return {

        getAllParticipantsForActivity: function (activityId, callback) {
            Participants.findAll({
                raw: true,
                where: { ActivityId: activityId }
            })
                .then(participants => {
                    callback(null, participants)
                })
                .catch(error => {
                    callback(error)
                })
        },

        participateInActivity: function (user, activityId, callback) {
            Participants.create({
                raw: true,
                _username: user[0]._username,
                ActivityId: activityId,
                UserEmail: user[0]._email
            })
                .then(status => {
                    console.log("SKAPAD HASSE: ", status)
                    callback(null)
                })
                .catch(error => {
                    callback(error)
                })
        },

        unparticipateInActivity: function (activityId, userEmail, callback) {
            Participants.destroy({
                where: {
                    [Op.and]: [{ ActivityId: activityId }, { UserEmail: userEmail }]
                }
            })
                .then(status => {
                    callback(null)
                })
                .catch(error => {
                    callback(error)
                })
        },

        getUsersParticipation: function (activityId, userEmail, callback) {
            Participants.findAll({
                raw: true,
                where: {
                    [Op.and]: [{ ActivityId: activityId }, { UserEmail: userEmail }]
                }
            })
                .then(participation => {
                    callback(null, participation)
                })
                .catch(error => {
                    callback(error)
                })
        }
    }
}