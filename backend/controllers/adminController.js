const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Category = require("../models/categoryModel");
const Subcategory = require("../models/subcategoryModel");
const Group = require("../models/groupModel");
const User = require("../models/userModel");
const Brand = require("../models/brandModel");
const Image = require("../models/imageModel");
const Specification = require("../models/specificationModel");
const Order = require("../models/orderModel");
const slugify = require("../utils/slugify");
const fs = require("fs");
const path = require("path");

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
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
    secure: true,
    sameSite: "None",
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

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-password -verified -updatedAt -__v");

  if (!users) {
    return res.status(404).json({ message: "Users not found" });
  }

  const adjustedUsers = users.map((user) => ({
    ...user.toObject(),
    createdAt: `${user.createdAt.getDate()}.${
      user.createdAt.getMonth() + 1
    }.${user.createdAt.getFullYear()}`,
  }));

  res.status(200).json(adjustedUsers);
});

const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { name, surname, email, password } = req.body;

  const user = await User.findById(userId);

  user.name = name;
  user.surname = surname;
  user.email = email;

  if (password) {
    const salt = await bcrypt.genSalt(10);

    const newPassword = await bcrypt.hash(password, salt);

    user.password = newPassword;
  }
  await user.save();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const registerDate = `${user.createdAt.getDate()}.${
    user.createdAt.getMonth() + 1
  }.${user.createdAt.getFullYear()}`;

  const adjustedUser = {
    ...user.toObject(),
    createdAt: registerDate,
  };

  res.status(200).json({
    user: adjustedUser,
    message: `User has been successfully updated.`,
  });
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
    if ((specification.type !== "") & (specification.value !== "")) {
      const newSpecification = await Specification.create({
        type: specification.type,
        value: specification.value,
      });
      newSpecifications.push(newSpecification._id);
    }
  }

  await foundCategory.save();

  const images = [];

  for (const file of req.files) {
    const newImage = await Image.create({ url: file.path });
    images.push(newImage._id);
  }

  const newProduct = await Product.create({
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

  const addedProduct = await Product.findById(newProduct._id)
    .select("-__v -createdAt -updatedAt")
    .populate([
      {
        path: "category",
        select: "name slug",
      },
      {
        path: "subcategory",
        select: "name slug",
      },
      {
        path: "group",
        select: "name slug",
      },
      {
        path: "brand",
        select: "name slug",
      },
      {
        path: "images",
        select: "url",
      },
      {
        path: "specifications",
        select: "type value",
      },
    ]);

  res.status(200).json({
    product: addedProduct,
    message: "Product has created successfuly",
  });
});

const editProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

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

  const foundProduct = await Product.findById(productId);
  if (!foundProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  const updatedSpecifications = [];
  for (const specification of JSON.parse(specifications)) {
    let updatedSpecification;
    if (specification.type !== "" && specification.value !== "") {
      if (specification._id) {
        updatedSpecification = await Specification.findByIdAndUpdate(
          specification._id,
          { type: specification.type, value: specification.value }
        );
      } else {
        updatedSpecification = await Specification.create({
          type: specification.type,
          value: specification.value,
        });
      }
      updatedSpecifications.push(updatedSpecification._id);
    }
  }

  if (
    JSON.stringify(foundProduct.specifications) !==
    JSON.stringify(updatedSpecifications)
  ) {
    foundProduct.specifications = updatedSpecifications;
  }

  if (foundProduct.name !== name) {
    foundProduct.name = name;
    foundProduct.slug = slugify(name);
  }

  foundProduct.description = description || foundProduct.description;
  foundProduct.price = price || foundProduct.price;

  let foundCategory = await Category.findOne({ name: category });
  if (!foundCategory) {
    foundCategory = await Category.create({
      name: category,
      slug: slugify(category),
      subcategories: [],
    });
  }

  if (category !== foundProduct.category.toString()) {
    foundProduct.category = foundCategory._id;
  }

  let foundSubcategory = await Subcategory.findOne({
    name: subcategory,
    category: foundCategory._id,
  });
  if (!foundSubcategory) {
    foundSubcategory = await Subcategory.create({
      name: subcategory,
      category: foundCategory._id,
      slug: slugify(subcategory),
    });
    foundCategory.subcategories.push(foundSubcategory._id);
    await foundCategory.save();
  }

  if (subcategory !== foundProduct.subcategory.toString()) {
    foundProduct.subcategory = foundSubcategory._id;
  }

  let foundGroup = await Group.findOne({
    name: group,
    category: foundCategory._id,
    subcategory: foundSubcategory._id,
  });

  if (!foundGroup) {
    foundGroup = await Group.create({
      name: group,
      category: foundCategory._id,
      subcategory: foundSubcategory._id,
      slug: slugify(group),
    });
    foundSubcategory.groups.push(foundGroup._id);
    await foundSubcategory.save();
  }

  if (group !== foundProduct.group.toString()) {
    foundProduct.group = foundGroup._id;
  }

  let foundBrand = await Brand.findOne({
    name: brand,
  });

  if (!foundBrand) {
    foundBrand = await Brand.create({
      name: brand,
      slug: slugify(brand),
    });
    foundGroup.brands.push(foundBrand._id);
    await foundGroup.save();
  }

  if (brand !== foundProduct.brand.toString()) {
    foundProduct.brand = foundBrand._id;
  }

  const updatedImages = [];
  for (const file of req.files) {
    const existingImage = await Image.findOne({ url: file.path });
    if (!existingImage) {
      const newImage = await Image.create({ url: file.path });
      updatedImages.push(newImage);
    } else {
      updatedImages.push(existingImage);
    }
  }

  await foundProduct.save();

  const updatedProduct = await Product.findById(foundProduct._id)
    .select("-__v -createdAt -updatedAt")
    .populate([
      {
        path: "category",
        select: "name slug",
      },
      {
        path: "subcategory",
        select: "name slug",
      },
      {
        path: "group",
        select: "name slug",
      },
      {
        path: "brand",
        select: "name slug",
      },
      {
        path: "images",
        select: "url",
      },
      {
        path: "specifications",
        select: "type value",
      },
    ]);

  res.status(200).json({
    product: updatedProduct,
    message: "Product has been updated successfully",
  });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId).populate("images", "url");

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await Specification.deleteMany({ _id: { $in: product.specifications } });

  await Image.deleteMany({ _id: { $in: product.images } });

  await Product.findByIdAndDelete(productId);

  const carts = await Cart.find({ "products.product": product._id });

  carts.forEach(async (cart) => {
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== product._id
    );
    await cart.save();
  });

  product.images.forEach((image) => {
    const imagePath = path.join(image.url);
    fs.unlinkSync(imagePath);
  });

  await Product.findByIdAndDelete(product._id);

  res.status(200).json("Product has successfully deleted");
});

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find()
    .select("-createdAt -updatedAt -__v")
    .populate([
      {
        path: "category",
        select: "name slug",
        populate: {
          path: "subcategories",
          select: "name slug",
        },
      },
      {
        path: "subcategory",
        select: "name slug",
        populate: {
          path: "groups",
          select: "name slug",
          populate: {
            path: "brands",
            select: "name slug",
          },
        },
      },
      {
        path: "group",
        select: "name slug",
        populate: {
          path: "brands",
          select: "name slug",
        },
      },
      {
        path: "brand",
        select: "name slug",
      },
      {
        path: "images",
        select: "url",
      },
      {
        path: "specifications",
        select: "type value",
      },
    ]);

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

const getAllChartInfo = asyncHandler(async (req, res, next) => {
  const { year } = req.params;

  const orders = await Order.find();

  // Filtriraj narudžbine prema godini
  const filteredOrders = orders.filter((order) => {
    return new Date(order.createdAt).getFullYear() === parseInt(year, 10);
  });

  // Mesecne zarade, kategorije proizvoda i top 3 proizvoda
  const monthlyEarnings = Array(12).fill(0);
  const categoryCount = {};
  const productCount = {};

  for (const order of filteredOrders) {
    const month = new Date(order.createdAt).getMonth();
    monthlyEarnings[month] += order.amount;

    for (const item of order.products) {
      const product = await Product.findById(item.product).populate("category");

      // Dodaj cenu proizvoda
      const price = Math.ceil(product.price);

      // Azuriraj kategoriju proizvoda
      const category = product.category.name;
      if (categoryCount[category]) {
        categoryCount[category] += item.quantity;
      } else {
        categoryCount[category] = item.quantity;
      }

      // Azuriraj top 3 proizvoda
      if (productCount[product.name]) {
        productCount[product.name].quantity += item.quantity;
      } else {
        productCount[product.name] = {
          quantity: item.quantity,
          productId: product._id,
          price,
        };
      }
    }
  }

  const categoryLabels = Object.keys(categoryCount);
  const categoryData = Object.values(categoryCount);

  const sortedProductCount = Object.entries(productCount).sort(
    (a, b) => b[1].quantity - a[1].quantity
  );
  const topProductsData = sortedProductCount
    .slice(0, 3)
    .map(([name, { quantity, productId, price }]) => ({
      name,
      quantity,
      productId,
      price,
    }));

  res.json({
    monthlyEarnings,
    categories: {
      labels: categoryLabels,
      data: categoryData,
    },
    topProducts: topProductsData,
  });
});

module.exports = {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  getUsers,
  updateUserProfile,
  deleteUser,
  addProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  addCategory,
  addSubcategory,
  addGroup,
  addBrand,
  getInfoForAddingProduct,
  getAllChartInfo,
};
