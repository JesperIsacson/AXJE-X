const express = require('express')

module.exports = function ({ activityManager }) {

    const router = express.Router()


    router.get("/", function (request, response) {

        const userEmail = response.locals.isLoggedIn

        activityManager.getAllActivities(userEmail, function (error, theActivities) {

            if(error && error.includes("databaseError")){
                console.log(error)
                response.redirect("/error500")
            }
            else if (error) {
                console.log(error)
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

            response.render("create-activity.hbs")

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

                if (error && error.includes("databaseError")) {
                    console.log(error)
                    response.redirect("/error500")
                }
                else if (error) {
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

            activityManager.getToUpdateActivity(id, userEmail, function (error, activity) {
                if(error && error.includes("databaseError")){
                    console.log(error)
                    response.redirect("/error500")
                }
                else if (error && error.includes("Unauthorized")) {
                    console.log(error)
                    response.redirect("/error401")
                }
                else if(error && error.includes("notFound")){
                    console.log(error)
                    response.render("error404.hbs")
                }
                else if(error){
                    console.log(error)
                    
                }
                else {
                    response.render("update-activity.hbs", activity)
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

                if (error && error.includes("databaseError")) {
                    console.log(error)
                    response.redirect("/error500")
                }
                else if (error) {
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

                if (error && error.includes("databaseError")) {
                    console.log(error)
                    response.redirect("/error500")
                }
                else if (error && error.includes("Unauthorized")) {
                    console.log(error)
                    response.redirect("/error401")
                }
                else if(error){
                    console.log(error)
                }
                else {
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

            if(error && error.includes("databaseError")){
                console.log(error)
                response.redirect("/error500")
            }
            else if (error && error.includes("Unauthorized")) {
                console.log(error)
                response.redirect("error401")
            }
            else if(error){
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

            if(error && error.includes("databaseError")){
                console.log(error)
                response.redirect("/error500")
            }
            else if(error && error.includes("Unauthorized")){
                console.log(error)
                response.redirect("/error401")
            }
            else if (error) {
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
        const userEmail = response.locals.isLoggedIn

        activityManager.getAllActivitiesByUser(username, userEmail, function (error, usersActivities) {

            if(error && error.includes("databaseError")){
                console.log(error)
                response.redirect("/error500")
            }
            else if (error) {
                console.log(error)
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

            if(error && error.includes("databaseError")){
                console.log(error)
                response.redirect("/error500")
            }
            else if(error && error.includes("notFound")){
                console.log(error)
                response.render("error404.hbs")
            }
            else if (error) {
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

