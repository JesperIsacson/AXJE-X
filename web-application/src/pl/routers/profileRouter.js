const express = require('express')

module.exports = function({profileManager}){

    const router = express.Router()


    router.get("/", function(request, response){
        if(response.locals.isLoggedIn != null){
            const email = response.locals.isLoggedIn

            profileManager.getUserByEmail(email, function(error, user){

                if(error && error.includes("databaseError")){
                    console.log(error)
                    response.redirect("/error500")
                }
                else if(error){
                    console.log(error)
                }
                else{
                    const model ={
                        user
                    }

                    response.render("profile.hbs", model)
                }
            })
        }
        else{
            console.log("not logged in")
            response.redirect("/")
        }
    })


    router.get("/manageProfile/:_username", function(request, response){
        const validator ={
            email: response.locals.isLoggedIn,
            username: request.params._username
        }

        profileManager.manageProfile(validator, function(error, user){

            if(error && error.includes("databaseError")){
                console.log(error)
                response.redirect("/error500")
            }
            else if(error){
                console.log(error)
            }
            else{
                const model ={
                    user 
                }

                response.render("manageProfile.hbs", model)
            }
        })

    })


    router.post("/updateProfile/:_username", function(request, response){
        const validator ={
            email: response.locals.isLoggedIn,
            username: request.params._username
        }

        const newUser ={
            _email: response.locals.isLoggedIn,
            _username: request.body.username.trim(),
            _firstName: request.body.firstName.trim(),
            _lastName: request.body.lastName.trim(),
            _height: request.body.height,
            _weight: request.body.weight
        }

        profileManager.updateProfile(newUser, validator, function(error, user){

            if(error && error.includes("databaseError")){
                console.log(error)
                response.redirect("/error500")
            }
            else if(error){
                console.log(error)
                const model = {
                    error,
                    user
                }
                response.render("manageProfile.hbs", model)
            }
            else{
                response.redirect("/profile/" + user.username)
            }
        })
        
    })


    router.post("/deleteProfile/:_username", function(request, response){
        const validator ={
            email: response.locals.isLoggedIn,
            username: request.params._username
        }

        profileManager.deleteProfile(validator, function(error){

            if(error && error.includes("databaseError")){
                console.log(error)
                response.redirect("/error500")
            }
            else if(error){
                console.log(error)
            }
            else{
                request.session.isLoggedIn = null
                response.redirect("/")
            }
        })
    })


    router.get("/:username", function(request, response){
        const username = request.params.username
        const userEmail = response.locals.isLoggedIn
        
        profileManager.getUserByUsername(username, userEmail, function(error, user){

            if(error && error.includes("databaseError")){
                console.log(error)
                response.redirect("/error500")
            }
            else if(error){
                console.log(error)
                response.redirect("/error500")
            }
            else{
                const model={
                    user
                }
                response.render("profile.hbs", model)
            }
        })
    })


    return router
}