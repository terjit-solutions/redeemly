"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PopularServices } from "@/components/landing/PopularServices";

import { PricingPreview } from "@/components/landing/PricingPreview";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { MobileStickyBar } from "@/components/landing/MobileStickyBar";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <HowItWorksSection />
      <PopularServices />

      {/* Divider between catalog and pricing */}
      <div className="relative py-4 bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C4713B]/20 to-transparent" />
            <span className="font-[family-name:var(--font-playfair)] text-sm font-bold text-[#C4713B]/25 select-none">
              R
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C4713B]/20 to-transparent" />
          </div>
        </div>
      </div>

      <PricingPreview />
      <LandingFooter />
      <MobileStickyBar />
    </>
  );
}
