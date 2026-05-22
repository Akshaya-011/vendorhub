import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, PlayCircle, CheckCircle2, Type, Image as ImageIcon, Pointer, Layout, Square, Video, FileText, MessageSquare, Plus, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary-200/50 blur-[100px] mix-blend-multiply opacity-70 animate-float"></div>
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/20 blur-[100px] mix-blend-multiply opacity-70 animate-float-delayed"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px] mix-blend-multiply opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Side: Copy */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-100 px-3 py-1.5 rounded-full text-primary-700 font-medium text-sm mb-6">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Website Builder</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-gray-900 leading-[1.1] mb-6">
              Create your dream <br/>
              <span className="text-gradient">website with AI</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              Build stunning, responsive websites in minutes. No coding. No limits. Just your business.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
              <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-[0_8px_30px_rgb(91,94,247,0.3)] hover:shadow-[0_8px_30px_rgb(91,94,247,0.5)] transform hover:-translate-y-1 flex items-center justify-center space-x-2">
                <span>Start Building for Free</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="#features" className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-sm flex items-center justify-center space-x-2">
                <PlayCircle className="h-5 w-5 text-gray-600" />
                <span>Watch how it works</span>
              </a>
            </div>
            
            <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-gray-600 font-medium">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>AI website generation</span>
              </div>
            </div>
          </div>

          {/* Right Side: Builder Mockup */}
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[600px] z-10 perspective-1000">
            {/* Main Canvas */}
            <div className="absolute inset-0 bg-gray-100 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden transform rotate-y-[-5deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-0">
              {/* Builder Header */}
              <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 justify-between">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="bg-gray-100 px-4 py-1 rounded-md text-xs font-medium text-gray-500">
                  myshop.vendorhub.com
                </div>
                <button className="bg-primary-600 text-white text-xs px-3 py-1.5 rounded-md font-medium">
                  Publish
                </button>
              </div>
              
              {/* Plant Store Live Preview */}
              <div className="h-full w-full bg-white overflow-y-auto pb-12">
                {/* Store Header */}
                <header className="p-6 flex justify-between items-center border-b border-gray-100">
                  <div className="text-xl font-serif font-bold text-emerald-900">Botanica.</div>
                  <div className="flex space-x-6 text-sm text-gray-600">
                    <span>Shop</span><span>Care Guide</span><span>About</span>
                  </div>
                </header>
                {/* Store Hero */}
                <div className="bg-emerald-50 p-10 flex flex-col items-center text-center">
                  <h2 className="text-3xl font-serif text-emerald-950 mb-3">Bring Nature Indoors</h2>
                  <p className="text-emerald-700 mb-6 text-sm">Curated plants for your modern space.</p>
                  <button className="bg-emerald-900 text-white px-6 py-2 rounded text-sm">Shop Collection</button>
                </div>
                {/* Store Products */}
                <div className="p-8">
                  <div className="grid grid-cols-3 gap-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3">
                        <div className="w-full aspect-square bg-gray-200 rounded-md mb-3 overflow-hidden relative group">
                           {/* Placeholder for plant image, using generic green block to simulate */}
                           <div className="absolute inset-0 bg-emerald-100/50"></div>
                        </div>
                        <div className="text-sm font-medium">Monstera Deliciosa</div>
                        <div className="text-xs text-gray-500 mt-1">$45.00</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Left Toolbar */}
            <div className="absolute left-[-20px] top-20 w-16 glass-panel rounded-2xl p-3 flex flex-col items-center space-y-4 z-20 animate-float shadow-2xl">
              <div className="p-2 bg-primary-100 text-primary-600 rounded-xl cursor-pointer">
                <Plus className="h-5 w-5" />
              </div>
              <div className="w-full h-px bg-gray-200 my-1"></div>
              {[
                { icon: Layout, label: 'Section' },
                { icon: Type, label: 'Text' },
                { icon: ImageIcon, label: 'Image' },
                { icon: Pointer, label: 'Button' },
                { icon: Square, label: 'Gallery' },
                { icon: Video, label: 'Video' },
                { icon: FileText, label: 'Form' },
              ].map((item, i) => (
                <div key={i} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl cursor-pointer transition-colors group relative">
                  <item.icon className="h-5 w-5" />
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating AI Assistant */}
            <div className="absolute right-[-30px] bottom-10 w-72 glass-panel rounded-2xl p-4 z-30 shadow-2xl animate-float-delayed border border-white/60">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-secondary to-primary-500 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Hi! I'm Aria 👋</h4>
                  <p className="text-xs text-gray-500">Your AI Web Designer</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700 mb-4 border border-gray-100">
                How can I help you build your website today?
              </div>
              
              <div className="space-y-2">
                {[
                  "Create a hero section",
                  "Write content for my store",
                  "Suggest color palette",
                  "Add a contact form"
                ].map((suggestion, i) => (
                  <button key={i} className="w-full text-left text-xs font-medium text-gray-600 bg-white border border-gray-200 hover:border-primary-300 hover:text-primary-600 rounded-lg px-3 py-2 transition-colors flex items-center justify-between group">
                    <span>{suggestion}</span>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
              
              <div className="mt-4 relative">
                <input type="text" placeholder="Ask Aria anything..." className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-1 rounded-full">
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
