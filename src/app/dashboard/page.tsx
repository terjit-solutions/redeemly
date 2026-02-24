"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAppStore } from "@/stores/app-store";
import { t, isRTL } from "@/lib/translations";
import { cn, formatMRU } from "@/lib/utils";
import {
  mockOrders,
  orderStatusConfig,
  type Order,
  type OrderStatus,
} from "@/data/mock-orders";
import {
  Package,
  Clock,
  CheckCircle2,
  TrendingUp,
  Eye,
  EyeOff,
  RotateCcw,
  ArrowRight,
  Bell,
  CreditCard,
  ShoppingBag,
  Copy,
  Check,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getGreeting(language: "en" | "ar" | "fr"): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return language === "ar"
      ? "صباح الخير"
      : language === "fr"
        ? "Bonjour"
        : "Good morning";
  }
  if (hour < 18) {
    return language === "ar"
      ? "مساء الخير"
      : language === "fr"
        ? "Bon après-midi"
        : "Good afternoon";
  }
  return language === "ar"
    ? "مساء الخير"
    : language === "fr"
      ? "Bonsoir"
      : "Good evening";
}

function formatDate(iso: string, language: "en" | "ar" | "fr"): string {
  const date = new Date(iso);
  const locale =
    language === "ar" ? "ar-EG" : language === "fr" ? "fr-FR" : "en-US";
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(iso: string, language: "en" | "ar" | "fr"): string {
  const date = new Date(iso);
  const locale =
    language === "ar" ? "ar-EG" : language === "fr" ? "fr-FR" : "en-US";
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getRenewalDate(createdAt: string): Date {
  const d = new Date(createdAt);
  d.setDate(d.getDate() + 30);
  return d;
}

function getStatusLabel(
  status: OrderStatus,
  language: "en" | "ar" | "fr"
): string {
  const cfg = orderStatusConfig[status];
  if (language === "ar") return cfg.labelAr;
  if (language === "fr") return cfg.labelFr;
  return cfg.label;
}

// ---------------------------------------------------------------------------
// Skeleton loader (shown briefly on mount)
// ---------------------------------------------------------------------------

function DashboardSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header skeleton */}
      <div className="mb-10">
        <div
          className={cn(
            "skeleton h-8 w-48 mb-2",
            isDark ? "bg-white/5" : "bg-black/5"
          )}
        />
        <div
          className={cn(
            "skeleton h-5 w-64",
            isDark ? "bg-white/5" : "bg-black/5"
          )}
        />
      </div>
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "skeleton h-28 rounded-2xl",
              isDark ? "bg-white/5" : "bg-black/5"
            )}
          />
        ))}
      </div>
      {/* Subscription skeleton */}
      <div
        className={cn(
          "skeleton h-44 rounded-2xl mb-10",
          isDark ? "bg-white/5" : "bg-black/5"
        )}
      />
      {/* Table skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "skeleton h-16 rounded-xl",
              isDark ? "bg-white/5" : "bg-black/5"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------

function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  value,
  label,
  isDark,
  index,
}: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  isDark: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
      className={cn(
        "relative p-5 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]",
        isDark
          ? "bg-card-dark border border-border-dark"
          : "bg-white border border-gray-100 shadow-sm"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
          style={{ background: iconBg }}
        >
          <Icon size={20} style={{ color: iconColor }} />
        </div>
        <div className="min-w-0">
          <div
            className={cn(
              "text-2xl font-bold leading-tight",
              isDark ? "text-white" : "text-navy"
            )}
          >
            {value}
          </div>
          <div
            className={cn(
              "text-sm mt-0.5",
              isDark ? "text-gray-400" : "text-gray-500"
            )}
          >
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Active subscription card
// ---------------------------------------------------------------------------

function SubscriptionCard({
  order,
  language,
  isDark,
  rtl,
  index,
}: {
  order: Order;
  language: "en" | "ar" | "fr";
  isDark: boolean;
  rtl: boolean;
  index: number;
}) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const renewal = getRenewalDate(order.createdAt);

  const handleCopy = () => {
    if (order.redemptionCode) {
      navigator.clipboard.writeText(order.redemptionCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
      className={cn(
        "relative p-5 rounded-2xl overflow-hidden transition-all duration-300",
        isDark
          ? "bg-card-dark border border-border-dark hover:border-teal/30"
          : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
      )}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-70"
        style={{
          background: `linear-gradient(to right, ${orderStatusConfig.delivered.color}, ${orderStatusConfig.delivered.color}88)`,
        }}
      />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: orderStatusConfig.delivered.color }}
          />
          <div className="min-w-0">
            <h4
              className={cn(
                "font-bold truncate",
                isDark ? "text-white" : "text-navy"
              )}
            >
              {order.serviceName}
            </h4>
            <p
              className={cn(
                "text-sm truncate",
                isDark ? "text-gray-400" : "text-gray-500"
              )}
            >
              {order.planName}
            </p>
          </div>
        </div>
      </div>

      {/* Renewal date */}
      <div
        className={cn(
          "flex items-center gap-2 text-sm mb-4",
          isDark ? "text-gray-400" : "text-gray-500"
        )}
      >
        <Clock size={14} />
        <span>
          {language === "ar"
            ? "التجديد:"
            : language === "fr"
              ? "Renouvellement:"
              : "Renewal:"}{" "}
          {formatDate(renewal.toISOString(), language)}
        </span>
      </div>

      {/* Redemption code reveal */}
      <AnimatePresence>
        {showCode && order.redemptionCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "flex items-center gap-2 p-3 rounded-xl mb-4 font-mono text-sm",
                isDark ? "bg-white/5" : "bg-gray-50"
              )}
            >
              <span
                className={cn(
                  "flex-1 truncate",
                  isDark ? "text-teal-light" : "text-teal-dark"
                )}
              >
                {order.redemptionCode}
              </span>
              <button
                onClick={handleCopy}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg transition-colors flex-shrink-0",
                  isDark ? "hover:bg-white/10" : "hover:bg-gray-200"
                )}
                title={
                  language === "ar"
                    ? "نسخ"
                    : language === "fr"
                      ? "Copier"
                      : "Copy"
                }
              >
                {copied ? (
                  <Check size={14} className="text-teal" />
                ) : (
                  <Copy
                    size={14}
                    className={isDark ? "text-gray-400" : "text-gray-500"}
                  />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          href="/catalog"
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]",
            isDark
              ? "bg-white/5 text-gray-300 border border-white/10 hover:border-teal/30 hover:text-white"
              : "bg-gray-50 text-gray-600 border border-gray-100 hover:border-teal/30 hover:text-navy"
          )}
        >
          <RotateCcw size={14} />
          {t("dashboard.quickReorder", language)}
        </Link>
        <button
          onClick={() => setShowCode((prev) => !prev)}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]",
            showCode
              ? "bg-teal/10 text-teal border border-teal/20"
              : isDark
                ? "bg-white/5 text-gray-300 border border-white/10 hover:border-teal/30 hover:text-white"
                : "bg-gray-50 text-gray-600 border border-gray-100 hover:border-teal/30 hover:text-navy"
          )}
        >
          {showCode ? <EyeOff size={14} /> : <Eye size={14} />}
          {t("dashboard.viewCode", language)}
        </button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------

