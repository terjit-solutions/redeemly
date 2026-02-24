"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Shield } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";

const copy = {
  eyebrow: {
    en: "For Mauritanians, by Mauritanians",
    ar: "\u0645\u0646 \u0627\u0644\u0645\u0648\u0631\u064a\u062a\u0627\u0646\u064a\u064a\u0646\u060c \u0644\u0644\u0645\u0648\u0631\u064a\u062a\u0627\u0646\u064a\u064a\u0646",
    fr: "Par les Mauritaniens, pour les Mauritaniens",
  },
  headlineLine1: {
    en: "Your local money.",
    ar: "\u0623\u0645\u0648\u0627\u0644\u0643 \u0627\u0644\u0645\u062d\u0644\u064a\u0629.",
    fr: "Votre argent local.",
  },
  headlineLine2: {
    en: "Global subscriptions.",
    ar: "\u0627\u0634\u062a\u0631\u0627\u0643\u0627\u062a \u0639\u0627\u0644\u0645\u064a\u0629.",
    fr: "Abonnements mondiaux.",
  },
  subtitle: {
    en: "Use Bankily, Sedad, or any local e-wallet to pay for Spotify, Netflix, and 40+ digital services. No international card needed.",
    ar: "\u0627\u0633\u062a\u062e\u062f\u0645 \u0628\u0646\u0643\u0644\u064a \u0623\u0648 \u0633\u062f\u0627\u062f \u0623\u0648 \u0623\u064a \u0645\u062d\u0641\u0638\u0629 \u0645\u062d\u0644\u064a\u0629 \u0644\u0644\u062f\u0641\u0639 \u0645\u0642\u0627\u0628\u0644 \u0633\u0628\u0648\u062a\u064a\u0641\u0627\u064a \u0648\u0646\u062a\u0641\u0644\u0643\u0633 \u0648\u0623\u0643\u062b\u0631 \u0645\u0646 40 \u062e\u062f\u0645\u0629 \u0631\u0642\u0645\u064a\u0629. \u0644\u0627 \u062d\u0627\u062c\u0629 \u0644\u0628\u0637\u0627\u0642\u0629 \u062f\u0648\u0644\u064a\u0629.",
    fr: "Utilisez Bankily, Sedad ou tout e-wallet local pour payer Spotify, Netflix et plus de 40 services num\u00e9riques. Pas besoin de carte internationale.",
  },
  ctaPrimary: {
    en: "Explore Services",
    ar: "\u0627\u0633\u062a\u0643\u0634\u0641 \u0627\u0644\u062e\u062f\u0645\u0627\u062a",
    fr: "Explorer les services",
  },
  ctaSecondary: {
    en: "See how it works",
    ar: "\u0634\u0627\u0647\u062f \u0643\u064a\u0641 \u064a\u0639\u0645\u0644",
    fr: "Voir comment \u00e7a marche",
  },
} as const;

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Mockup order items for the phone screen */
const mockOrders = [
  { name: "Spotify Premium", price: "429 MRU", color: "#1DB954", status: "Delivered" },
  { name: "Netflix Standard", price: "604 MRU", color: "#E50914", status: "Delivered" },
  { name: "ChatGPT Plus", price: "780 MRU", color: "#10A37F", status: "Processing" },
];

