document.addEventListener("DOMContentLoaded", function(){

    changeToPage(location.pathname)

    if(localStorage.accessToken && localStorage.userEmail){
        userValidator ={
            accessToken : localStorage.accessToken,
            userEmail: localStorage.userEmail
        }
        login(userValidator)
    }
    else{
        logout()
    }

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
            dateOfBirth,
            userEmail: (localStorage.userEmail ? localStorage.userEmail : null)
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
            if(response.status == 201){
                return response.json()
            }
            else if(response.status == 400){
                return 400
            }
            else{
                return 500
            }
        }).then(body =>{
            console.log(body)
            if(body == 400){
                window.location.replace("/error")
            }
            else if(body == 500){
                window.location.replace("/error")
            }
            else{
                login(body)
                window.location.replace("/")
            }
        }).catch(error =>{
            console.log(error)
            window.location.replace("/error")
        })
    })

    document.querySelector("#loginPage form").addEventListener("submit", function(event){
        event.preventDefault()

        const usernameOrEmail = document.querySelector("#loginPage .usernameOrEmail").value
        const password = document.querySelector("#loginPage .password").value

        const loginInfo = {
            grantType: "password",
            usernameOrEmail: usernameOrEmail,
            password: password
        }

        fetch(
            "http://localhost:8080/restAPI/login",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginInfo)
            }
        )
        .then(response =>{
            if(response.status == 400){
                return 400
            }
            else if(response.status == 500){
                return 500
            }
            else{
                return response.json()
            }
        })
        .then(body =>{
            if(body == 400){
                window.location.replace("/error")
            }
            else if(body == 500){
                window.location.replace("/error")
            }
            else{
                login(body)
                window.location.replace("/")
            }
        })
    })

    document.querySelector("#createActivityPage form").addEventListener("submit", function(event){
        event.preventDefault()

        const title = document.querySelector("#createActivityPage .title").value
        const location = document.querySelector("#createActivityPage .location").value
        const date = document.querySelector("#createActivityPage .date").value
        const time = document.querySelector("#createActivityPage .time").value
        const description = document.querySelector("#createActivityPage .description").value

        const activity = {
            title,
            location,
            date,
            time,
            description,
            author: (localStorage.userEmail ? localStorage.userEmail : null)
        }

        console.log(activity)

        fetch(
            "http://localhost:8080/restAPI/createActivity",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "authorization": "Bearer "+localStorage.accessToken
                },
                body: JSON.stringify(activity)
            }
        )
        .then(response =>{
            if(response.status == 500){
                console.log("HASSE 1")
                window.location.replace("/error")
            }
            else if(response.status == 400){
                console.log("HASSE 2")
                window.location.replace("/error")
            }
            else if(response.status == 401){
                console.log("HASSE 3")
                window.location.replace("/error")
            }
            else{
                console.log("HASSE 4")
                window.location.replace("/activities")
            }
        })
        .catch(error =>{
            console.log("HASSE ERROR")
            window.location.replace("/error")
        })
    })

    document.querySelector("#updateActivityPage form").addEventListener("submit", function(event){
        event.preventDefault()

        const activityId = document.querySelector("#updateActivityPage .activityId").value
        const title = document.querySelector("#updateActivityPage .title").value
        const location = document.querySelector("#updateActivityPage .location").value
        const date = document.querySelector("#updateActivityPage .date").value
        const time = document.querySelector("#updateActivityPage .time").value
        const description = document.querySelector("#updateActivityPage .description").value

        const activity ={
            activityId,
            title,
            location,
            date,
            time,
            description,
            userEmail: (localStorage.userEmail ? localStorage.userEmail : null)
        }

        fetch(
            "http://localhost:8080/restAPI/updateActivity/"+activityId,{
                method: "PUT",
                headers:{
                    "Content-Type": "application/json",
                    "authorization": "Bearer "+localStorage.accessToken
                },
                body: JSON.stringify(activity)
            }
        )
        .then(response =>{
            if(response.status == 401){
                window.location.replace("/error")
            }
            else if(response.status == 400){
                window.location.replace("/error")
            }
            else if(response.status == 500){
                window.location.replace("/error")
            }
            else{
                window.location.replace("/activities")
            }
        })
        .catch(error =>{
            window.location.replace("/error")
        })
    })
})

window.addEventListener("popstate", function(event){
    const url = location.pathname
    changeToPage(url)
})

function goToPage(url){
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
    else if(url == "/activities"){
        document.getElementById("activitiesPage").classList.add("current-page")
        fetchAllActivities()
    }
    else if(url == "/createActivity"){
        document.getElementById("createActivityPage").classList.add("current-page")
    }
    else if(new RegExp("^/activities/[0-9]+$").test(url)){
        document.getElementById("activityPage").classList.add("current-page")
        const activityId = url.split("/")[2]
        fetchActivityById(activityId)
    }
    else if(new RegExp("^/updateActivity/[0-9]+$").test(url)){
        document.getElementById("updateActivityPage").classList.add("current-page")
        const activityId = url.split("/")[2]
        fetchActivityById(activityId)
    }
    else if(new RegExp("^/deleteActivity/[0-9]+$").test(url)){
        const activityId = url.split("/")[2]
        deleteActivity(activityId)
    }
    else if(url == "/register"){
        document.getElementById("registerPage").classList.add("current-page")
    }
    else if(url == "/login"){
        document.getElementById("loginPage").classList.add("current-page")
    }
    else if(url == "/logout"){
        logout()
    }
    else{
        document.getElementById("errorPage").classList.add("current-page")
    }
}

