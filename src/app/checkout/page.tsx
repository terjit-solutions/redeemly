"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Copy,
  Upload,
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Smartphone,
  CheckCircle2,
  Package,
  Clock,
  Shield,
} from "lucide-react";
import { useCheckoutStore, useAppStore } from "@/stores/app-store";
import { t, isRTL } from "@/lib/translations";
import { cn, formatMRU } from "@/lib/utils";

const MERCHANT_ID = "REEM-2024-MR";

const paymentMethods = [
  { id: "bankily", name: "Bankily", icon: "🏦" },
  { id: "sedad", name: "Sedad", icon: "💳" },
  { id: "masrivi", name: "Masrivi", icon: "📱" },
  { id: "bimbank", name: "BimBank", icon: "🏧" },
];

function generateOrderRef(): string {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `ORD-${digits}`;
}

// ─── Confetti Particle ──────────────────────────────────────────────────────
function ConfettiParticle({ index }: { index: number }) {
  const colors = ["#00D4AA", "#D4A445", "#00F5C8", "#E8C472", "#00B894"];
  const color = colors[index % colors.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 0.6;
  const size = 6 + Math.random() * 8;

  return (
    <motion.div
      initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
      animate={{
        y: -220 - Math.random() * 120,
        x: (Math.random() - 0.5) * 160,
        opacity: 0,
        scale: 0.3,
        rotate: Math.random() * 360,
      }}
      transition={{ duration: 1.8 + Math.random() * 0.8, delay, ease: "easeOut" }}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${left}%`,
        bottom: "40%",
      }}
    />
  );
}

// ─── Step Progress Bar ──────────────────────────────────────────────────────
function StepProgress({
  currentStep,
  language,
  isDark,
}: {
  currentStep: number;
  language: "en" | "ar" | "fr";
  isDark: boolean;
}) {
  const stepKeys = [
    "checkout.step1",
    "checkout.step2",
    "checkout.step3",
    "checkout.step4",
    "checkout.step5",
  ] as const;

  return (
    <div className="w-full mb-8">
      {/* Step indicator row */}
      <div className="flex items-center justify-between relative">
        {/* Connecting line background */}
        <div
          className={cn(
            "absolute top-4 h-0.5",
            isDark ? "bg-white/10" : "bg-gray-200"
          )}
          style={{ left: "10%", right: "10%" }}
        />
        {/* Connecting line progress */}
        <div
          className="absolute top-4 h-0.5 bg-teal transition-all duration-500"
          style={{
            left: "10%",
            width: `${((currentStep - 1) / 4) * 80}%`,
          }}
        />

        {stepKeys.map((key, i) => {
          const stepNum = i + 1;
          const isCompleted = currentStep > stepNum;
          const isActive = currentStep === stepNum;

          return (
            <div key={key} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2",
                  isCompleted
                    ? "bg-teal border-teal text-navy"
                    : isActive
                      ? "bg-teal/20 border-teal text-teal"
                      : isDark
                        ? "bg-navy-light border-white/10 text-gray-500"
                        : "bg-white border-gray-200 text-gray-400"
                )}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNum}
              </div>
              <span
                className={cn(
                  "mt-2 text-[10px] sm:text-xs font-medium text-center whitespace-nowrap transition-colors duration-300",
                  isActive
                    ? "text-teal"
                    : isCompleted
                      ? isDark
                        ? "text-gray-300"
                        : "text-gray-600"
                      : isDark
                        ? "text-gray-600"
                        : "text-gray-400"
                )}
              >
                {t(key, language)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 1: Confirm Order ──────────────────────────────────────────────────
function StepConfirmOrder({
  isDark,
  language,
}: {
  isDark: boolean;
  language: "en" | "ar" | "fr";
}) {
  const cart = useCheckoutStore((s) => s.cart);

  if (!cart) {
    return (
      <div className="text-center py-16">
        <Package size={48} className={cn("mx-auto mb-4", isDark ? "text-gray-600" : "text-gray-300")} />
        <p className={cn("text-lg font-semibold mb-2", isDark ? "text-gray-300" : "text-gray-600")}>
          {language === "ar"
            ? "لا توجد عناصر في السلة"
            : language === "fr"
              ? "Aucun article dans le panier"
              : "No items in cart"}
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl bg-teal text-navy font-semibold hover:bg-teal-light transition-colors"
        >
          {t("hero.browseCatalog", language)}
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className={cn("text-xl font-bold", isDark ? "text-white" : "text-navy")}>
          {t("checkout.step1", language)}
        </h2>
        <p className={cn("text-sm mt-1", isDark ? "text-gray-400" : "text-gray-500")}>
          {language === "ar"
            ? "راجع طلبك قبل المتابعة"
            : language === "fr"
              ? "Vérifiez votre commande avant de continuer"
              : "Review your order before continuing"}
        </p>
      </div>

      <div
        className={cn(
          "rounded-2xl p-6 border",
          isDark
            ? "bg-card-dark border-border-dark"
            : "bg-white border-gray-100 shadow-sm"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <span className={cn("text-sm font-medium", isDark ? "text-gray-400" : "text-gray-500")}>
            {language === "ar" ? "الخدمة" : language === "fr" ? "Service" : "Service"}
          </span>
          <span className={cn("text-base font-bold", isDark ? "text-white" : "text-navy")}>
            {cart.serviceName}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className={cn("text-sm font-medium", isDark ? "text-gray-400" : "text-gray-500")}>
            {language === "ar" ? "الخطة" : language === "fr" ? "Plan" : "Plan"}
          </span>
          <span className={cn("text-base font-semibold", isDark ? "text-gray-200" : "text-gray-700")}>
            {cart.planName}
          </span>
        </div>

        <div
          className={cn(
            "border-t pt-4 mt-4",
            isDark ? "border-white/10" : "border-gray-100"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={cn("text-sm font-medium", isDark ? "text-gray-400" : "text-gray-500")}>
              {language === "ar" ? "السعر (MRU)" : language === "fr" ? "Prix (MRU)" : "Price (MRU)"}
            </span>
            <span className="text-2xl font-bold text-teal">
              {formatMRU(cart.priceMRU)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className={cn("text-sm font-medium", isDark ? "text-gray-400" : "text-gray-500")}>
              {language === "ar" ? "ما يعادل (USD)" : language === "fr" ? "Equivalent (USD)" : "Equivalent (USD)"}
            </span>
            <span className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
              ${cart.priceUSD.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center gap-3 rounded-xl p-4",
          isDark ? "bg-teal/5 border border-teal/10" : "bg-teal/5 border border-teal/10"
        )}
      >
        <Shield size={18} className="text-teal flex-shrink-0" />
        <p className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-500")}>
          {language === "ar"
            ? "مدفوعاتك محمية. ستستلم الرمز خلال دقائق."
            : language === "fr"
              ? "Votre paiement est protege. Vous recevrez votre code en quelques minutes."
              : "Your payment is protected. You'll receive your code within minutes."}
        </p>
      </div>
    </div>
  );
}

// ─── Step 2: Payment Method ─────────────────────────────────────────────────
function StepPaymentMethod({
  isDark,
  language,
}: {
  isDark: boolean;
  language: "en" | "ar" | "fr";
}) {
  const { paymentMethod, setPaymentMethod } = useCheckoutStore();

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className={cn("text-xl font-bold", isDark ? "text-white" : "text-navy")}>
          {t("checkout.step2", language)}
        </h2>
        <p className={cn("text-sm mt-1", isDark ? "text-gray-400" : "text-gray-500")}>
          {t("checkout.selectPayment", language)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {paymentMethods.map((method) => {
          const isSelected = paymentMethod === method.id;
          return (
            <motion.button
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPaymentMethod(method.id)}
              className={cn(
                "relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200",
                isSelected
                  ? "border-teal bg-teal/10 shadow-lg shadow-teal/5"
                  : isDark
                    ? "border-white/10 bg-card-dark hover:border-white/20"
                    : "border-gray-200 bg-white hover:border-gray-300 shadow-sm"
              )}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-teal flex items-center justify-center"
                >
                  <Check size={12} className="text-navy" strokeWidth={3} />
                </motion.div>
              )}
              <span className="text-3xl">{method.icon}</span>
              <span
                className={cn(
                  "font-semibold text-sm",
                  isSelected
                    ? "text-teal"
                    : isDark
                      ? "text-white"
                      : "text-navy"
                )}
              >
                {method.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Copy Button ────────────────────────────────────────────────────────────
function CopyButton({
  value,
  language,
  isDark,
}: {
  value: string;
  language: "en" | "ar" | "fr";
  isDark: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [value]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
        copied
          ? "bg-teal/20 text-teal"
          : isDark
            ? "bg-white/10 text-gray-300 hover:bg-white/15"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      )}
    >
      {copied ? (
        <>
          <CheckCircle2 size={12} />
          {t("checkout.copied", language)}
        </>
      ) : (
        <>
          <Copy size={12} />
          {language === "ar" ? "نسخ" : language === "fr" ? "Copier" : "Copy"}
        </>
      )}
    </button>
  );
}

// ─── Step 3: Send Payment ───────────────────────────────────────────────────
function StepSendPayment({
  isDark,
  language,
}: {
  isDark: boolean;
  language: "en" | "ar" | "fr";
}) {
  const { cart, paymentMethod } = useCheckoutStore();
  const methodName =
    paymentMethods.find((m) => m.id === paymentMethod)?.name ?? "";

  const instructions =
    language === "ar"
      ? [
          `افتح تطبيق ${methodName} على هاتفك`,
          `اذهب إلى "إرسال أموال" أو "تحويل"`,
          `أدخل رقم التاجر: ${MERCHANT_ID}`,
          `أدخل المبلغ بالضبط: ${cart ? formatMRU(cart.priceMRU) : ""}`,
          "أكد العملية وخذ لقطة شاشة",
        ]
      : language === "fr"
        ? [
            `Ouvrez l'application ${methodName} sur votre telephone`,
            `Allez dans "Envoyer de l'argent" ou "Transfert"`,
            `Entrez l'ID marchand : ${MERCHANT_ID}`,
            `Entrez le montant exact : ${cart ? formatMRU(cart.priceMRU) : ""}`,
            "Confirmez la transaction et prenez une capture d'ecran",
          ]
        : [
            `Open the ${methodName} app on your phone`,
            `Go to "Send Money" or "Transfer"`,
            `Enter the Merchant ID: ${MERCHANT_ID}`,
            `Enter the exact amount: ${cart ? formatMRU(cart.priceMRU) : ""}`,
            "Confirm the transaction and take a screenshot",
          ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className={cn("text-xl font-bold", isDark ? "text-white" : "text-navy")}>
          {t("checkout.step3", language)}
        </h2>
        <p className={cn("text-sm mt-1", isDark ? "text-gray-400" : "text-gray-500")}>
          {t("checkout.sendPayment", language)}
        </p>
      </div>

      {/* Payment details cards */}
      <div className="space-y-3">
        {/* Merchant ID */}
        <div
          className={cn(
            "flex items-center justify-between rounded-xl p-4 border",
            isDark
              ? "bg-card-dark border-border-dark"
              : "bg-white border-gray-100 shadow-sm"
          )}
        >
          <div>
            <span className={cn("text-xs font-medium block mb-1", isDark ? "text-gray-500" : "text-gray-400")}>
              {t("checkout.merchantId", language)}
            </span>
            <span className={cn("text-lg font-mono font-bold", isDark ? "text-white" : "text-navy")}>
              {MERCHANT_ID}
            </span>
          </div>
          <CopyButton value={MERCHANT_ID} language={language} isDark={isDark} />
        </div>

        {/* Amount */}
        <div
          className={cn(
            "flex items-center justify-between rounded-xl p-4 border",
            isDark
              ? "bg-card-dark border-border-dark"
              : "bg-white border-gray-100 shadow-sm"
          )}
        >
          <div>
            <span className={cn("text-xs font-medium block mb-1", isDark ? "text-gray-500" : "text-gray-400")}>
              {t("checkout.amount", language)}
            </span>
            <span className="text-lg font-bold text-teal">
              {cart ? formatMRU(cart.priceMRU) : "—"}
            </span>
          </div>
          <CopyButton
            value={cart ? String(cart.priceMRU) : ""}
            language={language}
            isDark={isDark}
          />
        </div>
      </div>

      {/* Instructions */}
      <div
        className={cn(
          "rounded-xl p-5 border",
          isDark
            ? "bg-card-dark border-border-dark"
            : "bg-white border-gray-100 shadow-sm"
        )}
      >
        <div className="flex items-center gap-2 mb-4">
          <Smartphone size={18} className="text-teal" />
          <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-navy")}>
            {language === "ar"
              ? "خطوات الدفع"
              : language === "fr"
                ? "Etapes de paiement"
                : "Payment Steps"}
          </span>
        </div>
        <ol className="space-y-3">
          {instructions.map((instruction, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  isDark
                    ? "bg-teal/10 text-teal"
                    : "bg-teal/10 text-teal-dark"
                )}
              >
                {i + 1}
              </span>
              <span className={cn("text-sm pt-0.5 leading-relaxed", isDark ? "text-gray-300" : "text-gray-600")}>
                {instruction}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Important notice */}
      <div
        className={cn(
          "flex items-start gap-3 rounded-xl p-4 border",
          "bg-gold/5 border-gold/20"
        )}
      >
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center mt-0.5">
          <span className="text-xs font-bold text-gold">!</span>
        </div>
        <p className={cn("text-sm leading-relaxed", isDark ? "text-gold-light" : "text-gold")}>
          {language === "ar"
            ? "أرسل المبلغ المحدد بالضبط. لا تشمل رسوم التحويل."
            : language === "fr"
              ? "Envoyez le montant EXACT indique. N'incluez pas les frais de transfert."
              : "Send the EXACT amount shown. Do not include transfer fees."}
        </p>
      </div>
    </div>
  );
}

// ─── Step 4: Upload Proof ───────────────────────────────────────────────────
function StepUploadProof({
  isDark,
  language,
  uploaded,
  setUploaded,
  txRef,
  setTxRef,
}: {
  isDark: boolean;
  language: "en" | "ar" | "fr";
  uploaded: boolean;
  setUploaded: (v: boolean) => void;
  txRef: string;
  setTxRef: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    if (uploaded) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className={cn("text-xl font-bold", isDark ? "text-white" : "text-navy")}>
          {t("checkout.step4", language)}
        </h2>
        <p className={cn("text-sm mt-1", isDark ? "text-gray-400" : "text-gray-500")}>
          {t("checkout.uploadScreenshot", language)}
        </p>
      </div>

      {/* Upload area */}
      <motion.button
        whileHover={!uploaded && !uploading ? { scale: 1.01 } : {}}
        whileTap={!uploaded && !uploading ? { scale: 0.99 } : {}}
        onClick={handleUpload}
        className={cn(
          "w-full rounded-2xl border-2 border-dashed p-10 flex flex-col items-center justify-center gap-3 transition-all duration-300 cursor-pointer",
          uploaded
            ? "border-teal/40 bg-teal/5"
            : uploading
              ? isDark
                ? "border-white/20 bg-white/5"
                : "border-gray-300 bg-gray-50"
              : isDark
                ? "border-white/15 bg-card-dark hover:border-teal/30 hover:bg-teal/5"
                : "border-gray-200 bg-white hover:border-teal/30 hover:bg-teal/5 shadow-sm"
        )}
      >
        {uploaded ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 rounded-full bg-teal/20 flex items-center justify-center">
              <CheckCircle2 size={28} className="text-teal" />
            </div>
            <span className={cn("text-sm font-semibold", isDark ? "text-gray-200" : "text-gray-700")}>
              {language === "ar"
                ? "تم رفع لقطة الشاشة"
                : language === "fr"
                  ? "Capture d'ecran telechargee"
                  : "Screenshot uploaded"}
            </span>
            <span className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
              payment_proof.jpg
            </span>
          </motion.div>
        ) : uploading ? (
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 rounded-full border-2 border-teal border-t-transparent"
            />
            <span className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
              {language === "ar"
                ? "جاري الرفع..."
                : language === "fr"
                  ? "Telechargement..."
                  : "Uploading..."}
            </span>
          </div>
        ) : (
          <>
            <div
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center",
                isDark ? "bg-white/10" : "bg-gray-100"
              )}
            >
              <Upload size={24} className={isDark ? "text-gray-400" : "text-gray-500"} />
            </div>
            <span className={cn("text-sm font-medium", isDark ? "text-gray-300" : "text-gray-600")}>
              {language === "ar"
                ? "اضغط لرفع لقطة شاشة الدفع"
                : language === "fr"
                  ? "Cliquez pour telecharger la capture d'ecran"
                  : "Click to upload payment screenshot"}
            </span>
            <span className={cn("text-xs", isDark ? "text-gray-600" : "text-gray-400")}>
              {language === "ar"
                ? "أو اسحب وأسقط الملف هنا"
                : language === "fr"
                  ? "Ou glissez-deposez le fichier ici"
                  : "Or drag and drop file here"}
            </span>
          </>
        )}
      </motion.button>

      {/* Transaction reference */}
      <div>
        <label
          className={cn(
            "block text-sm font-medium mb-2",
            isDark ? "text-gray-300" : "text-gray-600"
          )}
        >
          {language === "ar"
            ? "رقم المعاملة (اختياري)"
            : language === "fr"
              ? "Reference de transaction (optionnel)"
              : "Transaction reference (optional)"}
        </label>
        <input
          type="text"
          value={txRef}
          onChange={(e) => setTxRef(e.target.value)}
          placeholder={
            language === "ar"
              ? "مثال: TXN-123456"
              : language === "fr"
                ? "Ex: TXN-123456"
                : "e.g. TXN-123456"
          }
          className={cn(
            "w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors border",
            isDark
              ? "bg-card-dark border-border-dark text-white placeholder:text-gray-600 focus:border-teal/40"
              : "bg-white border-gray-200 text-navy placeholder:text-gray-400 focus:border-teal/40 shadow-sm"
          )}
        />
      </div>
    </div>
  );
}

