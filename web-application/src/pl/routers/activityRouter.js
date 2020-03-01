const express = require('express')

const router = express.Router()
const activityManager = require('../../bll/activityManager')

router.get("/", function(request, response){
    activityManager.getAllActivities(function(error, activity){
        if(error){
            console.log(error)
            response.render("login.hbs")
        } else{
            response.render("activities.hbs")
        }
    })
})

router.get("/create", function(request, response){
    
    const model = {
        
        validationErrors: []
    }

    response.render("create-activity.hbs", model)
})

router.post("/createActivity", function(request, response){
    const activity = {
        title: request.body.title.trim(),
        location: request.body.location.trim(),
        date: request.body.date.trim(),
        time: request.body.time.trim(),
        description: request.body.description.trim()
    }

    activityManager.createActivity(activity, function(error, activity){
        if(error){
            console.log(error)
            response.render("create-activity.hbs", error, activity)
        } else{
            response.render("activities.hbs")
        }
    })  
})

module.exports = router