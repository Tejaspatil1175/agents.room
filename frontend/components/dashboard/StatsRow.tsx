"use client";

import { motion } from "framer-motion";

export default function StatsRow() {
  const stats = [
    { label: "Active Agents", value: "3", sub: "↑ 1 this week", isRate: false },
    { label: "Runs Today", value: "3", sub: "Next in 4h", isRate: false },
    { label: "Success Rate", value: "94.2%", sub: "↑ from 91.0%", isRate: true },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
          className="bg-[#111111] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200 rounded-2xl p-5 flex flex-col"
        >
          <span className="text-[12px] text-zinc-500 uppercase tracking-wider font-semibold mb-2">
            {stat.label}
          </span>
          <span className={`text-[2rem] font-bold tracking-tight leading-none mb-1 ${stat.isRate ? 'text-emerald-400' : 'text-zinc-100'}`}>
            {stat.value}
          </span>
          <span className="text-[12px] text-zinc-600 mt-auto pt-2">
            {stat.sub}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
