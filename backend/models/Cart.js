const mongoose = require("mongoose");

const cartStateSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variant: {
          type: String,
          default: "Default",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const CartModel = mongoose.model("Cart", cartStateSchema);

module.exports = CartModel;
