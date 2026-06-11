"use client";

import { useState } from "react";
import { ArrowLeft, Bookmark, MoreVertical, Search, Plus, List } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const MOCK_NOTES = [
  { id: 1, title: "Zeroth Law & Temperature", date: "Oct 12, 2026", preview: "If body A is in thermal equilibrium with body B..." },
  { id: 2, title: "First Law: Energy Conservation", date: "Oct 14, 2026", preview: "The internal energy of an isolated system is constant..." },
  { id: 3, title: "Entropy & Second Law", date: "Oct 18, 2026", preview: "Heat cannot spontaneously flow from a colder location to a hotter location." },
];

export default function NotebookPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full relative">
      {/* Chapter Sidebar */}
      <div className={`w-64 border-r border-[var(--paper)] bg-[var(--background)] flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'ml-0' : '-ml-64'} md:ml-0 md:block absolute md:relative z-20 h-full shadow-lg md:shadow-none`}>
        <div className="p-4 border-b border-[var(--paper)] flex items-center justify-between">
          <h3 className="font-semibold text-[var(--text-primary)]">Chapters</h3>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="md:hidden">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {MOCK_NOTES.map((note) => (
            <Link key={note.id} href={`/notes/${note.id}`} className="block p-4 border-b border-[var(--paper)] hover:bg-[var(--paper)] transition-colors">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-sm text-[var(--text-primary)] line-clamp-2">{note.title}</h4>
                <Bookmark className="w-3 h-3 text-gray-400 shrink-0 mt-1" />
              </div>
              <p className="text-xs text-gray-500 mt-1">{note.date}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-[var(--paper)] relative overflow-hidden">
        {/* Notebook Top Bar */}
        <div className="h-14 border-b border-[var(--terracotta)]/30 bg-[var(--paper)]/80 backdrop-blur flex items-center justify-between px-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 mr-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <List className="w-5 h-5" />
            </button>
            <Link href="/subjects/1" className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h2 className="ml-2 font-title text-2xl font-bold text-[var(--text-primary)]">Thermodynamics</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm"><Search className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
            <Link href="/notes/new">
              <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Add Note</Button>
            </Link>
          </div>
        </div>

        {/* Notebook Paper Area */}
        <div className="flex-1 overflow-y-auto notebook-paper p-8 pl-16">
          <div className="notebook-margin hidden sm:block"></div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-12">
              <h1 className="font-title text-5xl text-[var(--text-primary)]">Thermodynamics</h1>
              <p className="font-heading text-[var(--text-secondary)] mt-2">Class 11 Physics</p>
            </div>

            {MOCK_NOTES.map(note => (
              <Link key={note.id} href={`/notes/${note.id}`} className="block">
                <div className="group border-b border-transparent hover:border-[var(--terracotta)]/30 transition-colors pb-4 cursor-pointer">
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="text-xl font-bold font-heading text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {note.title}
                    </h3>
                    <span className="text-sm font-heading text-gray-500">{note.date}</span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm font-body line-clamp-2">
                    {note.preview}
                  </p>
                </div>
              </Link>
            ))}
            
            <div className="py-8 flex justify-center">
              <Link href="/notes/new">
                <Button variant="ghost" className="text-[var(--accent)] font-heading text-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Start writing a new note...
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
