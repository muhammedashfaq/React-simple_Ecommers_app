const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminLogin = asyncHandler(async (req, res) => {
    console.log(req.body);
  const { email, password } = req.body;

  const admin = await User.findOne({ email });
  if (!admin) {
    res.status(200).send({ message: "User Not exist", success: false });
  }
  if(admin.isVerified && admin.isAdmin){
    const passwordCheck = await bcrypt.compare(password,admin.password)
    if(!passwordCheck){
        res.status(200).send({message:"Password Wrong", success:false})
    }else{
        const token = jwt.sign(
            { id: admin._id, name: admin.name, role: "ADMIN" },
            process.env.JWT_SECRET_ADMIN,
            { expiresIn: "1d" }
          );
          res
            .status(200)
            .send({ message: "Successfully LoggedIn", success: true, data: token });
    }

  }else{
    res.status(200).send({ message: "This User Not vlaid", success: false });

  }

});

module.exports = {
  adminLogin,
};
