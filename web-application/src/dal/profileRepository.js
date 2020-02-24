const db = require('./db')

exports.viewProfile = function(username, callback){
    const query = "SELECT * FROM Users WHERE _username = ?"
    const values = [username]

    db.query(query, values, function(error, user){
        callback(error, user)
    })
}