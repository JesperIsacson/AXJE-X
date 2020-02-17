const db = require('./db')

exports.createAccount = function(account, callback){
    const query = "INSERT INTO Users (_email, _username, _firstName, _lastName, _dateOfBirth, _gender, _password) VALUES (?, ?, ?, ?, ?, ?, ?)"
    const values = [account.email, account.userName, account.firstName, account.lastName, account.dateOfBirth, account.gender, account.password]

    db.query(query, values, function(error){
        console.log(error)
        callback(error)
    })
}