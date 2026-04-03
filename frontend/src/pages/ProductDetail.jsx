import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiHeart, FiShare2, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import api from '../api';

const ProductDetail = ({ setCartCount }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeTab, setActiveTab] = useState('story');
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => {
        if(res.data.success) {
          setProduct(res.data.data);
          // Check wishlist status from localstorage
          const wishlist = JSON.parse(localStorage.getItem('ethereal_wishlist') || '[]');
          setIsWishlisted(wishlist.includes(id));
        }
      })
      .catch(err => toast.error("Could not find this masterpiece.", { theme: "dark" }));
  }, [id]);

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('ethereal_wishlist') || '[]');
    if (isWishlisted) {
      wishlist = wishlist.filter(item => item !== id);
      toast.info("Removed from your selection.", { theme: "dark" });
    } else {
      wishlist.push(id);
      toast.success("Added to your selection.", { theme: "dark", icon: "✨" });
    }
    localStorage.setItem('ethereal_wishlist', JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    if (!product) return;
    api.post('/cart/add', { productId: product._id, variant: selectedSize, quantity: 1 })
    .then(res => {
      if(res.data.success) {
        toast.success(`Success. Size ${selectedSize} secured.`, { 
            theme: "dark",
            className: "font-sans uppercase text-[10px] tracking-widest border border-luxury-dark bg-luxury-black"
        });
        const newTotal = res.data.cartStore.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(newTotal);
      }
    });
  };

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-cloud-dancer">
        <div className="w-10 h-10 border-2 border-t-luxury-black border-stone-gray/20 rounded-full animate-spin" />
    </div>
  );

  const tabs = [
    { id: 'story', label: 'The Narrative' },
    { id: 'specs', label: 'Specifications' },
    { id: 'shipping', label: 'Concierge & Returns' }
  ];

  return (
    <div className="bg-cloud-dancer min-h-screen pt-40 pb-32 px-8 lg:px-20">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-24 items-start">
        
        {/* Left: Dramatic Imagery */}
        <div className="w-full lg:w-[55%] sticky top-40 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[3/4] overflow-hidden bg-stone-gray/10 group"
          >
            {product.images && product.images[0] && (
              <img 
                src={product.images[0].url} 
                alt={product.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
              />
            )}
            <div className="absolute top-8 right-8 flex flex-col gap-4">
                <button 
                    onClick={toggleWishlist}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${isWishlisted ? 'bg-luxury-black text-cloud-dancer' : 'bg-white/80 backdrop-blur-md text-luxury-black hover:bg-luxury-black hover:text-cloud-dancer'}`}
                >
                    <FiHeart fill={isWishlisted ? "currentColor" : "none"} />
                </button>
                <button className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md text-luxury-black flex items-center justify-center text-xl hover:bg-luxury-black hover:text-cloud-dancer transition-all duration-300">
                    <FiShare2 />
                </button>
            </div>
          </motion.div>
        </div>

        {/* Right: Architectural Details */}
        <div className="w-full lg:w-[45%] space-y-12">
          <header className="space-y-6 pb-12 border-b border-stone-gray/20">
            <div className="flex items-center gap-4 text-stone-gray font-sans text-xs uppercase font-bold tracking-[0.4em]">
                <span>{product.category}</span>
                <span className="w-1 h-1 bg-stone-gray/40 rounded-full" />
                <span className="italic normal-case tracking-normal font-serif text-sm opacity-60">Architectural Series</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-luxury-black leading-[0.9]">{product.title}</h1>
            <p className="text-3xl font-serif italic text-luxury-black/60">${product.basePrice}</p>
          </header>
          
          <div className="space-y-10">
            {/* Size Selector */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                 <span className="font-sans font-bold uppercase tracking-[0.3em] text-[10px]">Select Fit</span>
                 <button className="text-[10px] uppercase font-bold tracking-widest text-stone-gray underline decoration-stone-gray/30 underline-offset-4">Fit Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {['XS', 'S', 'M', 'L', 'XL'].map(sz => (
                  <button 
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-16 h-16 border transition-all duration-500 font-sans font-bold text-xs ${selectedSize === sz ? 'bg-luxury-black border-luxury-black text-cloud-dancer' : 'border-stone-gray/20 hover:border-luxury-black text-stone-gray hover:text-luxury-black'}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Group */}
            <div className="flex flex-col gap-4 pt-4">
                <button 
                onClick={handleAddToCart}
                className="w-full bg-luxury-black text-cloud-dancer py-7 font-sans font-bold uppercase tracking-[0.4em] text-xs hover:bg-accent-neon hover:text-luxury-black transition-all duration-700"
                >
                Commit to Purchase
                </button>
                <div className="flex items-center justify-center gap-4 py-4 text-stone-gray/60 font-sans text-[8px] uppercase font-bold tracking-[0.2em] border-t border-stone-gray/10">
                    <span className="flex items-center gap-2"><FiTruck /> Global Express</span>
                    <span className="flex items-center gap-2"><FiShield /> Authenticated Build</span>
                    <span className="flex items-center gap-2"><FiRefreshCw /> 7 Day Returns</span>
                </div>
            </div>

            {/* Tabbed Info */}
            <div className="pt-20">
                <div className="flex gap-10 border-b border-stone-gray/20 mb-10">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 font-sans font-bold uppercase tracking-widest text-[10px] transition-all relative ${activeTab === tab.id ? 'text-luxury-black' : 'text-stone-gray hover:text-luxury-black'}`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-luxury-black" />
                            )}
                        </button>
                    ))}
                </div>
                
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="font-sans text-stone-gray leading-relaxed text-sm lg:text-base space-y-6"
                    >
                        {activeTab === 'story' && (
                            <>
                                <p>{product.description || "Designed with absolute intent, this piece represents the pinnacle of modern functional attire. Our process involves thousands of iterations to achieve perfect drape and utility."}</p>
                                <ul className="space-y-2 pt-4">
                                    {product.brandHighlights?.map((h, i) => (
                                        <li key={i} className="flex items-center gap-3 italic font-serif text-luxury-black">
                                            <span className="w-1.5 h-1.5 bg-accent-neon flex-shrink-0" />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {activeTab === 'specs' && (
                            <div className="grid grid-cols-2 gap-y-6">
                                <div><h5 className="font-bold uppercase text-[10px] tracking-widest mb-1">Material</h5><p>100% Architecture Grade</p></div>
                                <div><h5 className="font-bold uppercase text-[10px] tracking-widest mb-1">Weight</h5><p>Medium Lifestyle</p></div>
                                <div><h5 className="font-bold uppercase text-[10px] tracking-widest mb-1">Traceability</h5><p>Tier 1 Transparency</p></div>
                                <div><h5 className="font-bold uppercase text-[10px] tracking-widest mb-1">Assembly</h5><p>Global Craftship</p></div>
                            </div>
                        )}
                        {activeTab === 'shipping' && (
                            <p>All items are shipped via high-priority secure channels. Returns are accepted within 7 days of arrival in pristine original condition. Our concierge team is available 24/7 for collection fitment assistance.</p>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
