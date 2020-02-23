const express = require('express')
const profileManager = require('../../bll/profileManager')

const router = express.Router()

router.get("/:username", function(request, response){
    const username = request.params.username
    
    profileManager.viewProfile(username, function(error, user){
        if(error){
            console.log(error)
            response.render("login.hbs")
        }
        else{
            const model={
                user,
                _username : user[0]._username,
                _firstName : user[0]._firstName,
                _lastName : user[0]._lastName,
                _dateOfBirth : user[0]._dateOfBirth,
                _height : user[0]._height,
                _weight : user[0]._weight
            }
            response.render("profile.hbs", model)
        }
    })
})




module.exports = router