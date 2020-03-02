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

exports.manageProfile = function(validator, callback){
    const validationErrors = []

    if(validator.email != null){
        profileRepository.getUserByEmail(validator.email, function(error, user){
            if(error){
                callback(error)
            }
            else if(validator.username == user[0]._username){
                callback(null, user)
            }
            else{
                validationErrors.push("You can not manage others profiles")
                callback(validationErrors)
            }
        })
    }
    else{
        validationErrors.push("You need to be logged in")
        callback(validationErrors)
    }
}


exports.updateProfile = function(newUser, validator, callback){
    const validationErrors = []

    if(validator.email != null){
        profileRepository.getUserByEmail(validator.email, function(error, user){
            if(error){
                callback(error, newUser)
            }
            else if(validator.username == user[0]._username){

                if(newUser._firstName.length < 2 || newUser._firstName.length > 20){
                    validationErrors.push("Invalid first name")
                }
                if(newUser._lastName.length < 2 || newUser._lastName.length > 20){
                    validationErrors.push("Invalid last name")
                }
                if(newUser._username.length < 3 || newUser._username.length > 14){
                    validationErrors.push("Invalid username")
                }
                if(isNaN(newUser._height)){
                    validationErrors.push("Invalid height")
                }
                if(isNaN(newUser._weight)){
                    validationErrors.push("Invalid weight")
                }

                if(validationErrors == 0){
                    profileRepository.updateProfile(newUser, function(error){
                        if(error){
                            callback(error, newUser)
                        }
                        else{
                            profileRepository.getUserByEmail(validator.email, function(error, user){
                                if(error){
                                    callback(error, newUser)
                                }
                                else{
                                    callback(null, user)
                                }
                            })
                        }
                    })
                }
                else{
                    callback(validationErrors, newUser)
                }
            }
            else{
                validationErrors.push("You can not update others profiles")
                callback(validationErrors, newUser)
            }
        })
    }
    else{
        validationErrors.push("You need to be logged in")
        callback(validationErrors, newUser)
    }
    
}


exports.deleteProfile = function(validator, callback){
    const validationErrors = []

    if(validator.email != null){
        profileRepository.getUserByEmail(validator.email, function(error, user){
            if(error){
                callback(error)
            }
            else if(validator.username == user[0]._username){
                profileRepository.deleteProfile(validator.email, function(error){
                    callback(null)
                })
            }
            else{
                validationErrors.push("You can not delete others accounts")
                callback(validationErrors)
            }
        })
    }
    else{
        validationErrors.push("You need to be logged in")
        callback(validationErrors)
    }
}