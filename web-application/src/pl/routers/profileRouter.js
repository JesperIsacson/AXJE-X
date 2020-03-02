const express = require('express')
const profileManager = require('../../bll/profileManager')

const router = express.Router()


router.get("/", function(request, response){
    if(response.locals.isLoggedIn != null){
        const email = response.locals.isLoggedIn

        profileManager.getUserByEmail(email, function(error, user){
            if(error){
                console.log(error)
                response.render("profile.hbs")
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


router.get("/manageProfile/:_username", function(request, response){
    const validator ={
        email: response.locals.isLoggedIn,
        username: request.params._username
    }

    profileManager.manageProfile(validator, function(error, user){
        if(error){
            console.log(error)
            response.render("home.hbs")
        }
        else{
            const model ={
                user,
                _username: user[0]._username,
                _firstName: user[0]._firstName,
                _lastName: user[0]._lastName,
                _height: user[0]._height,
                _weight: user[0]._weight
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
        if(error){
            console.log(error)
            const model={
                user,
                _username: user._username,
                _firstName: user._firstName,
                _lastName: user._lastName,
                _height: user._height,
                _weight: user._weight
            }

            response.render("manageProfile.hbs", model)
        }
        else{
            response.redirect("/profile/" + user[0]._username)
        }
    })
    
})


router.post("/deleteProfile/:_username", function(request, response){
    const validator ={
        email: response.locals.isLoggedIn,
        username: request.params._username
    }

    profileManager.deleteProfile(validator, function(error){
        if(error){
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
    
    profileManager.getUserByUsername(username, function(error, user){
        if(error){
            console.log(error)
            response.render("profile.hbs")
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