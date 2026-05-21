import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Founder, Botanica',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    content: 'VendorHub completely transformed my business. The AI generated a beautiful store in 2 minutes, and I was making sales by the afternoon. It is like magic.',
  },
  {
    name: 'Michael Chen',
    role: 'Owner, Minimalist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    content: 'I have tried Wix, Shopify, and Squarespace. VendorHub is miles ahead. The interface is gorgeous, and the built-in marketing tools save me thousands a month.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    content: 'As a designer, I am very picky about UI. VendorHub not only generates stunning designs, but the editor lets me tweak every single detail flawlessly.',
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
            Loved by thousands of founders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow relative">
              <div className="flex text-amber-400 mb-6 space-x-1">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center space-x-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
