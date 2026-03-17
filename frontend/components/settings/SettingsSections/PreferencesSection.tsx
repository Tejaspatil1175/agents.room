"use client";

import { useState } from "react";

// Custom Toggle Component to avoid dependencies
function Toggle({ checked, onChange }: { checked: boolean, onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-emerald-500' : 'bg-zinc-700'
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function PreferencesSection() {
  const [prefs, setPrefs] = useState({
    emailFailures: true,
    weeklyDigest: true,
    marketing: false
  });

  const updatePref = (key: keyof typeof prefs) => {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  };

  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-[17px] font-semibold text-zinc-100 mb-1 tracking-tight">
        Preferences
      </h3>
      <p className="text-[13px] text-zinc-500 mb-6">
        Customize your agents.room experience.
      </p>

      {/* Toggles */}
      <div className="flex flex-col mb-10">
        <div className="flex items-center justify-between py-4 border-t border-b border-white/[0.04]">
          <div className="flex flex-col pr-4">
            <span className="text-[14px] font-medium text-zinc-100 mb-0.5">Email notifications</span>
            <span className="text-[13px] text-zinc-500">Get notified when an agent fails to run.</span>
          </div>
          <Toggle checked={prefs.emailFailures} onChange={() => updatePref('emailFailures')} />
        </div>
        
        <div className="flex items-center justify-between py-4 border-b border-white/[0.04]">
          <div className="flex flex-col pr-4">
            <span className="text-[14px] font-medium text-zinc-100 mb-0.5">Weekly digest</span>
            <span className="text-[13px] text-zinc-500">Summary of all agent runs every Monday.</span>
          </div>
          <Toggle checked={prefs.weeklyDigest} onChange={() => updatePref('weeklyDigest')} />
        </div>

        <div className="flex items-center justify-between py-4 border-b border-white/[0.04]">
          <div className="flex flex-col pr-4">
            <span className="text-[14px] font-medium text-zinc-100 mb-0.5">Marketing emails</span>
            <span className="text-[13px] text-zinc-500">Product updates, new templates, and tips.</span>
          </div>
          <Toggle checked={prefs.marketing} onChange={() => updatePref('marketing')} />
        </div>
      </div>

    </div>
  );
}
