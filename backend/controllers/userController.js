const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const Cart = require("../models/cartModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Subcategory = require("../models/subcategoryModel");
const Group = require("../models/groupModel");
const Order = require("../models/orderModel");
const Brand = require("../models/brandModel");
const Specification = require("../models/specificationModel");
const WishList = require("../models/wishListModel");
const {
  calculatePriceRange,
  extractBrands,
  extractUniqueSubcategories,
  extractUniqueGroups,
} = require("../utils/getProductsInfoActions");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!user.verified) {
    return res
      .status(400)
      .json({ message: "You have to verify email, please check your mail" });
  }
  generateToken(res, user._id);

  res.status(200).json({
    _id: user._id,
    name: user.name,
    surname: user.surname || "",
    email: user.email,
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    surname,
    email,
    password,
  });

  const cart = await Cart.create({
    user: user._id,
    products: [],
  });

  const wishList = await WishList.create({
    user: user._id,
    products: [],
  });

  user.wishList = wishList._id;
  user.cart = cart._id;

  await user.save();

  const token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
    expiresAt: new Date(new Date().getTime() + 3600 * 1000),
  });

  const link = `https://technomediashop.netlify.app/users/${user._id}/verify/${token.token}`;

  const subject = "Verify your email";

  await sendEmail(res, user.email, subject, link);

  res.status(201).json({
    message: "A verification email has been sent, please check your email",
  });
});

const confirmUserRegistration = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!token) {
    return res.status(400).json({ message: "Link has expired" });
  }

  await User.updateOne({ _id: token.userId }, { verified: true });

  await Token.deleteOne({
    userId: user._id,
    token: req.params.token,
  });

  res.status(200).send({ message: "Email verified successfully" });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-cart -updatedAt -__v"
  );

  const registerDate = `${user.createdAt.getDate()}.${
    user.createdAt.getMonth() + 1
  }.${user.createdAt.getFullYear()}`;

  const adjustedUser = {
    ...user.toObject(),
    createdAt: registerDate,
  };

  const cart = await Cart.findOne({ user: user._id }).populate({
    path: "products.product",
    select: "-createdAt -updatedAt -__v",
    populate: [
      { path: "category subcategory group brand", select: "name slug" },
      {
        path: "specifications",
        select: "type value",
      },
      { path: "images", select: "url" },
    ],
  });

  const adjustedCartData = cart.products.map((item) => ({
    product: item.product,
    quantity: item.quantity,
  }));

  const wishList = await WishList.findOne({ user: user._id }).populate({
    path: "products",
    select: "-createdAt -updatedAt -__v",
    populate: [
      { path: "category subcategory group brand", select: "name slug" },
      {
        path: "specifications",
        select: "type value",
      },
      { path: "images", select: "url" },
    ],
  });

  const adjustedWishListData = wishList ? wishList.products || [] : [];

  res.status(200).json({
    user: adjustedUser,
    cart: adjustedCartData,
    wishList: adjustedWishListData,
    isVerified: user.verified,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.surname = req.body.surname || user.surname;
  user.email = req.body.email || user.email;

  if (req.body.oldPassword && req.body.newPassword) {
    const matchPassword = await user.matchPassword(req.body.oldPassword);

    if (!matchPassword) {
      return res
        .status(400)
        .json({ message: "Your old password is incorrect" });
    }

    user.password = req.body.newPassword;
  }

  const updatedUser = await user.save();

  const registerDate = `${updatedUser.createdAt.getDate()}.${
    updatedUser.createdAt.getMonth() + 1
  }.${updatedUser.createdAt.getFullYear()}`;

  const adjustedUser = {
    ...updatedUser.toObject(),
    createdAt: registerDate,
  };

  res.status(200).json({
    user: adjustedUser,
  });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
    expiresAt: new Date(new Date().getTime() + 60 * 1000),
  });

  const subject = "Reset your password";

  const content = `https://technomediashop.netlify.app/resetpassword/${user._id}/${token.token}`;

  await sendEmail(res, user.email, subject, content);

  res.json({
    message:
      "An email for password reset has been sent. Please check your email.",
  });
});

