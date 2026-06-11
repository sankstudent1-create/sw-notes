"use client";

import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Trophy, Clock, Target, Edit3, Award, LogOut } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    subjects: 0,
    notebooks: 0,
    flashcards: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setUser(user);

    // Fetch actual counts
    const [{ count: subjectCount }, { count: notebookCount }, { count: flashcardCount }] = await Promise.all([
      supabase.from('subjects').select('*', { count: 'exact', head: true }),
      supabase.from('notebooks').select('*', { count: 'exact', head: true }),
      supabase.from('flashcards').select('*', { count: 'exact', head: true }),
    ]);

    setStats({
      subjects: subjectCount || 0,
      notebooks: notebookCount || 0,
      flashcards: flashcardCount || 0,
    });

    setIsLoading(false);
  }, [router, supabase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (isLoading) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <Card className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left relative overflow-hidden border-t-8 border-t-[var(--lavender)]">
        <div className="absolute top-0 right-0 p-4 flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
        
        <Avatar fallback={user?.email?.charAt(0).toUpperCase() || "U"} size="xl" className="w-24 h-24 text-4xl bg-[var(--lavender)] text-[var(--text-primary)]" />
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold font-heading text-[var(--text-primary)] truncate max-w-sm sm:max-w-md">
            {user?.email}
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">SW Notes User</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-[var(--text-secondary)]">
            <span>Joined: {new Date(user?.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col items-center justify-center p-6 text-center border-t-4 border-t-[var(--sage)]">
          <Trophy className="w-8 h-8 text-[var(--sage)] mb-3" />
          <p className="text-3xl font-bold text-[var(--text-primary)] font-heading">{stats.subjects}</p>
          <p className="text-sm text-[var(--text-secondary)]">Total Subjects</p>
        </Card>
        
        <Card className="flex flex-col items-center justify-center p-6 text-center border-t-4 border-t-[var(--terracotta)]">
          <Clock className="w-8 h-8 text-[var(--terracotta)] mb-3" />
          <p className="text-3xl font-bold text-[var(--text-primary)] font-heading">{stats.notebooks}</p>
          <p className="text-sm text-[var(--text-secondary)]">Total Notebooks</p>
        </Card>
        
        <Card className="flex flex-col items-center justify-center p-6 text-center border-t-4 border-t-[var(--amber)]">
          <Target className="w-8 h-8 text-[var(--amber)] mb-3" />
          <p className="text-3xl font-bold text-[var(--text-primary)] font-heading">{stats.flashcards}</p>
          <p className="text-sm text-[var(--text-secondary)]">Total Flashcards</p>
        </Card>
      </div>
    </div>
  );
}
