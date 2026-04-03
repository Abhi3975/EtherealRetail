import React from "react";
import { motion } from "framer-motion";

const Returns = () => {
  return (
    <div className="bg-cloud-dancer min-h-screen pt-40 pb-20 px-8 lg:px-20 text-luxury-black">
      <div className="max-w-screen-md mx-auto space-y-12">
        <header className="space-y-4 text-center border-b border-stone-gray/20 pb-12">
          <span className="font-sans uppercase tracking-[0.5em] text-[10px] text-accent-neon font-bold">
            Concierge
          </span>
          <h1 className="text-5xl md:text-6xl font-serif italic text-luxury-black">
            Seamless Returns
          </h1>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 font-sans text-stone-gray leading-relaxed text-lg pt-8"
        >
          <p className="text-2xl font-serif italic text-luxury-black/90 text-center">
            Absolute satisfaction remains our only acceptable metric.
          </p>

          <div className="space-y-4">
            <h3 className="font-serif text-3xl text-luxury-black">
              14-Day Consideration Period
            </h3>
            <p>
              We allow a full 14-day window from the point of delivery for you
              to experience the garment. If it fails to perfectly align with
              your narrative, you may initiate a seamless return.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-3xl text-luxury-black">
              The Protocol
            </h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Contact your dedicated Concierge via the Bespoke Inquiries
                channel.
              </li>
              <li>
                A private courier will arrive at your destination to retrieve
                the archived package.
              </li>
              <li>
                Upon inspection by our Ateliers, the capital will be returned to
                your original payment manifold within 24 hours.
              </li>
            </ol>
          </div>

          <div className="p-8 border border-stone-gray/20 bg-stone-gray/5 text-center space-y-4 mt-12 rounded-xl">
            <h4 className="font-sans tracking-widest uppercase text-xs text-luxury-black font-bold">
              Condition Requisites
            </h4>
            <p className="text-sm">
              Items must remain unworn, unwashed, and anchored to their original
              holographic authenticity tags.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Returns;
