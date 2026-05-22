import React from 'react';
import { Bot, Send, Sparkles, Wand2, Image as ImageIcon, Layout, Type } from 'lucide-react';

export default function Builder() {
  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Left Tools Panel */}
      <div className="w-80 flex-shrink-0 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
                placeholder="e.g. 'Make the hero section darker and add a call to action button'"
                className="w-full h-24 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button className="absolute bottom-3 right-3 p-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
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
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg hover:bg-white hover:border-primary-300 hover:text-primary-700 transition-colors"
                >
                  {suggestion}
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
            <button className="text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-secondary px-4 py-1.5 rounded-lg hover:shadow-md transition-all">
              Publish Site
            </button>
          </div>
        </div>

        {/* Canvas Content (Placeholder) */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center p-8 overflow-y-auto">
          <div className="w-full max-w-4xl h-full min-h-[800px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
            {/* Fake Website Header */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8">
              <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="flex space-x-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            </div>
            {/* Fake Website Hero */}
            <div className="px-8 py-20 flex items-center justify-between">
              <div className="w-1/2 space-y-6">
                <div className="h-12 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-5/6 mt-6 animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-4/6 animate-pulse" />
                <div className="w-32 h-10 bg-primary-200 rounded-lg mt-8 animate-pulse" />
              </div>
              <div className="w-5/12 aspect-square bg-gradient-to-br from-primary-100 to-secondary/20 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading Overlay (Hidden by default) */}
        {/* <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
          <div className="w-16 h-16 relative mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 animate-spin" />
            <Bot className="absolute inset-0 m-auto w-6 h-6 text-primary-600" />
          </div>
          <p className="font-medium text-gray-900">AI is applying your changes...</p>
        </div> */}
      </div>
    </div>
  );
}
