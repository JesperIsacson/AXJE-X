module.exports = function({profileRepository}){

    return {
        getUserByUsername: function(username, userEmail, callback){
            const validationErrors = []

            if(username == "")
            {
                validationErrors.push("Failed to retrieve username")
            }

            if(validationErrors == 0){
                profileRepository.getUserByUsername(username, function(error, user){
                    if(error){
                        validationErrors.push("databaseError")
                        callback(validationErrors)
                    }
                    else if(user != 0){
                                        
                        var profileAuth = false

                        if(userEmail == user[0]._email){
                            profileAuth = true
                        }

                        const theUser ={
                            _profileAuth : profileAuth,
                            _username : user[0]._username,
                            _firstName : user[0]._firstName,
                            _lastName : user[0]._lastName,
                            _dateOfBirth : user[0]._dateOfBirth,
                            _height : user[0]._height,
                            _weight : user[0]._weight,
                            _gender : user[0]._gender
                        }

                        callback(null, theUser)
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
        },

        getUserByEmail: function(email, callback){
            const validationErrors = []
            
            if(email == null){
                console.log("Must be logged in")
            }

            if(validationErrors == 0){
                profileRepository.getUserByEmail(email, function(error, user){
                    if(error){
                        validationErrors.push("databaseError")
                        callback(validationErrors)
                    }
                    else if(user != 0){
                        var profileAuth = false

                        if(email == user[0]._email){
                            profileAuth = true
                        }

                        const theUser = {
                        _profileAuth : profileAuth,
                        _username : user[0]._username,
                        _firstName : user[0]._firstName,
                        _lastName : user[0]._lastName,
                        _dateOfBirth : user[0]._dateOfBirth,
                        _height : user[0]._height,
                        _weight : user[0]._weight,
                        _gender : user[0]._gender
                        }


                        callback(null, theUser)
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
        },

        manageProfile: function(validator, callback){
            const validationErrors = []

            if(validator.email != null){
                profileRepository.getUserByEmail(validator.email, function(error, user){
                    if(error){
                        validationErrors.push("databaseError")
                        callback(validationErrors)
                    }
                    else if(validator.username == user[0]._username){
                        const theUser ={
                            _username: user[0]._username,
                            _firstName: user[0]._firstName,
                            _lastName: user[0]._lastName,
                            _height: user[0]._height,
                            _weight: user[0]._weight
                        }

                        callback(null, theUser)
                    }
                    else{
                        validationErrors.push("Unauthorized")
                        callback(validationErrors)
                    }
                })
            }
            else{
                validationErrors.push("You need to be logged in")
                callback(validationErrors)
            }
        },


        updateProfile: function(newUser, validator, callback){
            const validationErrors = []

            if(validator.email != null){
                profileRepository.getUserByEmail(validator.email, function(error, user){
                    if(error){
                        validationErrors.push("databaseError")
                        callback(validationErrors, newUser)
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
                                    validationErrors.push("databaseError")
                                    callback(validationErrors, newUser)
                                }
                                else{
                                    profileRepository.getUserByEmail(validator.email, function(error, user){
                                        if(error){
                                            validationErrors.push("databaseError")
                                            callback(validationErrors)
                                        }
                                        else{
                                            const theUser ={
                                                username: user[0]._username
                                            }

                                            callback(null, theUser)
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
                        validationErrors.push("Unauthorized")
                        callback(validationErrors, newUser)
                    }
                })
            }
            else{
                validationErrors.push("You need to be logged in")
                callback(validationErrors, newUser)
            }
            
        },


        deleteProfile: function(validator, callback){
            const validationErrors = []

            if(validator.email != null){
                profileRepository.getUserByEmail(validator.email, function(error, user){
                    if(error){
                        validationErrors.push("databaseError")
                        callback(validationErrors)
                    }
                    else if(validator.username == user[0]._username){
                        profileRepository.deleteProfile(validator.email, function(error){
                            callback(null)
                        })
                    }
                    else{
                        validationErrors.push("Unauthorized")
                        callback(validationErrors)
                    }
                })
            }
            else{
                validationErrors.push("You need to be logged in")
                callback(validationErrors)
            }
        }
    }

}