import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import ProductGrid from '../shared/ProductGrid';
import Testimonials from '../shared/Testimonials';
import CTA from '../shared/CTA';
import Footer from '../shared/Footer';
import { useCart } from '../../context/CartContext';

export default function GroceryTemplate({ vendorData = {}, products = [], themeConfig = {} }) {
  const { addToCart } = useCart();
  const customTheme = {
    primaryColor: '#10B981', // Emerald Green
    secondaryColor: '#34D399', 
    backgroundColor: '#F9FAFB', 
    textColor: '#111827',
    fontFamily: "'Inter', sans-serif",
    ...themeConfig
  };

  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Produce', 'Dairy', 'Snacks', 'Beverages'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div 
      className="min-h-screen selection:bg-emerald-500 selection:text-white" 
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
          businessName: vendorData.businessName || 'FreshCart Groceries',
          description: vendorData.description || 'Your daily essentials, fresh produce, and household items delivered straight to your door in minutes.',
          bannerImage: vendorData.bannerImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&fit=crop&q=80'
        }}
        themeConfig={customTheme}
      />

      {/* Categories & Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex justify-center gap-3 flex-wrap mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCategory === cat 
                  ? 'text-white shadow-md' 
                  : 'bg-white border hover:bg-emerald-50'
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

      <section className="py-16 bg-emerald-900/5 border-y text-center" style={{ borderColor: `${customTheme.textColor}10` }}>
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600">Fresh Guarantee</span>
          <h3 className="text-3xl font-black">Farm to Table Freshness</h3>
          <p className="max-w-2xl mx-auto text-sm opacity-80 leading-relaxed">
            We partner with local farmers to ensure that you get the highest quality organic produce, safely handled and rapidly delivered.
          </p>
        </div>
      </section>

      <Testimonials themeConfig={customTheme} />
      <CTA themeConfig={customTheme} />
      <Footer vendorData={vendorData} themeConfig={customTheme} />
    </div>
  );
}
