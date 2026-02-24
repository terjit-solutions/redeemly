"use client";

import { motion } from "framer-motion";
import { Shield, Smartphone, Tag, MapPin } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Copy — trilingual                                                  */
/* ------------------------------------------------------------------ */

const copy = {
  title: {
    en: "Built for Mauritania\u2019s digital future",
    ar: "\u0645\u0628\u0646\u064A \u0644\u0645\u0633\u062A\u0642\u0628\u0644 \u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627 \u0627\u0644\u0631\u0642\u0645\u064A",
    fr: "Construit pour l\u2019avenir num\u00E9rique de la Mauritanie",
  },
  badge: {
    en: "Since 2024 \u00B7 Nouakchott, Mauritania",
    ar: "\u0645\u0646\u0630 2024 \u00B7 \u0646\u0648\u0627\u0643\u0634\u0648\u0637\u060C \u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627",
    fr: "Depuis 2024 \u00B7 Nouakchott, Mauritanie",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Trust points data                                                  */
/* ------------------------------------------------------------------ */

interface TrustPoint {
  icon: typeof Shield;
  text: { en: string; ar: string; fr: string };
}

const trustPoints: TrustPoint[] = [
  {
    icon: Shield,
    text: {
      en: "Every order is manually verified before delivery. No bots, no automation \u2014 real people ensuring your money is safe.",
      ar: "\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0643\u0644 \u0637\u0644\u0628 \u064A\u062F\u0648\u064A\u064B\u0627 \u0642\u0628\u0644 \u0627\u0644\u062A\u0633\u0644\u064A\u0645. \u0644\u0627 \u0631\u0648\u0628\u0648\u062A\u0627\u062A\u060C \u0644\u0627 \u0623\u062A\u0645\u062A\u0629 \u2014 \u0623\u0634\u062E\u0627\u0635 \u062D\u0642\u064A\u0642\u064A\u0648\u0646 \u064A\u0636\u0645\u0646\u0648\u0646 \u0623\u0645\u0627\u0646 \u0623\u0645\u0648\u0627\u0644\u0643.",
      fr: "Chaque commande est v\u00E9rifi\u00E9e manuellement avant livraison. Pas de robots, pas d\u2019automatisation \u2014 de vraies personnes qui veillent \u00E0 la s\u00E9curit\u00E9 de votre argent.",
    },
  },
  {
    icon: Smartphone,
    text: {
      en: "We deliver via WhatsApp because that\u2019s where you are. Check your order status in real time.",
      ar: "\u0646\u0642\u0648\u0645 \u0628\u0627\u0644\u062A\u0633\u0644\u064A\u0645 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0623\u0646\u0647 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0630\u064A \u062A\u062A\u0648\u0627\u062C\u062F \u0641\u064A\u0647. \u062A\u0627\u0628\u0639 \u062D\u0627\u0644\u0629 \u0637\u0644\u0628\u0643 \u0641\u064A \u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0641\u0639\u0644\u064A.",
      fr: "Nous livrons via WhatsApp parce que c\u2019est l\u00E0 o\u00F9 vous \u00EAtes. V\u00E9rifiez l\u2019\u00E9tat de votre commande en temps r\u00E9el.",
    },
  },
  {
    icon: Tag,
    text: {
      en: "Transparent pricing in MRU. The price you see is the price you pay. No hidden fees, no surprises.",
      ar: "\u062A\u0633\u0639\u064A\u0631 \u0634\u0641\u0627\u0641 \u0628\u0627\u0644\u0623\u0648\u0642\u064A\u0629. \u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0630\u064A \u062A\u0631\u0627\u0647 \u0647\u0648 \u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0630\u064A \u062A\u062F\u0641\u0639\u0647. \u0644\u0627 \u0631\u0633\u0648\u0645 \u0645\u062E\u0641\u064A\u0629\u060C \u0644\u0627 \u0645\u0641\u0627\u062C\u0622\u062A.",
      fr: "Tarification transparente en MRU. Le prix affich\u00E9 est le prix que vous payez. Pas de frais cach\u00E9s, pas de surprises.",
    },
  },
  {
    icon: MapPin,
    text: {
      en: "Operating since 2024 from Nouakchott. We\u2019re your neighbors.",
      ar: "\u0646\u0639\u0645\u0644 \u0645\u0646\u0630 2024 \u0645\u0646 \u0646\u0648\u0627\u0643\u0634\u0648\u0637. \u0646\u062D\u0646 \u062C\u064A\u0631\u0627\u0646\u0643.",
      fr: "En activit\u00E9 depuis 2024 depuis Nouakchott. Nous sommes vos voisins.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const trustPointVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 0.6,
      ease: luxuryEase,
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TrustSection() {
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  return (
    <section
      className={cn("py-16 sm:py-24 md:py-32 relative overflow-hidden", isDark ? "bg-[#1A2248]" : "bg-indigo")}
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Subtle radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.12) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* ======================================================== */}
          {/*  LEFT SIDE — editorial copy + trust points               */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: rtl ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: luxuryEase }}
            className="lg:w-3/5"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl text-sand leading-tight">
              {copy.title[language]}
            </h2>

            {/* Trust points */}
            <div className="mt-10">
              {trustPoints.map((point, i) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={trustPointVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className={cn(
                      "flex gap-3 sm:gap-4 items-start p-3 sm:p-5 rounded-xl border-l-[3px] border-l-copper",
                      isDark ? "bg-sand/[0.03]" : "bg-sand/[0.08]",
                      i === 0 ? "mt-8" : "mt-4"
                    )}
                  >
                    {/* Icon */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-copper flex-shrink-0">
                      <Icon size={20} className="text-white" />
                    </div>

                    {/* Text */}
                    <p className="text-sand/70 text-xs sm:text-sm md:text-base leading-relaxed">
                      {point.text[language]}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/*  RIGHT SIDE — styled image placeholder                   */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: rtl ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
            className="lg:w-2/5 w-full hidden md:block"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              {/* Gradient background simulating duotone photo */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #2D3A6D 0%, #C9A84C 100%)",
                }}
              />

              {/* Grain texture overlay */}
              <div className="grain absolute inset-0" />

              {/* Centered placeholder text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl text-sand/20 select-none">
                  Nouakchott
                </span>
              </div>

              {/* Badge at bottom */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <div className="bg-sand/10 backdrop-blur-md rounded-xl px-4 py-2">
                  <span className="text-xs text-sand/80 font-medium whitespace-nowrap">
                    {copy.badge[language]}
                  </span>
                </div>
              </div>

              {/* Trust stat overlay */}
              <div className="absolute top-6 right-6">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="1" className="text-sand/10" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="87 100" strokeLinecap="round" className="text-gold" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sand text-xs font-bold">2.8K+</span>
                    <span className="text-sand/50 text-[8px]">orders</span>
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
