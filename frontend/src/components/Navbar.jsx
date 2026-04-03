import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineShoppingBag,
  HiOutlineMagnifyingGlass,
  HiOutlineUser,
  HiOutlineXMark,
  HiOutlineHeart,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ cartCount }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Basic polling or simple interval to keep count updated for the demo
    const updateCount = () => {
      const wishlist = JSON.parse(
        localStorage.getItem("ethereal_wishlist") || "[]",
      );
      setWishlistCount(wishlist.length);
      const storedUser = JSON.parse(localStorage.getItem("ethereal_user"));
      setUser(storedUser);
    };
    updateCount();
    const interval = setInterval(updateCount, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ethereal_token");
    localStorage.removeItem("ethereal_user");
    setUser(null);
    toast.info("Session Decrypted. Logged Out.", { theme: "dark" });
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/collection?search=${searchTerm}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center px-8 lg:px-20 py-8 transition-all duration-500 bg-cloud-dancer/80 backdrop-blur-xl border-b border-luxury-black/5">
        {/* Left: Navigation Links */}
        <div className="hidden lg:flex gap-12 items-center font-sans text-[10px] uppercase font-bold tracking-[0.3em]">
          <Link
            to="/collection?category=Men"
            className="hover:text-accent-neon transition-colors"
          >
            Men
          </Link>
          <Link
            to="/collection?category=Women"
            className="hover:text-accent-neon transition-colors"
          >
            Women
          </Link>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link
            to="/"
            className="text-3xl lg:text-4xl font-serif tracking-[0.2em] uppercase transition-transform hover:scale-105 block font-bold text-luxury-black"
          >
            Ethereal
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex gap-8 items-center text-luxury-black">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-accent-neon transition-all duration-300 text-2xl drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
          >
            <HiOutlineMagnifyingGlass strokeWidth={2} />
          </button>

          <Link
            to="/wishlist"
            className="hover:text-accent-neon transition-all duration-300 text-2xl relative drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
          >
            <HiOutlineHeart strokeWidth={2} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-neon rounded-full animate-pulse" />
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-6">
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-accent-neon transition-all duration-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
              >
                <HiOutlineUser strokeWidth={2} className="text-2xl" />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold hidden lg:block italic">
                  Atelier Curator
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-500 transition-all duration-300 text-2xl drop-shadow-[0_0_8px_rgba(255,0,0,0.2)]"
              >
                <HiOutlineArrowRightOnRectangle strokeWidth={2} />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="hover:text-accent-neon transition-all duration-300 text-2xl drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
            >
              <HiOutlineUser strokeWidth={2} />
            </Link>
          )}

          <Link
            to="/cart"
            className="relative hover:text-accent-neon transition-all duration-300 text-2xl group drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
          >
            <HiOutlineShoppingBag strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-luxury-black text-cloud-dancer text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-cloud-dancer shadow-xl">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Fullscreen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-cloud-dancer flex flex-col items-center justify-center p-8 lg:p-20"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 text-4xl hover:rotate-90 transition-transform duration-500 text-luxury-black"
            >
              <HiOutlineXMark strokeWidth={1} />
            </button>

            <form onSubmit={handleSearch} className="w-full max-w-5xl">
              <input
                autoFocus
                type="text"
                placeholder="SEARCH THE CURATE..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-b-2 border-luxury-black py-8 font-serif text-4xl lg:text-7xl uppercase tracking-tighter focus:outline-none placeholder:text-stone-gray/20"
              />
              <p className="mt-8 font-sans text-xs uppercase tracking-[0.5em] text-stone-gray font-bold">
                Press Enter to Explore
              </p>
            </form>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-5xl">
              <div>
                <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-stone-gray mb-4">
                  Trending
                </h4>
                <ul className="font-serif italic text-xl space-y-2">
                  <li>
                    <button
                      onClick={() => {
                        setSearchTerm("Cashmere");
                        navigate("/collection?search=Cashmere");
                        setIsSearchOpen(false);
                      }}
                    >
                      Cashmere Overcoats
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSearchTerm("Silk");
                        navigate("/collection?search=Silk");
                        setIsSearchOpen(false);
                      }}
                    >
                      Silk Gowns
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSearchTerm("Denim");
                        navigate("/collection?search=Denim");
                        setIsSearchOpen(false);
                      }}
                    >
                      Raw Denim
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
