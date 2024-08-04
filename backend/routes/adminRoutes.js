const express = require("express");
const {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  addProduct,
  editProduct,
  addCategory,
  addSubcategory,
  getAllProducts,
  deleteUser,
  addBrand,
  getInfoForAddingProduct,
  addGroup,
  getUsers,
  updateUserProfile,
  deleteProduct,
  getMonthlyEarnings,
  getCategoryInfo,
  getTopProducts,
} = require("../controllers/adminController");
const { adminProtect } = require("../middleware/authMiddleware");

const router = express.Router();

const {
  cloudinaryUploadMiddleware,
  upload,
} = require("../middleware/uploadMiddleware");

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/profile", adminProtect, getAdminProfile);
router.put("/update-user/:userId", adminProtect, updateUserProfile);
router.delete("/delete-user/:userId", adminProtect, deleteUser);
router.delete("/delete-product/:productId", adminProtect, deleteProduct);
router.post(
  "/add-product",
  upload.array("images", 3),
  cloudinaryUploadMiddleware,
  addProduct
);
router.put(
  "/edit-product/:productId",
  adminProtect,
  upload.array("images", 3),
  cloudinaryUploadMiddleware,
  editProduct
);
router.post("/add-category", adminProtect, addCategory);
router.post("/add-subcategory", adminProtect, addSubcategory);
router.post("/add-group", adminProtect, addGroup);
router.post("/add-brand", adminProtect, addBrand);
router.delete("/:userId", adminProtect, deleteUser);
router.get("/users", adminProtect, getUsers);
router.get("/products", adminProtect, getAllProducts);
router.get("/records/info", adminProtect, getInfoForAddingProduct);
router.get("/earnings/:year", adminProtect, getMonthlyEarnings);
router.get("/top-categories/:year", adminProtect, getCategoryInfo);
router.get("/top-products/:year", adminProtect, getTopProducts);

module.exports = router;
