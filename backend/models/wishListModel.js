const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

const WishList = mongoose.model("WishList", wishListSchema);

module.exports = WishList;
