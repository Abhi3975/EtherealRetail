import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="bg-cloud-dancer min-h-screen pt-40 pb-20 px-8 lg:px-20 text-luxury-black">
      <div className="max-w-screen-md mx-auto space-y-12">
        <header className="space-y-4 text-center border-b border-stone-gray/20 pb-12">
            <span className="font-sans uppercase tracking-[0.5em] text-[10px] text-accent-neon font-bold">Concierge</span>
            <h1 className="text-5xl md:text-6xl font-serif italic text-luxury-black">Bespoke Inquiries</h1>
        </header>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12 font-sans text-stone-gray leading-relaxed text-lg pt-8"
        >
            <p className="text-2xl font-serif italic text-luxury-black/90 text-center">
                Command our full attention.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4 border-l border-stone-gray/20 pl-6">
                    <h3 className="font-serif text-3xl text-luxury-black">Private Appointments</h3>
                    <p className="text-sm">Request access to our hidden showrooms or arrange for a tailoring master to visit your estate.</p>
                    <a href="mailto:concierge@ethereal.test" className="inline-block mt-4 text-accent-neon uppercase tracking-widest text-xs font-bold hover:text-luxury-black transition-colors">concierge@ethereal.test</a>
                </div>
                
                <div className="space-y-4 border-l border-stone-gray/20 pl-6">
                    <h3 className="font-serif text-3xl text-luxury-black">Direct Line</h3>
                    <p className="text-sm">Our senior styling operatives are available 24 hours a day via secure telecommunications.</p>
                    <p className="mt-4 font-serif text-xl text-luxury-black">+1 (800) 555-ETHL</p>
                </div>
            </div>

            <div className="pt-12 text-center border-t border-stone-gray/20">
                 <Link to="/collection" className="bg-luxury-black text-cloud-dancer px-10 py-5 font-sans font-bold uppercase tracking-widest text-[10px] hover:bg-accent-neon hover:text-luxury-black transition-all duration-500 rounded-sm inline-block">
                    Return to Collection
                 </Link>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
