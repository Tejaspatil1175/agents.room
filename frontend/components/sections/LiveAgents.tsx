"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";

const typeIconMap: Record<string, string> = {
  weather: "🌤",
  news: "📰",
  research: "🔍",
  content: "✍️",
};

const channelIconMap: Record<string, string> = {
  email: "📧",
  whatsapp: "💬",
  telegram: "✈️",
  slack: "⚡",
};

function cronToHuman(cron: string): string {
  try {
    const parts = cron.split(" ");
    if (parts.length !== 5) return cron;
    const [min, hour] = parts;
    const h = parseInt(hour);
    const m = parseInt(min);
    const ampm = h >= 12 ? "PM" : "AM";
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m.toString().padStart(2, "0");
    return `Daily at ${displayH}:${displayM} ${ampm}`;
  } catch {
    return cron;
  }
}

export default function LiveAgents() {
  const [agents, setAgents] = useState<any[]>([]);
  const [runs, setRuns] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [runningId, setRunningId] = useState<string | null>(null);
  const [runResult, setRunResult] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);
  const loggedIn = isAuthenticated();

  useEffect(() => {
    setMounted(true);
    if (!loggedIn) {
      setLoading(false);
      return;
    }
    async function load() {
      try {
        const res: any = await api.agents.list();
        const agentList = res?.data || [];
        setAgents(agentList);

        const runMap: Record<string, any[]> = {};
        for (const agent of agentList.slice(0, 6)) {
          try {
            const r: any = await api.runs.listByAgent(agent._id);
            runMap[agent._id] = (r?.data || []).slice(0, 1);
          } catch {
            runMap[agent._id] = [];
          }
        }
        setRuns(runMap);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [loggedIn]);

  const handleRunNow = async (agentId: string) => {
    setRunningId(agentId);
    setRunResult((prev) => ({ ...prev, [agentId]: "" }));
    try {
      await api.agents.runNow(agentId);
      setRunResult((prev) => ({ ...prev, [agentId]: "triggered" }));
      // refresh runs after 2s
      setTimeout(async () => {
        try {
          const r: any = await api.runs.listByAgent(agentId);
          setRuns((prev) => ({ ...prev, [agentId]: (r?.data || []).slice(0, 1) }));
        } catch {}
        setRunningId(null);
      }, 2000);
    } catch {
      setRunResult((prev) => ({ ...prev, [agentId]: "error" }));
      setRunningId(null);
    }
  };

  if (!mounted) {
    return (
      <section className="py-20 bg-zinc-50/50 border-t border-zinc-100">
        <div className="max-w-[1440px] mx-auto px-6 h-[200px]" />
      </section>
    );
  }

  if (!loggedIn) {
    return (
      <section className="py-20 bg-zinc-50/50 border-t border-zinc-100">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400 mb-4">
            Your agents
          </div>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-[-0.035em] text-zinc-900 mb-4">
            Test your agents live
          </h2>
          <p className="text-[15px] text-zinc-500 mb-8 max-w-md mx-auto">
            Sign in to see your active agents here and trigger them instantly from this page.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white text-[13px] font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            Sign in to view agents
          </Link>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-20 bg-zinc-50/50 border-t border-zinc-100">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-[13px] text-zinc-400 text-center">Loading your agents...</div>
        </div>
      </section>
    );
  }

  if (agents.length === 0) {
    return (
      <section className="py-20 bg-zinc-50/50 border-t border-zinc-100">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400 mb-4">
            Your agents
          </div>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-[-0.035em] text-zinc-900 mb-4">
            No agents yet
          </h2>
          <p className="text-[15px] text-zinc-500 mb-8">
            Create your first agent and it will appear here for quick testing.
          </p>
          <Link
            href="/agent/new"
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white text-[13px] font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            + Create your first agent
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-zinc-50/50 border-t border-zinc-100">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400 mb-3">
              Your agents
            </div>
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold tracking-[-0.03em] text-zinc-900">
              Test agents instantly
            </h2>
            <p className="text-[14px] text-zinc-500 mt-1">
              Hit Run Now to trigger any agent immediately and see the output.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300 bg-white px-4 py-2 rounded-lg transition-all shrink-0"
          >
            View dashboard
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 5.5h7M6 3l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {agents.slice(0, 6).map((agent) => {
            const lastRun = runs[agent._id]?.[0];
            const isRunning = runningId === agent._id;
            const result = runResult[agent._id];

            return (
              <div
                key={agent._id}
                className="bg-white border border-zinc-200 rounded-2xl p-5 hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-200/50 transition-all duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[16px]">
                      {typeIconMap[agent.type] || "🤖"}
                    </div>
                    <div>
                      <h3 className="text-[13px] font-semibold text-zinc-900 leading-tight">
                        {agent.name}
                      </h3>
                      <p className="text-[11px] text-zinc-400 capitalize">{agent.type} agent</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                    agent.status === "active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-zinc-50 text-zinc-500 border-zinc-200"
                  }`}>
                    {agent.status}
                  </span>
                </div>

                {/* Schedule + Channel */}
                <div className="flex items-center gap-3 mb-4 text-[11px] text-zinc-500">
                  <span>{cronToHuman(agent.schedule_cron)}</span>
                  <span className="text-zinc-300">·</span>
                  <span>{channelIconMap[agent.channel] || ""} {agent.channel}</span>
                </div>

                {/* Last run output */}
                {lastRun && (
                  <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-3 mb-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${lastRun.status === "success" ? "bg-emerald-400" : "bg-red-400"}`} />
                      <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wide">
                        Last output
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed line-clamp-3">
                      {lastRun.status === "success"
                        ? lastRun.output || "No output recorded"
                        : `Failed: ${lastRun.error_message || "Unknown error"}`}
                    </p>
                  </div>
                )}

                {/* Run result feedback */}
                {result === "triggered" && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 mb-3 text-[11px] text-emerald-700 font-medium">
                    Agent triggered — output will be delivered to your {agent.channel}
                  </div>
                )}
                {result === "error" && (
                  <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-3 text-[11px] text-red-600 font-medium">
                    Failed to trigger. Check your channel connection.
                  </div>
                )}

                {/* Run Now button */}
                <button
                  onClick={() => handleRunNow(agent._id)}
                  disabled={isRunning}
                  className="w-full h-9 rounded-xl bg-zinc-900 hover:bg-zinc-700 text-white text-[12px] font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isRunning ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Running...
                    </>
                  ) : (
                    "Run Now"
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {agents.length > 6 && (
          <div className="mt-6 text-center">
            <Link
              href="/dashboard"
              className="text-[13px] text-zinc-500 hover:text-zinc-900 underline underline-offset-2 transition-colors"
            >
              View all {agents.length} agents in dashboard
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
