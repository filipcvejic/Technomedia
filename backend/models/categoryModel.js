const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
  ],
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
