const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ethereal_retail";

const fashion_datasets = {
  mens: {
    Topwear: [
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800",
      "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?q=80&w=800"
    ],
    Outerwear: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800",
      "https://images.unsplash.com/photo-1521223830114-411a0c8b6bce?q=80&w=800",
      "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800"
    ],
    Footwear: [
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/1.webp",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800"
    ],
    Accessories: [
      "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=800"
    ],
  },
  womens: {
    Dresses: [
      "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/1.webp",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800",
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=800",
      "https://images.unsplash.com/photo-1585848529285-7f999f816c72?q=80&w=800"
    ],
    Outerwear: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800",
      "https://images.unsplash.com/photo-1605307525381-8079633e970b?q=80&w=800",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800"
    ],
    Accessories: [
      "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-watches/women's-wrist-watch/1.webp",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800",
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800"
    ],
    Footwear: [
      "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp",
      "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/1.webp",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800",
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=800",
      "https://images.unsplash.com/photo-1534653299134-96a171b61581?q=80&w=800"
    ],
  },
  accessories: {
     Accessories: [
        "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=800",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800"
     ]
  }
};

const luxuryMaterials = ["Cashmere", "Silk", "Pima", "Calfskin", "Fine-Wool", "Tweed", "Architectural", "Linen", "Suede", "Organza"];
const adjectives = ["Luxe", "Essential", "Minimalist", "Sculpted", "Fluid", "Heirloom", "Signature", "Limited", "Couture", "Ready-to-Wear"];

  const generateUniqueProducts = () => {
    const products = [];

    // Flatten the dataset into an accessible array of options
    const flatOptions = [];
    for (const [genderKey, categoriesObj] of Object.entries(fashion_datasets)) {
      const category = genderKey === "mens" ? "Men" : genderKey === "womens" ? "Women" : "Accessories";
      for (const [subCategory, imageUrls] of Object.entries(categoriesObj)) {
        for (const imageUrl of imageUrls) {
          flatOptions.push({ category, subCategory, imageUrl });
        }
      }
    }

    // Map strictly 1-to-1 with no repetition algorithm
    flatOptions.forEach((option, i) => {
      const mat = luxuryMaterials[Math.floor(Math.random() * luxuryMaterials.length)];
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const price = Math.floor(Math.random() * 2500) + 400;

      products.push({
        title: `Ethereal ${adj} ${mat} ${option.subCategory}`,
        description: `A breathtaking masterpiece of ${option.subCategory} design. Crafted from premium ${mat} for an unparalleled aesthetic.`,
        basePrice: price,
        category: option.category,
        subCategory: option.subCategory,
        active: true,
        isFeatured: i % 8 === 0,
        brandHighlights: [`Premium ${mat}`, "Limited Release"],
        images: [{ url: option.imageUrl, isPrimaryCover: true }],
      });
    });

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
    console.error(err); process.exit(1);
  }
};

seed();
