//docker build --tag=my-web-app:latest .
//docker stop <container id>   (docker container ls)
//docker run -p 3000:8080 my-web-app:latest

//docker-compose up --build      (Använd vid start eller vid ändring i en image)
//docker-compose up     (Kör den senaste builden på imagen)

const expressHandlebars = require('express-handlebars')
const express = require('express')



const loginRouter = require("./routers/loginRouter")

const app = express()

app.use(express.static(__dirname+"/public"))
app.use("/login", loginRouter)

app.set("views", "src/pl/views")

app.engine("hbs", expressHandlebars({
    defaultLayout: "main.hbs"
}))

app.get('/', function(request, response){
    response.render("home.hbs")
})

app.get("/register", function(request, response){
    response.render("register.hbs")
})

app.listen(8080, function(){
    console.log("App listening on port 8080")
})