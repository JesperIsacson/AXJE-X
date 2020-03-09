const db = require('./db2')
const Users = require('./models/users')
const sequelize = require('sequelize')

const Op = sequelize.Op

module.exports = function({}){

    return{
        getUserByUsername: function(username, callback){
            Users.findAll({
                raw: true,
                where: {
                    _username: username
                }
            })
            .then(user =>{
                callback(null, user)
            })
            .catch(error =>{
                callback(error)
            })
        },


        getUserByEmail: function(email, callback){
            Users.findAll({
                raw: true,
                where: {
                    _email: email
                }
            })
            .then(user =>{
                callback(null, user)
            })
            .catch(error =>{
                callback(error)
            })
        },


        updateProfile: function(newUser, callback){
            Users.update({
                _username: newUser._username,
                _firstName: newUser._firstName,
                _lastName: newUser._lastName,
                _weight: newUser._weight,
                _height: newUser._height
            },
            {where: {_email: newUser._email}}
            )
            .then(user =>{
                callback(null, user)
            })
            .catch(error =>{
                callback(error)
            })
        },


        deleteProfile: function(email, callback){
            Users.destroy({
                where: {
                    _email: email
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