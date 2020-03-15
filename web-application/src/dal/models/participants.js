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
        setTimeout(seqConnect, 3000)
    })
}

seqConnect()

const Participants = db.define("Participants", {
    
    _username:{
        type: sequelize.STRING,
        allowNull: false
    }
})

module.exports = Participants