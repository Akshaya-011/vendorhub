import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Settings, Shield, BarChart3, FileText,
  ChevronLeft, ChevronRight, LogOut, Store, Bell, Search,
  Menu, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const adminNavItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
  { path: '/admin/users', icon: Users, label: 'Users' },
  { path: '/admin/vendors', icon: Store, label: 'Vendors' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/admin/reports', icon: FileText, label: 'Reports' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Admin Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 bg-gray-900 border-r border-gray-800 flex flex-col
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${sidebarOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Brand */}
        <div className={`flex items-center h-16 px-4 border-b border-gray-800 ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 p-1.5 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-display font-bold text-lg">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setMobileSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-orange-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                } ${sidebarOpen ? '' : 'justify-center'}`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="ml-3 font-medium text-sm">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-gray-800">
          <button
            onClick={logout}
            className={`flex items-center w-full px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors ${
              sidebarOpen ? '' : 'justify-center'
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="ml-3 font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top bar */}
        <header className="fixed top-0 right-0 left-0 lg:left-auto z-20 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200 flex items-center px-4 sm:px-6"
          style={{ width: 'auto', right: 0 }}
        >
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden mr-4 text-gray-500 hover:text-gray-900"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-500" />
            <h1 className="text-lg font-bold text-gray-900">Admin Dashboard</h1>
          </div>

          <div className="ml-auto flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{user?.name?.charAt(0) || 'A'}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-22 lg:pt-24"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
