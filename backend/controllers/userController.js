const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const Cart = require("../models/cartModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Product = require("../models/productModel");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(404).json({ message: "Invalid email or password" });
  }

  if (!user.verified) {
    return res
      .status(400)
      .json({ message: "You have to verify email, please check your mail" });
  }
  generateToken(res, user._id);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    surname: user.surname || "",
    email: user.email,
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    surname,
    email,
    password,
  });

  const cart = await Cart.create({
    user: user._id,
    products: [],
  });

  user.cart = cart._id;

  await user.save();

  const token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
    expiresAt: new Date(new Date().getTime() + 3600 * 1000),
  });

  const link = `http://localhost:3000/users/${user._id}/verify/${token.token}`;

  const subject = "Verify your email";

  await sendEmail(res, user.email, subject, link);

  res.status(201).json({
    message: "A verification email has been sent, please check your email",
  });
});

const confirmUserRegistration = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!token) {
    return res.status(400).json({ message: "Link has expired" });
  }

  await User.updateOne({ _id: token.userId }, { verified: true });

  await Token.deleteOne({
    userId: user._id,
    token: req.params.token,
  });

  res.status(200).send({ message: "Email verified successfully" });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const registerDate = `${req.user.createdAt.getDate()}.${
    req.user.createdAt.getMonth() + 1
  }.${req.user.createdAt.getFullYear()}`;

  const user = {
    _id: req.user._id,
    name: req.user.name,
    surname: req.user.surname || "",
    email: req.user.email,
    registerDate,
  };

  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: "products.product",
    select: "-createdAt -updatedAt -__v ",
    populate: {
      path: "category subcategory brand",
      select: "name",
    },
  });

  const adjustedCartData = cart.products.map((item) => ({
    product: item.product,
    quantity: item.quantity,
  }));

  res
    .status(200)
    .json({ user, cart: adjustedCartData, isVerified: req.user.verified });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.surname = req.body.surname || user.surname;
  user.email = req.body.email || user.email;

  if (req.body.oldPassword && req.body.newPassword) {
    const matchPassword = await user.matchPassword(req.body.oldPassword);

    if (!matchPassword) {
      return res
        .status(400)
        .json({ message: "Your old password is incorrect" });
    }

    user.password = req.body.newPassword;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    surname: updatedUser.surname,
    email: updatedUser.email,
  });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
    expiresAt: new Date(new Date().getTime() + 60 * 1000),
  });

  const subject = "Reset your password";

  const content = `http://localhost:3000/resetpassword/${user._id}/${token.token}`;

  await sendEmail(res, user.email, subject, content);

  res.json({
    message:
      "An email for password reset has been sent. Please check your email.",
  });
});

const checkResetPasswordToken = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;

  const foundToken = await Token.findOne({
    userId: id,
    token,
  });

  if (!foundToken)
    return res
      .status(404)
      .send({ message: "Reset password token has expired" });

  res.status(200).json({ message: "Token found" });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const foundToken = await Token.findOne({
    userId: id,
    token,
  });

  if (!foundToken) {
    return res.status(404).send({ message: "Token has expired" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { password: hashedPassword }
  );

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  await Token.deleteOne({
    userId: user._id,
    token: req.params.token,
  });

  res
    .status(200)
    .json({ message: "You have successfully changed the password" });
});

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find()
    .select("-createdAt -updatedAt -__v")
    .populate({
      path: "brand",
      select: "name",
    })
    .populate({
      path: "category",
      select: "name",
    })
    .populate({
      path: "subcategory",
      select: "name",
    });

  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }

  res.status(200).json({ products });
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().select("name").populate({
    path: "subcategories",
    select: "name",
  });

  if (!categories) {
    return res.status(404).json({ message: "Categories not found" });
  }

  res.status(200).json({ categories });
});

const addProductToCart = asyncHandler(async (req, res, next) => {
  const { product, quantity } = req.body;

  console.log(product);

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const existingProductIndex = cart.products.findIndex(
    (item) => item.product.toString() === product
  );

  if (existingProductIndex !== -1) {
    cart.products[existingProductIndex].quantity += quantity || 1;
  } else {
    cart.products.push({ product, quantity: 1 });
  }

  await cart.save();

  const addedProduct = await Product.findById(product)
    .select("-createdAt -updatedAt -__v")
    .populate({
      path: "brand",
      select: "name",
    })
    .populate({
      path: "category",
      select: "name",
    })
    .populate({
      path: "subcategory",
      select: "name",
    });

  const adjustedProduct = {
    product: {
      _id: addedProduct._id,
      name: addedProduct.name,
      description: addedProduct.description,
      price: addedProduct.price,
      image: addedProduct?.images[0],
      brand: addedProduct.brand,
      category: addedProduct.category,
      subcategory: addedProduct.subcategory || null,
    },
    quantity: quantity || 1,
  };

  res.status(200).json({ addedProduct: adjustedProduct });
});

const syncCartProducts = asyncHandler(async (req, res, next) => {
  const { cartProducts } = req.body;

  console.log(cartProducts);

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cartProducts.forEach(async (cartProduct) => {
    const existingProduct = cart.products.find(
      (cp) => cp.product.toString() === cartProduct.product
    );

    if (existingProduct) {
      existingProduct.quantity += cartProduct.quantity;
    } else {
      cart.products.push({
        product: cartProduct.product,
        quantity: cartProduct.quantity,
      });
    }
  });

  await cart.save();

  const updatedCart = await cart.populate("products.product");

  res.status(200).json({ updatedCart });
});

const removeProductFromCart = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.products = cart.products.filter((item) => {
    return item.product.toString() !== productId;
  });

  const updatedCart = await cart.save();

  console.log(updatedCart);

  res.status(200).json({ message: "Product removed from cart successfully" });
});

const decreaseProductQuantity = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  console.log(productId);

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  cart.products[productIndex].quantity -= 1;

  if (cart.products[productIndex].quantity <= 0) {
    cart.products.splice(productIndex, 1);
  }

  await cart.save();

  res.status(200).json({ message: "Product quantity decreased successfully" });
});

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  confirmUserRegistration,
  checkResetPasswordToken,
  getAllProducts,
  addProductToCart,
  removeProductFromCart,
  decreaseProductQuantity,
  syncCartProducts,
  getCategories,
};
