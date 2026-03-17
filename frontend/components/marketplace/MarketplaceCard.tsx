"use client";

import { motion } from "framer-motion";
import { Template } from "./MarketplaceFilters";

interface MarketplaceCardProps {
  template: Template;
  isInstalled: boolean;
  onInstall: (id: string) => void;
  index: number;
}

export default function MarketplaceCard({ template, isInstalled, onInstall, index }: MarketplaceCardProps) {
  const formatInstalls = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
      className="bg-[#111111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] hover:bg-[#161616] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col h-full cursor-pointer relative group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-[24px] w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 shadow-sm border border-white/[0.04]">
          {template.icon}
        </div>
        {template.featured && (
          <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Featured
          </div>
        )}
      </div>

      <h3 className="text-[14px] font-semibold text-zinc-100 mt-3 mb-1 leading-tight group-hover:underline underline-offset-2">
        {template.name}
      </h3>
      <p className="text-[13px] text-zinc-500 leading-relaxed line-clamp-2 min-h-[40px]">
        {template.description}
      </p>

      <div className="border-t border-white/[0.04] my-4" />

      <div className="flex items-center justify-between text-[11px] mb-4">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 bg-zinc-800/60 px-2 py-0.5 rounded-full capitalize border border-white/[0.02]">
            {template.channel}
          </span>
          <span className="flex items-center gap-0.5">
            <span className="text-amber-400 text-[10px]">★</span> 
            <span className="text-zinc-400">{template.rating.toFixed(1)}</span>
          </span>
        </div>
        <div className="text-zinc-600">
          {formatInstalls(template.installs)}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="text-[11px] text-zinc-600">
          by {template.author}
        </span>
        
        <button
          onClick={(e) => {
             e.stopPropagation();
             if (!isInstalled) onInstall(template.id);
          }}
          disabled={isInstalled}
          className={`text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 z-10 ${
            isInstalled 
              ? "text-emerald-400 bg-transparent cursor-default" 
              : "bg-white text-zinc-900 hover:bg-zinc-200"
          }`}
        >
          {isInstalled ? "✓ Installed" : "Install"}
        </button>
      </div>
    </motion.div>
  );
}
