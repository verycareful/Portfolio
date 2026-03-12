"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:border-[var(--accent-blue)]"
      style={{
        borderColor: "var(--card-border)",
        background: "var(--card-bg)",
      }}
    >
      {theme === "dark" ? (
        <Sun size={16} className="text-[var(--accent-orange)]" />
      ) : (
        <Moon size={16} className="text-[var(--accent-blue)]" />
      )}
    </button>
  );
}
