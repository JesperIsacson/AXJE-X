const express = require('express')

const router = express.Router()

router.get("/", function(request, response){
    response.render("activities.hbs")
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
})

module.exports = router