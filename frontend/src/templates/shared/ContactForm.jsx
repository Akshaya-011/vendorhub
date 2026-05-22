import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactForm({ vendorData, themeConfig = {} }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const primaryColor = themeConfig.primaryColor || '#3B82F6';
  const textColor = themeConfig.textColor || '#0F172A';
  const backgroundColor = themeConfig.backgroundColor || '#FFFFFF';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24" style={{ backgroundColor: backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mb-4" style={{ color: textColor }}>
            Get in Touch
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: primaryColor }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-display" style={{ color: textColor }}>Contact Information</h3>
              <p className="text-xs sm:text-sm opacity-70 leading-relaxed" style={{ color: textColor }}>
                Have questions about our collections, customized packages, or order shipping details? Shoot us a message or contact our help desk!
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Phone, title: "Phone", desc: vendorData?.contactPhone || "+1 (555) 902-3920" },
                { icon: Mail, title: "Email", desc: vendorData?.contactEmail || "hello@yourbrand.com" },
                { icon: MapPin, title: "Address", desc: vendorData?.address || "48 Broadway, New York, NY" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="p-3.5 rounded-xl border flex-shrink-0 flex items-center justify-center bg-gray-50" style={{ borderColor: `${textColor}10` }}>
                    <item.icon className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase opacity-40 tracking-wider" style={{ color: textColor }}>{item.title}</h4>
                    <p className="text-sm font-semibold opacity-85" style={{ color: textColor }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-gray-50/50 border rounded-3xl p-6 sm:p-10" style={{ borderColor: `${textColor}08` }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: textColor }}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: `${textColor}15`, color: textColor }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: textColor }}>Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: `${textColor}15`, color: textColor }}
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: textColor }}>Message</label>
                <textarea
                  required
                  rows="4"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border rounded-xl text-sm resize-none focus:outline-none focus:ring-2"
                  style={{ borderColor: `${textColor}15`, color: textColor }}
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3.5 font-bold rounded-xl text-white shadow-md flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                {sent ? 'Message Sent!' : 'Send Message'}
                {!sent && <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
