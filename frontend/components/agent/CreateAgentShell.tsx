"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AgentStepIndicator from "./AgentStepIndicator";
import AgentWizardNav from "./AgentWizardNav";
import StepTask from "./steps/StepTask";
import StepSchedule from "./steps/StepSchedule";
import StepActivate from "./steps/StepActivate";
import { templates } from "./steps/StepTask";
import { api, scheduleToCron, templateToAgentPayload } from "@/lib/api";

export default function CreateAgentShell() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Global Wizard State
  const [taskMode, setTaskMode] = useState<"template" | "custom">("template");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [agentName, setAgentName] = useState("");

  const [schedule, setSchedule] = useState({
    frequency: "daily",
    time: "08:00",
    timezone: "Asia/Calcutta",
    days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
  });

  const [isActivating, setIsActivating] = useState(false);

  // Validation Logic
  const canProceed = () => {
    switch (currentStep) {
      case 0: // Task
        if (taskMode === "template") return selectedTemplate !== null;
        return taskDescription.length > 5;
      case 1: // Schedule
        return true; 
      case 2: // Activate
        return agentName.length >= 3;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 2 && canProceed()) {
      setDirection(1);
      setTimeout(() => setCurrentStep((prev) => prev + 1), 10);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setTimeout(() => setCurrentStep((prev) => prev - 1), 10);
    }
  };

  const handleActivate = async () => {
    setIsActivating(true);
    try {
      const cron = scheduleToCron(schedule);
      
      let payload;
      if (taskMode === "template" && selectedTemplate) {
        const tpl = templates.find(t => t.id === selectedTemplate);
        const channel = tpl?.channel || null;
        payload = templateToAgentPayload(selectedTemplate, agentName, channel || "email", cron);
        if (!channel) payload.channel = null;
      } else {
        payload = {
          name: agentName || "My Agent",
          type: "content" as const,
          config: {
            topic: taskDescription,
            format: "newsletter",
            tone: "professional",
          },
          schedule_cron: cron,
          channel: null,
        };
      }

      await api.agents.create(payload);
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push("/dashboard");
    } catch {
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    }
  };

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 60 : -60,
      opacity: 0,
    }),
  };

  // Render current step component
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepTask
            taskMode={taskMode}
            setTaskMode={setTaskMode}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            agentName={agentName}
            setAgentName={setAgentName}
          />
        );
      case 1:
        return <StepSchedule schedule={schedule} setSchedule={setSchedule} />;
      case 2:
        const tplIcon = 
          taskMode === "template" && selectedTemplate 
            ? templates.find(t => t.id === selectedTemplate)?.icon 
            : "🤖";
            
        return (
          <StepActivate
            taskMode={taskMode}
            selectedTemplate={selectedTemplate}
            templateIcon={tplIcon || "🤖"}
            taskDescription={
              taskMode === "template" && agentName 
                ? `Running the ${agentName} template` 
                : taskDescription
            }
            schedule={schedule}
            delivery={null}
            agentName={agentName}
            setAgentName={setAgentName}
            isActivating={isActivating}
            onActivate={handleActivate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col relative overflow-hidden">
      
      {/* Top Progress Indicator */}
      <AgentStepIndicator currentStep={currentStep} />

      {/* Main Form Area */}
      <div className="flex-1 flex flex-col items-center relative w-full pt-8 min-h-[500px]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="w-full absolute top-8 left-0"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Nav */}
      <AgentWizardNav
        currentStep={currentStep}
        totalSteps={3}
        onNext={handleNext}
        onBack={handleBack}
        isNextDisabled={!canProceed()}
        isLastStep={currentStep === 2}
      />
      
    </div>
  );
}