function fetchAllActivities(){

    fetch(
        "http://localhost:8080/restAPI/activities"

    )
    .then(response =>{
        if(response.status == 500){
            return 500
        }
        else{
            return response.json()
        }
    })
    .then(activities =>{
        if(activities == 500){
            window.location.replace(500)
        }
        else{
            const ul = document.querySelector("#activitiesPage ul")
            ul.innerText = ""
            for(const activity of activities){
                const li = document.createElement("li")
                const anchor = document.createElement("a")
                const name = document.createElement("p")
                name.innerText = activity.title
                const date = document.createElement("p")
                date.innerText = activity.date
                const time = document.createElement("p")
                time.innerText = activity.time
                const createdAt = document.createElement("p")
                createdAt.innerText = activity.createdAt.toString().slice(0, 15)
                const author = document.createElement("p")
                author.innerText = "by: " + activity.username
                anchor.innerText="Read more"
                anchor.setAttribute("href", '/activities/'+activity.id)
                
                li.appendChild(name)
                li.appendChild(date)
                li.appendChild(time)
                li.appendChild(createdAt)
                li.appendChild(author)
                li.appendChild(anchor)
                if(activity.userEmail == localStorage.userEmail){
                    const deleteActivity = document.createElement("a")
                    deleteActivity.setAttribute("href", "/deleteActivity/"+activity.id)
                    deleteActivity.innerText = "Delete Activity"

                    const updateForm = document.createElement("form")
                    const updateButton = document.createElement("button")
                    updateForm.setAttribute("action", "/updateActivity/"+activity.id)
                    updateButton.setAttribute("type", "submit")
                    updateButton.innerText = "Update"
                    updateForm.appendChild(updateButton)

                    li.append(deleteActivity)
                    li.append(updateForm)
                }
                ul.append(li)
            }
        }
    })
}

function fetchActivityById(activityId){
    fetch(
        "http://localhost:8080/restAPI/activities/"+activityId
    )
    .then(response =>{
        if(response.status == 500){
            return 500
        }
        else if(response.status == 404){
            return 404
        }
        else{
            return response.json()
        }
    })
    .then(activity =>{
        if(activity == 500){
            window.location.replace("/error")
        }
        else if(activity == 404){
            window.location.replace("/error")
        }
        else{
            const activityPage = document.getElementById("activityPage")
            const updateActivityPage = document.getElementById("updateActivityPage")

            if(activityPage.classList.contains("current-page")){
                const title = document.querySelector("#activityPage h1")
                const author = document.querySelector("#activityPage .author")
                const location = document.querySelector("#activityPage .location")
                const createdAt = document.querySelector("#activityPage .createdAt")
                const date = document.querySelector("#activityPage .date")
                const time = document.querySelector("#activityPage .time")
                const description = document.querySelector("#activityPage .description")

                title.innerText = activity.activity.title
                author.innerText = activity.user.username
                location.innerText = activity.activity.location
                createdAt.innerText = activity.activity.createdAt
                date.innerText = activity.activity.date
                time.innerText = activity.activity.time
                description.innerText = activity.activity.description
            }
            else if(updateActivityPage.classList.contains("current-page")){
                const title = document.querySelector("#updateActivityPage .title")
                const location = document.querySelector("#updateActivityPage .location")
                const date = document.querySelector("#updateActivityPage .date")
                const time = document.querySelector("#updateActivityPage .time")
                const description = document.querySelector("#updateActivityPage .description")
                const activityId = document.querySelector("#updateActivityPage .activityId")

                title.setAttribute("value", activity.activity.title)
                location.setAttribute("value", activity.activity.location)
                date.setAttribute("value", activity.activity.date)
                time.setAttribute("value", activity.activity.time)
                description.setAttribute("value", activity.activity.description)
                activityId.setAttribute("value", activity.activity.id)
            }
        }
    })
}

function deleteActivity(activityId){
    const validator ={
        activityId,
        userEmail: (localStorage.userEmail ? localStorage.userEmail : null)
    }

    fetch(
        "http://localhost:8080/restAPI/deleteActivity/"+activityId,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                "authorization": "Bearer "+localStorage.accessToken
            },
            body: JSON.stringify(validator)
        }
    )
    .then(response =>{
        if(response.status == 401){
            window.location.replace("/error")
        }
        else if(response.status == 400){
            window.location.replace("/error")
        }
        else if(response.status == 500){
            window.location.replace("/error")
        }
        else{
            window.location.replace("/activities")
        }
    })
    .catch(error =>{
        window.location.replace("/error")
    })
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