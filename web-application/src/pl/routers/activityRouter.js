const express = require('express')

module.exports = function ({ activityManager }) {

    const router = express.Router()


    router.get("/", function (request, response) {

        const userEmail = response.locals.isLoggedIn

        activityManager.getAllActivities(userEmail, function (error, theActivities) {
            if (error) {
                console.log(error)
                response.redirect("/error500")
            }
            else {
                const model = {
                    theActivities
                }
                response.render("activities.hbs", model)
            }
        })
    })



    router.get("/create", function (request, response) {

        if (request.session.isLoggedIn) {

            const model = {

                validationErrors: []
            }

            response.render("create-activity.hbs", model)

        } 
        else {
            response.redirect("/login")
        }
    })


    router.post("/create", function (request, response) {

        if (request.session.isLoggedIn) {

            const activity = {
                title: request.body.title.trim(),
                location: request.body.location.trim(),
                date: request.body.date.trim(),
                time: request.body.time.trim(),
                description: request.body.description.trim(),
                activityAuthor: response.locals.isLoggedIn
            }

            activityManager.createActivity(activity, function (error, activity) {
                if (error) {
                    console.log(error)
                    const model = {
                        error,
                        activity
                    }
                    response.render("create-activity.hbs", model)
                } else {
                    response.redirect("/activities")
                }
            })
        } 
        else {
            response.redirect("/login")
        }
    })

    router.get("/update/:id", function (request, response) {
        if (response.locals.isLoggedIn) {

            const id = request.params.id
            const userEmail = response.locals.isLoggedIn

            activityManager.getActivityById(id, userEmail, function (error, model) {
                if (error) {
                    console.log(error)
                    response.redirect("/error500")
                } 
                else {
                    response.render("update-activity.hbs", model)
                }
            })
        }
        else {
            response.redirect("/login")
        }
    })

    router.post("/update/:id", function (request, response) {

        if (request.session.isLoggedIn) {

            const userEmail = response.locals.isLoggedIn

            const activity = {
                id: request.params.id,
                title: request.body.title.trim(),
                location: request.body.location.trim(),
                date: request.body.date.trim(),
                time: request.body.time.trim(),
                description: request.body.description.trim()
            }

            activityManager.updateActivity(activity, userEmail, function (error, activity) {
                if (error) {
                    console.log(error)
                    const model = {
                        error,
                        activity
                    }
                    response.render("update-activity.hbs", model)
                } else {
                    response.redirect("/activities/" + activity.id)
                }
            })

        } 
        else {
            response.redirect("/login")
        }
    })

    router.post("/delete/:id", function (request, response) {

        if (request.session.isLoggedIn) {

            const id = request.params.id
            const userEmail = response.locals.isLoggedIn

            activityManager.deleteActivity(id, userEmail, function (error) {
                if (error) {
                    console.log(error)
                } else {
                    response.redirect("/activities")
                }
            })
        } else {
            response.redirect("/login")
        }
    })

    router.post("/participate/:id", function (request, response) {
        const activityId = request.params.id
        const userEmail = response.locals.isLoggedIn

        activityManager.participateInActivity(activityId, userEmail, function (error) {
            if (error) {
                console.log(error)
                response.render("activity-detailed.hbs", error)
            }
            else {
                response.redirect("/activities/" + activityId)
            }
        })
    })

    router.post("/unparticipate/:id", function (request, response) {
        const activityId = request.params.id
        const userEmail = response.locals.isLoggedIn

        activityManager.unparticipateInActivity(activityId, userEmail, function (error) {
            if (error) {
                console.log(error)
                response.render("activity-detailed.hbs", error)
            }
            else {
                response.redirect("/activities/" + activityId)
            }
        })
    })

    router.get("/by/:_username", function (request, response) {
        const username = request.params._username

        activityManager.getAllActivitiesByUser(username, function (error, usersActivities) {
            if (error) {
                console.log(error)
                response.redirect("/error500")
            }
            else {
                const model = {
                    usersActivities
                }
                response.render("profileActivities.hbs", model)
            }
        })

    })

    router.get("/:id", function (request, response) {

        const id = request.params.id
        const userEmail = response.locals.isLoggedIn

        activityManager.getActivityById(id, userEmail, function (error, model) {
            if (error) {
                console.log(error)
                response.redirect("activity-detailed.hbs")
            }
            else {
                response.render("activity-detailed.hbs", model)
            }
        })
    })

    return router
}
    
