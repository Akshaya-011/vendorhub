import React from 'react';
import { 
  Users, Store, CreditCard, Activity, 
  Search, Filter, MoreVertical, ShieldCheck, 
  AlertCircle, CheckCircle2 
} from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '12,489', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Vendors', value: '3,214', change: '+5%', icon: Store, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Platform Revenue', value: '$845.2k', change: '+18%', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'System Health', value: '99.9%', status: 'Optimal', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
];

const recentVendors = [
  { id: 1, name: "TechGadgets Pro", owner: "Alex Chen", plan: "Enterprise", status: "Active", joined: "2 hours ago" },
  { id: 2, name: "Organic Beauty", owner: "Sarah Miller", plan: "Professional", status: "Pending", joined: "5 hours ago" },
  { id: 3, name: "Urban Wear Co", owner: "Marcus Johnson", plan: "Starter", status: "Active", joined: "1 day ago" },
  { id: 4, name: "Handmade Crafts", owner: "Elena Gomez", plan: "Professional", status: "Suspended", joined: "2 days ago" },
  { id: 5, name: "Fitness Gear Hub", owner: "David Wilson", plan: "Starter", status: "Active", joined: "3 days ago" },
];

const getStatusBadge = (status) => {
  switch(status) {
    case 'Active': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle2 className="w-3 h-3 mr-1" /> Active</span>;
    case 'Pending': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><AlertCircle className="w-3 h-3 mr-1" /> Pending</span>;
    case 'Suspended': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><ShieldCheck className="w-3 h-3 mr-1" /> Suspended</span>;
    default: return null;
  }
};

export default function Admin() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Platform Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Super admin dashboard and system metrics.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
            {/* Decorative background element */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bg} rounded-full opacity-50`} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                {stat.change && (
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {stat.change}
                  </span>
                )}
                {stat.status && (
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    {stat.status}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-display font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Vendors Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Vendors</h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search stores..." 
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-48"
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Store Name</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">{vendor.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Joined {vendor.joined}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{vendor.owner}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                        vendor.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                        vendor.plan === 'Professional' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {vendor.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(vendor.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-6">System Activity</h2>
          
          <div className="space-y-6">
            {[
              { title: 'Database Backup Completed', time: '10 mins ago', type: 'success' },
              { title: 'New Template Published', time: '1 hour ago', type: 'info' },
              { title: 'API Rate Limit Warning', desc: 'Vendor #492 exceeded limits', time: '2 hours ago', type: 'warning' },
              { title: 'Payment Gateway Sync', time: '5 hours ago', type: 'success' },
              { title: 'Failed Login Attempts', desc: 'Multiple IP addresses detected', time: '1 day ago', type: 'error' },
            ].map((activity, i) => (
              <div key={i} className="flex relative pb-6 last:pb-0">
                {/* Timeline line */}
                {i !== 4 && <div className="absolute top-8 left-3.5 w-px h-full bg-gray-100" />}
                
                <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-4 ${
                  activity.type === 'success' ? 'bg-green-100 text-green-600' :
                  activity.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  activity.type === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-current" />
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                  {activity.desc && <p className="text-sm text-gray-500 mt-0.5">{activity.desc}</p>}
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            View Full Logs
          </button>
        </div>
      </div>
    </div>
  );
}
