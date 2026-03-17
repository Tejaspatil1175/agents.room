"use client";

// Mock Data
const channels = [
  { id: "whatsapp", name: "WhatsApp", icon: "💬", connected: true, meta: "+91 98765 43210" },
  { id: "email", name: "Email", icon: "📧", connected: true, meta: "sarah@example.com" },
  { id: "telegram", name: "Telegram", icon: "✈️", connected: false, meta: "" },
  { id: "slack", name: "Slack", icon: "⚡", connected: false, meta: "" },
];

export default function ChannelsSection() {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-[17px] font-semibold text-zinc-100 mb-1 tracking-tight">
        Connected Channels
      </h3>
      <p className="text-[13px] text-zinc-500 mb-6">
        Manage where your agents deliver their output.
      </p>

      <div className="flex flex-col">
        {channels.map((ch, i) => (
          <div 
            key={ch.id} 
            className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-white/[0.04] gap-4 sm:gap-0 ${
              i === 0 ? "border-t" : ""
            }`}
          >
            {/* Left: Icon & Name */}
            <div className="flex items-center gap-3 w-1/3">
              <span className="text-[18px] w-8 flex justify-center">{ch.icon}</span>
              <span className="text-[14px] font-medium text-zinc-100">{ch.name}</span>
            </div>

            {/* Middle: Connection Status */}
            <div className="flex-1 flex items-center sm:justify-center">
              {ch.connected ? (
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-[12px] font-medium flex items-center gap-1">
                    ✓ Connected
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-[13px] text-zinc-400 truncate max-w-[140px]">
                    {ch.meta}
                  </span>
                </div>
              ) : (
                <span className="text-[13px] text-zinc-600">
                  Not connected
                </span>
              )}
            </div>

            {/* Right: Button */}
            <div className="flex sm:justify-end w-1/4">
              <button 
                className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                  ch.connected 
                    ? "text-zinc-300 hover:text-zinc-100 hover:bg-white/[0.04] border border-transparent" 
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/[0.04]"
                }`}
              >
                {ch.connected ? "Configure" : "Connect"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
