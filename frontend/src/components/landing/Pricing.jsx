import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '0',
    description: 'Perfect for trying out the platform and building your first store.',
    features: ['AI Website Generation', 'Free Subdomain', '100 Products', 'Basic Analytics', 'Community Support'],
    popular: false,
    cta: 'Start Free',
    bgColor: 'bg-white',
    border: 'border-gray-200'
  },
  {
    name: 'Professional',
    price: '29',
    description: 'Everything you need to run a growing e-commerce business.',
    features: ['Custom Domain', 'Unlimited Products', 'Advanced AI Marketing', '0% Transaction Fee', '24/7 Priority Support'],
    popular: true,
    cta: 'Get Professional',
    bgColor: 'bg-gray-900',
    border: 'border-gray-900'
  },
  {
    name: 'Enterprise',
    price: '99',
    description: 'Advanced features for scaling brands and agencies.',
    features: ['Multiple Stores', 'API Access', 'Custom Integrations', 'Dedicated Success Manager', 'White Label Options'],
    popular: false,
    cta: 'Contact Sales',
    bgColor: 'bg-white',
    border: 'border-gray-200'
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600">
            Start for free, upgrade when you need to. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`${plan.bgColor} rounded-3xl p-8 border ${plan.border} ${plan.popular ? 'shadow-2xl transform md:-translate-y-4' : 'shadow-sm'} relative flex flex-col`}>
              
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-500 to-secondary text-white text-sm font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>{plan.description}</p>
              
              <div className="mb-8">
                <span className={`text-5xl font-display font-extrabold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>${plan.price}</span>
                <span className={`text-lg ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold text-lg mb-8 transition-transform transform hover:-translate-y-1 ${
                plan.popular 
                  ? 'bg-gradient-to-r from-primary-500 to-secondary text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                {plan.cta}
              </button>

              <div className="space-y-4 mt-auto">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center space-x-3">
                    <CheckCircle2 className={`h-5 w-5 ${plan.popular ? 'text-primary-400' : 'text-primary-600'}`} />
                    <span className={`${plan.popular ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
