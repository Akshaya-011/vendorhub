import React, { useState } from 'react';
import { ArrowRight, Eye } from 'lucide-react';

const categories = ['All', 'Business', 'Store', 'Food', 'Beauty', 'Portfolio', 'Healthcare', 'Education', 'More'];

const templates = [
  { id: 1, title: 'Botanica', category: 'Store', image: 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80&w=800&h=600', color: 'bg-emerald-100' },
  { id: 2, title: 'Lumière', category: 'Beauty', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800&h=600', color: 'bg-rose-100' },
  { id: 3, title: 'Café Delight', category: 'Food', image: 'https://images.unsplash.com/photo-1498837167922-41cfa6f309ce?auto=format&fit=crop&q=80&w=800&h=600', color: 'bg-amber-100' },
  { id: 4, title: 'Studio Minimal', category: 'Portfolio', image: 'https://images.unsplash.com/photo-1481481600469-6f9168128320?auto=format&fit=crop&q=80&w=800&h=600', color: 'bg-gray-200' },
  { id: 5, title: 'Nova Tech', category: 'Business', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=600', color: 'bg-blue-100' },
  { id: 6, title: 'Zenith', category: 'Healthcare', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800&h=600', color: 'bg-teal-100' },
  { id: 7, title: 'Urban Estate', category: 'Business', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800&h=600', color: 'bg-slate-200' },
  { id: 8, title: 'Aura Fitness', category: 'Store', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800&h=600', color: 'bg-orange-100' },
];

export default function TemplateMarketplace() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTemplates = activeFilter === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeFilter);

  return (
    <section id="templates" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-full mb-6 text-sm">
            20+ Beautiful Templates
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
            Choose a template you love
          </h2>
          <p className="text-xl text-gray-600">
            Pick from professional templates designed for every business, completely customizable with AI or our drag-and-drop editor.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === cat 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-200 group-hover:shadow-xl transition-all duration-300">
                {/* Image Placeholder or actual image */}
                <div className={`w-full h-full ${template.color} absolute inset-0 mix-blend-multiply opacity-20 transition-opacity group-hover:opacity-0 z-10`}></div>
                <img 
                  src={template.image} 
                  alt={template.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center space-x-3">
                  <button className="bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Preview">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="bg-primary-600 text-white font-medium px-6 py-3 rounded-full hover:bg-primary-700 transition-colors shadow-lg">
                    Start with this
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center px-1">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{template.title}</h3>
                  <p className="text-sm text-gray-500">{template.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="flex items-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group text-lg">
            <span>Explore all templates</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
