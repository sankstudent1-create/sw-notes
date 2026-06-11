"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Play, Pause, RotateCcw, Volume2, BookOpen, BrainCircuit } from "lucide-react";
import { RichEditor } from "@/components/editor/RichEditor";

export default function FocusModePage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [content, setContent] = useState("<h1>Deep Work Session</h1><p>Start writing without distractions...</p>");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen bg-[var(--background)]">
      {/* Minimal Top Bar */}
      <div className="h-16 flex items-center justify-between px-6 shrink-0 border-b border-[var(--paper)]">
        <div className="flex items-center space-x-2 text-[var(--accent)] font-semibold">
          <BrainCircuit className="w-5 h-5" />
          <span>Focus Mode</span>
        </div>
        
        {/* Timer Controls */}
        <div className="flex items-center space-x-4 bg-[var(--card)] px-4 py-1.5 rounded-full shadow-sm border border-[var(--paper)]">
          <span className="font-heading font-bold text-xl tabular-nums text-[var(--text-primary)]">
            {formatTime(timeLeft)}
          </span>
          <div className="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex items-center space-x-1">
            <button onClick={toggleTimer} className="p-1.5 rounded-full hover:bg-[var(--paper)] text-[var(--text-primary)] transition-colors">
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button onClick={resetTimer} className="p-1.5 rounded-full hover:bg-[var(--paper)] text-gray-500 transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Volume2 className="w-4 h-4 mr-2" /> Lo-fi Study
          </Button>
          <Button variant="danger" size="sm" onClick={() => window.history.back()}>
            Exit
          </Button>
        </div>
      </div>

      {/* Editor Space (No sidebar, no extra UI) */}
      <div className="flex-1 overflow-hidden p-0 sm:p-6 md:p-12 max-w-4xl mx-auto w-full transition-all">
        <RichEditor 
          content={content} 
          onChange={setContent} 
        />
      </div>
    </div>
  );
}
