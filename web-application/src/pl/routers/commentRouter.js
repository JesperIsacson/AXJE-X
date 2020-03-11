const express = require('express')

module.exports = function ({commentManager}){
    const router = express.Router()

    router.post("/create/:id", function(request, response){
        const content = request.body.content.trim()
        const activityId = request.params.id
        const activeUser = response.locals.isLoggedIn

        const packet ={
            content: content,
            activityId: activityId,
            activeUser: activeUser
        }

        commentManager.createComment(packet, function(error){
            if(error){
                console.log(error)
                response.render("activity-detail.hbs", error)
            }
            else{
                response.redirect("/activities/" + activityId)
            }
        })

    })



    return router
}