"use client";

import { useState } from "react";
import { FlashCard } from "@/components/study/FlashCard";
import { Progress } from "@/components/ui/Progress";
import { Layers, Flame, Trophy } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const MOCK_DECK = [
  { front: "What is the First Law of Thermodynamics?", back: "Energy cannot be created or destroyed, only transformed. (ΔU = Q - W)" },
  { front: "Define Entropy (S)", back: "A measure of the number of specific ways in which a thermodynamic system may be arranged, commonly understood as a measure of disorder." },
  { front: "What is an Isothermal process?", back: "A thermodynamic process in which the temperature of a system remains constant (ΔT = 0)." },
];

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  const handleResult = (difficulty: string) => {
    // In a real app, calculate next review date using SRS algorithm (e.g. SM-2)
    console.log(`Card answered with difficulty: ${difficulty}`);
    
    if (currentIndex < MOCK_DECK.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setSessionComplete(true);
    }
  };

  const progress = ((currentIndex) / MOCK_DECK.length) * 100;

  if (sessionComplete) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center h-[calc(100vh-120px)]">
        <Card className="max-w-md w-full text-center p-12">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-[var(--amber)]" />
          </div>
          <h2 className="text-3xl font-bold font-heading text-[var(--text-primary)] mb-2">Session Complete!</h2>
          <p className="text-[var(--text-secondary)] mb-8">You reviewed {MOCK_DECK.length} cards. Your retention is looking great.</p>
          <Button onClick={() => { setCurrentIndex(0); setSessionComplete(false); }} className="w-full">
            Study Another Deck
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[var(--text-primary)] flex items-center">
            <Layers className="w-6 h-6 mr-2 text-[var(--accent)]" />
            Thermodynamics Deck
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">Daily Review Session</p>
        </div>
        <div className="flex items-center space-x-2 text-orange-600 bg-orange-100 px-3 py-1.5 rounded-full font-medium text-sm">
          <Flame className="w-4 h-4 fill-orange-500" />
          12 Day Streak
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center space-x-4">
        <Progress value={progress} color="accent" size="md" />
        <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
          {currentIndex} / {MOCK_DECK.length}
        </span>
      </div>

      {/* Card Area */}
      <div className="flex-1 flex items-center justify-center">
        {/* We use a key to force re-render the FlashCard component when index changes, so it flips back to front */}
        <FlashCard 
          key={currentIndex}
          front={MOCK_DECK[currentIndex].front}
          back={MOCK_DECK[currentIndex].back}
          onResult={handleResult}
        />
      </div>
    </div>
  );
}
