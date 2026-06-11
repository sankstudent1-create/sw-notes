"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Library, Search, Layers, BrainCircuit } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Home", href: "/dashboard", icon: BookOpen },
  { name: "Subjects", href: "/subjects", icon: Library },
  { name: "Search", href: "/search", icon: Search },
  { name: "Revision", href: "/revision", icon: Layers },
  { name: "AI", href: "/ai-tools", icon: BrainCircuit },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 w-full border-t border-[var(--paper)] bg-[var(--background)] pb-safe pt-2 px-4 z-50">
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center p-2 min-w-[4rem]"
            >
              <item.icon 
                className={clsx(
                  "w-6 h-6 mb-1 transition-colors duration-200", 
                  isActive ? "text-[var(--accent)]" : "text-gray-400"
                )} 
              />
              <span 
                className={clsx(
                  "text-[10px] font-medium transition-colors duration-200",
                  isActive ? "text-[var(--accent)]" : "text-gray-400"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
