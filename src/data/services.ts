export type ServiceCategory = "music" | "streaming" | "gaming" | "software" | "storage" | "appstore";

export interface ServicePlan {
  id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  priceUSD: number;
  priceMRU: number;
  duration: string;
  durationAr: string;
  durationFr: string;
  popular?: boolean;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  brandColor: string;
  brandColorLight: string;
  description: string;
  descriptionAr: string;
  descriptionFr: string;
  deliveryTime: string;
  deliveryMethod: string;
  deliveryMethodAr: string;
  deliveryMethodFr: string;
  plans: ServicePlan[];
  popular?: boolean;
  rating: number;
  reviewCount: number;
  icon: string;
}

export const categories: Record<ServiceCategory, { name: string; nameAr: string; nameFr: string; emoji: string }> = {
  music: { name: "Music", nameAr: "موسيقى", nameFr: "Musique", emoji: "🎵" },
  streaming: { name: "Streaming", nameAr: "بث مباشر", nameFr: "Streaming", emoji: "🎬" },
  gaming: { name: "Gaming", nameAr: "ألعاب", nameFr: "Jeux", emoji: "🎮" },
  software: { name: "Software", nameAr: "برامج", nameFr: "Logiciels", emoji: "💻" },
  storage: { name: "Cloud Storage", nameAr: "تخزين سحابي", nameFr: "Stockage Cloud", emoji: "☁️" },
  appstore: { name: "App Store", nameAr: "متجر التطبيقات", nameFr: "App Store", emoji: "📱" },
};

