"use client";

interface StepDeliveryProps {
  delivery: string | null;
  setDelivery: (delivery: string) => void;
}

const channels = [
  { id: "whatsapp", name: "WhatsApp", desc: "Receive on your phone, instantly", icon: "💬" },
  { id: "email", name: "Email", desc: "Clean digest to your inbox", icon: "📧" },
  { id: "telegram", name: "Telegram", desc: "Fast delivery via Telegram bot", icon: "✈️" },
  { id: "slack", name: "Slack", desc: "Post to any channel or DM", icon: "⚡" },
];

export default function StepDelivery({ delivery, setDelivery }: StepDeliveryProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl px-6">
        
        <h2 className="text-[20px] font-bold text-zinc-100 mb-2 tracking-tight text-center">Where should we deliver?</h2>
        <p className="text-[14px] text-zinc-500 mb-8 text-center">Choose how you want to receive your agent's work.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {channels.map((ch) => {
            const isSelected = delivery === ch.id;

            return (
              <div
                key={ch.id}
                onClick={() => setDelivery(ch.id)}
                className={`relative flex flex-col bg-[#111111] border rounded-2xl p-6 cursor-pointer transition-all ${
                  isSelected
                    ? "border-emerald-500/40 bg-emerald-500/5 shadow-sm"
                    : "border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                {/* Selection Check */}
                <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected ? "bg-emerald-500 border-none" : "border-white/[0.15]"
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                <div className="text-[28px] mb-4 bg-zinc-800/50 w-12 h-12 rounded-xl flex items-center justify-center border border-white/[0.04]">
                  {ch.icon}
                </div>
                
                <h3 className="text-[15px] font-semibold text-zinc-100 mb-1">
                  {ch.name}
                </h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed max-w-[200px]">
                  {ch.desc}
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-[13px] text-zinc-600 text-center mt-4">
          💡 You'll enter your contact details in the next step.
        </p>

      </div>
    </div>
  );
}
