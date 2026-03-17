import AuthNav from "@/components/auth/AuthNav";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row font-sans">
      <AuthNav />
      
      {/* Left Panel - Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex md:w-1/2 lg:w-[45%] bg-zinc-900 flex-col p-12 lg:p-16 border-r border-zinc-800 relative z-10 pt-16">
        <div className="my-auto">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-10 leading-tight">
            Your agents <br />are waiting.
          </h2>

          <div className="space-y-3 max-w-sm">
            {/* Mock Agent Card 1 */}
            <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-white font-medium text-sm">Crypto Tracker</div>
                  <div className="text-zinc-400 text-xs">Sends to WhatsApp</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase">Running</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
            </div>

             {/* Mock Agent Card 2 */}
             <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📰</span>
                <div>
                  <div className="text-white font-medium text-sm">Morning Brief</div>
                  <div className="text-zinc-400 text-xs">Sends to Email</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase">Running</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
            </div>

            {/* Mock Agent Card 3 */}
            <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <div className="text-white font-medium text-sm">Job Scraper</div>
                  <div className="text-zinc-400 text-xs">Sends to Telegram</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase">Running</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 right-12 lg:left-16 lg:right-16 pr-8">
          <p className="text-zinc-400 italic text-sm mb-4">
            "I built an agent to watch my competitors' pricing and ping my phone when they drop. Took 30 seconds."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center text-[11px] font-bold text-white tracking-wide shadow-sm ring-1 ring-zinc-700/50 flex-shrink-0">
               SJ
            </div>
            <div>
              <div className="text-zinc-300 text-sm font-medium leading-tight">Sarah Jenkins</div>
              <div className="text-zinc-500 text-xs mt-0.5">Indie Hacker</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Container */}
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-50 p-6 pt-24 pb-12 overflow-y-auto relative z-0">
        <div className="w-full flex justify-center mt-auto mb-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
