"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { t, isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { useAnimateInView } from "@/hooks/useAnimateInView";

const faqs = [
  {
    q: { en: "How does Redeemly work?", ar: "كيف يعمل ريدملي؟", fr: "Comment fonctionne Redeemly ?" },
    a: {
      en: "Redeemly acts as a bridge between your local Mauritanian e-wallet and international digital services. You browse our catalog, choose a service, pay in MRU using your preferred e-wallet (Bankily, Sedad, Masrivi, or BimBank), and we deliver your subscription code or activate your account within minutes.",
      ar: "ريدملي يعمل كجسر بين محفظتك الإلكترونية المحلية الموريتانية والخدمات الرقمية العالمية. تتصفح كتالوجنا، تختار خدمة، تدفع بالأوقية عبر محفظتك المفضلة (بنكلي أو سداد أو مصرفي أو بيم بنك)، ونحن نسلمك رمز الاشتراك أو نفعّل حسابك خلال دقائق.",
      fr: "Redeemly fait le pont entre votre portefeuille électronique mauritanien et les services numériques internationaux. Vous parcourez notre catalogue, choisissez un service, payez en MRU avec votre e-wallet préféré, et nous livrons votre code d'abonnement en quelques minutes.",
    },
  },
  {
    q: { en: "Is it safe to use?", ar: "هل الاستخدام آمن؟", fr: "Est-ce sûr à utiliser ?" },
    a: {
      en: "Absolutely. Every transaction is manually verified by our team. Your payment information is encrypted, and we never store your e-wallet credentials. We've processed over 15,000 orders with a 99.8% success rate.",
      ar: "بالتأكيد. كل معاملة يتم التحقق منها يدوياً من قبل فريقنا. معلومات الدفع مشفرة، ولا نخزن أبداً بيانات محفظتك الإلكترونية. قمنا بمعالجة أكثر من 15,000 طلب بنسبة نجاح 99.8%.",
      fr: "Absolument. Chaque transaction est vérifiée manuellement par notre équipe. Vos informations de paiement sont cryptées et nous ne stockons jamais vos identifiants. Nous avons traité plus de 15 000 commandes avec un taux de réussite de 99,8%.",
    },
  },
  {
    q: { en: "How long does delivery take?", ar: "كم يستغرق التسليم؟", fr: "Combien de temps prend la livraison ?" },
    a: {
      en: "Most orders are fulfilled within 5-30 minutes during business hours. Some services may take up to 60 minutes. You'll receive real-time status updates in your dashboard and via WhatsApp.",
      ar: "معظم الطلبات تُنفذ خلال 5-30 دقيقة خلال ساعات العمل. بعض الخدمات قد تستغرق حتى 60 دقيقة. ستتلقى تحديثات حالة فورية في لوحة التحكم وعبر الواتساب.",
      fr: "La plupart des commandes sont traitées en 5-30 minutes pendant les heures de bureau. Certains services peuvent prendre jusqu'à 60 minutes. Vous recevrez des mises à jour en temps réel.",
    },
  },
  {
    q: { en: "What payment methods do you accept?", ar: "ما طرق الدفع المقبولة؟", fr: "Quels moyens de paiement acceptez-vous ?" },
    a: {
      en: "We accept all major Mauritanian e-wallets: Bankily, Sedad, Masrivi, and BimBank. Simply transfer MRU to our merchant account and enter the last 6 digits of your transaction code to confirm.",
      ar: "نقبل جميع المحافظ الإلكترونية الموريتانية الرئيسية: بنكلي وسداد ومصرفي وبيم بنك. ببساطة قم بتحويل الأوقية إلى حسابنا التجاري وأدخل آخر 6 أرقام من رمز المعاملة للتأكيد.",
      fr: "Nous acceptons tous les principaux portefeuilles mauritaniens : Bankily, Sedad, Masrivi et BimBank. Transférez simplement des MRU à notre compte marchand.",
    },
  },
  {
    q: { en: "What if my order has an issue?", ar: "ماذا لو كان هناك مشكلة في طلبي؟", fr: "Et si ma commande a un problème ?" },
    a: {
      en: "Our support team is available via WhatsApp for quick resolution. If there's any issue with your code or activation, we'll either provide a replacement or a full refund. Customer satisfaction is our top priority.",
      ar: "فريق الدعم لدينا متاح عبر الواتساب لحل سريع. إذا كان هناك أي مشكلة في الرمز أو التفعيل، سنوفر بديلاً أو استرداداً كاملاً. رضا العملاء هو أولويتنا القصوى.",
      fr: "Notre équipe support est disponible via WhatsApp. En cas de problème avec votre code, nous fournirons un remplacement ou un remboursement complet.",
    },
  },
  {
    q: { en: "Are the prices in MRU final?", ar: "هل الأسعار بالأوقية نهائية؟", fr: "Les prix en MRU sont-ils définitifs ?" },
    a: {
      en: "Yes! The MRU price you see is the final price you pay. No hidden fees, no surprises. We update our exchange rates daily to ensure fair pricing based on the current USD/MRU rate (approximately 1 USD = 39 MRU).",
      ar: "نعم! السعر بالأوقية الذي تراه هو السعر النهائي الذي تدفعه. لا رسوم خفية، لا مفاجآت. نحدّث أسعار الصرف يومياً لضمان تسعير عادل (تقريباً 1 دولار = 39 أوقية).",
      fr: "Oui ! Le prix en MRU affiché est le prix final. Pas de frais cachés. Nous mettons à jour nos taux de change quotidiennement (environ 1 USD = 39 MRU).",
    },
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);
  const { ref, isInView } = useAnimateInView();

  return (
    <section
      className={cn("py-24 sm:py-32", isDark ? "bg-navy" : "bg-warm-white")}
      dir={rtl ? "rtl" : "ltr"}
      ref={ref}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={cn("text-3xl sm:text-4xl md:text-5xl font-bold", isDark ? "text-white" : "text-navy")}>
            {t("faq.title", language)}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={cn(
                  "w-full flex items-center justify-between p-5 rounded-xl text-left transition-all duration-200",
                  isDark
                    ? openIndex === i
                      ? "bg-card-dark border border-teal/20"
                      : "bg-card-dark border border-border-dark hover:border-white/10"
                    : openIndex === i
                      ? "bg-white border border-teal/20 shadow-md"
                      : "bg-white border border-gray-100 hover:border-gray-200 shadow-sm"
                )}
              >
                <span className={cn(
                  "text-base font-semibold pr-4",
                  isDark ? "text-white" : "text-navy"
                )}>
                  {faq.q[language]}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} className={cn(isDark ? "text-gray-400" : "text-gray-500")} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={cn(
                      "px-5 pb-5 pt-3 text-sm leading-relaxed",
                      isDark ? "text-gray-400" : "text-gray-500"
                    )}>
                      {faq.a[language]}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
