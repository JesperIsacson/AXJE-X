//docker build --tag=my-web-app:latest .
//docker stop <container id>   (docker container ls)
//docker run -p 3000:8080 my-web-app:latest

//docker-compose up --build      (Använd vid start eller vid ändring i en image)
//docker-compose up     (Kör den senaste builden på imagen)


const express = require('express')

const app = express()

app.get('/', function(request, response){
    response.send("Hellor world!")
})

app.listen(8080, function(){
    console.log("App listening on port 8080")
})