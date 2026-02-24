import { create } from "zustand";

export type Language = "en" | "ar" | "fr";
export type Theme = "light" | "dark";

interface AppState {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: "en",
  theme: "light",
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
}));

// Checkout store
export interface CartItem {
  serviceId: string;
  serviceName: string;
  planId: string;
  planName: string;
  priceMRU: number;
  priceUSD: number;
}

export interface GiftDetails {
  recipientContact: string;   // phone number or email
  fromName: string;           // sender's name (empty when anonymous)
  isAnonymous: boolean;
}

interface CheckoutState {
  cart: CartItem | null;
  paymentMethod: string | null;
  step: number;
  giftDetails: GiftDetails | null;
  setCart: (item: CartItem | null) => void;
  setPaymentMethod: (method: string) => void;
  setStep: (step: number) => void;
  setGiftDetails: (details: GiftDetails | null) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  cart: null,
  paymentMethod: null,
  step: 1,
  giftDetails: null,
  setCart: (cart) => set({ cart }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setStep: (step) => set({ step }),
  setGiftDetails: (giftDetails) => set({ giftDetails }),
  reset: () => set({ cart: null, paymentMethod: null, step: 1, giftDetails: null }),
}));
