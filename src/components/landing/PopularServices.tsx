"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Music, Play, Sparkles, Monitor, Gamepad2, Smartphone } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Copy — trilingual                                                  */
/* ------------------------------------------------------------------ */

const copy = {
  eyebrow: {
    en: "OUR CATALOG",
    ar: "كتالوجنا",
    fr: "NOTRE CATALOGUE",
  },
  title: {
    en: "What will you unlock?",
    ar: "ماذا ستفتح؟",
    fr: "Que débloquerez-vous ?",
  },
  viewAll: {
    en: "View all 40+ services",
    ar: "عرض جميع الخدمات الأكثر من 40",
    fr: "Voir les 40+ services",
  },
  popular: {
    en: "Popular",
    ar: "شائع",
    fr: "Populaire",
  },
  from: {
    en: "From",
    ar: "ابتداءً من",
    fr: "À partir de",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Services display data                                              */
/* ------------------------------------------------------------------ */

interface DisplayService {
  name: string;
  slug: string;
  emoji: string;
  icon: any;
  brandColor: string;
  price: { en: string; ar: string; fr: string };
  category: { en: string; ar: string; fr: string };
  popular: boolean;
  featured: boolean;
  plans?: { en: string; ar: string; fr: string };
}

const displayServices: DisplayService[] = [
  {
    name: "Spotify Premium",
    slug: "spotify",
    emoji: "\uD83C\uDFB5",
    icon: Music,
    brandColor: "#1DB954",
    price: {
      en: "From 429 MRU/month",
      ar: "ابتداءً من 429 أوقية/شهر",
      fr: "À partir de 429 MRU/mois",
    },
    category: {
      en: "Music Streaming",
      ar: "بث الموسيقى",
      fr: "Streaming Musical",
    },
    popular: true,
    featured: true,
    plans: {
      en: "Individual \u00B7 Duo \u00B7 Family",
      ar: "فردي \u00B7 ثنائي \u00B7 عائلي",
      fr: "Individuel \u00B7 Duo \u00B7 Famille",
    },
  },
  {
    name: "Netflix",
    slug: "netflix",
    emoji: "\uD83C\uDFAC",
    icon: Play,
    brandColor: "#E50914",
    price: {
      en: "From 273 MRU/month",
      ar: "ابتداءً من 273 أوقية/شهر",
      fr: "À partir de 273 MRU/mois",
    },
    category: {
      en: "Video Streaming",
      ar: "بث الفيديو",
      fr: "Streaming Vidéo",
    },
    popular: true,
    featured: false,
  },
  {
    name: "ChatGPT Plus",
    slug: "chatgpt-plus",
    emoji: "\uD83D\uDCBB",
    icon: Sparkles,
    brandColor: "#10A37F",
    price: {
      en: "From 780 MRU/month",
      ar: "ابتداءً من 780 أوقية/شهر",
      fr: "À partir de 780 MRU/mois",
    },
    category: {
      en: "AI Software",
      ar: "برامج الذكاء الاصطناعي",
      fr: "Logiciel IA",
    },
    popular: true,
    featured: false,
  },
  {
    name: "YouTube Premium",
    slug: "youtube-music",
    emoji: "\uD83D\uDCFA",
    icon: Monitor,
    brandColor: "#FF0000",
    price: {
      en: "From 429 MRU/month",
      ar: "ابتداءً من 429 أوقية/شهر",
      fr: "À partir de 429 MRU/mois",
    },
    category: {
      en: "Video Streaming",
      ar: "بث الفيديو",
      fr: "Streaming Vidéo",
    },
    popular: false,
    featured: false,
  },
  {
    name: "PlayStation Plus",
    slug: "ps-plus",
    emoji: "\uD83C\uDFAE",
    icon: Gamepad2,
    brandColor: "#003087",
    price: {
      en: "From 390 MRU/month",
      ar: "ابتداءً من 390 أوقية/شهر",
      fr: "À partir de 390 MRU/mois",
    },
    category: {
      en: "Gaming",
      ar: "ألعاب",
      fr: "Jeux",
    },
    popular: false,
    featured: false,
  },
  {
    name: "Apple Gift Card",
    slug: "apple-gift-card",
    emoji: "\uD83D\uDCF1",
    icon: Smartphone,
    brandColor: "#000000",
    price: {
      en: "From 390 MRU",
      ar: "ابتداءً من 390 أوقية",
      fr: "À partir de 390 MRU",
    },
    category: {
      en: "App Store",
      ar: "متجر التطبيقات",
      fr: "App Store",
    },
    popular: false,
    featured: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.6,
      ease: luxuryEase,
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PopularServices() {
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  return (
    <section
      className={cn("relative py-16 sm:py-24 md:py-32 overflow-hidden geo-pattern", isDark ? "bg-[#131313]" : "bg-sand")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* -------- Header -------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: luxuryEase }}
          className="mb-8 sm:mb-14 md:mb-16"
        >
          <p className="uppercase text-xs tracking-[0.2em] text-copper font-semibold mb-3">
            {copy.eyebrow[language]}
          </p>
          <h2 className={cn("font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl", isDark ? "text-sand" : "text-rich-black")}>
            {copy.title[language]}
          </h2>
        </motion.div>

        {/* -------- Grid -------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayServices.map((service, i) => {
            const Icon = service.icon;
            return (
            <motion.div
              key={service.slug}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={cn(
                service.featured && "lg:col-span-2"
              )}
            >
              <Link
                href={`/catalog/${service.slug}`}
                className={cn("group block rounded-2xl overflow-hidden transition-all duration-500 shadow-sm hover:translate-y-[-4px] hover:shadow-xl relative border", isDark ? "bg-[#1E1E1E] border-gold/[0.08]" : "bg-white border-rich-black/[0.06]")}
              >
                {/* Hover brand-color tint overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: service.brandColor, opacity: 0 }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ backgroundColor: service.brandColor + "0D" }}
                />

                {/* Brand accent bar */}
                <div
                  className="h-1 w-full group-hover:h-1.5 transition-all duration-300"
                  style={{ backgroundColor: service.brandColor }}
                />

                {service.popular && (
                  <span className="absolute top-3 right-3 text-[11px] font-semibold text-white bg-copper px-2.5 py-0.5 rounded-full z-10">
                    {copy.popular[language]}
                  </span>
                )}

                {/* Top section */}
                <div
                  className={cn(
                    "p-5 sm:p-6 md:p-8",
                    service.featured && "sm:p-10"
                  )}
                >
                  {/* Brand icon */}
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-xl"
                    style={{ backgroundColor: service.brandColor }}
                  >
                    <Icon size={24} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Service name */}
                  <h3
                    className={cn(
                      "font-semibold mt-4",
                      isDark ? "text-sand" : "text-rich-black",
                      service.featured ? "text-xl" : "text-lg"
                    )}
                  >
                    {service.name}
                  </h3>

                  {/* Category */}
                  <p className={cn("text-sm mt-1", isDark ? "text-sand/50" : "text-rich-black/50")}>
                    {service.category[language]}
                  </p>

                  {/* Featured plan list */}
                  {service.featured && service.plans && (
                    <p className={cn("text-xs mt-4", isDark ? "text-sand/40" : "text-rich-black/40")}>
                      {service.plans[language]}
                    </p>
                  )}
                </div>

                {/* Bottom section */}
                <div
                  className={cn(
                    "px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 pt-3 sm:pt-4 flex items-center justify-between",
                    isDark ? "border-t border-gold/[0.06]" : "border-t border-rich-black/[0.04]",
                    service.featured && "px-6 sm:px-10 pb-6 sm:pb-10"
                  )}
                >
                  {/* Price */}
                  <p className={cn("text-sm", isDark ? "text-sand/50" : "text-rich-black/50")}>
                    <span className={cn("font-semibold", isDark ? "text-sand" : "text-rich-black")}>
                      {service.price[language]}
                    </span>
                  </p>

                  {/* Arrow */}
                  <ArrowRight
                    size={18}
                    className={cn(
                      "transition-transform duration-300 translate-x-0 group-hover:translate-x-1",
                      isDark ? "text-sand/30" : "text-rich-black/30",
                      rtl && "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0"
                    )}
                  />
                </div>
              </Link>
            </motion.div>
            );
          })}
        </div>

        {/* -------- View all link -------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: luxuryEase }}
          className="mt-10 text-center"
        >
          <Link
            href="/catalog"
            className={cn(
              "inline-flex items-center gap-2 text-copper font-medium text-base",
              "transition-all hover:underline underline-offset-4"
            )}
          >
            {copy.viewAll[language]}
            <ArrowRight
              size={16}
              className={cn(
                "transition-transform group-hover:translate-x-1",
                rtl && "rotate-180"
              )}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
