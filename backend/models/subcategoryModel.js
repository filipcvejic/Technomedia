const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  ],
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
