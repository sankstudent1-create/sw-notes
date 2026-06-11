"use client";

import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { InstallPrompt } from "../pwa/InstallPrompt";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[var(--background)]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 bg-[var(--background)]">
          {children}
        </main>
        <BottomNav />
        <InstallPrompt />
      </div>
    </div>
  );
}
