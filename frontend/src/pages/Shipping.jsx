import React from "react";
import { motion } from "framer-motion";

const Shipping = () => {
  return (
    <div className="bg-cloud-dancer min-h-screen pt-40 pb-20 px-8 lg:px-20 text-luxury-black">
      <div className="max-w-screen-md mx-auto space-y-12">
        <header className="space-y-4 text-center border-b border-stone-gray/20 pb-12">
          <span className="font-sans uppercase tracking-[0.5em] text-[10px] text-accent-neon font-bold">
            Concierge
          </span>
          <h1 className="text-5xl md:text-6xl font-serif italic text-luxury-black">
            Privileged Shipping
          </h1>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 font-sans text-stone-gray leading-relaxed text-lg pt-8"
        >
          <p className="text-2xl font-serif italic text-luxury-black/90 text-center">
            The acquisition experience is as meticulously crafted as the
            garments.
          </p>

          <div className="space-y-4">
            <h3 className="font-serif text-3xl text-luxury-black">
              Domestic Transit
            </h3>
            <p>
              Complimentary overnight transit is provided for all domestic
              clients. Your masterwork is sealed within our climate-controlled
              archival packaging, delivered directly to your residence by our
              white-glove partners.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-3xl text-luxury-black">
              International Logistics
            </h3>
            <p>
              Global expedited shipping is facilitated via our private aviation
              logistics network. All necessary tariffs, duties, and customs
              clearances are preemptively handled by your assigned Ethereal
              Concierge.
            </p>
          </div>

          <div className="p-8 border border-stone-gray/20 bg-stone-gray/5 text-center space-y-4 mt-12 rounded-xl">
            <h4 className="font-sans tracking-widest uppercase text-xs text-luxury-black font-bold">
              Signature Required
            </h4>
            <p className="text-sm">
              For your security, all deliveries require a direct signature.
              Packages will not be left unattended under any circumstances.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;
