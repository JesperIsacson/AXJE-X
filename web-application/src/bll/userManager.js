const userRepository = require('../dal/userRepository')

exports.createAccount = function(account, callback){
    const validationErrors = []

    console.log(account)

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
        userRepository.createAccount(account, function(error){
            callback(error)
        })
    }
    else{
        callback(validationErrors)
    }

}