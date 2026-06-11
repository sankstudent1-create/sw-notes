"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-[var(--paper)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-[var(--amber)]" />
      ) : (
        <Moon className="w-5 h-5 text-[var(--lavender)]" />
      )}
    </button>
  );
}
