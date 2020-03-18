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

            if(error && error.includes("databaseError")){
                console.log(error)
                response.redirect("/error500")
            }
            else if(error){
                console.log(error)
                const model = {
                    error,
                    packet
                }
                response.render("activity-detailed.hbs", model)
            }
            else{
                response.redirect("/activities/" + activityId)
            }
        })
    })

    router.post("/delete/:id", function(request, response){
        const commentId = request.params.id
        const userEmail = response.locals.isLoggedIn

        commentManager.deleteComment(commentId, userEmail, function(error, activityId){
            
            if(error && error.includes("databaseError")){
                console.log(error)
                response.redirect("/error500")
            }
            else if(error){
                console.log(error)
                response.render("activity-detailed.hbs", error)
            }
            else{
                response.redirect("/activities/" + activityId)
            }
        })
    })



    return router
}