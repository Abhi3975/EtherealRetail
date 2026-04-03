const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const uploadMiddleware = require("../config/cloudinary");

router.get("/", async (req, res, next) => {
  try {
    const {
      category,
      subCategory,
      search,
      sort,
      minPrice,
      maxPrice,
      isFeatured,
    } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    let queryArgs = { active: true };

    if (search) {
      queryArgs.title = { $regex: search, $options: "i" };
    }

    if (category && category !== "All") {
      queryArgs.category = category;
    }

    if (subCategory && subCategory !== "All") {
      queryArgs.subCategory = subCategory;
    }

    if (isFeatured === "true") {
      queryArgs.isFeatured = true;
    }

    if (minPrice || maxPrice) {
      queryArgs.basePrice = {};
      if (minPrice) queryArgs.basePrice.$gte = Number(minPrice);
      if (maxPrice) queryArgs.basePrice.$lte = Number(maxPrice);
    }

    let query = Product.find(queryArgs);

    if (sort === "price_asc") {
      query = query.sort({ basePrice: 1 });
    } else if (sort === "price_desc") {
      query = query.sort({ basePrice: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const totalDocs = await Product.countDocuments(queryArgs);
    const products = await query.skip(skip).limit(limit);

    return res.json({
      success: true,
      count: products.length,
      total: totalDocs,
      page,
      pages: Math.ceil(totalDocs / limit),
      data: products,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    return res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/add",
  uploadMiddleware.array("images", 5),
  async (req, res, next) => {
    try {
      const { title, description, basePrice, category } = req.body;

      const imagePayloads = req.files
        ? req.files.map((file, index) => ({
            url: file.path,
            isPrimaryCover: index === 0,
          }))
        : [];

      const newProduct = new Product({
        title,
        description,
        basePrice,
        category,
        images: imagePayloads,
      });

      const saved = await newProduct.save();

      return res.json({
        success: true,
        data: saved,
        message: "Product and images safely secured in the cloud.",
      });
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
