import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTA({ themeConfig = {} }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const primaryColor = themeConfig.primaryColor || '#3B82F6';
  const textColor = themeConfig.textColor || '#0F172A';
  const backgroundColor = themeConfig.backgroundColor || '#FFFFFF';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 sm:py-24 overflow-hidden relative" style={{ backgroundColor: backgroundColor }}>
      
      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ backgroundColor: primaryColor }} />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-10 sm:p-16 border text-center relative overflow-hidden bg-gradient-to-tr"
          style={{ 
            borderColor: `${textColor}0b`,
            backgroundImage: `linear-gradient(to top right, ${backgroundColor}, ${primaryColor}06)`
          }}
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full" style={{ color: primaryColor, backgroundColor: `${primaryColor}10` }}>
              Join the Club
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight" style={{ color: textColor }}>
              Get 15% Off Your First Order
            </h2>
            <p className="text-sm opacity-70 leading-relaxed" style={{ color: textColor }}>
              Subscribe to our newsletter list and receive early-bird access to seasonal sales, limited item drops, and exclusive visual insights straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 pt-4 max-w-md mx-auto">
              <div className="relative w-full flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" style={{ color: textColor }} />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: `${textColor}15`, 
                    color: textColor,
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 font-bold rounded-xl text-white shadow-md flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                style={{ backgroundColor: primaryColor }}
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
                {!subscribed && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
