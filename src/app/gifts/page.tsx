"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, ArrowRight, Heart, Send, Sparkles, X, Phone, Mail, UserCheck, EyeOff } from "lucide-react";
import { useAppStore, useCheckoutStore } from "@/stores/app-store";
import type { GiftDetails } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";

/* ------------------------------------------------------------------ */
/*  Copy — trilingual                                                  */
/* ------------------------------------------------------------------ */

const copy = {
  eyebrow: { en: "PERFECT FOR ANYONE", ar: "مثالي لأي شخص", fr: "PARFAIT POUR TOUS" },
  title: { en: "Gift a subscription", ar: "أهدِ اشتراكاً", fr: "Offrez un abonnement" },
  subtitle: {
    en: "Surprise someone special with their favorite digital service. We deliver the code — they enjoy it instantly.",
    ar: "فاجئ شخصاً مميزاً بخدمته الرقمية المفضلة. نحن نسلم الرمز — وهم يستمتعون به فوراً.",
    fr: "Surprenez quelqu'un de spécial avec son service numérique préféré. Nous livrons le code — ils en profitent instantanément.",
  },
  howTitle: { en: "How gifting works", ar: "كيف تعمل الهدايا", fr: "Comment ça marche" },
  step1: { en: "Choose a gift", ar: "اختر هدية", fr: "Choisissez un cadeau" },
  step1Desc: { en: "Pick a service and plan from our catalog", ar: "اختر خدمة وخطة من كتالوجنا", fr: "Choisissez un service et un plan" },
  step2: { en: "We deliver the code", ar: "نسلم الرمز", fr: "Nous livrons le code" },
  step2Desc: { en: "Pay with your e-wallet, get the code in minutes", ar: "ادفع بمحفظتك، احصل على الرمز في دقائق", fr: "Payez avec votre e-wallet, recevez le code" },
  step3: { en: "They enjoy it", ar: "يستمتعون به", fr: "Ils en profitent" },
  step3Desc: { en: "Share the code — instant activation, pure joy", ar: "شارك الرمز — تفعيل فوري، فرحة خالصة", fr: "Partagez le code — activation instantanée" },
  giftCards: { en: "Gift Cards", ar: "بطاقات الهدايا", fr: "Cartes Cadeaux" },
  subscriptions: { en: "Subscription Gifts", ar: "هدايا الاشتراكات", fr: "Abonnements Cadeaux" },
  from: { en: "From", ar: "ابتداءً من", fr: "À partir de" },
  viewPlans: { en: "View Plans", ar: "عرض الخطط", fr: "Voir les plans" },
  // Modal copy
  modalTitle: { en: "Gift Details", ar: "تفاصيل الهدية", fr: "Détails du cadeau" },
  modalSubtitle: {
    en: "Tell us who receives this gift and who it's from.",
    ar: "أخبرنا من يستلم هذه الهدية ومن أين هي.",
    fr: "Dites-nous qui reçoit ce cadeau et de la part de qui.",
  },
  recipientLabel: { en: "Recipient's phone or email", ar: "هاتف المستلم أو بريده الإلكتروني", fr: "Téléphone ou e-mail du destinataire" },
  recipientPlaceholder: { en: "e.g. +222 XX XX XX XX or email@...", ar: "مثال: 222+ XX XX XX XX أو بريد إلكتروني", fr: "Ex. +222 XX XX XX XX ou email@..." },
  fromLabel: { en: "From", ar: "من", fr: "De la part de" },
  fromPlaceholder: { en: "Your name", ar: "اسمك", fr: "Votre prénom" },
  anonymousLabel: { en: "Send anonymously", ar: "إرسال بشكل مجهول", fr: "Envoyer anonymement" },
  continueBtn: { en: "Continue to checkout", ar: "المتابعة إلى الدفع", fr: "Continuer vers le paiement" },
  cancel: { en: "Cancel", ar: "إلغاء", fr: "Annuler" },
} as const;

