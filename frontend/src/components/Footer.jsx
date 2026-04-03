import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-luxury-black text-cloud-dancer pt-32 pb-20 px-8 lg:px-20 border-t border-luxury-dark">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {}
        <div className="space-y-6">
          <h2 className="font-serif text-3xl tracking-widest uppercase">
            Ethereal
          </h2>
          <p className="font-sans text-stone-gray leading-relaxed max-w-sm">
            Ethereal is the definitive architectural expression of luxury. We
            distill the messy complexity of life into timeless, high-fidelity
            garments and objects.
          </p>
          <div className="flex space-x-6 text-xl">
            <a
              href="#"
              className="hover:text-accent-neon transition-colors duration-300"
            >
              IG
            </a>
            <a
              href="#"
              className="hover:text-accent-neon transition-colors duration-300"
            >
              TW
            </a>
            <a
              href="#"
              className="hover:text-accent-neon transition-colors duration-300"
            >
              FB
            </a>
          </div>
        </div>

        {}
        <div className="space-y-6">
          <h3 className="font-sans font-bold uppercase tracking-widest text-sm">
            Collections
          </h3>
          <ul className="space-y-4 text-stone-gray font-medium">
            <li>
              <Link
                to="/collection?category=Men"
                className="hover:text-cloud-dancer transition-colors duration-300 underline-offset-4 hover:underline"
              >
                Men's Edit
              </Link>
            </li>
            <li>
              <Link
                to="/collection?category=Women"
                className="hover:text-cloud-dancer transition-colors duration-300 underline-offset-4 hover:underline"
              >
                Women's Edit
              </Link>
            </li>
            <li>
              <Link
                to="/collection?category=Accessories"
                className="hover:text-cloud-dancer transition-colors duration-300 underline-offset-4 hover:underline"
              >
                Accoutrements
              </Link>
            </li>
          </ul>
        </div>

        {}
        <div className="space-y-6">
          <h3 className="font-sans font-bold uppercase tracking-widest text-sm">
            Concierge
          </h3>
          <ul className="space-y-4 text-stone-gray font-medium">
            <li>
              <Link
                to="/shipping"
                className="hover:text-cloud-dancer transition-colors duration-300"
              >
                Privileged Shipping
              </Link>
            </li>
            <li>
              <Link
                to="/returns"
                className="hover:text-cloud-dancer transition-colors duration-300"
              >
                Seamless Returns
              </Link>
            </li>
            <li>
              <Link
                to="/bespoke"
                className="hover:text-cloud-dancer transition-colors duration-300"
              >
                Bespoke Inquiries
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-cloud-dancer transition-colors duration-300"
              >
                Ateliers
              </Link>
            </li>
          </ul>
        </div>

        {}
        <div className="space-y-6">
          <h3 className="font-sans font-bold uppercase tracking-widest text-sm">
            The Gazette
          </h3>
          <p className="text-stone-gray leading-relaxed">
            Subscribe to receive private collection access and invitations to
            our ateliers.
          </p>
          <div className="relative group">
            <input
              type="email"
              placeholder="Join the Gazelle"
              className="w-full bg-transparent border-b border-stone-gray pb-4 font-sans focus:outline-none focus:border-accent-neon transition-all duration-500 placeholder:text-stone-gray/50"
            />
            <button className="absolute right-0 bottom-4 font-sans font-bold text-xs uppercase tracking-[0.2em] group-hover:text-accent-neon transition-all duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {}
      <div className="max-w-screen-2xl mx-auto mt-32 pt-8 border-t border-luxury-dark flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-stone-gray/60">
        <p>© 2026 Ethereal Retail Collective. All rights reserved.</p>
        <div className="flex gap-8">
          <a
            href="#"
            className="hover:text-cloud-dancer transition-colors duration-300"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-cloud-dancer transition-colors duration-300"
          >
            Ethics
          </a>
          <a
            href="#"
            className="hover:text-cloud-dancer transition-colors duration-300"
          >
            Cookie Data
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
