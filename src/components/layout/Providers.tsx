"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme, language } = useAppStore();
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL(language) ? "rtl" : "ltr";
  }, [language]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={isLandingPage ? "flex-1" : "flex-1 pt-16"}>
        {children}
      </main>
      {isLandingPage ? null : <Footer />}
      <WhatsAppButton />
    </div>
  );
}
