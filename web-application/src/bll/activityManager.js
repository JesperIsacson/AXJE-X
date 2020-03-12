module.exports = function ({ activityRepository, commentRepository, profileRepository, participantsRepository }) {
    return {

        getAllActivities: function (userEmail, callback) {
            activityRepository.getAllActivities(function (error, activity) {
                if (error) {
                    callback(error)
                } else {
                    callback(null, activity)
                }
            })
        },

        getActivityById: function (id, userEmail, callback) {
            activityRepository.getActivityById(id, function (error, activity) {
                if (error) {
                    callback(error)
                }
                else {
                    profileRepository.getUserByEmail(activity[0].UserEmail, function (error, user) {
                        if (error) {
                            callback(error)
                        }
                        else {
                            commentRepository.getAllCommentsForActivity(id, function (error, comments) {
                                if (error) {
                                    callback(error)
                                }
                                else {
                                    participantsRepository.getAllParticipantsForActivity(id, function (error, participantsForActivity) {
                                        if (error) {
                                            callback(error)
                                        }
                                        else {
                                            const theParticipants = []
                                            var isParticipated = false 


                                            for (i = 0; i < participantsForActivity.length; i += 1) {
                                                participant = {
                                                    participant: participantsForActivity[i]._username
                                                }
                                                theParticipants.push(participant)

                                                if(userEmail == participantsForActivity[i].UserEmail){
                                                    isParticipated = true
                                                }
                                            }
                                            callback(null, activity, comments, user, theParticipants, isParticipated)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        },

        updateActivity: function (activity, userEmail, callback) {

            if (userEmail != null) {

                const validationErrors = []

                if (activity.title.length < 2 || activity.title.length > 40) {
                    validationErrors.push("Invalid title")
                }

                if (activity.location.length < 2 || activity.location.length > 20) {
                    validationErrors.push("Invalid location")
                }

                if (activity.description.length < 2 || activity.description.length > 140) {
                    validationErrors.push("Invalid description")
                }

                if (activity.date.length = "") {
                    validationErrors.push("Invalid date")
                }

                if (activity.time.length = "") {
                    validationErrors.push("Invalid time")
                }

                if (validationErrors == 0) {
                    activityRepository.updateActivity(activity, userEmail, function (error) {
                        if (error) {
                            callback(error)
                        } else {
                            activityRepository.getActivityById(activity.id, function (error, activity) {
                                if (error) {
                                    callback(error)
                                } else {
                                    callback(null, activity)
                                }
                            })
                        }
                    })
                }
                else{
                    callback(validationErrors, activity)
                }
            }
            else{
                validationErrors.push("You can't update other users activities")
            }
        },

        deleteActivity: function (id, userEmail, callback) {

            if (userEmail != null) {
                activityRepository.deleteActivity(id, userEmail, function (error) {
                    if (error) {
                        callback(error)
                    } else {
                        callback(null)
                    }
                })
            }
            else {
                validationErrors.push("You can't delete other users activities")
            }
        },

        createActivity: function (activity, callback) {
            const validationErrors = []


            if (activity.title.length < 2 || activity.title.length > 40) {
                validationErrors.push("Invalid title")
            }

            if (activity.location.length < 2 || activity.location.length > 20) {
                validationErrors.push("Invalid location")
            }

            if (activity.description.length < 2 || activity.description.length > 140) {
                validationErrors.push("Invalid description")
            }

            if (activity.date.length = "") {
                validationErrors.push("Invalid date")
            }

            if (activity.time.length = "") {
                validationErrors.push("Invalid time")
            }

            if (validationErrors == 0) {
                profileRepository.getUserByEmail(activity.activityAuthor, function (error, user) {
                    if (error) {
                        callback(error)
                    }
                    else {
                        if (error) {
                            callback(error)
                        }
                        else {
                            activityRepository.createActivity(activity, user[0]._username, function (error, id) {
                                if (error) {
                                    console.log(error)
                                    callback(error)
                                }
                                else {
                                    callback(null, id)
                                }
                            })
                        }
                    }
                })
            }
            else {
                callback(validationErrors)
            }

        },

        participateInActivity: function (activityId, userEmail, callback) {
            validationErrors = []

            if (userEmail != null) {
                profileRepository.getUserByEmail(userEmail, function (error, user) {
                    if (error) {
                        callback(error)
                    }
                    else if (userEmail == user[0]._email) {
                        participantsRepository.participateInActivity(user, activityId, function (error) {
                            if (error) {
                                callback(error)
                            }
                            else {
                                callback(null)
                            }
                        })
                    }
                    else {
                        validationErrors.push("You can not participate from others accounts.")
                        callback(validationErrors)
                    }
                })
            }
            else {
                validationErrors.push("You need to be logged in")
                callback(validationErrors)
            }
        },

        unparticipateInActivity: function (activityId, userEmail, callback){
            validationErrors = []

            if(userEmail != null){
                participantsRepository.unparticipateInActivity(activityId, userEmail, function(error){
                    if(error){
                        callback(error)
                    }
                    else{
                        callback(null)
                    }
                })
            }
            else{
                validationErrors.push("You need to be logged in")
                callback(validationErrors)
            }
        },

        getAllActivitiesByUser: function (username, callback) {
            validationErrors = []

            activityRepository.getAllActivitiesByUser(username, function (error, activities) {
                if (error) {
                    callback(error)
                }
                else {
                    const usersActivities = []
                    for (i = 0; i < activities.length; i += 1) {
                        activity = {
                            title: activities[i]._activityName,
                            date: activities[i]._activityDate,
                            time: activities[i]._activityTime,
                            id: activities[i].id,
                            username: activities[i]._activityAuthor
                        }
                        usersActivities.push(activity)
                    }

                    callback(null, usersActivities)
                }
            })
        }

    }
}