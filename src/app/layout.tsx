import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Amiri } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700"],
});

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Redeemly — Your Money. Global Access.",
  description:
    "Pay for Spotify, Netflix, ChatGPT & more with your Mauritanian e-wallet. Bridge the gap between local mobile money and global digital services.",
  keywords: [
    "Mauritania",
    "digital subscriptions",
    "Bankily",
    "Sedad",
    "Masrivi",
    "BimBank",
    "gift cards",
    "Spotify",
    "Netflix",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${playfair.variable} ${amiri.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
