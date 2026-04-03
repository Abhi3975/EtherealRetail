import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-cloud-dancer min-h-screen pt-40 pb-20 px-8 lg:px-20 text-luxury-black">
      <div className="max-w-screen-xl mx-auto space-y-24">
        <header className="space-y-8 text-center max-w-4xl mx-auto">
          <span className="font-sans uppercase tracking-[0.5em] text-[10px] text-accent-neon font-bold">
            The Heritage
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-luxury-black">
            The Ateliers
          </h1>
          <p className="font-sans text-stone-gray text-xl leading-relaxed max-w-2xl mx-auto">
            Ethereal is the definitive architectural expression of luxury. We
            distill the messy complexity of life into timeless, high-fidelity
            garments and objects.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden bg-stone-gray/10 rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200"
              alt="Atelier Craftsman"
              className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-4xl font-serif italic text-luxury-black">
              The Architecture of Attire
            </h2>
            <div className="space-y-6 font-sans text-stone-gray leading-relaxed">
              <p>
                Established in 2026, Ethereal Retail Collective operates
                entirely outside of conventional seasonal cycles. We believe
                that a masterpiece cannot be rushed, and a true wardrobe is
                built over a lifetime of meticulous curation.
              </p>
              <p>
                Each garment is drafted, cut, and assembled within our private
                European Ateliers. We source our cashmere from nomadic
                high-altitude herds, our silks from historic looms, and our
                hardware is milled to aeronautical tolerances.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