const checkResetPasswordToken = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;

  const foundToken = await Token.findOne({
    userId: id,
    token,
  });

  if (!foundToken)
    return res
      .status(404)
      .send({ message: "Reset password token has expired" });

  res.status(200).json({ message: "Token found" });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const foundToken = await Token.findOne({
    userId: id,
    token,
  });

  if (!foundToken) {
    return res.status(404).send({ message: "Token has expired" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { password: hashedPassword }
  );

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  await Token.deleteOne({
    userId: user._id,
    token: req.params.token,
  });

  res
    .status(200)
    .json({ message: "You have successfully changed the password" });
});

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find()
    .select("-createdAt -updatedAt -__v")
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

  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }

  res.status(200).json({ products });
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().select("name").populate({
    path: "subcategories",
    select: "name",
  });

  if (!categories) {
    return res.status(404).json({ message: "Categories not found" });
  }

  res.status(200).json({ categories });
});

const addProductToCart = asyncHandler(async (req, res, next) => {
  const { product, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

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
    ]);

  const adjustedProduct = {
    product: {
      _id: addedProduct._id,
      name: addedProduct.name,
      description: addedProduct.description,
      price: addedProduct.price,
      images: addedProduct.images,
      brand: addedProduct.brand,
      category: addedProduct.category,
      group: addedProduct.group,
      subcategory: addedProduct.subcategory || null,
      slug: addedProduct.slug,
    },
    quantity: quantity || 1,
  };

  res.status(200).json({ addedProduct: adjustedProduct });
});

const syncCartProducts = asyncHandler(async (req, res, next) => {
  const { cartProducts } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cartProducts.forEach((cartProduct) => {
    const existingProduct = cart.products.find(
      (cp) => cp.product.toString() === cartProduct.product._id
    );

    if (existingProduct) {
      existingProduct.quantity += cartProduct.quantity;
    } else {
      cart.products.push({
        product: cartProduct.product,
        quantity: cartProduct.quantity,
      });
    }
  });

  await cart.save();

  const updatedCart = await cart.populate({
    path: "products.product",
    populate: [
      { path: "category", select: "name slug" },
      { path: "subcategory", select: "name slug" },
      { path: "group", select: "name slug" },
      { path: "brand", select: "name slug" },
      { path: "specifications", select: "type value slug" },
      { path: "images", select: "url" },
    ],
    select: "-createdAt -updatedAt -__v",
  });

  const updatedCartProducts = updatedCart.products.map(
    ({ product, quantity }) => ({
      product,
      quantity,
    })
  );

  res.status(200).json({ updatedCartProducts });
});

const removeProductFromCart = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.products = cart.products.filter((item) => {
    return item.product.toString() !== productId;
  });

  const updatedCart = await cart.save();

  res.status(200).json({ message: "Product removed from cart successfully" });
});

const decreaseProductQuantity = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  cart.products[productIndex].quantity -= 1;

  if (cart.products[productIndex].quantity <= 0) {
    cart.products.splice(productIndex, 1);
  }

  await cart.save();

  res.status(200).json({ message: "Product quantity decreased successfully" });
});

