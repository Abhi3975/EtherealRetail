import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FiHeart, FiPlus } from "react-icons/fi";
import api from "../api";
import Filters from "../components/Filters";

const Catalog = ({ setCartCount }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get("category") || "All";

  const [filters, setFilters] = useState({
    category: initialCategory,
    subCategory: "All",
    search: "",
    sort: "newest",
    minPrice: 0,
    maxPrice: 3000,
    isFeatured: false,
    page: 1,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat && cat !== filters.category) {
      setFilters((prev) => ({ ...prev, category: cat, page: 1 }));
    }
  }, [location.search]);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("ethereal_wishlist") || "[]",
    );
    setWishlist(stored);
  }, []);

  const toggleWishlist = (id) => {
    let updated = [...wishlist];
    if (updated.includes(id)) {
      updated = updated.filter((item) => item !== id);
      toast.info("Removed from your selection.", {
        theme: "dark",
        autoClose: 1000,
      });
    } else {
      updated.push(id);
      toast.success("Added to your selection.", {
        theme: "dark",
        icon: "✨",
        autoClose: 1000,
      });
    }
    setWishlist(updated);
    localStorage.setItem("ethereal_wishlist", JSON.stringify(updated));
  };

  const categories = ["Men", "Women", "Accessories"];
  const subCategories = [
    "Topwear",
    "Bottomwear",
    "Outerwear",
    "Dresses",
    "Footwear",
    "Accessories",
  ];

  useEffect(() => {
    setLoading(true);
    let queryParams = new URLSearchParams();
    if (filters.category !== "All")
      queryParams.append("category", filters.category);
    if (filters.subCategory !== "All")
      queryParams.append("subCategory", filters.subCategory);
    if (filters.sort) queryParams.append("sort", filters.sort);
    if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
    if (filters.isFeatured) queryParams.append("isFeatured", "true");
    if (filters.search) queryParams.append("search", filters.search);
    queryParams.append("page", filters.page);
    queryParams.append("limit", 12);

    api
      .get(`/products?${queryParams.toString()}`)
      .then((res) => {
        if (res.data.success) {
          const newProducts = res.data.data;
          if (filters.page === 1) {
            setProducts(newProducts);
          } else {
            setProducts((prev) => [...prev, ...newProducts]);
          }

          const currentTotal =
            filters.page === 1
              ? newProducts.length
              : products.length + newProducts.length;
          setHasMore(currentTotal < res.data.total);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch collection");
        setLoading(false);
      });
  }, [filters]);

  const handleAddToCart = (productId) => {
    api.post("/cart/add", { productId, quantity: 1 }).then((res) => {
      if (res.data.success) {
        toast.success("Added to your curate.", {
          theme: "dark",
          icon: "✨",
          className:
            "font-sans uppercase text-[10px] tracking-widest border border-luxury-dark bg-luxury-black",
        });
        const newTotal = res.data.cartStore.reduce(
          (acc, item) => acc + item.quantity,
          0,
        );
        setCartCount(newTotal);
      }
    });
  };

  const loadMore = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const updateFilters = (newFilters) => {
    setFilters({ ...newFilters, page: 1 });
  };

  return (
    <div className="bg-cloud-dancer min-h-screen pt-32 pb-20 px-8 lg:px-20">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-20">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-serif text-luxury-black font-bold tracking-tight"
          >
            The Collection{" "}
            <span className="italic font-normal text-stone-gray">
              — {filters.category}
            </span>
          </motion.h1>
          <div className="h-[1px] w-full bg-luxury-black mt-8 opacity-20" />
        </header>

        <div className="flex flex-col lg:flex-row gap-20">
          <Filters
            filters={filters}
            setFilters={updateFilters}
            categories={categories}
            subCategories={subCategories}
          />

          <main className="flex-1">
            <div className="flex justify-between items-center mb-12">
              <p className="font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-stone-gray">
                Showing {products.length} Masterpieces
              </p>
              <div className="flex items-center gap-4">
                <span className="font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-stone-gray">
                  Sort By
                </span>
                <select
                  value={filters.sort}
                  onChange={(e) =>
                    updateFilters({ ...filters, sort: e.target.value })
                  }
                  className="bg-transparent font-serif italic text-sm border-none focus:ring-0 cursor-pointer"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_asc">Price (Ascending)</option>
                  <option value="price_desc">Price (Descending)</option>
                </select>
              </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-24">
              <AnimatePresence mode="popLayout">
                {products.map((prod, index) => (
                  <motion.div
                    layout
                    key={prod._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: (index % 12) * 0.05 }}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-gray/10 group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.15),_inset_0_0_15px_rgba(255,255,255,0.05)] transition-all duration-700">
                      <Link to={`/product/${prod._id}`}>
                        {prod.images && prod.images[0] && (
                          <img
                            src={prod.images[0].url}
                            alt={prod.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                          <ul className="text-cloud-dancer/80 text-[10px] uppercase tracking-widest font-bold mb-4 space-y-2">
                            {prod.brandHighlights?.slice(0, 2).map((h, i) => (
                              <li key={i}>— {h}</li>
                            ))}
                          </ul>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(prod._id);
                            }}
                            className="w-full py-4 bg-cloud-dancer text-luxury-black font-sans font-bold uppercase tracking-widest text-[10px] hover:bg-accent-neon transition-colors"
                          >
                            Add to Curate
                          </button>
                        </div>
                      </Link>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(prod._id);
                        }}
                        className={`absolute top-6 right-6 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${wishlist.includes(prod._id) ? "bg-luxury-black text-cloud-dancer" : "bg-white/80 backdrop-blur-md text-stone-gray opacity-0 group-hover:opacity-100 hover:text-luxury-black shadow-lg"}`}
                      >
                        <FiHeart
                          fill={
                            wishlist.includes(prod._id)
                              ? "currentColor"
                              : "none"
                          }
                          className="text-sm"
                        />
                      </button>

                      {prod.isFeatured && (
                        <div className="absolute top-6 left-6 px-4 py-1.5 bg-cloud-dancer/90 backdrop-blur-md text-luxury-black font-sans font-bold uppercase tracking-widest text-[8px]">
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="mt-10 flex justify-between items-baseline">
                      <div className="space-y-2">
                        <h3 className="font-serif text-2xl tracking-tight leading-none group-hover:italic transition-all duration-300">
                          <Link to={`/product/${prod._id}`}>{prod.title}</Link>
                        </h3>
                        <p className="font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-stone-gray/60">
                          {prod.subCategory}
                        </p>
                      </div>
                      <p className="font-sans font-bold text-base tracking-widest">
                        ${prod.basePrice}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </section>

            {hasMore && (
              <div className="mt-32 flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="group flex flex-col items-center gap-4 focus:outline-none"
                >
                  <div className="w-16 h-16 rounded-full border border-luxury-black/20 flex items-center justify-center group-hover:border-luxury-black transition-colors duration-500">
                    <FiPlus
                      className={`text-2xl transition-transform duration-500 group-hover:rotate-90 ${loading ? "animate-spin" : ""}`}
                    />
                  </div>
                  <span className="font-sans text-[10px] uppercase font-bold tracking-[0.5em] text-stone-gray group-hover:text-luxury-black transition-colors">
                    {loading ? "Curating more..." : "Explore More Masterpieces"}
                  </span>
                </button>
              </div>
            )}

            {!loading && products.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40 bg-stone-gray/5 rounded-3xl"
              >
                <h2 className="font-serif text-3xl italic text-stone-gray">
                  Nothing meets the criteria.
                </h2>
                <p className="font-sans text-xs uppercase tracking-widest mt-4">
                  Try adjusting your filters or search.
                </p>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
