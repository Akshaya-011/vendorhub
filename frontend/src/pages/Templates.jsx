import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Eye, ArrowRight, Sparkles, ShoppingBag, Utensils, Shirt, Laptop, Heart, Palette } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Templates', icon: Sparkles },
  { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingBag },
  { id: 'food', label: 'Food & Drink', icon: Utensils },
  { id: 'fashion', label: 'Fashion', icon: Shirt },
  { id: 'tech', label: 'Technology', icon: Laptop },
  { id: 'beauty', label: 'Beauty', icon: Heart },
  { id: 'art', label: 'Art & Design', icon: Palette },
];

const templates = [
  {
    id: 1, name: 'Aurora', category: 'ecommerce', rating: 4.9, reviews: 234,
    description: 'Sleek modern storefront with glass morphism effects',
    colors: ['#5B5EF7', '#8B5CF6', '#06B6D4'],
    tags: ['Popular', 'Responsive'],
  },
  {
    id: 2, name: 'Ember', category: 'food', rating: 4.8, reviews: 189,
    description: 'Warm, inviting design perfect for restaurants and cafes',
    colors: ['#F97316', '#EF4444', '#FBBF24'],
    tags: ['New'],
  },
  {
    id: 3, name: 'Frost', category: 'fashion', rating: 4.7, reviews: 156,
    description: 'Minimalist elegance with bold typography',
    colors: ['#1E293B', '#94A3B8', '#F8FAFC'],
    tags: ['Trending'],
  },
  {
    id: 4, name: 'Neon', category: 'tech', rating: 4.9, reviews: 312,
    description: 'Futuristic dark theme with neon accents',
    colors: ['#0F172A', '#22D3EE', '#A855F7'],
    tags: ['Popular', 'Dark Mode'],
  },
  {
    id: 5, name: 'Bloom', category: 'beauty', rating: 4.6, reviews: 98,
    description: 'Soft gradients and flowing layouts for beauty brands',
    colors: ['#EC4899', '#F9A8D4', '#FDF2F8'],
    tags: ['New'],
  },
  {
    id: 6, name: 'Canvas', category: 'art', rating: 4.8, reviews: 167,
    description: 'Gallery-style layout for creatives and artists',
    colors: ['#1E293B', '#F59E0B', '#FFFFFF'],
    tags: ['Responsive'],
  },
  {
    id: 7, name: 'Zenith', category: 'ecommerce', rating: 4.7, reviews: 201,
    description: 'Premium multi-product layout with advanced filters',
    colors: ['#059669', '#10B981', '#D1FAE5'],
    tags: ['Premium'],
  },
  {
    id: 8, name: 'Pulse', category: 'tech', rating: 4.9, reviews: 278,
    description: 'SaaS-inspired landing page with animated sections',
    colors: ['#6366F1', '#818CF8', '#C7D2FE'],
    tags: ['Popular', 'Animated'],
  },
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter((t) => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            {templates.length}+ Professional Templates
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">
            Choose Your Perfect <span className="text-gradient">Template</span>
          </h1>
          <p className="text-lg text-gray-600">
            Start with a stunning design and customize every detail with our AI-powered builder.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 max-w-2xl mx-auto">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <cat.icon className="w-4 h-4 mr-2" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Preview area */}
              <div className="relative h-48 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${template.colors[0]}20, ${template.colors[1]}20, ${template.colors[2]}20)`,
                }}
              >
                {/* Decorative shapes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-2xl rotate-12 opacity-30"
                    style={{ background: `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})` }}
                  />
                  <div
                    className="w-16 h-16 rounded-full -ml-6 mt-8 opacity-20"
                    style={{ background: template.colors[2] }}
                  />
                </div>

                {/* Template name overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-3xl font-display font-bold opacity-60"
                    style={{ color: template.colors[0] }}
                  >
                    {template.name}
                  </span>
                </div>

                {/* Tags */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-gray-700 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 hover:bg-gray-50">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-900">{template.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1" />
                    {template.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{template.description}</p>

                {/* Color palette */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-1">
                    {template.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{template.reviews} reviews</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No templates found matching your criteria.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 text-primary-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
