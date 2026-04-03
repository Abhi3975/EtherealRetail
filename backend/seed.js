const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const mongoURI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ethereal_local_dev";

const baseCategories = [
  "Jackets",
  "T-Shirts",
  "Pants",
  "Accessories",
  "Outerwear",
];
const descriptors = [
  "Stone Wash",
  "Heavyweight",
  "Cloud Dancer",
  "Midnight",
  "Raw Denim",
  "Vintage",
  "Sustainable",
  "Relaxed Fit",
];
const productTypes = [
  "Jacket",
  "Tee",
  "Cargo Pants",
  "Beanie",
  "Tote Bag",
  "Overcoat",
  "Hoodie",
];

const dummyProducts = [];

for (let i = 0; i < 35; i++) {
  const category =
    baseCategories[Math.floor(Math.random() * baseCategories.length)];
  const desc = descriptors[Math.floor(Math.random() * descriptors.length)];
  const type = productTypes[Math.floor(Math.random() * productTypes.length)];

  const basePrice = Math.floor(Math.random() * (120 - 20 + 1) + 20);

  dummyProducts.push({
    title: `${desc} ${type}`,
    description: `A quintessential piece for your wardrobe. Don't think about it, just buy it. This ${type} is perfectly designed.`,
    basePrice: basePrice,
    category: category,
    active: true,
    variants: [
      { size: "S", inventoryCount: Math.floor(Math.random() * 20) },
      { size: "M", inventoryCount: Math.floor(Math.random() * 20) },
      { size: "L", inventoryCount: Math.floor(Math.random() * 20) },
    ],

    images: [
      {
        url: `https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&q=80&w=400&h=500`,
        isPrimaryCover: true,
      },
    ],
  });
}

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo. Beginning the massive purge...");

    await Product.deleteMany({});
    console.log("Old products nuked.");

    await Product.insertMany(dummyProducts);
    console.log(
      `Inserted ${dummyProducts.length} new dummy products into the matrix.`,
    );

    process.exit(0);
  } catch (err) {
    console.error("Well, the seeder crashed:", err);
    process.exit(1);
  }
};

seedDatabase();
