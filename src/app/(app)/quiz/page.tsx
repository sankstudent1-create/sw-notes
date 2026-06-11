"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import clsx from "clsx";

const MOCK_QUIZ = [
  {
    id: 1,
    question: "Which of the following is a statement of the first law of thermodynamics?",
    options: [
      "Energy cannot be created or destroyed.",
      "The entropy of an isolated system always increases.",
      "Absolute zero cannot be reached.",
      "Heat flows from hot to cold."
    ],
    answer: 0
  },
  {
    id: 2,
    question: "In an isothermal process, which property remains constant?",
    options: [
      "Pressure",
      "Volume",
      "Temperature",
      "Entropy"
    ],
    answer: 2
  }
];

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = MOCK_QUIZ[currentQ];
  const progress = ((currentQ) / MOCK_QUIZ.length) * 100;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOpt(index);
    setIsAnswered(true);
    if (index === question.answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < MOCK_QUIZ.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <Card className="max-w-md w-full text-center p-12 border-t-8 border-t-[var(--accent)]">
          <div className="text-6xl font-bold font-heading text-[var(--text-primary)] mb-4">
            {score}/{MOCK_QUIZ.length}
          </div>
          <h2 className="text-2xl font-bold font-heading text-[var(--text-primary)] mb-2">Quiz Completed!</h2>
          <p className="text-[var(--text-secondary)] mb-8">You scored {Math.round((score / MOCK_QUIZ.length) * 100)}% on the Thermodynamics quiz.</p>
          <div className="flex flex-col gap-3">
            <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
            <Button variant="ghost">Review Answers</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8 min-h-[calc(100vh-120px)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[var(--text-primary)]">Thermodynamics Quiz</h1>
          <p className="text-[var(--text-secondary)] mt-1">Question {currentQ + 1} of {MOCK_QUIZ.length}</p>
        </div>
        <div className="flex items-center text-gray-500 font-medium">
          <Clock className="w-5 h-5 mr-2" />
          14:52
        </div>
      </div>

      <Progress value={progress} color="terracotta" />

      <Card className="flex-1 flex flex-col p-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl md:text-2xl font-medium text-[var(--text-primary)] leading-relaxed mb-8">
          {question.question}
        </h2>

        <div className="space-y-4 flex-1">
          {question.options.map((opt, i) => {
            const isSelected = selectedOpt === i;
            const isCorrect = i === question.answer;
            const showCorrect = isAnswered && isCorrect;
            const showWrong = isAnswered && isSelected && !isCorrect;

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={isAnswered}
                className={clsx(
                  "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between",
                  !isAnswered && !isSelected && "border-gray-200 dark:border-gray-700 hover:border-[var(--terracotta)]/50 hover:bg-[var(--paper)]",
                  !isAnswered && isSelected && "border-[var(--terracotta)] bg-[var(--terracotta)]/10",
                  showCorrect && "border-[var(--success)] bg-[var(--success)]/10",
                  showWrong && "border-[var(--danger)] bg-[var(--danger)]/10",
                  isAnswered && !isCorrect && !isSelected && "border-gray-200 dark:border-gray-800 opacity-50"
                )}
              >
                <span className={clsx("text-base font-medium", showCorrect ? "text-[var(--success)]" : showWrong ? "text-[var(--danger)]" : "text-[var(--text-primary)]")}>
                  {opt}
                </span>
                {showCorrect && <CheckCircle2 className="w-5 h-5 text-[var(--success)] shrink-0" />}
                {showWrong && <XCircle className="w-5 h-5 text-[var(--danger)] shrink-0" />}
              </button>
            )
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--paper)] flex justify-end">
          <Button 
            className="bg-[var(--terracotta)] hover:bg-[#a66243]" 
            disabled={!isAnswered}
            onClick={handleNext}
          >
            {currentQ === MOCK_QUIZ.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
