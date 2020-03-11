const sequelize = require('sequelize')
const db = require('../db2')

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

const Comments = db.define('Comments', {
    _content:{
        type: sequelize.STRING,
        allowNull: false
    },
    _author:{
        type: sequelize.STRING,
        allowNull: false
    }
})

module.exports = Comments