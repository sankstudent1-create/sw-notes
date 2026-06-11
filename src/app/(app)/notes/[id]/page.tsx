"use client";

import { useState } from "react";
import { RichEditor } from "@/components/editor/RichEditor";
import { ArrowLeft, Save, Sparkles, MoreVertical, Share2, Download, Trash2, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

export default function NoteEditorPage() {
  const [content, setContent] = useState("<h1>First Law of Thermodynamics</h1><p>The first law of thermodynamics is a version of the law of conservation of energy, adapted for thermodynamic processes.</p><ul><li>In general, the conservation law states that the total energy of an isolated system is constant; energy can be transformed from one form to another, but can be neither created nor destroyed.</li></ul>");
  const [isSaving, setIsSaving] = useState(false);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      {/* Top Header */}
      <div className="h-16 border-b border-[var(--paper)] bg-[var(--card)] px-4 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-4">
          <Link href="/notebooks/1" className="p-2 -ml-2 rounded-full text-gray-500 hover:text-[var(--text-primary)] hover:bg-[var(--paper)] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-lg text-[var(--text-primary)]">Thermodynamics / First Law</h1>
              <Badge variant="sage">Physics</Badge>
            </div>
            <div className="flex items-center text-xs text-gray-400 mt-0.5">
              <Clock className="w-3 h-3 mr-1" />
              {isSaving ? "Saving..." : "Saved just now"}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            className="text-[var(--amber)] hover:text-orange-600 dark:hover:text-orange-400 bg-orange-50 dark:bg-orange-900/20"
            onClick={() => setIsAIPanelOpen(true)}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Study Tools
          </Button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex"><Share2 className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Editor Workspace */}
      <div className="flex-1 overflow-hidden p-4 md:p-8 max-w-5xl mx-auto w-full">
        <RichEditor 
          content={content} 
          onChange={setContent} 
        />
      </div>

      {/* AI Panel Modal */}
      <Modal isOpen={isAIPanelOpen} onClose={() => setIsAIPanelOpen(false)} title="AI Study Assistant">
        <div className="space-y-4">
          <p className="text-[var(--text-secondary)] text-sm mb-4">
            What would you like to do with this note?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Summarize", desc: "Get a one-page quick revision sheet", color: "sage" },
              { title: "Generate Flashcards", desc: "Create spaced repetition cards", color: "amber" },
              { title: "Create Quiz", desc: "Test your knowledge with an MCQ", color: "terracotta" },
              { title: "Mind Map", desc: "Visualize concepts and relations", color: "lavender" },
            ].map((tool, i) => (
              <button 
                key={i} 
                className="text-left p-4 rounded-[var(--radius-card)] border border-[var(--paper)] hover:border-[var(--accent)] hover:shadow-[var(--shadow-soft)] transition-all bg-[var(--background)] group"
              >
                <h3 className={`font-semibold text-[var(--${tool.color})] flex items-center`}>
                  <Sparkles className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100" />
                  {tool.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{tool.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
