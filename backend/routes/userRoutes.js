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
  getAllProducts,
  addProductToCart,
  removeProductFromCart,
  decreaseProductQuantity,
  syncCartProducts,
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
router.get("/products", getAllProducts);
router.post("/cart/add-product", protect, addProductToCart);
router.delete(
  "/cart/remove-product/:productId",
  protect,
  removeProductFromCart
);
router.put(
  "/cart/decrease-quantity/:productId",
  protect,
  decreaseProductQuantity
);

router.post("/cart/sync-products", syncCartProducts);

module.exports = router;
