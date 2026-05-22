import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import ProductGrid from '../shared/ProductGrid';
import Testimonials from '../shared/Testimonials';
import CTA from '../shared/CTA';
import ContactForm from '../shared/ContactForm';
import Footer from '../shared/Footer';
import { useCart } from '../../context/CartContext';

export default function RestaurantTemplate({ vendorData = {}, products = [], themeConfig = {} }) {
  const customTheme = {
    primaryColor: '#EA580C', // Fire Orange
    secondaryColor: '#B45309', // Deep Amber
    backgroundColor: '#FAF7F2', // Warm Oatmeal White
    textColor: '#1C1917', // Charcoal Black
    fontFamily: "'Playfair Display', serif",
    ...themeConfig
  };

  const { addToCart } = useCart();
  const [reserved, setReserved] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div 
      className="min-h-screen selection:bg-orange-800 selection:text-white" 
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
          businessName: vendorData.businessName || 'Tavern Wood Fire',
          description: vendorData.description || 'Award-winning wood-fired steaks, smokehouse barbecue, and organic hand-stretched pizzas prepared by executive chefs daily.',
          bannerImage: vendorData.bannerImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&fit=crop&q=80'
        }}
        themeConfig={customTheme}
      />

      {/* Culinary Booking Accent Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600">Secure Your Table</span>
            <h2 className="text-4xl font-black leading-tight">Taste the Fine Art of Smoking</h2>
            <p className="opacity-75 text-sm sm:text-base leading-relaxed">
              Our hickory and oak smokers burn continuously to slow-cook prime rib, briskets, and pork ribs for up to 16 hours. Book your dining experience tonight!
            </p>
          </div>
          
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-5">
            <h3 className="text-xl font-bold font-display">Make a Reservation</h3>
            {reserved ? (
              <div className="p-6 bg-orange-50 text-orange-800 rounded-2xl text-center font-bold">
                Table Reserved Successfully! We look forward to hosting you.
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setReserved(true); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" required placeholder="Your Name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  <input type="email" required placeholder="Your Email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input type="date" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  <input type="time" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  <select required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6+ Guests</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-md transition-all">
                  Book Table Now
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black">Our Online Menu</h2>
          <p className="opacity-75 mt-2">Order online for pickup or local delivery.</p>
        </div>
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
                borderColor: `${customTheme.textColor}20`,
                color: activeCategory === cat ? '#FFF' : customTheme.textColor
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

      <Testimonials themeConfig={customTheme} />
      <CTA themeConfig={customTheme} />
      <ContactForm vendorData={vendorData} themeConfig={customTheme} />
      <Footer vendorData={vendorData} themeConfig={customTheme} />
    </div>
  );
}