function StatusBadge({
  status,
  language,
}: {
  status: OrderStatus;
  language: "en" | "ar" | "fr";
}) {
  const cfg = orderStatusConfig[status];
  const isPulse = status === "pending" || status === "processing";

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{
        color: cfg.color,
        backgroundColor: `${cfg.color}18`,
      }}
    >
      {isPulse && (
        <motion.span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: cfg.color }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {getStatusLabel(status, language)}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Order detail overlay
// ---------------------------------------------------------------------------

const statusTimeline: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "delivered",
];

function OrderDetailOverlay({
  order,
  language,
  isDark,
  onClose,
}: {
  order: Order;
  language: "en" | "ar" | "fr";
  isDark: boolean;
  onClose: () => void;
}) {
  const currentIdx = statusTimeline.indexOf(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0",
          isDark ? "bg-black/60 backdrop-blur-sm" : "bg-black/30 backdrop-blur-sm"
        )}
      />
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-lg rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]",
          isDark
            ? "bg-navy-light border border-border-dark"
            : "bg-white border border-gray-100 shadow-xl"
        )}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg transition-colors",
            isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"
          )}
        >
          &times;
        </button>

        <h3
          className={cn(
            "text-xl font-bold mb-1",
            isDark ? "text-white" : "text-navy"
          )}
        >
          {language === "ar"
            ? `طلب ${order.id}`
            : language === "fr"
              ? `Commande ${order.id}`
              : `Order ${order.id}`}
        </h3>
        <p className={cn("text-sm mb-6", isDark ? "text-gray-400" : "text-gray-500")}>
          {order.serviceName} &mdash; {order.planName}
        </p>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            {
              label:
                language === "ar"
                  ? "طريقة الدفع"
                  : language === "fr"
                    ? "Paiement"
                    : "Payment",
              value: order.paymentMethod,
            },
            {
              label:
                language === "ar"
                  ? "المبلغ"
                  : language === "fr"
                    ? "Montant"
                    : "Amount",
              value: formatMRU(order.totalMRU),
            },
            {
              label:
                language === "ar"
                  ? "تاريخ الطلب"
                  : language === "fr"
                    ? "Date"
                    : "Date",
              value: formatDateTime(order.createdAt, language),
            },
            {
              label:
                language === "ar"
                  ? "الحالة"
                  : language === "fr"
                    ? "Statut"
                    : "Status",
              value: null,
              badge: true,
            },
          ].map((item, i) => (
            <div key={i}>
              <div
                className={cn(
                  "text-xs mb-1",
                  isDark ? "text-gray-500" : "text-gray-400"
                )}
              >
                {item.label}
              </div>
              {item.badge ? (
                <StatusBadge status={order.status} language={language} />
              ) : (
                <div
                  className={cn(
                    "text-sm font-medium",
                    isDark ? "text-white" : "text-navy"
                  )}
                >
                  {item.value}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Status timeline */}
        <div className="mb-4">
          <h4
            className={cn(
              "text-sm font-semibold mb-4",
              isDark ? "text-gray-300" : "text-gray-700"
            )}
          >
            {language === "ar"
              ? "تقدم الطلب"
              : language === "fr"
                ? "Progression"
                : "Order Progress"}
          </h4>
          <div className="relative space-y-4">
            {statusTimeline.map((step, i) => {
              const isActive = !isCancelled && i <= currentIdx;
              const isCurrent = !isCancelled && i === currentIdx;
              const stepCfg = orderStatusConfig[step];
              return (
                <div key={step} className="flex items-start gap-3">
                  {/* Dot and line */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isCurrent ? [1, 1.2, 1] : 1,
                      }}
                      transition={
                        isCurrent
                          ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                          : undefined
                      }
                      className={cn(
                        "w-3 h-3 rounded-full flex-shrink-0 mt-0.5",
                        isActive ? "" : isDark ? "bg-white/10" : "bg-gray-200"
                      )}
                      style={
                        isActive
                          ? { backgroundColor: stepCfg.color }
                          : undefined
                      }
                    />
                    {i < statusTimeline.length - 1 && (
                      <div
                        className={cn(
                          "w-0.5 h-6 mt-1",
                          isActive && i < currentIdx
                            ? ""
                            : isDark
                              ? "bg-white/5"
                              : "bg-gray-100"
                        )}
                        style={
                          isActive && i < currentIdx
                            ? { backgroundColor: `${stepCfg.color}44` }
                            : undefined
                        }
                      />
                    )}
                  </div>
                  {/* Label */}
                  <div>
                    <div
                      className={cn(
                        "text-sm font-medium",
                        isActive
                          ? isDark
                            ? "text-white"
                            : "text-navy"
                          : isDark
                            ? "text-gray-600"
                            : "text-gray-300"
                      )}
                    >
                      {getStatusLabel(step, language)}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Cancelled state */}
            {isCancelled && (
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: orderStatusConfig.cancelled.color,
                    }}
                  />
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: orderStatusConfig.cancelled.color }}
                >
                  {getStatusLabel("cancelled", language)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Redemption code if delivered */}
        {order.status === "delivered" && order.redemptionCode && (
          <div
            className={cn(
              "mt-6 p-4 rounded-xl font-mono text-sm",
              isDark ? "bg-white/5 text-teal-light" : "bg-gray-50 text-teal-dark"
            )}
          >
            <div
              className={cn(
                "text-xs mb-2 font-sans font-medium",
                isDark ? "text-gray-500" : "text-gray-400"
              )}
            >
              {language === "ar"
                ? "رمز الاسترداد"
                : language === "fr"
                  ? "Code de remboursement"
                  : "Redemption Code"}
            </div>
            {order.redemptionCode}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main dashboard page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Simulate brief loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Computed data
  const totalOrders = mockOrders.length;
  const totalSpent = useMemo(
    () => mockOrders.reduce((sum, o) => sum + o.totalMRU, 0),
    []
  );
  const activeSubscriptions = useMemo(
    () => mockOrders.filter((o) => o.status === "delivered"),
    []
  );
  const pendingOrders = useMemo(
    () => mockOrders.filter((o) => o.status !== "delivered"),
    []
  );

  // ---------- Loading skeleton ----------
  if (isLoading) {
    return (
      <div
        className={cn("min-h-screen", isDark ? "bg-navy" : "bg-warm-white")}
        dir={rtl ? "rtl" : "ltr"}
      >
        <DashboardSkeleton isDark={isDark} />
      </div>
    );
  }

  return (
    <div
      className={cn("min-h-screen page-enter", isDark ? "bg-navy" : "bg-warm-white")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* ---------------------------------------------------------------- */}
        {/* Welcome header                                                   */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p
                className={cn(
                  "text-sm font-medium mb-1",
                  isDark ? "text-gray-500" : "text-gray-400"
                )}
              >
                {getGreeting(language)}
              </p>
              <h1
                className={cn(
                  "text-3xl sm:text-4xl font-bold",
                  isDark ? "text-white" : "text-navy"
                )}
              >
                {t("dashboard.welcome", language)},{" "}
                <span className="gradient-text">
                  {language === "ar" ? "أحمد" : "Ahmed"}
                </span>
              </h1>
            </div>

            {/* Notification bell */}
            <div className="flex items-center gap-3">
              <button
                className={cn(
                  "relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors",
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border border-white/10"
                    : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
                )}
              >
                <Bell
                  size={18}
                  className={isDark ? "text-gray-400" : "text-gray-500"}
                />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-teal border-2 border-navy" />
              </button>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal to-teal-dark hover:shadow-lg hover:shadow-teal/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingBag size={16} />
                {language === "ar"
                  ? "تصفح الكتالوج"
                  : language === "fr"
                    ? "Parcourir"
                    : "Browse Catalog"}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Stats cards                                                      */}
        {/* ---------------------------------------------------------------- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={Package}
            iconBg="rgba(0,212,170,0.12)"
            iconColor="#00D4AA"
            value={String(totalOrders)}
            label={t("dashboard.ordersCount", language)}
            isDark={isDark}
            index={0}
          />
          <StatCard
            icon={CreditCard}
            iconBg="rgba(212,164,69,0.12)"
            iconColor="#D4A445"
            value={formatMRU(totalSpent)}
            label={t("dashboard.totalSpent", language)}
            isDark={isDark}
            index={1}
          />
          <StatCard
            icon={CheckCircle2}
            iconBg="rgba(29,185,84,0.12)"
            iconColor="#1DB954"
            value={String(activeSubscriptions.length)}
            label={t("dashboard.activeSubscriptions", language)}
            isDark={isDark}
            index={2}
          />
          <StatCard
            icon={TrendingUp}
            iconBg="rgba(54,147,243,0.12)"
            iconColor="#3693F3"
            value={String(pendingOrders.length)}
            label={
              language === "ar"
                ? "الطلبات المعلقة"
                : language === "fr"
                  ? "Commandes en cours"
                  : "Pending Orders"
            }
            isDark={isDark}
            index={3}
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Active subscriptions                                             */}
        {/* ---------------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-12"
        >
          <h2
            className={cn(
              "text-xl font-bold mb-5 flex items-center gap-2",
              isDark ? "text-white" : "text-navy"
            )}
          >
            <CheckCircle2 size={20} className="text-teal" />
            {t("dashboard.activeSubscriptions", language)}
          </h2>

          {activeSubscriptions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeSubscriptions.map((order, i) => (
                <SubscriptionCard
                  key={order.id}
                  order={order}
                  language={language}
                  isDark={isDark}
                  rtl={rtl}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div
              className={cn(
                "text-center py-16 rounded-2xl",
                isDark
                  ? "bg-card-dark border border-border-dark"
                  : "bg-white border border-gray-100"
              )}
            >
              <Package
                size={40}
                className={cn(
                  "mx-auto mb-3",
                  isDark ? "text-gray-600" : "text-gray-300"
                )}
              />
              <p
                className={cn(
                  "font-medium",
                  isDark ? "text-gray-400" : "text-gray-500"
                )}
              >
                {language === "ar"
                  ? "لا توجد اشتراكات نشطة"
                  : language === "fr"
                    ? "Aucun abonnement actif"
                    : "No active subscriptions"}
              </p>
              <Link
                href="/catalog"
                className={cn(
                  "inline-flex items-center gap-1.5 mt-3 text-sm font-medium",
                  isDark ? "text-teal hover:text-teal-light" : "text-teal-dark hover:text-teal"
                )}
              >
                {language === "ar"
                  ? "تصفح الخدمات"
                  : language === "fr"
                    ? "Parcourir les services"
                    : "Browse services"}
                <ArrowRight
                  size={14}
                  className={cn(
                    "transition-transform group-hover:translate-x-1",
                    rtl && "rotate-180"
                  )}
                />
              </Link>
            </div>
          )}
        </motion.section>

        {/* ---------------------------------------------------------------- */}
        {/* Order history                                                    */}
        {/* ---------------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <h2
            className={cn(
              "text-xl font-bold mb-5 flex items-center gap-2",
              isDark ? "text-white" : "text-navy"
            )}
          >
            <Clock size={20} className="text-gold" />
            {t("dashboard.orderHistory", language)}
          </h2>

          {mockOrders.length > 0 ? (
            <>
              {/* ---- Desktop table ---- */}
              <div className="hidden md:block">
                <div
                  className={cn(
                    "rounded-2xl overflow-hidden",
                    isDark
                      ? "bg-card-dark border border-border-dark"
                      : "bg-white border border-gray-100 shadow-sm"
                  )}
                >
                  {/* Header row */}
                  <div
                    className={cn(
                      "grid grid-cols-7 gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-wider",
                      isDark
                        ? "text-gray-500 border-b border-white/5"
                        : "text-gray-400 border-b border-gray-50"
                    )}
                  >
                    <div>
                      {language === "ar"
                        ? "رقم الطلب"
                        : language === "fr"
                          ? "N"
                          : "Order ID"}
                    </div>
                    <div>
                      {language === "ar"
                        ? "الخدمة"
                        : language === "fr"
                          ? "Service"
                          : "Service"}
                    </div>
                    <div>
                      {language === "ar"
                        ? "الخطة"
                        : language === "fr"
                          ? "Plan"
                          : "Plan"}
                    </div>
                    <div>
                      {language === "ar"
                        ? "الحالة"
                        : language === "fr"
                          ? "Statut"
                          : "Status"}
                    </div>
                    <div>
                      {language === "ar"
                        ? "الدفع"
                        : language === "fr"
                          ? "Paiement"
                          : "Payment"}
                    </div>
                    <div>
                      {language === "ar"
                        ? "المبلغ"
                        : language === "fr"
                          ? "Montant"
                          : "Amount"}
                    </div>
                    <div>
                      {language === "ar"
                        ? "التاريخ"
                        : language === "fr"
                          ? "Date"
                          : "Date"}
                    </div>
                  </div>

                  {/* Rows */}
                  {mockOrders.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                      onClick={() => setSelectedOrder(order)}
                      className={cn(
                        "grid grid-cols-7 gap-4 items-center px-6 py-4 cursor-pointer transition-colors",
                        isDark
                          ? "hover:bg-white/[0.03] border-b border-white/5 last:border-b-0"
                          : "hover:bg-gray-50/80 border-b border-gray-50 last:border-b-0"
                      )}
                    >
                      <div
                        className={cn(
                          "text-sm font-medium",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}
                      >
                        {order.id}
                      </div>
                      <div
                        className={cn(
                          "text-sm font-semibold truncate",
                          isDark ? "text-white" : "text-navy"
                        )}
                      >
                        {order.serviceName}
                      </div>
                      <div
                        className={cn(
                          "text-sm truncate",
                          isDark ? "text-gray-400" : "text-gray-500"
                        )}
                      >
                        {order.planName}
                      </div>
                      <div>
                        <StatusBadge status={order.status} language={language} />
                      </div>
                      <div
                        className={cn(
                          "text-sm",
                          isDark ? "text-gray-400" : "text-gray-500"
                        )}
                      >
                        {order.paymentMethod}
                      </div>
                      <div
                        className={cn(
                          "text-sm font-semibold",
                          isDark ? "text-white" : "text-navy"
                        )}
                      >
                        {formatMRU(order.totalMRU)}
                      </div>
                      <div
                        className={cn(
                          "text-sm",
                          isDark ? "text-gray-500" : "text-gray-400"
                        )}
                      >
                        {formatDate(order.createdAt, language)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ---- Mobile card layout ---- */}
              <div className="md:hidden space-y-3">
                {mockOrders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                    onClick={() => setSelectedOrder(order)}
                    className={cn(
                      "p-4 rounded-2xl cursor-pointer transition-all active:scale-[0.98]",
                      isDark
                        ? "bg-card-dark border border-border-dark hover:border-teal/20"
                        : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="min-w-0">
                        <div
                          className={cn(
                            "font-bold truncate",
                            isDark ? "text-white" : "text-navy"
                          )}
                        >
                          {order.serviceName}
                        </div>
                        <div
                          className={cn(
                            "text-sm truncate",
                            isDark ? "text-gray-400" : "text-gray-500"
                          )}
                        >
                          {order.planName}
                        </div>
                      </div>
                      <StatusBadge status={order.status} language={language} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "text-xs font-mono",
                            isDark ? "text-gray-500" : "text-gray-400"
                          )}
                        >
                          {order.id}
                        </span>
                        <span
                          className={cn(
                            "text-xs",
                            isDark ? "text-gray-600" : "text-gray-300"
                          )}
                        >
                          |
                        </span>
                        <span
                          className={cn(
                            "text-xs",
                            isDark ? "text-gray-500" : "text-gray-400"
                          )}
                        >
                          {order.paymentMethod}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "text-sm font-bold",
                          isDark ? "text-white" : "text-navy"
                        )}
                      >
                        {formatMRU(order.totalMRU)}
                      </div>
                    </div>

                    <div
                      className={cn(
                        "text-xs mt-2",
                        isDark ? "text-gray-600" : "text-gray-400"
                      )}
                    >
                      {formatDate(order.createdAt, language)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            /* Empty state */
            <div
              className={cn(
                "text-center py-20 rounded-2xl",
                isDark
                  ? "bg-card-dark border border-border-dark"
                  : "bg-white border border-gray-100"
              )}
            >
              <ShoppingBag
                size={44}
                className={cn(
                  "mx-auto mb-4",
                  isDark ? "text-gray-600" : "text-gray-300"
                )}
              />
              <p
                className={cn(
                  "text-lg font-medium mb-1",
                  isDark ? "text-gray-400" : "text-gray-500"
                )}
              >
                {t("dashboard.noOrders", language)}
              </p>
              <p
                className={cn(
                  "text-sm mb-5",
                  isDark ? "text-gray-600" : "text-gray-400"
                )}
              >
                {language === "ar"
                  ? "ابدأ بطلب خدمتك الرقمية الأولى"
                  : language === "fr"
                    ? "Commencez par commander votre premier service"
                    : "Start by ordering your first digital service"}
              </p>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal to-teal-dark hover:shadow-lg hover:shadow-teal/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {language === "ar"
                  ? "تصفح الكتالوج"
                  : language === "fr"
                    ? "Parcourir le catalogue"
                    : "Browse Catalog"}
                <ArrowRight
                  size={16}
                  className={cn(rtl && "rotate-180")}
                />
              </Link>
            </div>
          )}
        </motion.section>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Order detail modal overlay                                         */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailOverlay
            order={selectedOrder}
            language={language}
            isDark={isDark}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
