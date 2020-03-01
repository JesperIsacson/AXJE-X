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


exports.updateProfile = function(user, callback){
    const query = "UPDATE Users SET _username = ?, _firstName = ?, _lastName = ?, _weight = ?, _height = ? WHERE _email = ?"
    const values = [user._username, user._firstName, user._lastName, user._weight, user._height, user._email]

    db.query(query, values, function(error){
        callback(error)
    })
}