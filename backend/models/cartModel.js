const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

cartSchema.path("admin").validate(function (value) {
  return value || this.user;
}, "The admin or user must be present.");

cartSchema.path("user").validate(function (value) {
  return value || this.admin;
}, "The admin or user must be present.");

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
