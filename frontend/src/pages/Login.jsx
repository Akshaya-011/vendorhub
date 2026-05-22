import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Store, Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  const fillDemo = (type) => {
    if (type === 'admin') {
      setEmail('admin@vendorhub.com');
      setPassword('admin');
    } else {
      setEmail('vendor@vendorhub.com');
      setPassword('vendor');
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden items-center justify-center p-12">
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-md">
          <Link to="/" className="flex items-center space-x-3 mb-10">
            <div className="bg-gradient-to-br from-primary-500 to-secondary p-2.5 rounded-xl shadow-lg">
              <Store className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-display font-bold text-white">VendorHub</span>
          </Link>

          <h2 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
            Welcome back to your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent">
              digital storefront
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Manage your store, track analytics, and grow your business with AI-powered tools.
          </p>

          <div className="flex items-center space-x-3 text-gray-500">
            <Sparkles className="w-5 h-5 text-primary-400" />
            <span className="text-sm">Trusted by 10,000+ vendors worldwide</span>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-primary-500 to-secondary p-2 rounded-xl">
                <Store className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-gray-900">VendorHub</span>
            </Link>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Sign in</h1>
            <p className="text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 font-medium hover:text-primary-700">
                Create one
              </Link>
            </p>
          </div>

          {/* Demo credentials hint */}
          <div className="mb-6 p-4 bg-primary-50 border border-primary-100 rounded-xl">
            <p className="text-xs font-semibold text-primary-700 mb-2">Demo Credentials</p>
            <div className="flex gap-2">
              <button
                onClick={() => fillDemo('vendor')}
                className="flex-1 text-xs bg-white text-primary-600 py-2 px-3 rounded-lg border border-primary-200 hover:bg-primary-50 transition-colors font-medium"
              >
                Vendor Login
              </button>
              <button
                onClick={() => fillDemo('admin')}
                className="flex-1 text-xs bg-white text-primary-600 py-2 px-3 rounded-lg border border-primary-200 hover:bg-primary-50 transition-colors font-medium"
              >
                Admin Login
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <button type="button" className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3.5 rounded-xl font-semibold text-base hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            By signing in, you agree to our{' '}
            <a href="#" className="underline hover:text-gray-600">Terms</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