export function HeroSection() {
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  const { scrollY } = useScroll();
  const phoneY = useTransform(scrollY, [0, 500], [0, -30]);

  return (
    <section
      className={cn(
        "grain relative overflow-hidden",
        "pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-20 md:pb-14",
        isDark ? "bg-[#131313]" : "bg-sand"
      )}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center">
          {/* ============ LEFT SIDE ============ */}
          <div className="w-full md:w-[55%] py-6 sm:py-12 md:py-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, ease: luxuryEase }}
              className="text-xs font-semibold uppercase tracking-widest text-copper"
            >
              {copy.eyebrow[language]}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ease: luxuryEase }}
              className="mt-4 font-[family-name:var(--font-playfair)] text-[2.5rem] sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight"
            >
              <span className={cn(isDark ? "text-sand" : "text-rich-black")}>
                {copy.headlineLine1[language]}
              </span>
              <br />
              <span className="text-copper">
                {copy.headlineLine2[language]}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: luxuryEase }}
              className={cn("mt-4 sm:mt-6 max-w-lg text-base sm:text-lg leading-relaxed", isDark ? "text-sand/60" : "text-rich-black/60")}
            >
              {copy.subtitle[language]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ease: luxuryEase }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
            >
              <Link
                href="/catalog"
                className={cn(
                  "btn-fill group inline-flex items-center justify-center gap-2 rounded-full bg-copper px-8 py-4 text-base font-semibold text-white w-full sm:w-auto",
                  "transition-all hover:shadow-lg hover:shadow-copper/20 active:scale-[0.98]"
                )}
              >
                {copy.ctaPrimary[language]}
                <ArrowRight
                  size={18}
                  className={cn(
                    "transition-transform group-hover:translate-x-1",
                    rtl && "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0"
                  )}
                />
              </Link>
              <Link
                href="#how-it-works"
                className={cn(
                  "text-base font-medium border-b pb-0.5",
                  "transition-colors hover:border-copper hover:text-copper",
                  isDark ? "text-sand border-sand/30" : "text-rich-black border-rich-black/30"
                )}
              >
                {copy.ctaSecondary[language]}
              </Link>
            </motion.div>
          </div>

          {/* ============ RIGHT SIDE — Realistic phone ============ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: luxuryEase }}
            style={{ y: phoneY }}
            className="hidden md:flex w-[45%] items-center justify-center py-8"
          >
            <div className="relative">
              {/* Side buttons — left: silent + volume */}
              <div className="absolute -left-[2px] top-[100px] w-[3px] h-[28px] rounded-l-sm bg-[#2A2A2A]" />
              <div className="absolute -left-[2px] top-[148px] w-[3px] h-[52px] rounded-l-sm bg-[#2A2A2A]" />
              <div className="absolute -left-[2px] top-[210px] w-[3px] h-[52px] rounded-l-sm bg-[#2A2A2A]" />
              {/* Side button — right: power */}
              <div className="absolute -right-[2px] top-[160px] w-[3px] h-[72px] rounded-r-sm bg-[#2A2A2A]" />

              {/* Phone body */}
              <div
                className="relative w-[272px] lg:w-[290px] rounded-[3rem] border-[6px] shadow-2xl overflow-hidden"
                style={{
                  borderColor: isDark ? "#2A2A2A" : "#1A1A1A",
                  boxShadow: isDark
                    ? "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)"
                    : "0 25px 60px rgba(26,26,26,0.25), 0 0 0 1px rgba(0,0,0,0.1)",
                }}
              >
                {/* Screen */}
                <div className={cn("relative", isDark ? "bg-[#0A0A0A]" : "bg-sand-light")}>

                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-[90px] h-[26px] bg-black rounded-full flex items-center justify-center">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#1A1A2E] border border-[#2A2A3A] ml-6" />
                  </div>

                  {/* Status bar */}
                  <div className={cn(
                    "flex items-center justify-between px-7 pt-4 pb-2 text-[11px] font-semibold",
                    isDark ? "text-sand/70" : "text-rich-black/70"
                  )}>
                    <span>11:28</span>
                    <div className="flex items-center gap-1">
                      {/* Signal bars */}
                      <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" className="opacity-70">
                        <rect x="0" y="8" width="3" height="3" rx="0.5" />
                        <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
                        <rect x="9" y="2" width="3" height="9" rx="0.5" />
                        <rect x="13.5" y="0" width="2.5" height="11" rx="0.5" opacity="0.3" />
                      </svg>
                      {/* WiFi */}
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="opacity-70">
                        <path d="M1 3.5C3.5 1 10.5 1 13 3.5" />
                        <path d="M3.5 6C5 4.5 9 4.5 10.5 6" />
                        <circle cx="7" cy="8.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                      {/* Battery */}
                      <svg width="22" height="11" viewBox="0 0 22 11" className="opacity-70">
                        <rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
                        <rect x="2" y="2" width="12" height="7" rx="1" fill="currentColor" />
                        <rect x="19" y="3" width="2.5" height="5" rx="1" fill="currentColor" opacity="0.4" />
                      </svg>
                    </div>
                  </div>

                  {/* App content */}
                  <div className="px-4 pt-6 pb-2">
                    {/* App header */}
                    <div className="px-1 pb-4">
                      <p className="font-[family-name:var(--font-playfair)] text-lg font-bold text-copper">
                        Redeemly
                      </p>
                      <p className={cn("text-[10px] mt-0.5", isDark ? "text-sand/40" : "text-rich-black/40")}>
                        Your recent orders
                      </p>
                    </div>

                    {/* Order list */}
                    <div className="space-y-2.5">
                      {mockOrders.map((order, i) => (
                        <motion.div
                          key={order.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.15, duration: 0.5, ease: luxuryEase }}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-2xl",
                            isDark ? "bg-[#1A1A1A]" : "bg-white"
                          )}
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: order.color }}
                          >
                            <span className="text-white text-xs font-bold">{order.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn("text-xs font-semibold truncate", isDark ? "text-sand" : "text-rich-black")}>
                              {order.name}
                            </p>
                            <p className={cn("text-[10px]", isDark ? "text-sand/40" : "text-rich-black/40")}>
                              {order.price}
                            </p>
                          </div>
                          {order.status === "Delivered" ? (
                            <div className="w-5 h-5 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
                              <Check size={11} className="text-copper" strokeWidth={3} />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gold/30 border-t-gold animate-spin flex-shrink-0" />
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Trust line */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.5 }}
                      className="flex items-center justify-center gap-1.5 pt-3 pb-1"
                    >
                      <Shield size={9} className="text-copper/50" />
                      <span className={cn("text-[8px] font-medium", isDark ? "text-sand/25" : "text-rich-black/25")}>
                        Verified &middot; Encrypted &middot; Instant
                      </span>
                    </motion.div>
                  </div>

                  {/* Home indicator */}
                  <div className="flex justify-center pb-2 pt-1">
                    <div className={cn("w-28 h-1 rounded-full", isDark ? "bg-sand/20" : "bg-rich-black/20")} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
