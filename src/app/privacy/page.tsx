"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/stores/app-store";
import { isRTL } from "@/lib/translations";
import { cn } from "@/lib/utils";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const content = {
  title: { en: "Privacy Policy", ar: "سياسة الخصوصية", fr: "Politique de confidentialité" },
  updated: { en: "Last updated: February 2026", ar: "آخر تحديث: فبراير 2026", fr: "Dernière mise à jour : février 2026" },
  sections: {
    en: [
      {
        heading: "1. Information We Collect",
        body: "We collect the phone number or email you provide when placing an order, along with your payment reference number. We do not store payment credentials or card details.",
      },
      {
        heading: "2. How We Use Your Information",
        body: "Your contact information is used solely to deliver your digital code and to provide order support. We do not use it for marketing without your consent.",
      },
      {
        heading: "3. Sharing of Information",
        body: "We do not sell, trade, or share your personal information with third parties, except as required to fulfill your order (e.g., verifying a payment transaction).",
      },
      {
        heading: "4. Data Retention",
        body: "Order records are retained for up to 12 months to assist with support requests. You may request deletion of your data by contacting us directly.",
      },
      {
        heading: "5. Cookies",
        body: "Redeemly uses minimal session cookies to maintain your language and theme preferences. No tracking or advertising cookies are used.",
      },
      {
        heading: "6. Security",
        body: "We take reasonable measures to protect your data. However, no method of electronic transmission is 100% secure, and we cannot guarantee absolute security.",
      },
      {
        heading: "7. Children's Privacy",
        body: "Redeemly is not directed at children under 13. We do not knowingly collect personal information from children.",
      },
      {
        heading: "8. Changes to This Policy",
        body: "We may update this Privacy Policy periodically. We will notify users of significant changes by posting a notice on our platform.",
      },
      {
        heading: "9. Contact",
        body: "If you have questions about this policy or your personal data, please reach us via WhatsApp or our support channels.",
      },
    ],
    ar: [
      {
        heading: "١. المعلومات التي نجمعها",
        body: "نجمع رقم الهاتف أو البريد الإلكتروني الذي تقدمه عند تقديم طلب، إلى جانب رقم مرجع الدفع. لا نخزن بيانات الدفع أو تفاصيل البطاقات.",
      },
      {
        heading: "٢. كيف نستخدم معلوماتك",
        body: "تُستخدم معلومات الاتصال الخاصة بك فقط لتسليم رمزك الرقمي وتقديم دعم الطلبات. لا نستخدمها للتسويق دون موافقتك.",
      },
      {
        heading: "٣. مشاركة المعلومات",
        body: "لا نبيع أو نتاجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة، إلا ما هو ضروري لتنفيذ طلبك (مثل التحقق من معاملة الدفع).",
      },
      {
        heading: "٤. الاحتفاظ بالبيانات",
        body: "تُحتفظ بسجلات الطلبات لمدة تصل إلى 12 شهراً لمساعدتك في طلبات الدعم. يمكنك طلب حذف بياناتك بالتواصل معنا مباشرة.",
      },
      {
        heading: "٥. ملفات تعريف الارتباط",
        body: "تستخدم Redeemly ملفات تعريف ارتباط جلسة محدودة للحفاظ على تفضيلات اللغة والمظهر. لا تُستخدم ملفات تعريف ارتباط للتتبع أو الإعلانات.",
      },
      {
        heading: "٦. الأمان",
        body: "نتخذ تدابير معقولة لحماية بياناتك. غير أنه لا توجد طريقة إرسال إلكترونية آمنة بنسبة 100%.",
      },
      {
        heading: "٧. خصوصية الأطفال",
        body: "Redeemly غير موجه للأطفال دون سن 13. لا نجمع عن قصد معلومات شخصية من الأطفال.",
      },
      {
        heading: "٨. تغييرات هذه السياسة",
        body: "قد نحدث سياسة الخصوصية هذه دورياً. سنخطر المستخدمين بالتغييرات الجوهرية عبر إشعار على المنصة.",
      },
      {
        heading: "٩. التواصل",
        body: "إذا كان لديك أي استفسارات حول هذه السياسة أو بياناتك الشخصية، تواصل معنا عبر الواتساب أو قنوات الدعم.",
      },
    ],
    fr: [
      {
        heading: "1. Informations collectées",
        body: "Nous collectons le numéro de téléphone ou l'e-mail fourni lors d'une commande, ainsi que votre référence de paiement. Nous ne stockons pas vos identifiants de paiement.",
      },
      {
        heading: "2. Utilisation de vos informations",
        body: "Vos coordonnées sont utilisées uniquement pour livrer votre code numérique et fournir un support. Nous ne les utilisons pas à des fins marketing sans votre consentement.",
      },
      {
        heading: "3. Partage des informations",
        body: "Nous ne vendons, n'échangeons ni ne partageons vos informations personnelles avec des tiers, sauf pour exécuter votre commande (ex. vérification d'une transaction de paiement).",
      },
      {
        heading: "4. Conservation des données",
        body: "Les historiques de commandes sont conservés jusqu'à 12 mois pour les demandes de support. Vous pouvez demander la suppression de vos données en nous contactant directement.",
      },
      {
        heading: "5. Cookies",
        body: "Redeemly utilise des cookies de session minimaux pour mémoriser vos préférences de langue et de thème. Aucun cookie de suivi ou publicitaire n'est utilisé.",
      },
      {
        heading: "6. Sécurité",
        body: "Nous prenons des mesures raisonnables pour protéger vos données. Cependant, aucune transmission électronique n'est sécurisée à 100%.",
      },
      {
        heading: "7. Protection des mineurs",
        body: "Redeemly n'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants.",
      },
      {
        heading: "8. Modifications de cette politique",
        body: "Nous pouvons mettre à jour cette politique périodiquement. Les modifications importantes seront signalées par un avis sur notre plateforme.",
      },
      {
        heading: "9. Contact",
        body: "Pour toute question sur cette politique ou vos données, contactez-nous via WhatsApp ou nos canaux de support.",
      },
    ],
  },
} as const;

export default function PrivacyPage() {
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
