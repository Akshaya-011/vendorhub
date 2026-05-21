import React from 'react';
import Navbar from './components/landing/Navbar';
import HeroSection from './components/landing/HeroSection';
import TemplateMarketplace from './components/landing/TemplateMarketplace';
import FeaturesSection from './components/landing/FeaturesSection';
import AIAssistantShowcase from './components/landing/AIAssistantShowcase';
import MarketingTools from './components/landing/MarketingTools';
import BuilderPreview from './components/landing/BuilderPreview';
import Testimonials from './components/landing/Testimonials';
import Pricing from './components/landing/Pricing';
import Footer from './components/landing/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <HeroSection />
      <TemplateMarketplace />
      <FeaturesSection />
      <AIAssistantShowcase />
      <MarketingTools />
      <BuilderPreview />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LandingPage />
  );
}

export default App;
