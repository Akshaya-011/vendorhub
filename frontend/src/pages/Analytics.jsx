import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, Users, MousePointerClick,
  ShoppingCart, Calendar, ChevronDown, Download,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const timeRanges = ['Last 7 days', 'Last 30 days', 'This Month', 'Last Year'];

const stats = [
  { label: 'Total Revenue', value: '₹24,592', change: '+12.5%', trend: 'up', icon: TrendingUp },
  { label: 'Store Visitors', value: '18,204', change: '+5.2%', trend: 'up', icon: Users },
  { label: 'Conversion Rate', value: '3.84%', change: '-0.4%', trend: 'down', icon: MousePointerClick },
  { label: 'Total Orders', value: '942', change: '+8.1%', trend: 'up', icon: ShoppingCart },
];

const topProducts = [
  { name: 'Wireless Noise-Canceling Headphones', sales: 245, revenue: '₹48,975', trend: '+12%' },
  { name: 'Ergonomic Office Chair', sales: 182, revenue: '₹36,218', trend: '+5%' },
  { name: 'Mechanical Gaming Keyboard', sales: 154, revenue: '₹19,980', trend: '-2%' },
  { name: '4K Ultra HD Smart TV', sales: 98, revenue: '₹58,702', trend: '+18%' },
  { name: 'Smart Home Security Hub', sales: 76, revenue: '₹9,112', trend: '+1%' },
];

export default function Analytics() {
  const [selectedRange, setSelectedRange] = useState(timeRanges[1]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Analytics Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Track your store's performance and growth.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <div className="relative">
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm cursor-pointer"
            >
              {timeRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change}
              </div>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-display font-bold text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart (Placeholder) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Revenue vs Orders</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary-500 rounded-full mr-2" />
                <span className="text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-secondary rounded-full mr-2" />
                <span className="text-gray-600">Orders</span>
              </div>
            </div>
          </div>
          
          <div className="h-72 w-full flex items-end justify-between px-2 pt-4 border-l border-b border-gray-100 relative">
             {/* Fake chart bars */}
             {[...Array(12)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1 w-full max-w-[40px] px-1 group">
                   <div className="w-full flex items-end gap-1 h-56 relative">
                     {/* Revenue bar */}
                     <div 
                       className="w-1/2 bg-primary-500 rounded-t-sm group-hover:bg-primary-600 transition-colors"
                       style={{ height: `${Math.max(20, Math.random() * 100)}%` }}
                     />
                     {/* Orders bar */}
                     <div 
                       className="w-1/2 bg-secondary rounded-t-sm group-hover:bg-secondary/80 transition-colors"
                       style={{ height: `${Math.max(10, Math.random() * 80)}%` }}
                     />
                   </div>
                   <span className="text-xs text-gray-400 mt-2 block">
                     {new Date(2026, i, 1).toLocaleString('default', { month: 'short' })}
                   </span>
                </div>
             ))}
          </div>
        </div>

        {/* Traffic Sources (Placeholder) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Traffic Sources</h3>
          
          {/* Fake donut chart */}
          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 rounded-full border-[16px] border-gray-100 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[16px] border-primary-500" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 50%)' }} />
              <div className="absolute inset-0 rounded-full border-[16px] border-secondary" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 50% 0)' }} />
              <div className="absolute inset-0 rounded-full border-[16px] border-accent" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0)' }} />
              
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">18.2k</p>
                <p className="text-xs text-gray-500">Total Visits</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Organic Search', value: '45%', color: 'bg-primary-500' },
              { label: 'Direct', value: '25%', color: 'bg-secondary' },
              { label: 'Social Media', value: '20%', color: 'bg-accent' },
              { label: 'Referral', value: '10%', color: 'bg-gray-300' },
            ].map(source => (
              <div key={source.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${source.color}`} />
                  <span className="text-gray-700 font-medium">{source.label}</span>
                </div>
                <span className="text-gray-900 font-bold">{source.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Top Performing Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Sales</th>
                <th className="px-6 py-4">Revenue</th>
                <th className="px-6 py-4 text-right">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topProducts.map((product, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{product.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{product.sales}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">{product.revenue}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      product.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {product.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
