import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import ProductGrid from '../shared/ProductGrid';
import Testimonials from '../shared/Testimonials';
import CTA from '../shared/CTA';
import Footer from '../shared/Footer';
import { useCart } from '../../context/CartContext';

export default function PaintsTemplate({ vendorData = {}, products = [], themeConfig = {} }) {
  const { addToCart } = useCart();
  const customTheme = {
    primaryColor: '#6366F1', // Indigo
    secondaryColor: '#8B5CF6', // Purple
    backgroundColor: '#FAFAFA', 
    textColor: '#1E293B',
    fontFamily: "'Inter', sans-serif",
    ...themeConfig
  };

  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Interior', 'Exterior', 'Enamel', 'Brushes'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div 
      className="min-h-screen selection:bg-indigo-500 selection:text-white" 
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
          businessName: vendorData.businessName || 'ColorCraze Paints',
          description: vendorData.description || 'Premium interior and exterior wall colors, primers, and painting accessories to bring your walls to life.',
          bannerImage: vendorData.bannerImage || 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=1600&fit=crop&q=80'
        }}
        themeConfig={customTheme}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex justify-center gap-3 flex-wrap mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCategory === cat 
                  ? 'text-white shadow-md' 
                  : 'bg-white border hover:bg-indigo-50'
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

      <section className="py-16 text-center" style={{ backgroundColor: `${customTheme.primaryColor}10` }}>
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest" style={{ color: customTheme.primaryColor }}>Flawless Finish</span>
          <h3 className="text-3xl font-black">Long-Lasting Colors</h3>
          <p className="max-w-2xl mx-auto text-sm opacity-80 leading-relaxed">
            Our advanced polymer formulations ensure your walls stay bright, washable, and protected against weather for years.
          </p>
        </div>
      </section>

      <Testimonials themeConfig={customTheme} />
      <CTA themeConfig={customTheme} />
      <Footer vendorData={vendorData} themeConfig={customTheme} />
    </div>
  );
}
