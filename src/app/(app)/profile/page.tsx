"use client";

import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Trophy, Clock, Target, Edit3, Award } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <Card className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left relative overflow-hidden border-t-8 border-t-[var(--lavender)]">
        <div className="absolute top-0 right-0 p-4">
          <Button variant="ghost" size="sm">
            <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
        </div>
        
        <Avatar fallback="SW" size="xl" className="w-24 h-24 text-2xl bg-[var(--lavender)] text-[var(--text-primary)]" />
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold font-heading text-[var(--text-primary)]">Aditi Sharma</h1>
          <p className="text-[var(--text-secondary)] mt-1">Class 11 Science Student • NEET Aspirant</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
            <Badge variant="sage">Physics Focus</Badge>
            <Badge variant="amber">Night Owl</Badge>
            <Badge variant="terracotta">Consistency King</Badge>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <Trophy className="w-8 h-8 text-[var(--amber)] mb-3" />
          <p className="text-3xl font-bold text-[var(--text-primary)] font-heading">Level 12</p>
          <p className="text-sm text-[var(--text-secondary)]">Scholar</p>
        </Card>
        
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <Clock className="w-8 h-8 text-[var(--sage)] mb-3" />
          <p className="text-3xl font-bold text-[var(--text-primary)] font-heading">142h</p>
          <p className="text-sm text-[var(--text-secondary)]">Total Study Time</p>
        </Card>
        
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <Target className="w-8 h-8 text-[var(--danger)] mb-3" />
          <p className="text-3xl font-bold text-[var(--text-primary)] font-heading">85%</p>
          <p className="text-sm text-[var(--text-secondary)]">Goal Completion</p>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] mb-6 flex items-center">
          <Award className="w-5 h-5 mr-2 text-[var(--lavender)]" />
          Achievements
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: "First Note", icon: "📝", unlocked: true },
            { title: "7 Day Streak", icon: "🔥", unlocked: true },
            { title: "Quiz Master", icon: "🧠", unlocked: true },
            { title: "Night Owl", icon: "🦉", unlocked: true },
            { title: "30 Day Streak", icon: "🔥", unlocked: false },
            { title: "Perfect Score", icon: "💯", unlocked: false },
          ].map((badge, i) => (
            <div key={i} className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all ${badge.unlocked ? 'bg-[var(--background)] border-[var(--paper)]' : 'opacity-40 grayscale border-dashed border-gray-300 dark:border-gray-700'}`}>
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">{badge.title}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
