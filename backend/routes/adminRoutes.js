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
} = require("../controllers/adminController");
const { adminProtect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:id/:token", resetPassword);
router
  .route("/profile")
  .get(adminProtect, getAdminProfile)
  .put(adminProtect, updateAdminProfile);

router.post("/add-product", adminProtect, addProduct);
router.post("/add-category", adminProtect, addCategory);
router.post("/add-subcategory", adminProtect, addSubcategory);
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
