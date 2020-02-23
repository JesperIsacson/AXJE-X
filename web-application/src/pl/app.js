//docker build --tag=my-web-app:latest .
//docker stop <container id>   (docker container ls)
//docker run -p 3000:8080 my-web-app:latest

//docker-compose up --build      (Använd vid start eller vid ändring i en image)
//docker-compose up     (Kör den senaste builden på imagen)

const expressHandlebars = require('express-handlebars')
const express = require('express')
const expressSession = require('express-session')
const redis = require('redis')
const redisClient = redis.createClient({host: 'session-database'})
const redisStore = require('connect-redis')(expressSession)
const bodyParser = require('body-parser')

const loginRouter = require("./routers/loginRouter")
const profileRotuer = require("./routers/profileRouter")

const app = express()

app.use(express.static(__dirname+"/public"))

app.set("views", "src/pl/views")

app.engine("hbs", expressHandlebars({
    defaultLayout: "main.hbs"
}))

app.use(bodyParser.urlencoded({
    extended: false
}))

redisClient.on("error", function(error) {
    console.error(error);
})

app.use(expressSession({
    secret: "l97hvfdi96590mc72j3nd",
    saveUninitialized: false,
    resave: false,
    store: new redisStore({client: redisClient}),
}))

app.use(function(request, response, next){
    response.locals.isLoggedIn = request.session.isLoggedIn
    next()
})

app.use("/login", loginRouter)
app.use("/profile", profileRotuer)

app.get('/', function(request, response){
    response.render("home.hbs")
})

app.get("/register", function(request, response){
    response.render("register.hbs")
})

app.listen(8080, function(){
    console.log("App listening on port 8080")
})