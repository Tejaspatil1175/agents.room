export default function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { label: "Your timezone", step: 0 },
    { label: "Delivery channel", step: 1 },
    { label: "First agent", step: 2 },
  ];

  return (
    <div className="w-full max-w-lg mx-auto mb-16 px-4">
      <div className="relative flex justify-between items-center">
        {/* Connecting Lines */}
        <div className="absolute left-0 top-3 w-full h-[1.5px] bg-zinc-100">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((s, idx) => {
          const isCompleted = currentStep > s.step;
          const isActive = currentStep === s.step;
          const isUpcoming = currentStep < s.step;

          return (
            <div key={idx} className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-500"
                    : isActive
                    ? "bg-zinc-900 shadow-sm"
                    : "bg-white border-2 border-zinc-200"
                }`}
              >
                {isCompleted && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              <span
                className={`text-[13px] mt-3 font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-zinc-900"
                    : isCompleted
                    ? "text-zinc-500"
                    : "text-zinc-400"
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
