const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const { sendVerifymail } = require("../Config/nodeMailer");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const isExist = await User.findOne({ email });
  if (isExist) {
    res.status(200).send({ message: "user alredy exist", success: false });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = new User({
    name,
    email,
    password: hashedPassword,
  });

  const savedData = userData.save();
  //   if (savedData) {
  //     const otpGenarated = Math.floor(1000 + Math.random() * 9999);

  //     sendVerifymail(name, email, otpGenarated);
  //   }

  res.status(200).send({ message: "user details saved", success: true });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(200).send({ message: "This User Not Exist", success: false });
  }
  if (user.isVerified) {
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      res.status(200).send({ message: "Password Not Match", success: false });
    } else {
      const token = jwt.sign(
        { _id: user.id, name: user.name, role: "USER" },
        process.env.JWT_SECRET_USER,
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .send({ message: "Successfully LoggedIn", success: true, data: token });
    }
  } else {
    res.status(200).send({ message: "This User Not verified", success: false });
  }
});

module.exports = {
  registerUser,
  loginUser,
};
