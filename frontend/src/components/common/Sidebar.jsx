import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Palette, BarChart3, ShoppingBag,
  Package, Bot, Settings, ChevronLeft, ChevronRight,
  Store, X, Sparkles, FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/builder', icon: Palette, label: 'Builder' },
  { path: '/templates', icon: FileText, label: 'Templates' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '/orders', icon: ShoppingBag, label: 'Orders' },
  { path: '/ai-assistant', icon: Bot, label: 'AI Assistant', badge: 'New' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ isOpen, onToggle, mobileOpen, onMobileClose }) {
  const { user } = useAuth();

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 bg-gray-900 flex flex-col
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        ${isOpen ? 'w-64' : 'w-20'}
      `}
    >
      {/* Brand header */}
      <div className={`flex items-center h-16 px-4 border-b border-gray-800/80 ${isOpen ? 'justify-between' : 'justify-center'}`}>
        {isOpen ? (
          <div className="flex items-center space-x-2 min-w-0">
            <div className="bg-gradient-to-br from-primary-500 to-secondary p-1.5 rounded-lg flex-shrink-0">
              <Store className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-display font-bold text-sm truncate">
                {user?.storeName || 'VendorHub'}
              </p>
              <p className="text-gray-500 text-xs truncate">{user?.email}</p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-primary-500 to-secondary p-1.5 rounded-lg">
            <Store className="h-5 w-5 text-white" />
          </div>
        )}

        {/* Collapse toggle (desktop) */}
        <button
          onClick={onToggle}
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors flex-shrink-0"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Close button (mobile) */}
        <button
          onClick={onMobileClose}
          className="lg:hidden text-gray-400 hover:text-white transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-thin">
        {isOpen && (
          <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main Menu
          </p>
        )}

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={onMobileClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500/20 to-secondary/10 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              } ${isOpen ? '' : 'justify-center'}`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary-400 to-secondary rounded-r-full" />
                )}

                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-400' : ''}`} />

                {isOpen && (
                  <>
                    <span className="ml-3 font-medium text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-primary-500 to-secondary text-white">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl border border-gray-700 z-50">
                    {item.label}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-gray-900 rotate-45 border-l border-b border-gray-700" />
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-gray-800/80">
        {isOpen ? (
          <div className="flex items-center px-3 py-2 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary/5 border border-primary-500/20">
            <Sparkles className="w-4 h-4 text-primary-400 flex-shrink-0" />
            <div className="ml-3 min-w-0">
              <p className="text-xs font-medium text-white">Pro Plan</p>
              <p className="text-[10px] text-gray-400">Unlimited features</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Sparkles className="w-5 h-5 text-primary-400" />
          </div>
        )}
      </div>
    </aside>
  );
}
