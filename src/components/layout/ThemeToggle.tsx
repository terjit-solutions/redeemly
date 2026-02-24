"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useAppStore } from "@/stores/app-store";

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore();
  const isDark = theme === "dark";

  const handleToggle = () => {
    document.documentElement.classList.add("transitioning");
    toggleTheme();
    setTimeout(() => {
      document.documentElement.classList.remove("transitioning");
    }, 400);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative h-9 w-9 rounded-full flex items-center justify-center transition-colors text-foreground/60 hover:text-foreground hover:bg-foreground/[0.05]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {isDark ? <Moon size={17} /> : <Sun size={17} />}
      </motion.div>
    </button>
  );
}
