const express = require('express')
const profileManager = require('../../bll/profileManager')

const router = express.Router()

router.get("/", function(request, response){
    response.render("profile.hbs")
})




module.exports = router