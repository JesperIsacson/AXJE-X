const db = require('./db2')
const Users = require('./models/users')
const sequelize = require('sequelize')

const Op = sequelize.Op

module.exports = function({}){

    return{
        createAccount: function(account, callback){
            const data = {
                _email: account.email,
                _username: account.userName,
                _firstName: account.firstName,
                _lastName: account.lastName,
                _dateOfBirth: account.dateOfBirth,
                _gender: account.gender,
                _password: account.password
            }

            let {_email, _username, _firstName, _lastName, _dateOfBirth, _gender, _password} = data

            Users.create({_email, _username, _firstName, _lastName, _dateOfBirth, _gender, _password})
            .then(user => {
                callback(null, user._email)
            })
            .catch(error =>{
                callback(error)
            })
        },

        getLoginInformation: function(usernameOrEmail, callback){
            Users.findAll({
                raw: true,
                where: {
                    [Op.or]: [{_email: usernameOrEmail}, {_username: usernameOrEmail}]
                }
            })
            .then(user =>{
                callback(null, user)
            })
            .catch(error =>{
                callback(error)
            })
        }
    }
}