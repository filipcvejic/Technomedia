const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Image",
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    specifications: [{ type: Schema.Types.ObjectId, ref: "Specification" }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
