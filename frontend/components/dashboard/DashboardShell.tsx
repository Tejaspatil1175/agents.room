"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatsRow from "./StatsRow";
import AgentList from "./AgentList";
import ActivityFeed, { ActivityItem } from "./ActivityFeed";
import { Agent } from "./AgentCard";
import { api } from "@/lib/api";
import { getAuthUser } from "@/lib/auth";

function mapApiAgent(a: any): Agent {
  const channelIconMap: Record<string, string> = {
    weather: "🌤",
    news: "📰",
    research: "🔍",
    content: "✍️",
  };
  return {
    id: a._id,
    name: a.name,
    description: `${a.type} agent — ${a.channel}`,
    status: a.status === "active" ? "active" : "paused",
    channel: a.channel,
    schedule: a.schedule_cron,
    lastRun: a.updatedAt ? new Date(a.updatedAt).toLocaleString() : "Never",
    lastRunStatus: "success",
    runsToday: 0,
    icon: channelIconMap[a.type] || "🤖",
  };
}

function mapRunToActivity(run: any, agentName: string): ActivityItem {
  return {
    agentName,
    status: run.status === "success" ? "success" : "error",
    time: run.ran_at ? new Date(run.ran_at).toLocaleString() : "",
    channel: "",
  };
}

export default function DashboardShell() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getAuthUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    async function load() {
      try {
        const res: any = await api.agents.list();
        const mapped: Agent[] = (res.data || []).map(mapApiAgent);
        setAgents(mapped);

        const recentRuns: ActivityItem[] = [];
        for (const agent of (res.data || []).slice(0, 5)) {
          try {
            const runsRes: any = await api.runs.listByAgent(agent._id);
            const runs = (runsRes.data || []).slice(0, 2);
            runs.forEach((run: any) => {
              recentRuns.push(mapRunToActivity(run, agent.name));
            });
          } catch {
            // skip if run fetch fails for one agent
          }
        }
        setActivity(recentRuns);
      } catch {
        // keep empty state
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const activeCount = agents.filter((a) => a.status === "active").length;

  const handleDelete = async (id: string) => {
    try {
      await api.agents.delete(id);
    } catch {
      // continue regardless
    }
    setAgents((prev) => prev.filter((a) => a.id !== id));
  };

  const handleToggleStatus = async (id: string) => {
    const agent = agents.find((a) => a.id === id);
    if (!agent) return;
    try {
      if (agent.status === "paused") {
        await api.agents.resume(id);
      } else {
        await api.agents.pause(id);
      }
    } catch {
      // continue regardless
    }
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "paused" ? "active" : "paused" } : a
      )
    );
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 pt-10 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 sm:gap-0">
        <div>
          <h1 className="text-[22px] font-bold text-zinc-100 tracking-tight mb-1">
            Dashboard
          </h1>
          <p className="text-[14px] text-zinc-400">
            {getGreeting()}{user?.name ? `, ${user.name}` : ""}. {loading ? "Loading..." : `${activeCount} agents running.`}
          </p>
        </div>
        <Link
          href="/agent/new"
          className="sm:hidden w-full text-center px-4 py-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-900 text-[13px] font-medium transition-colors"
        >
          + New Agent
        </Link>
      </div>

      <StatsRow />

      <div className="flex flex-col md:flex-row gap-8 lg:gap-14 border-t border-white/[0.04] pt-8">
        {loading ? (
          <div className="flex-1 text-zinc-500 text-[14px] pt-4">Loading agents...</div>
        ) : (
          <AgentList
            agents={agents}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        )}
        <ActivityFeed items={activity} />
      </div>
    </div>
  );
}
