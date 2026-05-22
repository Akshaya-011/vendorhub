import React from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import ProductGrid from '../shared/ProductGrid';
import Testimonials from '../shared/Testimonials';
import CTA from '../shared/CTA';
import ContactForm from '../shared/ContactForm';
import Footer from '../shared/Footer';
import { useCart } from '../../context/CartContext';

export default function EducationTemplate({ vendorData = {}, products = [], themeConfig = {} }) {
  const customTheme = {
    primaryColor: '#059669', // Emerald Green Accent
    secondaryColor: '#0284C7', // Blue Accent
    backgroundColor: '#FCFDFB', // Clean Ivory
    textColor: '#1F2937', // Slate Dark Gray
    fontFamily: "'Inter', sans-serif",
    ...themeConfig
  };

  const { addToCart } = useCart();

  return (
    <div 
      className="min-h-screen selection:bg-emerald-600 selection:text-white" 
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
          businessName: vendorData.businessName || 'Academy Pro',
          description: vendorData.description || 'Learn advanced technical, creative, and business management skills with expert instruction, flexible schedules, and verified graduation badges.',
          bannerImage: vendorData.bannerImage || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1600&fit=crop&q=80'
        }}
        themeConfig={customTheme}
      />

      {/* Feature grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { tag: "Self-Paced Learning", desc: "Access high-definition recorded tutorials from anywhere in the world on any device." },
            { tag: "Instructor Support", desc: "Join daily live chat boards and group code reviews with standard industry specialists." },
            { tag: "Accredited Certs", desc: "Gain recognized validation badges on graduation to share on LinkedIn or CV databases." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border p-8 rounded-2xl space-y-3 shadow-sm" style={{ borderColor: `${customTheme.textColor}10` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: customTheme.primaryColor }}>
                {idx + 1}
              </div>
              <h3 className="font-bold text-lg">{item.tag}</h3>
              <p className="text-xs opacity-75 leading-relaxed">{item.desc}</p>
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
