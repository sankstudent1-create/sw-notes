"use client";

import { Input } from "@/components/ui/Input";
import { Search as SearchIcon, Book, FileText, Layers, Tag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const MOCK_RESULTS = [
  { type: "Note", title: "Thermodynamics Laws", location: "Physics / Thermodynamics", icon: FileText },
  { type: "Subject", title: "Thermodynamics", location: "Physics", icon: Book },
  { type: "Flashcard", title: "What is Entropy?", location: "Thermodynamics Deck", icon: Layers },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl font-bold font-heading text-[var(--text-primary)]">Universal Search</h1>
        <p className="text-[var(--text-secondary)]">Search across your notebooks, flashcards, tags, and AI summaries.</p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <Input 
          icon={<SearchIcon className="w-5 h-5" />} 
          placeholder="Search for 'entropy', 'newton', or #physics..." 
          className="text-lg py-4 pl-12 rounded-2xl shadow-[var(--shadow-soft)]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        
        <div className="flex justify-center space-x-2 mt-4">
          <span className="px-3 py-1 rounded-full bg-[var(--paper)] text-xs text-[var(--text-secondary)] border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">All</span>
          <span className="px-3 py-1 rounded-full bg-[var(--paper)] text-xs text-[var(--text-secondary)] border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Notes</span>
          <span className="px-3 py-1 rounded-full bg-[var(--paper)] text-xs text-[var(--text-secondary)] border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Flashcards</span>
          <span className="px-3 py-1 rounded-full bg-[var(--paper)] text-xs text-[var(--text-secondary)] border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Tags</span>
        </div>
      </div>

      {query && (
        <div className="max-w-2xl mx-auto mt-8">
          <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">Results for "{query}"</h2>
          <div className="space-y-3">
            {MOCK_RESULTS.map((res, i) => (
              <Link key={i} href="#" className="flex items-center p-4 rounded-[var(--radius-card)] bg-[var(--card)] hover:bg-[var(--paper)] border border-transparent hover:border-[var(--accent)]/30 transition-colors group shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mr-4">
                  <res.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{res.title}</h3>
                  <div className="flex items-center text-xs text-[var(--text-secondary)] mt-0.5">
                    <span className="font-medium mr-2">{res.type}</span> • <span className="ml-2">{res.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
