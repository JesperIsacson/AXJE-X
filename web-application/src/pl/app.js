//docker build --tag=my-web-app:latest .
//docker stop <container id>   (docker container ls)
//docker run -p 3000:8080 my-web-app:latest

//docker-compose up --build      (Använd vid start eller vid ändring i en image)
//docker-compose up     (Kör den senaste builden på imagen)
//git add .
//git commit -m "content"
//git push origin (branch)

const expressHandlebars = require('express-handlebars')
const express = require('express')
const expressSession = require('express-session')
const redis = require('redis')
const redisClient = redis.createClient({host: 'session-database'})
const redisStore = require('connect-redis')(expressSession)
const bodyParser = require('body-parser')
const awilix = require('awilix')

const loginRouter = require("./routers/loginRouter")
const activityRouter = require("./routers/activityRouter")
const profileRouter = require("./routers/profileRouter")
const commentRouter = require("./routers/commentRouter")


const activityManager = require('../bll/activityManager')
const profileManager = require('../bll/profileManager')
const userManager = require('../bll/userManager')
const commentManager = require('../bll/commentManager')
const activityRepository = require('../dal/activityRepository')
const profileRepository = require('../dal/profileRepository')
const userRepository = require('../dal/userRepository')
const commentRepository = require('../dal/commentRepository')
const participantRepository = require('../dal-mysql/participantsRepository')


const container = awilix.createContainer()
container.register('loginRouter', awilix.asFunction(loginRouter))
container.register('activityRouter', awilix.asFunction(activityRouter))
container.register('profileRouter', awilix.asFunction(profileRouter))
container.register('commentRouter', awilix.asFunction(commentRouter))
container.register('activityManager', awilix.asFunction(activityManager))
container.register('profileManager', awilix.asFunction(profileManager))
container.register('userManager', awilix.asFunction(userManager))
container.register('commentManager', awilix.asFunction(commentManager))
container.register('activityRepository', awilix.asFunction(activityRepository))
container.register('profileRepository', awilix.asFunction(profileRepository))
container.register('userRepository', awilix.asFunction(userRepository))
container.register('commentRepository', awilix.asFunction(commentRepository))
container.register('participantsRepository', awilix.asFunction(participantRepository))


const theLoginRouter = container.resolve('loginRouter')
const theActivityRouter = container.resolve('activityRouter')
const theProfileRouter = container.resolve('profileRouter')
const theCommentRouter = container.resolve('commentRouter')


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
    console.error(error)
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

app.use("/login", theLoginRouter)
app.use("/profile", theProfileRouter)
app.use("/activities", theActivityRouter)
app.use("/comment", theCommentRouter)

app.get('/', function(request, response){
    response.render("home.hbs")
})

app.get("/register", function(request, response){
    response.render("register.hbs")
})

app.get("/activities", function(request, response){
    response.render("activities.hbs")
})

app.listen(8080, function(){
    console.log("App listening on port 8080")
})