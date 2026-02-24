"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/app-store";
import { t, isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";
import {
  Phone,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Shield,
  Sparkles,
  Check,
} from "lucide-react";

const floatingServices = [
  { emoji: "🎵", label: "Spotify", x: "12%", y: "18%", delay: 0 },
  { emoji: "🎬", label: "Netflix", x: "78%", y: "12%", delay: 0.4 },
  { emoji: "🤖", label: "ChatGPT", x: "82%", y: "58%", delay: 0.9 },
  { emoji: "🎮", label: "PlayStation", x: "10%", y: "68%", delay: 1.3 },
  { emoji: "📺", label: "Disney+", x: "65%", y: "78%", delay: 1.8 },
  { emoji: "🍎", label: "Apple", x: "35%", y: "42%", delay: 0.6 },
  { emoji: "🎧", label: "YouTube", x: "55%", y: "30%", delay: 1.1 },
];

function IllustrationSide({ language }: { language: "en" | "ar" | "fr" }) {
  const tagline = {
    en: "Start your global access journey.",
    ar: "ابدأ رحلتك نحو وصول عالمي.",
    fr: "Commencez votre voyage d'acces mondial.",
  };

  return (
    <div className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-navy via-navy-light to-navy overflow-hidden items-center justify-center">
      {/* Gradient orbs */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,170,0.4) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(212,164,69,0.4) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,170,0.3) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,170,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating service bubbles */}
      {floatingServices.map((service, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          style={{ left: service.x, top: service.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            y: [0, -10, 0],
            scale: 1,
          }}
          transition={{
            opacity: {
              duration: 3.5,
              repeat: Infinity,
              delay: service.delay,
            },
            y: {
              duration: 4.5,
              repeat: Infinity,
              delay: service.delay,
              ease: "easeInOut",
            },
            scale: { duration: 0.5, delay: service.delay },
          }}
        >
          <span className="text-lg">{service.emoji}</span>
          <span className="text-xs text-white/70 font-medium">
            {service.label}
          </span>
        </motion.div>
      ))}

      {/* Center content */}
      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal to-teal-dark mb-6">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">Redeemly</h2>
          <p className="text-lg text-gray-400 mb-8">{tagline[language]}</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-8"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-white">2,847+</div>
            <div className="text-xs text-gray-500">
              {language === "ar"
                ? "مستخدم"
                : language === "fr"
                ? "Utilisateurs"
                : "Users"}
            </div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">15K+</div>
            <div className="text-xs text-gray-500">
              {language === "ar"
                ? "طلب"
                : language === "fr"
                ? "Commandes"
                : "Orders"}
            </div>
          </div>
        </motion.div>

        {/* Trust features on illustration side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          {[
            {
              icon: Shield,
              text: {
                en: "Bank-level security",
                ar: "أمان بمستوى البنوك",
                fr: "Securite bancaire",
              },
            },
            {
              icon: Sparkles,
              text: {
                en: "Instant delivery",
                ar: "توصيل فوري",
                fr: "Livraison instantanee",
              },
            },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <feature.icon size={14} className="text-teal" />
              <span className="text-sm text-gray-400">
                {feature.text[language]}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  const [fullName, setFullName] = useState("");
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
    if (phone.length < 8 || fullName.trim().length < 2) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  const isOtpComplete = otp.every((d) => d !== "");
  const isFormValid = fullName.trim().length >= 2 && phone.length >= 8;

  return (
    <div
      className="min-h-screen flex"
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Left side - Form */}
      <div
        className={cn(
          "w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12",
          isDark ? "bg-navy" : "bg-warm-white"
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: rtl ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="md:hidden mb-8 flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span
              className={cn(
                "text-xl font-bold",
                isDark ? "text-white" : "text-navy"
              )}
            >
              Redeemly
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={cn(
                "text-3xl font-bold mb-2",
                isDark ? "text-white" : "text-navy"
              )}
            >
              {t("auth.signup", language)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "text-base",
                isDark ? "text-gray-400" : "text-gray-500"
              )}
            >
              {t("auth.signupSubtitle", language)}
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {!otpSent ? (
              <motion.div
                key="form-step"
                initial={{ opacity: 0, x: rtl ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: rtl ? -20 : 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Full name input */}
                <div className="mb-4">
                  <label
                    className={cn(
                      "block text-sm font-medium mb-2",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}
                  >
                    {t("auth.name", language)}
                  </label>
                  <div
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-4 py-3 transition-all focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20",
                      isDark
                        ? "bg-white/5 border-white/10"
                        : "bg-white border-gray-200"
                    )}
                  >
                    <User
                      size={18}
                      className={isDark ? "text-gray-400" : "text-gray-500"}
                    />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={
                        language === "ar"
                          ? "محمد عبد الله"
                          : language === "fr"
                          ? "Mohamed Abdallah"
                          : "Mohamed Abdallah"
                      }
                      className={cn(
                        "flex-1 bg-transparent outline-none text-base",
                        isDark
                          ? "text-white placeholder:text-gray-600"
                          : "text-navy placeholder:text-gray-400"
                      )}
                    />
                  </div>
                </div>

                {/* Phone input */}
                <div className="mb-6">
                  <label
                    className={cn(
                      "block text-sm font-medium mb-2",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}
                  >
                    {t("auth.phone", language)}
                  </label>
                  <div
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-4 py-3 transition-all focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20",
                      isDark
                        ? "bg-white/5 border-white/10"
                        : "bg-white border-gray-200"
                    )}
                  >
                    <Phone
                      size={18}
                      className={isDark ? "text-gray-400" : "text-gray-500"}
                    />
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}
                    >
                      +222
                    </span>
                    <div
                      className={cn(
                        "w-px h-5",
                        isDark ? "bg-white/10" : "bg-gray-200"
                      )}
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 8))
                      }
                      placeholder="XX XX XX XX"
                      className={cn(
                        "flex-1 bg-transparent outline-none text-base",
                        isDark
                          ? "text-white placeholder:text-gray-600"
                          : "text-navy placeholder:text-gray-400"
                      )}
                    />
                  </div>
                </div>

                {/* Send Code button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendOtp}
                  disabled={!isFormValid || loading}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold text-white transition-all",
                    isFormValid
                      ? "bg-gradient-to-r from-teal to-teal-dark hover:shadow-lg hover:shadow-teal/25"
                      : "bg-gray-600 cursor-not-allowed opacity-60"
                  )}
                >
                  {loading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <>
                      {t("auth.sendOtp", language)}
                      <ArrowRight
                        size={18}
                        className={rtl ? "rotate-180" : ""}
                      />
                    </>
                  )}
                </motion.button>

                {/* Trust badges */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  {[
                    {
                      icon: Shield,
                      text: {
                        en: "Your data is encrypted",
                        ar: "بياناتك مشفرة",
                        fr: "Vos donnees sont chiffrees",
                      },
                    },
                    {
                      icon: Check,
                      text: {
                        en: "No credit card required",
                        ar: "لا حاجة لبطاقة ائتمان",
                        fr: "Aucune carte de credit requise",
                      },
                    },
                  ].map((badge, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center gap-1.5 text-xs",
                        isDark ? "text-gray-500" : "text-gray-400"
                      )}
                    >
                      <badge.icon size={13} className="text-teal" />
                      <span>{badge.text[language]}</span>
                    </div>
                  ))}
                </div>
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
                <div
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl mb-6",
                    isDark ? "bg-teal/10" : "bg-teal/5"
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-teal" />
                  </div>
                  <p
                    className={cn(
                      "text-sm",
                      isDark ? "text-gray-300" : "text-gray-600"
                    )}
                  >
                    {language === "ar"
                      ? `تم إرسال رمز التحقق إلى +222 ${phone}`
                      : language === "fr"
                      ? `Code envoy\u00e9 au +222 ${phone}`
                      : `Code sent to +222 ${phone}`}
                  </p>
                </div>

                {/* OTP label */}
                <label
                  className={cn(
                    "block text-sm font-medium mb-3",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  {t("auth.otp", language)}
                </label>

                {/* OTP inputs */}
                <div
                  className={cn(
                    "flex gap-3 mb-6",
                    rtl ? "flex-row-reverse" : ""
                  )}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={cn(
                        "w-12 h-14 text-center text-xl font-bold rounded-xl border outline-none transition-all",
                        "focus:border-teal focus:ring-2 focus:ring-teal/20",
                        digit
                          ? "border-teal bg-teal/5"
                          : isDark
                          ? "bg-white/5 border-white/10"
                          : "bg-white border-gray-200",
                        isDark ? "text-white" : "text-navy"
                      )}
                    />
                  ))}
                </div>

                {/* Verify button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerify}
                  disabled={!isOtpComplete || loading}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold text-white transition-all",
                    isOtpComplete
                      ? "bg-gradient-to-r from-teal to-teal-dark hover:shadow-lg hover:shadow-teal/25"
                      : "bg-gray-600 cursor-not-allowed opacity-60"
                  )}
                >
                  {loading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <>
                      {t("auth.verify", language)}
                      <ArrowRight
                        size={18}
                        className={rtl ? "rotate-180" : ""}
                      />
                    </>
                  )}
                </motion.button>

                {/* Back to form */}
                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp(["", "", "", "", "", ""]);
                  }}
                  className={cn(
                    "w-full text-center text-sm mt-4 transition-colors",
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-navy"
                  )}
                >
                  {language === "ar"
                    ? "تغيير رقم الهاتف"
                    : language === "fr"
                    ? "Changer le num\u00e9ro"
                    : "Change phone number"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div
              className={cn(
                "flex-1 h-px",
                isDark ? "bg-white/10" : "bg-gray-200"
              )}
            />
            <span
              className={cn(
                "text-xs",
                isDark ? "text-gray-500" : "text-gray-400"
              )}
            >
              {language === "ar" ? "او" : language === "fr" ? "ou" : "or"}
            </span>
            <div
              className={cn(
                "flex-1 h-px",
                isDark ? "bg-white/10" : "bg-gray-200"
              )}
            />
          </div>

          {/* Link to login */}
          <p
            className={cn(
              "text-center text-sm",
              isDark ? "text-gray-400" : "text-gray-500"
            )}
          >
            {t("auth.hasAccount", language)}{" "}
            <Link
              href="/login"
              className="text-teal hover:underline font-semibold"
            >
              {t("nav.login", language)}
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Illustration */}
      <IllustrationSide language={language} />
    </div>
  );
}
