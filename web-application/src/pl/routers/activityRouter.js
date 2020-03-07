const express = require('express')

module.exports = function ({ activityManager }) {

    const router = express.Router()


    router.get("/", function (request, response) {
        activityManager.getAllActivities(function (error, activity) {
            if (error) {
                console.log(error)
            } else {
                console.log(activity)

                let packet = []

                for (i = 0; i < activity.length; i += 1) {

                    let act = {
                        id: activity[i]._id,
                        title: activity[i]._activityName,
                        location: activity[i]._activityLocation,
                        date: activity[i]._activityDate,
                        time: activity[i]._activityTime,
                        description: activity[i]._activityDescription,
                        datePosted: activity[i]._datePosted
                    }

                    packet.push(act)
                }

                console.log(packet)

                packet.reverse()

                const model = {
                    packet
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

        } else {
            response.redirect("/login")
        }
    })


    router.post("/create", function (request, response) {

        if(request.session.isLoggedIn){
            const date = new Date()
            const datePosted = date.toDateString()
    
            const activity = {
                title: request.body.title.trim(),
                location: request.body.location.trim(),
                date: request.body.date.trim(),
                time: request.body.time.trim(),
                description: request.body.description.trim(),
                datePosted: datePosted
            }
    
            activityManager.createActivity(activity, function (error, activity) {
                if (error) {
                    console.log(error)
                    response.render("create-activity.hbs", error, activity)
                } else {
                    response.redirect("/activities")
                }
            })
        } else{
            response.redirect("/login")
        }
    })

    router.get("/update/:id", function (request, response) {

        if (request.session.isLoggedIn) {
            const id = request.params.id

            activityManager.getActivityById(id, function (error, activity) {
                if (error) {
                    console.log(error)
                } else {
                    const model = {
                        activity,
                        id: activity[0]._id,
                        title: activity[0]._activityName,
                        location: activity[0]._activityLocation,
                        date: activity[0]._activityDate,
                        time: activity[0]._activityTime,
                        description: activity[0]._activityDescription,
                    }
                    response.render("update-activity.hbs", model)
                }
            })
        } else{
            response.redirect("/login")
        }
    })

    router.post("/update/:id", function (request, response) {

        if(request.session.isLoggedIn){
            const activity = {
                id: request.params.id,
                title: request.body.title.trim(),
                location: request.body.location.trim(),
                date: request.body.date.trim(),
                time: request.body.time.trim(),
                description: request.body.description.trim()
            }
    
            activityManager.updateActivity(activity, function (error, activity) {
                if (error) {
                    console.log(error)
                    response.render("login.hbs")
                } else {
                    response.redirect("/activities/" + activity[0]._id)
                }
            })

        } else{
            response.redirect("/login")
        }
    })

    router.post("/delete/:id", function (request, response) {

        if(request.session.isLoggedIn){
            const id = request.params.id

            activityManager.deleteActivity(id, function (error) {
                if (error) {
                    console.log(error)
                } else {
                    response.redirect("/activities")
                }
            })
        } else{
            response.redirect("/login")
        }
    })

    router.get("/:id", function (request, response) {

        const id = request.params.id

        activityManager.getActivityById(id, function (error, activity) {

            if (error) {
                console.log(error)
                response.render("login.hbs")
            } else {
                const model = {
                    activity,
                    title: activity[0]._activityName,
                    location: activity[0]._activityLocation,
                    date: activity[0]._activityDate,
                    time: activity[0]._activityTime,
                    description: activity[0]._activityDescription,
                    datePosted: activity[0]._datePosted
                }
                response.render("activity-detailed.hbs", model)
            }
        })
    })

    return router
}