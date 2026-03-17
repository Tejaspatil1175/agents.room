"use client";

import { useState } from "react";
import AgentHeader from "./AgentHeader";
import AgentStats from "./AgentStats";
import RunHistory from "./RunHistory";
import OutputPreview from "./OutputPreview";
import AgentConfig from "./AgentConfig";
import { motion, Variants } from "framer-motion";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export const mockAgent = {
  id: "1",
  name: "Morning Finance Briefing",
  description: "Crypto + stocks digest every morning",
  icon: "💹",
  status: "active",
  channel: "whatsapp",
  schedule: "Daily at 8:00 AM",
  timezone: "Asia/Calcutta (UTC+5:30)",
  taskDescription: "Search for the latest crypto prices, top stock movers, and major financial news. Summarize the top 5 stories in a clean, readable format. Include Bitcoin price, Nifty 50 level, and top gaining stock.",
  createdAt: "March 1, 2026",
  totalRuns: 47,
  successRate: 97.8,
  lastRun: "2 min ago",
  nextRun: "Tomorrow at 8:00 AM",
};

export const mockRuns = [
  { id: "r1", status: "success", timestamp: "Today, 8:02 AM", duration: "3.2s", outputLength: "847 chars" },
  { id: "r2", status: "success", timestamp: "Yesterday, 8:01 AM", duration: "2.9s", outputLength: "912 chars" },
  { id: "r3", status: "success", timestamp: "Mar 15, 8:03 AM", duration: "3.5s", outputLength: "778 chars" },
  { id: "r4", status: "error", timestamp: "Mar 14, 8:00 AM", duration: "8.1s", outputLength: "—" },
  { id: "r5", status: "success", timestamp: "Mar 13, 8:02 AM", duration: "2.8s", outputLength: "901 chars" },
  { id: "r6", status: "success", timestamp: "Mar 12, 8:01 AM", duration: "3.1s", outputLength: "863 chars" },
  { id: "r7", status: "success", timestamp: "Mar 11, 8:04 AM", duration: "4.2s", outputLength: "734 chars" },
];

export const mockOutputs = [
  {
    id: "o1",
    timestamp: "Today, 8:02 AM",
    content: `📊 Morning Finance Briefing — March 17, 2026

Bitcoin: $67,420 (+2.3% 24h)
Nifty 50: 22,456 (+0.8%)
Top Gainer: Reliance Industries +3.2%

Top Stories:
1. Fed signals potential rate cut in Q2 2026 — markets rally
2. Bitcoin ETF sees record $2.1B inflows this week
3. Nifty hits 3-week high on strong FII buying
4. Reliance Q4 results beat estimates by 12%
5. Gold at ₹72,400/10g as dollar weakens

Stay ahead. — agents.room`
  },
  {
    id: "o2",
    timestamp: "Yesterday, 8:01 AM",
    content: `📊 Morning Finance Briefing — March 16, 2026

Bitcoin: $65,890 (-1.1% 24h)
Nifty 50: 22,278 (+0.3%)
Top Gainer: HDFC Bank +2.1%

Top Stories:
1. RBI holds rates steady at 6.5% in April policy
2. Ethereum upgrade drives 15% price surge
3. IT sector leads Nifty gains on US deal wins
4. HDFC Bank Q4 profit up 18% YoY
5. Crude oil dips below $80 on demand concerns

Stay ahead. — agents.room`
  },
];

export default function AgentDetailShell({ id }: { id: string }) {
  const router = useRouter();
  const [agentStatus, setAgentStatus] = useState(mockAgent.status);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<"runs" | "outputs" | "config">("runs");

  const handlePauseToggle = async () => {
    try {
      if (agentStatus === "active") {
        await api.agents.pause(id);
        setAgentStatus("paused");
      } else {
        await api.agents.resume(id);
        setAgentStatus("active");
      }
    } catch {
      setAgentStatus((prev) => (prev === "active" ? "paused" : "active"));
    }
  };

  const handleDelete = async () => {
    try {
      await api.agents.delete(id);
      router.push("/dashboard");
    } catch {
      router.push("/dashboard");
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-[1200px] mx-auto px-6 pt-10 pb-24"
    >
      <motion.div variants={itemVariants}>
        <AgentHeader 
          agent={mockAgent} 
          agentStatus={agentStatus}
          onPause={handlePauseToggle}
          onResume={handlePauseToggle}
          showDeleteConfirm={showDeleteConfirm}
          setShowDeleteConfirm={setShowDeleteConfirm}
          onDelete={handleDelete}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8">
        <AgentStats agent={mockAgent} agentStatus={agentStatus} />
      </motion.div>

      {/* Main Layout: Two Column */}
      <motion.div variants={itemVariants} className="mt-12 flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full">
        
        {/* Left Column: Tabs & Content */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 mb-6">
            <button
              onClick={() => setActiveTab("runs")}
              className={`px-3 py-1.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                activeTab === "runs" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Run History
            </button>
            <button
              onClick={() => setActiveTab("outputs")}
              className={`px-3 py-1.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                activeTab === "outputs" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Output Preview
            </button>
            <button
              onClick={() => setActiveTab("config")}
              className={`px-3 py-1.5 rounded-lg text-[13.5px] font-medium transition-colors lg:hidden block ${
                activeTab === "config" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Configuration
            </button>
          </div>

          <div className="w-full">
            {activeTab === "runs" && <RunHistory runs={mockRuns} onSwitchTab={() => setActiveTab("outputs")} />}
            {activeTab === "outputs" && <OutputPreview outputs={mockOutputs} />}
            {activeTab === "config" && (
               <div className="lg:hidden block">
                 <AgentConfig agent={mockAgent} />
               </div>
            )}
          </div>
        </div>

        {/* Right Column: Config sidebar (Desktop only) */}
        <div className="hidden lg:block w-72 shrink-0 sticky top-24 self-start">
          <AgentConfig  agent={mockAgent} />
        </div>

      </motion.div>

    </motion.div>
  );
}
