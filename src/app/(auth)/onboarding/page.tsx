"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";

const STEPS = [
  { title: "What class or exam are you studying for?", options: ["School (6th-10th)", "Junior College (11th-12th)", "Competitive Exams (JEE/NEET)", "University", "Personal Learning"] },
  { title: "What are your main subjects?", options: ["Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography", "Computer Science", "Languages"] },
  { title: "What is your main study goal?", options: ["Improve Retention", "Exam Preparation", "Better Notes", "Learn Faster"] },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string[]>>({ 0: [], 1: [], 2: [] });

  const handleToggle = (option: string) => {
    setSelections(prev => {
      const current = prev[currentStep];
      if (currentStep === 1) { // multiple select
        return { ...prev, [currentStep]: current.includes(option) ? current.filter(o => o !== option) : [...current, option] };
      }
      // single select
      return { ...prev, [currentStep]: [option] };
    });
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(c => c + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const stepData = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <Card className="border-t-8 border-t-[var(--amber)]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-[var(--text-primary)] mb-2">Let's personalize your notebook</h1>
        <Progress value={progress} color="amber" className="mb-4" />
        <p className="text-sm font-medium text-[var(--amber)]">Step {currentStep + 1} of {STEPS.length}</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">{stepData.title}</h2>
        
        <div className="grid gap-3">
          {stepData.options.map(option => {
            const isSelected = selections[currentStep].includes(option);
            return (
              <button
                key={option}
                onClick={() => handleToggle(option)}
                className={`p-4 rounded-[var(--radius-button)] text-left transition-all border-2 ${
                  isSelected 
                    ? "border-[var(--amber)] bg-[var(--amber)]/10 text-[var(--text-primary)]" 
                    : "border-transparent bg-[var(--paper)] text-[var(--text-secondary)] hover:bg-gray-100 dark:hover:bg-[#3d352f]"
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-[var(--paper)]">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentStep(c => Math.max(0, c - 1))}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button 
            className="bg-[var(--amber)] text-gray-900 hover:bg-[#e6b450]" 
            onClick={handleNext}
            disabled={selections[currentStep].length === 0}
          >
            {currentStep === STEPS.length - 1 ? "Finish" : "Continue"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
