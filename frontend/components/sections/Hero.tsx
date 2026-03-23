"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const avatarColors = [
  "bg-orange-400",
  "bg-blue-400",
  "bg-violet-500",
  "bg-emerald-400",
  "bg-rose-400",
];
const initials = ["R", "S", "A", "M", "K"];

const agents = [
  {
    name: "Morning Finance Briefing",
    desc: "Crypto + stocks digest at 8am",
    channel: "WhatsApp",
    channelColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    time: "8:00 AM",
    icon: "💹",
  },
  {
    name: "Job Hunt Agent",
    desc: "New listings filtered by role",
    channel: "Email",
    channelColor: "bg-blue-50 text-blue-700 border-blue-100",
    time: "9:00 AM",
    icon: "🎯",
  },
  {
    name: "Research Digest",
    desc: "AI news summarized daily",
    channel: "Telegram",
    channelColor: "bg-sky-50 text-sky-600 border-sky-100",
    time: "7:30 PM",
    icon: "🔍",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Grid Background — Light Blue Graph Style */}
      <div className="absolute inset-0 z-0 h-full w-full bg-white bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Subtle Glow to integrate with the theme */}
      <div className="absolute inset-x-0 top-0 z-0 m-auto h-[300px] w-[600px] rounded-full bg-emerald-400/5 blur-[120px]"></div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 pt-[82px] pb-10 lg:pt-[100px] lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* LEFT — Copy */}
          <div className="flex flex-col" style={{ willChange: "transform" }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0, ease }}
              className="inline-flex items-center gap-2 w-fit border border-zinc-200 rounded-full px-3 py-1 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[12px] text-zinc-500 font-medium">
                Now live — 2,400+ agents running daily
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-[clamp(2.5rem,5vw,3.75rem)] font-semibold tracking-[-0.04em] leading-[1.05] text-zinc-900"
            >
              The AI agent{"\n"}you always wanted.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="text-[clamp(1.4rem,3vw,2rem)] font-normal tracking-[-0.02em] leading-[1.2] text-zinc-400 mt-3 mb-5"
            >
              No code. No setup.
            </motion.p>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="text-[16px] text-zinc-500 leading-loose max-w-[440px] mb-8 font-normal"
            >
              Type what you want done. Pick a schedule. Choose WhatsApp, Email, or Telegram.
              Your agent runs every day — automatically.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-[14px] font-medium px-5 py-3 rounded-lg transition-colors duration-150"
              >
                Build your first agent — free
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-600 text-[14px] font-medium px-5 py-3 rounded-lg transition-all duration-150"
              >
                See how it works
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {avatarColors.map((color, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full ${color} border-2 border-white flex items-center justify-center text-[10px] font-semibold text-white`}
                  >
                    {initials[i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-px">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#f59e0b">
                      <path d="M5 0.5l1.1 2.3 2.5.3-1.8 1.8.4 2.5L5 6.2 2.8 7.4l.4-2.5L1.4 3.1l2.5-.3z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-400">
                  Loved by 2,400+ users
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Product mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="relative hidden lg:block"
            style={{ willChange: "transform" }}
          >

            {/* Main card */}
            <div className="relative bg-white border border-zinc-200 rounded-2xl shadow-2xl shadow-zinc-900/20 overflow-hidden">

              {/* Window bar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-100 bg-zinc-50/60">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <div className="flex-1 mx-6">
                  <div className="bg-white border border-zinc-200 rounded-md px-3 py-0.5 text-[10px] text-zinc-400 text-center max-w-[180px] mx-auto">
                    agents.room/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-4">

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  {[
                    { label: "Active agents", value: "6" },
                    { label: "Runs today", value: "24" },
                    { label: "Success rate", value: "99.2%", accent: true },
                  ].map(({ label, value, accent }) => (
                    <div key={label} className="bg-zinc-50 border border-zinc-100 rounded-xl p-3">
                      <div className={`text-[17px] font-bold tracking-tight mb-0.5 ${accent ? "text-emerald-600" : "text-zinc-900"}`}>{value}</div>
                      <div className="text-[10px] text-zinc-400">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Agent list */}
                <div className="space-y-1.5">
                  {agents.map((agent) => (
                    <div
                      key={agent.name}
                      className="flex items-center gap-3 p-2.5 border border-zinc-100 rounded-xl"
                    >
                      <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[14px] shrink-0">
                        {agent.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium text-zinc-800 tracking-tight truncate">
                          {agent.name}
                        </div>
                        <div className="text-[10px] text-zinc-400 truncate">{agent.desc}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={`text-[9px] font-medium px-1.5 py-px rounded-full border ${agent.channelColor}`}>
                          {agent.channel}
                        </span>
                        <span className="text-[9px] text-zinc-400">{agent.time}</span>
                      </div>
                    </div>
                  ))}

                  {/* Create new */}
                  <div className="flex items-center gap-3 p-2.5 border border-dashed border-zinc-200 rounded-xl cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 2v8M2 6h8" stroke="#a1a1aa" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="text-[12px] text-zinc-400 group-hover:text-zinc-600 transition-colors">
                      Create new agent...
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification — bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8, ease }}
              className="absolute -bottom-3 -left-4 hidden xl:block bg-white border border-zinc-200 rounded-xl shadow-md shadow-zinc-200/40 p-3 w-[200px]"
            >
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[12px] shrink-0">
                  ✅
                </div>
                <div>
                  <div className="text-[11px] font-medium text-zinc-800 mb-px">
                    Agent ran successfully
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Finance Briefing → WhatsApp
                  </div>
                  <div className="text-[9px] text-zinc-300 mt-1">2 min ago</div>
                </div>
              </div>
            </motion.div>

            {/* Floating badge — top right */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9, ease }}
              className="absolute -top-3 -right-3 hidden xl:block bg-zinc-900 text-white rounded-xl px-2.5 py-1.5 shadow-sm"
            >
              <div className="text-[10px] font-medium">Running 24/7</div>
              <div className="flex items-center gap-1 mt-px">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[9px] text-zinc-400">Zero downtime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