// ─── Step 5: Confirmation ───────────────────────────────────────────────────
function StepConfirmation({
  isDark,
  language,
  orderRef,
}: {
  isDark: boolean;
  language: "en" | "ar" | "fr";
  orderRef: string;
}) {
  return (
    <div className="text-center py-4 space-y-6 relative overflow-hidden">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <ConfettiParticle key={i} index={i} />
        ))}
      </div>

      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="mx-auto w-20 h-20 rounded-full bg-teal/20 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
          className="w-14 h-14 rounded-full bg-teal flex items-center justify-center"
        >
          <Check size={28} className="text-navy" strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-navy")}>
          {t("checkout.orderPlaced", language)}
        </h2>
      </motion.div>

      {/* Order reference */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono",
          isDark ? "bg-white/5 text-gray-300" : "bg-gray-100 text-gray-600"
        )}
      >
        <Package size={14} />
        {orderRef}
      </motion.div>

      {/* Estimated delivery */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex items-center justify-center gap-2"
      >
        <Clock size={14} className="text-teal" />
        <span className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
          {language === "ar"
            ? "التسليم المتوقع: 5 - 30 دقيقة"
            : language === "fr"
              ? "Livraison estimee : 5 - 30 minutes"
              : "Estimated delivery: 5 - 30 minutes"}
        </span>
      </motion.div>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={cn("text-sm leading-relaxed max-w-sm mx-auto", isDark ? "text-gray-400" : "text-gray-500")}
      >
        {t("checkout.orderMessage", language)}
      </motion.p>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4"
      >
        <Link
          href="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal text-navy font-semibold hover:bg-teal-light transition-colors"
        >
          <CreditCard size={16} />
          {t("nav.dashboard", language)}
        </Link>
        <Link
          href="/catalog"
          className={cn(
            "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors border",
            isDark
              ? "border-white/10 text-gray-300 hover:bg-white/5"
              : "border-gray-200 text-gray-600 hover:bg-gray-50"
          )}
        >
          {t("nav.catalog", language)}
        </Link>
      </motion.div>
    </div>
  );
}

