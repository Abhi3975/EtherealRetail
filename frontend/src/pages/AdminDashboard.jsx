import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { FiTrendingUp, FiBox, FiUsers, FiDollarSign } from "react-icons/fi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/analytics/dashboard")
      .then((res) => {
        if (res.data.success) {
          setStats(res.data.data);
        }
      })
      .catch((err) => toast.error("Analytics fetch failed."));
  }, []);

  if (!stats)
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud-dancer">
        <div className="w-10 h-10 border-2 border-t-luxury-black border-stone-gray/20 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="bg-cloud-dancer min-h-screen pt-40 pb-32 px-8 lg:px-20">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-20">
          <span className="font-sans uppercase tracking-[0.5em] text-[10px] text-stone-gray font-bold">
            Terminal Access
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-luxury-black mt-4 italic">
            Command Center
          </h1>
          <div className="h-[1px] w-full bg-luxury-black mt-8 opacity-10" />
        </header>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            {
              label: "Revenue",
              val: `$${stats.totalRevenue.toLocaleString()}`,
              icon: <FiDollarSign />,
            },
            { label: "Orders", val: stats.totalOrders, icon: <FiTrendingUp /> },
            { label: "Curators", val: stats.totalUsers, icon: <FiUsers /> },
            {
              label: "Masterpieces",
              val: stats.totalProducts,
              icon: <FiBox />,
            },
          ].map((kpi, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="p-10 bg-white/40 backdrop-blur-md border border-white/60 flex flex-col justify-between aspect-square group hover:bg-luxury-black transition-all duration-500"
            >
              <div className="text-2xl text-stone-gray group-hover:text-accent-neon transition-colors">
                {kpi.icon}
              </div>
              <div className="space-y-2">
                <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-stone-gray group-hover:text-white/50">
                  {kpi.label}
                </p>
                <p className="text-5xl font-serif text-luxury-black group-hover:text-cloud-dancer transition-colors tracking-tighter">
                  {kpi.val}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {}
          <div className="lg:col-span-2 space-y-12">
            <h2 className="text-3xl font-serif italic text-luxury-black">
              Recent Dispatches
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-stone-gray/20">
                    <th className="pb-8 font-sans uppercase tracking-widest text-[10px] font-bold text-stone-gray">
                      ID
                    </th>
                    <th className="pb-8 font-sans uppercase tracking-widest text-[10px] font-bold text-stone-gray">
                      Timeline
                    </th>
                    <th className="pb-8 font-sans uppercase tracking-widest text-[10px] font-bold text-stone-gray">
                      Investment
                    </th>
                    <th className="pb-8 font-sans uppercase tracking-widest text-[10px] font-bold text-stone-gray">
                      Logic
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-gray/10">
                  {stats.recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="group hover:bg-white/30 transition-colors"
                    >
                      <td className="py-8 font-mono text-[10px] tracking-widest text-stone-gray">
                        {order._id.substring(0, 12)}
                      </td>
                      <td className="py-8 font-sans text-xs font-bold text-luxury-black">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-8 font-serif italic text-lg text-luxury-black">
                        ${order.financials?.grandTotal || 0}
                      </td>
                      <td className="py-8">
                        <span
                          className={`text-[10px] uppercase font-bold tracking-widest px-4 py-2 border ${order.paymentStatus === "paid" ? "border-accent-neon text-stone-gray bg-accent-neon/5" : "border-stone-gray/20 text-stone-gray"}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {}
          <div className="space-y-10">
            <div className="bg-luxury-black p-12 text-cloud-dancer space-y-8">
              <h3 className="text-3xl font-serif">Curator Tools</h3>
              <p className="font-sans text-stone-gray text-sm leading-relaxed">
                Execute system-wide changes to the Ethereal catalog or manage
                user-level permissions.
              </p>
              <div className="space-y-4">
                <button className="w-full py-5 bg-accent-neon text-luxury-black font-sans font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all duration-300">
                  Inject Masterpiece
                </button>
                <button className="w-full py-5 border border-white/20 text-white font-sans font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-luxury-black transition-all duration-300">
                  Audit Inventory
                </button>
              </div>
            </div>

            <div className="p-8 border border-stone-gray/20 text-center space-y-4">
              <p className="font-serif italic text-stone-gray text-sm">
                "Simplicity is the ultimate sophistication."
              </p>
              <p className="font-sans text-[8px] uppercase tracking-[0.5em] font-bold text-stone-gray/40">
                — Leonardo da Vinci
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
