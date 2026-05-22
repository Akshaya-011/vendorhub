import React, { useState } from 'react';
import { Bot, Send, Sparkles, Wand2, Image as ImageIcon, Layout, Type, Plus, Pointer, Square, Video, FileText, MessageSquare, ArrowRight, X } from 'lucide-react';

export default function Builder() {
  const [prompt, setPrompt] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleAIAction = (actionLabel) => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      showToast(`AI successfully applied: ${actionLabel}`);
    }, 1500);
  };

  const handleToolbarAction = (elementName) => {
    showToast(`Added ${elementName} to canvas`);
  };

  const handlePromptSubmit = () => {
    if (!prompt.trim()) return;
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      showToast('AI updated website based on your instructions');
      setPrompt('');
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 relative overflow-hidden">
      
      {/* Toast Container */}
      <div className="absolute top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-right fade-in duration-300">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium">{toast.message}</span>
            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="ml-2 text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Left Tools Panel */}
      <div className="w-80 flex-shrink-0 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden z-20">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-display font-bold text-gray-900 flex items-center">
            <Sparkles className="w-5 h-5 text-primary-500 mr-2" />
            AI Website Builder
          </h2>
        </div>

        {/* Builder Tools */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Describe your change
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. 'Make the hero section darker and add a call to action button'"
                className="w-full h-24 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button 
                onClick={handlePromptSubmit}
                disabled={!prompt.trim() || isApplying}
                className="absolute bottom-3 right-3 p-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quick Actions
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Layout, label: 'Change Layout' },
                { icon: ImageIcon, label: 'Generate Images' },
                { icon: Type, label: 'Rewrite Copy' },
                { icon: Wand2, label: 'Auto Polish' },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleAIAction(action.label)}
                  className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-colors group"
                >
                  <action.icon className="w-5 h-5 text-gray-400 group-hover:text-primary-500 mb-1.5" />
                  <span className="text-xs font-medium text-gray-600 group-hover:text-primary-700">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              AI Suggestions
            </label>
            <div className="space-y-2">
              {[
                'Add a customer testimonial section',
                'Optimize images for faster loading',
                'Make buttons more prominent',
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => { setPrompt(suggestion); handlePromptSubmit(); }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg hover:bg-white hover:border-primary-300 hover:text-primary-700 transition-colors flex items-center justify-between group"
                >
                  <span>{suggestion}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative">
        {/* Canvas Toolbar */}
        <div className="h-14 border-b border-gray-100 flex items-center justify-between px-4 bg-gray-50/50">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Preview:</span>
            <span className="text-sm text-gray-500">Desktop</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              Discard Changes
            </button>
            <button 
              onClick={() => showToast('Website changes published live!')}
              className="text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-secondary px-4 py-1.5 rounded-lg hover:shadow-md transition-all"
            >
              Publish Site
            </button>
          </div>
        </div>

        {/* Floating Toolbar (Icons) */}
        <div className="absolute left-6 top-24 w-14 bg-white/90 backdrop-blur-md rounded-2xl p-2 flex flex-col items-center space-y-3 shadow-xl border border-gray-100 z-30">
          <button 
            onClick={() => handleToolbarAction('Section')}
            className="p-2 bg-primary-100 text-primary-600 rounded-xl hover:bg-primary-200 transition-colors" title="Add Section">
            <Plus className="h-5 w-5" />
          </button>
          <div className="w-8 h-px bg-gray-200 my-1"></div>
          {[
            { icon: Layout, label: 'Layout block' },
            { icon: Type, label: 'Text block' },
            { icon: ImageIcon, label: 'Image widget' },
            { icon: Pointer, label: 'Interactive Button' },
            { icon: Square, label: 'Image Gallery' },
            { icon: Video, label: 'Video Player' },
            { icon: FileText, label: 'Contact Form' },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => handleToolbarAction(item.label)}
              className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors relative group"
            >
              <item.icon className="h-5 w-5" />
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                {item.label}
              </div>
            </button>
          ))}
        </div>

        {/* Canvas Content (Mockup) */}
        <div className={`flex-1 bg-gray-100 flex items-center justify-center p-8 overflow-y-auto transition-opacity duration-300 ${isApplying ? 'opacity-40' : 'opacity-100'}`}>
          <div className="w-full max-w-4xl h-full min-h-[800px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 relative">
            
            {/* Fake Website Content */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white">
              <div className="w-32 h-6 bg-gradient-to-r from-emerald-800 to-emerald-600 rounded" />
              <div className="flex space-x-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-16 h-2 bg-gray-200 rounded-full" />
                ))}
              </div>
            </div>
            
            <div className="px-8 py-20 flex items-center justify-between bg-emerald-50">
              <div className="w-1/2 space-y-6">
                <div className="h-12 bg-emerald-900/10 rounded-lg w-3/4" />
                <div className="h-12 bg-emerald-900/10 rounded-lg w-full" />
                <div className="h-4 bg-emerald-800/10 rounded-full w-5/6 mt-6" />
                <div className="h-4 bg-emerald-800/10 rounded-full w-4/6" />
                <div className="w-32 h-10 bg-emerald-800 rounded-lg mt-8" />
              </div>
              <div className="w-5/12 aspect-square bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-emerald-900/20" />
              </div>
            </div>
            
          </div>
        </div>

        {/* Loading Overlay */}
        {isApplying && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center">
            <div className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center border border-gray-100">
              <div className="w-16 h-16 relative mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 animate-spin" />
                <Bot className="absolute inset-0 m-auto w-6 h-6 text-primary-600 animate-pulse" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">AI is applying your changes</h3>
              <p className="text-sm text-gray-500 mt-1">Generating layout and styles...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
