import React from 'react';
import { Mail, Share2, BarChart3, Target, Heart, MessageSquare } from 'lucide-react';

export default function MarketingTools() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
            Market your site from launch to scale
          </h2>
          <p className="text-xl text-gray-600">
            Don't just build a beautiful website. Drive traffic, capture leads, and convert visitors with our built-in suite of AI marketing tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main big card - Email Marketing */}
          <div className="lg:col-span-8 bg-gray-50 rounded-3xl p-8 lg:p-12 border border-gray-100 flex flex-col md:flex-row items-center gap-10 hover:shadow-xl transition-shadow">
            <div className="flex-1 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Mail className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-900">AI Email Campaigns</h3>
              <p className="text-lg text-gray-600">
                Aria writes high-converting email newsletters for your products automatically. Just pick a topic and hit send to your subscribers.
              </p>
            </div>
            
            <div className="flex-1 w-full max-w-sm glass rounded-2xl p-4 shadow-xl border border-gray-200 transform md:rotate-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Weekly Newsletter</div>
                  <div className="text-xs text-gray-500">To: All Subscribers</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-100 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                <div className="mt-4 aspect-video bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-200">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <div className="mt-4 h-8 w-1/3 bg-indigo-600 rounded mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Small card - Social Media */}
          <div className="lg:col-span-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 border border-pink-100 flex flex-col hover:shadow-xl transition-shadow relative overflow-hidden">
            <div className="relative z-10 space-y-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900">Social Media</h3>
              <p className="text-gray-600">Sync your store with Instagram & Facebook automatically.</p>
            </div>
            
            {/* Instagram style mockup */}
            <div className="mt-auto bg-white rounded-t-2xl shadow-lg border border-gray-200 p-4 pb-0 translate-y-4 relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <div className="text-xs font-bold">your_brand</div>
                </div>
                <div className="text-gray-400">...</div>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg mb-3"></div>
              <div className="flex space-x-3 mb-2 text-gray-600">
                <Heart className="h-5 w-5" />
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Small card - Analytics */}
          <div className="lg:col-span-5 bg-gray-900 rounded-3xl p-8 border border-gray-800 text-white flex flex-col hover:shadow-xl transition-shadow relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary-600 rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
            <div className="space-y-4 relative z-10 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-primary-400 border border-gray-700">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-display font-bold">Live Analytics</h3>
              <p className="text-gray-400">Track visitors, sales, and conversions in real-time.</p>
            </div>
            
            <div className="mt-auto space-y-4 relative z-10">
              <div className="flex justify-between items-end border-b border-gray-800 pb-2">
                <div className="text-gray-400 text-sm">Today's Sales</div>
                <div className="text-2xl font-bold text-white">$4,250</div>
              </div>
              <div className="flex space-x-2 h-16 items-end">
                {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Small card - SEO */}
          <div className="lg:col-span-7 bg-emerald-50 rounded-3xl p-8 lg:p-12 border border-emerald-100 flex items-center justify-between hover:shadow-xl transition-shadow">
            <div className="max-w-xs space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-900">SEO Tools</h3>
              <p className="text-lg text-gray-600">
                Outrank competitors with AI-generated metadata and perfectly structured pages.
              </p>
            </div>
            
            <div className="hidden md:block bg-white p-4 rounded-xl shadow-md border border-gray-200">
              <div className="text-emerald-600 font-medium text-sm mb-1 flex items-center"><Target className="w-4 h-4 mr-1"/> SEO Score: 98/100</div>
              <div className="h-2 w-48 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[98%] rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ImageIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
}
