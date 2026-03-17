"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function ProfileSection() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.user.updateProfile({ name: "Sarah Jenkins", email: "sarah@example.com", timezone: "calcutta" });
    } catch (e) {
      // Mock fallback
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsSaving(false);
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
          SJ
        </div>
        <button className="text-[12px] text-zinc-500 hover:text-zinc-300 font-medium self-start transition-colors">
          Change
        </button>
      </div>

      {/* Forms */}
      <div className="space-y-5 mb-8">
        <div>
          <label className="block text-[13px] font-medium text-zinc-400 mb-1.5">
            Full name
          </label>
          <input
            type="text"
            defaultValue="Sarah Jenkins"
            className="w-full bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 placeholder:text-zinc-600 px-3 py-2 rounded-xl text-[14px] focus:outline-none focus:border-white/[0.2] transition-colors"
          />
        </div>

        <div>
           <label className="block text-[13px] font-medium text-zinc-400 mb-1.5 flex items-center justify-between">
            Email address
            <span className="text-emerald-400 text-[11px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              ✓ Verified
            </span>
          </label>
          <input
            type="email"
            defaultValue="sarah@example.com"
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
               defaultValue="calcutta"
               className="w-full appearance-none bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 px-3 py-2 rounded-xl text-[14px] focus:outline-none focus:border-white/[0.2] transition-colors cursor-pointer"
             >
               <option value="calcutta">Asia/Calcutta (UTC+5:30)</option>
               <option value="london">Europe/London (UTC+0:00)</option>
               <option value="new_york">America/New_York (UTC-5:00)</option>
             </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-white text-zinc-900 hover:bg-zinc-100 disabled:opacity-70 disabled:hover:bg-white text-[13px] font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        {isSaving ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </>
        ) : (
          "Save changes"
        )}
      </button>

    </div>
  );
}
