const profileRepository = require('../dal/profileRepository')

exports.viewProfile = function(username, callback){
    const validationErrors = []

    if(username == "")
    {
        validationErrors.push("Failed to retrieve username")
    }

    if(validationErrors == 0){
        profileRepository.viewProfile(username, function(error, user){
            if(error){
                callback(error)
            }
            else{
                callback(null, user)
            }
        })
    }
    else{
        callback(validationErrors)
    }
}