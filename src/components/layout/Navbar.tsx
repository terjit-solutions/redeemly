"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { t, isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { key: "nav.catalog" as const, href: "/catalog" },
  { key: "nav.gifts" as const, href: "/gifts" },
  { key: "nav.dashboard" as const, href: "/dashboard" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { language, theme } = useAppStore();
  const rtl = isRTL(language);
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? isDark ? "glass-dark shadow-sm" : "glass-light shadow-sm"
            : "bg-transparent"
        )}
        dir={rtl ? "rtl" : "ltr"}
      >
        <nav className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex h-[72px] items-center justify-between">
            {/* Wordmark */}
            <Link href="/" className="group">
              <span className={cn(
                "font-[family-name:var(--font-playfair)] text-2xl font-bold tracking-tight transition-colors",
                isDark ? "text-sand" : "text-rich-black"
              )}>
                Redeemly
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative text-[15px] font-medium tracking-wide transition-colors",
                      isActive
                        ? "text-copper"
                        : isDark
                          ? "text-sand/60 hover:text-sand"
                          : "text-rich-black/60 hover:text-rich-black"
                    )}
                  >
                    {t(link.key, language)}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-copper"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <ThemeToggle />
              <Link
                href="/login"
                className={cn(
                  "text-[15px] font-medium transition-colors",
                  isDark ? "text-sand/60 hover:text-sand" : "text-rich-black/60 hover:text-rich-black"
                )}
              >
                {t("nav.login", language)}
              </Link>
              <Link
                href="/signup"
                className="btn-fill px-5 py-2.5 text-[14px] font-semibold rounded-full bg-copper text-white hover:bg-copper-dark transition-colors"
              >
                {t("nav.getStarted", language)}
              </Link>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn("p-2 transition-colors", isDark ? "text-sand" : "text-rich-black")}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed inset-x-0 top-[72px] z-40 p-5 md:hidden",
              isDark ? "glass-dark" : "glass-light"
            )}
            dir={rtl ? "rtl" : "ltr"}
          >
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className={cn(
                  "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                  pathname === "/"
                    ? "text-copper bg-copper/5"
                    : isDark ? "text-sand/70" : "text-rich-black/70"
                )}
              >
                {t("nav.home", language)}
              </Link>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      isActive
                        ? "text-copper bg-copper/5"
                        : isDark ? "text-sand/70" : "text-rich-black/70"
                    )}
                  >
                    {t(link.key, language)}
                  </Link>
                );
              })}
              <div className="rule-gold my-3" />
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className={cn(
                    "flex-1 text-center px-4 py-3 rounded-xl font-medium",
                    isDark ? "text-sand/70 bg-sand/[0.05]" : "text-rich-black/70 bg-rich-black/[0.03]"
                  )}
                >
                  {t("nav.login", language)}
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 text-center px-4 py-3 rounded-xl font-semibold bg-copper text-white"
                >
                  {t("nav.getStarted", language)}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
