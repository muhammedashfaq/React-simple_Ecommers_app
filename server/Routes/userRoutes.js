const express = require("express")
const userRoute = express.Router()
const {registerUser,loginUser} = require("../Controllers/userController")

userRoute.post("/register",registerUser)
userRoute.post("/login",loginUser)




module.exports = userRoute
