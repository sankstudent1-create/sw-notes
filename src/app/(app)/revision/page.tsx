"use client";

import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { Calendar as CalendarIcon, CheckCircle2, ChevronRight, Flame, Trophy, Layers } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function RevisionPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [dueCards, setDueCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const now = new Date().toISOString();
    const { data: cardsData } = await supabase
      .from('flashcards')
      .select('*')
      .lte('next_review_date', now);

    setDueCards(cardsData || []);
    setIsLoading(false);
  }, [router, supabase]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  
  // Create a 7-day consistency mock array, representing days
  const today = new Date().getDay();
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  if (isLoading) return <div className="p-8">Loading revision hub...</div>;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-[var(--text-primary)]">Revision Hub</h1>
          <p className="text-[var(--text-secondary)] mt-1">Consistency is the key to long-term memory.</p>
        </div>
        <div className="flex items-center space-x-2 text-orange-600 bg-orange-100 px-4 py-2 rounded-full font-medium">
          <Flame className="w-5 h-5 fill-orange-500" />
          <span>12 Day Streak</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Retention Score */}
        <Card className="p-6 md:col-span-1 flex flex-col justify-center items-center text-center">
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--paper)" strokeWidth="10" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--success)" strokeWidth="10" strokeDasharray="283" strokeDashoffset={283 - (283 * 87) / 100} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold font-heading text-[var(--text-primary)]">87%</span>
              <span className="text-xs text-[var(--text-secondary)]">Retention</span>
            </div>
          </div>
          <h3 className="font-bold text-[var(--text-primary)]">Excellent Memory!</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-2">You are recalling information very well. Keep reviewing daily.</p>
        </Card>

        {/* Consistency Calendar */}
        <Card className="p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold font-heading text-lg text-[var(--text-primary)] flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-[var(--accent)]" />
              Consistency
            </h3>
            <span className="text-sm text-[var(--text-secondary)]">This Week</span>
          </div>

          <div className="flex justify-between items-end h-32 mb-4">
            {[60, 80, 40, 100, 70, 90, 0].map((height, i) => {
              const isToday = i === today;
              const isPast = i < today;
              return (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className="w-full px-1 sm:px-2 flex justify-center">
                    {/* Bar */}
                    <div 
                      className={`w-full max-w-[40px] rounded-t-md transition-all duration-500 ${isPast ? 'bg-[var(--accent)]' : (isToday ? 'bg-[var(--terracotta)]' : 'bg-[var(--paper)]')}`}
                      style={{ height: isPast || isToday ? `${height}%` : '10%' }}
                    ></div>
                  </div>
                  <span className={`text-xs mt-2 font-medium ${isToday ? 'text-[var(--terracotta)] font-bold' : 'text-[var(--text-secondary)]'}`}>
                    {weekDays[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Tasks */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)]">Today's Queue</h2>
          
          <div className="space-y-3">
            <Card hoverable className="p-4 border-l-4 border-l-[var(--terracotta)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded bg-[var(--terracotta)]/20 flex items-center justify-center text-[var(--terracotta)] mr-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)]">Daily Flashcards</h4>
                    <p className="text-sm text-[var(--text-secondary)]">{dueCards.length} cards due</p>
                  </div>
                </div>
                <Link href="/flashcards">
                  <button className="text-[var(--accent)] font-medium text-sm hover:underline">Start</button>
                </Link>
              </div>
            </Card>

            <Card hoverable className="p-4 border-l-4 border-l-gray-200 dark:border-l-gray-700 opacity-60">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 mr-4">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)] line-through">Physics Quiz</h4>
                    <p className="text-sm text-[var(--text-secondary)]">Completed</p>
                  </div>
                </div>
                <span className="text-green-600 dark:text-green-500 font-medium text-sm">100%</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Weak Areas (Simulated) */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)]">Focus Areas</h2>
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-[var(--paper)] flex justify-between items-center bg-[var(--background)]">
              <div>
                <h4 className="font-bold text-[var(--text-primary)] text-sm">Thermodynamics</h4>
                <p className="text-xs text-[var(--text-secondary)]">Lowest retention (62%)</p>
              </div>
              <Badge variant="danger">Needs Work</Badge>
            </div>
            <div className="p-4 flex items-center justify-between bg-[var(--card)] hover:bg-[var(--paper)] transition-colors cursor-pointer">
              <span className="text-sm font-medium text-[var(--text-primary)]">Review First Law</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="p-4 flex items-center justify-between bg-[var(--card)] hover:bg-[var(--paper)] transition-colors cursor-pointer border-t border-[var(--paper)]">
              <span className="text-sm font-medium text-[var(--text-primary)]">Practice Entropy Problems</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
