import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="md:col-span-4 lg:col-span-5">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-primary-600 p-2 rounded-xl">
                <Store className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-gray-900">VendorHub</span>
            </Link>
            <p className="text-gray-500 mb-8 max-w-sm">
              The AI-powered website builder platform that turns your ideas into reality in seconds. Built for the modern entrepreneur.
            </p>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-primary-600 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-600 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-600 transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-600 transition-colors"><Github className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4 text-gray-500">
              <li><Link to="/#features" className="hover:text-primary-600 transition-colors">Features</Link></li>
              <li><Link to="/templates" className="hover:text-primary-600 transition-colors">Templates</Link></li>
              <li><Link to="/#integrations" className="hover:text-primary-600 transition-colors">Integrations</Link></li>
              <li><Link to="/pricing" className="hover:text-primary-600 transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Hire an Expert</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-bold text-gray-900 mb-6">Subscribe to our newsletter</h4>
            <p className="text-gray-500 mb-4 text-sm">Get the latest news and articles to your inbox every month.</p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
              />
              <button className="w-full bg-gray-900 text-white px-4 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2026 VendorHub, Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
