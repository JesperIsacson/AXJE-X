const db = require('./db')

exports.getUserByUsername = function(username, callback){
    const query = "SELECT * FROM Users WHERE _username = ?"
    const values = [username]

    db.query(query, values, function(error, user){
        callback(error, user)
    })
}

exports.getUserByEmail = function(email, callback){
    const query = "SELECT * FROM Users WHERE _email = ?"
    const values = [email]

    db.query(query, values, function(error, user){
        callback(error, user)
    })
}