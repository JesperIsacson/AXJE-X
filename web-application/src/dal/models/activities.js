const sequelize = require('sequelize')
const db = require = require('../db2')

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

module.exports = Activities