"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/app-store";
import { t, isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { Phone, User, ArrowRight, Shield, Check } from "lucide-react";

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SignupPage() {
  const router = useRouter();
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (otpSent && otpRefs.current[0]) {
      otpRefs.current[0]?.focus();
    }
  }, [otpSent]);

  const handleSendOtp = () => {
    if (phone.length < 8 || name.length < 2) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("").length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  const isOtpComplete = otp.every((d) => d !== "");
  const canSend = phone.length >= 8 && name.length >= 2;

  return (
    <div className="min-h-screen flex" dir={rtl ? "rtl" : "ltr"}>
      {/* ============ Left — Form ============ */}
      <div className={cn(
        "w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12",
        isDark ? "bg-[#131313]" : "bg-sand"
      )}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: luxuryEase }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="md:hidden mb-8">
            <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-copper">
              Redeemly
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className={cn(
              "font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold mb-2",
              isDark ? "text-sand" : "text-rich-black"
            )}>
              {t("auth.signup", language)}
            </h1>
            <p className={cn("text-base", isDark ? "text-sand/50" : "text-rich-black/50")}>
              {t("auth.signupSubtitle", language)}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!otpSent ? (
              <motion.div
                key="info-step"
                initial={{ opacity: 0, x: rtl ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: rtl ? -20 : 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Name input */}
                <div className="mb-4">
                  <label className={cn("block text-sm font-medium mb-2", isDark ? "text-sand/70" : "text-rich-black/70")}>
                    {t("auth.name", language)}
                  </label>
                  <div className={cn(
                    "flex items-center gap-2 rounded-xl border px-4 py-3.5 transition-all focus-within:border-copper focus-within:ring-2 focus-within:ring-copper/20",
                    isDark ? "bg-[#1E1E1E] border-gold/[0.1]" : "bg-white border-rich-black/[0.08]"
                  )}>
                    <User size={18} className={isDark ? "text-sand/40" : "text-rich-black/40"} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === "ar" ? "الاسم الكامل" : language === "fr" ? "Nom complet" : "Full name"}
                      className={cn(
                        "flex-1 bg-transparent outline-none text-base",
                        isDark ? "text-sand placeholder:text-sand/25" : "text-rich-black placeholder:text-rich-black/30"
                      )}
                    />
                  </div>
                </div>

                {/* Phone input */}
                <div className="mb-6">
                  <label className={cn("block text-sm font-medium mb-2", isDark ? "text-sand/70" : "text-rich-black/70")}>
                    {t("auth.phone", language)}
                  </label>
                  <div className={cn(
                    "flex items-center gap-2 rounded-xl border px-4 py-3.5 transition-all focus-within:border-copper focus-within:ring-2 focus-within:ring-copper/20",
                    isDark ? "bg-[#1E1E1E] border-gold/[0.1]" : "bg-white border-rich-black/[0.08]"
                  )}>
                    <Phone size={18} className={isDark ? "text-sand/40" : "text-rich-black/40"} />
                    <span className={cn("text-sm font-medium", isDark ? "text-sand/40" : "text-rich-black/40")}>+222</span>
                    <div className={cn("w-px h-5", isDark ? "bg-sand/10" : "bg-rich-black/10")} />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 8))}
                      placeholder="XX XX XX XX"
                      className={cn(
                        "flex-1 bg-transparent outline-none text-base",
                        isDark ? "text-sand placeholder:text-sand/25" : "text-rich-black placeholder:text-rich-black/30"
                      )}
                    />
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Shield size={13} className="text-copper/60" />
                    <span className={cn("text-[11px]", isDark ? "text-sand/40" : "text-rich-black/40")}>
                      {language === "ar" ? "بياناتك مشفرة" : language === "fr" ? "Données cryptées" : "Your data is encrypted"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={13} className="text-copper/60" />
                    <span className={cn("text-[11px]", isDark ? "text-sand/40" : "text-rich-black/40")}>
                      {language === "ar" ? "لا حاجة لبطاقة" : language === "fr" ? "Pas de carte requise" : "No card required"}
                    </span>
                  </div>
                </div>

                {/* Send Code button */}
                <button
                  onClick={handleSendOtp}
                  disabled={!canSend || loading}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold text-white transition-all active:scale-[0.98]",
                    canSend ? "bg-copper hover:shadow-lg hover:shadow-copper/20" : "bg-rich-black/20 cursor-not-allowed opacity-60"
                  )}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {t("auth.sendOtp", language)}
                      <ArrowRight size={18} className={rtl ? "rotate-180" : ""} />
                    </>
                  )}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: rtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: rtl ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* OTP sent confirmation */}
                <div className={cn("flex items-center gap-3 p-3 rounded-xl mb-6", isDark ? "bg-copper/10" : "bg-copper/5")}>
                  <div className="w-8 h-8 rounded-full bg-copper/20 flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-copper" />
                  </div>
                  <p className={cn("text-sm", isDark ? "text-sand/70" : "text-rich-black/60")}>
                    {language === "ar" ? `تم إرسال رمز التحقق إلى +222 ${phone}` : language === "fr" ? `Code envoyé au +222 ${phone}` : `Code sent to +222 ${phone}`}
                  </p>
                </div>

                <label className={cn("block text-sm font-medium mb-3", isDark ? "text-sand/70" : "text-rich-black/70")}>
                  {t("auth.otp", language)}
                </label>

                {/* OTP inputs */}
                <div className={cn("flex gap-3 mb-6", rtl ? "flex-row-reverse" : "")}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { otpRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={cn(
                        "w-12 h-14 text-center text-xl font-bold rounded-xl border outline-none transition-all",
                        "focus:border-copper focus:ring-2 focus:ring-copper/20",
                        digit ? "border-copper bg-copper/5" : isDark ? "bg-[#1E1E1E] border-gold/[0.1]" : "bg-white border-rich-black/[0.08]",
                        isDark ? "text-sand" : "text-rich-black"
                      )}
                    />
                  ))}
                </div>

                {/* Verify button */}
                <button
                  onClick={handleVerify}
                  disabled={!isOtpComplete || loading}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold text-white transition-all active:scale-[0.98]",
                    isOtpComplete ? "bg-copper hover:shadow-lg hover:shadow-copper/20" : "bg-rich-black/20 cursor-not-allowed opacity-60"
                  )}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {t("auth.verify", language)}
                      <ArrowRight size={18} className={rtl ? "rotate-180" : ""} />
                    </>
                  )}
                </button>

                <button
                  onClick={() => { setOtpSent(false); setOtp(["", "", "", "", "", ""]); }}
                  className={cn("w-full text-center text-sm mt-4 transition-colors", isDark ? "text-sand/40 hover:text-sand" : "text-rich-black/40 hover:text-rich-black")}
                >
                  {language === "ar" ? "تغيير رقم الهاتف" : language === "fr" ? "Changer le numéro" : "Change phone number"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className={cn("flex-1 h-px", isDark ? "bg-sand/10" : "bg-rich-black/[0.08]")} />
            <span className={cn("text-xs", isDark ? "text-sand/30" : "text-rich-black/30")}>
              {language === "ar" ? "او" : language === "fr" ? "ou" : "or"}
            </span>
            <div className={cn("flex-1 h-px", isDark ? "bg-sand/10" : "bg-rich-black/[0.08]")} />
          </div>

          {/* Link to login */}
          <p className={cn("text-center text-sm", isDark ? "text-sand/50" : "text-rich-black/50")}>
            {t("auth.hasAccount", language)}{" "}
            <Link href="/login" className="text-copper hover:underline font-semibold">
              {t("nav.login", language)}
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ============ Right — Illustration ============ */}
      <div className="hidden md:flex md:w-1/2 relative bg-charcoal overflow-hidden items-center justify-center">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.1) 0%, transparent 60%)" }} />
        <div className="grain absolute inset-0" />

        <div className="relative z-10 text-center px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ease: luxuryEase }}>
            <span className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-sand">Redeemly</span>
            <p className="text-lg text-sand/50 mt-4">
              {language === "ar" ? "ابدأ رحلتك نحو وصول عالمي." : language === "fr" ? "Commencez votre voyage d'accès mondial." : "Start your global access journey."}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 space-y-3">
            {[
              { en: "Bank-level security", ar: "أمان بمستوى البنوك", fr: "Sécurité bancaire" },
              { en: "Instant delivery via WhatsApp", ar: "توصيل فوري عبر واتساب", fr: "Livraison instantanée via WhatsApp" },
              { en: "40+ digital services", ar: "أكثر من 40 خدمة رقمية", fr: "40+ services numériques" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2">
                <Check size={14} className="text-copper" />
                <span className="text-sm text-sand/60">{item[language]}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-10 flex items-center justify-center gap-2">
            <Shield size={14} className="text-gold/60" />
            <span className="text-xs text-sand/30">Encrypted &middot; Verified &middot; Instant</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
