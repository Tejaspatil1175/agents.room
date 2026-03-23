"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { getAuthUser, setAuthUser } from "@/lib/auth";

export default function ProfileSection() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  // Groq key state
  const [groqKey, setGroqKey] = useState("");
  const [groqSaved, setGroqSaved] = useState(false);
  const [groqSaving, setGroqSaving] = useState(false);
  const [groqDeleting, setGroqDeleting] = useState(false);
  const [hasGroqKey, setHasGroqKey] = useState(false);
  const [showGroqKey, setShowGroqKey] = useState(false);

  useEffect(() => {
    const cached = getAuthUser();
    if (cached) {
      setName(cached.name || "");
      setEmail(cached.email || "");
      setTimezone(cached.timezone || "Asia/Kolkata");
      setHasGroqKey(!!cached.groq_api_key);
    }
    api.auth.me().then((res: any) => {
      const u = res?.data;
      if (u) {
        setName(u.name || "");
        setEmail(u.email || "");
        setTimezone(u.timezone || "Asia/Kolkata");
        setHasGroqKey(!!u.groq_api_key);
        setAuthUser(u);
      }
    }).catch(() => {});
  }, []);

  const initials = name
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);
    try {
      const cached = getAuthUser();
      if (cached) setAuthUser({ ...cached, name, timezone });
      await new Promise((r) => setTimeout(r, 600));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveGroqKey = async () => {
    if (!groqKey.trim()) return;
    setGroqSaving(true);
    setGroqSaved(false);
    try {
      await api.auth.saveGroqKey(groqKey.trim());
      setHasGroqKey(true);
      setGroqKey("");
      setGroqSaved(true);
      setTimeout(() => setGroqSaved(false), 2000);
    } catch {
      // ignore
    } finally {
      setGroqSaving(false);
    }
  };

  const handleDeleteGroqKey = async () => {
    setGroqDeleting(true);
    try {
      await api.auth.deleteGroqKey();
      setHasGroqKey(false);
      setGroqKey("");
    } catch {
      // ignore
    } finally {
      setGroqDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-[17px] font-semibold text-zinc-100 mb-1 tracking-tight">
        Profile
      </h3>
      <p className="text-[13px] text-zinc-500 mb-6">
        Manage your personal information.
      </p>

      {/* Avatar */}
      <div className="flex flex-col mb-8">
        <div className="w-16 h-16 rounded-full bg-zinc-700 flex items-center justify-center text-[22px] font-bold text-zinc-300 shadow-sm border border-white/[0.04] mb-3 ring-2 ring-white/10 ring-offset-2 ring-offset-[#0a0a0a]">
          {initials}
        </div>
      </div>

      {/* Profile Fields */}
      <div className="space-y-5 mb-8">
        <div>
          <label className="block text-[13px] font-medium text-zinc-400 mb-1.5">
            Full name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 placeholder:text-zinc-600 px-3 py-2 rounded-xl text-[14px] focus:outline-none focus:border-white/[0.2] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-zinc-400 mb-1.5 flex items-center justify-between">
            Email address
            <span className="text-emerald-400 text-[11px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              Verified
            </span>
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full bg-[#1a1a1a]/50 text-zinc-500 border border-white/[0.04] px-3 py-2 rounded-xl text-[14px] focus:outline-none transition-colors cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-zinc-400 mb-1.5">
            Timezone
          </label>
          <div className="relative">
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full appearance-none bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 px-3 py-2 rounded-xl text-[14px] focus:outline-none focus:border-white/[0.2] transition-colors cursor-pointer"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (UTC+5:30)</option>
              <option value="Asia/Calcutta">Asia/Calcutta (UTC+5:30)</option>
              <option value="Europe/London">Europe/London (UTC+0:00)</option>
              <option value="America/New_York">America/New_York (UTC-5:00)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (UTC-8:00)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (UTC+9:00)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-white text-zinc-900 hover:bg-zinc-100 disabled:opacity-70 text-[13px] font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-2 mb-10"
      >
        {isSaving ? (
          <>
            <svg className="animate-spin h-4 w-4 text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </>
        ) : saved ? "Saved!" : "Save changes"}
      </button>

      {/* Divider */}
      <div className="border-t border-white/[0.06] pt-8 mb-2">
        <h3 className="text-[17px] font-semibold text-zinc-100 mb-1 tracking-tight">
          Groq API Key
        </h3>
        <p className="text-[13px] text-zinc-500 mb-6">
          Add your own Groq key for faster AI responses and no rate limits. Leave empty to use the shared system key.
        </p>

        {hasGroqKey ? (
          <div className="flex items-center gap-3 bg-[#1a1a1a] border border-white/[0.08] rounded-xl px-4 py-3 mb-4">
            <div className="flex-1">
              <p className="text-[13px] text-emerald-400 font-medium mb-0.5">Custom key active</p>
              <p className="text-[12px] text-zinc-500">Your personal Groq key is being used for all agents.</p>
            </div>
            <button
              onClick={handleDeleteGroqKey}
              disabled={groqDeleting}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-red-400 hover:bg-red-400/10 border border-red-400/20 transition-colors disabled:opacity-50"
            >
              {groqDeleting ? "Removing..." : "Remove"}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative">
              <input
                type={showGroqKey ? "text" : "password"}
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                placeholder="gsk_xxxxxxxxxxxxxxxxxxxx"
                className="w-full bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 placeholder:text-zinc-600 px-3 py-2 pr-10 rounded-xl text-[14px] focus:outline-none focus:border-white/[0.2] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowGroqKey(!showGroqKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showGroqKey ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><line x1="3" y1="3" x2="21" y2="21"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
            <p className="text-[11px] text-zinc-600">
              Get your key at{" "}
              <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-200 underline underline-offset-2">
                console.groq.com
              </a>
              . Free with no credit card required.
            </p>
            <button
              onClick={handleSaveGroqKey}
              disabled={groqSaving || !groqKey.trim()}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 disabled:opacity-50 text-[13px] font-medium px-5 py-2 rounded-lg transition-colors border border-white/[0.06]"
            >
              {groqSaving ? "Saving..." : groqSaved ? "Key saved!" : "Save Groq key"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
