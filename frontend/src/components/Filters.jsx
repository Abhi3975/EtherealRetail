import React from 'react';
import { motion } from 'framer-motion';

const Filters = ({ filters, setFilters, categories, subCategories }) => {
  const handleCategoryChange = (cat) => {
    setFilters(prev => ({ 
      ...prev, 
      category: prev.category === cat ? 'All' : cat,
      subCategory: 'All' // Reset subcat on main cat change
    }));
  };

  const handleSubCategoryChange = (sub) => {
    setFilters(prev => ({ 
      ...prev, 
      subCategory: prev.subCategory === sub ? 'All' : sub 
    }));
  };

  return (
    <div className="w-full lg:w-72 space-y-12 pr-8 sticky top-32 overflow-y-auto max-h-[80vh] custom-scrollbar pb-20">
      
      {/* Category Section */}
      <div className="space-y-6">
        <h3 className="font-sans font-bold uppercase tracking-[0.2em] text-xs pb-4 border-b border-stone-gray/20">Category</h3>
        <div className="flex flex-col gap-4">
          {categories.map(cat => (
            <label key={cat} className="group flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={filters.category === cat}
                onChange={() => handleCategoryChange(cat)}
                className="hidden"
              />
              <div className={`w-4 h-4 border border-stone-gray rounded-sm flex items-center justify-center transition-all duration-300 ${filters.category === cat ? 'bg-luxury-black border-luxury-black' : 'group-hover:border-luxury-black'}`}>
                {filters.category === cat && <div className="w-1.5 h-1.5 bg-cloud-dancer" />}
              </div>
              <span className={`font-sans text-sm tracking-wide transition-all duration-300 ${filters.category === cat ? 'text-luxury-black font-bold' : 'text-stone-gray group-hover:text-luxury-black'}`}>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Subcategory Section */}
      <div className="space-y-6">
        <h3 className="font-sans font-bold uppercase tracking-[0.2em] text-xs pb-4 border-b border-stone-gray/20">Type</h3>
        <div className="flex flex-col gap-4">
          {subCategories.map(sub => (
            <label key={sub} className="group flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={filters.subCategory === sub}
                onChange={() => handleSubCategoryChange(sub)}
                className="hidden"
              />
              <div className={`w-4 h-4 border border-stone-gray rounded-sm flex items-center justify-center transition-all duration-300 ${filters.subCategory === sub ? 'bg-luxury-black border-luxury-black' : 'group-hover:border-luxury-black'}`}>
                {filters.subCategory === sub && <div className="w-1.5 h-1.5 bg-cloud-dancer" />}
              </div>
              <span className={`font-sans text-sm tracking-wide transition-all duration-300 ${filters.subCategory === sub ? 'text-luxury-black font-bold' : 'text-stone-gray group-hover:text-luxury-black'}`}>{sub}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-8">
        <h3 className="font-sans font-bold uppercase tracking-[0.2em] text-xs pb-4 border-b border-stone-gray/20">Price Threshold</h3>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="2000" 
            step="50"
            value={filters.maxPrice || 2000}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
            className="w-full accent-luxury-black h-[2px] bg-stone-gray/30 appearance-none cursor-pointer"
          />
          <div className="flex justify-between font-serif text-sm italic">
            <span>$0</span>
            <span className="font-sans font-bold not-italic font-sans tracking-widest uppercase text-xs">$0 — ${filters.maxPrice || 2000}+</span>
          </div>
        </div>
      </div>

      {/* Featured Toggle */}
      <div className="pt-8 border-t border-stone-gray/20">
         <label className="flex items-center justify-between cursor-pointer group">
            <span className="font-sans font-bold uppercase tracking-[0.2em] text-xs text-stone-gray group-hover:text-luxury-black transition-colors">Exclusive Edit</span>
            <div className="relative inline-flex items-center">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={filters.isFeatured}
                onChange={() => setFilters(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
              />
              <div className="w-11 h-6 bg-stone-gray/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-luxury-black"></div>
            </div>
         </label>
      </div>

      {/* Clear Filters */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setFilters({ category: 'All', subCategory: 'All', maxPrice: 2000, isFeatured: false, search: '', sort: 'newest', page: 1 })}
        className="w-full py-4 border border-luxury-black font-sans font-bold uppercase tracking-widest text-[10px] hover:bg-luxury-black hover:text-cloud-dancer transition-all duration-300"
      >
        Reset Selection
      </motion.button>
    </div>
  );
};

export default Filters;