/* ------------------------------------------------------------------ */
/*  Gift-friendly services                                             */
/* ------------------------------------------------------------------ */

const giftCardServices = services.filter((s) => s.category === "appstore");
const subscriptionGifts = services.filter(
  (s) => s.popular || ["spotify", "netflix", "chatgpt-plus", "roblox", "ps-plus", "disney-plus"].includes(s.id)
);

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const steps = [
  { icon: Gift, color: "#C4713B" },
  { icon: Send, color: "#C9A84C" },
  { icon: Heart, color: "#2D3A6D" },
];

/* ------------------------------------------------------------------ */
/*  Gift Modal                                                         */
/* ------------------------------------------------------------------ */

interface GiftModalProps {
  service: typeof services[0];
  language: "en" | "ar" | "fr";
  isDark: boolean;
  rtl: boolean;
  onClose: () => void;
  onConfirm: (details: GiftDetails, slug: string) => void;
}

function GiftModal({ service, language, isDark, rtl, onClose, onConfirm }: GiftModalProps) {
  const [recipient, setRecipient] = useState("");
  const [fromName, setFromName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Auto-detect contact type: contains @ → email, otherwise phone
  const isEmail = recipient.includes("@");

  const canSubmit = recipient.trim().length > 3;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onConfirm(
      { recipientContact: recipient.trim(), fromName: isAnonymous ? "" : fromName.trim(), isAnonymous },
      service.slug
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.28, ease: luxuryEase }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8",
          isDark ? "bg-[#1C1C1C] border border-gold/[0.1]" : "bg-white border border-rich-black/[0.06]"
        )}
        dir={rtl ? "rtl" : "ltr"}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
            isDark ? "text-sand/40 hover:text-sand hover:bg-white/5" : "text-rich-black/30 hover:text-rich-black hover:bg-rich-black/5"
          )}
        >
          <X size={18} />
        </button>

        {/* Service badge */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: service.brandColor + "20" }}>
            {service.icon}
          </div>
          <div>
            <p className={cn("text-xs font-semibold uppercase tracking-widest text-copper")}>
              {copy.modalTitle[language]}
            </p>
            <p className={cn("font-semibold text-sm", isDark ? "text-sand" : "text-rich-black")}>
              {service.name}
            </p>
          </div>
        </div>

        <p className={cn("text-sm mb-6", isDark ? "text-sand/50" : "text-rich-black/50")}>
          {copy.modalSubtitle[language]}
        </p>

        {/* Recipient field */}
        <div className="mb-5">
          <label className={cn("block text-xs font-semibold mb-2 uppercase tracking-wide", isDark ? "text-sand/60" : "text-rich-black/50")}>
            {copy.recipientLabel[language]}
          </label>
          <div className="relative">
            <div className={cn("absolute top-1/2 -translate-y-1/2 pointer-events-none", rtl ? "right-3" : "left-3")}>
              {isEmail
                ? <Mail size={15} className={isDark ? "text-sand/30" : "text-rich-black/30"} />
                : <Phone size={15} className={isDark ? "text-sand/30" : "text-rich-black/30"} />
              }
            </div>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={copy.recipientPlaceholder[language]}
              className={cn(
                "w-full rounded-xl border px-10 py-3 text-sm outline-none transition-all",
                "focus:border-copper focus:ring-2 focus:ring-copper/15",
                isDark
                  ? "bg-[#252525] border-gold/[0.1] text-sand placeholder:text-sand/25"
                  : "bg-sand/40 border-rich-black/[0.08] text-rich-black placeholder:text-rich-black/30",
                rtl ? "text-right" : "text-left"
              )}
            />
          </div>
        </div>

        {/* From field */}
        <div className="mb-5">
          <label className={cn("block text-xs font-semibold mb-2 uppercase tracking-wide", isDark ? "text-sand/60" : "text-rich-black/50")}>
            {copy.fromLabel[language]}
          </label>
          <div className="relative">
            <div className={cn("absolute top-1/2 -translate-y-1/2 pointer-events-none", rtl ? "right-3" : "left-3")}>
              {isAnonymous
                ? <EyeOff size={15} className={isDark ? "text-sand/20" : "text-rich-black/20"} />
                : <UserCheck size={15} className={isDark ? "text-sand/30" : "text-rich-black/30"} />
              }
            </div>
            <input
              type="text"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              disabled={isAnonymous}
              placeholder={isAnonymous ? (language === "ar" ? "مجهول" : language === "fr" ? "Anonyme" : "Anonymous") : copy.fromPlaceholder[language]}
              className={cn(
                "w-full rounded-xl border px-10 py-3 text-sm outline-none transition-all",
                "focus:border-copper focus:ring-2 focus:ring-copper/15",
                isAnonymous
                  ? isDark
                    ? "bg-[#1A1A1A] border-gold/[0.05] text-sand/20 cursor-not-allowed"
                    : "bg-rich-black/[0.03] border-rich-black/[0.04] text-rich-black/20 cursor-not-allowed"
                  : isDark
                    ? "bg-[#252525] border-gold/[0.1] text-sand placeholder:text-sand/25"
                    : "bg-sand/40 border-rich-black/[0.08] text-rich-black placeholder:text-rich-black/30",
                rtl ? "text-right" : "text-left"
              )}
            />
          </div>

          {/* Anonymous toggle */}
          <button
            onClick={() => setIsAnonymous((v) => !v)}
            className={cn("flex items-center gap-2 mt-2.5 text-xs", isDark ? "text-sand/40 hover:text-sand/70" : "text-rich-black/40 hover:text-rich-black/70")}
          >
            <div className={cn(
              "w-8 h-4.5 rounded-full relative transition-colors flex items-center px-0.5",
              "w-8 h-[18px]",
              isAnonymous ? "bg-copper" : isDark ? "bg-sand/10" : "bg-rich-black/10"
            )}>
              <motion.div
                animate={{ x: isAnonymous ? (rtl ? 0 : 13) : (rtl ? 13 : 0) }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-3.5 h-3.5 rounded-full bg-white shadow-sm"
              />
            </div>
            <span>{copy.anonymousLabel[language]}</span>
          </button>
        </div>

        {/* Actions */}
        <div className={cn("flex gap-3 mt-6", rtl && "flex-row-reverse")}>
          <button
            onClick={onClose}
            className={cn(
              "flex-1 py-3 rounded-xl text-sm font-semibold border transition-colors",
              isDark ? "border-gold/[0.1] text-sand/60 hover:text-sand hover:border-gold/20" : "border-rich-black/[0.08] text-rich-black/50 hover:text-rich-black hover:border-rich-black/20"
            )}
          >
            {copy.cancel[language]}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn(
              "flex-[2] py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all",
              canSubmit
                ? "bg-copper text-white hover:bg-copper/90 shadow-lg shadow-copper/20"
                : "opacity-40 cursor-not-allowed",
              isDark ? "" : "",
              rtl && "flex-row-reverse"
            )}
          >
            {copy.continueBtn[language]}
            <ArrowRight size={15} className={rtl ? "rotate-180" : ""} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function GiftsPage() {
  const router = useRouter();
  const { language, theme } = useAppStore();
  const { setGiftDetails } = useCheckoutStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const stepCopy = [
    { title: copy.step1[language], desc: copy.step1Desc[language] },
    { title: copy.step2[language], desc: copy.step2Desc[language] },
    { title: copy.step3[language], desc: copy.step3Desc[language] },
  ];

  const handleGiftConfirm = (details: GiftDetails, slug: string) => {
    setGiftDetails(details);
    setSelectedService(null);
    router.push(`/catalog/${slug}`);
  };

  return (
    <div className={cn("min-h-screen", isDark ? "bg-[#131313]" : "bg-sand")} dir={rtl ? "rtl" : "ltr"}>

      {/* ============ Hero ============ */}
      <section className="grain relative overflow-hidden pt-28 sm:pt-36 pb-12 sm:pb-16">
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, ease: luxuryEase }}
            className="text-xs font-semibold uppercase tracking-widest text-copper"
          >
            {copy.eyebrow[language]}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: luxuryEase }}
            className={cn(
              "mt-4 font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight",
              isDark ? "text-sand" : "text-rich-black"
            )}
          >
            {copy.title[language]}
            <Sparkles className="inline-block ml-3 text-copper" size={28} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ease: luxuryEase }}
            className={cn("mt-4 max-w-xl mx-auto text-base sm:text-lg leading-relaxed", isDark ? "text-sand/60" : "text-rich-black/60")}
          >
            {copy.subtitle[language]}
          </motion.p>
        </div>
      </section>

      {/* ============ How gifting works — 3 steps inline ============ */}
      <section className={cn("py-10 sm:py-14", isDark ? "bg-[#0D0D0D]" : "bg-charcoal")}>
        <div className="rule-gold" style={{ marginBottom: 0 }} />
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gold/70 mb-8">
            {copy.howTitle[language]}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: luxuryEase }}
                  className="text-center"
                >
                  <div
                    className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: step.color + "20" }}
                  >
                    <Icon size={22} style={{ color: step.color }} />
                  </div>
                  <p className="text-sand font-semibold text-sm">{stepCopy[i].title}</p>
                  <p className="text-sand/50 text-xs mt-1 leading-relaxed">{stepCopy[i].desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="rule-gold" style={{ marginTop: 0 }} />
      </section>

      {/* ============ Gift Cards section ============ */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            className="mb-8 sm:mb-10"
          >
            <h2 className={cn("font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl", isDark ? "text-sand" : "text-rich-black")}>
              {copy.giftCards[language]}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {giftCardServices.map((service, i) => {
              const cheapest = service.plans.reduce((min, p) => p.priceMRU < min.priceMRU ? p : min);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: luxuryEase }}
                >
                  <button
                    onClick={() => setSelectedService(service)}
                    className="group block w-full text-left"
                  >
                    <div className={cn(
                      "rounded-2xl overflow-hidden border transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl relative",
                      isDark ? "bg-[#1E1E1E] border-gold/[0.08]" : "bg-white border-rich-black/[0.06] shadow-sm"
                    )}>
                      {/* Accent bar */}
                      <div className="h-1 w-full group-hover:h-1.5 transition-all duration-300" style={{ backgroundColor: service.brandColor }} />

                      {/* Gift badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <div className="w-7 h-7 rounded-full bg-copper/10 flex items-center justify-center">
                          <Gift size={14} className="text-copper" />
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: service.brandColor + "15" }}>
                          {service.icon}
                        </div>

                        <h3 className={cn("font-semibold text-lg mt-3", isDark ? "text-sand" : "text-rich-black")}>
                          {service.name}
                        </h3>
                        <p className={cn("text-sm mt-1 line-clamp-2", isDark ? "text-sand/50" : "text-rich-black/50")}>
                          {language === "ar" ? service.descriptionAr : language === "fr" ? service.descriptionFr : service.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {service.plans.map((plan) => (
                            <span
                              key={plan.id}
                              className={cn("text-[11px] px-2 py-0.5 rounded-full", isDark ? "bg-sand/[0.05] text-sand/50" : "bg-rich-black/[0.04] text-rich-black/50")}
                            >
                              {plan.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={cn(
                        "px-5 sm:px-6 pb-5 sm:pb-6 pt-3 flex items-center justify-between",
                        isDark ? "border-t border-gold/[0.06]" : "border-t border-rich-black/[0.04]"
                      )}>
                        <span className={cn("text-sm", isDark ? "text-sand/50" : "text-rich-black/50")}>
                          {copy.from[language]}{" "}
                          <span className={cn("font-semibold", isDark ? "text-sand" : "text-rich-black")}>
                            {cheapest.priceMRU.toLocaleString()} MRU
                          </span>
                        </span>
                        <ArrowRight size={16} className={cn("text-copper transition-transform group-hover:translate-x-1", rtl && "rotate-180 group-hover:-translate-x-1")} />
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ Subscription Gifts section ============ */}
      <section className={cn("py-14 sm:py-20", isDark ? "bg-[#1A1A1A]" : "bg-sand-dark")}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            className="mb-8 sm:mb-10"
          >
            <h2 className={cn("font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl", isDark ? "text-sand" : "text-rich-black")}>
              {copy.subscriptions[language]}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {subscriptionGifts.map((service, i) => {
              const cheapest = service.plans.reduce((min, p) => p.priceMRU < min.priceMRU ? p : min);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: luxuryEase }}
                >
                  <button
                    onClick={() => setSelectedService(service)}
                    className="group block w-full text-left h-full"
                  >
                    <div className={cn(
                      "h-full rounded-2xl overflow-hidden border transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl relative",
                      isDark ? "bg-[#1E1E1E] border-gold/[0.08]" : "bg-white border-rich-black/[0.06] shadow-sm"
                    )}>
                      {/* Accent bar */}
                      <div className="h-1 w-full group-hover:h-1.5 transition-all duration-300" style={{ backgroundColor: service.brandColor }} />

                      {/* Gift badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <div className="w-6 h-6 rounded-full bg-copper/10 flex items-center justify-center">
                          <Gift size={12} className="text-copper" />
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: service.brandColor + "15" }}>
                          {service.icon}
                        </div>

                        <h3 className={cn("font-semibold mt-3", isDark ? "text-sand" : "text-rich-black")}>
                          {service.name}
                        </h3>
                        <p className={cn("text-xs mt-1", isDark ? "text-sand/40" : "text-rich-black/40")}>
                          {service.deliveryTime} delivery
                        </p>
                      </div>

                      <div className={cn(
                        "px-4 sm:px-5 pb-4 sm:pb-5 pt-2 flex items-center justify-between",
                        isDark ? "border-t border-gold/[0.06]" : "border-t border-rich-black/[0.04]"
                      )}>
                        <span className={cn("text-xs", isDark ? "text-sand/50" : "text-rich-black/50")}>
                          {copy.from[language]}{" "}
                          <span className={cn("font-semibold text-sm", isDark ? "text-sand" : "text-rich-black")}>
                            {cheapest.priceMRU.toLocaleString()} MRU
                          </span>
                        </span>
                        <ArrowRight size={14} className={cn("text-copper/50 group-hover:text-copper transition-all group-hover:translate-x-1", rtl && "rotate-180 group-hover:-translate-x-1")} />
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-14 sm:py-20 text-center">
        <div className="mx-auto max-w-2xl px-5">
          <p className={cn("text-base sm:text-lg", isDark ? "text-sand/60" : "text-rich-black/60")}>
            {language === "ar" ? "لم تجد ما تبحث عنه؟" : language === "fr" ? "Vous ne trouvez pas ce que vous cherchez ?" : "Can't find what you're looking for?"}
          </p>
          <a
            href="/catalog"
            className="inline-flex items-center gap-2 mt-4 text-copper font-medium hover:underline underline-offset-4"
          >
            {language === "ar" ? "تصفح الكتالوج الكامل" : language === "fr" ? "Parcourir le catalogue complet" : "Browse the full catalog"}
            <ArrowRight size={16} className={rtl ? "rotate-180" : ""} />
          </a>
        </div>
      </section>

      {/* ============ Gift Modal ============ */}
      <AnimatePresence>
        {selectedService && (
          <GiftModal
            service={selectedService}
            language={language}
            isDark={isDark}
            rtl={rtl}
            onClose={() => setSelectedService(null)}
            onConfirm={handleGiftConfirm}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
