import { Language } from "@/stores/app-store";

const translations = {
  // Navigation
  "nav.home": { en: "Home", ar: "الرئيسية", fr: "Accueil" },
  "nav.catalog": { en: "Catalog", ar: "الكتالوج", fr: "Catalogue" },
  "nav.gifts": { en: "Gifts", ar: "هدايا", fr: "Cadeaux" },
  "nav.dashboard": { en: "Dashboard", ar: "لوحة التحكم", fr: "Tableau de bord" },
  "nav.login": { en: "Log In", ar: "تسجيل الدخول", fr: "Connexion" },
  "nav.signup": { en: "Sign Up", ar: "إنشاء حساب", fr: "S'inscrire" },
  "nav.getStarted": { en: "Get Started", ar: "ابدأ الآن", fr: "Commencer" },

  // Hero
  "hero.payFor": { en: "Pay for", ar: "ادفع ثمن", fr: "Payez pour" },
  "hero.withLocal": { en: "with your local e-wallet", ar: "بمحفظتك الإلكترونية المحلية", fr: "avec votre e-wallet local" },
  "hero.subtitle": {
    en: "Bridge the gap between Mauritanian e-money and global digital services. Pay with Bankily, Sedad, Masrivi, or BimBank.",
    ar: "اكسر الحاجز بين المال الإلكتروني الموريتاني والخدمات الرقمية العالمية. ادفع عبر بنكلي أو سداد أو مصرفي أو بيم بنك.",
    fr: "Comblez l'écart entre l'e-money mauritanien et les services numériques mondiaux. Payez avec Bankily, Sedad, Masrivi ou BimBank.",
  },
  "hero.browseCatalog": { en: "Browse Catalog", ar: "تصفح الكتالوج", fr: "Parcourir le catalogue" },
  "hero.howItWorks": { en: "How it works", ar: "كيف يعمل", fr: "Comment ça marche" },
  "hero.trustedBy": { en: "Trusted by", ar: "موثوق من قبل", fr: "Approuvé par" },
  "hero.mauritanians": { en: "Mauritanians", ar: "موريتاني", fr: "Mauritaniens" },

  // How it works
  "steps.title": { en: "How It Works", ar: "كيف يعمل", fr: "Comment ça marche" },
  "steps.subtitle": {
    en: "Three simple steps to access any global digital service",
    ar: "ثلاث خطوات بسيطة للوصول إلى أي خدمة رقمية عالمية",
    fr: "Trois étapes simples pour accéder à n'importe quel service numérique mondial",
  },
  "steps.step1.title": { en: "Choose your service", ar: "اختر خدمتك", fr: "Choisissez votre service" },
  "steps.step1.desc": {
    en: "Browse our catalog of 20+ popular digital services and subscriptions",
    ar: "تصفح كتالوجنا الذي يضم أكثر من 20 خدمة رقمية واشتراك شائع",
    fr: "Parcourez notre catalogue de 20+ services et abonnements numériques populaires",
  },
  "steps.step2.title": { en: "Pay with e-wallet", ar: "ادفع بمحفظتك", fr: "Payez avec votre e-wallet" },
  "steps.step2.desc": {
    en: "Send MRU via Bankily, Sedad, Masrivi, or BimBank — the apps you already use",
    ar: "أرسل MRU عبر بنكلي أو سداد أو مصرفي أو بيم بنك — التطبيقات التي تستخدمها بالفعل",
    fr: "Envoyez des MRU via Bankily, Sedad, Masrivi ou BimBank — les apps que vous utilisez déjà",
  },
  "steps.step3.title": { en: "Get instant access", ar: "احصل على وصول فوري", fr: "Accès instantané" },
  "steps.step3.desc": {
    en: "Receive your code or activation within minutes via the app and WhatsApp",
    ar: "استلم الرمز أو التفعيل خلال دقائق عبر التطبيق والواتساب",
    fr: "Recevez votre code ou activation en quelques minutes via l'app et WhatsApp",
  },

  // Pricing
  "pricing.title": { en: "Popular Services", ar: "الخدمات الشائعة", fr: "Services Populaires" },
  "pricing.subtitle": {
    en: "Real MRU prices, no hidden fees",
    ar: "أسعار حقيقية بالأوقية، بدون رسوم خفية",
    fr: "Prix réels en MRU, sans frais cachés",
  },
  "pricing.from": { en: "From", ar: "ابتداءً من", fr: "À partir de" },
  "pricing.perMonth": { en: "/month", ar: "/شهر", fr: "/mois" },
  "pricing.viewAll": { en: "View All Services", ar: "عرض جميع الخدمات", fr: "Voir tous les services" },
  "pricing.subscribe": { en: "Subscribe Now", ar: "اشترك الآن", fr: "S'abonner maintenant" },

  // Testimonials
  "testimonials.title": { en: "What Mauritanians Say", ar: "ماذا يقول الموريتانيون", fr: "Ce que disent les Mauritaniens" },
  "testimonials.subtitle": {
    en: "Real stories from real users across Mauritania",
    ar: "قصص حقيقية من مستخدمين حقيقيين في جميع أنحاء موريتانيا",
    fr: "Histoires réelles d'utilisateurs réels à travers la Mauritanie",
  },

  // FAQ
  "faq.title": { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة", fr: "Questions Fréquentes" },

  // Catalog
  "catalog.title": { en: "Service Catalog", ar: "كتالوج الخدمات", fr: "Catalogue de Services" },
  "catalog.subtitle": {
    en: "Browse all available digital services and subscriptions",
    ar: "تصفح جميع الخدمات الرقمية والاشتراكات المتاحة",
    fr: "Parcourez tous les services et abonnements numériques disponibles",
  },
  "catalog.search": { en: "Search services...", ar: "ابحث عن الخدمات...", fr: "Rechercher des services..." },
  "catalog.all": { en: "All", ar: "الكل", fr: "Tout" },
  "catalog.popular": { en: "Most Popular in Mauritania", ar: "الأكثر شعبية في موريتانيا", fr: "Les plus populaires en Mauritanie" },
  "catalog.delivery": { en: "Delivery:", ar: "التسليم:", fr: "Livraison:" },
  "catalog.reviews": { en: "reviews", ar: "تقييم", fr: "avis" },
  "catalog.orderNow": { en: "Order Now", ar: "اطلب الآن", fr: "Commander" },
  "catalog.viewPlans": { en: "View Plans", ar: "عرض الخطط", fr: "Voir les plans" },

  // Service Detail
  "service.plans": { en: "Available Plans", ar: "الخطط المتاحة", fr: "Plans Disponibles" },
  "service.howToRedeem": { en: "How to Redeem", ar: "كيفية الاسترداد", fr: "Comment utiliser" },
  "service.reviews": { en: "Customer Reviews", ar: "تقييمات العملاء", fr: "Avis clients" },
  "service.related": { en: "You May Also Like", ar: "قد يعجبك أيضاً", fr: "Vous aimerez aussi" },
  "service.mostPopular": { en: "Most Popular", ar: "الأكثر شعبية", fr: "Le plus populaire" },
  "service.select": { en: "Select Plan", ar: "اختر الخطة", fr: "Choisir ce plan" },
  "service.deliveryMethod": { en: "Delivery Method", ar: "طريقة التسليم", fr: "Méthode de livraison" },
  "service.estimatedTime": { en: "Estimated Time", ar: "الوقت المقدر", fr: "Temps estimé" },

  // Checkout
  "checkout.title": { en: "Checkout", ar: "الدفع", fr: "Paiement" },
  "checkout.step1": { en: "Confirm Order", ar: "تأكيد الطلب", fr: "Confirmer la commande" },
  "checkout.step2": { en: "Payment Method", ar: "طريقة الدفع", fr: "Méthode de paiement" },
  "checkout.step3": { en: "Send Payment", ar: "إرسال الدفع", fr: "Envoyer le paiement" },
  "checkout.step4": { en: "Upload Proof", ar: "رفع إثبات", fr: "Télécharger la preuve" },
  "checkout.step5": { en: "Confirmation", ar: "التأكيد", fr: "Confirmation" },
  "checkout.continue": { en: "Continue", ar: "متابعة", fr: "Continuer" },
  "checkout.back": { en: "Back", ar: "رجوع", fr: "Retour" },
  "checkout.placeOrder": { en: "Place Order", ar: "تقديم الطلب", fr: "Passer la commande" },
  "checkout.orderPlaced": { en: "Order Placed!", ar: "تم تقديم الطلب!", fr: "Commande passée !" },
  "checkout.orderMessage": {
    en: "We're processing your order. You'll receive your code via WhatsApp and in your dashboard.",
    ar: "نحن نعالج طلبك. ستستلم الرمز عبر الواتساب وفي لوحة التحكم.",
    fr: "Nous traitons votre commande. Vous recevrez votre code via WhatsApp et dans votre tableau de bord.",
  },
  "checkout.merchantId": { en: "Merchant ID", ar: "رقم التاجر", fr: "ID Marchand" },
  "checkout.amount": { en: "Amount", ar: "المبلغ", fr: "Montant" },
  "checkout.copied": { en: "Copied!", ar: "تم النسخ!", fr: "Copié !" },
  "checkout.uploadScreenshot": { en: "Upload payment screenshot", ar: "ارفع لقطة شاشة الدفع", fr: "Télécharger la capture d'écran" },
  "checkout.selectPayment": { en: "Select your payment method", ar: "اختر طريقة الدفع", fr: "Sélectionnez votre méthode de paiement" },
  "checkout.sendPayment": { en: "Send the exact amount to our merchant account", ar: "أرسل المبلغ المحدد إلى حسابنا التجاري", fr: "Envoyez le montant exact à notre compte marchand" },

  // Dashboard
  "dashboard.title": { en: "Dashboard", ar: "لوحة التحكم", fr: "Tableau de bord" },
  "dashboard.welcome": { en: "Welcome back", ar: "مرحباً بعودتك", fr: "Bon retour" },
  "dashboard.activeSubscriptions": { en: "Active Subscriptions", ar: "الاشتراكات النشطة", fr: "Abonnements actifs" },
  "dashboard.orderHistory": { en: "Order History", ar: "سجل الطلبات", fr: "Historique des commandes" },
  "dashboard.quickReorder": { en: "Quick Reorder", ar: "إعادة طلب سريع", fr: "Recommander" },
  "dashboard.noOrders": { en: "No orders yet", ar: "لا توجد طلبات بعد", fr: "Aucune commande" },
  "dashboard.viewCode": { en: "View Code", ar: "عرض الرمز", fr: "Voir le code" },
  "dashboard.totalSpent": { en: "Total Spent", ar: "إجمالي الإنفاق", fr: "Total dépensé" },
  "dashboard.ordersCount": { en: "Total Orders", ar: "إجمالي الطلبات", fr: "Total commandes" },

  // Auth
  "auth.login": { en: "Log In", ar: "تسجيل الدخول", fr: "Connexion" },
  "auth.signup": { en: "Create Account", ar: "إنشاء حساب", fr: "Créer un compte" },
  "auth.phone": { en: "Phone Number", ar: "رقم الهاتف", fr: "Numéro de téléphone" },
  "auth.phonePlaceholder": { en: "+222 XX XX XX XX", ar: "+222 XX XX XX XX", fr: "+222 XX XX XX XX" },
  "auth.name": { en: "Full Name", ar: "الاسم الكامل", fr: "Nom complet" },
  "auth.otp": { en: "Enter verification code", ar: "أدخل رمز التحقق", fr: "Entrez le code de vérification" },
  "auth.sendOtp": { en: "Send Code", ar: "إرسال الرمز", fr: "Envoyer le code" },
  "auth.verify": { en: "Verify", ar: "تحقق", fr: "Vérifier" },
  "auth.loginSubtitle": { en: "Welcome back to Redeemly", ar: "مرحباً بعودتك إلى ريدملي", fr: "Bon retour sur Redeemly" },
  "auth.signupSubtitle": { en: "Join 2,000+ Mauritanians already using Redeemly", ar: "انضم لأكثر من 2,000 موريتاني يستخدمون ريدملي", fr: "Rejoignez 2 000+ Mauritaniens qui utilisent déjà Redeemly" },
  "auth.noAccount": { en: "Don't have an account?", ar: "ليس لديك حساب؟", fr: "Pas de compte ?" },
  "auth.hasAccount": { en: "Already have an account?", ar: "لديك حساب بالفعل؟", fr: "Vous avez déjà un compte ?" },

  // Footer
  "footer.tagline": { en: "Your money. Global access.", ar: "أموالك. وصول عالمي.", fr: "Votre argent. Accès mondial." },
  "footer.services": { en: "Services", ar: "الخدمات", fr: "Services" },
  "footer.company": { en: "Company", ar: "الشركة", fr: "Entreprise" },
  "footer.support": { en: "Support", ar: "الدعم", fr: "Assistance" },
  "footer.about": { en: "About Us", ar: "من نحن", fr: "À propos" },
  "footer.terms": { en: "Terms of Service", ar: "شروط الخدمة", fr: "Conditions d'utilisation" },
  "footer.privacy": { en: "Privacy Policy", ar: "سياسة الخصوصية", fr: "Politique de confidentialité" },
  "footer.contact": { en: "Contact Us", ar: "اتصل بنا", fr: "Contactez-nous" },
  "footer.faq": { en: "FAQ", ar: "الأسئلة الشائعة", fr: "FAQ" },
  "footer.whatsapp": { en: "WhatsApp Support", ar: "دعم الواتساب", fr: "Support WhatsApp" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة.", fr: "Tous droits réservés." },
  "footer.madeIn": { en: "Made with ♥ in Mauritania", ar: "صنع بـ ♥ في موريتانيا", fr: "Fait avec ♥ en Mauritanie" },

  // Common
  "common.loading": { en: "Loading...", ar: "جاري التحميل...", fr: "Chargement..." },
  "common.error": { en: "Something went wrong", ar: "حدث خطأ ما", fr: "Une erreur est survenue" },
  "common.tryAgain": { en: "Try Again", ar: "حاول مجدداً", fr: "Réessayer" },
  "common.goHome": { en: "Go Home", ar: "العودة للرئيسية", fr: "Retour à l'accueil" },
  "common.mru": { en: "MRU", ar: "أوقية", fr: "MRU" },
  "common.exchangeRate": { en: "1 USD ≈ 39 MRU", ar: "1 دولار ≈ 39 أوقية", fr: "1 USD ≈ 39 MRU" },
} as const;

type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Language): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] || entry.en;
}

export function isRTL(lang: Language): boolean {
  return lang === "ar";
}
