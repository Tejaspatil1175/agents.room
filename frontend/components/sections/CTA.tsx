"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-zinc-50/50">
      <div className="max-w-[1120px] mx-auto px-6">
        <AnimatedSection y={24} duration={0.7} threshold={0.2}>
          <div className="relative bg-zinc-900 rounded-3xl px-8 py-16 md:px-16 text-center overflow-hidden">
            {/* Subtle top edge line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />

            {/* Subtle dot grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-[11px] text-zinc-400 font-medium">Free to start · No credit card</span>
              </div>

              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.04em] leading-[1.08] text-white mb-4">
                Your first agent is
                <br />
                waiting to be built.
              </h2>
              <p className="text-[15px] text-zinc-400 max-w-[380px] mx-auto leading-[1.7] mb-8 font-normal">
                Join 2,400+ people who automated their daily routines with a single sentence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-white hover:bg-zinc-100 text-zinc-900 font-medium text-[14px] px-5 py-2.5 rounded-lg transition-colors duration-150"
                >
                  Build your agent — free
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a
                  href="#templates"
                  className="text-[14px] text-zinc-400 hover:text-zinc-200 transition-colors duration-150 px-3 py-2.5"
                >
                  Explore templates →
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
