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

router.post("/add", addProduct);
router.get("/products/:category", getProductByCategory);
router.get(
  "/products/:category/:subcategory",
  getProductByCategoryAndSubcategory
);
router.get(
  "/categories/:category/subcategories",
  adminProtect,
  getSubcategories
);
router.get("/categories", adminProtect, getCategories);

module.exports = router;
