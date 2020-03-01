const express = require('express')
const profileManager = require('../../bll/profileManager')

const router = express.Router()


router.get("/", function(request, response){
    if(response.locals.isLoggedIn != null){
        const email = response.locals.isLoggedIn

        profileManager.getUserByEmail(email, function(error, user){
            if(error){
                console.log(error)
                response.render("home.hbs")
            }
            else{
                var profileAuth = false

                if(response.locals.isLoggedIn == user[0]._email){
                    profileAuth = true
                }

                const model={
                    user,
                    _profileAuth : profileAuth,
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
    }
    else{
        console.log("not logged in")
    }
})


router.get("/manageProfile", function(request, response){
    if(response.locals.isLoggedIn != null){
        const email = response.locals.isLoggedIn

        profileManager.getUserByEmail(email, function(error, user){
            if(error){
                console.log(error)
                response.render("home.hbs")
            }
            else{
                const model={
                    user,
                    _username : user[0]._username,
                    _firstName : user[0]._firstName,
                    _lastName : user[0]._lastName,
                    _height : user[0]._height,
                    _weight : user[0]._weight
                }
                response.render("manageProfile.hbs", model)
            }
        })
    }
    else{
        console.log("LOGGA IN FÖR I HELVETE")
    }
})


router.post("/updateProfile", function(request, response){
    if(response.locals.isLoggedIn != null){
        const user = {
            _email : response.locals.isLoggedIn,
            _username : request.body.username.trim(),
            _firstName : request.body.firstName.trim(),
            _lastName : request.body.lastName.trim(),
            _height : request.body.height.trim(),
            _weight : request.body.weight.trim()
        }

        profileManager.updateProfile(user, function(error, user){
            if(error){
                console.log(error)
                response.render("home.hbs")
            }
            else{
                response.redirect("/profile/" + user[0]._username)
            }
        })
    }
})


router.get("/:username", function(request, response){
    const username = request.params.username
    
    profileManager.getUserByUsername(username, function(error, user){
        if(error){
            console.log(error)
            response.render("login.hbs")
        }
        else{
            
            var profileAuth = false

            if(response.locals.isLoggedIn == user[0]._email){
                profileAuth = true
            }

            const model={
                user,
                _profileAuth : profileAuth,
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