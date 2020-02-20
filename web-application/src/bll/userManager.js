const userRepository = require('../dal/userRepository')
const bcrypt = require('bcryptjs')

exports.createAccount = function(account, callback){
    const validationErrors = []

    if(account.firstName.length < 2 || account.firstName.length > 20){
        validationErrors.push("Invalid first name")
    }
    if(account.lastName.length < 2 || account.lastName.length > 20){
        validationErrors.push("Invalid last name")
    }
    if(account.userName.length < 3 || account.userName.length > 14){
        validationErrors.push("Invalid username")
    }
    if(account.password != account.passwordConfirm || account.password.length < 6){
        validationErrors.push("Invalid email")
    }
    if(account.gender == ""){
        validationErrors.push("Something went wrong")
    }
    if(account.date == ""){
        validationErrors.push("Invalid date")
    }
    
    if(validationErrors == 0){
        const salt = bcrypt.genSaltSync(15)
        account.password = bcrypt.hashSync(account.password, salt)

        userRepository.createAccount(account, function(error, createdEmail){
            callback(error, createdEmail)
        })
    }
    else{
        callback(validationErrors)
    }
}

exports.login = function(usernameOrPassword, password, callback){
    const validationErrors = []

    if(usernameOrPassword == ""){
        validationErrors.push("Enter a username or email.")
    }
    if(password == ""){
        validationErrors.push("Enter a password.")
    }

    if(validationErrors == 0){
        userRepository.getLoginInformation(usernameOrPassword, function(error, user){
            if(error){
                callback(error)
            }
            else{
                const userEmail = user[0]._email.toString()
                const fetchedPassword = user[0]._password.toString()
                console.log(userEmail)
                console.log(fetchedPassword)
                bcrypt.compare(password, fetchedPassword, function(error, success){
                    if(error){
                        console.log(error)
                        callback(error)
                    }
                    else if(success){
                        callback(null, userEmail)
                    }
                    else{
                        validationErrors.push("WRONG PASSWORD")
                    }
                })
            }
        })
    }
    else{
        callback(validationErrors)
    }
}