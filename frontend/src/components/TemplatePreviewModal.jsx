import React, { useState } from 'react';
import { X, Laptop, Tablet, Smartphone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WebsiteRenderer from './WebsiteRenderer';

export default function TemplatePreviewModal({ isOpen, onClose, template, onUseTemplate }) {
  const [device, setDevice] = useState('desktop'); // desktop, tablet, mobile

  if (!isOpen || !template) return null;

  // Custom device container sizing
  const getDeviceClass = () => {
    switch (device) {
      case 'mobile':
        return 'w-[375px] h-[720px] rounded-[40px] border-[12px] border-gray-900 shadow-2xl relative bg-white';
      case 'tablet':
        return 'w-[768px] h-[960px] rounded-[30px] border-[16px] border-gray-900 shadow-2xl relative bg-white';
      case 'desktop':
      default:
        return 'w-full h-full rounded-2xl border border-gray-200/50 shadow-lg bg-white';
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-slate-900/90 backdrop-blur-md p-4 sm:p-6"
      >
        {/* Header Switcher Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl text-primary-400">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white">{template.name}</h3>
              <p className="text-xs text-slate-400 uppercase tracking-widest">{template.category}</p>
            </div>
          </div>

          {/* Switcher Pills */}
          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
            {[
              { id: 'desktop', label: 'Desktop', icon: Laptop },
              { id: 'tablet', label: 'Tablet', icon: Tablet },
              { id: 'mobile', label: 'Mobile', icon: Smartphone }
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDevice(d.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  device === d.id 
                    ? 'bg-white text-slate-900 shadow-lg' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <d.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{d.label}</span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onUseTemplate(template)}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-xs shadow-lg hover:shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              Use Template
            </button>
            <button
              onClick={onClose}
              className="p-2.5 bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 rounded-xl transition-all"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Simulated Device Canvas */}
        <div className="flex-1 flex items-center justify-center overflow-hidden relative">
          <motion.div 
            layout
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`overflow-hidden transition-all duration-300 ${getDeviceClass()}`}
          >
            {/* Phone Bezel Speaker Notch Simulation */}
            {device === 'mobile' && (
              <>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-full z-50 flex items-center justify-center">
                  <div className="w-12 h-1 bg-gray-800 rounded-full mr-2" />
                  <div className="w-2.5 h-2.5 bg-gray-800 rounded-full" />
                </div>
                {/* Home Indicator line */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-900 rounded-full z-50" />
              </>
            )}

            {/* Tablet Camera Bezel Simulation */}
            {device === 'tablet' && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rounded-full z-50" />
            )}

            {/* Simulated Live Frame Viewport */}
            <div className="w-full h-full overflow-y-auto overflow-x-hidden relative">
              <WebsiteRenderer 
                templateKey={template.slug} 
                vendorData={{
                  businessName: template.name,
                  description: template.description
                }}
                products={template.products}
                themeConfig={template.themeConfig}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
