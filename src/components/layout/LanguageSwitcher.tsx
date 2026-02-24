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
  const { language, setLanguage, theme } = useAppStore();
  const isDark = theme === "dark";

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
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
          isDark
            ? "text-sand/60 hover:text-sand border-sand/[0.1] hover:border-sand/[0.2]"
            : "text-rich-black/60 hover:text-rich-black border-rich-black/[0.08] hover:border-rich-black/[0.15]"
        )}
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
            className={cn(
              "absolute top-full mt-2 right-0 rounded-xl overflow-hidden shadow-xl min-w-[150px]",
              isDark
                ? "bg-[#1E1E1E] border border-gold/10"
                : "bg-sand-light border border-rich-black/[0.06]"
            )}
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
                    : isDark
                      ? "text-sand/70 hover:bg-sand/[0.03]"
                      : "text-rich-black/70 hover:bg-rich-black/[0.03]"
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
