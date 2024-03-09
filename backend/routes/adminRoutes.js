const express = require("express");
const {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  addProduct,
  getProductByCategory,
  getProductByCategoryAndSubcategory,
  getSubcategories,
  getCategories,
  addCategory,
  addSubcategory,
  getAllProducts,
  deleteUser,
  addProductToCart,
  removeProductFromCart,
  decreaseProductQuantity,
} = require("../controllers/adminController");
const { adminProtect } = require("../middleware/authMiddleware");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:id/:token", resetPassword);
router
  .route("/profile")
  .get(adminProtect, getAdminProfile)
  .put(adminProtect, updateAdminProfile);

router.post("/add-product", adminProtect, upload.single("image"), addProduct);
router.post("/cart/add-product", adminProtect, addProductToCart);
router.delete(
  "/cart/remove-product/:productId",
  adminProtect,
  removeProductFromCart
);
router.put(
  "/cart/decrease-quantity/:productId",
  adminProtect,
  decreaseProductQuantity
);
router.post("/add-category", adminProtect, addCategory);
router.delete("/:userId", adminProtect, deleteUser);
router.post("/add-subcategory", adminProtect, addSubcategory);
router.get("/products", adminProtect, getAllProducts);
router.get("/products/:category", adminProtect, getProductByCategory);
router.get(
  "/products/:category/:subcategory",
  adminProtect,
  getProductByCategoryAndSubcategory
);
router.get(
  "/categories/:category/subcategories",
  adminProtect,
  getSubcategories
);
router.get("/categories", adminProtect, getCategories);

module.exports = router;
