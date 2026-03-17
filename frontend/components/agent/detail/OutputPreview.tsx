"use client";

import { useState } from "react";

interface OutputPreviewProps {
  outputs: any[];
}

export default function OutputPreview({ outputs }: OutputPreviewProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {outputs.map((out) => (
        <div key={out.id} className="w-full bg-[#0d0d0d] border border-white/[0.06] rounded-xl overflow-hidden shadow-sm">
          
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04] bg-[#111111]">
            <div className="text-[12px] text-zinc-500 font-medium">
               {out.timestamp}
            </div>
            <button
               onClick={() => handleCopy(out.id, out.content)}
               className="text-[11px] font-medium text-zinc-500 hover:text-zinc-300 border border-white/[0.06] bg-zinc-800/40 hover:bg-zinc-800/80 px-2 py-1 rounded-md transition-colors"
            >
              {copiedId === out.id ? "Copied \u2713" : "Copy"}
            </button>
          </div>

          <div className="p-4 overflow-x-auto">
             <pre className="font-mono text-[12.5px] text-zinc-300 leading-relaxed whitespace-pre-wrap selection:bg-emerald-500/30 selection:text-emerald-50">
               {out.content}
             </pre>
          </div>

        </div>
      ))}

      {outputs.length === 0 && (
        <div className="w-full py-12 flex flex-col items-center justify-center text-center border border-dashed border-white/[0.06] rounded-xl">
           <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center mb-3">
             <span className="text-zinc-500 text-[18px]">⚡</span>
           </div>
           <p className="text-[14px] text-zinc-400 font-medium mb-1">No outputs yet</p>
           <p className="text-[12px] text-zinc-600">The agent hasn't generated any content yet.</p>
        </div>
      )}
    </div>
  );
}
