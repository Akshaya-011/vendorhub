import React from 'react';
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

export default function Footer({ vendorData, themeConfig = {} }) {
  const brandName = vendorData?.businessName || vendorData?.name || 'Our Premium Boutique';
  
  const primaryColor = themeConfig.primaryColor || '#3B82F6';
  const textColor = themeConfig.textColor || '#0F172A';
  const backgroundColor = themeConfig.backgroundColor || '#FFFFFF';

  const socialIcons = [
    { icon: Facebook, href: vendorData?.socialLinks?.facebook || '#' },
    { icon: Instagram, href: vendorData?.socialLinks?.instagram || '#' },
    { icon: Twitter, href: vendorData?.socialLinks?.twitter || '#' },
    { icon: MessageCircle, href: vendorData?.socialLinks?.linkedin || '#' },
  ];

  return (
    <footer 
      className="border-t py-12 sm:py-16 mt-auto transition-all"
      style={{ 
        backgroundColor: backgroundColor, 
        color: textColor,
        borderColor: `${textColor}0b`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-10 border-b" style={{ borderColor: `${textColor}0b` }}>
          
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xl sm:text-2xl font-bold font-display tracking-tight">
              {brandName}
            </span>
            <p className="text-xs sm:text-sm max-w-sm opacity-60 leading-relaxed">
              We specialize in offering high-end, carefully crafted items designed to elevate daily life experiences. Powered by VendorHub.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {socialIcons.map((soc, i) => (
                <a
                  key={i}
                  href={soc.href}
                  className="p-2 rounded-full border transition-all duration-200 hover:scale-105 hover:bg-black/5"
                  style={{ borderColor: `${textColor}15` }}
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-extrabold opacity-75">Customer Service</h4>
            <ul className="space-y-2 text-xs sm:text-sm opacity-60">
              <li><a href="#home" className="hover:opacity-100 transition-opacity">Contact Support</a></li>
              <li><a href="#products" className="hover:opacity-100 transition-opacity">Shipping & Returns</a></li>
              <li><a href="#about" className="hover:opacity-100 transition-opacity">F.A.Q.</a></li>
              <li><a href="#about" className="hover:opacity-100 transition-opacity">Store Locator</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-extrabold opacity-75">Get in Touch</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm opacity-60">
              {vendorData?.contactEmail && (
                <li>Email: <a href={`mailto:${vendorData.contactEmail}`} className="hover:underline font-medium">{vendorData.contactEmail}</a></li>
              )}
              {vendorData?.contactPhone && (
                <li>Phone: <span className="font-medium">{vendorData.contactPhone}</span></li>
              )}
              {vendorData?.address && (
                <li>Address: <span className="font-medium">{vendorData.address}</span></li>
              )}
              {!vendorData?.contactEmail && !vendorData?.contactPhone && !vendorData?.address && (
                <>
                  <li>Email: hello@yourbrand.com</li>
                  <li>Phone: +1 (555) 902-3920</li>
                  <li>Address: 48 Broadway, New York, NY</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Legal Grid */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-[10px] sm:text-xs opacity-50 space-y-3 sm:space-y-0">
          <span>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
