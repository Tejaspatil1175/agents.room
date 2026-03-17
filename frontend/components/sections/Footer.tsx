import Link from "next/link";

const links = {
  Product: ["Features", "Templates", "Marketplace", "Pricing", "Changelog"],
  Developers: ["Documentation", "API Reference", "GitHub", "Status"],
  Company: ["About", "Blog", "Privacy", "Terms"],
};

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 pt-14 pb-8">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14">

          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                  <rect x="2" y="2" width="4.5" height="4.5" rx="1.2" fill="white" opacity="0.9"/>
                  <rect x="8.5" y="2" width="4.5" height="4.5" rx="1.2" fill="white" opacity="0.35"/>
                  <rect x="2" y="8.5" width="4.5" height="4.5" rx="1.2" fill="white" opacity="0.35"/>
                  <rect x="8.5" y="8.5" width="4.5" height="4.5" rx="1.2" fill="#34d399"/>
                </svg>
              </div>
              <span className="text-[14px] font-semibold tracking-tight text-zinc-900">
                agents<span className="text-zinc-400 font-normal">.room</span>
              </span>
            </Link>
            <p className="text-[13px] text-zinc-500 leading-[1.6] max-w-[210px] mb-5 font-normal">
              Personal AI agents for everyone. No code, no setup, no $100/month.
            </p>

            <div className="flex items-center gap-1.5">
              {/* Twitter/X */}
              <a href="#" className="w-7 h-7 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-colors duration-200" aria-label="Twitter">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#a1a1aa"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" className="w-7 h-7 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-colors duration-200" aria-label="GitHub">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#a1a1aa"/>
                </svg>
              </a>
              {/* Product Hunt */}
              <a href="#" className="w-7 h-7 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-colors duration-200" aria-label="Product Hunt">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M13.604 8.4h-3.405V12h3.405a1.8 1.8 0 100-3.6zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1.604 12h-3.405V18H8.2V6h5.404a3.8 3.8 0 010 7.6V14z" fill="#a1a1aa"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400 mb-3">
                {category}
              </div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[13px] text-zinc-500 hover:text-zinc-900 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-zinc-100">
          <p className="text-[12px] text-zinc-400">
            © 2026 agents.room · Built with intent.
          </p>
          <div className="flex items-center gap-1.5 text-[12px] text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
