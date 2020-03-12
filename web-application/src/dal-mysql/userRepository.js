const db = require('./db')

module.exports = function({}){

    return{
        createAccount: function(account, callback){
            const query = "INSERT INTO Users (_email, _username, _firstName, _lastName, _dateOfBirth, _gender, _password) VALUES (?, ?, ?, ?, ?, ?, ?)"
            const values = [account.email, account.userName, account.firstName, account.lastName, account.dateOfBirth, account.gender, account.password]

            db.query(query, values, function(error){
                const createdEmail = values[0]
                callback(error, createdEmail)
            })
        },

        getLoginInformation: function(usernameOrEmail, callback){
            const query = "SELECT * Users WHERE _email = ? OR _username = ?"
            const values = [usernameOrEmail, usernameOrEmail]

            db.query(query, values, function(error, user){
                callback(error, user)
            })
        }
    }
}