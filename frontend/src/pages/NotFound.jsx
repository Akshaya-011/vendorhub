import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 font-sans text-center">
      <div className="mb-8">
        <h1 className="text-9xl font-display font-black text-gray-200">404</h1>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
        Page not found
      </h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button onClick={() => window.history.back()} className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
        <Link to="/" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
