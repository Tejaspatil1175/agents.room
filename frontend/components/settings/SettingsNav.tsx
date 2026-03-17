"use client";

export type SettingsTab = "profile" | "channels" | "preferences" | "danger";

interface SettingsNavProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export default function SettingsNav({ activeTab, onTabChange }: SettingsNavProps) {
  const tabs: { id: SettingsTab; label: string; isDanger?: boolean }[] = [
    { id: "profile", label: "Profile" },
    { id: "channels", label: "Channels" },
    { id: "preferences", label: "Preferences" },
    { id: "danger", label: "Danger Zone", isDanger: true },
  ];

  return (
    <div className="w-full md:w-52 shrink-0 flex flex-col mb-8 md:mb-0">
      <h2 className="text-[18px] font-bold text-zinc-100 tracking-tight mb-6 px-1">
        Settings
      </h2>

      <nav className="flex flex-col gap-1 w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          if (tab.isDanger) {
            return (
              <div key={tab.id} className="mt-4 pt-4 border-t border-white/[0.04]">
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[13.5px] transition-colors font-medium border border-transparent ${
                    isActive 
                      ? "bg-red-500/10 text-red-400 border-red-500/20" 
                      : "text-zinc-500 hover:text-red-400 hover:bg-zinc-900"
                  }`}
                >
                  {tab.label}
                </button>
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-[13.5px] transition-colors font-medium ${
                isActive 
                  ? "bg-zinc-800 text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
