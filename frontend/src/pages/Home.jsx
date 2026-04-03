import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../api';
import VideoHero from '../components/VideoHero';

const Home = ({ setCartCount }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    api.get('/products?isFeatured=true&limit=4')
      .then(res => {
        if(res.data.success) {
          setFeaturedProducts(res.data.data);
        }
      })
      .catch(err => {
        console.error("Featured fetch failed.", err);
      });
  }, []);

  return (
    <div className="bg-cloud-dancer min-h-screen">
      <VideoHero />

      {/* Editorial Section 1: The Craft */}
      <section className="py-40 px-8 lg:px-20 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
            >
                <h2 className="text-5xl md:text-7xl font-serif leading-tight text-luxury-black">
                    The Architecture <br /> 
                    <span className="italic font-normal">of Attire</span>
                </h2>
                <p className="font-sans text-stone-gray text-lg leading-relaxed max-w-lg">
                    Every seam is a statement. Every fabric is a narrative. Ethereal garments are designed to be the background noise to your most pivotal moments—quiet, resolute, and flawlessly executed.
                </p>
                <Link to="/collection" className="inline-block font-sans font-bold uppercase tracking-[0.4em] text-xs border-b-2 border-luxury-black pb-2 hover:text-accent-neon hover:border-accent-neon transition-all duration-300">
                    Discover Our Process
                </Link>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[4/5] bg-stone-gray/10 overflow-hidden"
            >
                <img 
                    src="https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1200" 
                    alt="Editorial Craft" 
                    className="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-1000"
                />
            </motion.div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="py-40 bg-stone-gray/5 text-luxury-black px-8 lg:px-20 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="space-y-4">
                    <span className="font-sans uppercase tracking-[0.5em] text-[10px] text-accent-neon">Curated Selection</span>
                    <h2 className="text-5xl md:text-7xl font-serif">The Haute List</h2>
                </div>
                <Link to="/collection" className="font-sans uppercase tracking-widest text-xs border border-stone-gray/30 px-8 py-4 hover:bg-luxury-black hover:text-cloud-dancer transition-all duration-500 rounded-sm shadow-sm backdrop-blur-md">
                    View Entire Ateliers
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((prod, index) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        key={prod._id}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden bg-white/5 mb-6 shadow-2xl group-hover:shadow-accent-neon/20 transition-all duration-700 rounded-sm">
                            <Link to={`/product/${prod._id}`}>
                                <img 
                                    src={prod.images?.[0]?.url} 
                                    alt={prod.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </Link>
                        </div>
                        <h3 className="font-serif text-2xl mb-2 group-hover:text-accent-neon transition-colors">{prod.title}</h3>
                        <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-stone-gray">${prod.basePrice}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Immersive Category Entry Points */}
      <section className="py-40 px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-screen-2xl mx-auto">
              <Link to="/collection?category=Men" className="relative aspect-[2/3] overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1000" className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <h3 className="text-white font-serif text-5xl uppercase tracking-widest italic">Men</h3>
                  </div>
              </Link>
              <Link to="/collection?category=Women" className="relative aspect-[2/3] overflow-hidden group lg:mt-20">
                  <img src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000" className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <h3 className="text-white font-serif text-5xl uppercase tracking-widest italic">Women</h3>
                  </div>
              </Link>
              <Link to="/collection?category=Accessories" className="relative aspect-[2/3] overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000" className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <h3 className="text-white font-serif text-5xl uppercase tracking-widest italic">Accs</h3>
                  </div>
              </Link>
          </div>
      </section>
    </div>
  );
};

export default Home;
