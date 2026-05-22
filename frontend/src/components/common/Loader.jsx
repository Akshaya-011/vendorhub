import React from 'react';
import { Store } from 'lucide-react';

export default function Loader({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      {/* Animated logo */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary rounded-2xl blur-xl opacity-40 animate-pulse-slow" />
        <div className="relative bg-gradient-to-br from-primary-500 to-secondary p-4 rounded-2xl shadow-xl">
          <Store className="h-10 w-10 text-white" />
        </div>
      </div>

      {/* Spinner */}
      <div className="relative w-12 h-12 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin" />
      </div>

      {/* Text */}
      <p className="text-gray-500 font-medium text-sm tracking-wide">{message}</p>
    </div>
  );
}
