import React from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import ProductGrid from '../shared/ProductGrid';
import Testimonials from '../shared/Testimonials';
import CTA from '../shared/CTA';
import ContactForm from '../shared/ContactForm';
import Footer from '../shared/Footer';
import { useCart } from '../../context/CartContext';

export default function BeautyTemplate({ vendorData = {}, products = [], themeConfig = {} }) {
  const customTheme = {
    primaryColor: '#EC4899', // Elegant Rose Gold Pink
    secondaryColor: '#F472B6', // Light Pink
    backgroundColor: '#FFF5F5', // Soft Blush White
    textColor: '#4A1D1D', // Crimson Charcoal
    fontFamily: "'Playfair Display', serif",
    ...themeConfig
  };

  const { addToCart } = useCart();

  return (
    <div 
      className="min-h-screen selection:bg-pink-300 selection:text-red-950" 
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
          businessName: vendorData.businessName || 'Luxe Petals Beauty',
          description: vendorData.description || 'Pamper your skin with 100% organic botanical lotions, aromatherapy facials, thermal water serums, and luxury home spa therapies.',
          bannerImage: vendorData.bannerImage || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&fit=crop&q=80'
        }}
        themeConfig={customTheme}
      />

      {/* Spa Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-pink-600">Pure Indulgence</span>
          <h2 className="text-3xl font-black mt-1">Our Signature Therapies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&fit=crop", name: "Therapeutic Massage", price: "$120/hr" },
            { img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&fit=crop", name: "Aromatherapy Facial", price: "$95/hr" },
            { img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&fit=crop", name: "Hydrating Mud Wrap", price: "$150/hr" }
          ].map((srv, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-md border hover:-translate-y-1 transition-transform duration-300" style={{ borderColor: `${customTheme.textColor}0a` }}>
              <div className="aspect-[4/3]">
                <img src={srv.img} alt={srv.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex items-center justify-between">
                <h3 className="font-bold text-base">{srv.name}</h3>
                <span className="text-sm font-black text-pink-600">{srv.price}</span>
              </div>
            </div>
          ))}
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
