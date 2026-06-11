"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Layers, BrainCircuit, Activity, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function RevisionHubPage() {
  // Simple mock heatmap generation
  const days = Array.from({ length: 35 }, (_, i) => {
    const val = Math.random();
    return val > 0.8 ? "bg-[var(--accent)]" : val > 0.5 ? "bg-[var(--accent)]/60" : val > 0.2 ? "bg-[var(--accent)]/30" : "bg-[var(--paper)]";
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-[var(--text-primary)] flex items-center">
            <Activity className="w-8 h-8 mr-3 text-[var(--danger)]" />
            Revision Hub
          </h1>
          <p className="text-[var(--text-secondary)] mt-2 max-w-xl">
            Your spaced repetition dashboard. We use cognitive science to schedule your reviews just before you're likely to forget them.
          </p>
        </div>
        
        {/* Retention Score Widget */}
        <div className="flex items-center space-x-6 bg-[var(--card)] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 shrink-0">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Overall Retention</p>
            <div className="text-3xl font-bold font-heading text-[var(--text-primary)]">
              87<span className="text-xl text-gray-400">%</span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-[var(--paper)] relative flex items-center justify-center">
            {/* SVG circle progress would go here, using simple border for now */}
            <div className="absolute inset-0 rounded-full border-4 border-[var(--success)]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)" }}></div>
            <span className="text-lg font-bold text-[var(--success)]">B+</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Queue */}
        <Card className="md:col-span-2 border-t-4 border-t-[var(--danger)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-heading text-[var(--text-primary)]">Today's Queue</h2>
            <Badge variant="danger">High Priority</Badge>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "Thermodynamics Flashcards", type: "Flashcards", items: "24 cards", icon: Layers, color: "accent", href: "/flashcards" },
              { title: "Calculus Integration", type: "Quiz", items: "15 questions", icon: BrainCircuit, color: "terracotta", href: "/quiz" },
              { title: "Organic Chem Reactions", type: "Short Notes", items: "3 pages", icon: Calendar, color: "amber", href: "/notes/1" }
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-[var(--background)] hover:border-[var(--danger)]/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-[var(--${task.color})]/10 text-[var(--${task.color})]`}>
                    <task.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{task.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                      <span className="font-medium bg-[var(--paper)] px-2 py-0.5 rounded text-[var(--text-secondary)]">{task.type}</span>
                      <span>•</span>
                      <span>{task.items}</span>
                    </div>
                  </div>
                </div>
                <Link href={task.href}>
                  <Button size="sm" variant="secondary">Start <ChevronRight className="w-4 h-4 ml-1" /></Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>

        {/* Heatmap / Calendar */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold font-heading text-[var(--text-primary)]">Study Consistency</h2>
          </div>
          
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} className="text-[10px] font-medium text-center text-gray-400">{d}</div>
            ))}
            {days.map((color, i) => (
              <div key={i} className={`w-full aspect-square rounded-sm ${color}`} title={`Day ${i+1}`} />
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-sm bg-[var(--paper)]"></div>
              <div className="w-3 h-3 rounded-sm bg-[var(--accent)]/30"></div>
              <div className="w-3 h-3 rounded-sm bg-[var(--accent)]/60"></div>
              <div className="w-3 h-3 rounded-sm bg-[var(--accent)]"></div>
            </div>
            <span>More</span>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--paper)]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[var(--text-secondary)]">Longest Streak</span>
              <span className="font-bold text-[var(--text-primary)]">21 Days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[var(--text-secondary)]">Current Streak</span>
              <span className="font-bold text-[var(--accent)]">12 Days</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
