"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  Library, 
  BrainCircuit, 
  Layers, 
  Settings, 
  User,
  Search,
  PenTool
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: BookOpen },
  { name: "Subjects", href: "/subjects", icon: Library },
  { name: "Revision Hub", href: "/revision", icon: Layers },
  { name: "Flashcards", href: "/flashcards", icon: Layers },
];

const bottomNavItems = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen border-r border-[var(--paper)] bg-[var(--background)]">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white">
          <PenTool className="w-6 h-6" />
        </div>
        <span className="text-2xl font-bold font-heading tracking-wide text-[var(--text-primary)]">
          SW Notes
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-[var(--radius-button)] text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-[var(--paper)] text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--paper)] hover:text-[var(--text-primary)]"
                )}
              >
                <item.icon className={clsx("w-5 h-5", isActive ? "text-[var(--accent)]" : "text-gray-400")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[var(--paper)]">
        <nav className="space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-[var(--radius-button)] text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-[var(--paper)] text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--paper)] hover:text-[var(--text-primary)]"
                )}
              >
                <item.icon className="w-5 h-5 text-gray-400" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
