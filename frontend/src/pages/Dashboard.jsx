import React from 'react';
import {
  TrendingUp, DollarSign, ShoppingBag, Users, Eye,
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Plus, Calendar, BarChart3, Package
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const stats = [
  {
    label: 'Total Revenue',
    value: '$12,426',
    change: '+14.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
  },
  {
    label: 'Total Orders',
    value: '1,243',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'from-primary-500 to-secondary',
    bg: 'bg-primary-50',
  },
  {
    label: 'Visitors',
    value: '8,942',
    change: '-2.1%',
    trend: 'down',
    icon: Users,
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
  },
  {
    label: 'Conversion',
    value: '3.24%',
    change: '+0.8%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
  },
];

const recentOrders = [
  { id: '#VH-4521', customer: 'Emily Chen', product: 'Wireless Earbuds Pro', amount: '$89.99', status: 'Completed', time: '2 min ago' },
  { id: '#VH-4520', customer: 'Marcus Johnson', product: 'Smart Watch Band', amount: '$34.50', status: 'Processing', time: '15 min ago' },
  { id: '#VH-4519', customer: 'Sofia Rodriguez', product: 'Phone Case Premium', amount: '$24.99', status: 'Shipped', time: '1 hr ago' },
  { id: '#VH-4518', customer: 'James Williams', product: 'USB-C Hub Adapter', amount: '$59.99', status: 'Completed', time: '2 hrs ago' },
  { id: '#VH-4517', customer: 'Anna Schmidt', product: 'Laptop Stand Pro', amount: '$129.00', status: 'Processing', time: '3 hrs ago' },
];

const statusColors = {
  Completed: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-amber-100 text-amber-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const quickActions = [
  { label: 'Add Product', icon: Plus, color: 'from-primary-500 to-secondary' },
  { label: 'View Analytics', icon: BarChart3, color: 'from-emerald-500 to-teal-500' },
  { label: 'Manage Inventory', icon: Package, color: 'from-amber-500 to-orange-500' },
  { label: 'View Calendar', icon: Calendar, color: 'from-pink-500 to-rose-500' },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} p-2.5 rounded-xl`}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color === 'from-emerald-500 to-teal-500' ? '#10b981' : stat.color === 'from-primary-500 to-secondary' ? '#5B5EF7' : stat.color === 'from-amber-500 to-orange-500' ? '#f59e0b' : '#ec4899' }} />
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-display font-bold text-gray-900">{stat.value}</p>
              <div className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-display font-bold text-gray-900">Recent Orders</h2>
            <button className="text-sm text-primary-600 font-medium hover:text-primary-700">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Product</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-medium text-gray-900">{order.id}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-gray-700">{order.customer}</span>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span className="text-sm text-gray-500">{order.product}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-semibold text-gray-900">{order.amount}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => (
              <button
                key={i}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Mini chart placeholder */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">Revenue Trend</p>
              <span className="text-xs text-emerald-600 font-medium">+14.5%</span>
            </div>
            <div className="flex items-end space-x-1.5 h-16">
              {[40, 55, 35, 65, 50, 75, 60, 85, 70, 90, 80, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-primary-500 to-secondary opacity-60 hover:opacity-100 transition-opacity"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
