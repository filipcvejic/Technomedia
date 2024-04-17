const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
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
  brands: [
    {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
