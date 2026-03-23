"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const testimonials = [
  {
    quote: "I set up a job hunt agent in literally 20 seconds. It filters exactly the roles I want and sends them to my Telegram. I stopped doomscrolling LinkedIn.",
    name: "Arjun Mehta",
    role: "CS Student, Mumbai",
    avatar: "bg-orange-400",
    initial: "A",
  },
  {
    quote: "As a freelancer I need daily research on my clients' industries. This replaces 45 minutes of my morning routine. It just shows up in my inbox every day.",
    name: "Sara Chen",
    role: "Freelance Strategist",
    avatar: "bg-blue-400",
    initial: "S",
  },
  {
    quote: "My finance agent sends me a crypto + stocks briefing every morning on WhatsApp. Feels like having a personal Bloomberg terminal, honestly.",
    name: "Rahul Nair",
    role: "Trader & Investor",
    avatar: "bg-violet-500",
    initial: "R",
  },
  {
    quote: "I built a health agent that sends me meal ideas and workout plans daily. Replaced three different apps with one sentence I typed.",
    name: "Maya Patel",
    role: "Fitness Coach",
    avatar: "bg-rose-400",
    initial: "M",
  },
  {
    quote: "The content agent drafts my LinkedIn posts every morning based on my niche. I just edit and post. Saves me 2 hours a week minimum.",
    name: "Karan Gupta",
    role: "Startup Founder",
    avatar: "bg-emerald-500",
    initial: "K",
  },
  {
    quote: "I was spending hours manually checking multiple sites for scholarship updates. Now my research agent does it and emails me a summary. Life changing.",
    name: "Priya Sharma",
    role: "PhD Student",
    avatar: "bg-amber-400",
    initial: "P",
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-24 lg:py-32 bg-zinc-50/50">
      <div className="max-w-[1440px] mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="text-center max-w-lg mx-auto mb-14" y={20} duration={0.6}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400 mb-4">
            What people say
          </div>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.035em] leading-tight text-zinc-900">
            Real people. Real agents.
            <br />
            <span className="text-zinc-300 font-normal">Running every single day.</span>
          </h2>
        </AnimatedSection>

        {/* Grid */}
        <div ref={ref} className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
          {testimonials.map((t, i) => (
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
              className="break-inside-avoid bg-white border border-zinc-200 rounded-2xl p-5 hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-200/40 transition-all duration-200"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="11" height="11" viewBox="0 0 11 11" fill="#f59e0b">
                    <path d="M5.5 0.5l1.2 2.4 2.7.3-2 2 .4 2.7-2.3-1.3-2.3 1.3.4-2.7-2-2 2.7-.3z"/>
                  </svg>
                ))}
              </div>

              <p className="text-[13px] text-zinc-600 leading-[1.7] mb-4 font-normal">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-2.5 pt-3 border-t border-zinc-100">
                <div className={`w-7 h-7 rounded-full ${t.avatar} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                  {t.initial}
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-zinc-800">{t.name}</div>
                  <div className="text-[10px] text-zinc-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
