"use client";

import { useState } from "react";
import SettingsNav, { SettingsTab } from "./SettingsNav";
import ProfileSection from "./SettingsSections/ProfileSection";
import ChannelsSection from "./SettingsSections/ChannelsSection";
import PreferencesSection from "./SettingsSections/PreferencesSection";

export default function SettingsShell() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [showDeletionConfirm, setShowDeletionConfirm] = useState(false);

  const renderActiveSection = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "channels":
        return <ChannelsSection />;
      case "preferences":
        return <PreferencesSection />;
      case "danger":
        return (
          <div className="w-full max-w-2xl">
            <h3 className="text-[17px] font-semibold text-zinc-100 mb-1 tracking-tight">
              Danger Zone
            </h3>
            <p className="text-[13px] text-zinc-500 mb-6">
              Critical actions for your account and agents.
            </p>

            <div className="border border-red-500/20 rounded-2xl p-6 bg-red-500/[0.02]">
              <h4 className="text-[15px] font-medium text-red-400 mb-1">
                Delete Account
              </h4>
              <p className="text-[13px] text-zinc-500 mb-5">
                Permanently delete your account, active agents, and all run history. This action cannot be undone.
              </p>

              {!showDeletionConfirm ? (
                <button
                  onClick={() => setShowDeletionConfirm(true)}
                  className="text-red-500 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Delete Account...
                </button>
              ) : (
                <div className="flex items-center gap-3 bg-[#111111] border border-red-500/20 py-3 px-4 rounded-xl">
                  <span className="text-[13px] text-zinc-300 font-medium">Are you absolutely sure?</span>
                  <button
                    onClick={() => alert('Account deleted.')}
                    className="bg-red-500 hover:bg-red-600 text-white text-[13px] font-medium px-4 py-1.5 rounded-lg transition-colors ml-auto"
                  >
                    Yes, delete
                  </button>
                  <button
                    onClick={() => setShowDeletionConfirm(false)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[13px] font-medium px-4 py-1.5 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 pt-10 pb-24">
      <div className="flex flex-col md:flex-row md:items-start gap-8 lg:gap-16">
        <SettingsNav activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 min-w-0">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}
