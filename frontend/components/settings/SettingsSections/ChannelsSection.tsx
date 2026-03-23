"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

const CHANNEL_META = [
  { id: "whatsapp", name: "WhatsApp", icon: "💬", placeholder: "+91 98765 43210", inputKey: "phone" },
  { id: "email", name: "Email", icon: "📧", placeholder: "you@example.com", inputKey: "email" },
  { id: "telegram", name: "Telegram", icon: "✈️", placeholder: "chat_id e.g. 123456789", inputKey: "chat_id" },
  { id: "slack", name: "Slack", icon: "⚡", placeholder: "https://hooks.slack.com/...", inputKey: "webhook_url" },
];

export default function ChannelsSection() {
  const [connected, setConnected] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [connecting, setConnecting] = useState<string | null>(null);
  const [testing, setTesting] = useState<string | null>(null);

  const handleConnect = async (channelId: string) => {
    const val = inputValues[channelId];
    if (!val) return;
    setConnecting(channelId);
    try {
      if (channelId === "email") await api.channels.connectEmail(val);
      else if (channelId === "whatsapp") await api.channels.connectWhatsapp(val);
      else if (channelId === "telegram") await api.channels.connectTelegram(val);
      else if (channelId === "slack") await api.channels.connectSlack(val);
      setConnected((prev) => ({ ...prev, [channelId]: val }));
      setInputValues((prev) => ({ ...prev, [channelId]: "" }));
      alert(`Successfully connected to ${channelId}. A welcome message has been sent!`);
    } catch (err: any) {
      alert(err.message || "Failed to connect channel");
    } finally {
      setConnecting(null);
    }
  };

  const handleTest = async (channelId: string) => {
    setTesting(channelId);
    try {
      await api.channels.test(channelId as any);
      alert(`Test message sent to ${channelId}!`);
    } catch (err: any) {
      alert(err.message || "Failed to send test message");
    } finally {
      setTesting(null);
    }
  };

  const handleDisconnect = async (channelId: string) => {
    if (!confirm(`Are you sure you want to disconnect ${channelId}?`)) return;
    try {
      await api.channels.disconnect(channelId as any);
      setConnected((prev) => {
        const next = { ...prev };
        delete next[channelId];
        return next;
      });
    } catch (err: any) {
      alert(err.message || "Failed to disconnect channel");
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-[17px] font-semibold text-zinc-100 mb-1 tracking-tight">
        Connected Channels
      </h3>
      <p className="text-[13px] text-zinc-500 mb-6">
        Manage where your agents deliver their output. Connecting a channel will send a welcome message.
      </p>

      <div className="flex flex-col">
        {CHANNEL_META.map((ch, i) => {
          const isConnected = !!connected[ch.id];
          return (
            <div
              key={ch.id}
              className={`py-5 border-b border-white/[0.04] ${i === 0 ? "border-t" : ""}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-[160px]">
                  <span className="text-[18px] w-8 flex justify-center">{ch.icon}</span>
                  <span className="text-[14px] font-medium text-zinc-100">{ch.name}</span>
                </div>

                <div className="flex-1 flex items-center sm:justify-center">
                  {isConnected ? (
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 text-[12px] font-medium">Connected</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-[13px] text-zinc-400 truncate max-w-[160px]">
                        {connected[ch.id]}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[13px] text-zinc-600">Not connected</span>
                  )}
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  {isConnected ? (
                    <>
                      <button
                        onClick={() => handleTest(ch.id)}
                        disabled={testing === ch.id}
                        className="px-4 py-1.5 rounded-lg text-[12px] font-medium text-zinc-100 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] transition-colors disabled:opacity-40"
                      >
                        {testing === ch.id ? "Testing..." : "Test Connection"}
                      </button>
                      <button
                        onClick={() => handleDisconnect(ch.id)}
                        className="px-4 py-1.5 rounded-lg text-[12px] font-medium text-zinc-400 hover:text-red-400 hover:bg-red-400/5 border border-transparent transition-colors"
                      >
                        Disconnect
                      </button>
                    </>
                  ) : null}
                </div>
              </div>

              {!isConnected && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder={ch.placeholder}
                    value={inputValues[ch.id] || ""}
                    onChange={(e) =>
                      setInputValues((prev) => ({ ...prev, [ch.id]: e.target.value }))
                    }
                    className="flex-1 h-9 bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 placeholder:text-zinc-600 px-3 rounded-lg text-[13px] focus:outline-none focus:border-white/[0.2] transition-colors"
                  />
                  <button
                    onClick={() => handleConnect(ch.id)}
                    disabled={connecting === ch.id || !inputValues[ch.id]}
                    className="px-4 py-1.5 rounded-lg text-[12px] font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/[0.04] disabled:opacity-40 transition-colors"
                  >
                    {connecting === ch.id ? "Connecting..." : "Connect"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
