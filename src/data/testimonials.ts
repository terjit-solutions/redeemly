export interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  cityFr: string;
  comment: string;
  commentAr: string;
  commentFr: string;
  service: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmed Ould Mohamed",
    nameAr: "أحمد ولد محمد",
    city: "Nouakchott",
    cityAr: "نواكشوط",
    cityFr: "Nouakchott",
    comment: "I've been trying to get Spotify Premium for months. Redeemly made it happen in 10 minutes with just my Bankily account!",
    commentAr: "كنت أحاول الحصول على سبوتيفاي بريميوم لأشهر. ريدملي جعل ذلك ممكناً في 10 دقائق فقط مع حسابي في بنكلي!",
    commentFr: "J'essayais d'obtenir Spotify Premium depuis des mois. Redeemly l'a rendu possible en 10 minutes avec mon compte Bankily !",
    service: "Spotify Premium",
    rating: 5,
    avatar: "AO",
  },
  {
    id: "2",
    name: "Fatima Mint Sidi",
    nameAr: "فاطمة منت سيدي",
    city: "Nouadhibou",
    cityAr: "نواذيبو",
    cityFr: "Nouadhibou",
    comment: "Finally, my kids can enjoy Netflix without me needing a Visa card. The WhatsApp support is amazing too.",
    commentAr: "أخيراً، أطفالي يستطيعون الاستمتاع بنتفلكس بدون الحاجة لبطاقة فيزا. دعم الواتساب ممتاز أيضاً.",
    commentFr: "Enfin, mes enfants peuvent profiter de Netflix sans que j'aie besoin d'une carte Visa. Le support WhatsApp est incroyable.",
    service: "Netflix",
    rating: 5,
    avatar: "FM",
  },
  {
    id: "3",
    name: "Mohamed Lemine Ould Cheikh",
    nameAr: "محمد الأمين ولد الشيخ",
    city: "Atar",
    cityAr: "أطار",
    cityFr: "Atar",
    comment: "I use ChatGPT Plus for my university research. Redeemly is the only way I could subscribe from Mauritania. Fast and reliable.",
    commentAr: "أستخدم شات جي بي تي بلس لأبحاثي الجامعية. ريدملي هي الطريقة الوحيدة التي أستطيع بها الاشتراك من موريتانيا. سريع وموثوق.",
    commentFr: "J'utilise ChatGPT Plus pour mes recherches universitaires. Redeemly est le seul moyen pour moi de m'abonner depuis la Mauritanie.",
    service: "ChatGPT Plus",
    rating: 5,
    avatar: "ML",
  },
  {
    id: "4",
    name: "Mariem Mint Ahmed",
    nameAr: "مريم منت أحمد",
    city: "Kiffa",
    cityAr: "كيفه",
    cityFr: "Kiffa",
    comment: "Ordered a Roblox card at 8pm, had the code by 8:15pm. My son was so happy! Will definitely use again.",
    commentAr: "طلبت بطاقة روبلوكس الساعة 8 مساءً، وحصلت على الرمز الساعة 8:15. ابني كان سعيداً جداً! سأستخدمها مجدداً بالتأكيد.",
    commentFr: "J'ai commandé une carte Roblox à 20h, j'avais le code à 20h15. Mon fils était tellement content !",
    service: "Roblox",
    rating: 5,
    avatar: "MA",
  },
  {
    id: "5",
    name: "Sidi Mohamed Ould Abdallahi",
    nameAr: "سيدي محمد ولد عبد الله",
    city: "Nouakchott",
    cityAr: "نواكشوط",
    cityFr: "Nouakchott",
    comment: "As a designer, Canva Pro is essential for my work. Paying with Sedad was so easy. Thank you Redeemly!",
    commentAr: "كمصمم، كانفا برو ضروري لعملي. الدفع عبر سداد كان سهلاً جداً. شكراً ريدملي!",
    commentFr: "En tant que designer, Canva Pro est essentiel pour mon travail. Payer avec Sedad était si facile. Merci Redeemly !",
    service: "Canva Pro",
    rating: 4,
    avatar: "SM",
  },
  {
    id: "6",
    name: "Aminetou Mint Vall",
    nameAr: "أمينتو منت فال",
    city: "Rosso",
    cityAr: "روصو",
    cityFr: "Rosso",
    comment: "Disney+ for the whole family with just Masrivi! My children love the Arabic dubbing options. Amazing service!",
    commentAr: "ديزني+ لكل العائلة فقط بمصرفي! أطفالي يحبون خيارات الدبلجة العربية. خدمة مذهلة!",
    commentFr: "Disney+ pour toute la famille avec juste Masrivi ! Mes enfants adorent les options de doublage arabe.",
    service: "Disney+",
    rating: 5,
    avatar: "AV",
  },
];
