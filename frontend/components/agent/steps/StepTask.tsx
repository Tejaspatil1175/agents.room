"use client";

export interface TemplateType {
  id: string;
  name: string;
  desc: string;
  channel: string;
  icon: string;
}

export const templates: TemplateType[] = [
  { id: "1", name: "Morning Finance Briefing", desc: "Crypto + stocks digest every morning", channel: "WhatsApp", icon: "💹" },
  { id: "2", name: "Research Digest", desc: "Daily web research on any topic", channel: "Email", icon: "🔍" },
  { id: "3", name: "Job Hunt Agent", desc: "Filtered job listings daily", channel: "Email", icon: "🎯" },
  { id: "4", name: "Content Writer", desc: "Draft posts and newsletters daily", channel: "Email", icon: "✍️" },
  { id: "5", name: "Health Coach", desc: "Workouts and meal plans daily", channel: "WhatsApp", icon: "🏃" },
  { id: "6", name: "Email Assistant", desc: "Gmail summary and draft replies", channel: "Slack", icon: "📬" },
];

interface StepTaskProps {
  taskMode: "template" | "custom";
  setTaskMode: (mode: "template" | "custom") => void;
  selectedTemplate: string | null;
  setSelectedTemplate: (id: string | null) => void;
  taskDescription: string;
  setTaskDescription: (desc: string) => void;
  agentName: string;
  setAgentName: (name: string) => void;
}

export default function StepTask({
  taskMode,
  setTaskMode,
  selectedTemplate,
  setSelectedTemplate,
  taskDescription,
  setTaskDescription,
  agentName,
  setAgentName,
}: StepTaskProps) {
  const suggestions = [
    "Send me cricket scores at 9pm",
    "Research competitor pricing weekly",
    "Summarize my Gmail every morning"
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl px-6">
        
        {/* Toggle Grid */}
        <div className="flex items-center gap-1 bg-[#111111] border border-white/[0.06] p-1 rounded-xl w-max mx-auto mb-10">
          <button
            onClick={() => setTaskMode("template")}
            className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              taskMode === "template"
                ? "bg-zinc-800 text-zinc-100 shadow-sm border border-white/[0.1]"
                : "text-zinc-500 hover:text-zinc-300 border border-transparent"
            }`}
          >
            Use a template
          </button>
          <button
            onClick={() => setTaskMode("custom")}
            className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              taskMode === "custom"
                ? "bg-zinc-800 text-zinc-100 shadow-sm border border-white/[0.1]"
                : "text-zinc-500 hover:text-zinc-300 border border-transparent"
            }`}
          >
            Custom task
          </button>
        </div>

        {/* Content area */}
        {taskMode === "template" ? (
          <div>
            <h2 className="text-[20px] font-bold text-zinc-100 mb-2 tracking-tight">Start from a template</h2>
            <p className="text-[14px] text-zinc-500 mb-8">Pick a pre-built agent. You can customize it after.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => {
                     setSelectedTemplate(tpl.id);
                     setAgentName(tpl.name);
                  }}
                  className={`bg-[#111111] border rounded-2xl p-4 cursor-pointer transition-all ${
                    selectedTemplate === tpl.id 
                      ? "border-emerald-500/50 bg-emerald-500/5"
                      : "border-white/[0.06] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 shrink-0 flex items-center justify-center text-[20px] rounded-lg bg-zinc-800 border border-white/[0.04]">
                      {tpl.icon}
                    </div>
                    <div>
                      <h3 className="text-[14px] font-medium text-zinc-100 mb-1">{tpl.name}</h3>
                      <p className="text-[12px] text-zinc-500 mb-3">{tpl.desc}</p>
                      <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold border border-white/[0.06] bg-zinc-800/60 px-2 py-0.5 rounded-full">
                        {tpl.channel}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-[20px] font-bold text-zinc-100 mb-2 tracking-tight">Describe your agent's task</h2>
            <p className="text-[14px] text-zinc-500 mb-8">Write in plain English. Your agent will do this every day.</p>

            <div className="relative mb-6">
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="e.g. Search for the latest AI news, summarize the top 5 stories, and send me a clean digest"
                maxLength={500}
                className="w-full min-h-[120px] bg-[#1a1a1a] border border-white/[0.08] rounded-2xl p-4 text-[14px] text-zinc-100 placeholder:text-zinc-600 focus:border-white/[0.15] focus:outline-none resize-none transition-colors"
              />
              <span className="absolute bottom-4 right-4 text-[11px] text-zinc-600 font-medium">
                {taskDescription.length} / 500
              </span>
            </div>

            <div className="mb-8">
               <label className="block text-[12px] font-medium text-zinc-500 mb-1.5 pl-1">
                 Agent name
               </label>
               <input
                 type="text"
                 value={agentName}
                 onChange={(e) => setAgentName(e.target.value)}
                 placeholder="e.g. My AI News Agent"
                 className="w-full h-11 bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 placeholder:text-zinc-600 px-4 rounded-xl text-[14px] focus:outline-none focus:border-white/[0.2] transition-colors"
               />
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap gap-2">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => setTaskDescription(sug)}
                  className="bg-zinc-800/60 border border-white/[0.06] text-zinc-400 text-[12px] px-3 py-1.5 rounded-full hover:border-white/[0.12] hover:text-zinc-300 transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
}
