const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storageOptions = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ethereal_retail",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 800, height: 1000, crop: "limit" }],
  },
});

const uploadMiddleware = multer({ storage: storageOptions });

module.exports = uploadMiddleware;
