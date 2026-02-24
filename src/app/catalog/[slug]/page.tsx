"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, Shield, ArrowRight, ArrowLeft, Check, Package } from "lucide-react";
import { useAppStore, useCheckoutStore, CartItem } from "@/stores/app-store";
import { t, isRTL } from "@/lib/translations";
import { cn, formatMRU } from "@/lib/utils";
import { getServiceBySlug, services, type ServicePlan } from "@/data/services";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

function getRedemptionSteps(deliveryMethod: string, language: "en" | "ar" | "fr") {
  const steps: Record<string, { title: string; desc: string }[]> = {
    en: [
      { title: "Select your plan", desc: "Choose the plan that suits your needs and proceed to checkout." },
      { title: "Pay with your e-wallet", desc: "Send MRU via Bankily, Sedad, Masrivi, or BimBank to our merchant account." },
      { title: "Receive your code", desc: `We'll send your ${deliveryMethod.toLowerCase()} via WhatsApp and your dashboard within minutes.` },
      { title: "Activate & enjoy", desc: "Redeem your code on the service platform and start enjoying immediately." },
    ],
    ar: [
      { title: "اختر خطتك", desc: "اختر الخطة التي تناسب احتياجاتك وانتقل إلى الدفع." },
      { title: "ادفع بمحفظتك الإلكترونية", desc: "أرسل أوقية عبر بنكلي أو سداد أو مصرفي أو بيم بنك إلى حسابنا التجاري." },
      { title: "استلم رمزك", desc: "سنرسل لك الرمز عبر الواتساب ولوحة التحكم خلال دقائق." },
      { title: "فعّل واستمتع", desc: "استخدم الرمز على منصة الخدمة وابدأ بالاستمتاع فوراً." },
    ],
    fr: [
      { title: "Choisissez votre plan", desc: "Sélectionnez le plan adapté à vos besoins et passez au paiement." },
      { title: "Payez avec votre e-wallet", desc: "Envoyez des MRU via Bankily, Sedad, Masrivi ou BimBank vers notre compte marchand." },
      { title: "Recevez votre code", desc: "Nous vous enverrons votre code via WhatsApp et votre tableau de bord en quelques minutes." },
      { title: "Activez et profitez", desc: "Utilisez votre code sur la plateforme du service et profitez-en immédiatement." },
    ],
  };
  return steps[language] || steps.en;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const service = getServiceBySlug(slug);

  const { language, theme } = useAppStore();
  const { setCart } = useCheckoutStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const BackArrow = rtl ? ArrowRight : ArrowLeft;
  const ForwardArrow = rtl ? ArrowLeft : ArrowRight;

  // 404 state
  if (!service) {
    return (
      <div
        className={cn("min-h-screen flex items-center justify-center", isDark ? "bg-navy" : "bg-warm-white")}
        dir={rtl ? "rtl" : "ltr"}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-6"
        >
          <div className="text-6xl mb-6">🔍</div>
          <h1 className={cn("text-3xl font-bold mb-3", isDark ? "text-white" : "text-navy")}>
            {language === "ar" ? "الخدمة غير موجودة" : language === "fr" ? "Service introuvable" : "Service Not Found"}
          </h1>
          <p className={cn("text-base mb-8", isDark ? "text-gray-400" : "text-gray-500")}>
            {language === "ar"
              ? "لم نتمكن من العثور على الخدمة التي تبحث عنها."
              : language === "fr"
                ? "Nous n'avons pas pu trouver le service que vous recherchez."
                : "We couldn't find the service you're looking for."}
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal to-teal-dark text-white font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <BackArrow size={16} />
            {language === "ar" ? "العودة للكتالوج" : language === "fr" ? "Retour au catalogue" : "Back to Catalog"}
          </Link>
        </motion.div>
      </div>
    );
  }

  const localizedDescription =
    language === "ar" ? service.descriptionAr : language === "fr" ? service.descriptionFr : service.description;

  const localizedDeliveryMethod =
    language === "ar" ? service.deliveryMethodAr : language === "fr" ? service.deliveryMethodFr : service.deliveryMethod;

  const redemptionSteps = getRedemptionSteps(service.deliveryMethod, language);

  // Related services: same category, exclude current, take 3
  const relatedServices = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  function getPlanName(plan: ServicePlan) {
    return language === "ar" ? plan.nameAr : language === "fr" ? plan.nameFr : plan.name;
  }

  function getPlanDuration(plan: ServicePlan) {
    return language === "ar" ? plan.durationAr : language === "fr" ? plan.durationFr : plan.duration;
  }

  function handleSelectPlan(plan: ServicePlan) {
    if (!service) return;
    const item: CartItem = {
      serviceId: service.id,
      serviceName: service.name,
      planId: plan.id,
      planName: plan.name,
      priceMRU: plan.priceMRU,
      priceUSD: plan.priceUSD,
    };
    setCart(item);
    router.push("/checkout");
  }

  return (
    <div className={cn("min-h-screen page-enter", isDark ? "bg-navy" : "bg-warm-white")} dir={rtl ? "rtl" : "ltr"}>
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden">
        {/* Gradient background accent */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${service.brandColor}, transparent)`,
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(to right, ${service.brandColor}, ${service.brandColorLight})` }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16">
          {/* Back button */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <Link
              href="/catalog"
              className={cn(
                "inline-flex items-center gap-2 text-sm font-medium mb-8 px-4 py-2 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                isDark
                  ? "text-gray-400 hover:text-white bg-white/5 hover:bg-white/10"
                  : "text-gray-500 hover:text-navy bg-black/5 hover:bg-black/10"
              )}
            >
              <BackArrow size={16} />
              {language === "ar" ? "العودة للكتالوج" : language === "fr" ? "Retour au catalogue" : "Back to Catalog"}
            </Link>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
            {/* Icon & Info */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="flex-1">
              <div className="flex items-center gap-5 mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                  style={{
                    background: `linear-gradient(135deg, ${service.brandColor}20, ${service.brandColorLight}10)`,
                    border: `1px solid ${service.brandColor}30`,
                  }}
                >
                  {service.icon}
                </div>
                <div>
                  <h1 className={cn("text-3xl sm:text-4xl font-bold", isDark ? "text-white" : "text-navy")}>
                    {service.name}
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Star size={15} className="text-gold fill-gold" />
                      <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-navy")}>
                        {service.rating}
                      </span>
                      <span className={cn("text-sm", isDark ? "text-gray-500" : "text-gray-400")}>
                        ({service.reviewCount} {t("catalog.reviews", language)})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className={cn("text-base sm:text-lg leading-relaxed max-w-2xl mb-6", isDark ? "text-gray-300" : "text-gray-600")}>
                {localizedDescription}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium",
                    isDark ? "bg-white/5 text-gray-300 border border-white/10" : "bg-white text-gray-600 border border-gray-100 shadow-sm"
                  )}
                >
                  <Clock size={15} className="text-teal" />
                  {t("service.estimatedTime", language)}: {service.deliveryTime}
                </div>
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium",
                    isDark ? "bg-white/5 text-gray-300 border border-white/10" : "bg-white text-gray-600 border border-gray-100 shadow-sm"
                  )}
                >
                  <Package size={15} className="text-teal" />
                  {t("service.deliveryMethod", language)}: {localizedDeliveryMethod}
                </div>
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium",
                    isDark ? "bg-white/5 text-gray-300 border border-white/10" : "bg-white text-gray-600 border border-gray-100 shadow-sm"
                  )}
                >
                  <Shield size={15} className="text-teal" />
                  {language === "ar" ? "مضمون 100%" : language === "fr" ? "100% Garanti" : "100% Guaranteed"}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Plans Section ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className={cn("text-2xl sm:text-3xl font-bold mb-8", isDark ? "text-white" : "text-navy")}
        >
          {t("service.plans", language)}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {service.plans.map((plan, i) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <motion.div
                key={plan.id}
                custom={3 + i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className={cn(
                  "relative rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
                  isDark
                    ? "bg-card-dark border border-border-dark"
                    : "bg-white border border-gray-100 shadow-sm",
                  isSelected && "ring-2 ring-teal border-teal/40",
                  plan.popular && !isSelected && (isDark ? "border-gold/30" : "border-gold/40")
                )}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gold to-yellow-500 text-navy shadow-lg">
                      <Star size={10} className="fill-navy" />
                      {t("service.mostPopular", language)}
                    </span>
                  </div>
                )}

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  </div>
                )}

                <div className={cn("mb-4", plan.popular && "mt-2")}>
                  <h3 className={cn("text-base font-semibold mb-1", isDark ? "text-white" : "text-navy")}>
                    {getPlanName(plan)}
                  </h3>
                  <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
                    {getPlanDuration(plan)}
                  </p>
                </div>

                <div className="mb-5">
                  <div className={cn("text-3xl font-bold", isDark ? "text-white" : "text-navy")}>
                    {formatMRU(plan.priceMRU)}
                  </div>
                  <div className={cn("text-sm mt-1", isDark ? "text-gray-500" : "text-gray-400")}>
                    ${plan.priceUSD.toFixed(2)} USD
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan);
                  }}
                  className={cn(
                    "w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                    isSelected
                      ? "bg-gradient-to-r from-teal to-teal-dark text-white shadow-lg shadow-teal/20"
                      : isDark
                        ? "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                        : "bg-gray-50 text-navy border border-gray-200 hover:bg-gray-100"
                  )}
                >
                  <span className="flex items-center justify-center gap-2">
                    {t("service.select", language)}
                    <ForwardArrow size={14} />
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== How to Redeem Section ===== */}
      <section
        className={cn(
          "border-t border-b",
          isDark ? "border-white/5 bg-white/[0.01]" : "border-black/5 bg-black/[0.01]"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={cn("text-2xl sm:text-3xl font-bold mb-10", isDark ? "text-white" : "text-navy")}
          >
            {t("service.howToRedeem", language)}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {redemptionSteps.map((step, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={cn(
                  "relative rounded-2xl p-6 transition-all duration-300",
                  isDark
                    ? "bg-card-dark border border-border-dark"
                    : "bg-white border border-gray-100 shadow-sm"
                )}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${service.brandColor}20, ${service.brandColorLight}10)`,
                    color: service.brandColor,
                    border: `1px solid ${service.brandColor}25`,
                  }}
                >
                  {i + 1}
                </div>
                <h3 className={cn("text-base font-semibold mb-2", isDark ? "text-white" : "text-navy")}>
                  {step.title}
                </h3>
                <p className={cn("text-sm leading-relaxed", isDark ? "text-gray-400" : "text-gray-500")}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Related Services Section ===== */}
      {relatedServices.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={cn("text-2xl sm:text-3xl font-bold mb-8", isDark ? "text-white" : "text-navy")}
          >
            {t("service.related", language)}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((related, i) => {
              const cheapest = related.plans.reduce((min, p) =>
                p.priceMRU < min.priceMRU ? p : min
              );
              const relatedDesc =
                language === "ar" ? related.descriptionAr : language === "fr" ? related.descriptionFr : related.description;

              return (
                <motion.div
                  key={related.id}
                  custom={i + 1}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Link href={`/catalog/${related.slug}`} className="block group">
                    <div
                      className={cn(
                        "relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] overflow-hidden",
                        isDark
                          ? "bg-card-dark border border-border-dark hover:border-teal/30"
                          : "bg-white border border-gray-100 hover:border-teal/20 shadow-sm hover:shadow-lg"
                      )}
                    >
                      <div
                        className="absolute top-0 left-0 right-0 h-1 opacity-60"
                        style={{ background: `linear-gradient(to right, ${related.brandColor}, ${related.brandColorLight})` }}
                      />

                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${related.brandColor}20, ${related.brandColorLight}10)`,
                            border: `1px solid ${related.brandColor}30`,
                          }}
                        >
                          {related.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className={cn("text-base font-bold truncate", isDark ? "text-white" : "text-navy")}>
                            {related.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-gold fill-gold" />
                            <span className={cn("text-xs font-medium", isDark ? "text-gray-300" : "text-gray-600")}>
                              {related.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className={cn("text-sm line-clamp-2 mb-4 leading-relaxed", isDark ? "text-gray-400" : "text-gray-500")}>
                        {relatedDesc}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-dashed" style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
                        <div>
                          <span className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
                            {language === "ar" ? "ابتداءً من" : language === "fr" ? "A partir de" : "From"}
                          </span>
                          <div className={cn("text-lg font-bold", isDark ? "text-white" : "text-navy")}>
                            {formatMRU(cheapest.priceMRU)}
                          </div>
                        </div>
                        <div
                          className={cn(
                            "flex items-center gap-1 text-sm font-medium",
                            isDark ? "text-teal group-hover:text-teal-light" : "text-teal-dark group-hover:text-teal"
                          )}
                        >
                          {language === "ar" ? "عرض الخطط" : language === "fr" ? "Voir les plans" : "View Plans"}
                          <ForwardArrow
                            size={14}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
