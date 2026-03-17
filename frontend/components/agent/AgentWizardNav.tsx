"use client";

import { useRouter } from "next/navigation";

interface AgentWizardNavProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isNextDisabled: boolean;
  isLastStep: boolean;
}

export default function AgentWizardNav({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isNextDisabled,
  isLastStep
}: AgentWizardNavProps) {
  const router = useRouter();

  const handleBack = () => {
    if (currentStep === 0) {
       router.push("/dashboard");
    } else {
       onBack();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a] border-t border-white/[0.06] py-4 px-6 z-50">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        
        {/* Left: Back / Cancel */}
        <button
          onClick={handleBack}
          className="text-[14px] text-zinc-500 hover:text-zinc-300 font-medium transition-colors"
        >
          &larr; {currentStep === 0 ? "Cancel" : "Back"}
        </button>

        {/* Center: Step Count */}
        <div className="text-[13px] text-zinc-600 font-medium absolute left-1/2 -translate-x-1/2">
          Step {currentStep + 1} of {totalSteps}
        </div>

        {/* Right: Continue */}
        {!isLastStep && (
          <button
            onClick={onNext}
            disabled={isNextDisabled}
            className="bg-white hover:bg-zinc-100 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed text-zinc-900 font-medium text-[13px] px-6 py-2.5 rounded-xl transition-all"
          >
            {currentStep === totalSteps - 2 ? "Review & Activate" : "Continue"} &rarr;
          </button>
        )}
        
        {/* Spacer for last step right align */}
        {isLastStep && <div className="w-24" />}

      </div>
    </div>
  );
}
