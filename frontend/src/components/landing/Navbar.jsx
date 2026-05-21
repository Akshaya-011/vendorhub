import React, { useState, useEffect } from 'react';
import { Store, Globe, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Product', 'Templates', 'Solutions', 'Resources', 'Pricing', 'Enterprise'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="bg-gradient-to-br from-primary-500 to-secondary p-2 rounded-xl shadow-lg">
              <Store className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight text-gray-900">VendorHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-600 hover:text-primary-600 font-medium transition-colors text-sm">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100">
              <Globe className="h-5 w-5" />
            </button>
            <button className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 transition-colors">
              Log In
            </button>
            <button className="bg-primary-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full border-t border-gray-100 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
              >
                {link}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col space-y-3">
              <button className="w-full text-center text-gray-700 hover:text-primary-600 font-medium py-3 border border-gray-200 rounded-xl">
                Log In
              </button>
              <button className="w-full text-center bg-primary-600 text-white py-3 rounded-xl font-medium shadow-md">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
