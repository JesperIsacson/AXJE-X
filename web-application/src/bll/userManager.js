const bcrypt = require('bcryptjs')

module.exports = function({userRepository}){

    return{
        createAccount: function(account, userEmail, callback){
            const validationErrors = []

            if(userEmail == null){

                if(account.email == ""){
                    validationErrors.push("Please enter an email")
                }

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
                    validationErrors.push("Password does not match or password is too short")
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
            else{
                validationErrors.push("Can't create accounts while logged in")
                callback(validationErrors)
            }
        },

        login: function(usernameOrPassword, password, callback){
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
                        const userEmail = user[0]._email
                        const fetchedPassword = user[0]._password
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
                                callback(validationErrors)
                            }
                        })
                    }
                })
            }
            else{
                callback(validationErrors)
            }
        }
    }

}