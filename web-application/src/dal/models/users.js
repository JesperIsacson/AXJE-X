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

const Users = db.define('Users', {
    _email:{
        type: sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    _username:{
        type: sequelize.STRING,
        unique: true,
        allowNull: false
    },
    _firstName:{
        type: sequelize.STRING,
        allowNull: false
    },
    _lastName:{
        type: sequelize.STRING,
        allowNull: false
    },
    _dateOfBirth:{
        type: sequelize.STRING,
        allowNull: false
    },
    _gender:{
        type: sequelize.STRING,
        allowNull: false
    },
    _password:{
        type: sequelize.STRING,
        allowNull: false
    },
    _weight:{
        type: sequelize.FLOAT
    },
    _height:{
        type: sequelize.FLOAT
    }

})

module.exports = Users