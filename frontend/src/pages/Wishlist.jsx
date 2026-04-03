import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiShoppingCart } from "react-icons/fi";
import api from "../api";

const Wishlist = ({ setCartCount }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      const wishlistIds = JSON.parse(
        localStorage.getItem("ethereal_wishlist") || "[]",
      );
      if (wishlistIds.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        const promises = wishlistIds.map((id) => api.get(`/products/${id}`));
        const results = await Promise.all(promises);
        setItems(results.map((res) => res.data.data).filter((p) => p !== null));
      } catch (err) {
        console.error("Wishlist sync failed.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = (id) => {
    const updated = items.filter((item) => item._id !== id);
    setItems(updated);
    const wishlistIds = updated.map((item) => item._id);
    localStorage.setItem("ethereal_wishlist", JSON.stringify(wishlistIds));
  };

  const handleAddToCart = (productId) => {
    api.post("/cart/add", { productId, quantity: 1 }).then((res) => {
      if (res.data.success) {
        const newTotal = res.data.cartStore.reduce(
          (acc, item) => acc + item.quantity,
          0,
        );
        setCartCount(newTotal);
      }
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud-dancer">
        <div className="w-10 h-10 border-2 border-t-luxury-black border-stone-gray/20 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="bg-cloud-dancer min-h-screen pt-40 pb-20 px-8 lg:px-20">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-luxury-black mb-4">
            My Selections
          </h1>
          <p className="font-sans text-xs uppercase tracking-[0.5em] text-stone-gray font-bold">
            Curated for the Archival Wardrobe
          </p>
        </header>

        {items.length === 0 ? (
          <div className="text-center py-40 bg-stone-gray/5 border border-dashed border-stone-gray/20 rounded-3xl">
            <p className="font-serif text-2xl italic text-stone-gray mb-8">
              Your curate is currently empty.
            </p>
            <Link
              to="/collection"
              className="inline-block bg-luxury-black text-cloud-dancer px-10 py-5 font-sans font-bold uppercase tracking-widest text-[10px]"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            <AnimatePresence>
              {items.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative"
                >
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-luxury-black hover:text-cloud-dancer transition-all duration-300"
                  >
                    <FiX />
                  </button>

                  <div className="aspect-[3/4] overflow-hidden bg-stone-gray/10 mb-6">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.title}
                        className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000"
                      />
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <Link to={`/product/${product._id}`}>
                      <h3 className="font-serif text-xl group-hover:italic transition-all">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="font-sans font-bold text-sm tracking-widest">
                      ${product.basePrice}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="w-full py-4 border border-luxury-black font-sans font-bold uppercase tracking-widest text-[10px] hover:bg-luxury-black hover:text-cloud-dancer transition-all duration-500 flex items-center justify-center gap-3"
                    >
                      <FiShoppingCart /> Move to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
