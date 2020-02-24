const profileRepository = require('../dal/profileRepository')

exports.getUserByUsername = function(username, callback){
    const validationErrors = []

    if(username == "")
    {
        validationErrors.push("Failed to retrieve username")
    }

    if(validationErrors == 0){
        profileRepository.getUserByUsername(username, function(error, user){
            if(error){
                callback(error)
            }
            else if(user != 0){
                callback(null, user)
            }
            else{
                validationErrors.push("No one by that username")
                callback(validationErrors)
            }
        })
    }
    else{
        callback(validationErrors)
    }
}

exports.getUserByEmail = function(email, callback){
    const validationErrors = []
    
    if(email == null){
        console.log("Must be logged in")
    }

    if(validationErrors == 0){
        profileRepository.getUserByEmail(email, function(error, user){
            if(error){
                callback(error)
            }
            else if(user != 0){
                callback(null, user)
            }
            else{
                validationErrors.push("You need to be logged in")
                callback(validationErrors)
            }
        })
    }
    else{
        callback(validationErrors)
    }
}

exports.manageProfile = function(email, callback){
    const validationErrors = []

    if(email == null){
        console.log("Must be logged in")
    }

    if(validationErrors == 0){

    }
}