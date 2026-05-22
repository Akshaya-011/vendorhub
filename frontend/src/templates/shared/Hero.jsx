import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero({ vendorData, themeConfig = {}, onCtaClick }) {
  const brandName = vendorData?.businessName || vendorData?.name || 'Our Premium Boutique';
  const description = vendorData?.description || 'Crafted with premium quality, custom designed to deliver beautiful, reliable solutions for all your requirements.';
  const coverImage = vendorData?.bannerImage || vendorData?.coverImage;

  const primaryColor = themeConfig.primaryColor || '#3B82F6';
  const secondaryColor = themeConfig.secondaryColor || '#1E293B';
  const textColor = themeConfig.textColor || '#0F172A';
  const backgroundColor = themeConfig.backgroundColor || '#FFFFFF';

  // Floating circles animation variants
  const floatingVariants = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section 
      id="home"
      className="relative overflow-hidden py-24 sm:py-32 flex items-center min-h-[70vh]"
      style={{ backgroundColor: `${backgroundColor}05` }}
    >
      {/* Dynamic Background Layout */}
      {coverImage ? (
        <div className="absolute inset-0 z-0">
          <img 
            src={coverImage} 
            alt={brandName} 
            loading="lazy"
            className="w-full h-full object-cover" 
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: primaryColor }} />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: secondaryColor }} />
        </div>
      )}

      {/* Floating Design Accents */}
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/4 right-12 w-16 h-16 rounded-2xl border-4 opacity-15 rotate-12 hidden md:block" 
        style={{ borderColor: primaryColor }}
      />
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-1/4 left-16 w-12 h-12 rounded-full border-4 opacity-10 hidden md:block" 
        style={{ borderColor: secondaryColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Area */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm border"
              style={{ 
                color: primaryColor, 
                borderColor: `${primaryColor}30`,
                backgroundColor: coverImage ? 'rgba(255,255,255,0.1)' : `${primaryColor}10` 
              }}
            >
              🚀 Welcome to {brandName}
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-none"
              style={{ color: coverImage ? '#FFFFFF' : textColor }}
            >
              Experience the Future of <span className="bg-clip-text text-transparent bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor || primaryColor})` }}>Shopping</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-medium"
              style={{ color: coverImage ? 'rgba(255,255,255,0.85)' : `${textColor}aa` }}
            >
              {description}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                onClick={onCtaClick}
                className="group px-7 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ backgroundColor: primaryColor }}
              >
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#about"
                className="px-6 py-3.5 rounded-xl font-semibold border backdrop-blur-md transition-all duration-200 hover:bg-black/5"
                style={{ 
                  color: coverImage ? '#FFFFFF' : textColor,
                  borderColor: coverImage ? 'rgba(255,255,255,0.2)' : `${textColor}20`
                }}
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>

          {/* Visual Showcase Block */}
          {!coverImage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div 
                className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative border"
                style={{ borderColor: `${textColor}08` }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-tr" 
                  style={{ backgroundImage: `linear-gradient(to top right, ${primaryColor}20, ${secondaryColor}10)` }}
                />
                
                {/* Simulated Product Card Showcase */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6 w-72 space-y-4">
                    <div className="aspect-[4/3] rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr animate-pulse" style={{ backgroundImage: `linear-gradient(to top right, ${primaryColor}, ${secondaryColor})` }} />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-2/3 bg-gray-200 rounded" />
                      <div className="h-3 w-full bg-gray-100 rounded" />
                      <div className="h-3 w-5/6 bg-gray-100 rounded" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="h-5 w-16 bg-gray-200 rounded" />
                      <div className="h-8 w-20 rounded-lg" style={{ backgroundColor: primaryColor }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
