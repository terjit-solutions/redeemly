"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";

const cards = [
  {
    number: "01",
    title: {
      en: "Choose your service",
      ar: "\u0627\u062E\u062A\u0631 \u062E\u062F\u0645\u062A\u0643",
      fr: "Choisissez votre service",
    },
    desc: {
      en: "Browse 40+ digital services from music to gaming, software to cloud storage. Find exactly what you need.",
      ar: "\u062A\u0635\u0641\u062D \u0623\u0643\u062B\u0631 \u0645\u0646 40 \u062E\u062F\u0645\u0629 \u0631\u0642\u0645\u064A\u0629 \u0645\u0646 \u0627\u0644\u0645\u0648\u0633\u064A\u0642\u0649 \u0625\u0644\u0649 \u0627\u0644\u0623\u0644\u0639\u0627\u0628\u060C \u0648\u0645\u0646 \u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A \u0625\u0644\u0649 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0633\u062D\u0627\u0628\u064A. \u0627\u0639\u062B\u0631 \u0639\u0644\u0649 \u0645\u0627 \u062A\u062D\u062A\u0627\u062C\u0647 \u0628\u0627\u0644\u0636\u0628\u0637.",
      fr: "Parcourez plus de 40 services num\u00E9riques, de la musique aux jeux, des logiciels au stockage cloud. Trouvez exactement ce dont vous avez besoin.",
    },
    borderColor: "border-l-copper",
    rotation: "md:rotate-[-1deg]",
  },
  {
    number: "02",
    title: {
      en: "Pay with your e-wallet",
      ar: "\u0627\u062F\u0641\u0639 \u0628\u0645\u062D\u0641\u0638\u062A\u0643",
      fr: "Payez avec votre e-wallet",
    },
    desc: {
      en: "Send MRU from Bankily, Sedad, Masrivi, or BimBank. The same apps you use every day \u2014 nothing new to learn.",
      ar: "\u0623\u0631\u0633\u0644 \u0623\u0648\u0642\u064A\u0629 \u0639\u0628\u0631 \u0628\u0646\u0643\u0644\u064A \u0623\u0648 \u0633\u062F\u0627\u062F \u0623\u0648 \u0645\u0635\u0631\u0641\u064A \u0623\u0648 \u0628\u064A\u0645 \u0628\u0646\u0643. \u0646\u0641\u0633 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0633\u062A\u062E\u062F\u0645\u0647\u0627 \u0643\u0644 \u064A\u0648\u0645.",
      fr: "Envoyez des MRU depuis Bankily, Sedad, Masrivi ou BimBank. Les m\u00EAmes applis que vous utilisez chaque jour \u2014 rien de nouveau \u00E0 apprendre.",
    },
    borderColor: "border-l-gold",
    rotation: "md:rotate-[0.5deg]",
  },
  {
    number: "03",
    title: {
      en: "Enjoy in minutes",
      ar: "\u0627\u0633\u062A\u0645\u062A\u0639 \u0641\u064A \u062F\u0642\u0627\u0626\u0642",
      fr: "Profitez en quelques minutes",
    },
    desc: {
      en: "Your code arrives via WhatsApp and your dashboard. Activate it on the platform and start enjoying immediately.",
      ar: "\u064A\u0635\u0644 \u0631\u0645\u0632\u0643 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 \u0648\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645. \u0641\u0639\u0651\u0644\u0647 \u0639\u0644\u0649 \u0627\u0644\u0645\u0646\u0635\u0629 \u0648\u0627\u0628\u062F\u0623 \u0627\u0644\u0627\u0633\u062A\u0645\u062A\u0627\u0639 \u0641\u0648\u0631\u0627\u064B.",
      fr: "Votre code arrive via WhatsApp et votre tableau de bord. Activez-le sur la plateforme et profitez-en imm\u00E9diatement.",
    },
    borderColor: "border-l-indigo",
    rotation: "md:rotate-[-0.5deg]",
  },
];

function HandDrawnUnderline({ isInView }: { isInView: boolean }) {
  return (
    <svg
      viewBox="0 0 200 12"
      className="mx-auto mt-3 w-[200px] h-[12px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M2 8 C 30 2, 50 10, 80 5 S 130 9, 160 4 S 185 8, 198 6"
        stroke="var(--color-copper)"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export function HowItWorksSection() {
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" as any });

  const sectionTitle = {
    en: "How Redeemly works",
    ar: "\u0643\u064A\u0641 \u064A\u0639\u0645\u0644 \u0631\u064A\u062F\u0645\u0644\u064A",
    fr: "Comment fonctionne Redeemly",
  };

  return (
    <section
      id="how-it-works"
      className={cn("relative py-24 sm:py-32 grain overflow-hidden", isDark ? "bg-[#131313]" : "bg-sand")}
      dir={rtl ? "rtl" : "ltr"}
      ref={ref}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn("font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl", isDark ? "text-sand" : "text-rich-black")}
          >
            {sectionTitle[language] || sectionTitle.en}
          </motion.h2>
          <HandDrawnUnderline isInView={isInView} />
        </div>

        {/* Cards container */}
        <div className="relative">
          {/* Dotted path connector - desktop only */}
          <div className="hidden md:block absolute top-[40%] left-[15%] right-[15%] border-t-2 border-dashed border-copper/20 pointer-events-none" />

          {/* Mobile: horizontal scroll / Desktop: grid */}
          <div
            className={cn(
              "flex overflow-x-auto snap-x snap-mandatory gap-5 -mx-5 px-5",
              "md:grid md:grid-cols-3 md:gap-8 lg:gap-10 md:overflow-visible md:mx-0 md:px-0",
              /* Hide scrollbar on mobile for cleaner look */
              "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            )}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "relative min-w-[280px] snap-center md:min-w-0",
                  "rounded-2xl p-8 sm:p-10",
                  isDark ? "bg-[#1E1E1E] border-gold/[0.08]" : "bg-white border-rich-black/[0.06]",
                  "border",
                  isDark ? "shadow-xl shadow-black/20" : "shadow-xl shadow-rich-black/[0.04]",
                  "border-l-[3px]",
                  card.borderColor,
                  card.rotation,
                  "hover:rotate-0 hover:shadow-2xl hover:shadow-rich-black/[0.08]",
                  "transition-all duration-300"
                )}
              >
                {/* Large faded step number */}
                <span
                  className={cn(
                    "absolute top-4 font-[family-name:var(--font-playfair)] text-8xl leading-none select-none pointer-events-none",
                    isDark ? "text-sand/[0.04]" : "text-rich-black/[0.04]",
                    rtl ? "left-4" : "right-4"
                  )}
                >
                  {card.number}
                </span>

                {/* Title */}
                <h3 className={cn("relative text-xl font-semibold mb-3", isDark ? "text-sand" : "text-rich-black")}>
                  {card.title[language] || card.title.en}
                </h3>

                {/* Description */}
                <p className={cn("relative text-sm leading-relaxed", isDark ? "text-sand/60" : "text-rich-black/60")}>
                  {card.desc[language] || card.desc.en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
