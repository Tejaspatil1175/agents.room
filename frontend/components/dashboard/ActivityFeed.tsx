"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export interface ActivityItem {
  agentName: string;
  status: string;
  time: string;
  channel: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

const getChannelIcon = (c: string) => {
  switch (c) {
    case "whatsapp": return "💬";
    case "email": return "📧";
    case "telegram": return "✈️";
    case "slack": return "⚡";
    default: return "🤖";
  }
};

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="hidden md:block w-72 flex-shrink-0">
      <h3 className="text-[13px] font-semibold text-zinc-400 uppercase tracking-wider mb-5 px-1">
        Recent Activity
      </h3>
      
      <div className="flex flex-col">
        {items.map((item, idx) => (
          <motion.div
            key={`${item.agentName}-${item.time}-${idx}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04, ease: "easeOut" }}
            className="flex items-start gap-3 py-3 border-b border-white/[0.04] last:border-0"
          >
            <div className="mt-1.5 flex-shrink-0">
              <div
                className={`w-2 h-2 rounded-full ${
                  item.status === "success" ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[13px] text-zinc-300 font-medium truncate">
                  {item.agentName}
                </span>
                <span className="text-[10px] leading-none">{getChannelIcon(item.channel)}</span>
              </div>
              <div className="text-[11px] text-zinc-600">
                {item.time} {item.status === "error" && "• Error"}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length > 0 && (
        <Link href="/dashboard" className="inline-block mt-4 px-1 text-[12px] text-zinc-500 hover:text-zinc-300 font-medium transition-colors">
          View all runs &rarr;
        </Link>
      )}
    </div>
  );
}
