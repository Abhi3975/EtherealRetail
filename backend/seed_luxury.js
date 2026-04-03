const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ethereal_retail";

const fashion_datasets = {
  mens: {
    Topwear: [
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
    ],
    Footwear: [
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/1.webp",
    ],
    Accessories: [
      "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp",
    ],
  },
  womens: {
    Dresses: [
      "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/1.webp",
    ],
    Accessories: [
      "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-jewellery/green-oval-earring/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-watches/rolex-datejust-women/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-watches/women's-wrist-watch/1.webp",
    ],
    Footwear: [
      "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/pampi-shoes/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/red-shoes/1.webp",
    ],
  },
};

const subCategories = [
  "Topwear",
  "Bottomwear",
  "Outerwear",
  "Accessories",
  "Footwear",
  "Dresses",
];
const luxuryMaterials = [
  "Cashmere",
  "Silk",
  "Pima",
  "Calfskin",
  "Fine-Wool",
  "Tweed",
  "Architectural",
  "Linen",
  "Suede",
  "Organza",
];
const adjectives = [
  "Luxe",
  "Essential",
  "Minimalist",
  "Sculpted",
  "Fluid",
  "Heirloom",
  "Signature",
  "Limited",
  "Couture",
  "Ready-to-Wear",
];

const getStrictSubCategorySnippet = (category, index) => {
  const dataset =
    category === "Men" ? fashion_datasets.mens : fashion_datasets.womens;
  const subCatKeys = Object.keys(dataset);
  const subCategory = subCatKeys[index % subCatKeys.length];
  const imageUrls = dataset[subCategory];
  const randomIdx = Math.floor(Math.random() * imageUrls.length);
  const imageUrl = imageUrls[randomIdx];

  return { subCategory, imageUrl };
};

const luxuryProducts = [
  {
    title: "Atelier Ethereal Cashmere Overcoat",
    description:
      "The definitive masterpiece of the Atelier. Italian cashmere with a structured shoulder.",
    basePrice: 1250,
    category: "Men",
    subCategory: "Outerwear",
    isFeatured: true,
    active: true,
    brandHighlights: ["100% Cashmere", "Silk Lined"],
    images: [{ url: fashion_datasets.mens.Topwear[0], isPrimaryCover: true }],
  },
  {
    title: "Atelier Ethereal Velvet Midnight",
    description: "Dramatic floor-length gown in midnight navy silk velvet.",
    basePrice: 1800,
    category: "Women",
    subCategory: "Dresses",
    isFeatured: true,
    active: true,
    brandHighlights: ["Silk Velvet", "Atelier Bespoke"],
    images: [{ url: fashion_datasets.womens.Dresses[0], isPrimaryCover: true }],
  },
];

const generateExtraProducts = () => {
  const extras = [];
  let i = 0;

  for (const [genderKey, categoriesObj] of Object.entries(fashion_datasets)) {
    const category = genderKey === "mens" ? "Men" : "Women";
    for (const [subCategory, imageUrls] of Object.entries(categoriesObj)) {
      for (const imageUrl of imageUrls) {
        const mat =
          luxuryMaterials[Math.floor(Math.random() * luxuryMaterials.length)];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const price = Math.floor(Math.random() * 2500) + 400;

        extras.push({
          title: `Atelier Ethereal ${adj} ${mat} ${subCategory}`,
          description: `A masterpiece of ${subCategory} design. This ${adj} piece is craft from the finest ${mat}, for ${category}.`,
          basePrice: price,
          category: category,
          subCategory: subCategory,
          active: true,
          isFeatured: i % 4 === 0,
          brandHighlights: [`Premium ${mat}`, "Limited Release"],
          images: [{ url: imageUrl, isPrimaryCover: true }],
        });
        i++;
      }
    }
  }
  return extras;
};

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(
      "Connected to Atlas for Phase 5: Categorization & Scaling (350+).",
    );
    await Product.deleteMany({});
    console.log("Old catalog purged.");
    const finalSet = [...luxuryProducts, ...generateExtraProducts()];
    await Product.insertMany(finalSet);
    console.log(
      `Successfully seeded ${finalSet.length} strictly categorized masterpieces.`,
    );
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();
