"use client";

import { ThemeToggle } from "../ui/ThemeToggle";
import { Bell, Search } from "lucide-react";
import Link from "next/link";

export function TopBar() {
  return (
    <header className="h-16 border-b border-[var(--paper)] bg-[var(--background)] flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search notes, subjects, or flashcards..." 
            className="w-full bg-[var(--paper)] rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text-primary)] placeholder-gray-400"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4 ml-6">
        <button className="p-2 rounded-full hover:bg-[var(--paper)] transition-colors relative text-gray-400 hover:text-[var(--text-primary)]">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-[var(--danger)] rounded-full border-2 border-[var(--background)]"></span>
        </button>
        <ThemeToggle />
        <Link href="/profile" className="w-8 h-8 rounded-full bg-[var(--lavender)] flex items-center justify-center font-semibold text-sm text-[var(--text-primary)]">
          SW
        </Link>
      </div>
    </header>
  );
}
