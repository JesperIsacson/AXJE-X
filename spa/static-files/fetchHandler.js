document.addEventListener("DOMContentLoaded", function(){
    document.querySelector("#registerPage form").addEventListener("submit", function (event) {
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
        ).then(response => {
            if (response.status == 201) {
                return response.json()
            }
            else {
                window.location.replace("/error/" + response.status)
            }
        })
            .then(body => {
                login(body)
                window.location.replace("/")
            })
            .catch(error => {
                console.log(error)
                window.location.replace("/error/500")
            })
    })
    
    document.querySelector("#loginPage form").addEventListener("submit", function (event) {
        event.preventDefault()
    
        const usernameOrEmail = document.querySelector("#loginPage .usernameOrEmail").value
        const password = document.querySelector("#loginPage .password").value
    
        const loginInfo = {
            grantType: "password",
            usernameOrEmail: usernameOrEmail,
            password: password
        }
    
        fetch(
            "http://localhost:8080/restAPI/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        }
        )
            .then(response => {
                if (response.status == 200) {
                    return response.json()
                }
                else {
                    window.location.replace("/error/" + response.status)
                }
            })
            .then(body => {
                login(body)
                window.location.replace("/")
            })
            .catch(error => {
                console.log(error)
                window.location.replace("/error/500")
            })
    })
    
    document.querySelector("#createActivityPage form").addEventListener("submit", function (event) {
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
            "http://localhost:8080/restAPI/createActivity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.accessToken
            },
            body: JSON.stringify(activity)
        }
        )
            .then(response => {
                if (response.status == 201) {
                    window.location.replace("/activities")
                }
                else {
                    window.location.replace("/error/" + response.status)
                }
            })
            .catch(error => {
                console.log(error)
                window.location.replace("/error/500")
            })
    })
    
    document.querySelector("#updateActivityPage form").addEventListener("submit", function (event) {
        event.preventDefault()
    
        const activityId = document.querySelector("#updateActivityPage .activityId").value
        const title = document.querySelector("#updateActivityPage .title").value
        const location = document.querySelector("#updateActivityPage .location").value
        const date = document.querySelector("#updateActivityPage .date").value
        const time = document.querySelector("#updateActivityPage .time").value
        const description = document.querySelector("#updateActivityPage .description").value
    
        const activity = {
            activityId,
            title,
            location,
            date,
            time,
            description,
            userEmail: (localStorage.userEmail ? localStorage.userEmail : null)
        }
    
        fetch(
            "http://localhost:8080/restAPI/updateActivity/" + activityId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.accessToken
            },
            body: JSON.stringify(activity)
        }
        )
            .then(response => {
                if (response.status == 200) {
                    window.location.replace("/activities")
                }
                else {
                    window.location.replace("/error/" + response.status)
                }
            })
            .catch(error => {
                window.location.replace("/error/500")
            })
    })
})


function fetchAllActivities() {

    fetch(
        "http://localhost:8080/restAPI/activities"

    )
        .then(response => {
            if (response.status == 200) {
                return response.json()
            }
            else {
                window.location.replace("/error/" + response.status)
            }
        })
        .then(activities => {

            const ul = document.querySelector("#activitiesPage ul")
            ul.innerText = ""
            for (const activity of activities) {
                const li = document.createElement("li")
                const anchor = document.createElement("a")
                const name = document.createElement("p")
                name.innerText = "Title: " + activity.title
                const date = document.createElement("p")
                date.innerText = "Date: " + activity.date
                const time = document.createElement("p")
                time.innerText = "Time: " + activity.time
                const createdAt = document.createElement("p")
                createdAt.innerText = "Created at: " + activity.createdAt.toString().slice(0, 15)
                const author = document.createElement("p")
                author.innerText = "by: " + activity.username
                anchor.innerText = "Read more"
                anchor.setAttribute("href", '/activities/' + activity.id)
                const line = document.createElement("hr")
                

                li.appendChild(name)
                li.appendChild(date)
                li.appendChild(time)
                li.appendChild(createdAt)
                li.appendChild(author)
                li.appendChild(anchor)
                if (activity.userEmail == localStorage.userEmail) {
                    const deleteActivity = document.createElement("a")
                    deleteActivity.setAttribute("href", "/deleteActivity/" + activity.id)
                    deleteActivity.innerText = "Delete Activity"

                    const updateForm = document.createElement("form")
                    const updateButton = document.createElement("button")
                    updateForm.setAttribute("action", "/updateActivity/" + activity.id)
                    updateButton.setAttribute("type", "submit")
                    updateButton.innerText = "Update"
                    updateForm.appendChild(updateButton)

                    li.append(deleteActivity)
                    li.append(updateForm)
                    
                }
                li.append(line)
                ul.append(li)
            }

        })
        .catch(error => {
            console.log(error)
            window.location.replace("/error/500")
        })
}

function fetchActivityById(activityId) {
    fetch(
        "http://localhost:8080/restAPI/activities/" + activityId
    )
        .then(response => {
            if (response.status == 200) {
                return response.json()
            }
            else {
                window.location.replace("/error/" + response.status)
            }
        })
        .then(activity => {
            const activityPage = document.getElementById("activityPage")
            const updateActivityPage = document.getElementById("updateActivityPage")

            if (activityPage.classList.contains("current-page")) {
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
            else if (updateActivityPage.classList.contains("current-page")) {
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

        })
        .catch(error => {
            console.log(error)
            window.location.replace("/error/500")
        })
}

function deleteActivity(activityId) {
    const validator = {
        activityId,
        userEmail: (localStorage.userEmail ? localStorage.userEmail : null)
    }

    fetch(
        "http://localhost:8080/restAPI/deleteActivity/" + activityId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + localStorage.accessToken
        },
        body: JSON.stringify(validator)
    }
    )
        .then(response => {
            if (response.status == 200) {
                window.location.replace("/activities")
            }
            else {
                window.location.replace("/error/" + response.status)
            }
        })
        .catch(error => {
            console.log(error)
            window.location.replace("/error/500")
        })
}
