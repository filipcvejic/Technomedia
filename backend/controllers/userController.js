const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (!user.verified) {
      res.status(400);
      throw new Error("You have to verify email, please check your mail");
    }
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    surname,
    email,
    password,
  });

  const token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
  });

  const link = `http://localhost:3000/users/${user._id}/verify/${token.token}`;

  const subject = "Verify your email";

  await sendEmail(res, user.email, subject, link);

  res.status(200).json({
    message: "Email sent, check your mail",
  });
});

const confirmUserRegistration = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: token.userId }, { verified: true });

    await token.deleteOne({
      userId: user._id,
      token: req.params.token,
    });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    surname: req.user.surname ? req.user.surname : null,
    email: req.user.email,
  };

  res.status(200).json({ user, isVerified: req.user.verified });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.surname = req.body.surname || user.surname;
    user.email = req.body.email || user.email;

    const matchPassword = await user.matchPassword(req.body.oldPassword);

    if (!matchPassword) {
      res.status(401);
      throw new Error("Your old password is incorrect");
    }

    user.password = req.body.newPassword;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const subject = "Reset your password";

  const content = `http://localhost:3000/resetpassword/${user._id}/${token}`;

  await sendEmail(res, user.email, subject, content);
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(404);
      throw new Error(err.message);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findByIdAndUpdate(
        { _id: id },
        { password: hashedPassword }
      );
      console.log(user);
      res.json({ message: "Password successfully changed" });
    }
  });
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
};
