"use client";

import Link from "next/link";

interface AgentConfigProps {
  agent: any;
}

export default function AgentConfig({ agent }: AgentConfigProps) {
  return (
    <div className="w-full">
      <h3 className="text-[12px] font-semibold text-zinc-600 uppercase tracking-widest mb-4">
        Configuration
      </h3>
      
      <div className="flex flex-col gap-5">
        
        <div>
          <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.05em] mb-1.5">
            Task
          </div>
          <div className="text-[13px] text-zinc-300 leading-relaxed line-clamp-2">
            "{agent.taskDescription}"
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.05em] mb-1.5">
            Schedule
          </div>
          <div className="text-[13px] text-zinc-300">
            {agent.schedule}
          </div>
        </div>

        <div>
           <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.05em] mb-1.5">
            Timezone
          </div>
          <div className="text-[13px] text-zinc-300">
            {agent.timezone}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.05em] mb-1.5">
            Delivery
          </div>
          <div className="text-[13px] text-zinc-300 flex items-center gap-1.5 capitalize">
             {agent.channel === "whatsapp" && "💬"}
             {agent.channel === "email" && "📧"}
             {agent.channel === "telegram" && "✈️"}
             {agent.channel === "slack" && "⚡"}
            {agent.channel}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.05em] mb-1.5">
            Created
          </div>
          <div className="text-[13px] text-zinc-300">
            {agent.createdAt}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.05em] mb-1.5">
            Agent ID
          </div>
          <div className="text-[13px] text-zinc-500 font-mono">
            #{agent.id.padStart(6, '0')}
          </div>
        </div>

      </div>

      <div className="mt-6 pt-6 border-t border-white/[0.04]">
        <Link href={`/agent/${agent.id}/edit`} className="text-[12px] font-medium text-zinc-600 hover:text-zinc-400 transition-colors flex items-center gap-1 group w-max">
          Edit configuration 
          <span className="transform group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </Link>
      </div>

    </div>
  );
}
