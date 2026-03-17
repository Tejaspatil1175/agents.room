"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: string;
  channel: string;
  schedule: string;
  lastRun: string;
  lastRunStatus: string;
  runsToday: number;
  icon: string;
}

interface AgentCardProps {
  agent: Agent;
  index: number;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export default function AgentCard({ agent, index, onDelete, onToggleStatus }: AgentCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "paused":
        return "bg-zinc-800 text-zinc-400 border-zinc-700";
      case "error":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
      className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-2 sm:px-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors gap-4 sm:gap-0 group"
    >
      {/* Left: Icon & Info */}
      <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0 pr-4">
        <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg bg-zinc-800/50 flex items-center justify-center text-[18px] flex-shrink-0 border border-white/[0.04]">
          {agent.icon}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <Link href={`/agent/${agent.id}`} className="text-[14px] font-medium text-zinc-100 truncate hover:underline underline-offset-2">
            {agent.name}
          </Link>
          <div className="text-[12px] text-zinc-500 truncate mt-0.5">
            {agent.description}
          </div>
        </div>
      </div>

      {/* Right: Meta & Actions */}
      <div className="flex items-center gap-4 sm:gap-6 ml-14 sm:ml-0 flex-shrink-0">
        
        {/* Status */}
        <div className={`px-2 py-0.5 rounded-full border text-[11px] font-medium flex items-center gap-1.5 bg-opacity-10 backdrop-blur-sm ${getStatusStyles(agent.status)}`}>
          {agent.status === 'active' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
          {agent.status === 'error' && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
          {agent.status === 'paused' && <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />}
          <span className="capitalize tracking-wide">{agent.status}</span>
        </div>

        {/* Channel Pill (hidden very small screens) */}
        <div className="hidden min-[450px]:flex px-2 py-0.5 rounded-full bg-zinc-800/50 text-[11px] text-zinc-400 capitalize border border-white/[0.02]">
          {agent.channel}
        </div>

        {/* Schedule & Run */}
        <div className="hidden sm:flex flex-col items-end w-32">
          <span className="text-[12px] text-zinc-400 truncate w-full text-right">{agent.schedule}</span>
          <span className="text-[11px] text-zinc-600 truncate w-full text-right mt-0.5">Ran {agent.lastRun}</span>
        </div>

        {/* Actions Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors focus:outline-none flex items-center justify-center w-7 h-7"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-40 rounded-xl bg-[#1a1a1a] border border-white/[0.08] shadow-xl shadow-black/40 py-1 z-50">
              <Link
                href={`/agent/${agent.id}`}
                className="block w-full text-left px-4 py-2 text-[13px] text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Edit Agent
              </Link>
              <button
                onClick={() => {
                  onToggleStatus(agent.id);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-[13px] text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-100 transition-colors"
              >
                {agent.status === "paused" ? "Resume Agent" : "Pause Agent"}
              </button>
              <div className="w-full h-px bg-white/[0.04] my-1" />
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete ${agent.name}?`)) {
                    onDelete(agent.id);
                  }
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-[13px] text-red-500 hover:bg-white/[0.04] hover:text-red-400 transition-colors"
              >
                Delete Agent
              </button>
            </div>
          )}
        </div>
        
      </div>
    </motion.div>
  );
}
