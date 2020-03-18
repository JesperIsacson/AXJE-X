const express = require('express')
const jwt = require('jsonwebtoken')


module.exports = function({activityManager, userManager}){
    const router = express.Router()
    const serverSecret ="ashdSA/(hslascs8@3i-"
    const expiration = {expiresIn: 160000}

    router.use(function(request, response, next){
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "*")
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")
        next()
    })


    router.get("/activities", function(request, response){
        const userEmail = response.locals.isLoggedIn

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
        const userEmail = response.locals.isLoggedIn

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
            if(error && error.toString().includes("databaseError")){
                response.setHeader("Location", "/error")
                response.status(500).end()
            }
            else if(error){
                response.setHeader("Location", "/error")
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

        const grantType = request.body.grantType
        const usernameOrEmail = request.body.usernameOrEmail
        const password = request.body.password

        if(grantType != "password"){
            response.status(400).json({error: "incorrect-grant-type"})
            return
        }

        userManager.login(usernameOrEmail, password, function(error, reqEmail){
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
                        console.log(error)
                        response.status(500).end()
                    }
                    else{
                        response.status(200).json({"token":token})
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
                    response.status(200).json(decoded)
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
            console.log(activity)
            if(error){
                console.log(error)
                response.status(500).end()
            }
            else{
                response.status(201).json(activity)
            }
        })
    })

    router.put("/updateActivity/:id", authoriztaion, function(request, response){

        const userEmail = "hasse121@hans.se"

        const activity = {
            id: request.params.id,
            title: request.body.title.trim(),
            location: request.body.location.trim(),
            date: request.body.date.trim(),
            time: request.body.time.trim(),
            description: request.body.description.trim()
        }

        activityManager.updateActivity(activity, userEmail, function(error, activity){

            if(error && error.toString().includes("databaseError")){
                console.log(error)
                response.status(500).end()
            }
            else if(error){
                console.log(error)
                response.status(401).end()
            }
            else{
                response.status(200).json(activity)
            }
        })
    })

    router.delete("/deleteActivity/:id", authoriztaion, function(request, response){
        const id = request.params.id
        const userEmail = "hasse121@hans.se"

        activityManager.deleteActivity(id, userEmail, function(error){
            if(error && error.toString().includes("databaseError")){
                console.log(error)
                response.status(500).end()
            }
            else if(error){
                console.log(error)
                response.status(401).end()
            }
            else{
                response.status(200).end()
            }
        })
    })




    return router
}