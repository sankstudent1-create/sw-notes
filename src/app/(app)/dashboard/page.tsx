"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Clock, Flame, BookOpen, ChevronRight, Layers, BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Greeting Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-[var(--text-primary)]">
            Good afternoon, Aditi!
          </h1>
          <p className="text-[var(--text-secondary)] mt-1 font-medium">
            You have 3 revision tasks and 1 quiz due today.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-[var(--paper)] py-2 px-4 rounded-full border border-orange-200 dark:border-orange-900/30">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          <span className="font-semibold text-orange-600 dark:text-orange-400">12 Day Streak!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Continue Studying */}
        <Card className="md:col-span-2 flex flex-col justify-between border-l-4 border-l-[var(--accent)] hoverable">
          <div>
            <div className="flex justify-between items-start mb-4">
              <Badge variant="sage">Physics</Badge>
              <span className="text-xs text-gray-400 flex items-center"><Clock className="w-3 h-3 mr-1" /> 2 hours ago</span>
            </div>
            <h2 className="text-xl font-bold font-title text-[var(--text-primary)] mb-2">Thermodynamics: Laws & Entropy</h2>
            <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
              The second law of thermodynamics states that the total entropy of an isolated system can never decrease over time...
            </p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--paper)]">
            <div className="flex items-center space-x-2 w-1/2">
              <Progress value={65} color="accent" size="sm" />
              <span className="text-xs text-gray-500 font-medium">65%</span>
            </div>
            <Link href="/notes/1" className="flex items-center text-sm font-semibold text-[var(--accent)] hover:underline">
              Continue <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </Card>

        {/* Revision Due */}
        <Card className="flex flex-col border-t-4 border-t-[var(--danger)]">
          <div className="flex items-center space-x-2 mb-4">
            <Layers className="w-5 h-5 text-[var(--danger)]" />
            <h3 className="font-semibold text-[var(--text-primary)]">Due for Revision</h3>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center bg-[var(--paper)] p-3 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">Cell Biology Flashcards</p>
                <p className="text-xs text-gray-500 mt-0.5">24 cards • High Priority</p>
              </div>
              <Badge variant="danger">Due</Badge>
            </div>
            <div className="flex justify-between items-center bg-[var(--paper)] p-3 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">Calculus Integration Quiz</p>
                <p className="text-xs text-gray-500 mt-0.5">15 questions</p>
              </div>
              <Badge variant="warning">Today</Badge>
            </div>
          </div>
          <Link href="/revision" className="w-full text-center mt-4 text-sm font-medium text-gray-500 hover:text-[var(--text-primary)] transition-colors">
            View all tasks
          </Link>
        </Card>
      </div>

      {/* Subjects Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)]">Your Subjects</h2>
          <Link href="/subjects" className="text-sm font-medium text-[var(--accent)] hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Physics", icon: BookOpen, color: "sage", count: 12 },
            { name: "Chemistry", icon: BookOpen, color: "terracotta", count: 8 },
            { name: "Mathematics", icon: BookOpen, color: "amber", count: 15 },
            { name: "Biology", icon: BookOpen, color: "lavender", count: 6 },
          ].map((subject, i) => (
            <Link key={i} href={`/subjects/${i}`}>
              <Card hoverable className="p-5 flex flex-col items-center text-center space-y-3 h-full">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-[var(--${subject.color})]/20 text-[var(--${subject.color})]`}>
                  <subject.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{subject.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{subject.count} Notebooks</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Weekly Progress */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)]">Weekly Activity</h2>
          <span className="text-sm font-medium text-gray-500">12 hrs 30 mins total</span>
        </div>
        <div className="h-32 flex items-end justify-between gap-2">
          {/* Simple mock bar chart */}
          {[40, 70, 45, 90, 60, 20, 0].map((height, i) => (
            <div key={i} className="w-full flex flex-col items-center gap-2 group">
              <div className="w-full relative bg-[var(--paper)] rounded-t-sm h-full max-h-24">
                <div 
                  className="absolute bottom-0 w-full bg-[var(--accent)] rounded-t-sm transition-all group-hover:bg-[#7a8e79]"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
