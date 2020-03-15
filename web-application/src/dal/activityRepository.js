const db = require("./db2")
const Activities = require('./models/activities')
const sequelize = require('sequelize')

const Op = sequelize.Op

module.exports = function ({ }) {

    return {
        getAllActivities: function (callback) {
            Activities.findAll({
                raw: true
            })
                .then(activities => {
                    callback(null, activities)
                })
                .catch(error => {
                    callback(error)
                })
        },

        getActivityById: function (id, callback) {
            Activities.findAll({
                raw: true,
                where: { id: id }
            })
                .then(activity => {
                    callback(null, activity)
                })
                .catch(error => {
                    callback(error)
                })
        },

        createActivity: function (activity, username, callback) {
            Activities.create({
                _activityName: activity.title,
                _activityDate: activity.date,
                _activityTime: activity.time,
                _activityLocation: activity.location,
                _activityDescription: activity.description,
                _activityAuthor: username,
                UserEmail: activity.activityAuthor
            })
                .then(activity => {
                    callback(null, activity)
                })
                .catch(error => {
                    callback(error)
                })
        },

        updateActivity: function (activity, userEmail, callback) {
            Activities.update({
                _activityName: activity.title,
                _activityDate: activity.date,
                _activityTime: activity.time,
                _activityLocation: activity.location,
                _activityDescription: activity.description
            },
                {
                    where: {
                        [Op.and]: [{ id: activity.id }, { UserEmail: userEmail }]
                    }
                })
                .then(status => {
                    callback(null)
                })
                .catch(error => {
                    callback(error)
                })
        },

        deleteActivity: function (id, userEmail, callback) {
            Activities.destroy({
                where: {
                    [Op.and]: [{ id:id }, { UserEmail: userEmail }]
                }
            })
                .then(status => {
                    callback(null)
                })
                .catch(error => {
                    callback(error)
                })
        },

        getAllActivitiesByUser: function (username, callback) {
            Activities.findAll({
                raw: true,
                where: {
                    _activityAuthor: username
                }
            })
                .then(activities => {
                    callback(null, activities)
                })
                .catch(error => {
                    callback(error)
                })
        }

    }
}