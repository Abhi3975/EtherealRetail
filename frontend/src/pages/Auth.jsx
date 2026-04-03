import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isLogin ? "/users/login" : "/users/register";

    try {
      const res = await api.post(endpoint, formData);
      if (res.data.success) {
        localStorage.setItem("ethereal_token", res.data.token);
        localStorage.setItem("ethereal_user", JSON.stringify(res.data.user));
        toast.success(res.data.message, { theme: "dark", icon: "🗝️" });
        navigate("/profile");
        window.location.reload();
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Authentication failed. Access Denied.",
        { theme: "dark" },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cloud-dancer min-h-screen pt-40 pb-20 px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/40 backdrop-blur-3xl border border-white/60 p-12 md:p-20 shadow-2xl space-y-12"
      >
        <header className="text-center space-y-4">
          <span className="font-sans uppercase tracking-[0.6em] text-[10px] text-stone-gray font-bold">
            Atelier Credentials
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-luxury-black">
            {isLogin ? "Sign In" : "Register"}
          </h1>
          <p className="font-serif italic text-stone-gray">
            Access the exclusive archival collection.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="font-sans text-[10px] uppercase tracking-widest font-bold text-stone-gray">
                  Full Identity
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alexander McQueen"
                  className="w-full bg-transparent border-b border-stone-gray/30 py-4 focus:border-luxury-black outline-none transition-all font-serif italic text-xl"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="font-sans text-[10px] uppercase tracking-widest font-bold text-stone-gray">
              Encryption Gateway (Email)
            </label>
            <input
              type="email"
              required
              placeholder="curator@ethereal.atelier"
              className="w-full bg-transparent border-b border-stone-gray/30 py-4 focus:border-luxury-black outline-none transition-all font-serif italic text-xl"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="font-sans text-[10px] uppercase tracking-widest font-bold text-stone-gray">
              Secret Key (Password)
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-transparent border-b border-stone-gray/30 py-4 focus:border-luxury-black outline-none transition-all font-serif italic text-xl"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-luxury-black text-cloud-dancer py-6 font-sans font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-accent-neon hover:text-luxury-black transition-all duration-700 disabled:opacity-50"
          >
            {loading
              ? "Decrypting..."
              : isLogin
                ? "Authorize Access"
                : "Create Masterpiece Account"}
          </button>
        </form>

        <footer className="text-center pt-8 border-t border-stone-gray/10">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-sans text-[10px] uppercase tracking-widest font-bold text-stone-gray hover:text-luxury-black transition-all underline underline-offset-8 decoration-stone-gray/30"
          >
            {isLogin
              ? "No Credentials? Register Your Presence"
              : "Already Recognized? Sign In"}
          </button>
        </footer>
      </motion.div>
    </div>
  );
};

export default Auth;
