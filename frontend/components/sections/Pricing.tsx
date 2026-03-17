"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const plans = [
  {
    name: "Free",
    price: "0",
    description: "For getting started. No credit card needed.",
    features: [
      "Up to 2 active agents",
      "Daily schedule only",
      "Email delivery",
      "Community templates",
      "Basic run history (7 days)",
    ],
    cta: "Start for free",
    featured: false,
  },
  {
    name: "Pro",
    price: "9",
    description: "For power users who want it all.",
    features: [
      "Unlimited agents",
      "Any schedule — hourly to weekly",
      "WhatsApp + Email + Telegram + Slack",
      "Marketplace access",
      "Full run history",
      "Priority AI processing",
      "Custom webhooks",
    ],
    cta: "Get Pro",
    featured: true,
  },
  {
    name: "Teams",
    price: "29",
    description: "For small teams who automate together.",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared agent library",
      "Slack workspace delivery",
      "Team analytics dashboard",
      "Priority support",
    ],
    cta: "Contact us",
    featured: false,
  },
];

export default function Pricing() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="pricing" className="py-24 lg:py-32 overflow-x-hidden">
      <div className="max-w-[1120px] mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="text-center max-w-lg mx-auto mb-12" y={20} duration={0.6}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400 mb-4">
            Pricing
          </div>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.035em] leading-tight text-zinc-900 mb-3">
            Simple pricing.
            <br />
            <span className="text-zinc-300 font-normal">No hidden fees. Cancel anytime.</span>
          </h2>
          <p className="text-[14px] text-zinc-400 font-normal">
            Zapier charges $100+/month for the same thing. We charge $9.
          </p>
        </AnimatedSection>

        {/* Cards */}
        <div ref={ref} className="grid md:grid-cols-3 gap-3 max-w-[900px] mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease,
              }}
              layout={false}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.featured
                  ? "bg-zinc-900 text-white ring-1 ring-zinc-700 scale-[1.02]"
                  : "bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-200/40 transition-all duration-200"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full tracking-wide uppercase">
                    Most popular
                  </div>
                </div>
              )}

              <div className="mb-5">
                <div className={`text-[12px] font-semibold mb-1 ${plan.featured ? "text-zinc-400" : "text-zinc-500"}`}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-[2rem] font-bold tracking-tight ${plan.featured ? "text-white" : "text-zinc-900"}`}>
                    ${plan.price}
                  </span>
                  <span className="text-[12px] text-zinc-400">/mo</span>
                </div>
                <p className={`text-[13px] leading-relaxed ${plan.featured ? "text-zinc-400" : "text-zinc-500"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 space-y-2 mb-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
                      <path d="M4.5 7l2 2 3-3" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={`text-[13px] ${plan.featured ? "text-zinc-300" : "text-zinc-600"}`}>{f}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-2.5 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                  plan.featured
                    ? "bg-white hover:bg-zinc-100 text-zinc-900"
                    : "border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-700"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[12px] text-zinc-400 mt-8">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
