import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Star, 
  Eye, 
  ArrowRight, 
  Sparkles, 
  ShoppingBag, 
  Utensils, 
  Shirt, 
  Heart, 
  Palette, 
  Tag 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Import template datasets
import { templatesData } from '../data/templates';
import TemplatePreviewModal from '../components/TemplatePreviewModal';
import { useAuth } from '../context/AuthContext';

const categories = [
  { id: 'all', label: 'All Templates', icon: Sparkles },
  { id: 'Bakery', label: 'Bakery', icon: Utensils },
  { id: 'Fashion', label: 'Fashion', icon: Shirt },
  { id: 'Grocery', label: 'Grocery', icon: ShoppingBag },
  { id: 'Pickles', label: 'Pickles', icon: Utensils },
  { id: 'Restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'Healthcare', label: 'Healthcare', icon: Heart },
  { id: 'Education', label: 'Education', icon: Sparkles },
  { id: 'Beauty', label: 'Beauty', icon: Heart },
  { id: 'Paints', label: 'Paints', icon: Palette }
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [assigningId, setAssigningId] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Instant responsive search and category filters
  const filteredTemplates = templatesData.filter((t) => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePreview = (template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleUseTemplate = async (template) => {
    setAssigningId(template.id);
    const vendorId = user?.id || 'demo-vendor';

    try {
      // Trigger the backend template assignment endpoint
      const response = await fetch('http://localhost:5000/api/v1/vendors/select-template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          vendorId,
          template: template.slug
        })
      });

      // Fallback seamlessly to local simulation if server is offline/unavailable
      if (!response.ok) {
        throw new Error('Server not available, falling back to local simulation');
      }

      // If server response succeeds, redirect
      alert(`Success! Selected the ${template.name} template.`);
      navigate('/builder');
    } catch (error) {
      console.warn('Backend API connection failed, simulating template selection locally:', error.message);
      
      // Update local storage representation to reflect template choice
      const storedUser = localStorage.getItem('vendorhub_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        parsed.storeSlug = template.slug;
        parsed.assignedTemplate = template.slug;
        localStorage.setItem('vendorhub_user', JSON.stringify(parsed));
      }
      
      setTimeout(() => {
        setAssigningId(null);
        navigate('/builder');
      }, 700);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-700 text-sm font-semibold mb-6 shadow-sm border border-cyan-100">
            <Sparkles className="w-4 h-4 mr-2 text-cyan-500 animate-pulse" />
            {templatesData.length} Live Professional Templates
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-4 tracking-tight leading-none">
            Scale Your Business with a <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Store Template</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto font-medium">
            Start with a beautiful premium aesthetic lookbook or store design and customize products, branding, and layouts instantly.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 max-w-2xl mx-auto">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates by category or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center px-4.5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 border ${
                activeCategory === cat.id
                  ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <cat.icon className="w-3.5 h-3.5 mr-2" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => {
            const isAssigning = assigningId === template.id;
            
            return (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  {/* Preview Image Block */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img 
                      src={template.previewImage} 
                      alt={template.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Live Preview Button Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button 
                        onClick={() => handlePreview(template)}
                        className="px-5 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                      >
                        <Eye className="w-4 h-4 text-cyan-600" />
                        Preview
                      </button>
                      <button 
                        onClick={() => handleUseTemplate(template)}
                        className="px-5 py-2.5 text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 bg-gradient-to-r from-cyan-500 to-blue-600"
                        disabled={isAssigning}
                      >
                        {isAssigning ? 'Activating...' : 'Use Template'}
                      </button>
                    </div>

                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex gap-1.5">
                      {template.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[9px] font-black uppercase text-gray-700 shadow-sm border border-white/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Meta Details */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-cyan-600">{template.category}</span>
                        <div className="flex items-center text-xs text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current mr-1" />
                          4.9
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-slate-800 tracking-tight">{template.name}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{template.description}</p>
                    </div>

                    {/* Product Previews Inside Template Cards (Sells the Shopify Vibe) */}
                    <div className="space-y-2 pt-4 border-t border-gray-100">
                      <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                        <Tag className="w-3 h-3 text-cyan-500" /> Product Previews
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {template.products?.slice(0, 3).map((prod, pIdx) => (
                          <div 
                            key={prod.id || pIdx} 
                            className="bg-slate-50 border border-slate-100 rounded-xl p-2 flex flex-col justify-between items-center text-center space-y-1.5 relative group/item cursor-help"
                            title={prod.description}
                          >
                            {/* Dummy Mini Product thumbnail shape */}
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-100 to-blue-100/50 flex items-center justify-center font-bold text-[9px] text-cyan-700 shadow-sm border">
                              {prod.name.charAt(0)}
                            </div>
                            <span className="text-[8px] font-black text-slate-600 line-clamp-1 w-full leading-tight">{prod.name}</span>
                            <span className="text-[9px] font-black text-cyan-600">${prod.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Selection Button Drawer */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-100/60 mt-auto">
                  {/* Theme Config Color Bulbs */}
                  <div className="flex -space-x-1">
                    {[
                      template.themeConfig.primaryColor,
                      template.themeConfig.secondaryColor,
                      template.themeConfig.backgroundColor
                    ].map((col, cIdx) => (
                      <div 
                        key={cIdx} 
                        className="w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: col }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="text-xs font-bold text-slate-800 hover:text-cyan-600 flex items-center gap-1 group/btn"
                    disabled={isAssigning}
                  >
                    {isAssigning ? 'Assigning...' : 'Quick Select'}
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-20 bg-white border border-dashed rounded-3xl max-w-lg mx-auto">
            <p className="text-gray-400 font-bold text-lg">No templates found matching your criteria.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 text-cyan-600 font-bold hover:underline text-sm"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Multi-Device Responsive Preview Modal Overlay */}
      <TemplatePreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={selectedTemplate}
        onUseTemplate={(t) => {
          setIsPreviewOpen(false);
          handleUseTemplate(t);
        }}
      />
    </div>
  );
}
