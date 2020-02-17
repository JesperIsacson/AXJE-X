const express = require('express')
const userManager = require('../../bll/userManager')

const router=express.Router()

const username = "tsar"
const password = "hemligt"

router.get("/", function(request, response){
    response.render("login.hbs")
})

router.get("/login", function(request, response){
    if(username == request.body.username && password == request.body.password){
        response.redirect("/")
    }
    else{
        console.log("Nej")
    }
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

    userManager.createAccount(account, function(error, account){
        if(error){
            console.log(error)
            respone.render("register.hbs", error, account)
        }
        else{
            respone.render("home.hbs")
        }
    })
})


module.exports = router