const express = require('express')
const userManager = require('../../bll/userManager')

const router=express.Router()

router.get("/", function(request, response){
    response.render("login.hbs")
})

router.post("/", function(request, response){
    const usernameOrEmail = request.body.usernameOrEmail
    const password = request.body.password

    userManager.login(usernameOrEmail, password, function(error, reqEmail){
        if(error){
            console.log(error)
            response.render("login.hbs", error)
        }
        else{
            request.session.isLoggedIn = reqEmail
            response.redirect("/")
        }
    })
})

router.post("/createAccount", function(request, respone){
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

    userManager.createAccount(account, function(error, userEmail){
        if(error){
            console.log(error)
            respone.render("register.hbs", account)
        }
        else{
            request.session.isLoggedIn = userEmail
            respone.redirect("/")
        }
    })
})

router.post("/logout", function(request, response){
    request.session.isLoggedIn = null
    response.redirect("/")
})


module.exports = router