const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Category = require("../models/categoryModel");
const Subcategory = require("../models/subcategoryModel");
const Group = require("../models/groupModel");
const User = require("../models/userModel");
const Brand = require("../models/brandModel");
const Image = require("../models/imageModel");
const Specification = require("../models/specificationModel");
const slugify = require("../utils/slugify");

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(404).json({ message: "Invalid email or password" });
  }

  generateToken(res, admin._id);
  res.status(200).json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
  });
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Admin logged out" });
});

const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = {
    _id: req.admin._id,
    name: req.admin.name,
    surname: req.admin.surname ? req.admin.surname : null,
    email: req.admin.email,
  };

  const cart = await Cart.findOne({ admin: req.admin._id }).populate({
    path: "products.product",
    select: "-createdAt -updatedAt -__v ",
    populate: {
      path: "category subcategory",
      select: "name",
    },
  });

  const adjustedCartData = cart.products.map((item) => ({
    product: item.product,
    quantity: item.quantity,
  }));

  res.status(200).json({ admin, cart: adjustedCartData });
});

const updateAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  admin.name = req.body.name || admin.name;
  admin.surname = req.body.surname || admin.surname;
  admin.email = req.body.email || admin.email;

  const matchPassword = await admin.matchPassword(req.body.oldPassword);

  if (!matchPassword) {
    return res.status(401).json({ message: "Your old password is incorrect" });
  }

  admin.password = req.body.newPassword;

  const updatedAdmin = await admin.save();

  res.status(200).json({
    _id: updatedAdmin._id,
    name: updatedAdmin.name,
    surname: updatedAdmin.surname,
    email: updatedAdmin.email,
  });
});

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-password -verified -updatedAt -__v");

  if (!users) {
    return res.status(404).json({ message: "Users not found" });
  }

  res.status(200).json(users);
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: `User has been successfully deleted.` });
});

const addProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    price,
    category,
    subcategory,
    group,
    brand,
    specifications,
  } = req.body;

  const foundCategory = await Category.findOne({
    name: category,
  });
  if (!foundCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  const foundSubcategory = await Subcategory.findOne({
    name: subcategory,
    category: foundCategory._id,
  });

  if (!foundSubcategory) {
    return res.status(404).json({ message: "Subcategory not found" });
  }

  const foundGroup = await Group.findOne({
    name: group,
    category: foundCategory._id,
    subcategory: foundSubcategory._id,
  });

  if (!foundGroup) {
    return res.status(404).json({ message: "Group not found" });
  }

  const foundBrand = await Brand.findOne({ name: brand });
  if (!foundBrand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  const newSpecifications = [];

  for (const specification of JSON.parse(specifications)) {
    const newSpecification = await Specification.create({
      type: specification.type,
      value: specification.value,
    });
    newSpecifications.push(newSpecification._id);
  }

  await foundCategory.save();

  const images = [];

  for (const file of req.files) {
    const newImage = await Image.create({ url: file.path });
    images.push(newImage._id);
  }

  await Product.create({
    name,
    description,
    price,
    images,
    category: foundCategory._id,
    subcategory: foundSubcategory?._id,
    group: foundGroup?._id,
    brand: foundBrand?._id,
    specifications: newSpecifications,
    slug: slugify(name),
  });

  res.status(200).json({ message: "Product has created successfuly" });
});

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find()
    .select("-createdAt -updatedAt -__v")
    .populate({
      path: "brand",
      select: "name",
    })
    .populate({
      path: "category",
      select: "name",
    })
    .populate({
      path: "subcategory",
      select: "name",
    });

  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }

  res.status(200).json({ products });
});

const getInfoForAddingProduct = asyncHandler(async (req, res, next) => {
  const records = await Category.find()
    .select("-__v")
    .populate({
      path: "subcategories",
      select: "-category -__v",
      populate: {
        path: "groups",
        select: "-category -subcategory",
        populate: {
          path: "brands",
          select: "-__v",
        },
      },
    });

  res.status(200).json({ records });
});

const getProductByCategory = asyncHandler(async (req, res, next) => {
  const categoryName = req.params.category;

  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    return res.status(404).json({ message: "Kategorija nije pronađena" });
  }

  const products = await Product.find({ category: category._id }).select(
    "name description price image"
  );
  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }

  res.status(200).json({ products });
});

const getProductByCategoryAndSubcategory = asyncHandler(async (req, res) => {
  const categoryName = req.params.category;
  const subcategoryName = req.params.subcategory;

  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  let filter = { category: category._id };

  const subcategory = await Subcategory.findOne({
    name: subcategoryName,
  });
  if (!subcategory) {
    return res.status(404).json({ message: "Subcategory not found" });
  }
  filter.subcategory = subcategory._id;

  const products = await Product.find(filter).select(
    "name description price image"
  );

  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }

  res.status(200).json({ products });
});

const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find().select("name");
  // .populate({
  //   path: "subcategories",
  //   select: "name",
  // });

  res.status(200).json({ brands });
});

const getCategories = asyncHandler(async (req, res) => {
  const brandId = req.params.brand;

  const brand = await Brand.findById(brandId);

  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  const categories = await Category.find({
    brand: brand._id,
  }).select("name");

  if (!categories) {
    return res.status(404).json({ message: "Categories not found" });
  }

  res.status(200).json({ categories });
});

const getSubcategories = asyncHandler(async (req, res) => {
  const categoryId = req.params.category;

  const category = await Category.findById(categoryId);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const subcategories = await Subcategory.find({
    category: category._id,
  }).select("name");

  if (!subcategories) {
    return res.status(404).json({ message: "Subcategories not found" });
  }

  res.status(200).json({ subcategories });
});

const addCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;

  const category = await Category.findOne({ name: categoryName });

  if (category) {
    return res.status(401).json({ message: "This Category already exists" });
  }

  const newCategory = await Category.create({
    name: categoryName,
    slug: slugify(categoryName),
    subcategories: [],
  });

  res
    .status(200)
    .json({ newCategory, message: "CategnewCategory has created successfuly" });
});

const addSubcategory = asyncHandler(async (req, res) => {
  const { categoryId, subcategoryName } = req.body;

  const category = await Category.findById(categoryId);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const newSubcategory = await Subcategory.create({
    name: subcategoryName,
    category: category._id,
    slug: slugify(subcategoryName),
    groups: [],
  });

  category.subcategories.push(newSubcategory._id);
  await category.save();

  const adjustedNewSubcategoryInfo = await Subcategory.findById(
    newSubcategory._id
  ).select("-__v");

  res.status(200).json({
    newSubcategory: adjustedNewSubcategoryInfo,
    message: "Subcategory has created successfuly",
  });
});

const addGroup = asyncHandler(async (req, res, next) => {
  const { categoryId, subcategoryId, groupName } = req.body;

  const category = await Category.findById(categoryId);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const subcategory = await Subcategory.findById(subcategoryId);

  if (!subcategory) {
    return res.status(404).json({ message: "Subcategory not found" });
  }

  const newGroup = await Group.create({
    name: groupName,
    category: category._id,
    subcategory: subcategory._id,
    slug: slugify(groupName),
    brands: [],
  });

  subcategory.groups.push(newGroup._id);
  await subcategory.save();

  const adjustedNewGroupInfo = await Group.findById(newGroup._id).select(
    "-__v"
  );

  res.status(200).json({
    newGroup: adjustedNewGroupInfo,
    message: "Group has created successfuly",
  });
});

const addBrand = asyncHandler(async (req, res) => {
  const { groupId, brandName } = req.body;

  console.log(groupId, brandName);

  const foundGroup = await Group.findById(groupId);

  if (!foundGroup) {
    return res.status(404).json({ message: "Group not found" });
  }

  const existingBrand = await Brand.findOne({ name: brandName });

  if (existingBrand) {
    if (!foundGroup.brands.includes(existingBrand._id)) {
      foundGroup.brands.push(existingBrand._id);
      await foundGroup.save();
    }

    return res.status(200).json({
      existingBrand,
      message: "Brand already exists and has been added to the group",
    });
  }

  const newBrand = await Brand.create({
    name: brandName,
    slug: slugify(brandName),
  });

  foundGroup.brands.push(newBrand._id);
  await foundGroup.save();

  res.status(200).json({ newBrand, message: "Brand has created successfuly" });
});

const addProductToCart = asyncHandler(async (req, res, next) => {
  const { product, quantity } = req.body;

  let cart = await Cart.findOne({ admin: req.admin._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const existingProductIndex = cart.products.findIndex(
    (item) => item.product.toString() === product
  );

  if (existingProductIndex !== -1) {
    cart.products[existingProductIndex].quantity += quantity || 1;
  } else {
    cart.products.push({ product, quantity: 1 });
  }

  await cart.save();

  const addedProduct = await Product.findById(product)
    .select("-createdAt -updatedAt -__v")
    .populate({
      path: "brand",
      select: "name",
    })
    .populate({
      path: "category",
      select: "name",
    })
    .populate({
      path: "subcategory",
      select: "name",
    });

  const adjustedProduct = {
    product: {
      _id: addedProduct._id,
      name: addedProduct.name,
      description: addedProduct.description,
      price: addedProduct.price,
      image: addedProduct.image,
      brand: addProduct.brand,
      category: addedProduct.category,
      subcategory: addedProduct.subcategory,
    },
    quantity: quantity || 1,
  };

  res.status(200).json({ addedProduct: adjustedProduct });
});

const removeProductFromCart = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;

  const cart = await Cart.findOne({ admin: req.admin._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.products = cart.products.filter((item) => {
    return item.product.toString() !== productId;
  });

  await cart.save();

  res.status(200).json({ message: "Product removed from cart successfully" });
});

const decreaseProductQuantity = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ admin: req.admin._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  cart.products[productIndex].quantity -= +quantity || 1;

  if (cart.products[productIndex].quantity <= 0) {
    cart.products.splice(productIndex, 1);
  }

  await cart.save();

  res.status(200).json({ message: "Product quantity decreased successfully" });
});

// const increaseProductQuantity = asyncHandler(async (req, res, next) => {
//   const { productId, quantity } = req.body;

//   const cart = await Cart.findOne({ admin: req.admin._id });

//   if (!cart) {
//     return res.status(404).json({ message: "Cart not found" });
//   }

//   const existingProductIndex = cart.products.findIndex(
//     (product) => product._id === productId
//   );

//   if (existingProductIndex !== -1) {
//     cart.products[existingProductIndex].quantity += quantity;
//   } else {
//     cart.products.push({ productId, quantity });
//   }

//   await cart.save();
// });

module.exports = {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  getUsers,
  deleteUser,
  addProduct,
  getAllProducts,
  getProductByCategory,
  getProductByCategoryAndSubcategory,
  getBrands,
  getSubcategories,
  getCategories,
  addCategory,
  addSubcategory,
  addGroup,
  addBrand,
  addProductToCart,
  removeProductFromCart,
  decreaseProductQuantity,
  getInfoForAddingProduct,
};
