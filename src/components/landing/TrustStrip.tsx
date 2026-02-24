"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";

const paymentMethods = ["Bankily", "Sedad", "Masrivi", "BimBank"];

export function TrustStrip() {
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" as any });

  const trustText = {
    en: {
      label: "Accepted payment methods",
      number: "2,847+",
      middle: "Mauritanians trust",
      brand: "Redeemly",
    },
    ar: {
      label: "\u0637\u0631\u0642 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u0645\u0642\u0628\u0648\u0644\u0629",
      number: "+2,847",
      middle: "\u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A \u064A\u062B\u0642\u0648\u0646 \u0628\u0640",
      brand: "\u0631\u064A\u062F\u0645\u0644\u064A",
    },
    fr: {
      label: "M\u00E9thodes de paiement accept\u00E9es",
      number: "2\u00A0847+",
      middle: "Mauritaniens font confiance \u00E0",
      brand: "Redeemly",
    },
  };

  const text = trustText[language] || trustText.en;

  return (
    <section
      ref={ref}
      className={cn("w-full", isDark ? "bg-[#0D0D0D]" : "bg-charcoal")}
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Top decorative line */}
      <div className="rule-gold" />

      <div className="py-6 sm:py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Left side - Payment methods */}
            <div className="flex flex-col items-center md:items-start">
              <span className="uppercase text-xs tracking-[0.2em] text-gold/70 font-medium mb-4">
                {text.label}
              </span>
              <div className="flex items-center gap-4 sm:gap-8 md:gap-12 flex-wrap justify-center md:justify-start">
                {paymentMethods.map((method, i) => (
                  <div key={method} className="flex items-center gap-4 sm:gap-8 md:gap-12">
                    {i > 0 && (
                      <span className="w-px h-4 sm:h-5 bg-gold/20 hidden sm:block" />
                    )}
                    <span className="text-sand/80 text-sm sm:text-lg md:text-xl font-medium tracking-wide">
                      {method}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Trust stat */}
            <div
              className={cn(
                "flex items-baseline gap-2 flex-wrap justify-center md:justify-end",
                rtl && "flex-row-reverse"
              )}
            >
              <span className="text-gold font-bold text-xl sm:text-2xl font-[family-name:var(--font-playfair)]">
                {text.number}
              </span>
              <span className="text-sand/60 text-sm">
                {text.middle}
              </span>
              <span className="text-sand font-medium">
                {text.brand}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="rule-gold" />
    </section>
  );
}
