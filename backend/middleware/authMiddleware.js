const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    return res.status(404).json({ message: "Not authorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(400).json({ message: "Token failed" });
  }

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  req.user = user;
  next();
});

const adminProtect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    return res.status(404).json({ message: "Not authorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(400).json({ message: "Token failed" });
  }

  const admin = await Admin.findById(decoded.id).select("-password");

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  req.admin = admin;
  next();
});

module.exports = { protect, adminProtect };
