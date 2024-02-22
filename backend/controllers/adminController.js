const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Subcategory = require("../models/subcategoryModel");

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.clearCookie("jwt");
    generateToken(res, admin._id);
    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
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

  res.status(200).json({ admin });
});

const updateAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.surname = req.body.surname || admin.surname;
    admin.email = req.body.email || admin.email;

    const matchPassword = await admin.matchPassword(req.body.oldPassword);

    if (!matchPassword) {
      res.status(401);
      throw new Error("Your old password is incorrect");
    }

    admin.password = req.body.newPassword;

    const updatedAdmin = await admin.save();

    res.status(200).json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      surname: updatedAdmin.surname,
      email: updatedAdmin.email,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

const addProduct = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, price, category, subcategory } = req.body;

    const foundCategory = await Category.findOne({ name: category });
    if (!foundCategory) {
      res.status(404);
      throw new Error("Category not found");
    }

    const foundSubcategory = await Subcategory.findOne({ name: subcategory });
    if (!foundSubcategory) {
      res.status(404);
      throw new Error("Subcategory not found");
    }

    await Product.create({
      name,
      description,
      price,
      category: foundCategory._id,
      subcategory: foundSubcategory._id,
    });

    res.status(200).json({ message: "Product has created successfuly" });
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
});

const getProductByCategory = asyncHandler(async (req, res, next) => {
  try {
    const categoryName = req.params.category;

    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: "Kategorija nije pronađena" });
    }

    const products = await Product.find({ category: category._id }).select(
      "name description price"
    );

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Greska" });
  }
});

const getProductByCategoryAndSubcategory = asyncHandler(async (req, res) => {
  try {
    const categoryName = req.params.category;
    const subcategoryName = req.params.subcategory;

    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: "Kategorija nije pronađena" });
    }

    let filter = { category: category._id };

    if (subcategoryName) {
      const subcategory = await Subcategory.findOne({
        name: subcategoryName,
      });
      if (!subcategory) {
        return res
          .status(404)
          .json({ message: "Podkategorija nije pronađena" });
      }
      filter.subcategory = subcategory._id;
    }

    const products = await Product.find(filter).select(
      "name description price"
    );

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Greska" });
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find().select("name");

    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Greška" });
  }
});

const getSubcategories = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.category;

    const category = await Category.findById(categoryId);

    const subcategories = await Subcategory.find({
      category: category._id,
    }).select("name");

    res.status(200).json({ subcategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Greska" });
  }
});

const addCategory = asyncHandler(async (req, res) => {
  try {
    const categoryName = req.body.category;

    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      await Category.create({
        name: categoryName,
      });

      res.status(200).json({ message: "Category has created successfuly" });
    } else {
      res.status(401);
      throw new Error("This category already exists");
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const addSubcategory = asyncHandler(async (req, res) => {
  try {
    const categoryName = req.body.category;
    const subcategoryName = req.body.subcategory;

    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    const subcategory = await Subcategory.create({
      name: subcategoryName,
      category: category._id,
    });

    category.subcategories.push(subcategory._id);
    await category.save();

    res.status(200).json({ message: "Subcategory has created successfuly" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
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
};