export const services: Service[] = [
  // Music
  {
    id: "spotify",
    name: "Spotify Premium",
    slug: "spotify",
    category: "music",
    brandColor: "#1DB954",
    brandColorLight: "#1ed760",
    description: "Stream millions of songs, podcasts, and audiobooks ad-free with offline downloads.",
    descriptionAr: "استمع لملايين الأغاني والبودكاست والكتب الصوتية بدون إعلانات مع تحميل دون اتصال.",
    descriptionFr: "Écoutez des millions de chansons, podcasts et livres audio sans pub avec téléchargement hors ligne.",
    deliveryTime: "5-30 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "spotify-individual-1m", name: "Individual (1 Month)", nameAr: "فردي (شهر واحد)", nameFr: "Individuel (1 Mois)", priceUSD: 10.99, priceMRU: 429, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
      { id: "spotify-individual-3m", name: "Individual (3 Months)", nameAr: "فردي (3 أشهر)", nameFr: "Individuel (3 Mois)", priceUSD: 32.97, priceMRU: 1249, duration: "3 months", durationAr: "3 أشهر", durationFr: "3 mois" },
      { id: "spotify-duo", name: "Duo (1 Month)", nameAr: "ثنائي (شهر واحد)", nameFr: "Duo (1 Mois)", priceUSD: 14.99, priceMRU: 585, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
      { id: "spotify-family", name: "Family (1 Month)", nameAr: "عائلي (شهر واحد)", nameFr: "Famille (1 Mois)", priceUSD: 16.99, priceMRU: 663, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
    ],
    popular: true,
    rating: 4.8,
    reviewCount: 342,
    icon: "🎵",
  },
  {
    id: "apple-music",
    name: "Apple Music",
    slug: "apple-music",
    category: "music",
    brandColor: "#FA243C",
    brandColorLight: "#ff3b5c",
    description: "Access 100 million songs, exclusive content, and spatial audio.",
    descriptionAr: "الوصول إلى 100 مليون أغنية ومحتوى حصري وصوت مكاني.",
    descriptionFr: "Accédez à 100 millions de chansons, du contenu exclusif et l'audio spatial.",
    deliveryTime: "5-30 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "apple-music-individual", name: "Individual (1 Month)", nameAr: "فردي (شهر واحد)", nameFr: "Individuel (1 Mois)", priceUSD: 10.99, priceMRU: 429, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
      { id: "apple-music-family", name: "Family (1 Month)", nameAr: "عائلي (شهر واحد)", nameFr: "Famille (1 Mois)", priceUSD: 16.99, priceMRU: 663, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
    ],
    rating: 4.7,
    reviewCount: 189,
    icon: "🎵",
  },
  {
    id: "youtube-music",
    name: "YouTube Music Premium",
    slug: "youtube-music",
    category: "music",
    brandColor: "#FF0000",
    brandColorLight: "#ff3333",
    description: "Ad-free music, background play, and downloads on YouTube Music.",
    descriptionAr: "موسيقى بدون إعلانات وتشغيل في الخلفية وتحميل على يوتيوب ميوزك.",
    descriptionFr: "Musique sans pub, lecture en arrière-plan et téléchargements sur YouTube Music.",
    deliveryTime: "5-30 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "ytmusic-individual", name: "Individual (1 Month)", nameAr: "فردي (شهر واحد)", nameFr: "Individuel (1 Mois)", priceUSD: 10.99, priceMRU: 429, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
      { id: "ytmusic-family", name: "Family (1 Month)", nameAr: "عائلي (شهر واحد)", nameFr: "Famille (1 Mois)", priceUSD: 16.99, priceMRU: 663, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
    ],
    rating: 4.5,
    reviewCount: 156,
    icon: "🎵",
  },
  {
    id: "anghami",
    name: "Anghami Plus",
    slug: "anghami",
    category: "music",
    brandColor: "#6C3EAA",
    brandColorLight: "#8B5ACF",
    description: "The leading Arabic music streaming platform with millions of Arabic and international songs.",
    descriptionAr: "منصة البث العربية الرائدة مع ملايين الأغاني العربية والعالمية.",
    descriptionFr: "La principale plateforme de streaming de musique arabe avec des millions de chansons.",
    deliveryTime: "5-30 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "anghami-plus", name: "Plus (1 Month)", nameAr: "بلس (شهر واحد)", nameFr: "Plus (1 Mois)", priceUSD: 4.99, priceMRU: 195, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
    ],
    rating: 4.6,
    reviewCount: 234,
    icon: "🎵",
  },
  // Streaming
  {
    id: "netflix",
    name: "Netflix",
    slug: "netflix",
    category: "streaming",
    brandColor: "#E50914",
    brandColorLight: "#ff1a25",
    description: "Watch award-winning TV shows, movies, anime, and documentaries.",
    descriptionAr: "شاهد أفضل المسلسلات والأفلام والأنمي والوثائقيات.",
    descriptionFr: "Regardez des séries, films, anime et documentaires primés.",
    deliveryTime: "10-60 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "netflix-standard-ads", name: "Standard with Ads (1 Month)", nameAr: "قياسي مع إعلانات (شهر)", nameFr: "Standard avec Pub (1 Mois)", priceUSD: 6.99, priceMRU: 273, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
      { id: "netflix-standard", name: "Standard (1 Month)", nameAr: "قياسي (شهر واحد)", nameFr: "Standard (1 Mois)", priceUSD: 15.49, priceMRU: 604, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
      { id: "netflix-premium", name: "Premium (1 Month)", nameAr: "بريميوم (شهر واحد)", nameFr: "Premium (1 Mois)", priceUSD: 22.99, priceMRU: 897, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
    ],
    popular: true,
    rating: 4.9,
    reviewCount: 567,
    icon: "🎬",
  },
  {
    id: "disney-plus",
    name: "Disney+",
    slug: "disney-plus",
    category: "streaming",
    brandColor: "#0063E5",
    brandColorLight: "#1a7aff",
    description: "Stream Disney, Pixar, Marvel, Star Wars, and National Geographic.",
    descriptionAr: "شاهد ديزني وبيكسار ومارفل وستار وورز وناشيونال جيوغرافيك.",
    descriptionFr: "Regardez Disney, Pixar, Marvel, Star Wars et National Geographic.",
    deliveryTime: "10-60 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "disney-basic", name: "Basic (1 Month)", nameAr: "أساسي (شهر واحد)", nameFr: "Basique (1 Mois)", priceUSD: 7.99, priceMRU: 312, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
      { id: "disney-premium", name: "Premium (1 Month)", nameAr: "بريميوم (شهر واحد)", nameFr: "Premium (1 Mois)", priceUSD: 13.99, priceMRU: 546, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
    ],
    rating: 4.6,
    reviewCount: 198,
    icon: "🎬",
  },
  {
    id: "prime-video",
    name: "Amazon Prime Video",
    slug: "prime-video",
    category: "streaming",
    brandColor: "#00A8E1",
    brandColorLight: "#1ec0f7",
    description: "Watch blockbusters, award-winning Amazon Originals, and live sports.",
    descriptionAr: "شاهد أفلام رائجة وأعمال أمازون الأصلية والرياضة الحية.",
    descriptionFr: "Regardez des blockbusters, des originaux Amazon primés et du sport en direct.",
    deliveryTime: "10-60 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "prime-monthly", name: "Monthly", nameAr: "شهري", nameFr: "Mensuel", priceUSD: 8.99, priceMRU: 351, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
    ],
    rating: 4.5,
    reviewCount: 145,
    icon: "🎬",
  },
  {
    id: "shahid-vip",
    name: "Shahid VIP",
    slug: "shahid-vip",
    category: "streaming",
    brandColor: "#6C3EAA",
    brandColorLight: "#8B5ACF",
    description: "The largest Arabic streaming platform with exclusive Arabic content, series, and movies.",
    descriptionAr: "أكبر منصة بث عربية مع محتوى عربي حصري ومسلسلات وأفلام.",
    descriptionFr: "La plus grande plateforme de streaming arabe avec du contenu arabe exclusif.",
    deliveryTime: "5-30 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "shahid-vip-monthly", name: "VIP (1 Month)", nameAr: "VIP (شهر واحد)", nameFr: "VIP (1 Mois)", priceUSD: 9.99, priceMRU: 390, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
    ],
    rating: 4.4,
    reviewCount: 267,
    icon: "🎬",
  },
  // Gaming
  {
    id: "ps-plus",
    name: "PlayStation Plus",
    slug: "ps-plus",
    category: "gaming",
    brandColor: "#003087",
    brandColorLight: "#0055c4",
    description: "Online multiplayer, free monthly games, and exclusive discounts on PlayStation.",
    descriptionAr: "لعب متعدد عبر الإنترنت وألعاب مجانية شهرية وخصومات حصرية على بلايستيشن.",
    descriptionFr: "Multijoueur en ligne, jeux gratuits mensuels et réductions exclusives sur PlayStation.",
    deliveryTime: "10-60 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "ps-essential-1m", name: "Essential (1 Month)", nameAr: "أساسي (شهر واحد)", nameFr: "Essentiel (1 Mois)", priceUSD: 9.99, priceMRU: 390, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
      { id: "ps-essential-12m", name: "Essential (12 Months)", nameAr: "أساسي (12 شهر)", nameFr: "Essentiel (12 Mois)", priceUSD: 79.99, priceMRU: 3120, duration: "12 months", durationAr: "12 شهر", durationFr: "12 mois" },
      { id: "ps-extra-1m", name: "Extra (1 Month)", nameAr: "إكسترا (شهر واحد)", nameFr: "Extra (1 Mois)", priceUSD: 14.99, priceMRU: 585, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
    ],
    popular: true,
    rating: 4.7,
    reviewCount: 289,
    icon: "🎮",
  },
  {
    id: "xbox-gamepass",
    name: "Xbox Game Pass",
    slug: "xbox-gamepass",
    category: "gaming",
    brandColor: "#107C10",
    brandColorLight: "#2ea22e",
    description: "Play hundreds of high-quality games on console, PC, and cloud.",
    descriptionAr: "العب مئات الألعاب عالية الجودة على الكونسول والكمبيوتر والسحابة.",
    descriptionFr: "Jouez à des centaines de jeux de qualité sur console, PC et cloud.",
    deliveryTime: "10-60 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "gamepass-core", name: "Core (1 Month)", nameAr: "كور (شهر واحد)", nameFr: "Core (1 Mois)", priceUSD: 9.99, priceMRU: 390, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
      { id: "gamepass-standard", name: "Standard (1 Month)", nameAr: "قياسي (شهر واحد)", nameFr: "Standard (1 Mois)", priceUSD: 14.99, priceMRU: 585, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
      { id: "gamepass-ultimate", name: "Ultimate (1 Month)", nameAr: "ألتيميت (شهر واحد)", nameFr: "Ultimate (1 Mois)", priceUSD: 19.99, priceMRU: 780, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
    ],
    rating: 4.8,
    reviewCount: 312,
    icon: "🎮",
  },
  {
    id: "roblox",
    name: "Roblox",
    slug: "roblox",
    category: "gaming",
    brandColor: "#E3231D",
    brandColorLight: "#f04540",
    description: "Top up Robux to buy avatar items, game passes, and exclusive in-game content.",
    descriptionAr: "أضف روبوكس لشراء إكسسوارات الشخصية وتصاريح اللعب والمحتوى الحصري.",
    descriptionFr: "Rechargez des Robux pour acheter des items, passes de jeu et contenus exclusifs.",
    deliveryTime: "5-30 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "roblox-10", name: "$10 Roblox Card", nameAr: "بطاقة روبلوكس $10", nameFr: "Carte Roblox 10$", priceUSD: 10, priceMRU: 390, duration: "One-time", durationAr: "مرة واحدة", durationFr: "Unique" },
      { id: "roblox-25", name: "$25 Roblox Card", nameAr: "بطاقة روبلوكس $25", nameFr: "Carte Roblox 25$", priceUSD: 25, priceMRU: 975, duration: "One-time", durationAr: "مرة واحدة", durationFr: "Unique", popular: true },
      { id: "roblox-50", name: "$50 Roblox Card", nameAr: "بطاقة روبلوكس $50", nameFr: "Carte Roblox 50$", priceUSD: 50, priceMRU: 1950, duration: "One-time", durationAr: "مرة واحدة", durationFr: "Unique" },
    ],
    rating: 4.9,
    reviewCount: 512,
    icon: "🟥",
  },
  {
    id: "roblox",
    name: "Roblox",
    slug: "roblox",
    category: "gaming",
    brandColor: "#E2231A",
    brandColorLight: "#ff3e35",
    description: "Get Robux to purchase in-game items, accessories, and premium features.",
    descriptionAr: "احصل على روبوكس لشراء العناصر والإكسسوارات والميزات المميزة داخل اللعبة.",
    descriptionFr: "Obtenez des Robux pour acheter des objets en jeu et des fonctionnalités premium.",
    deliveryTime: "5-30 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "roblox-10", name: "$10 (800 Robux)", nameAr: "$10 (800 روبوكس)", nameFr: "10$ (800 Robux)", priceUSD: 10, priceMRU: 390, duration: "One-time", durationAr: "مرة واحدة", durationFr: "Unique", popular: true },
      { id: "roblox-25", name: "$25 (2,000 Robux)", nameAr: "$25 (2,000 روبوكس)", nameFr: "25$ (2,000 Robux)", priceUSD: 25, priceMRU: 975, duration: "One-time", durationAr: "مرة واحدة", durationFr: "Unique" },
    ],
    rating: 4.6,
    reviewCount: 178,
    icon: "🎮",
  },
  // Software
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus",
    slug: "chatgpt-plus",
    category: "software",
    brandColor: "#10A37F",
    brandColorLight: "#1ec89e",
    description: "Access GPT-4, faster response times, and priority access to new features.",
    descriptionAr: "الوصول إلى GPT-4 وأوقات استجابة أسرع وأولوية في الميزات الجديدة.",
    descriptionFr: "Accédez à GPT-4, des temps de réponse plus rapides et un accès prioritaire.",
    deliveryTime: "10-60 min",
    deliveryMethod: "Direct activation",
    deliveryMethodAr: "تفعيل مباشر",
    deliveryMethodFr: "Activation directe",
    plans: [
      { id: "chatgpt-monthly", name: "Plus (1 Month)", nameAr: "بلس (شهر واحد)", nameFr: "Plus (1 Mois)", priceUSD: 20, priceMRU: 780, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
    ],
    popular: true,
    rating: 4.9,
    reviewCount: 423,
    icon: "💻",
  },
  {
    id: "canva-pro",
    name: "Canva Pro",
    slug: "canva-pro",
    category: "software",
    brandColor: "#7D2AE8",
    brandColorLight: "#9747FF",
    description: "Premium design tools, templates, and AI-powered features for stunning visuals.",
    descriptionAr: "أدوات تصميم متميزة وقوالب وميزات ذكاء اصطناعي لمرئيات مذهلة.",
    descriptionFr: "Outils de design premium, modèles et fonctionnalités IA pour des visuels époustouflants.",
    deliveryTime: "10-60 min",
    deliveryMethod: "Direct activation",
    deliveryMethodAr: "تفعيل مباشر",
    deliveryMethodFr: "Activation directe",
    plans: [
      { id: "canva-monthly", name: "Pro (1 Month)", nameAr: "برو (شهر واحد)", nameFr: "Pro (1 Mois)", priceUSD: 12.99, priceMRU: 507, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
      { id: "canva-yearly", name: "Pro (1 Year)", nameAr: "برو (سنة واحدة)", nameFr: "Pro (1 An)", priceUSD: 119.99, priceMRU: 4680, duration: "12 months", durationAr: "12 شهر", durationFr: "12 mois" },
    ],
    rating: 4.7,
    reviewCount: 234,
    icon: "💻",
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    slug: "microsoft-365",
    category: "software",
    brandColor: "#0078D4",
    brandColorLight: "#1a8ce8",
    description: "Word, Excel, PowerPoint, OneDrive, and more for personal or family use.",
    descriptionAr: "وورد وإكسل وباوربوينت وون درايف والمزيد للاستخدام الشخصي أو العائلي.",
    descriptionFr: "Word, Excel, PowerPoint, OneDrive et plus pour usage personnel ou familial.",
    deliveryTime: "10-60 min",
    deliveryMethod: "Product key",
    deliveryMethodAr: "مفتاح المنتج",
    deliveryMethodFr: "Clé de produit",
    plans: [
      { id: "ms365-personal", name: "Personal (1 Year)", nameAr: "شخصي (سنة واحدة)", nameFr: "Personnel (1 An)", priceUSD: 69.99, priceMRU: 2730, duration: "12 months", durationAr: "12 شهر", durationFr: "12 mois", popular: true },
      { id: "ms365-family", name: "Family (1 Year)", nameAr: "عائلي (سنة واحدة)", nameFr: "Famille (1 An)", priceUSD: 99.99, priceMRU: 3900, duration: "12 months", durationAr: "12 شهر", durationFr: "12 mois" },
    ],
    rating: 4.6,
    reviewCount: 167,
    icon: "💻",
  },
  // Storage
  {
    id: "icloud",
    name: "iCloud+",
    slug: "icloud",
    category: "storage",
    brandColor: "#3693F3",
    brandColorLight: "#5aabff",
    description: "Expand your iCloud storage for photos, files, and device backups.",
    descriptionAr: "وسّع مساحة تخزين iCloud للصور والملفات ونسخ الأجهزة الاحتياطية.",
    descriptionFr: "Étendez votre stockage iCloud pour photos, fichiers et sauvegardes.",
    deliveryTime: "10-60 min",
    deliveryMethod: "Apple Gift Card",
    deliveryMethodAr: "بطاقة هدية أبل",
    deliveryMethodFr: "Carte cadeau Apple",
    plans: [
      { id: "icloud-50gb", name: "50GB (1 Month)", nameAr: "50 جيجا (شهر واحد)", nameFr: "50Go (1 Mois)", priceUSD: 0.99, priceMRU: 39, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
      { id: "icloud-200gb", name: "200GB (1 Month)", nameAr: "200 جيجا (شهر واحد)", nameFr: "200Go (1 Mois)", priceUSD: 2.99, priceMRU: 117, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
      { id: "icloud-2tb", name: "2TB (1 Month)", nameAr: "2 تيرا (شهر واحد)", nameFr: "2To (1 Mois)", priceUSD: 9.99, priceMRU: 390, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
    ],
    rating: 4.5,
    reviewCount: 123,
    icon: "☁️",
  },
  {
    id: "google-one",
    name: "Google One",
    slug: "google-one",
    category: "storage",
    brandColor: "#4285F4",
    brandColorLight: "#5a9aff",
    description: "Extra Google storage shared across Drive, Gmail, and Photos with premium features.",
    descriptionAr: "مساحة تخزين إضافية من جوجل مشتركة عبر درايف وجيميل والصور مع ميزات متميزة.",
    descriptionFr: "Stockage Google supplémentaire partagé entre Drive, Gmail et Photos.",
    deliveryTime: "10-60 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "google-one-100gb", name: "100GB (1 Month)", nameAr: "100 جيجا (شهر واحد)", nameFr: "100Go (1 Mois)", priceUSD: 1.99, priceMRU: 78, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois", popular: true },
      { id: "google-one-2tb", name: "2TB (1 Month)", nameAr: "2 تيرا (شهر واحد)", nameFr: "2To (1 Mois)", priceUSD: 9.99, priceMRU: 390, duration: "1 month", durationAr: "شهر واحد", durationFr: "1 mois" },
    ],
    rating: 4.5,
    reviewCount: 98,
    icon: "☁️",
  },
  // App Store
  {
    id: "apple-gift-card",
    name: "Apple Gift Card",
    slug: "apple-gift-card",
    category: "appstore",
    brandColor: "#000000",
    brandColorLight: "#333333",
    description: "Use for App Store, Apple Music, iCloud, and more. One card, endless possibilities.",
    descriptionAr: "استخدمها لمتجر التطبيقات وأبل ميوزك وآي كلاود والمزيد. بطاقة واحدة، إمكانيات لا نهائية.",
    descriptionFr: "Utilisez-la pour l'App Store, Apple Music, iCloud et plus. Une carte, des possibilités infinies.",
    deliveryTime: "5-30 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "apple-10", name: "$10 Card", nameAr: "بطاقة $10", nameFr: "Carte 10$", priceUSD: 10, priceMRU: 390, duration: "One-time", durationAr: "مرة واحدة", durationFr: "Unique" },
      { id: "apple-25", name: "$25 Card", nameAr: "بطاقة $25", nameFr: "Carte 25$", priceUSD: 25, priceMRU: 975, duration: "One-time", durationAr: "مرة واحدة", durationFr: "Unique", popular: true },
      { id: "apple-50", name: "$50 Card", nameAr: "بطاقة $50", nameFr: "Carte 50$", priceUSD: 50, priceMRU: 1950, duration: "One-time", durationAr: "مرة واحدة", durationFr: "Unique" },
      { id: "apple-100", name: "$100 Card", nameAr: "بطاقة $100", nameFr: "Carte 100$", priceUSD: 100, priceMRU: 3900, duration: "One-time", durationAr: "مرة واحدة", durationFr: "Unique" },
    ],
    popular: true,
    rating: 4.8,
    reviewCount: 534,
    icon: "📱",
  },
  {
    id: "google-play",
    name: "Google Play Gift Card",
    slug: "google-play",
    category: "appstore",
    brandColor: "#01875F",
    brandColorLight: "#00b377",
    description: "Purchase apps, games, movies, books, and subscriptions on Google Play.",
    descriptionAr: "اشترِ التطبيقات والألعاب والأفلام والكتب والاشتراكات على جوجل بلاي.",
    descriptionFr: "Achetez des apps, jeux, films, livres et abonnements sur Google Play.",
    deliveryTime: "5-30 min",
    deliveryMethod: "Gift card code",
    deliveryMethodAr: "رمز بطاقة هدية",
    deliveryMethodFr: "Code carte cadeau",
    plans: [
      { id: "gplay-10", name: "$10 Card", nameAr: "بطاقة $10", nameFr: "Carte 10$", priceUSD: 10, priceMRU: 390, duration: "One-time", durationAr: "مرة واحدة", durationFr: "Unique" },
      { id: "gplay-25", name: "$25 Card", nameAr: "بطاقة $25", nameFr: "Carte 25$", priceUSD: 25, priceMRU: 975, duration: "One-time", durationAr: "مرة واحدة", durationFr: "Unique", popular: true },
      { id: "gplay-50", name: "$50 Card", nameAr: "بطاقة $50", nameFr: "Carte 50$", priceUSD: 50, priceMRU: 1950, duration: "One-time", durationAr: "مرة واحدة", durationFr: "Unique" },
    ],
    rating: 4.7,
    reviewCount: 389,
    icon: "📱",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

export function getPopularServices(): Service[] {
  return services.filter((s) => s.popular);
}

export function searchServices(query: string): Service[] {
  const q = query.toLowerCase();
  return services.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
  );
}
