document.addEventListener("DOMContentLoaded", function(){

    changeToPage(location.pathname)

    document.body.addEventListener("click", function(event){
        if(event.target.tagName == "a"){
            event.preventDefault()
            const url = event.target.getAttribute("href")
            goToPage(url)
        }
    })


    document.querySelector("#registerPage form").addEventListener("submit", function(event){
        event.preventDefault()

        const email = document.querySelector("#registerPage .email").value
        const firstName = document.querySelector("#registerPage .firstName").value
        const lastName = document.querySelector("#registerPage .lastName").value
        const userName = document.querySelector("#registerPage .userName").value
        const password = document.querySelector("#registerPage .password").value
        const passwordConfirm = document.querySelector("#registerPage .passwordConfirm").value
        const gender = document.querySelector("#registerPage .gender").value
        const dateOfBirth = document.querySelector("#registerPage .dateOfBirth").value

        const account = {
            email,
            firstName,
            lastName,
            userName,
            password,
            passwordConfirm,
            gender,
            dateOfBirth
        }

        fetch(
            "http://localhost:8080/restAPI/createAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(account)
            }
        ).then(response =>{
            console.log(response)
            return response.json()
        }).then(userValidator =>{
            console.log(userValidator)
            login(userValidator)
        }).catch(error =>{
            console.log(error)
        })
    })

})

window.addEventListener("popstate", function(event){
    const url = location.pathname
    changeToPage(url)
})

function gotToPage(url){
    changeToPage(url)
    history.pushState({}, "", url)
}

function changeToPage(url){
    const currentPageDiv = document.getElementsByClassName("current-page")[0]
    if(currentPageDiv){
        currentPageDiv.classList.remove("curent-page")
    }

    if(url == "/"){
        document.getElementById("homePage").classList.add("current-page")
    }
    else if(url == "/activitiesPage"){
        document.getElementById("activitiesPage").classList.add("current-page")
    }
    else if(url == "/createActivity"){
        document.getElementById("createActivityPage").classList.add("current-page")
    }
    else if(url == "/register"){
        document.getElementById("registerPage").classList.add("current-page")
    }
    else if(url == "/login"){
        document.getElementById("loginPage").classList.add("current-page")
    }


}

function login(userValidator){
    localStorage.accessToken = userValidator.accessToken
    localStorage.userEmail = userValidator.userEmail
    console.log(localStorage.accessToken)
    console.log(localStorage.userEmail)
    document.body.classList.remove("isLoggedOut")
    document.body.classList.add("isLoggedIn")
}

function logout(){
    localStorage.accessToken = ""
    localStorage.userEmail = ""
    document.body.classList.remove("isLoggedIn")
    document.body.classList.add("isLoggedOut")
}