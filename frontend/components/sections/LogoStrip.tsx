"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

export default function LogoStrip() {
  const logos = [
    { name: "WhatsApp", icon: "💬" },
    { name: "Gmail", icon: "📧" },
    { name: "Slack", icon: "⚡" },
    { name: "Telegram", icon: "✈️" },
    { name: "Claude AI", icon: "🤖" },
    { name: "GPT-4", icon: "🧠" },
    { name: "Notion", icon: "📝" },
    { name: "Google", icon: "🔍" },
  ];

  const doubled = [...logos, ...logos];

  return (
    <AnimatedSection y={0} duration={0.5} threshold={0.3}>
      <section className="border-y border-zinc-100 py-4 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-400 shrink-0">
              Connects with
            </span>
            <div className="w-px h-3.5 bg-zinc-200 shrink-0" />
            <div className="flex-1 overflow-hidden marquee-mask">
              <div className="flex items-center gap-8 animate-marquee w-max">
                {doubled.map(({ name, icon }, i) => (
                  <div
                    key={`${name}-${i}`}
                    className="flex items-center gap-1.5 shrink-0 text-zinc-400"
                  >
                    <span className="text-[13px]">{icon}</span>
                    <span className="text-[12px] font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
