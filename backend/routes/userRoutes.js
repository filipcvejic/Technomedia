const express = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  confirmUserRegistration,
  checkResetPasswordToken,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.get("/users/:id/verify/:token", confirmUserRegistration);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.get("/check-token/:id/:token", checkResetPasswordToken);
router.post("/reset-password/:id/:token", resetPassword);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
