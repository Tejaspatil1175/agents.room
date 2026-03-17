"use client";

import { useState } from "react";
import AgentCard, { Agent } from "./AgentCard";
import EmptyState from "./EmptyState";

interface AgentListProps {
  agents: Agent[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

type Filter = "all" | "active" | "paused";

export default function AgentList({ agents, onDelete, onToggleStatus }: AgentListProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredAgents = agents.filter((agent) => {
    if (filter === "active") return agent.status === "active";
    if (filter === "paused") return agent.status === "paused" || agent.status === "error"; // Group error & paused loosely for demo
    return true;
  });

  return (
    <div className="flex-1 min-w-0 flex flex-col">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4 px-2 sm:px-0">
        <h2 className="text-[15px] font-semibold text-zinc-100 tracking-tight">Your Agents</h2>
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#111111] border border-white/[0.06]">
          {(["all", "active", "paused"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-md text-[12px] font-medium capitalize transition-all ${
                filter === f
                  ? "bg-zinc-800 text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List Area */}
      {agents.length === 0 ? (
        <EmptyState />
      ) : filteredAgents.length === 0 ? (
        <div className="py-20 text-center text-zinc-500 text-sm">
          No {filter} agents found.
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          {filteredAgents.map((agent, i) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              index={i}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
