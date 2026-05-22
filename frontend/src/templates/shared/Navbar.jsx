import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function Navbar({ vendorData, themeConfig = {}, onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  
  const brandName = vendorData?.businessName || vendorData?.name || 'My Store';
  const logo = vendorData?.logo;
  
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const primaryColor = themeConfig.primaryColor || '#3B82F6';
  const backgroundColor = themeConfig.backgroundColor || '#FFFFFF';
  const textColor = themeConfig.textColor || '#0F172A';

  return (
    <nav 
      className="sticky top-0 z-40 border-b backdrop-blur-md shadow-sm transition-all duration-300"
      style={{ 
        backgroundColor: `${backgroundColor}dd`, 
        color: textColor,
        borderColor: `${textColor}15`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand/Logo */}
          <div className="flex-shrink-0 flex items-center">
            {logo ? (
              <img src={logo} alt={brandName} className="h-8 w-auto object-contain" />
            ) : (
              <span className="text-xl sm:text-2xl font-bold font-display tracking-tight hover:opacity-85 cursor-pointer">
                {brandName}
              </span>
            )}
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick || toggleCart}
              className="relative p-2.5 rounded-full hover:bg-black/5 transition-colors duration-200"
              style={{ color: textColor }}
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              <span 
                className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t overflow-hidden shadow-inner"
            style={{ 
              backgroundColor: backgroundColor,
              borderColor: `${textColor}10`
            }}
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-base font-medium opacity-80 hover:opacity-100 hover:bg-black/5 transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
