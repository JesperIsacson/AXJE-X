const express = require('express')

const router = express.Router()
const activityManager = require('../../bll/activityManager')

router.get("/", function(request, response){
    activityManager.getAllActivities(function(error, activity){
        if(error){
            console.log(error)
            response.render("login.hbs")
        } else{
            console.log(activity)

            let packet = []

            for(i = 0; i < activity.length; i += 1){
               let act = {
                   title: activity[i]._activityName, 
                   date: activity[i]._activityDate,
                   time: activity[i]._activityTime,
                   location: activity[i]._activityLocation,
                   description: activity[i]._activityDescription 
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

router.get("/create", function(request, response){
    
    const model = {
        
        validationErrors: []
    }

    response.render("create-activity.hbs", model)
})

router.post("/create", function(request, response){
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
            response.redirect("/activities")
        }
    })  
})

module.exports = router