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

module.exports = router