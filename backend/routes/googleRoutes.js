const express = require("express");
const passport = require("passport");
const { protect } = require("../middleware/authMiddleware");
const generateToken = require("../utils/generateToken");

const router = express.Router();

const successLoginUrl = "http://localhost:3000/SSO/success";
const errorLoginUrl = "http://localhost:3000/login/error";

router.get("/login/success", protect, (req, res) => {
  console.log(req.user);

  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later.",
    failureRedirect: errorLoginUrl,
    // successRedirect: successLoginUrl,
    session: false,
  }),
  (req, res) => {
    generateToken(res, req.user._id);
    res.redirect(successLoginUrl);
  }
);

module.exports = router;
