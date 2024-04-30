const express = require("express");
const {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  addProduct,
  editProduct,
  getProductByCategory,
  getProductByCategoryAndSubcategory,
  addCategory,
  addSubcategory,
  getAllProducts,
  deleteUser,
  addProductToCart,
  removeProductFromCart,
  decreaseProductQuantity,
  addBrand,
  getInfoForAddingProduct,
  addGroup,
  getUsers,
  updateUserProfile,
  deleteProduct,
} = require("../controllers/adminController");
const { adminProtect } = require("../middleware/authMiddleware");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/profile", adminProtect, getAdminProfile);
router.put("/update-user/:userId", adminProtect, updateUserProfile);
router.delete("/delete-user/:userId", adminProtect, deleteUser);
router.delete("/delete-product/:productId", adminProtect, deleteProduct);
router.post(
  "/add-product",
  adminProtect,
  upload.array("images", 3),
  addProduct
);
router.put(
  "/edit-product/:productId",
  adminProtect,
  upload.array("images", 3),
  editProduct
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
router.get("/records/info", adminProtect, getInfoForAddingProduct);

module.exports = router;
