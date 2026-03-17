"use client";

import Link from "next/link";

interface AgentHeaderProps {
  agent: any;
  agentStatus: string;
  onPause: () => void;
  onResume: () => void;
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (show: boolean) => void;
  onDelete: () => void;
}

export default function AgentHeader({
  agent,
  agentStatus,
  onPause,
  onResume,
  showDeleteConfirm,
  setShowDeleteConfirm,
  onDelete,
}: AgentHeaderProps) {

  const getStatusColor = () => {
    switch (agentStatus) {
      case "active": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "paused": return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
      case "error": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-zinc-800 text-zinc-400 border-white/[0.04]";
    }
  };

  const getStatusDot = () => {
    switch (agentStatus) {
      case "active": return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]";
      case "paused": return "bg-zinc-500";
      case "error": return "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]";
      default: return "bg-zinc-600";
    }
  };

  return (
    <div className="w-full flex flex-col items-start pt-2">
      <Link
        href="/dashboard"
        className="text-[13px] text-zinc-600 hover:text-zinc-400 font-medium transition-colors mb-6 flex items-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-6">

        {/* Left Side: Avatar + Info */}
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center text-[28px] border border-white/[0.04] shrink-0 shadow-sm mt-1">
            {agent.icon}
          </div>
          <div className="flex flex-col">
             <div className="flex items-center gap-3 mb-1.5">
               <h1 className="text-[22px] font-bold text-zinc-100 tracking-tight leading-none">
                 {agent.name}
               </h1>
               <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] uppercase font-bold tracking-widest ${getStatusColor()}`}>
                 <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot()}`} />
                 {agentStatus}
               </div>
             </div>

             <p className="text-[14px] text-zinc-500 mb-2.5 max-w-xl line-clamp-2">
               {agent.description}
             </p>

             <div className="text-[12px] text-zinc-600 flex items-center gap-2">
               <span className="font-medium text-zinc-400">{agent.schedule}</span>
               <span className="text-zinc-700">&bull;</span>
               <span className="capitalize text-zinc-400">{agent.channel}</span>
               <span className="text-zinc-700">&bull;</span>
               <span>Created {agent.createdAt}</span>
             </div>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center shrink-0">
          {showDeleteConfirm ? (
            <div className="flex items-center gap-3 bg-red-500/[0.03] border border-red-500/10 px-3 py-1.5 rounded-xl">
               <span className="text-[13px] text-zinc-400 font-medium mr-1">Delete this agent?</span>
               <button
                 onClick={() => setShowDeleteConfirm(false)}
                 className="text-zinc-500 hover:text-zinc-300 text-[13px] px-3 py-1.5 font-medium transition-colors cursor-pointer"
               >
                 Cancel
               </button>
               <button
                 onClick={onDelete}
                 className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-[13px] px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
               >
                 Yes, delete
               </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href={`/agent/${agent.id}/edit`}
                className="border border-white/[0.08] bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 text-[13px] font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit
              </Link>

              <button
                onClick={agentStatus === "active" ? onPause : onResume}
                className="border border-white/[0.08] bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 text-[13px] font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 w-[88px] justify-center cursor-pointer"
              >
                {agentStatus === "active" ? (
                   <>
                     <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/></svg>
                     Pause
                   </>
                ) : (
                   <>
                     <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"/></svg>
                     Resume
                   </>
                )}
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="border border-red-500/20 text-red-400 hover:bg-red-500/10 text-[13px] font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