const getFilteredSearchProducts = asyncHandler(async (req, res, next) => {
  const filterTerms = req.query;

  let filteredProducts = [];
  let brands = [];
  let groups = [];
  let subcategories = [];
  let minPrice = 0;
  let maxPrice = 0;

  const foundProducts = await Product.find()
    .populate([
      { path: "category", select: "name slug" },
      { path: "subcategory", select: "name slug" },
      { path: "group", select: "name slug" },
      { path: "brand", select: "name slug" },
      { path: "specifications", select: "type value slug" },
      { path: "images", select: "url" },
    ])
    .select("-createdAt -updatedAt -__v");

  if (filterTerms.q) {
    filteredProducts = foundProducts.filter((product) => {
      const searchTerms = filterTerms.q.toLowerCase().split(" ");
      return searchTerms.every((term) => {
        const searchRegex = new RegExp(term, "i");
        return (
          product.name.match(searchRegex) ||
          product.description.match(searchRegex) ||
          (product.category && product.category.name.match(searchRegex)) ||
          (product.subcategory &&
            product.subcategory.name.match(searchRegex)) ||
          (product.group && product.group.name.match(searchRegex)) ||
          (product.brand && product.brand.name.match(searchRegex)) ||
          product.specifications.some((spec) =>
            [spec.type, spec.value].some((field) => field.match(searchRegex))
          )
        );
      });
    });
    brands = extractBrands(filteredProducts);
    groups = extractUniqueGroups(filteredProducts);
    ({ minPrice, maxPrice } = calculatePriceRange(filteredProducts));
  } else {
    filteredProducts = foundProducts;
  }

  if (filterTerms.sort) {
    const sortTerm = filterTerms.sort;
    switch (sortTerm) {
      case "Price low to high":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "Price high to low":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }
  }

  if (filterTerms.category) {
    const categoryFilter = filterTerms.category;

    const foundCategory = await Category.findOne({ slug: categoryFilter });

    if (!foundCategory) {
      return res.status(400).json({ message: "Category not found" });
    }

    filteredProducts = filteredProducts.filter(
      (product) => foundCategory.slug === product.category.slug
    );

    subcategories = extractUniqueSubcategories(filteredProducts);
    groups = extractUniqueGroups(filteredProducts);
    brands = extractBrands(filteredProducts);
    ({ minPrice, maxPrice } = calculatePriceRange(filteredProducts));
  }

  if (filterTerms.subcategory) {
    const subcategoryFilter = filterTerms.subcategory;

    const foundSubcategory = await Subcategory.findOne({
      slug: subcategoryFilter,
    });

    if (!foundSubcategory) {
      return res.status(400).json({ message: "Subcategory not found" });
    }

    filteredProducts = filteredProducts.filter(
      (product) => foundSubcategory.slug === product.subcategory.slug
    );
    groups = extractUniqueGroups(filteredProducts);
    ({ minPrice, maxPrice } = calculatePriceRange(filteredProducts));
  }

  if (filterTerms.group) {
    const groupTerms = filterTerms.group.split(",");

    for (const term of groupTerms) {
      const group = await Group.findOne({ slug: term });
      if (!group) {
        return res.status(404).json({
          message: `Group '${term}' not found.`,
        });
      }
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        groupTerms.includes(product.group.name) ||
        groupTerms.some((term) => term === product.group.slug)
    );
    brands = extractBrands(filteredProducts);
    ({ minPrice, maxPrice } = calculatePriceRange(filteredProducts));
  }

  if (filterTerms.brand) {
    const brandTerms = filterTerms.brand.split(",");

    for (const term of brandTerms) {
      const brand = await Brand.findOne({ name: term });
      if (!brand) {
        throw new Error(`Brand '${term}' not found.`);
      }
    }

    filteredProducts = filteredProducts.filter((product) =>
      brandTerms.includes(product.brand.name)
    );
    groups = extractUniqueGroups(filteredProducts);
    ({ minPrice, maxPrice } = calculatePriceRange(filteredProducts));
  }

  for (const key in filterTerms) {
    if (
      Object.hasOwnProperty.call(filterTerms, key) &&
      key !== "q" &&
      key !== "price" &&
      key !== "sort" &&
      key !== "brand" &&
      key !== "category" &&
      key !== "subcategory" &&
      key !== "group"
    ) {
      const specType = key;
      const specValues = filterTerms[key].split(",");

      if (specValues.length > 0) {
        for (const value of specValues) {
          const specification = await Specification.findOne({
            type: specType,
            value,
          });
          if (!specification) {
            return res.status(404).json({
              message: `Specification '${specType}: ${value}' not found.`,
            });
          }
        }

        filteredProducts = filteredProducts.filter((product) =>
          product.specifications.some(
            (spec) => specValues.includes(spec.value) && spec.type === specType
          )
        );
        groups = extractUniqueGroups(filteredProducts);
        brands = extractBrands(filteredProducts);
        ({ minPrice, maxPrice } = calculatePriceRange(filteredProducts));
      }
    }
  }

  if (filterTerms.price) {
    const prices = filterTerms.price.split("-");

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price + 0.01 >= prices[1] && product.price - 0.01 <= prices[3]
    );
  }

  const responseData = {
    products: filteredProducts,
    brands,
    groups,
    minPrice,
    maxPrice,
  };

  if (
    filterTerms.category &&
    !filterTerms.subcategory &&
    subcategories.length > 0
  ) {
    responseData.subcategories = subcategories;
  }

  res.status(200).json(responseData);
});

