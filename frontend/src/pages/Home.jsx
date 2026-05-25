import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import AIAssistantShowcase from '../components/landing/AIAssistantShowcase';
import MarketingTools from '../components/landing/MarketingTools';
import BuilderPreview from '../components/landing/BuilderPreview';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AIAssistantShowcase />
      <MarketingTools />
      <BuilderPreview />
      <Testimonials />
      <Pricing />
    </>
  );
}
