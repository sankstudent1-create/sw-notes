"use client";

import { Card } from "@/components/ui/Card";
import { BookOpen, Layers, Target, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [subjects, setSubjects] = useState<any[]>([]);
  const [dueCards, setDueCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data: subjectsData } = await supabase
      .from('subjects')
      .select('*')
      .order('created_at', { ascending: false });
    
    setSubjects(subjectsData || []);

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

  if (isLoading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Greeting Section */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-[var(--text-primary)]">Welcome back, Student!</h1>
        <p className="text-[var(--text-secondary)] mt-1">You have a 12-day streak going. Keep it up!</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverable className="flex items-center p-4">
          <div className="w-12 h-12 rounded-full bg-[var(--sage)]/20 text-[var(--sage)] flex items-center justify-center mr-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Subjects</p>
            <p className="text-2xl font-bold font-heading text-[var(--text-primary)]">{subjects.length}</p>
          </div>
        </Card>
        
        <Card hoverable className="flex items-center p-4">
          <div className="w-12 h-12 rounded-full bg-[var(--terracotta)]/20 text-[var(--terracotta)] flex items-center justify-center mr-4">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Flashcards Due</p>
            <p className="text-2xl font-bold font-heading text-[var(--text-primary)]">{dueCards.length}</p>
          </div>
        </Card>

        <Card hoverable className="flex items-center p-4">
          <div className="w-12 h-12 rounded-full bg-[var(--amber)]/20 text-[var(--amber)] flex items-center justify-center mr-4">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Quizzes Taken</p>
            <p className="text-2xl font-bold font-heading text-[var(--text-primary)]">0</p>
          </div>
        </Card>

        <Card hoverable className="flex items-center p-4">
          <div className="w-12 h-12 rounded-full bg-[var(--lavender)]/20 text-[var(--lavender)] flex items-center justify-center mr-4">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Hours Studied</p>
            <p className="text-2xl font-bold font-heading text-[var(--text-primary)]">24.5</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-[var(--text-primary)]">Recent Subjects</h2>
            <Link href="/subjects" className="text-sm font-medium text-[var(--accent)] hover:underline flex items-center">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.slice(0, 4).map((subject, i) => (
              <Link key={i} href={`/subjects/${subject.id}`}>
                <Card hoverable className="p-5 border-l-4" style={{ borderLeftColor: `var(--color-${subject.color})` }}>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">{subject.name}</h3>
                  <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                    <span>Notebooks</span>
                    <span>Updated today</span>
                  </div>
                </Card>
              </Link>
            ))}
            {subjects.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500">
                No subjects yet. Create one!
              </div>
            )}
          </div>
        </div>

        {/* Sidebar / Action Items */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)]">Up Next</h2>
          
          <Card className="p-5 border border-[var(--terracotta)]/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--terracotta)]/10 rounded-full -mr-8 -mt-8"></div>
            <h3 className="font-bold text-lg text-[var(--text-primary)] relative z-10 mb-2">Daily Revision</h3>
            <p className="text-sm text-[var(--text-secondary)] relative z-10 mb-4">
              You have {dueCards.length} flashcards due for review. Keeping up with reviews improves retention by 40%.
            </p>
            <Link href="/flashcards" className="inline-block w-full">
              <button className="w-full bg-[var(--terracotta)] hover:bg-orange-600 text-white font-medium py-2 rounded-[var(--radius-button)] transition-colors relative z-10">
                Start Review Session
              </button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
