import React from 'react';
import { Sparkles, LayoutGrid, Smartphone, ShoppingCart, Search, Headset } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Website Builder',
    description: 'Generate complete, stunning websites tailored to your brand in seconds with our advanced AI.',
    color: 'from-primary-400 to-primary-600'
  },
  {
    icon: LayoutGrid,
    title: 'Drag & Drop Editor',
    description: 'Customize every pixel without code. Our intuitive visual editor makes designing incredibly easy.',
    color: 'from-secondary to-fuchsia-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive',
    description: 'Your site automatically looks perfect on desktops, tablets, and smartphones out of the box.',
    color: 'from-accent to-blue-500'
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Ready',
    description: 'Sell products instantly with built-in inventory management, carts, and secure payment gateways.',
    color: 'from-emerald-400 to-emerald-600'
  },
  {
    icon: Search,
    title: 'SEO Optimized',
    description: 'Rank higher on Google with auto-generated meta tags, fast loading speeds, and semantic HTML.',
    color: 'from-amber-400 to-orange-500'
  },
  {
    icon: Headset,
    title: '24/7 Support',
    description: 'Our expert team and AI assistant are always available to help you scale your business.',
    color: 'from-rose-400 to-pink-600'
  }
];

export default function FeaturesSection() {
  return (
    <section id="product" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
            Everything you need to succeed online
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features packaged in a beautiful, easy-to-use interface. VendorHub replaces dozens of tools with one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
