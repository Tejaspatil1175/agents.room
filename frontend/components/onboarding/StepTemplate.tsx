"use client";

interface StepTemplateProps {
  value: string | null;
  onChange: (template: string) => void;
}

export default function StepTemplate({ value, onChange }: StepTemplateProps) {
  const templates = [
    {
      id: "research",
      name: "Research Agent",
      description: "Daily web research digest",
      icon: "🔍",
      channel: "Email",
    },
    {
      id: "finance",
      name: "Finance Agent",
      description: "Stocks & crypto briefing",
      icon: "💹",
      channel: "WhatsApp",
    },
    {
      id: "content",
      name: "Content Agent",
      description: "Draft posts & newsletters",
      icon: "✍️",
      channel: "Email",
    },
    {
      id: "health",
      name: "Health Agent",
      description: "Workouts & meal plans",
      icon: "🏃",
      channel: "WhatsApp",
    },
    {
      id: "email_assistant",
      name: "Email Assistant",
      description: "Gmail summary & drafts",
      icon: "📬",
      channel: "Slack",
    },
    {
      id: "job_hunt",
      name: "Job Hunt Agent",
      description: "Filtered job listings daily",
      icon: "🎯",
      channel: "Telegram",
    },
  ];

  return (
    <div className="w-full pb-24">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">Start with your first agent</h2>
        <p className="text-sm text-zinc-500">Pick a template. You can customize it fully after.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {templates.map((template) => {
          const isSelected = value === template.id;

          return (
            <div
              key={template.id}
              onClick={() => onChange(template.id)}
              className={`relative border rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 flex items-start gap-4 ${
                isSelected
                  ? "border-zinc-900 bg-zinc-50 shadow-sm ring-1 ring-zinc-900"
                  : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-xl flex-shrink-0">
                {template.icon}
              </div>
              
              <div className="flex-1 pr-6">
                <div className="text-[14px] font-semibold text-zinc-900 mb-0.5">{template.name}</div>
                <div className="text-xs text-zinc-500 mb-3">{template.description}</div>
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-100 text-[10px] font-medium text-zinc-600">
                  {template.channel}
                </span>
              </div>

               {isSelected && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4">
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
        Don't see what you need? You can build a custom agent after onboarding.
      </p>
    </div>
  );
}
