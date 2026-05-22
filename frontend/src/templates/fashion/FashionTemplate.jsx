import React from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import ProductGrid from '../shared/ProductGrid';
import Testimonials from '../shared/Testimonials';
import CTA from '../shared/CTA';
import ContactForm from '../shared/ContactForm';
import Footer from '../shared/Footer';
import { useCart } from '../../context/CartContext';

export default function FashionTemplate({ vendorData = {}, products = [], themeConfig = {} }) {
  const customTheme = {
    primaryColor: '#1E293B', // Slick Slate Black
    secondaryColor: '#BE123C', // Deep Rose Red
    backgroundColor: '#FAFAFA', // Soft Off-White
    textColor: '#0F172A', // Dark Slate
    fontFamily: "'Playfair Display', Georgia, serif",
    ...themeConfig
  };

  const { addToCart } = useCart();

  return (
    <div 
      className="min-h-screen selection:bg-rose-900 selection:text-white" 
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
          businessName: vendorData.businessName || 'Atelier Vogue',
          description: vendorData.description || 'Curated modern fashion and accessories combining daily comfort with high-end designer elegance. Discover our new summer drops.',
          bannerImage: vendorData.bannerImage || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&fit=crop&q=80'
        }}
        themeConfig={customTheme}
      />

      {/* Lookbook section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-rose-700">Seasonal Drops</span>
            <h2 className="text-4xl font-black leading-tight">The Summer Edit: Pure Linen & Cottons</h2>
            <p className="opacity-75 text-sm sm:text-base leading-relaxed">
              Tailored meticulously from organic sustainable fibers. Breathable silhouettes, raw textures and neutral tones form the cornerstone of our latest minimalist design series.
            </p>
            <div>
              <a href="#products" className="inline-block pb-1 border-b-2 font-bold hover:opacity-80 transition-opacity" style={{ borderColor: customTheme.primaryColor }}>
                Browse Lookbook &rarr;
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&fit=crop" alt="Fashion look 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md mt-6">
              <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&fit=crop" alt="Fashion look 2" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <ProductGrid 
        products={products} 
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
