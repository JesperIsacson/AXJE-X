const activityRepository = require('../dal/activityRepository')

exports.getAllActivities = function(callback){
    activityRepository.getAllActivities(function(error, activity){
        if(error){
            callback(error)
        } else{
            callback(null, activity)
        }
    })
}

exports.getActivityById = function(id, callback){
    activityRepository.getActivityById(id, function(error, activity){
        if(error){
            callback(error)
        } else{
            callback(null, activity)
        }
    })
}

exports.createActivity = function(activity, callback){
    const validationErrors = []

    console.log(activity)

    if(activity.title.length < 2 || activity.title.length > 20){
        validationErrors.push("Invalid title")
    }

    if(activity.location.length < 2 || activity.location.length > 20){
        validationErrors.push("Invalid location")
    }

    if(activity.description.length < 2 || activity.description.length > 140){
        validationErrors.push("Invalid description")
    }

    if(activity.date.length = ""){
        validationErrors.push("Invalid date")
    }

    if(activity.time.length = ""){
        validationErrors.push("Invalid time")
    }

    if(validationErrors == 0){
        activityRepository.createActivity(activity, function(error, id){
            if(error){
                console.log(error)
                callback(error)
            }
            else{
                callback(null, id)
            }
        })
    }
    
}


