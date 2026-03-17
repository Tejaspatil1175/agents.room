"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import StepIndicator from "./StepIndicator";
import StepTimezone from "./StepTimezone";
import StepChannel from "./StepChannel";
import StepTemplate from "./StepTemplate";
import OnboardingNav from "./OnboardingNav";
import { api } from "@/lib/api";

export default function OnboardingShell() {
  const router = useRouter();
  
  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isLoading, setIsLoading] = useState(false);
  
  // Form Data State
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const totalSteps = 3;
  const isLastStep = currentStep === totalSteps - 1;

  // Validation
  const isNextDisabled = () => {
    switch (currentStep) {
      case 0:
        return !selectedTimezone;
      case 1:
        return !selectedChannel;
      case 2:
        return !selectedTemplate;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (isLastStep) {
      setIsLoading(true);
      // Simulate final submit
      try {
        await api.onboarding.complete({
          timezone: selectedTimezone,
          channel: selectedChannel!,
          templateId: selectedTemplate!,
        });
        router.push("/dashboard");
      } catch (error) {
        console.error("Submission failed", error);
        // Mock fallback
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push("/dashboard");
      }
    } else {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Step Content Map
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepTimezone value={selectedTimezone} onChange={setSelectedTimezone} />;
      case 1:
        return <StepChannel value={selectedChannel} onChange={setSelectedChannel} />;
      case 2:
        return <StepTemplate value={selectedTemplate} onChange={setSelectedTemplate} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <StepIndicator currentStep={currentStep} />
      
      <div className="w-full max-w-lg px-4 relative min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full absolute top-0 left-0 px-4"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      <OnboardingNav 
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleNext}
        onBack={handleBack}
        isNextDisabled={isNextDisabled()}
        isLoading={isLoading}
        isLastStep={isLastStep}
      />
    </div>
  );
}
