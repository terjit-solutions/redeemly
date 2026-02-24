"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Copy — trilingual                                                  */
/* ------------------------------------------------------------------ */

const copy = {
  taglineEn: "Your money. Global access.",
  taglineAr: "\u0623\u0645\u0648\u0627\u0644\u0643. \u0648\u0635\u0648\u0644 \u0639\u0627\u0644\u0645\u064a.",
  taglineFr: "Votre argent. Acc\u00e8s mondial.",
  services: {
    en: "Services",
    ar: "\u0627\u0644\u062e\u062f\u0645\u0627\u062a",
    fr: "Services",
  },
  company: {
    en: "Company",
    ar: "\u0627\u0644\u0634\u0631\u0643\u0629",
    fr: "Entreprise",
  },
  howItWorks: {
    en: "How it Works",
    ar: "\u0643\u064a\u0641 \u064a\u0639\u0645\u0644",
    fr: "Comment \u00e7a marche",
  },
  terms: {
    en: "Terms",
    ar: "\u0627\u0644\u0634\u0631\u0648\u0637",
    fr: "Conditions",
  },
  privacy: {
    en: "Privacy",
    ar: "\u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629",
    fr: "Confidentialit\u00e9",
  },
  allServices: {
    en: "All Services",
    ar: "\u062c\u0645\u064a\u0639 \u0627\u0644\u062e\u062f\u0645\u0627\u062a",
    fr: "Tous les services",
  },
  whatsapp: {
    en: "Chat on WhatsApp",
    ar: "\u062a\u0648\u0627\u0635\u0644 \u0639\u0628\u0631 \u0648\u0627\u062a\u0633\u0627\u0628",
    fr: "Discuter sur WhatsApp",
  },
  rights: {
    en: "\u00a9 2026 Redeemly. All rights reserved.",
    ar: "\u00a9 2026 Redeemly. \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629.",
    fr: "\u00a9 2026 Redeemly. Tous droits r\u00e9serv\u00e9s.",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Service links                                                      */
/* ------------------------------------------------------------------ */

const serviceLinks = [
  { label: "Spotify", href: "/catalog/spotify" },
  { label: "Netflix", href: "/catalog/netflix" },
  { label: "ChatGPT Plus", href: "/catalog/chatgpt-plus" },
];

const companyLinks = [
  { key: "howItWorks" as const, href: "#how-it-works" },
  { key: "terms" as const, href: "/terms" },
  { key: "privacy" as const, href: "/privacy" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function LandingFooter() {
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  return (
    <footer dir={rtl ? "rtl" : "ltr"}>
      {/* -------- Dune wave divider -------- */}
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto -mb-px block"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80V40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0Z"
          fill={isDark ? "#0D0D0D" : "#1A1A1A"}
        />
      </svg>

      {/* -------- Footer body -------- */}
      <div className={cn("pt-10 sm:pt-16 pb-6 sm:pb-8", isDark ? "bg-[#0D0D0D]" : "bg-charcoal")}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* ======== Top section — 3 columns ======== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {/* Column 1: Brand */}
            <div>
              <span className="font-[family-name:var(--font-playfair)] text-2xl text-sand font-bold">
                Redeemly
              </span>
              <p className="text-sand/60 text-sm mt-4">
                {copy.taglineEn}
              </p>
              <p className="text-sand/40 text-xs mt-1">
                {copy.taglineAr}
              </p>
              <p className="text-sand/40 text-xs mt-1">
                {copy.taglineFr}
              </p>
            </div>

            {/* Column 2: Links — two sub-columns */}
            <div className="grid grid-cols-2 gap-8">
              {/* Services */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-gold/70 font-medium mb-4">
                  {copy.services[language]}
                </h4>
                <ul className="space-y-2.5">
                  {serviceLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-sand/50 hover:text-sand transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/catalog"
                      className="text-sm text-sand/50 hover:text-sand transition-colors"
                    >
                      {copy.allServices[language]}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-gold/70 font-medium mb-4">
                  {copy.company[language]}
                </h4>
                <ul className="space-y-2.5">
                  {companyLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-sand/50 hover:text-sand transition-colors"
                      >
                        {copy[link.key][language]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Contact */}
            <div className={cn("flex flex-col", rtl ? "items-start" : "items-start md:items-end")}>
              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/22200000000"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 py-3",
                  "bg-[#25D366] text-white font-medium text-sm",
                  "shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.4)]",
                  "transition-all hover:shadow-xl hover:shadow-[#25D366]/30 hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                <MessageCircle size={18} />
                {copy.whatsapp[language]}
              </a>

            </div>
          </div>

          {/* ======== Gold rule divider ======== */}
          <div className="rule-gold my-8" />

          {/* ======== Bottom bar ======== */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sand/30 text-xs">
              {copy.rights[language]}
            </p>
            <p className="text-sand/30 text-xs">
              Made by{" "}
              <a href="https://terjitsolutions.com" target="_blank" rel="noopener noreferrer" className="text-sand/50 hover:text-copper transition-colors">
                Terjit Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
