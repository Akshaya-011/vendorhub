import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import ProductGrid from '../shared/ProductGrid';
import Testimonials from '../shared/Testimonials';
import CTA from '../shared/CTA';
import ContactForm from '../shared/ContactForm';
import Footer from '../shared/Footer';
import { useCart } from '../../context/CartContext';

export default function HealthcareTemplate({ vendorData = {}, products = [], themeConfig = {} }) {
  const customTheme = {
    primaryColor: '#0284C7', // Medical Sky Blue
    secondaryColor: '#0D9488', // Teal Accent
    backgroundColor: '#F8FAFC', // Crisp Hospital White
    textColor: '#1E293B', // Slate Charcoal
    fontFamily: "'Inter', sans-serif",
    ...themeConfig
  };

  const { addToCart } = useCart();
  const [booked, setBooked] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Fever', 'Cold & Cough', 'Diabetes', 'Vitamins'];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div
      className="min-h-screen selection:bg-sky-600 selection:text-white"
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
          businessName: vendorData.businessName || 'Elite Clinical Care',
          description: vendorData.description || 'Professional family health checkups, specialized diagnostic imaging, and telemedicine consultations matching top clinical standards.',
          bannerImage: vendorData.bannerImage || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&fit=crop&q=80'
        }}
        themeConfig={customTheme}
      />

      {/* Appointment Booking Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" style={{ borderColor: `${customTheme.textColor}10` }}>
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-sky-600">Telehealth & Clinics</span>
            <h2 className="text-3xl font-black">Book Your Consultation Today</h2>
            <p className="opacity-75 text-sm sm:text-base">
              Secure a digital video link or in-clinic reservation with our specialized board-certified pediatricians and cardiologists.
            </p>
          </div>

          <div className="lg:col-span-6">
            {booked ? (
              <div className="p-6 bg-sky-50 text-sky-800 rounded-2xl text-center font-bold">
                Appointment Scheduled! A verification email has been sent.
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setBooked(true); }} className="space-y-4">
                <input type="text" required placeholder="Patient Name" className="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="date" required className="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  <select required className="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option>General Practitioner</option>
                    <option>Pediatrics</option>
                    <option>Cardiology</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition-all">
                  Request Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black">Pharmacy & Medicines</h2>
        </div>
        <div className="flex justify-center gap-3 flex-wrap mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${activeCategory === cat
                  ? 'text-white shadow-md'
                  : 'bg-white border hover:bg-sky-50'
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
