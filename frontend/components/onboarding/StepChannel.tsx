"use client";

interface StepChannelProps {
  value: string | null;
  onChange: (channel: string) => void;
}

export default function StepChannel({ value, onChange }: StepChannelProps) {
  const channels = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      description: "Receive on your phone, instantly",
      icon: "💬",
    },
    {
      id: "email",
      name: "Email",
      description: "Clean digest to your inbox",
      icon: "📧",
    },
    {
      id: "telegram",
      name: "Telegram",
      description: "Fast delivery via Telegram bot",
      icon: "✈️",
    },
    {
      id: "slack",
      name: "Slack",
      description: "Post to any channel or DM",
      icon: "⚡",
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">Where should agents deliver?</h2>
        <p className="text-sm text-zinc-500">Pick where you want to receive your agent's output every day.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {channels.map((channel) => {
          const isSelected = value === channel.id;

          return (
            <div
              key={channel.id}
              onClick={() => onChange(channel.id)}
              className={`relative border rounded-2xl p-5 cursor-pointer transition-all duration-200 flex flex-col items-start ${
                isSelected
                  ? "border-zinc-900 bg-zinc-50 shadow-sm ring-1 ring-zinc-900"
                  : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
              }`}
            >
              <div className="text-[22px] mb-3">{channel.icon}</div>
              <div className="text-[15px] font-semibold text-zinc-900 mb-1">{channel.name}</div>
              <div className="text-sm text-zinc-500">{channel.description}</div>

              {isSelected && (
                <div className="absolute bottom-4 right-4">
                  <div className="w-5 h-5 bg-zinc-900 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-zinc-400 mt-6">
        You can connect more channels later in Settings.
      </p>
    </div>
  );
}
