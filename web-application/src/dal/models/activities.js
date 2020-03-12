const sequelize = require('sequelize')
const db = require('../db2')
const Comments = require('./comments')
const Participants = require('./participants')

seqConnect = function(){
    db.authenticate()
    .then(function(){
        db.sync()
        console.log("connected")
    })
    .catch(function(){
        console.log("not connected")
        seqConnect()
    })
}

seqConnect()

const Activities = db.define("Activities", {
    
    _activityName:{
        type: sequelize.STRING,
        allowNull: false
    },
    _activityDate:{
        type: sequelize.STRING,
        allowNull: false
    },
    _activityTime:{
        type: sequelize.TIME,
        allowNull: false
    },
    _activityLocation:{
        type: sequelize.STRING,
        allowNull: false
    },
    _activityDescription:{
        type: sequelize.STRING,
        allowNull: false
    }
})

Activities.hasMany(Comments, {as: 'Comments'})
Activities.hasMany(Participants, {as: 'Participants'})

module.exports = Activities