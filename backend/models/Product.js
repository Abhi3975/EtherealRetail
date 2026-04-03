const mongoose = require("mongoose");

const productLayoutObject = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: [0, "Hold up, we can't be paying people to take our stuff."],
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    subCategory: {
      type: String,
      index: true,
    },
    brandHighlights: [String],
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },

    variants: [
      {
        sku: String,
        size: String,
        colorName: String,
        inventoryCount: {
          type: Number,
          default: 0,
        },
        priceModifier: {
          type: Number,
          default: 0,
        },
      },
    ],
    images: [
      {
        url: String,
        altText: String,
        isPrimaryCover: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  },
);

productLayoutObject.index({ category: 1, active: 1, basePrice: 1 });

const ProductModel = mongoose.model("Product", productLayoutObject);

module.exports = ProductModel;
