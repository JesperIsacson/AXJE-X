const express = require('express')

module.exports = function({userManager}){

    const router = express.Router()

    router.get("/", function(request, response){
        response.render("login.hbs")
    })

    router.post("/", function(request, response){
        const usernameOrEmail = request.body.usernameOrEmail
        const password = request.body.password

        userManager.login(usernameOrEmail, password, function(error, reqEmail){
            if(error){
                console.log(error)
                response.redirect("/error500")
            }
            else{
                request.session.isLoggedIn = reqEmail
                response.redirect("/")
            }
        })
    })

    router.post("/createAccount", function(request, respone){
        const userEmail = respone.locals.isLoggedIn

        const account = {
            email : request.body.email.trim(),
            firstName : request.body.firstName.trim(),
            lastName : request.body.lastName.trim(),
            userName : request.body.userName.trim(),
            password : request.body.password,
            passwordConfirm : request.body.passwordConfirm,
            gender : request.body.gender,
            dateOfBirth : request.body.dateOfBirth.trim()
        }

        userManager.createAccount(account, userEmail, function(error, userEmail){
            if(error){
                console.log(error)
                const model = {
                    error,
                    account
                }
                respone.render("register.hbs", model)
            }
            else{
                request.session.isLoggedIn = userEmail
                respone.redirect("/")
            }
        })
    })

    router.post("/logout", function(request, response){
        if(response.locals.isLoggedIn != null)
        {
            request.session.isLoggedIn = null
            response.redirect("/")
        }
        else{
            console.log("You need to be logged in to logout")
            response.redirect("/")
        }
    })

    return router

}