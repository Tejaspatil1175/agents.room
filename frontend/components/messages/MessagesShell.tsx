"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";

function formatRelative(date: Date) {
  const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}

interface Agent {
  _id: string;
  name: string;
  type: string;
}

interface Message {
  _id: string;
  agent_id: Agent;
  status: "success" | "fail";
  output: string;
  error_message?: string;
  ran_at: string;
}

export default function MessagesShell() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      try {
        const [agentsRes, messagesRes]: any = await Promise.all([
          api.agents.list(),
          api.runs.listAll()
        ]);
        
        const agentData = agentsRes.data || [];
        const messageData = messagesRes.data || [];
        
        setAgents(agentData);
        setMessages(messageData);
        
        if (agentData.length > 0) {
          setSelectedAgentId(agentData[0]._id);
        }
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedAgentId, messages]);

  const filteredMessages = messages
    .filter(m => {
      const agentId = typeof m.agent_id === 'object' ? m.agent_id?._id : m.agent_id;
      return agentId === selectedAgentId;
    })
    .sort((a, b) => new Date(a.ran_at).getTime() - new Date(b.ran_at).getTime());

  const selectedAgent = agents.find(a => a._id === selectedAgentId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] text-zinc-500 text-[14px]">
        Loading your messages...
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-[#0a0a0a]">
      {/* Sidebar */}
      <div className={`${selectedAgentId ? 'hidden md:flex' : 'flex'} w-full md:w-80 border-r border-white/[0.06] flex-col bg-[#0d0d0d]`}>
        <div className="p-4 sm:p-6 border-b border-white/[0.06]">
          <h2 className="text-[17px] font-semibold text-zinc-100 tracking-tight">Messages</h2>
          <p className="text-[12px] text-zinc-500 mt-1">Select an agent to view results</p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {agents.length === 0 ? (
            <div className="p-10 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="text-[14px] font-medium text-zinc-400 mb-1">No agents found</h4>
              <p className="text-[12px] text-zinc-600 leading-relaxed">
                Create your first AI agent to start receiving messages.
              </p>
            </div>
          ) : (
            agents.map((agent) => {
              const agentMsgs = messages.filter(m => {
                const id = typeof m.agent_id === 'object' ? m.agent_id?._id : m.agent_id;
                return id === agent._id;
              }).sort((a, b) => new Date(b.ran_at).getTime() - new Date(a.ran_at).getTime());
              
              const lastMsg = agentMsgs[0];

              return (
                <button
                  key={agent._id}
                  onClick={() => setSelectedAgentId(agent._id)}
                  className={`w-full text-left p-4 sm:p-5 border-b border-white/[0.04] transition-all hover:bg-white/[0.02] active:bg-white/[0.04] ${
                    selectedAgentId === agent._id ? "bg-white/[0.06] md:border-r-2 md:border-r-emerald-500" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[14px] font-semibold text-zinc-100 truncate">{agent.name}</span>
                    {lastMsg && (
                      <span className="text-[10px] text-zinc-500 whitespace-nowrap ml-2 font-medium">
                        {formatRelative(new Date(lastMsg.ran_at))}
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-zinc-500 truncate h-4 leading-normal flex items-center gap-1.5">
                    {lastMsg ? (
                      <>
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${lastMsg.status === 'success' ? 'bg-emerald-500/50' : 'bg-red-500/50'}`} />
                        <span className="truncate">{lastMsg.status === 'success' ? lastMsg.output : lastMsg.error_message}</span>
                      </>
                    ) : (
                      <span className="italic opacity-60">Ready to run</span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`${selectedAgentId ? 'flex' : 'hidden md:flex'} flex-1 flex flex-col bg-[#0a0a0a]`}>
        {selectedAgent ? (
          <>
            <div className="h-16 px-4 sm:px-8 border-b border-white/[0.06] flex items-center justify-between bg-[#0d0d0d]/50 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedAgentId(null)}
                  className="md:hidden p-2 -ml-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[16px]">
                  {selectedAgent.type === 'weather' ? '🌤' : selectedAgent.type === 'news' ? '📰' : selectedAgent.type === 'research' ? '🔍' : '✍️'}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-zinc-100">{selectedAgent.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[11px] text-emerald-500/80 font-medium uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col gap-6 custom-scrollbar"
            >
              {filteredMessages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto px-6">
                  <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="text-[16px] font-semibold text-zinc-200 mb-2">No messages yet</h4>
                  <p className="text-[14px] text-zinc-500 leading-relaxed">
                    This agent hasn't sent any messages yet. Check back once it runs on schedule.
                  </p>
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div key={msg._id} className="flex flex-col gap-2 max-w-full sm:max-w-[85%]">
                    <div className={`p-4 sm:p-5 rounded-2xl border ${
                      msg.status === 'success' 
                        ? "bg-white/[0.03] border-white/[0.06] text-zinc-100 shadow-sm" 
                        : "bg-red-500/5 border-red-500/10 text-red-200"
                    }`}>
                      <div className="text-[14px] leading-relaxed whitespace-pre-wrap font-sans">
                        {msg.status === 'success' ? msg.output : `Error: ${msg.error_message}`}
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-600 font-medium ml-2 opacity-80 uppercase tracking-tight">
                       {new Date(msg.ran_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[#0a0a0a]">
            <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mb-8">
              <svg className="w-12 h-12 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="text-[19px] font-bold text-zinc-100 mb-3 tracking-tight">Agent Communications</h3>
            <p className="text-[15px] text-zinc-500 max-w-xs leading-relaxed">
              Select an agent from the list to view its activity, generated reports, and run history.
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
