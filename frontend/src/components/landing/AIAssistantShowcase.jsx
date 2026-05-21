import React from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function AIAssistantShowcase() {
  return (
    <section className="py-32 bg-gray-900 relative overflow-hidden flex items-center justify-center min-h-[80vh]">
      {/* Dark modern background effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[500px] bg-gradient-to-r from-primary-600 via-secondary to-accent rounded-full blur-[150px] opacity-30 pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Floating AI Bubble */}
        <div className="mb-12 flex justify-center">
          <div className="glass-dark border border-white/20 p-4 rounded-full flex items-center space-x-4 animate-float shadow-[0_0_50px_rgba(139,92,246,0.3)]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-secondary to-primary-500 flex items-center justify-center relative">
              <Sparkles className="h-6 w-6 text-white" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-gray-900 rounded-full"></div>
            </div>
            <div className="pr-4 text-left">
              <p className="text-white font-medium">Aria is listening...</p>
              <p className="text-gray-400 text-sm">"Change the hero color to midnight blue"</p>
            </div>
          </div>
        </div>

        {/* Huge Typography */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-tight mb-8 tracking-tight">
          Prompt, ask, bounce ideas. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary-400 to-secondary">
            We can do it all together.
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
          I’m your personal web design and business expert tuned into your site. Tell me what you need, and watch it happen instantly.
        </p>

      </div>
    </section>
  );
}
