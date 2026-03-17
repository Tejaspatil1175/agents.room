"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const steps = [
  {
    number: "01",
    title: "Type what you want",
    description:
      "Describe your task in plain English. No forms, no config files. Just say what you need and your agent understands.",
    visual: (
      <div className="bg-white border border-zinc-200 rounded-2xl p-5">
        <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-[0.08em] mb-3">Your task</div>
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-4">
          <p className="text-[13px] text-zinc-700 leading-relaxed">
            &quot;Send me cricket match scores and highlights every evening at 9pm on WhatsApp&quot;
          </p>
        </div>
        <div className="bg-zinc-900 text-white text-[13px] font-medium py-2.5 rounded-lg text-center">
          Create agent →
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Set your schedule",
    description:
      "Pick when it runs — daily, weekly, or at a custom cadence. Your agent respects your timezone and delivers on time.",
    visual: (
      <div className="bg-white border border-zinc-200 rounded-2xl p-5">
        <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-[0.08em] mb-3">Schedule</div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {["Daily", "Weekly", "Custom"].map((opt, i) => (
            <div
              key={opt}
              className={`text-center py-2 rounded-lg text-[12px] font-medium border ${
                i === 0
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-500 border-zinc-200"
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-xl p-3">
          <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-[14px]">🕘</div>
          <div>
            <div className="text-[12px] font-medium text-zinc-800">9:00 PM</div>
            <div className="text-[10px] text-zinc-400">Asia/Kolkata · Every day</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Choose where to receive",
    description:
      "Connect WhatsApp, Email, Telegram, or Slack. Your agent delivers to where you already spend your time.",
    visual: (
      <div className="bg-white border border-zinc-200 rounded-2xl p-5">
        <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-[0.08em] mb-3">Delivery channel</div>
        <div className="space-y-2">
          {[
            { icon: "💬", name: "WhatsApp", sub: "+91 98765 43210", selected: true },
            { icon: "📧", name: "Email", sub: "you@gmail.com", selected: false },
            { icon: "✈️", name: "Telegram", sub: "@yourhandle", selected: false },
          ].map(({ icon, name, sub, selected }) => (
            <div
              key={name}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                selected
                  ? "border-zinc-900 bg-zinc-50"
                  : "border-zinc-100 bg-white"
              }`}
            >
              <span className="text-[14px]">{icon}</span>
              <div className="flex-1">
                <div className="text-[12px] font-medium text-zinc-800">{name}</div>
                <div className="text-[10px] text-zinc-400">{sub}</div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected ? "border-zinc-900 bg-zinc-900" : "border-zinc-300"}`}>
                {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

function StepBlock({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, inView } = useInView(0.15);

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease }}
        layout={false}
      >
        <div className="text-[12px] font-semibold text-zinc-200/20 tracking-[0.08em] mb-3 font-mono">
          {step.number}
        </div>
        <h3 className="text-[1.5rem] font-bold tracking-[-0.03em] leading-tight text-zinc-900 mb-3">
          {step.title}
        </h3>
        <p className="text-[15px] text-zinc-500 leading-[1.7] font-normal max-w-[360px]">
          {step.description}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        layout={false}
        className="relative"
      >
        <div className="absolute -inset-4 bg-zinc-50/60 rounded-3xl -z-10" />
        {step.visual}
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="max-w-[1120px] mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="max-w-xl mb-20" y={20} duration={0.6} threshold={0.3}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400 mb-4">
            How it works
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.035em] leading-[1.1] text-zinc-900 mb-4">
            From idea to running agent
            <br />
            <span className="text-zinc-300 font-normal">in under 30 seconds.</span>
          </h2>
          <p className="text-[15px] text-zinc-500 leading-[1.7] font-normal">
            No tutorials. No configuration files. No $100/month plans you&apos;ll never use.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="space-y-20 lg:space-y-28">
          {steps.map((step, index) => (
            <StepBlock key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
