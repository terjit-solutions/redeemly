"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Copy — trilingual                                                  */
/* ------------------------------------------------------------------ */

const copy = {
  title: {
    en: "Transparent pricing",
    ar: "\u0623\u0633\u0639\u0627\u0631 \u0634\u0641\u0627\u0641\u0629",
    fr: "Tarifs transparents",
  },
  subtitle: {
    en: "What you see is what you pay. No hidden fees.",
    ar: "\u0645\u0627 \u062a\u0631\u0627\u0647 \u0647\u0648 \u0645\u0627 \u062a\u062f\u0641\u0639\u0647. \u0628\u062f\u0648\u0646 \u0631\u0633\u0648\u0645 \u062e\u0641\u064a\u0629.",
    fr: "Ce que vous voyez est ce que vous payez. Aucun frais cach\u00e9.",
  },
  footnote: {
    en: "Prices include all fees. Updated daily based on MRU exchange rate.",
    ar: "\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u062a\u0634\u0645\u0644 \u062c\u0645\u064a\u0639 \u0627\u0644\u0631\u0633\u0648\u0645. \u064a\u062a\u0645 \u0627\u0644\u062a\u062d\u062f\u064a\u062b \u064a\u0648\u0645\u064a\u0627\u064b \u0628\u0646\u0627\u0621\u064b \u0639\u0644\u0649 \u0633\u0639\u0631 \u0635\u0631\u0641 \u0627\u0644\u0623\u0648\u0642\u064a\u0629.",
    fr: "Les prix incluent tous les frais. Mis \u00e0 jour quotidiennement selon le taux de change MRU.",
  },
  exchangeRate: {
    en: "1 USD \u2248 39 MRU",
    ar: "1 \u062f\u0648\u0644\u0627\u0631 \u2248 39 \u0623\u0648\u0642\u064a\u0629",
    fr: "1 USD \u2248 39 MRU",
  },
  cta: {
    en: "See full catalog",
    ar: "\u0639\u0631\u0636 \u0627\u0644\u0643\u062a\u0627\u0644\u0648\u062c \u0643\u0627\u0645\u0644\u0627\u064b",
    fr: "Voir le catalogue complet",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Pricing data                                                       */
/* ------------------------------------------------------------------ */

interface PricingRow {
  emoji: string;
  service: string;
  plan: string;
  price: string;
  recurring: boolean;
}

const pricingRows: PricingRow[] = [
  { emoji: "\uD83C\uDFB5", service: "Spotify Premium", plan: "Individual", price: "429 MRU", recurring: true },
  { emoji: "\uD83C\uDFAC", service: "Netflix", plan: "Standard", price: "604 MRU", recurring: true },
  { emoji: "\uD83E\uDD16", service: "ChatGPT Plus", plan: "Monthly", price: "780 MRU", recurring: true },
  { emoji: "\uD83C\uDF4E", service: "Apple Gift Card", plan: "$25 Card", price: "975 MRU", recurring: false },
  { emoji: "\uD83C\uDFAE", service: "Steam Wallet", plan: "$20 Card", price: "780 MRU", recurring: false },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PricingPreview() {
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  return (
    <section
      className={cn("relative py-14 sm:py-20 md:py-28", isDark ? "bg-[#131313]" : "bg-sand")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* -------- Header -------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className={cn("font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl text-center", isDark ? "text-sand" : "text-rich-black")}>
            {copy.title[language]}
          </h2>
          <p className={cn("text-center mt-3 sm:mt-4 text-base sm:text-lg max-w-xl mx-auto", isDark ? "text-sand/50" : "text-rich-black/50")}>
            {copy.subtitle[language]}
          </p>
        </motion.div>

        {/* -------- Pricing list -------- */}
        <div className="max-w-2xl mx-auto">
          {pricingRows.map((row, i) => (
            <motion.div
              key={row.service}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 * i }}
              className={cn(
                "flex items-center justify-between py-4",
                i === 0 && (isDark ? "border-t border-gold/[0.08]" : "border-t border-rich-black/[0.06]"),
                i < pricingRows.length - 1 && (isDark ? "border-b border-gold/[0.08]" : "border-b border-rich-black/[0.06]")
              )}
            >
              {/* Left: emoji + service + plan */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0" role="img" aria-label={row.service}>
                  {row.emoji}
                </span>
                <div className="flex items-baseline gap-1 sm:gap-2 min-w-0">
                  <span className={cn("font-medium truncate", isDark ? "text-sand" : "text-rich-black")}>
                    {row.service}
                  </span>
                  <span className={cn("text-sm whitespace-nowrap", isDark ? "text-sand/40" : "text-rich-black/40")}>
                    {row.plan}
                  </span>
                </div>
              </div>

              {/* Right: price */}
              <div className="flex items-baseline gap-1 shrink-0">
                <span className={cn("font-semibold", isDark ? "text-sand" : "text-rich-black")}>
                  {row.price.split(" ")[0]}
                </span>
                <span className={cn("text-sm", isDark ? "text-sand/40" : "text-rich-black/40")}>
                  {" "}
                  {row.price.split(" ")[1]}
                  {row.recurring ? "/mo" : ""}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* -------- Footer note -------- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className={cn("text-xs", isDark ? "text-sand/40" : "text-rich-black/40")}>
            {copy.footnote[language]}
          </p>
          <p className={cn("text-xs mt-1", isDark ? "text-sand/40" : "text-rich-black/40")}>
            {copy.exchangeRate[language]}
          </p>
        </motion.div>

        {/* -------- CTA -------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 text-center"
        >
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-copper font-medium hover:underline transition-all"
          >
            {copy.cta[language]}
            <ArrowRight
              size={16}
              className={rtl ? "rotate-180" : ""}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
