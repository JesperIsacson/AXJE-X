const express = require('express')

const router=express.Router()

const username = "jeff"
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


module.exports = router