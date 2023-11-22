const express = require("express");
const adminRoutes = express.Router();
const upload =require("../middleware/multer")
const authAdmin = require('../middleware/AuthAdmin')
const { adminLogin,addproduct } = require("../Controllers/adminController");

adminRoutes.post("/adminLogin",adminLogin);
adminRoutes.post('/addproducts',authAdmin,upload.upload.array("image",5),addproduct)

module.exports = adminRoutes;

