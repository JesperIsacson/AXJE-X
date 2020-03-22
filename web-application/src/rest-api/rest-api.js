const express = require('express')
const jwt = require('jsonwebtoken')


module.exports = function({activityManager, userManager}){
    const router = express.Router()
    const serverSecret ="ashdSA/(hslascs8@3i-"

    router.use(function(request, response, next){
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
        response.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")
        next()
    })


    router.get("/activities", function(request, response){
       userEmail = request.body.userEmail

        activityManager.getAllActivities(userEmail, function(error, theActivities){
            if(error){
                response.status(500).end()
            }
            else{
                response.status(200).json(theActivities)
            }
        })

    })

    router.get("/activities/:id", function(request, response){
        const id = request.params.id
        const userEmail = response.locals.isLoggedIn

        activityManager.getActivityById(id, userEmail, function(error, model){
            if(error){
                response.status(500).end()
            }
            else if(!model){
                response.status(404).end()
            }
            else{
                response.status(200).json(model)
            }
        })
    })

    router.post("/createAccount", function(request, response){

        const account = {
            email : request.body.email.trim(),
            firstName : request.body.firstName.trim(),
            lastName : request.body.lastName.trim(),
            userName : request.body.userName.trim(),
            password : request.body.password,
            passwordConfirm : request.body.passwordConfirm,
            gender : request.body.gender,
            dateOfBirth : request.body.dateOfBirth.trim(),
            userEmail: request.body.userEmail
        }

        userManager.createAccount(account, account.userEmail, function(error, userEmail){
            if(error && error.toString().includes("databaseError")){
                response.status(500).end()
            }
            else if(error){
                response.status(400).end()
            }
            else{
                const payload = {id: userEmail}
                jwt.sign(payload, serverSecret, function(error, token){
                    if(error){
                        response.status(500).end()
                    }
                    else{
                        response.status(201).json({
                            accessToken: token,
                            userEmail: userEmail
                        })
                    }
                })
            }
        })

    })

    router.post("/login", function(request, response){

        const loginInfo = {
        grantType: request.body.grantType,
        usernameOrEmail: request.body.usernameOrEmail,
        password: request.body.password
        }

        if(loginInfo.grantType != "password"){
            response.status(400).json({error: "incorrect-grant-type"})
        }

        userManager.login(loginInfo.usernameOrEmail, loginInfo.password, function(error, reqEmail){
            if(error && error.toString().includes("databaseError")){
                response.status(500).end()
            }
            else if(error){
                response.status(400).json(error)
            }
            else{
                const payload = {id: reqEmail}
                jwt.sign(payload, serverSecret, function(error, token){
                    if(error){
                        response.status(500).end()
                    }
                    else{
                        response.status(200).json({
                            accessToken: token,
                            userEmail: reqEmail
                        })
                    }
                })
            }
        })
    })

    var authoriztaion = function(request, response, next){
        try{
            const authHeader = request.get("authorization")
            const accessToken = authHeader.substr("Bearer ".length)

            jwt.verify(accessToken, serverSecret, function(error, decoded){
                if(error){
                    response.status(401).end()
                }
                else{
                    next()
                }
            })
        }
        catch(error){
            response.status(400).end()
            return
        }
    }

    router.post("/createActivity", authoriztaion, function(request, response){

        const activity = {
            title: request.body.title.trim(),
            location: request.body.location.trim(),
            date: request.body.date.trim(),
            time: request.body.time.trim(),
            description: request.body.description.trim(),
            activityAuthor: request.body.author
        }


        activityManager.createActivity(activity, function(error, activity){
            if(error && error.toString().includes("databaseError")){
                response.status(500).end()
            }
            else if(error){
                console.log(error)
                response.status(400).end()
            }
            else{
                response.status(201).end()
            }
        })
    })

    router.put("/updateActivity/:id", authoriztaion, function(request, response){

        const activity = {
            id: request.body.activityId,
            title: request.body.title.trim(),
            location: request.body.location.trim(),
            date: request.body.date.trim(),
            time: request.body.time.trim(),
            description: request.body.description.trim(),
            userEmail: request.body.userEmail
        }

        console.log(activity)

        activityManager.updateActivity(activity, activity.userEmail, function(error, activity){

            if(error && error.toString().includes("databaseError")){
                console.log(error)
                response.status(500).end()
            }
            else if(error){
                console.log(error)
                response.status(400).end()
            }
            else{
                response.status(200).json(activity)
            }
        })
    })

    router.delete("/deleteActivity/:id", authoriztaion, function(request, response){

        const validator ={
            id: request.body.activityId,
            userEmail: request.body.userEmail
        }
    

        activityManager.deleteActivity(validator.id, validator.userEmail, function(error){
            if(error && error.toString().includes("databaseError")){
                console.log(error)
                response.status(500).end()
            }
            else if(error){
                console.log(error)
                response.status(400).end()
            }
            else{
                response.status(200).end()
            }
        })
    })

    return router
}