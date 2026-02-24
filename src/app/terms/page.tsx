"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const content = {
  title: { en: "Terms of Service", ar: "شروط الخدمة", fr: "Conditions d'utilisation" },
  updated: { en: "Last updated: February 2026", ar: "آخر تحديث: فبراير 2026", fr: "Dernière mise à jour : février 2026" },
  sections: {
    en: [
      {
        heading: "1. Acceptance of Terms",
        body: "By accessing or using Redeemly, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.",
      },
      {
        heading: "2. Services",
        body: "Redeemly provides digital gift cards and subscription codes for third-party services. We act as a reseller and are not affiliated with the service providers whose products we sell.",
      },
      {
        heading: "3. Payments",
        body: "All payments are processed through local e-wallet providers (Bankily, Sedad, Masrivi, BimBank). Prices are quoted in Mauritanian Ouguiya (MRU). Transactions are final once a code has been delivered.",
      },
      {
        heading: "4. Delivery",
        body: "Digital codes are delivered via WhatsApp and your dashboard within 5 – 30 minutes of payment confirmation. Delivery times may vary during peak periods.",
      },
      {
        heading: "5. Refunds",
        body: "Due to the digital nature of our products, refunds are only issued if a code is invalid or already used and Redeemly is unable to provide a replacement within a reasonable time.",
      },
      {
        heading: "6. Prohibited Use",
        body: "You may not use Redeemly for any unlawful purpose, resale without authorization, or any activity that disrupts the platform or third-party services.",
      },
      {
        heading: "7. Limitation of Liability",
        body: "Redeemly is not liable for any indirect or consequential damages arising from the use of our platform or the digital products we resell.",
      },
      {
        heading: "8. Changes to Terms",
        body: "We may update these terms at any time. Continued use of the platform after changes are posted constitutes acceptance of the new terms.",
      },
      {
        heading: "9. Contact",
        body: "For questions about these terms, contact us on WhatsApp or through our support channels.",
      },
    ],
    ar: [
      {
        heading: "١. قبول الشروط",
        body: "باستخدامك لـ Redeemly، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق، يرجى عدم استخدام منصتنا.",
      },
      {
        heading: "٢. الخدمات",
        body: "تقدم Redeemly بطاقات هدايا رقمية ورموز اشتراك لخدمات طرف ثالث. نحن نعمل كموزع ولسنا تابعين لمزودي الخدمات التي نبيعها.",
      },
      {
        heading: "٣. المدفوعات",
        body: "تتم معالجة جميع المدفوعات عبر محافظ إلكترونية محلية (Bankily، Sedad، Masrivi، BimBank). الأسعار محددة بالأوقية الموريتانية (MRU). المعاملات نهائية بمجرد تسليم الرمز.",
      },
      {
        heading: "٤. التسليم",
        body: "تُسلَّم الرموز الرقمية عبر الواتساب ولوحة التحكم خلال 5-30 دقيقة من تأكيد الدفع. قد تتفاوت أوقات التسليم خلال فترات الذروة.",
      },
      {
        heading: "٥. الاسترداد",
        body: "نظراً للطبيعة الرقمية لمنتجاتنا، تُصدر المبالغ المستردة فقط إذا كان الرمز غير صالح أو مستخدماً مسبقاً ولم تتمكن Redeemly من توفير بديل في وقت معقول.",
      },
      {
        heading: "٦. الاستخدام المحظور",
        body: "لا يجوز استخدام Redeemly لأي غرض غير قانوني أو لإعادة البيع دون إذن أو أي نشاط يعطل المنصة.",
      },
      {
        heading: "٧. حدود المسؤولية",
        body: "لا تتحمل Redeemly المسؤولية عن أي أضرار غير مباشرة أو تبعية ناجمة عن استخدام منصتنا أو المنتجات الرقمية التي نبيعها.",
      },
      {
        heading: "٨. تغييرات الشروط",
        body: "يجوز لنا تحديث هذه الشروط في أي وقت. يُعدّ الاستمرار في استخدام المنصة بعد نشر التغييرات قبولاً للشروط الجديدة.",
      },
      {
        heading: "٩. التواصل",
        body: "لأي استفسارات حول هذه الشروط، تواصل معنا عبر الواتساب أو قنوات الدعم.",
      },
    ],
    fr: [
      {
        heading: "1. Acceptation des conditions",
        body: "En utilisant Redeemly, vous acceptez d'être lié par ces conditions. Si vous n'êtes pas d'accord, veuillez ne pas utiliser notre plateforme.",
      },
      {
        heading: "2. Services",
        body: "Redeemly fournit des cartes cadeaux numériques et des codes d'abonnement pour des services tiers. Nous agissons en tant que revendeur et ne sommes pas affiliés aux prestataires de services.",
      },
      {
        heading: "3. Paiements",
        body: "Tous les paiements sont traités via des portefeuilles électroniques locaux (Bankily, Sedad, Masrivi, BimBank). Les prix sont en Ouguiya mauritanien (MRU). Les transactions sont définitives une fois le code livré.",
      },
      {
        heading: "4. Livraison",
        body: "Les codes numériques sont livrés via WhatsApp et votre tableau de bord dans les 5 à 30 minutes suivant la confirmation du paiement.",
      },
      {
        heading: "5. Remboursements",
        body: "En raison de la nature numérique de nos produits, les remboursements ne sont accordés que si un code est invalide ou déjà utilisé et que Redeemly ne peut pas fournir de remplacement dans un délai raisonnable.",
      },
      {
        heading: "6. Utilisation interdite",
        body: "Vous ne pouvez pas utiliser Redeemly à des fins illégales, pour la revente non autorisée ou pour toute activité perturbant la plateforme.",
      },
      {
        heading: "7. Limitation de responsabilité",
        body: "Redeemly n'est pas responsable des dommages indirects ou consécutifs découlant de l'utilisation de notre plateforme.",
      },
      {
        heading: "8. Modifications des conditions",
        body: "Nous pouvons mettre à jour ces conditions à tout moment. L'utilisation continue de la plateforme après publication des modifications constitue une acceptation des nouvelles conditions.",
      },
      {
        heading: "9. Contact",
        body: "Pour toute question, contactez-nous via WhatsApp ou nos canaux de support.",
      },
    ],
  },
} as const;

export default function TermsPage() {
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);
  const sections = content.sections[language];

  return (
    <div
      className={cn("min-h-screen", isDark ? "bg-[#131313]" : "bg-sand")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-28 sm:pt-36 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-copper mb-3">
            Redeemly
          </p>
          <h1
            className={cn(
              "font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl leading-tight",
              isDark ? "text-sand" : "text-rich-black"
            )}
          >
            {content.title[language]}
          </h1>
          <p className={cn("mt-3 text-sm", isDark ? "text-sand/40" : "text-rich-black/40")}>
            {content.updated[language]}
          </p>
          <div className="rule-gold mt-6" />
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4, ease }}
            >
              <h2
                className={cn(
                  "text-base font-semibold mb-2",
                  isDark ? "text-sand" : "text-rich-black"
                )}
              >
                {section.heading}
              </h2>
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  isDark ? "text-sand/60" : "text-rich-black/60"
                )}
              >
                {section.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
