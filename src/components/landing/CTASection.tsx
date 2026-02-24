"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { useAnimateInView } from "@/hooks/useAnimateInView";

export function CTASection() {
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);
  const { ref, isInView } = useAnimateInView();

  const heading = {
    en: "Ready to unlock global digital services?",
    ar: "مستعد لفتح الخدمات الرقمية العالمية؟",
    fr: "Prêt à débloquer les services numériques mondiaux ?",
  };

  const sub = {
    en: "Join thousands of Mauritanians who already use Redeemly. Start in under 2 minutes.",
    ar: "انضم لآلاف الموريتانيين الذين يستخدمون ريدملي بالفعل. ابدأ في أقل من دقيقتين.",
    fr: "Rejoignez des milliers de Mauritaniens qui utilisent déjà Redeemly. Commencez en moins de 2 minutes.",
  };

  return (
    <section
      className={cn(
        "relative py-24 sm:py-32 overflow-hidden",
        isDark ? "bg-navy-light" : "bg-white"
      )}
      dir={rtl ? "rtl" : "ltr"}
      ref={ref}
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,212,170,0.3) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-teal/10 border border-teal/20">
            <Sparkles size={16} className="text-teal" />
            <span className="text-sm font-medium text-teal">
              {language === "ar" ? "انضم اليوم" : language === "fr" ? "Rejoignez-nous" : "Join today"}
            </span>
          </div>

          <h2 className={cn("text-3xl sm:text-4xl md:text-5xl font-bold mb-6", isDark ? "text-white" : "text-navy")}>
            {heading[language]}
          </h2>

          <p className={cn("text-lg mb-10 max-w-2xl mx-auto", isDark ? "text-gray-400" : "text-gray-500")}>
            {sub[language]}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-teal to-teal-dark hover:shadow-xl hover:shadow-teal/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {language === "ar" ? "إنشاء حساب مجاني" : language === "fr" ? "Créer un compte gratuit" : "Create Free Account"}
              <ArrowRight size={20} className={cn("transition-transform group-hover:translate-x-1", rtl && "rotate-180 group-hover:-translate-x-1")} />
            </Link>
            <Link
              href="/catalog"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-[1.02]",
                isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-navy"
              )}
            >
              {language === "ar" ? "تصفح الكتالوج" : language === "fr" ? "Parcourir le catalogue" : "Browse Catalog"}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
