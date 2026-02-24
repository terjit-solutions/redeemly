"use client";

import Link from "next/link";
import { useAppStore } from "@/stores/app-store";
import { t, isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";

export function Footer() {
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  const footerLinks = {
    services: [
      { label: "Spotify Premium", href: "/catalog/spotify" },
      { label: "Netflix", href: "/catalog/netflix" },
      { label: "ChatGPT Plus", href: "/catalog/chatgpt-plus" },
      { label: "Apple Gift Card", href: "/catalog/apple-gift-card" },
      { label: t("pricing.viewAll", language), href: "/catalog" },
    ],
    company: [
      { label: t("footer.about", language), href: "#" },
      { label: t("footer.terms", language), href: "/terms" },
      { label: t("footer.privacy", language), href: "/privacy" },
    ],
    support: [
      { label: t("footer.contact", language), href: "#" },
      { label: t("footer.whatsapp", language), href: "https://wa.me/22200000000" },
    ],
  };

  return (
    <footer
      className={cn(
        "border-t",
        isDark ? "bg-navy border-white/5" : "bg-warm-white border-black/5"
      )}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className={cn("text-xl font-bold", isDark ? "text-white" : "text-navy")}>
                Redeemly
              </span>
            </Link>
            <p className={cn("text-sm leading-relaxed", isDark ? "text-gray-400" : "text-gray-500")}>
              {t("footer.tagline", language)}
            </p>
            <p className={cn("text-xs mt-4", isDark ? "text-gray-500" : "text-gray-400")}>
              {t("common.exchangeRate", language)}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className={cn("text-sm font-semibold mb-4 uppercase tracking-wider", isDark ? "text-gray-300" : "text-gray-700")}>
              {t("footer.services", language)}
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors",
                      isDark ? "text-gray-400 hover:text-teal" : "text-gray-500 hover:text-teal-dark"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={cn("text-sm font-semibold mb-4 uppercase tracking-wider", isDark ? "text-gray-300" : "text-gray-700")}>
              {t("footer.company", language)}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors",
                      isDark ? "text-gray-400 hover:text-teal" : "text-gray-500 hover:text-teal-dark"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className={cn("text-sm font-semibold mb-4 uppercase tracking-wider", isDark ? "text-gray-300" : "text-gray-700")}>
              {t("footer.support", language)}
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors",
                      isDark ? "text-gray-400 hover:text-teal" : "text-gray-500 hover:text-teal-dark"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Payment methods */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Bankily", "Sedad", "Masrivi", "BimBank"].map((method) => (
                <span
                  key={method}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-md font-medium",
                    isDark ? "bg-white/5 text-gray-400" : "bg-black/5 text-gray-500"
                  )}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={cn(
          "mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4",
          isDark ? "border-white/5" : "border-black/5"
        )}>
          <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
            &copy; {new Date().getFullYear()} Redeemly. {t("footer.rights", language)}
          </p>
          <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
            {t("footer.madeIn", language)}
          </p>
        </div>
      </div>
    </footer>
  );
}
