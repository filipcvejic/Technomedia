const jwt = require("jsonwebtoken");

const isProduction = process.env.NODE_ENV === "production";

const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    // isProduction
    sameSite: "None",
    //  isProduction ? "None" : "Lax"
    maxAge: 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;
