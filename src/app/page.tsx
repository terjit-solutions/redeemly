"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PopularServices } from "@/components/landing/PopularServices";
import { TrustSection } from "@/components/landing/TrustSection";

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
      <TrustSection />

      <PricingPreview />
      <LandingFooter />
      <MobileStickyBar />
    </>
  );
}
