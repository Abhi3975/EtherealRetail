const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const uploadMiddleware = require('../config/cloudinary');

// GET /api/products
// Handles advanced filtering, sorting, searching, and programmatic pagination
router.get('/', async (req, res, next) => {
  try {
    const { category, subCategory, search, sort, minPrice, maxPrice, isFeatured } = req.query;
    
    // Pagination defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    
    let queryArgs = { active: true };
    
    // Simple text search via regex
    if (search) {
      queryArgs.title = { $regex: search, $options: 'i' };
    }
    
    if (category && category !== 'All') {
      queryArgs.category = category;
    }

    if (subCategory && subCategory !== 'All') {
      queryArgs.subCategory = subCategory;
    }

    if (isFeatured === 'true') {
      queryArgs.isFeatured = true;
    }

    // Price range filtering
    if (minPrice || maxPrice) {
      queryArgs.basePrice = {};
      if (minPrice) queryArgs.basePrice.$gte = Number(minPrice);
      if (maxPrice) queryArgs.basePrice.$lte = Number(maxPrice);
    }

    let query = Product.find(queryArgs);

    // Sorting logic
    if (sort === 'price_asc') {
      query = query.sort({ basePrice: 1 });
    } else if (sort === 'price_desc') {
      query = query.sort({ basePrice: -1 });
    } else {
      query = query.sort({ createdAt: -1 }); // Default to newest
    }

    // Resolving total docs vs returned chunk
    const totalDocs = await Product.countDocuments(queryArgs);
    const products = await query.skip(skip).limit(limit);
    
    return res.json({
      success: true,
      count: products.length,
      total: totalDocs,
      page,
      pages: Math.ceil(totalDocs / limit),
      data: products
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
// Get a single product for the PDP
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    return res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
});

// Multer intercepts the multipart form and uploads straight to Cloudinary.
// We allow up to 5 images per product.
router.post('/add', uploadMiddleware.array('images', 5), async (req, res, next) => {
  try {
    const { title, description, basePrice, category } = req.body;
    
    // Map the Cloudinary secure URLs returned by Multer into our schema format
    const imagePayloads = req.files ? req.files.map((file, index) => ({
      url: file.path, 
      isPrimaryCover: index === 0 // The first uploaded photo becomes the default cover
    })) : [];

    const newProduct = new Product({
      title,
      description,
      basePrice,
      category,
      images: imagePayloads,
      // Variants could also be parsed from req.body if sent as strings/json
    });

    const saved = await newProduct.save();
    
    return res.json({
      success: true,
      data: saved,
      message: "Product and images safely secured in the cloud."
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
