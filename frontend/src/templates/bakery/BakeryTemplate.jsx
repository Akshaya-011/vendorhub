import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import ProductGrid from '../shared/ProductGrid';
import Testimonials from '../shared/Testimonials';
import CTA from '../shared/CTA';
import ContactForm from '../shared/ContactForm';
import Footer from '../shared/Footer';
import { useCart } from '../../context/CartContext';

export default function BakeryTemplate({ vendorData = {}, products = [], themeConfig = {} }) {
  const customTheme = {
    primaryColor: '#8B4513', // Warm Chocolate Brown
    secondaryColor: '#D2691E', // Cinnamon Orange
    backgroundColor: '#FFF8DC', // Creamy Vanilla Cornsilk
    textColor: '#5C4033', // Deep Toast Brown
    fontFamily: "'Playfair Display', serif",
    ...themeConfig
  };

  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Bread', 'Cakes & Pastries', 'Donuts'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div 
      className="min-h-screen selection:bg-amber-800 selection:text-white" 
      style={{ 
        backgroundColor: customTheme.backgroundColor, 
        fontFamily: customTheme.fontFamily,
        color: customTheme.textColor
      }}
    >
      <Navbar vendorData={vendorData} themeConfig={customTheme} />
      
      <Hero 
        vendorData={{
          ...vendorData,
          businessName: vendorData.businessName || 'Sweet Crust Bakers',
          description: vendorData.description || 'Artisanal organic sourdough breads, freshly baked croissants, and sweet pastries made with love and traditional methods daily.',
          bannerImage: vendorData.bannerImage || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&fit=crop&q=80'
        }}
        themeConfig={customTheme}
      />

      {/* Bakery Product Showcase & Category Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-display font-black">Our Fresh Menu</h2>
          <p className="opacity-75 mt-2">Baked early every morning using natural, locally-sourced ingredients.</p>
        </div>

        {/* Category Pills */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCategory === cat 
                  ? 'text-white shadow-md' 
                  : 'bg-white border hover:bg-amber-50/50'
              }`}
              style={{ 
                backgroundColor: activeCategory === cat ? customTheme.primaryColor : 'transparent',
                borderColor: `${customTheme.textColor}20`
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ProductGrid 
        products={filteredProducts} 
        themeConfig={customTheme} 
        onAddToCart={(p) => addToCart(p, 1)}
      />

      {/* Specialty Banner */}
      <section className="py-20 bg-amber-900/10 border-y border-amber-900/10 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest" style={{ color: customTheme.secondaryColor }}>Baked with Heritage</span>
          <h3 className="text-3xl font-black">The Secret is Our 50-Year-Old Starter</h3>
          <p className="max-w-2xl mx-auto text-sm opacity-80 leading-relaxed">
            Every sourdough loaf is hand-shaped and naturally fermented for 24 hours. No artificial yeast, preservatives or additives. Just water, flour, sea salt and passion.
          </p>
        </div>
      </section>

      <Testimonials themeConfig={customTheme} />
      <CTA themeConfig={customTheme} />
      <ContactForm vendorData={vendorData} themeConfig={customTheme} />
      <Footer vendorData={vendorData} themeConfig={customTheme} />
    </div>
  );
}
