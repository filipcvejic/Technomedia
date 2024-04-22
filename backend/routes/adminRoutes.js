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
  addBrand,
  getBrands,
  getInfoForAddingProduct,
  addGroup,
  getUsers,
} = require("../controllers/adminController");
const { adminProtect } = require("../middleware/authMiddleware");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router
  .route("/profile")
  .get(adminProtect, getAdminProfile)
  .put(adminProtect, updateAdminProfile);
router.post(
  "/add-product",
  adminProtect,
  upload.array("images", 3),
  addProduct
);
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
router.post("/add-subcategory", adminProtect, addSubcategory);
router.post("/add-group", adminProtect, addGroup);
router.post("/add-brand", adminProtect, addBrand);
router.delete("/:userId", adminProtect, deleteUser);
router.get("/users", adminProtect, getUsers);
router.get("/products", adminProtect, getAllProducts);
router.get("/products/:category", adminProtect, getProductByCategory);
router.get(
  "/products/:category/:subcategory",
  adminProtect,
  getProductByCategoryAndSubcategory
);
router.get("/brands/:brand/categories", adminProtect, getCategories);
router.get(
  "/categories/:category/subcategories",
  adminProtect,
  getSubcategories
);
// router.get("/categories", adminProtect, getCategories);
router.get("/brands", adminProtect, getBrands);
router.get("/records/info", adminProtect, getInfoForAddingProduct);

module.exports = router;
