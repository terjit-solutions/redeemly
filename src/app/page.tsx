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

      {/* Squiggly divider between catalog and pricing */}
      <div className="relative py-6 sm:py-8 bg-[var(--background)]">
        <div className="mx-auto max-w-3xl px-5">
          <svg
            viewBox="0 0 800 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "24px" }}
          >
            {/* Squiggly line */}
            <path
              d="M0 12 C 50 4, 100 20, 150 12 S 250 4, 300 12 S 400 20, 450 12 S 550 4, 600 12 S 700 20, 750 12 S 790 8, 800 12"
              stroke="#C4713B"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.25"
            />
            {/* Diamond accents */}
            <path d="M200 12L204 8L208 12L204 16Z" fill="#C4713B" opacity="0.3" />
            <path d="M400 12L404 8L408 12L404 16Z" fill="#C4713B" opacity="0.3" />
            <path d="M600 12L604 8L608 12L604 16Z" fill="#C4713B" opacity="0.3" />
          </svg>
        </div>
      </div>

      <PricingPreview />
      <LandingFooter />
      <MobileStickyBar />
    </>
  );
}