// ─── Slide animation variants ───────────────────────────────────────────────
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

// ═══════════════════════════════════════════════════════════════════════════════
// Main Checkout Page
// ═══════════════════════════════════════════════════════════════════════════════
export default function CheckoutPage() {
  const router = useRouter();
  const { language, theme } = useAppStore();
  const { step, setStep, cart, paymentMethod, reset } = useCheckoutStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  const [direction, setDirection] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [txRef, setTxRef] = useState("");
  const [orderRef, setOrderRef] = useState("");

  // Generate order reference on reaching step 5
  useEffect(() => {
    if (step === 5 && !orderRef) {
      setOrderRef(generateOrderRef());
      reset();
    }
  }, [step, orderRef, reset]);

  const canContinue = (): boolean => {
    switch (step) {
      case 1:
        return !!cart;
      case 2:
        return !!paymentMethod;
      case 3:
        return true;
      case 4:
        return uploaded;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canContinue() || step >= 5) return;
    setDirection(1);
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step <= 1) return;
    setDirection(-1);
    setStep(step - 1);
  };

  return (
    <div
      className={cn("min-h-screen page-enter", isDark ? "bg-navy" : "bg-warm-white")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={cn("text-2xl sm:text-3xl font-bold", isDark ? "text-white" : "text-navy")}>
            {t("checkout.title", language)}
          </h1>
        </motion.div>

        {/* Progress bar */}
        <StepProgress currentStep={step} language={language} isDark={isDark} />

        {/* Step content */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {step === 1 && (
                <StepConfirmOrder isDark={isDark} language={language} />
              )}
              {step === 2 && (
                <StepPaymentMethod isDark={isDark} language={language} />
              )}
              {step === 3 && (
                <StepSendPayment isDark={isDark} language={language} />
              )}
              {step === 4 && (
                <StepUploadProof
                  isDark={isDark}
                  language={language}
                  uploaded={uploaded}
                  setUploaded={setUploaded}
                  txRef={txRef}
                  setTxRef={setTxRef}
                />
              )}
              {step === 5 && (
                <StepConfirmation
                  isDark={isDark}
                  language={language}
                  orderRef={orderRef}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        {step < 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "flex items-center mt-8 pt-6 border-t gap-4",
              isDark ? "border-white/10" : "border-gray-200",
              rtl ? "flex-row-reverse" : "flex-row",
              "justify-between"
            )}
          >
            {/* Back button */}
            <button
              onClick={handleBack}
              disabled={step <= 1}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all",
                step <= 1
                  ? "opacity-30 cursor-not-allowed"
                  : isDark
                    ? "text-gray-300 hover:bg-white/5"
                    : "text-gray-600 hover:bg-gray-100",
                rtl && "flex-row-reverse"
              )}
            >
              <ArrowLeft size={16} className={rtl ? "rotate-180" : ""} />
              {t("checkout.back", language)}
            </button>

            {/* Continue / Place Order button */}
            <button
              onClick={handleNext}
              disabled={!canContinue()}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                canContinue()
                  ? "bg-teal text-navy hover:bg-teal-light shadow-lg shadow-teal/20"
                  : isDark
                    ? "bg-white/10 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed",
                rtl && "flex-row-reverse"
              )}
            >
              {step === 4
                ? t("checkout.placeOrder", language)
                : t("checkout.continue", language)}
              {step === 4 ? (
                <CheckCircle2 size={16} />
              ) : (
                <ArrowRight size={16} className={rtl ? "rotate-180" : ""} />
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
