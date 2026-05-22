import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import ProductGrid from '../shared/ProductGrid';
import Testimonials from '../shared/Testimonials';
import CTA from '../shared/CTA';
import Footer from '../shared/Footer';
import { useCart } from '../../context/CartContext';

export default function PicklesTemplate({ vendorData = {}, products = [], themeConfig = {} }) {
  const { addToCart } = useCart();
  const customTheme = {
    primaryColor: '#B91C1C', // Deep Red / Spice
    secondaryColor: '#F59E0B', // Turmeric Yellow
    backgroundColor: '#FFFBEB', // Light Warm background
    textColor: '#451A03', // Dark Brown
    fontFamily: "'Playfair Display', serif",
    ...themeConfig
  };

  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Mango', 'Lime', 'Mixed', 'Spicy'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div 
      className="min-h-screen selection:bg-red-800 selection:text-white" 
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
          businessName: vendorData.businessName || 'Heritage Pickles',
          description: vendorData.description || 'Authentic, homemade Indian pickles prepared with traditional family recipes and sun-dried spices.',
          bannerImage: vendorData.bannerImage || 'https://images.unsplash.com/photo-1589114471273-00e98032bf26?w=1600&fit=crop&q=80'
        }}
        themeConfig={customTheme}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center">
        <h2 className="text-3xl font-black mb-6">Our Varieties</h2>
        <div className="flex justify-center gap-3 flex-wrap mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCategory === cat 
                  ? 'text-white shadow-md' 
                  : 'bg-white border hover:bg-orange-50'
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

      <section className="py-16 text-center" style={{ backgroundColor: `${customTheme.secondaryColor}20` }}>
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest" style={{ color: customTheme.primaryColor }}>Traditional Process</span>
          <h3 className="text-3xl font-black">Sun-Dried & Hand-Mixed</h3>
          <p className="max-w-2xl mx-auto text-sm opacity-80 leading-relaxed">
            Every jar of our pickle is crafted using locally sourced spices, hand-cut fruits, and cold-pressed oils. Matured perfectly under the sun to give you that authentic tangy bite.
          </p>
        </div>
      </section>

      <Testimonials themeConfig={customTheme} />
      <CTA themeConfig={customTheme} />
      <Footer vendorData={vendorData} themeConfig={customTheme} />
    </div>
  );
}
