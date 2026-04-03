import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiShield,
  FiCreditCard,
} from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../api";

const Checkout = ({ setCartCount }) => {
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zip: "",
    country: "USA",
  });
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart to have real totals
    api.get("/cart").then(async (res) => {
      if (res.data.success) {
        const enriched = await Promise.all(
          res.data.data.map(async (item) => {
            const prodRes = await api.get(`/products/${item.productId}`);
            return { ...item, product: prodRes.data.data };
          }),
        );
        setCartItems(enriched.filter((i) => i.product));
      }
    });
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.basePrice * item.quantity,
    0,
  );
  const total = subtotal;

  const handleFinalOrder = async () => {
    setLoading(true);
    try {
      const res = await api.post("/orders/place", {
        lineItems: cartItems.map((item) => ({
          productId: item.productId,
          title: item.product.title,
          price: item.product.basePrice,
          quantity: item.quantity,
        })),
        shippingDestination: address,
        paymentMethod: "credit_card",
      });

      if (res.data.success) {
        toast.success("Order Masterpiece Secured. Processing Ship-ment.", {
          theme: "dark",
          icon: "📦",
        });
        setCartCount(0);
        navigate("/profile");
      }
    } catch (err) {
      toast.error("Order encryption failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cloud-dancer min-h-screen pt-32 pb-20 px-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-12">
        <header className="text-center space-y-4">
          <span className="font-sans uppercase tracking-[0.6em] text-[10px] text-stone-gray font-bold">
            Checkout Journey
          </span>
          <div className="flex items-center justify-center gap-10">
            <div
              className={`h-1 w-20 transition-all duration-700 ${step >= 1 ? "bg-luxury-black" : "bg-stone-gray/20"}`}
            />
            <div
              className={`h-1 w-20 transition-all duration-700 ${step >= 2 ? "bg-luxury-black" : "bg-stone-gray/20"}`}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {}
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <h2 className="text-4xl font-serif italic text-luxury-black">
                    Atelier Destination
                  </h2>
                  <div className="space-y-6">
                    <input
                      className="w-full bg-transparent border-b border-stone-gray/30 py-4 focus:border-luxury-black outline-none transition-all font-serif italic text-xl text-luxury-black placeholder:text-stone-gray/50"
                      placeholder="Street Address"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <input
                        className="w-full bg-transparent border-b border-stone-gray/30 py-4 focus:border-luxury-black outline-none transition-all font-serif italic text-xl text-luxury-black placeholder:text-stone-gray/50"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                      />
                      <input
                        className="w-full bg-transparent border-b border-stone-gray/30 py-4 focus:border-luxury-black outline-none transition-all font-serif italic text-xl text-luxury-black placeholder:text-stone-gray/50"
                        placeholder="Zip Code"
                        value={address.zip}
                        onChange={(e) =>
                          setAddress({ ...address, zip: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-luxury-black text-cloud-dancer py-6 font-sans font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-accent-neon hover:text-luxury-black transition-all duration-700 flex items-center justify-center gap-4"
                  >
                    Payment Credentials <FiArrowRight />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-4xl font-serif italic text-luxury-black">
                      Secure Payment
                    </h2>
                    <button
                      onClick={() => setStep(1)}
                      className="text-stone-gray hover:text-black uppercase text-[8px] tracking-widest font-bold flex items-center gap-2"
                    >
                      <FiArrowLeft /> Back
                    </button>
                  </div>

                  {}
                  <div className="bg-stone-gray/10 backdrop-blur-lg border border-stone-gray/20 p-8 rounded-3xl text-luxury-black space-y-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-accent-neon rounded-full blur-[100px] opacity-10" />
                    <div className="flex justify-between items-start">
                      <FiCreditCard className="text-3xl text-accent-neon" />
                      <FiShield className="text-stone-gray" />
                    </div>
                    <div className="space-y-6">
                      <input
                        className="w-full bg-transparent border-b border-stone-gray/40 py-4 focus:border-accent-neon outline-none transition-all font-serif italic text-xl tracking-[0.2em] text-luxury-black placeholder:text-stone-gray/40"
                        placeholder="0000 0000 0000 0000"
                        value={card.number}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            number: e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 16),
                          })
                        }
                      />
                      <div className="grid grid-cols-2 gap-8">
                        <input
                          className="w-full bg-transparent border-b border-stone-gray/40 py-4 focus:border-accent-neon outline-none transition-all font-serif italic text-sm text-luxury-black placeholder:text-stone-gray/40"
                          placeholder="MM / YY"
                          value={card.expiry}
                          onChange={(e) =>
                            setCard({
                              ...card,
                              expiry: e.target.value.slice(0, 5),
                            })
                          }
                        />
                        <input
                          className="w-full bg-transparent border-b border-stone-gray/40 py-4 focus:border-accent-neon outline-none transition-all font-serif italic text-sm text-luxury-black placeholder:text-stone-gray/40"
                          placeholder="CVC"
                          value={card.cvc}
                          onChange={(e) =>
                            setCard({
                              ...card,
                              cvc: e.target.value.slice(0, 3),
                            })
                          }
                        />
                      </div>
                      <input
                        className="w-full bg-transparent border-b border-stone-gray/40 py-4 focus:border-accent-neon outline-none transition-all font-serif italic text-sm uppercase tracking-widest text-luxury-black placeholder:text-stone-gray/40"
                        placeholder="Cardholder Name"
                        value={card.name}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            name: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleFinalOrder}
                    disabled={loading}
                    className="w-full bg-accent-neon text-luxury-black py-7 font-sans font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white transition-all duration-700 disabled:opacity-50"
                  >
                    {loading
                      ? "Encrypting Order..."
                      : `Authorize Transaction — $${total}`}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {}
          <div className="space-y-8 bg-stone-gray/5 p-12 lg:sticky lg:top-40 h-fit border border-stone-gray/10 rounded-2xl">
            <h3 className="text-xl font-serif text-luxury-black mb-10">
              Manifest Details
            </h3>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  <div className="w-16 h-20 bg-stone-gray/10 flex-shrink-0">
                    <img
                      src={item.product.images?.[0]?.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-serif leading-tight text-sm italic">
                      {item.product.title}
                    </p>
                    <p className="font-sans text-[8px] uppercase tracking-widest font-bold text-stone-gray">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-sans font-bold text-xs">
                    ${item.product.basePrice * item.quantity}
                  </p>
                </div>
              ))}
            </div>
            <div className="h-[1px] bg-stone-gray/20 my-8" />
            <div className="flex justify-between items-baseline">
              <span className="font-sans uppercase text-[10px] tracking-widest font-bold text-stone-gray">
                Total Investment
              </span>
              <span className="font-serif text-3xl italic">${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
