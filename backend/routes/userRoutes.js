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
  getFilteredSearchProducts,
  getProductData,
  getRecords,
  getGroupData,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.get("/users/:id/verify/:token", confirmUserRegistration);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.get("/check-token/:id/:token", checkResetPasswordToken);
router.get("/term/:term", getFilteredSearchProducts);
router.post("/reset-password/:id/:token", resetPassword);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get("/products", getAllProducts);
router.get("/records", getRecords);
router.post("/cart/add-product", protect, addProductToCart);
router.get(
  "/product/:categoryName/:subcategoryName/:groupName/:productName",
  getProductData
);
router.get("/products/:categoryName/:subcategoryName/:groupName", getGroupData);
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

router.post("/cart/sync-products", protect, syncCartProducts);

module.exports = router;
