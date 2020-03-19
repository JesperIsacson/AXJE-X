module.exports = function ({ activityRepository, commentRepository, profileRepository, participantsRepository }) {
    return {

        getAllActivities: function (userEmail, callback) {

            const validationErrors = []

            activityRepository.getAllActivities(function (error, activities) {
                if (error) {
                    validationErrors.push("databaseError")
                    callback(validationErrors)
                } else {
                    const theActivities = []

                    for (i = 0; i < activities.length; i += 1) {

                        let act = {
                            id: activities[i].id,
                            title: activities[i]._activityName,
                            location: activities[i]._activityLocation,
                            date: activities[i]._activityDate,
                            time: activities[i]._activityTime,
                            description: activities[i]._activityDescription,
                            createdAt: activities[i].createdAt.toString().slice(0, 15),
                            username: activities[i]._activityAuthor,
                            isAuthor: ((userEmail == activities[i].UserEmail) ? true : false),
                            userEmail: activities[i].UserEmail
                        }
                        theActivities.push(act)
                    }

                    theActivities.reverse()
                    callback(null, theActivities)
                }
            })
        },

        getActivityById: function (id, userEmail, callback) {

            const validationErrors = []

            activityRepository.getActivityById(id, function (error, activity) {
                if (error) {
                    validationErrors.push("databaseError")
                    callback(validationErrors)
                }
                else {
                    const theActivity = {
                        id: activity[0].id,
                        title: activity[0]._activityName,
                        location: activity[0]._activityLocation,
                        date: activity[0]._activityDate,
                        time: activity[0]._activityTime,
                        description: activity[0]._activityDescription,
                        createdAt: activity[0].createdAt.toString().slice(0, 15)
                    }

                    profileRepository.getUserByEmail(activity[0].UserEmail, function (error, user) {
                        if (error) {
                            validationErrors.push("databaseError")
                            callback(validationErrors)
                        }
                        else {
                            const theUser = {
                                username: user[0]._username
                            }

                            commentRepository.getAllCommentsForActivity(id, function (error, comments) {
                                if (error) {
                                    validationErrors.push("databaseError")
                                    callback(validationErrors)
                                }
                                else {
                                    const theComments = []
                                    for (i = 0; i < comments.length; i += 1) {
                                        comment = {
                                            content: comments[i]._content,
                                            author: comments[i]._author,
                                            id: comments[i].id,
                                            isAuthor: ((userEmail == comments[i].UserEmail) ? true : false)
                                        }
                                        theComments.push(comment)
                                    }

                                    participantsRepository.getAllParticipantsForActivity(id, function (error, participantsForActivity) {
                                        if (error) {
                                            validationErrors.push("databaseError")
                                            callback(validationErrors)
                                        }
                                        else {
                                            const theParticipants = []
                                            var isParticipated = false


                                            for (i = 0; i < participantsForActivity.length; i += 1) {
                                                participant = {
                                                    participant: participantsForActivity[i]._username
                                                }
                                                theParticipants.push(participant)

                                                if (userEmail == participantsForActivity[i].UserEmail) {
                                                    isParticipated = true
                                                }
                                            }
                                            const model = {
                                                activity: theActivity,
                                                comments: theComments,
                                                user: theUser,
                                                participants: theParticipants,
                                                isParticipated: isParticipated
                                            }

                                            callback(null, model)
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

            const validationErrors = []

            if (userEmail != null) {

                if (activity.title.length < 2 || activity.title.length > 40) {
                    validationErrors.push("Invalid title")
                }

                if (activity.location.length < 2 || activity.location.length > 40) {
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
                            validationErrors.push("databaseError")
                            callback(error)
                        }
                        else {
                            activityRepository.getActivityById(activity.id, function (error, activity) {
                                if (error) {
                                    validationErrors.push("databaseError")
                                    callback(error)
                                }
                                else {
                                    const theActivity = {
                                        id: activity[0].id,
                                        title: activity[0]._activityName,
                                        location: activity[0]._activityLocation,
                                        date: activity[0]._activityDate,
                                        time: activity[0]._activityTime,
                                        description: activity[0]._activityDescription
                                    }

                                    callback(null, theActivity)
                                }
                            })
                        }
                    })
                }
                else {
                    callback(validationErrors, activity)
                }
            }
            else {
                validationErrors.push("You need to be logged in")
                callback(validationErrors)
            }
        },

        deleteActivity: function (id, userEmail, callback) {

            const validationErrors = []

            activityRepository.deleteActivity(id, userEmail, function (error) {
                if (error) {
                    validationErrors.push("databaseError")
                    callback(validationErrors)
                } else {
                    callback(null)
                }
            })
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
                        validationErrors.push("databaseError")
                        callback(error)
                    }
                    else {
                        if (error) {
                            callback(error)
                        }
                        else {
                            activityRepository.createActivity(activity, user[0]._username, function (error, activity) {
                                if (error) {
                                    validationErrors.push("databaseError")
                                    console.log(error)
                                    callback(error)
                                }
                                else {
                                    callback(null, activity)
                                }
                            })
                        }
                    }
                })
            }
            else {
                callback(validationErrors, activity)
            }

        },

        participateInActivity: function (activityId, userEmail, callback) {
            
            const validationErrors = []

            if (userEmail != null) {
                profileRepository.getUserByEmail(userEmail, function (error, user) {
                    if (error) {
                        validationErrors.push("databaseError")
                        callback(error)
                    }
                    else if (userEmail == user[0]._email) {
                        participantsRepository.participateInActivity(user, activityId, function (error) {
                            if (error) {
                                validationErrors.push("databaseError")
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

        unparticipateInActivity: function (activityId, userEmail, callback) {

            const validationErrors = []

            if (userEmail != null) {
                participantsRepository.unparticipateInActivity(activityId, userEmail, function (error) {
                    if (error) {
                        validationErrors.push("databaseError")
                        callback(validationErrors)
                    }
                    else {
                        callback(null)
                    }
                })
            }
            else {
                validationErrors.push("You need to be logged in")
                callback(validationErrors)
            }
        },

        getAllActivitiesByUser: function (username, callback) {
            
            const validationErrors = []

            activityRepository.getAllActivitiesByUser(username, function (error, activities) {
                if (error) {
                    validationErrors.push("databaseError")
                    callback(validationErrors)
                }
                else {
                    const usersActivities = []
                    for (i = 0; i < activities.length; i += 1) {
                        activity = {
                            title: activities[i]._activityName,
                            date: activities[i]._activityDate,
                            time: activities[i]._activityTime,
                            id: activities[i].id,
                            username: activities[i]._activityAuthor,
                            createdAt: activities[i].createdAt.toString().slice(0, 15)
                        }
                        usersActivities.push(activity)
                        
                    }
                    
                    usersActivities.reverse()
                    callback(null, usersActivities)
                }
            })
        }

    }
}