"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const templates = [
  {
    icon: "🔍",
    name: "Research Agent",
    description: "Searches the web daily on any topic. Summarizes top findings into a clean digest.",
    channel: "Email",
    channelColor: "bg-blue-50 text-blue-600 border-blue-100",
    tag: "Popular",
    tagColor: "bg-zinc-900 text-white",
    installs: "4.2k",
  },
  {
    icon: "💹",
    name: "Finance Agent",
    description: "Tracks stocks, crypto, and news. Sends a morning briefing with portfolio insights.",
    channel: "WhatsApp",
    channelColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    tag: "Trending",
    tagColor: "bg-emerald-50 text-emerald-700",
    installs: "3.8k",
  },
  {
    icon: "✍️",
    name: "Content Agent",
    description: "Drafts LinkedIn posts, tweets, and newsletters on any topic you choose.",
    channel: "Email",
    channelColor: "bg-blue-50 text-blue-600 border-blue-100",
    tag: null,
    tagColor: "",
    installs: "2.1k",
  },
  {
    icon: "🏃",
    name: "Health Agent",
    description: "Sends daily workout plans, meal ideas, and water reminders at your chosen times.",
    channel: "WhatsApp",
    channelColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    tag: null,
    tagColor: "",
    installs: "1.9k",
  },
  {
    icon: "📬",
    name: "Email Assistant",
    description: "Reads your Gmail, summarizes important emails, and drafts replies for review.",
    channel: "Slack",
    channelColor: "bg-violet-50 text-violet-700 border-violet-100",
    tag: "New",
    tagColor: "bg-violet-50 text-violet-700",
    installs: "987",
  },
  {
    icon: "🎯",
    name: "Job Hunt Agent",
    description: "Scrapes new job listings daily, filters by your criteria, and sends matches.",
    channel: "Telegram",
    channelColor: "bg-sky-50 text-sky-700 border-sky-100",
    tag: "Popular",
    tagColor: "bg-zinc-900 text-white",
    installs: "3.1k",
  },
];

export default function Templates() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="templates" className="py-24 lg:py-32 bg-zinc-50/50">
      <div className="max-w-[1440px] mx-auto px-6">

        {/* Header */}
        <AnimatedSection
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          y={20}
          duration={0.6}
        >
          <div className="max-w-lg">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400 mb-4">
              Agent templates
            </div>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.035em] leading-[1.1] text-zinc-900">
              Start with a template.
              <br />
              <span className="text-zinc-300 font-normal">Customize anything.</span>
            </h2>
          </div>
          <a
            href="/marketplace"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300 bg-white px-4 py-2 rounded-lg transition-all duration-150 shrink-0"
          >
            Browse all templates
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 5.5h7M6 3l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </AnimatedSection>

        {/* Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {templates.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease,
              }}
              layout={false}
              className="group relative bg-white border border-zinc-200 rounded-2xl p-5 hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-200/50 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              {t.tag && (
                <div className={`absolute top-4 right-4 text-[10px] font-semibold px-2 py-0.5 rounded-full ${t.tagColor}`}>
                  {t.tag}
                </div>
              )}

              <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[18px] mb-4">
                {t.icon}
              </div>

              <h3 className="text-[14px] font-semibold text-zinc-900 tracking-tight mb-1">
                {t.name}
              </h3>
              <p className="text-[13px] text-zinc-500 leading-[1.6] mb-4 font-normal">
                {t.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${t.channelColor}`}>
                  → {t.channel}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1v5M2.5 3.5L5 6l2.5-2.5M1 8h8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t.installs}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-[13px] text-zinc-400">
            Don&apos;t see what you need?{" "}
            <a href="/agent/new" className="text-zinc-600 underline underline-offset-2 hover:text-zinc-900 transition-colors">
              Build a custom agent in 30 seconds →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
