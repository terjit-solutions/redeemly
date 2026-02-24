"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, Clock, TrendingUp, ArrowRight, X } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { t, isRTL } from "@/lib/translations";
import { cn, formatMRU } from "@/lib/utils";
import { services, categories, type ServiceCategory, type Service, getPopularServices } from "@/data/services";

type FilterCategory = "all" | ServiceCategory;

function ServiceCard({ service, language, isDark, rtl, index }: {
  service: Service;
  language: "en" | "ar" | "fr";
  isDark: boolean;
  rtl: boolean;
  index: number;
}) {
  const cheapestPlan = service.plans.reduce((min, p) =>
    p.priceMRU < min.priceMRU ? p : min
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Link href={`/catalog/${service.slug}`} className="block group h-full">
        <div
          className={cn(
            "relative h-full p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden",
            isDark
              ? "bg-card-dark border border-border-dark hover:border-teal/30"
              : "bg-white border border-gray-100 hover:border-teal/20 shadow-sm hover:shadow-lg"
          )}
        >
          {/* Brand accent */}
          <div
            className="absolute top-0 left-0 right-0 h-1 opacity-60"
            style={{ background: `linear-gradient(to right, ${service.brandColor}, ${service.brandColorLight})` }}
          />

          <div className="flex items-start justify-between mb-3">
            <div className="text-3xl">{service.icon}</div>
            {service.popular && (
              <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-teal/10 text-teal">
                <TrendingUp size={10} />
                {language === "ar" ? "شائع" : language === "fr" ? "Populaire" : "Popular"}
              </span>
            )}
          </div>

          <h3 className={cn("text-lg font-bold mb-1.5", isDark ? "text-white" : "text-navy")}>
            {service.name}
          </h3>

          <p className={cn("text-sm mb-4 line-clamp-2 leading-relaxed", isDark ? "text-gray-400" : "text-gray-500")}>
            {language === "ar" ? service.descriptionAr : language === "fr" ? service.descriptionFr : service.description}
          </p>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <Star size={13} className="text-gold fill-gold" />
              <span className={cn("text-sm font-medium", isDark ? "text-gray-300" : "text-gray-600")}>
                {service.rating}
              </span>
              <span className={cn("text-xs", isDark ? "text-gray-600" : "text-gray-400")}>
                ({service.reviewCount})
              </span>
            </div>
            <span className={cn("text-xs", isDark ? "text-gray-700" : "text-gray-300")}>|</span>
            <div className="flex items-center gap-1">
              <Clock size={12} className={isDark ? "text-gray-500" : "text-gray-400"} />
              <span className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
                {service.deliveryTime}
              </span>
            </div>
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-dashed" style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
            <div>
              <span className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
                {t("pricing.from", language)}
              </span>
              <div className={cn("text-xl font-bold", isDark ? "text-white" : "text-navy")}>
                {formatMRU(cheapestPlan.priceMRU)}
              </div>
            </div>
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isDark ? "text-teal group-hover:text-teal-light" : "text-teal-dark group-hover:text-teal"
            )}>
              {t("catalog.viewPlans", language)}
              <ArrowRight size={14} className={cn("transition-transform group-hover:translate-x-1", rtl && "rotate-180 group-hover:-translate-x-1")} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  const filteredServices = useMemo(() => {
    let result = services;
    if (activeCategory !== "all") {
      result = result.filter((s) => s.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.descriptionAr.includes(searchQuery) ||
          s.descriptionFr.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const popular = getPopularServices();
  const showPopular = activeCategory === "all" && !searchQuery;

  const categoryEntries: { key: FilterCategory; label: string; emoji?: string }[] = [
    { key: "all", label: t("catalog.all", language) },
    ...Object.entries(categories).map(([key, val]) => ({
      key: key as ServiceCategory,
      label: language === "ar" ? val.nameAr : language === "fr" ? val.nameFr : val.name,
      emoji: val.emoji,
    })),
  ];

  return (
    <div className={cn("min-h-screen page-enter", isDark ? "bg-navy" : "bg-warm-white")} dir={rtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className={cn("border-b", isDark ? "border-white/5" : "border-black/5")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className={cn("text-3xl sm:text-4xl md:text-5xl font-bold", isDark ? "text-white" : "text-navy")}>
              {t("catalog.title", language)}
            </h1>
            <p className={cn("mt-4 text-lg", isDark ? "text-gray-400" : "text-gray-500")}>
              {t("catalog.subtitle", language)}
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 max-w-xl mx-auto"
          >
            <div className={cn(
              "relative flex items-center rounded-xl overflow-hidden",
              isDark
                ? "bg-white/5 border border-white/10 focus-within:border-teal/40"
                : "bg-white border border-gray-200 focus-within:border-teal/40 shadow-sm"
            )}>
              <Search size={18} className={cn("mx-4 flex-shrink-0", isDark ? "text-gray-500" : "text-gray-400")} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("catalog.search", language)}
                className={cn(
                  "flex-1 py-3.5 bg-transparent text-base outline-none placeholder:text-gray-500",
                  isDark ? "text-white" : "text-navy"
                )}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={cn("p-2 mx-2 rounded-lg transition-colors", isDark ? "hover:bg-white/10" : "hover:bg-black/5")}
                >
                  <X size={16} className={isDark ? "text-gray-400" : "text-gray-500"} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex items-center justify-center gap-2 flex-wrap"
          >
            {categoryEntries.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeCategory === cat.key
                    ? "bg-teal/10 text-teal border border-teal/20"
                    : isDark
                      ? "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                      : "text-gray-500 hover:text-navy hover:bg-black/5 border border-transparent"
                )}
              >
                {cat.emoji && <span className="mr-1.5">{cat.emoji}</span>}
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular section */}
        {showPopular && (
          <div className="mb-12">
            <h2 className={cn("text-xl font-bold mb-6 flex items-center gap-2", isDark ? "text-white" : "text-navy")}>
              <TrendingUp size={20} className="text-teal" />
              {t("catalog.popular", language)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popular.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  language={language}
                  isDark={isDark}
                  rtl={rtl}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}

        {/* All services / filtered */}
        <div>
          {!showPopular && (
            <h2 className={cn("text-xl font-bold mb-6", isDark ? "text-white" : "text-navy")}>
              {filteredServices.length} {language === "ar" ? "خدمة" : language === "fr" ? "services" : "services"}
              {searchQuery && (
                <span className={cn("font-normal text-base ml-2", isDark ? "text-gray-500" : "text-gray-400")}>
                  {language === "ar" ? `لـ "${searchQuery}"` : language === "fr" ? `pour "${searchQuery}"` : `for "${searchQuery}"`}
                </span>
              )}
            </h2>
          )}

          {showPopular && (
            <h2 className={cn("text-xl font-bold mb-6", isDark ? "text-white" : "text-navy")}>
              {language === "ar" ? "جميع الخدمات" : language === "fr" ? "Tous les services" : "All Services"}
            </h2>
          )}

          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  language={language}
                  isDark={isDark}
                  rtl={rtl}
                  index={i}
                />
              ))}
            </div>
          </AnimatePresence>

          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-4xl mb-4">🔍</div>
              <p className={cn("text-lg font-medium", isDark ? "text-gray-400" : "text-gray-500")}>
                {language === "ar" ? "لم يتم العثور على خدمات" : language === "fr" ? "Aucun service trouvé" : "No services found"}
              </p>
              <p className={cn("text-sm mt-2", isDark ? "text-gray-600" : "text-gray-400")}>
                {language === "ar" ? "جرب البحث بكلمات مختلفة" : language === "fr" ? "Essayez avec d'autres mots-clés" : "Try different search terms"}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
