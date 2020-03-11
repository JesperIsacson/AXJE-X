module.exports = function({activityRepository, commentRepository, profileRepository}){
    return{

        getAllActivities: function(callback){
            activityRepository.getAllActivities(function(error, activity){
                if(error){
                    callback(error)
                } else{
                    callback(null, activity)
                }
            })
        },

        getActivityById: function(id, callback){
            activityRepository.getActivityById(id, function(error, activity){
                if(error){
                    callback(error)
                } 
                else{
                    commentRepository.getAllCommentsForActivity(id, function(error, comments){
                        if(error){
                            callback(error)
                        }
                        else{
                            callback(error, activity, comments)
                        }
                    })
                }
            })
        },

        updateActivity: function(activity, callback){

            const validationErrors = []

            if(activity.title.length < 2 || activity.title.length > 40){
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
                activityRepository.updateActivity(activity, function(error){
                    if(error){
                        callback(error)
                    } else{
                        activityRepository.getActivityById(activity.id, function(error, activity){
                            if(error){
                                callback(error)
                            } else{
                                callback(null, activity)
                            }
                        })
                    }
                })
            } else{
                callback(validationErrors)
            }

        },

        deleteActivity: function(id, callback){
            activityRepository.deleteActivity(id, function(error){
                if(error){
                    callback(error)
                } else{
                    callback(null)
                }
            })
        },

        createActivity: function(activity, callback){
            const validationErrors = []


            if(activity.title.length < 2 || activity.title.length > 40){
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
            } else{
                callback(validationErrors)
            }
            
        }

    }
}