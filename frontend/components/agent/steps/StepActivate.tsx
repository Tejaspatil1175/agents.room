"use client";

import { useRef } from "react";

interface StepActivateProps {
  taskMode: "template" | "custom";
  selectedTemplate: string | null;
  templateIcon: string;
  taskDescription: string;
  schedule: any;
  delivery: string | null;
  agentName: string;
  setAgentName: (name: string) => void;
  isActivating: boolean;
  onActivate: () => void;
}

export default function StepActivate({
  templateIcon,
  taskDescription,
  schedule,
  delivery,
  agentName,
  setAgentName,
  isActivating,
  onActivate,
}: StepActivateProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);

  const getScheduleSummary = () => {
    const { frequency, time, timezone } = schedule;
    let ft = frequency;
    if (frequency === "weekdays") ft = "Weekdays";
    
    const [h, m] = time.split(":");
    let hours = parseInt(h);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const tz = timezone.split('/')[1]?.replace('_', ' ') || '';

    return `${ft.charAt(0).toUpperCase() + ft.slice(1)} at ${hours}:${m} ${ampm} ${tz}`;
  };

  return (
    <div className="w-full flex justify-center pb-24">
      <div className="w-full max-w-xl px-6">
        
        {/* Step 1: Agent Summary */}
        <div className="mb-10">
          <h3 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wider mb-3 pl-1">
            Agent summary
          </h3>
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 border-b border-white/[0.04] pb-4 mb-4">
               <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-[20px] border border-white/[0.04] shrink-0">
                 {templateIcon}
               </div>
               <div className="flex-1 min-w-0 pr-4">
                 <div className="flex items-center gap-2">
                   <h4 className="text-[15px] font-semibold text-zinc-100 truncate">{agentName || "Unnamed Agent"}</h4>
                   <button 
                     onClick={() => nameInputRef.current?.focus()}
                     className="text-zinc-500 hover:text-zinc-300 p-1"
                   >
                     <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                   </button>
                 </div>
               </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <span className="w-20 shrink-0 text-[12px] text-zinc-500 mt-0.5">Task:</span>
                <span className="text-[13px] text-zinc-300 line-clamp-3">"{taskDescription || "No task defined"}"</span>
              </div>
              <div className="flex items-center">
                <span className="w-20 shrink-0 text-[12px] text-zinc-500">Schedule:</span>
                <span className="text-[13px] text-zinc-300">{getScheduleSummary()}</span>
              </div>
              <div className="flex items-center overflow-hidden">
                <span className="w-20 shrink-0 text-[12px] text-zinc-500">Delivery:</span>
                <span className="text-[13px] text-zinc-300 flex items-center gap-1.5 truncate">
                  {delivery || "Direct Message"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
             <label className="block text-[12px] font-medium text-zinc-500 mb-1.5 pl-1">
                Customize Agent Name
             </label>
             <input
               ref={nameInputRef}
               type="text"
               value={agentName}
               onChange={(e) => setAgentName(e.target.value)}
               className="w-full h-11 bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 placeholder:text-zinc-600 px-4 rounded-xl text-[14px] focus:outline-none focus:border-white/[0.2] transition-colors shadow-sm"
               placeholder="Enter a name for your agent"
             />
          </div>
        </div>

        {/* Activation */}
        <div className="relative">
          <button
            onClick={onActivate}
            disabled={isActivating || agentName.length < 3}
            className={`w-full py-3.5 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all ${
              isActivating || agentName.length < 3
                ? "bg-emerald-500/50 text-white/70 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-white shadow-lg shadow-emerald-500/10"
            }`}
          >
            {isActivating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Activating...
              </>
            ) : (
              "🚀 Activate Agent"
            )}
          </button>
          <p className="text-[12px] text-zinc-600 text-center mt-3">
            Your agent will be activated and start its schedule immediately.
          </p>
        </div>

      </div>
    </div>
  );
}
