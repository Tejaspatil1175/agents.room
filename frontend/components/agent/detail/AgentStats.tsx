"use client";

interface AgentStatsProps {
  agent: any;
  agentStatus: string;
}

export default function AgentStats({ agent, agentStatus }: AgentStatsProps) {
  
  const metrics = [
    { label: "Total Runs", value: agent.totalRuns },
    { label: "Success Rate", value: `${agent.successRate}%`, isSuccess: true },
    { label: "Last Run", value: agent.lastRun },
    { label: "Next Run", value: agentStatus === "paused" ? "Paused" : agent.nextRun, isPaused: agentStatus === "paused" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {metrics.map((metric, i) => (
        <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider mb-2">
            {metric.label}
          </div>
          <div className={`text-[1.3rem] md:text-[1.6rem] font-bold tracking-tight ${
            metric.isSuccess ? 'text-emerald-400' : 
            metric.isPaused ? 'text-zinc-500' : 'text-zinc-100'
          }`}>
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  );
}
