import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VideoHero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {}
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000"
        alt="Ethereal Runway Editorial"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[0.3]"
      />

      {}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-accent-neon font-sans uppercase tracking-[0.4em] text-sm mb-6 block"
        >
          Spring / Summer 2026
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-luxury-black leading-tight mb-8"
        >
          Ethereal <br />
          <span className="italic font-normal">Excellence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-stone-gray font-sans text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          A curated collection of pieces that redefine modern luxury. Crafted
          for those who distill nature into their daily narrative.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link
            to="/collection"
            className="px-10 py-5 bg-luxury-black text-cloud-dancer font-sans font-bold uppercase tracking-widest hover:bg-accent-neon hover:text-luxury-black transition-colors duration-500 shadow-xl"
          >
            Explore Collection
          </Link>
          <Link
            to="/about"
            className="px-10 py-5 border border-luxury-black text-luxury-black font-sans font-bold uppercase tracking-widest hover:bg-luxury-black hover:text-cloud-dancer transition-all duration-500"
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      {}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-stone-gray to-transparent" />
      </motion.div>
    </div>
  );
};

export default VideoHero;
