const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

// Load backend logic directly into DB
dotenv.config({ path: path.join(__dirname, ".env") });

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ethereal_retail";
const Product = require("./models/Product");

const fashion_datasets = {
  mens: {
    Topwear: [
      "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop",
    ],
    Bottomwear: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop"
    ],
    Outerwear: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    ],
    Footwear: [
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
    ],
    Accessories: [
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=800&auto=format&fit=crop",
    ],
  },
  womens: {
    Dresses: [
      "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/1.webp",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    ],
    Outerwear: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    ],
    Accessories: [
      "https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/1.webp",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
    ],
    Footwear: [
      "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp",
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=800&auto=format&fit=crop",
    ],
  },
  accessories: {
    Accessories: [
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/1.webp",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
    ],
  },
};

const luxuryMaterials = ["Cashmere", "Silk", "Pima", "Calfskin", "Fine-Wool", "Tweed", "Architectural", "Linen", "Suede", "Organza"];
const adjectives = ["Luxe", "Essential", "Minimalist", "Sculpted", "Fluid", "Heirloom", "Signature", "Limited", "Couture", "Ready-to-Wear"];

const generateUniqueProducts = () => {
  const products = [];

  for (const [genderKey, categoriesObj] of Object.entries(fashion_datasets)) {
    const category = genderKey === "mens" ? "Men" : genderKey === "womens" ? "Women" : "Accessories";
    let i = 0;
    for (const [subCategory, imageUrls] of Object.entries(categoriesObj)) {
      for (const imageUrl of imageUrls) {
        const mat = luxuryMaterials[Math.floor(Math.random() * luxuryMaterials.length)];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const price = Math.floor(Math.random() * 2500) + 400;

        products.push({
          title: `Ethereal ${adj} ${mat} ${subCategory}`,
          description: `A breathtaking masterpiece of ${subCategory} design. Crafted from premium ${mat} for an unparalleled aesthetic.`,
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

  return products;
};

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany({});
    const finalSet = generateUniqueProducts();
    await Product.insertMany(finalSet);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
