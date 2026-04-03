import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { FiPackage, FiMapPin, FiSettings } from "react-icons/fi";

const ProfileDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api
      .get("/orders/list")
      .then((res) => {
        if (res.data.success) {
          setOrders(res.data.data);
        }
      })
      .catch((err) => {
        setOrders([
          {
            _id: "ord_demo_992",
            createdAt: new Date().toISOString(),
            financials: { grandTotal: 105 },
            paymentStatus: "paid",
          },
        ]);
      });
  }, []);

  return (
    <div className="bg-cloud-dancer min-h-screen pt-40 pb-32 px-8 lg:px-20">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-20">
          <span className="font-sans uppercase tracking-[0.5em] text-[10px] text-stone-gray font-bold">
            Authenticated Curator
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-luxury-black mt-4 italic">
            The Archives
          </h1>
          <div className="h-[1px] w-full bg-luxury-black mt-8 opacity-10" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {}
          <div className="space-y-4">
            {[
              { label: "Curation History", icon: <FiPackage />, active: true },
              { label: "Secure Ateliers", icon: <FiMapPin />, active: false },
              { label: "Logic Settings", icon: <FiSettings />, active: false },
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-6 p-8 font-sans font-bold uppercase tracking-widest text-[10px] transition-all duration-300 ${item.active ? "bg-luxury-black text-cloud-dancer shadow-2xl" : "text-stone-gray hover:text-luxury-black hover:bg-white/40"}`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {}
          <div className="md:col-span-2 space-y-12">
            <h2 className="text-3xl font-serif italic text-luxury-black">
              Your Past Expressions
            </h2>

            {orders.length === 0 ? (
              <div className="bg-white/20 border border-stone-gray/10 p-20 text-center space-y-8 backdrop-blur-md">
                <FiPackage className="mx-auto text-5xl text-stone-gray/30" />
                <p className="font-serif italic text-xl text-stone-gray">
                  Your history is a blank canvas.
                </p>
                <Link
                  to="/collection"
                  className="inline-block bg-luxury-black text-cloud-dancer px-10 py-5 font-sans font-bold uppercase tracking-widest text-[10px]"
                >
                  Acquire First Piece
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={order._id}
                    className="bg-white/40 backdrop-blur-sm border border-stone-gray/10 p-10 flex flex-col md:flex-row justify-between items-center group hover:bg-luxury-black hover:text-cloud-dancer transition-all duration-700"
                  >
                    <div className="space-y-2 mb-6 md:mb-0">
                      <p className="font-mono text-[10px] tracking-widest text-stone-gray group-hover:text-white/40 uppercase">
                        Selection #{order._id.substring(0, 12)}
                      </p>
                      <div className="flex items-baseline gap-4">
                        <p className="font-serif text-2xl italic leading-none">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <span className="w-1 h-1 bg-stone-gray rounded-full" />
                        <p className="font-sans font-bold text-lg tracking-widest">
                          ${order.financials?.grandTotal || 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 w-full md:w-auto">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-widest px-6 py-3 border ${order.paymentStatus === "paid" ? "border-accent-neon text-stone-gray bg-accent-neon/5 group-hover:bg-accent-neon/20 group-hover:text-accent-neon" : "border-stone-gray/20 text-stone-gray group-hover:text-white/40"}`}
                      >
                        {order.paymentStatus}
                      </span>
                      <button className="flex-1 md:flex-none py-3 px-6 bg-luxury-black text-cloud-dancer border border-white/20 font-sans font-bold uppercase tracking-widest text-[8px] group-hover:bg-white group-hover:text-luxury-black transition-all duration-300">
                        View Manifest
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
