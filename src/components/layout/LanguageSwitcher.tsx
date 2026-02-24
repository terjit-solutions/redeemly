"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, Language } from "@/stores/app-store";
import { cn } from "@/lib/utils";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "ar", label: "عربي", flag: "🇲🇷" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useAppStore();

  const current = languages.find((l) => l.code === language) || languages[2];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors text-foreground/60 hover:text-foreground border-foreground/[0.08] hover:border-foreground/[0.15]"
      >
        <span className="text-base">{current.flag}</span>
        <span className="hidden sm:inline text-[13px]">{current.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 rounded-xl overflow-hidden shadow-xl min-w-[150px] border border-foreground/[0.06]"
            style={{ backgroundColor: "var(--surface-elevated)" }}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                  language === lang.code
                    ? "text-copper bg-copper/5 font-medium"
                    : "text-foreground/70 hover:bg-foreground/[0.03]"
                )}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
