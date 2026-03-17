"use client";

interface AgentStepIndicatorProps {
  currentStep: number;
}

export default function AgentStepIndicator({ currentStep }: AgentStepIndicatorProps) {
  const steps = [
    { label: "Task", step: 0 },
    { label: "Schedule", step: 1 },
    { label: "Delivery", step: 2 },
    { label: "Activate", step: 3 },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto py-8 mb-8">
      <div className="flex items-center justify-between relative px-[16px]">
        {/* Background Line */}
        <div className="absolute top-4 left-4 right-4 h-[2px] bg-white/[0.08]" />
        
        {/* Fill Line */}
        <div 
          className="absolute top-4 left-4 h-[2px] bg-emerald-500 transition-all duration-300 ease-out z-0" 
          style={{ width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 32px)` }}
        />

        {steps.map((s) => {
          const isCompleted = currentStep > s.step;
          const isActive = currentStep === s.step;

          return (
            <div key={s.label} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium transition-colors duration-300 shadow-sm ${
                  isCompleted
                    ? "bg-emerald-500 text-white"
                    : isActive
                    ? "bg-zinc-100 text-zinc-900 border-2 border-transparent"
                    : "bg-[#0a0a0a] text-zinc-600 border border-white/[0.15]"
                }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span>{s.step + 1}</span>
                )}
              </div>
              <span
                className={`mt-3 text-[12px] font-medium absolute -bottom-6 w-max text-center transition-colors duration-300 ${
                  isActive ? "text-zinc-100" : isCompleted ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
