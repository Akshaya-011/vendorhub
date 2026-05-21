import React from 'react';
import { Monitor, Tablet, Smartphone, Search, Menu, ShoppingCart } from 'lucide-react';

export default function BuilderPreview() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
            See it, click it, edit it
          </h2>
          <p className="text-xl text-gray-600">
            Our visual editor lets you build exactly what you want, right on the page. No clunky forms or hidden settings.
          </p>
        </div>

        {/* Browser Mockup */}
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative background blur */}
          <div className="absolute inset-0 bg-primary-200 blur-[100px] opacity-40 rounded-[3rem]"></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-10">
            
            {/* Browser Top Bar */}
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              
              <div className="bg-white rounded-md px-4 py-1 text-xs text-gray-500 w-64 text-center shadow-sm border border-gray-200">
                https://yourstore.vendorhub.com
              </div>
              
              <div className="flex space-x-3 text-gray-400">
                <Monitor className="h-4 w-4 text-primary-600" />
                <Tablet className="h-4 w-4 hover:text-gray-600 cursor-pointer" />
                <Smartphone className="h-4 w-4 hover:text-gray-600 cursor-pointer" />
              </div>
            </div>

            {/* Editor Canvas */}
            <div className="relative bg-white min-h-[500px]">
              {/* Highlight Box showing "editing" state */}
              <div className="absolute top-20 left-10 right-10 bottom-20 border-2 border-primary-500 bg-primary-50/10 rounded-lg pointer-events-none z-20 flex justify-end p-2">
                <div className="bg-primary-600 text-white text-xs px-2 py-1 rounded shadow-md pointer-events-auto cursor-pointer flex items-center space-x-1">
                  <span>Hero Section</span>
                </div>
              </div>

              {/* Dummy Site Content */}
              <div className="opacity-90">
                <header className="p-6 flex justify-between items-center">
                  <div className="font-display font-bold text-2xl tracking-tighter">VOGUE.</div>
                  <nav className="hidden md:flex space-x-8 text-sm font-medium">
                    <span>New Arrivals</span>
                    <span>Collections</span>
                    <span>About</span>
                  </nav>
                  <div className="flex space-x-4">
                    <Search className="h-5 w-5" />
                    <ShoppingCart className="h-5 w-5" />
                    <Menu className="h-5 w-5 md:hidden" />
                  </div>
                </header>

                <div className="px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div>
                    <h1 className="text-4xl md:text-6xl font-display font-medium leading-tight mb-6">
                      Autumn Collection <br/>2026
                    </h1>
                    <p className="text-gray-500 mb-8 max-w-sm">Discover the new season's trends with our curated selection of premium garments.</p>
                    <button className="bg-gray-900 text-white px-8 py-3 rounded-none font-medium">Shop Now</button>
                  </div>
                  <div className="bg-gray-100 aspect-[4/5] rounded-tl-[100px] rounded-br-[100px] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800&h=1000" alt="Fashion" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
