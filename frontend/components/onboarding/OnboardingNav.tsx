"use client";

interface OnboardingNavProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isNextDisabled: boolean;
  isLoading: boolean;
  isLastStep: boolean;
}

export default function OnboardingNav({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isNextDisabled,
  isLoading,
  isLastStep,
}: OnboardingNavProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-zinc-100 shadow-[0_-1px_0_0_rgba(0,0,0,0.06)] py-4 px-6 z-40">
      <div className="max-w-lg mx-auto flex items-center justify-between relative">
        <div className="w-1/3 flex justify-start">
          {currentStep > 0 ? (
            <button
              onClick={onBack}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 text-[14px] font-medium transition-colors disabled:opacity-50"
            >
              Back
            </button>
          ) : (
            <div className="w-full" /> // Spacer to align center counter
          )}
        </div>

        <div className="w-1/3 flex justify-center text-sm font-medium text-zinc-400">
          Step {currentStep + 1} of {totalSteps}
        </div>

        <div className="w-1/3 flex justify-end">
          <button
            onClick={onNext}
            disabled={isNextDisabled || isLoading}
            className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-[14px] font-medium transition-colors disabled:opacity-50 disabled:hover:bg-zinc-900 flex items-center justify-center min-w-[120px]"
          >
            {isLoading && isLastStep ? (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            {isLoading && isLastStep
              ? "Setting up..."
              : isLastStep
              ? "Launch my agent →"
              : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
