"use client";

import { useState, useEffect, useCallback } from "react";
import { FlashCard } from "@/components/study/FlashCard";
import { Progress } from "@/components/ui/Progress";
import { Layers, Flame, Trophy } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function FlashcardsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  
  const [dueCards, setDueCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDueCards = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .lte('next_review_date', now)
      .order('next_review_date', { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setDueCards(data || []);
    }
    setIsLoading(false);
  }, [router, supabase]);

  useEffect(() => {
    loadDueCards();
  }, [loadDueCards]);

  const handleResult = async (difficulty: "again" | "hard" | "good" | "easy") => {
    if (dueCards.length === 0) return;
    const card = dueCards[currentIndex];
    if (!card || !card.id) return;

    // Basic SM-2 Implementation
    let { interval, repetitions, ease_factor: easeFactor } = card;

    if (difficulty === "again") {
      repetitions = 0;
      interval = 1;
    } else {
      repetitions += 1;
      if (repetitions === 1) {
        interval = 1;
      } else if (repetitions === 2) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
    }

    // Adjust ease factor based on difficulty
    let q = 3; // good
    if (difficulty === "easy") q = 4;
    else if (difficulty === "hard") q = 2;
    else if (difficulty === "again") q = 0;

    easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3; // minimum

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    try {
      await supabase.from('flashcards').update({
        interval,
        repetitions,
        ease_factor: easeFactor,
        next_review_date: nextReviewDate.toISOString(),
        difficulty: q
      }).eq('id', card.id);

      if (currentIndex < dueCards.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        setSessionComplete(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <div className="p-8">Loading cards...</div>;

  if (dueCards.length === 0) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center h-[calc(100vh-120px)]">
        <Card className="max-w-md w-full text-center p-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-[var(--success)]" />
          </div>
          <h2 className="text-3xl font-bold font-heading text-[var(--text-primary)] mb-2">You're All Caught Up!</h2>
          <p className="text-[var(--text-secondary)] mb-8">No flashcards are due for review right now.</p>
          <Link href="/dashboard">
            <Button className="w-full">Back to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const progress = ((currentIndex) / dueCards.length) * 100;

  if (sessionComplete) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center h-[calc(100vh-120px)]">
        <Card className="max-w-md w-full text-center p-12">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-[var(--amber)]" />
          </div>
          <h2 className="text-3xl font-bold font-heading text-[var(--text-primary)] mb-2">Session Complete!</h2>
          <p className="text-[var(--text-secondary)] mb-8">You reviewed {dueCards.length} cards. Your retention is looking great.</p>
          <Link href="/dashboard">
            <Button className="w-full">Finish</Button>
          </Link>
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
            Due Reviews
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
          {currentIndex} / {dueCards.length}
        </span>
      </div>

      {/* Card Area */}
      <div className="flex-1 flex items-center justify-center">
        <FlashCard 
          key={dueCards[currentIndex].id}
          front={dueCards[currentIndex].front}
          back={dueCards[currentIndex].back}
          onResult={handleResult as any}
        />
      </div>
    </div>
  );
}
