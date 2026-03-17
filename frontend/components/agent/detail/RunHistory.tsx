"use client";

interface RunHistoryProps {
  runs: any[];
  onSwitchTab: () => void;
}

export default function RunHistory({ runs, onSwitchTab }: RunHistoryProps) {
  return (
    <div className="w-full">
      {/* Header Row */}
      <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-600 uppercase tracking-wider px-2 pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-4 w-[140px]">
          <span className="w-2"></span>
          <span>Run</span>
        </div>
        <div className="flex-1 min-w-[120px]">Time</div>
        <div className="w-[80px] text-right">Duration</div>
        <div className="w-[100px] text-right">Output</div>
        <div className="w-[100px] text-right"></div>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {runs.map((run, i) => (
          <div 
            key={run.id} 
            className={`flex items-center justify-between py-3.5 px-2 border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors ${
              i === runs.length - 1 ? "border-transparent" : ""
            }`}
          >
            
            <div className="flex items-center gap-4 w-[140px]">
               <div className={`w-2 h-2 rounded-full shrink-0 ${
                 run.status === "success" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]"
               }`} />
               <span className="text-[13px] font-mono text-zinc-500">#{runs.length - i}</span>
            </div>

            <div className={`flex-1 min-w-[120px] text-[13px] ${
              run.status === "success" ? "text-zinc-300" : "text-red-400/80"
            }`}>
              {run.timestamp}
            </div>

            <div className="w-[80px] text-right text-[13px] text-zinc-500 font-mono">
              {run.duration}
            </div>

            <div className="w-[100px] text-right text-[13px] text-zinc-600 font-mono">
              {run.outputLength}
            </div>

            <div className="w-[100px] text-right flex justify-end">
               <button 
                 onClick={onSwitchTab}
                 className={`text-[12px] transition-colors font-medium ${
                   run.status === "success" ? "text-zinc-600 hover:text-zinc-400" : "text-red-400/60 hover:text-red-400"
                 }`}
               >
                 {run.status === "success" ? "View output \u2192" : "View error \u2192"}
               </button>
            </div>

          </div>
        ))}
      </div>

      <div className="mt-4 pt-2 text-[12px] text-zinc-600 pl-2">
        Showing last {runs.length} runs
      </div>
    </div>
  );
}
