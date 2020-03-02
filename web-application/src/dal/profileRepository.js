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


exports.updateProfile = function(newUser, callback){
    const query = "UPDATE Users SET _username = ?, _firstName = ?, _lastName = ?, _weight = ?, _height = ? WHERE _email = ?"
    const values = [newUser._username, newUser._firstName, newUser._lastName, newUser._weight, newUser._height, newUser._email]

    db.query(query, values, function(error){
        callback(error)
    })
}


exports.deleteProfile = function(email, callback){
    const query = "DELETE FROM Users WHERE _email = ?"
    const values = [email]

    db.query(query, values, function(error){
        callback(error)
    })
}