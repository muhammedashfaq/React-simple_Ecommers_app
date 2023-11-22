const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const { sendVerifymail } = require("../Config/nodeMailer");
const jwt = require("jsonwebtoken");
const ProductsDb = require("../Models/productModel");
const Cart = require("../Models/cartModel");
//reguster User ====

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isExist = await User.findOne({ email });
  if (isExist) {
    return res
      .status(200)
      .send({ message: "user alredy exist", success: false });
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
//login User ===
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
        { id: user._id, name: user.name, role: "USER" },
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

//GetProduct details to front-End ===
const fetchProduct = asyncHandler(async (req, res) => {
  const id = req.userId;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res
      .status(200)
      .send({ message: "user does not exisr", success: false });
  } else {
    const productData = await ProductsDb.find();
    res
      .status(200)
      .send({ message: "fetched", success: true, data: productData });
  }
});




const productToCart = asyncHandler(async (req, res) => {
  const id = req.userId;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res
      .status(200)
      .send({ message: "user does not exisr", success: false });
  } else {

    const { productId } = req.body;
    const product = await ProductsDb.findById({ _id: productId });
    if (!product) {
      res.status(200).send({ message: "product not exist", success: false });
    } else {
      const Usercart = await Cart.findOne({ user: user._id });
      if (!Usercart) {
        const addtoCart = new Cart({
          user: user._id,
          products: [{
            productId:productId,
            ProductName: product.name,
            price: product.price,
            image: product.image,
          }],
        });
        await addtoCart.save();
        res.status(200).send({ message: "added", success: true });
      } else {
        
        const productIndex = await Usercart.products.findIndex(
          (productItem) => productItem.productId == productId
        )
        if (productIndex !== -1) {

          await Cart.findOneAndUpdate(
            { user: user._id, "products.productId": productId },
            { $inc: { "products.$.quantity": 1 } }
          )
          return res.status(200).send({ message: "added", success: true });
        }else{
         
            await Cart.findOneAndUpdate(
              { user: user._id },
              {
                $push: {
                  products: { productId: productId, price: product.price,ProductName:product.name,image:product.image },
                },
              }
            );
            return res.status(200).send({ message: "added", success: true });
          
        }
      }
    }
  }
}

)


const fetchCartData =asyncHandler(async(req,res)=>{

  const id = req.userId;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res
      .status(200)
      .send({ message: "user does not exisr", success: false });
  } else {

    const cartData = await Cart.findOne({user:user._id}).populate("products.productId")
    const totalPrice = cartData.products.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0);

    console.log(totalPrice)
    res.status(200).send({message:"fetched",success:true,data:cartData,totalPrice:totalPrice})
  }

})
module.exports = {
  registerUser,
  loginUser,
  fetchProduct,
  productToCart,
  fetchCartData
};
