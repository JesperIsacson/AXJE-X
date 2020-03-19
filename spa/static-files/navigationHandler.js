document.addEventListener("DOMContentLoaded", function () {

    changeToPage(location.pathname)

    if (localStorage.accessToken && localStorage.userEmail) {
        userValidator = {
            accessToken: localStorage.accessToken,
            userEmail: localStorage.userEmail
        }
        login(userValidator)
    }
    else {
        logout()
    }

    document.body.addEventListener("click", function (event) {
        if (event.target.tagName == "a") {
            event.preventDefault()
            const url = event.target.getAttribute("href")
            goToPage(url)
        }
    })

})

window.addEventListener("popstate", function (event) {
    const url = location.pathname
    changeToPage(url)
})

function goToPage(url) {
    changeToPage(url)
    history.pushState({}, "", url)
}

function changeToPage(url) {
    const currentPageDiv = document.getElementsByClassName("current-page")[0]
    if (currentPageDiv) {
        currentPageDiv.classList.remove("curent-page")
    }

    if (url == "/") {
        document.getElementById("homePage").classList.add("current-page")
    }
    else if (url == "/activities") {
        document.getElementById("activitiesPage").classList.add("current-page")
        fetchAllActivities()
    }
    else if (url == "/createActivity") {
        document.getElementById("createActivityPage").classList.add("current-page")
    }
    else if (new RegExp("^/activities/[0-9]+$").test(url)) {
        document.getElementById("activityPage").classList.add("current-page")
        const activityId = url.split("/")[2]
        fetchActivityById(activityId)
    }
    else if (new RegExp("^/updateActivity/[0-9]+$").test(url)) {
        document.getElementById("updateActivityPage").classList.add("current-page")
        const activityId = url.split("/")[2]
        fetchActivityById(activityId)
    }
    else if (new RegExp("^/deleteActivity/[0-9]+$").test(url)) {
        const activityId = url.split("/")[2]
        deleteActivity(activityId)
    }
    else if (url == "/register") {
        document.getElementById("registerPage").classList.add("current-page")
    }
    else if (url == "/login") {
        document.getElementById("loginPage").classList.add("current-page")
    }
    else if (url == "/logout") {
        logout()
    }
    else if (url == "/error/400") {
        document.getElementById("error400Page").classList.add("current-page")
    }
    else if (url == "/error/401") {
        document.getElementById("error401Page").classList.add("current-page")
    }
    else if (url == "/error/500") {
        document.getElementById("error500Page").classList.add("current-page")
    }
    else {
        document.getElementById("error404Page").classList.add("current-page")
    }
}

function login(userValidator) {
    localStorage.accessToken = userValidator.accessToken
    localStorage.userEmail = userValidator.userEmail
    console.log(localStorage.accessToken)
    console.log(localStorage.userEmail)
    document.body.classList.remove("isLoggedOut")
    document.body.classList.add("isLoggedIn")
}

function logout() {
    localStorage.accessToken = ""
    localStorage.userEmail = ""
    document.body.classList.remove("isLoggedIn")
    document.body.classList.add("isLoggedOut")
}