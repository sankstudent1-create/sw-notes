"use client";

import { Card } from "@/components/ui/Card";
import { Sparkles, FileText, Layers, BrainCircuit, Network } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

const AI_TOOLS = [
  { 
    id: "summarize",
    title: "One-Page Summaries", 
    desc: "Condense long chapters into a single, highly-focused revision sheet.",
    icon: FileText,
    color: "sage",
    comingSoon: false
  },
  { 
    id: "flashcards",
    title: "Auto-Flashcards", 
    desc: "Extract key facts, dates, and formulas into an Anki-style deck automatically.",
    icon: Layers,
    color: "amber",
    comingSoon: false
  },
  { 
    id: "quiz",
    title: "Exam Simulator", 
    desc: "Generate MCQs and short-answer questions tailored to your exam goals.",
    icon: BrainCircuit,
    color: "terracotta",
    comingSoon: false
  },
  { 
    id: "mindmap",
    title: "Concept Mind Maps", 
    desc: "Visualize relationships between complex topics with AI-drawn mind maps.",
    icon: Network,
    color: "lavender",
    comingSoon: true
  }
];

export default function AIToolsPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--amber)] to-[var(--terracotta)] text-white mb-6 shadow-lg shadow-[var(--amber)]/20">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold font-heading text-[var(--text-primary)] mb-4">
          Your Personal AI Tutor
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Select an AI study tool to transform your notes into active recall materials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {AI_TOOLS.map((tool) => (
          <Link href={`/ai-tools/${tool.id}`} key={tool.id} className={tool.comingSoon ? "pointer-events-none opacity-80" : ""}>
            <Card hoverable={!tool.comingSoon} className="h-full flex flex-col items-center text-center p-8 border border-transparent hover:border-[var(--accent)]/30 transition-colors">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--${tool.color})]/20 text-[var(--${tool.color})] mb-6`}>
                <tool.icon className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] mb-2 flex items-center justify-center">
                {tool.title}
                {tool.comingSoon && <Badge className="ml-2" variant="default">Soon</Badge>}
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {tool.desc}
              </p>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-16 bg-[var(--paper)] rounded-2xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-200 dark:border-gray-800">
        <div>
          <h3 className="text-xl font-bold font-heading text-[var(--text-primary)] mb-2">How it works</h3>
          <p className="text-[var(--text-secondary)] text-sm max-w-md">
            Our AI uses cognitive psychology principles. It doesn't just summarize; it identifies the core concepts you are most likely to forget and turns them into active learning exercises.
          </p>
        </div>
        <div className="shrink-0 flex -space-x-4">
          {/* Decorative overlapping circles */}
          <div className="w-12 h-12 rounded-full border-2 border-[var(--background)] bg-[var(--sage)] opacity-80"></div>
          <div className="w-12 h-12 rounded-full border-2 border-[var(--background)] bg-[var(--amber)] opacity-80"></div>
          <div className="w-12 h-12 rounded-full border-2 border-[var(--background)] bg-[var(--terracotta)] opacity-80"></div>
        </div>
      </div>
    </div>
  );
}
