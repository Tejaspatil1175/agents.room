"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const channels = [
  {
    icon: "💬",
    name: "WhatsApp",
    description: "Delivered as a clean message to your WhatsApp. No extra app needed.",
    color: "border-emerald-100 bg-emerald-50/40",
    iconBg: "bg-emerald-100",
  },
  {
    icon: "📧",
    name: "Email",
    description: "Formatted digest straight to your inbox at your chosen time.",
    color: "border-blue-100 bg-blue-50/40",
    iconBg: "bg-blue-100",
  },
  {
    icon: "✈️",
    name: "Telegram",
    description: "Instant message via your Telegram bot. Fast, clean, reliable.",
    color: "border-sky-100 bg-sky-50/40",
    iconBg: "bg-sky-100",
  },
  {
    icon: "⚡",
    name: "Slack",
    description: "Posts directly to any Slack channel or DM. Great for teams.",
    color: "border-violet-100 bg-violet-50/40",
    iconBg: "bg-violet-100",
  },
];

const stats = [
  { value: "4", label: "Delivery channels" },
  { value: "99.9%", label: "Delivery uptime" },
  { value: "<2s", label: "Avg delivery time" },
  { value: "150+", label: "Countries supported" },
];

export default function Channels() {
  const { ref, inView } = useInView(0.15);

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease }}
            layout={false}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400 mb-4">
              Delivery
            </div>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.035em] leading-[1.1] text-zinc-900 mb-4">
              Receive anywhere
              <br />
              <span className="text-zinc-300 font-normal">you already live.</span>
            </h2>
            <p className="text-[15px] text-zinc-500 leading-[1.7] mb-8 max-w-[380px] font-normal">
              No new dashboard to check. Your agents deliver directly to where you spend your time.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ value, label }) => (
                <div key={label} className="bg-zinc-50 border border-zinc-100 rounded-xl p-4">
                  <div className="text-[1.25rem] font-bold text-zinc-900 tracking-tight mb-0.5">
                    {value}
                  </div>
                  <div className="text-[11px] text-zinc-400">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            layout={false}
            className="grid grid-cols-2 gap-3"
          >
            {channels.map((ch) => (
              <div
                key={ch.name}
                className={`border rounded-2xl p-5 transition-all duration-200 hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-200/40 ${ch.color}`}
              >
                <div className={`w-9 h-9 rounded-lg ${ch.iconBg} flex items-center justify-center text-[16px] mb-3`}>
                  {ch.icon}
                </div>
                <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight mb-1">
                  {ch.name}
                </h3>
                <p className="text-[12px] text-zinc-500 leading-[1.6] font-normal">
                  {ch.description}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
