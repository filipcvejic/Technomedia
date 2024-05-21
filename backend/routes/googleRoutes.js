const express = require("express");
const passport = require("passport");
const { protect } = require("../middleware/authMiddleware");
const generateToken = require("../utils/generateToken");

const router = express.Router();

const successLoginUrl = "https://technomedia-5gpn.onrender.com/SSO/success";
const errorLoginUrl = "https://technomedia-5gpn.onrender.com/login/error";

router.get("/login/success", protect, (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        surname: req.user.surname,
        email: req.user.email,
      },
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
    session: false,
  }),
  (req, res) => {
    generateToken(res, req.user._id);
    res.redirect(successLoginUrl);
  }
);

module.exports = router;
