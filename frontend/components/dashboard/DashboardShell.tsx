"use client";

import { useState } from "react";
import Link from "next/link";
import StatsRow from "./StatsRow";
import AgentList from "./AgentList";
import ActivityFeed, { ActivityItem } from "./ActivityFeed";
import { Agent } from "./AgentCard";
import { api } from "@/lib/api";

// Mock Data
const initialMockAgents: Agent[] = [
  {
    id: "1",
    name: "Morning Finance Briefing",
    description: "Crypto + stocks digest",
    status: "active",
    channel: "whatsapp",
    schedule: "Daily at 8:00 AM",
    lastRun: "2 min ago",
    lastRunStatus: "success",
    runsToday: 1,
    icon: "💹",
  },
  {
    id: "2",
    name: "Job Hunt Agent",
    description: "New listings filtered by role",
    status: "active",
    channel: "email",
    schedule: "Daily at 9:00 AM",
    lastRun: "1 hr ago",
    lastRunStatus: "success",
    runsToday: 1,
    icon: "🎯",
  },
  {
    id: "3",
    name: "Research Digest",
    description: "AI news summarized daily",
    status: "active",
    channel: "telegram",
    schedule: "Daily at 7:30 PM",
    lastRun: "5 hrs ago",
    lastRunStatus: "success",
    runsToday: 0,
    icon: "🔍",
  },
  {
    id: "4",
    name: "Health Check",
    description: "Daily workout + meal plan",
    status: "paused",
    channel: "whatsapp",
    schedule: "Daily at 7:00 AM",
    lastRun: "2 days ago",
    lastRunStatus: "success",
    runsToday: 0,
    icon: "🏃",
  },
  {
    id: "5",
    name: "Content Writer",
    description: "LinkedIn posts drafted daily",
    status: "error",
    channel: "email",
    schedule: "Daily at 10:00 AM",
    lastRun: "3 hrs ago",
    lastRunStatus: "error",
    runsToday: 1,
    icon: "✍️",
  },
];

const mockActivity: ActivityItem[] = [
  { agentName: "Morning Finance Briefing", status: "success", time: "2 min ago", channel: "whatsapp" },
  { agentName: "Content Writer", status: "error", time: "3 hrs ago", channel: "email" },
  { agentName: "Job Hunt Agent", status: "success", time: "1 hr ago", channel: "email" },
  { agentName: "Research Digest", status: "success", time: "5 hrs ago", channel: "telegram" },
  { agentName: "Morning Finance Briefing", status: "success", time: "Yesterday 8:00 AM", channel: "whatsapp" },
  { agentName: "Job Hunt Agent", status: "success", time: "Yesterday 9:00 AM", channel: "email" },
  { agentName: "Health Check", status: "success", time: "2 days ago", channel: "whatsapp" },
];

export default function DashboardShell() {
  const [agents, setAgents] = useState<Agent[]>(initialMockAgents);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const activeCount = agents.filter(a => a.status === "active").length;

  const handleDelete = async (id: string) => {
    try {
      await api.agents.delete(id);
      setAgents(prev => prev.filter(a => a.id !== id));
    } catch (e) {
      // mock fallback
      setAgents(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleToggleStatus = async (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (!agent) return;
    
    try {
      if (agent.status === "paused") {
        await api.agents.resume(id);
      } else {
        await api.agents.pause(id);
      }
      setAgents(prev => prev.map(a => {
        if (a.id === id) {
          return { ...a, status: a.status === "paused" ? "active" : "paused" };
        }
        return a;
      }));
    } catch (e) {
      // mock fallback
      setAgents(prev => prev.map(a => {
        if (a.id === id) {
          return { ...a, status: a.status === "paused" ? "active" : "paused" };
        }
        return a;
      }));
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 pt-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 sm:gap-0">
        <div>
          <h1 className="text-[22px] font-bold text-zinc-100 tracking-tight mb-1">
            Dashboard
          </h1>
          <p className="text-[14px] text-zinc-400">
            {getGreeting()}. {activeCount} agents are running.
          </p>
        </div>
        <Link
          href="/agent/new"
          className="sm:hidden w-full text-center px-4 py-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-900 text-[13px] font-medium transition-colors"
        >
          + New Agent
        </Link>
      </div>

      {/* Stats Row */}
      <StatsRow />

      {/* Main Two-Column Layout */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-14 border-t border-white/[0.04] pt-8">
        <AgentList 
          agents={agents} 
          onDelete={handleDelete} 
          onToggleStatus={handleToggleStatus} 
        />
        <ActivityFeed items={mockActivity} />
      </div>
    </div>
  );
}