const getProductData = asyncHandler(async (req, res, next) => {
  const { categoryName, subcategoryName, groupName, productName } = req.params;

  const foundCategory = await Category.findOne({ slug: categoryName });

  if (!foundCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  const foundSubcategory = await Subcategory.findOne({ slug: subcategoryName });

  if (!foundSubcategory) {
    return res.status(404).json({ message: "Subcategory not found" });
  }

  const foundGroup = await Group.findOne({ slug: groupName });

  if (!foundGroup) {
    return res.status(404).json({ message: "Group not found" });
  }

  const foundProduct = await Product.findOne({
    slug: productName,
    category: foundCategory._id,
    subcategory: foundSubcategory._id,
    group: foundGroup._id,
  })
    .select("-createdAt -updatedAt -__v")
    .populate([
      { path: "category", select: "name slug" },
      { path: "subcategory", select: "name slug" },
      { path: "group", select: "name slug" },
      { path: "brand", select: "name slug" },
      { path: "images", select: "url" },
      { path: "specifications", select: "type value" },
    ]);

  if (!foundProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  const similarProducts = await Product.find({
    category: foundProduct.category,
    subcategory: foundProduct.subcategory,
    group: foundProduct.group,
    // brand: foundProduct.brand._id,
    _id: { $ne: foundProduct._id },
  })
    .limit(4)
    .select("-createdAt -updatedAt -__v")
    .populate([
      { path: "category", select: "name slug" },
      { path: "subcategory", select: "name slug" },
      { path: "group", select: "name slug" },
      { path: "brand", select: "name slug" },
      { path: "images", select: "url" },
      { path: "specifications", select: "type value" },
    ]);

  res.status(200).json({ foundProduct, similarProducts });
});

const getRecords = asyncHandler(async (req, res, next) => {
  const records = await Category.find()
    .select("-__v")
    .populate({
      path: "subcategories",
      select: "-__v",
      populate: {
        path: "groups",
        select: "-__v",
        populate: {
          path: "brands",
          select: "-__v",
        },
      },
    });

  res.status(200).json(records);
});

const getGroupData = asyncHandler(async (req, res, next) => {
  const { categoryName, subcategoryName, groupName } = req.params;

  const foundCategory = await Category.findOne({ slug: categoryName });

  if (!foundCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  const foundSubcategory = await Subcategory.findOne({ slug: subcategoryName });

  if (!foundSubcategory) {
    return res.status(404).json({ message: "Subcategory not found" });
  }

  const foundGroup = await Group.findOne({
    slug: groupName,
    category: foundCategory._id,
    subcategory: foundSubcategory._id,
  });

  if (!foundGroup) {
    return res.status(404).json({ message: "Group not found" });
  }

  const products = await Product.find({
    category: foundCategory._id,
    subcategory: foundSubcategory._id,
    group: foundGroup._id,
  })
    .select("-__v -createdAt -updatedAt")
    .populate([
      { path: "category", select: "name slug" },
      { path: "subcategory", select: "name slug" },
      { path: "group", select: "name slug" },
      { path: "brand", select: "name slug" },
      { path: "images", select: "url" },
      { path: "specifications", select: "type value" },
    ]);

  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }

  res.status(200).json(products);
});

const addOrder = asyncHandler(async (req, res, next) => {
  const { products } = req.body;
  const { user } = req;

  if (!products) return res.status(404).json({ message: "Products not found" });

  if (!user) return res.status(404).json({ message: "User not found" });

  const cart = await Cart.findOne({
    user,
  });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const orderItems = products.map((item) => ({
    product: item._id,
    quantity: item.quantity || 1,
  }));

  let amount = 0;

  for (const item of products) {
    const foundProduct = await Product.findById(item._id);

    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    amount += foundProduct.price * item.quantity || 1;

    const existingIndex = cart.products.findIndex(
      (product) => product.product === item._id
    );
    if (existingIndex !== 1) {
      cart.products.splice(existingIndex, 1);
    }
  }

  await cart.save();

  const updatedCart = await cart.populate({
    path: "products.product",
    populate: [
      { path: "category", select: "name slug" },
      { path: "subcategory", select: "name slug" },
      { path: "group", select: "name slug" },
      { path: "brand", select: "name slug" },
      { path: "specifications", select: "type value slug" },
      { path: "images", select: "url" },
    ],
    select: "-createdAt -updatedAt -__v",
  });

  const updatedCartProducts = updatedCart.products.map(
    ({ product, quantity }) => ({
      product,
      quantity,
    })
  );

  await Order.create({
    user,
    products: orderItems,
    amount: amount.toFixed(2),
  });

  res.status(200).json({
    updatedCart: updatedCartProducts,
    message: "Your order has been successfully accepted",
  });
});

const getRecommendedRecords = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().select("-__v -createdAt -updatedAt -user");

  const groupCounts = {};

  const groupProducts = {};

  for (const order of orders) {
    const orderGroups = new Set();
    for (const item of order.products) {
      const productId = item.product.toString();
      const product = await Product.findById(productId).populate("group");
      const group = product.group;
      if (group) {
        orderGroups.add(group._id.toString());
        if (!groupProducts[group._id.toString()]) {
          groupProducts[group._id.toString()] = product;
        }
      }
    }

    orderGroups.forEach((groupId) => {
      groupCounts[groupId] = (groupCounts[groupId] || 0) + 1;
    });
  }

  const sortedGroups = Object.entries(groupCounts).sort((a, b) => b[1] - a[1]);

  const top4Groups = sortedGroups.slice(0, 4);

  const recommendedGroups = [];
  for (const [groupId, count] of top4Groups) {
    const group = await Group.findById(groupId)
      .select("name slug category subcategory")
      .populate("category", "slug")
      .populate("subcategory", "slug")
      .lean();

    recommendedGroups.push(group);
  }

  for (const recommendedGroup of recommendedGroups) {
    const groupProducts = await Product.find({
      group: recommendedGroup._id,
    })
      .select("images")
      .populate({
        path: "images",
        select: "url",
      });

    if (groupProducts.length > 0 && groupProducts[0].images.length > 0) {
      const productImage = groupProducts[0].images[0].url;
      recommendedGroup.image = productImage;
    }
  }

  const productCounts = {};

  for (const order of orders) {
    for (const item of order.products) {
      const productId = item.product.toString();
      productCounts[productId] =
        (productCounts[productId] || 0) + item.quantity;
    }
  }

  const sortedProducts = Object.entries(productCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const top4Products = sortedProducts.slice(0, 4);

  const recommendedProducts = [];
  for (const [productId, quantity] of top4Products) {
    const product = await Product.findById(productId)
      .select("-__v -createdAt -updatedAt")
      .populate([
        { path: "category", select: "name slug" },
        { path: "subcategory", select: "name slug" },
        { path: "group", select: "name slug" },
        { path: "brand", select: "name slug" },
        { path: "images", select: "url" },
        { path: "specifications", select: "type value" },
      ]);
    recommendedProducts.push(product);
  }

  res.status(200).json({ recommendedGroups, recommendedProducts });
});

const addProductToWishList = asyncHandler(async (req, res, next) => {
  const { product } = req.body;

  console.log(product);

  let wishList = await WishList.findOne({ user: req.user._id });

  if (!wishList) {
    return res.status(404).json({ message: "Wish list not found" });
  }

  wishList.products.push(product);

  await wishList.save();

  const addedProduct = await Product.findById(product)
    .select("-createdAt -updatedAt -__v")
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
    ]);

  res.status(200).json(addedProduct);
});

