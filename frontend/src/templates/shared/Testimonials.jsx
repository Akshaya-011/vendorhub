import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Testimonials({ themeConfig = {} }) {
  const primaryColor = themeConfig.primaryColor || '#3B82F6';
  const textColor = themeConfig.textColor || '#0F172A';
  const backgroundColor = themeConfig.backgroundColor || '#FFFFFF';

  const reviews = [
    {
      name: "Marcus Vance",
      role: "Verified Purchase",
      comment: "Absolutely outstanding quality. The attention to detail is remarkable, and shipping was extremely fast. I'll definitely be returning!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      name: "Clara Reynolds",
      role: "Local Foodie",
      comment: "Exceeded all expectations! The product is incredibly reliable and the customer support team guided me through every step of setup.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      name: "Devon Carter",
      role: "Frequent Buyer",
      comment: "A breathtaking addition to my collection. Beautiful aesthetic designs mixed with extreme functionality. 10/10 recommendation!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-24" style={{ backgroundColor: `${backgroundColor}03` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mb-4" style={{ color: textColor }}>
            Loved by Customers
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: primaryColor }} />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl border relative flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow duration-300"
              style={{ borderColor: `${textColor}0b` }}
            >
              {/* Quote Mark Accent */}
              <Quote className="absolute top-6 right-6 w-10 h-10 opacity-5 pointer-events-none" style={{ color: primaryColor }} />

              <div className="space-y-4">
                <div className="flex gap-0.5">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed opacity-75" style={{ color: textColor }}>
                  "{rev.comment}"
                </p>
              </div>

              {/* User Block */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t" style={{ borderColor: `${textColor}08` }}>
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 shadow-sm"
                  style={{ borderColor: primaryColor }} 
                />
                <div>
                  <h4 className="font-bold text-sm" style={{ color: textColor }}>{rev.name}</h4>
                  <span className="text-[10px] font-semibold opacity-50" style={{ color: textColor }}>{rev.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
