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

exports.updateProfile = function(user, callback){
    const validationErrors = []

    if(user._firstName.length < 2 || user._firstName.length > 20){
        validationErrors.push("Invalid first name")
    }
    if(user._lastName.length < 2 || user._lastName.length > 20){
        validationErrors.push("Invalid last name")
    }
    if(user._username.length < 3 || user._username.length > 14){
        validationErrors.push("Invalid username")
    }
    if(isNaN(user._height)){
        validationErrors.push("Invalid height")
    }
    if(isNaN(user._weight)){
        validationErrors.push("Invalid weight")
    }

    if(validationErrors == 0){
        profileRepository.updateProfile(user, function(error){
            if(error){
                callback(error)
            }
            else{
                profileRepository.getUserByEmail(user._email, function(error, user){
                    if(error){
                        console.log(error)
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
        })
    }
    else{
        callback(error)
    }
}