const removeProductFromWishList = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;

  const wishList = await WishList.findOne({ user: req.user._id });

  if (!wishList) {
    return res.status(404).json({ message: "Wish list not found" });
  }

  console.log(wishList, productId);

  wishList.products = wishList.products.filter(
    (product) => product.toString() !== productId
  );

  const updatedWishList = await wishList.save();

  res
    .status(200)
    .json({ message: "Product removed from wish list successfully" });
});

const addAllWishListProductsToCart = asyncHandler(async (req, res, next) => {
  const products = req.body;

  let wishList = await WishList.findOne({ user: req.user._id });

  console.log(products, wishList);

  if (!wishList) {
    return res.status(404).json({ message: "Wish list not found" });
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const productsToMove = wishList.products.filter((wishListProduct) =>
    products.includes(wishListProduct._id.toString())
  );

  if (productsToMove.length === 0) {
    return res
      .status(400)
      .json({ message: "No matching products found in wish list" });
  }

  productsToMove.forEach((product) => {
    const existingCartItem = cart.products.find(
      (cartProduct) => cartProduct.product.toString() === product._id.toString()
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      cart.products.push({ product: product._id, quantity: 1 });
    }
  });

  wishList.products = wishList.products.filter(
    (wishListProduct) => !products.includes(wishListProduct._id.toString())
  );

  await wishList.save();
  await cart.save();

  console.log(cart);

  const updatedCart = await Cart.findById(cart._id).populate({
    path: "products.product",
    select: "-createdAt -updatedAt -__v",
    populate: [
      { path: "category subcategory group brand", select: "name slug" },
      {
        path: "specifications",
        select: "type value",
      },
      { path: "images", select: "url" },
    ],
  });

  const adjustedCartData = updatedCart.products.map((item) => ({
    product: item.product,
    quantity: item.quantity,
  }));

  res.status(200).json(adjustedCartData);
});

module.exports = {
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
  getCategories,
  getFilteredSearchProducts,
  getProductData,
  getRecords,
  getGroupData,
  addOrder,
  getRecommendedRecords,
  addProductToWishList,
  removeProductFromWishList,
  addAllWishListProductsToCart,
};
