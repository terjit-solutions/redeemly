"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";

const copy = {
  cta: {
    en: "Explore Services",
    ar: "\u0627\u0633\u062a\u0643\u0634\u0641 \u0627\u0644\u062e\u062f\u0645\u0627\u062a",
    fr: "Explorer les services",
  },
} as const;

export function MobileStickyBar() {
  const [visible, setVisible] = useState(false);
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-40 md:hidden",
            "px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
            isDark
              ? "bg-[#131313]/95 border-t border-gold/10"
              : "bg-sand/95 border-t border-rich-black/[0.06]"
          )}
          style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          dir={rtl ? "rtl" : "ltr"}
        >
          <Link
            href="/catalog"
            className="btn-fill flex items-center justify-center gap-2 w-full rounded-full bg-copper px-6 py-3.5 text-sm font-semibold text-white active:scale-[0.98] transition-transform"
          >
            {copy.cta[language]}
            <ArrowRight size={16} className={rtl ? "rotate-180" : ""} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
