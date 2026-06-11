"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PenTool, BrainCircuit, Layers, CheckCircle2, ChevronRight, BookOpen, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] selection:bg-[var(--accent)] selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--paper)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white">
              <PenTool className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-heading text-[var(--text-primary)]">SW Notes</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[var(--text-secondary)]">
            <a href="#features" className="hover:text-[var(--text-primary)] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[var(--text-primary)] transition-colors">How it Works</a>
            <a href="#ai" className="hover:text-[var(--text-primary)] transition-colors">AI Study</a>
            <a href="#revision" className="hover:text-[var(--text-primary)] transition-colors">Revision</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Log in
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div 
          className="flex-1 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--lavender)]/50 text-[var(--text-primary)] text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-[var(--accent)]"></span>
            <span>The future of notebook-based learning</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-heading text-[var(--text-primary)] leading-tight mb-6">
            Your Notebook. <br/>
            <span className="text-[var(--accent)]">Smarter.</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8 font-body max-w-lg leading-relaxed">
            The warmth of a physical notebook combined with the intelligence of an AI-powered study assistant. Designed for focus, memory retention, and long-term learning.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                Start Writing
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8">
              Install App
            </Button>
          </div>
        </motion.div>

        <motion.div 
          className="flex-1 w-full max-w-lg relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Animated Notebook Mockup */}
          <div className="relative w-full aspect-[3/4] bg-[var(--paper)] rounded-r-3xl rounded-l-md shadow-2xl overflow-hidden border-l-8 border-[var(--terracotta)]">
            <div className="absolute top-0 bottom-0 left-12 w-[2px] bg-[var(--terracotta)]/30"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:100%_32px]"></div>
            <div className="relative z-10 p-12 pt-16 h-full flex flex-col">
              <h2 className="font-title text-4xl text-[var(--text-primary)] mb-6">Physics Chapter 4: Thermodynamics</h2>
              <div className="space-y-8 flex-1">
                <div className="space-y-2">
                  <div className="h-4 bg-[var(--text-primary)]/20 rounded w-3/4"></div>
                  <div className="h-4 bg-[var(--text-primary)]/20 rounded w-full"></div>
                  <div className="h-4 bg-[var(--text-primary)]/20 rounded w-5/6"></div>
                </div>
                <div className="p-4 bg-[var(--accent)]/10 rounded-xl border border-[var(--accent)]/20">
                  <p className="font-title text-xl text-[var(--accent)]">✨ AI Summary generated!</p>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-[var(--text-primary)]/20 rounded w-full"></div>
                  <div className="h-4 bg-[var(--text-primary)]/20 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-[var(--text-primary)] mb-4">Built for cognitive retention</h2>
            <p className="text-lg text-[var(--text-secondary)]">Every feature is designed around student behavior and psychology.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Familiar Notebook Feel", desc: "Ruled lines, margins, and a warm paper texture that reduces eye strain." },
              { icon: BrainCircuit, title: "AI Study Tools", desc: "Instantly convert notes into flashcards, quizzes, and one-page summaries." },
              { icon: Layers, title: "Spaced Repetition", desc: "Built-in revision queues that remind you what to study just before you forget it." },
              { icon: Clock, title: "Focus Mode", desc: "Distraction-free writing with built-in Pomodoro timers and ambient sounds." },
              { icon: CheckCircle2, title: "Offline First", desc: "Keep studying even on low-end devices or poor network conditions." },
              { icon: BarChart3, title: "Retention Analytics", desc: "Track your memory strength, study streaks, and daily progress." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-[var(--background)] p-8 rounded-[var(--radius-card)] shadow-[var(--shadow-soft)]"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-6">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">{f.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--paper)] bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <PenTool className="w-6 h-6 text-[var(--accent)]" />
            <span className="text-xl font-bold font-heading text-[var(--text-primary)]">SW Notes</span>
          </div>
          <p className="text-[var(--text-secondary)] mb-8">A product of SW Info Systems</p>
          <div className="flex justify-center space-x-6 text-sm font-medium text-[var(--text-secondary)]">
            <Link href="/privacy" className="hover:text-[var(--text-primary)]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--text-primary)]">Terms of Service</Link>
            <Link href="/contact" className="hover:text-[var(--text-primary)]">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
