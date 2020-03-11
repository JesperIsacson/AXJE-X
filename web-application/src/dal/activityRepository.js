const db = require("./db2")
const Activities = require('./models/activities')
const sequelize = require('sequelize')

const Op = sequelize.Op

module.exports = function({}){

    return{
        getAllActivities: function(callback){  
            Activities.findAll({
                raw: true
            })
            .then(activities =>{
                callback(null, activities)
            })
            .catch(error =>{
                callback(error)
            })
        },

        getActivityById: function(id, callback){
            Activities.findAll({
                raw: true,
                where: {id: id}
            })
            .then(activity =>{
                callback(null, activity)
            })
            .catch(error =>{
                callback(error)
            })
        },

        createActivity: function(activity, username,  callback){
            Activities.create({
                _activityName: activity.title,
                _activityDate: activity.date,
                _activityTime: activity.time,
                _activityLocation: activity.location,
                _activityDescription: activity.description,
                _activityAuthor: username,
                UserEmail: activity.activityAuthor
            })
            .then(status =>{
                console.log(status)
                callback(null)
            })
            .catch(error =>{
                callback(error)
            })
        },

        updateActivity: function(activity, callback){
            Activities.update({
                _activityName: activity.title,
                _activityDate: activity.date,
                _activityTime: activity.time,
                _activityLocation: activity.location,
                _activityDescription: activity.description
            },
            {where: {id: activity.id}}
            )
            .then(status =>{
                callback(null)
            })
            .catch(error => {
                callback(error)
            })
        },

        deleteActivity: function(id, callback){
            Activities.destroy({
                where: {
                    id: id
                }
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