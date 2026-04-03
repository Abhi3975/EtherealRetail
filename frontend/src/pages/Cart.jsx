import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import api from "../api";
import { toast } from "react-toastify";

const Cart = ({ setCartCount }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      if (res.data.success) {
        const enrichedItems = await Promise.all(
          res.data.data.map(async (item) => {
            try {
              const prodRes = await api.get(`/products/${item.productId}`);
              return { ...item, product: prodRes.data.data };
            } catch (err) {
              return null;
            }
          }),
        );
        const validItems = enrichedItems.filter((i) => i && i.product);
        setItems(validItems);
        const total = validItems.reduce((acc, i) => acc + i.quantity, 0);
        setCartCount(total);
      }
    } catch (err) {
      console.error("Cart enrichment failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, variant, delta) => {
    try {
      const item = items.find(
        (i) => i.productId === productId && i.variant === variant,
      );
      const newQty = Math.max(1, item.quantity + delta);
      if (newQty === item.quantity) return;

      await api.post("/cart/add", { productId, variant, quantity: delta });
      fetchCart();
    } catch (err) {
      toast.error("Adjustment failed.");
    }
  };

  const removeItem = async (productId, variant) => {
    try {
      await api.post("/cart/remove", { productId, variant });
      toast.info("Item removed from bag.", { theme: "dark" });
      fetchCart();
    } catch (err) {
      toast.error("Removal failed.");
    }
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.basePrice * item.quantity,
    0,
  );

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
          <span className="font-sans uppercase tracking-[0.5em] text-[10px] text-stone-gray font-bold">
            Secure Bag
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-luxury-black mt-4 italic">
            Your Curation
          </h1>
        </header>

        {items.length === 0 ? (
          <div className="text-center py-40 border-y border-stone-gray/20">
            <p className="font-serif text-2xl italic text-stone-gray mb-8">
              Your bag is weightless.
            </p>
            <Link
              to="/collection"
              className="inline-block bg-luxury-black text-cloud-dancer px-10 py-5 font-sans font-bold uppercase tracking-widest text-[10px]"
            >
              Explore the Archive
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            {}
            <div className="lg:col-span-2 space-y-12">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.variant}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-8 pb-12 border-b border-stone-gray/10 group"
                  >
                    <div className="w-32 md:w-48 aspect-[3/4] overflow-hidden bg-stone-gray/10">
                      <img
                        src={item.product.images?.[0]?.url}
                        alt={item.product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-2xl md:text-3xl text-luxury-black mb-1">
                            {item.product.title}
                          </h3>
                          <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-stone-gray mb-4">
                            {item.product.subCategory} / {item.variant}
                          </p>
                        </div>
                        <p className="font-sans font-bold text-lg tracking-widest">
                          ${item.product.basePrice * item.quantity}
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-luxury-black">
                        <div className="flex items-center border border-stone-gray/30">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.variant, -1)
                            }
                            className="px-4 py-2 hover:bg-stone-gray/10 transition"
                          >
                            <FiMinus />
                          </button>
                          <span className="px-4 font-sans font-bold text-sm tracking-widest">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.variant, 1)
                            }
                            className="px-4 py-2 hover:bg-stone-gray/10 transition"
                          >
                            <FiPlus />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.variant)
                          }
                          className="text-stone-gray hover:text-red-400 transition-colors uppercase font-bold tracking-widest text-[10px] flex items-center gap-2"
                        >
                          <FiTrash2 /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {}
            <div className="space-y-12">
              <div className="bg-white/40 backdrop-blur-3xl border border-white/60 p-12 space-y-10">
                <h2 className="text-3xl font-serif">Manifest Summary</h2>
                <div className="space-y-4 font-sans text-xs uppercase tracking-widest font-bold text-stone-gray">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-luxury-black">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Complimentary Shipping</span>
                    <span className="text-luxury-black font-serif italic normal-case tracking-normal">
                      Free
                    </span>
                  </div>
                  <div className="h-[1px] bg-stone-gray/20 my-6" />
                  <div className="flex justify-between text-lg text-luxury-black">
                    <span>Grand Total</span>
                    <span>${subtotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-luxury-black text-cloud-dancer py-7 font-sans font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-accent-neon hover:text-luxury-black transition-all duration-700 flex items-center justify-center gap-3"
                >
                  Proceed to Checkout <FiArrowRight />
                </button>
              </div>

              <div className="p-8 border border-dashed border-stone-gray/20 rounded-2xl space-y-4 text-center">
                <p className="font-serif italic text-stone-gray text-sm">
                  Every acquisition is a commitment to archival quality.
                </p>
                <p className="font-sans text-[8px] uppercase tracking-[0.3em] font-bold text-stone-gray/40">
                  Secure Encryption Enabled
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
