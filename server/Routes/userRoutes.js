const express = require("express")
const userRoute = express.Router()
const userAuth = require("../middleware/AuthUser")
const {registerUser,loginUser,fetchProduct,productToCart,fetchCartData} = require("../Controllers/userController")

userRoute.post("/register",registerUser)
userRoute.post("/login",loginUser)

userRoute.post('/fetchProduct',userAuth,fetchProduct)
userRoute.post('/addtocart',userAuth,productToCart)
userRoute.post('/fetchcartdata',userAuth,fetchCartData)







module.exports = userRoute
