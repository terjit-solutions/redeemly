import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMRU(amount: number): string {
  return `${amount.toLocaleString()} MRU`;
}

export function formatUSD(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export const EXCHANGE_RATE = 39; // 1 USD = 39 MRU

export function usdToMru(usd: number): number {
  return Math.round(usd * EXCHANGE_RATE);
}

export function mruToUsd(mru: number): number {
  return mru / EXCHANGE_RATE;
}
