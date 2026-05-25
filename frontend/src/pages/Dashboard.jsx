import React from 'react';

export default function Dashboard() {

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: formatINR(12426),
      change: '+14.5%',
    },
    {
      title: 'Total Orders',
      value: '1,243',
      change: '+8.2%',
    },
    {
      title: 'Visitors',
      value: '8,942',
      change: '-2.1%',
    },
    {
      title: 'Conversion',
      value: '3.24%',
      change: '+0.8%',
    },
  ];

  const recentOrders = [
    {
      id: '#VH-4521',
      customer: 'Emily Chen',
      product: 'Wireless Earbuds Pro',
      amount: formatINR(89.99),
      status: 'Completed',
    },
    {
      id: '#VH-4520',
      customer: 'Marcus Johnson',
      product: 'Smart Watch Band',
      amount: formatINR(34.5),
      status: 'Processing',
    },
    {
      id: '#VH-4519',
      customer: 'Sofia Rodriguez',
      product: 'Phone Case Premium',
      amount: formatINR(24.99),
      status: 'Shipped',
    },
    {
      id: '#VH-4518',
      customer: 'James Williams',
      product: 'USB-C Hub Adapter',
      amount: formatINR(59.99),
      status: 'Completed',
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back, Malla 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border"
          >

            <p className="text-gray-500 text-sm">
              {item.title}
            </p>

            <div className="flex items-center justify-between mt-3">

              <h2 className="text-3xl font-bold">
                {item.value}
              </h2>

              <span
                className={`text-sm font-semibold ${
                  item.change.includes('-')
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                {item.change}
              </span>

            </div>
          </div>
        ))}

      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border">

          <div className="p-6 border-b flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Recent Orders
            </h2>

            <button
              onClick={() => window.location.href = '/orders'}
              className="text-blue-600 font-semibold"
            >
              View All
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="text-left text-gray-500 text-sm border-b">

                  <th className="p-5">ORDER</th>
                  <th className="p-5">CUSTOMER</th>
                  <th className="p-5">PRODUCT</th>
                  <th className="p-5">AMOUNT</th>
                  <th className="p-5">STATUS</th>

                </tr>

              </thead>

              <tbody>

                {recentOrders.map((order, index) => (

                  <tr
                    key={index}
                    className="border-b last:border-none"
                  >

                    <td className="p-5 font-semibold">
                      {order.id}
                    </td>

                    <td className="p-5">
                      {order.customer}
                    </td>

                    <td className="p-5">
                      {order.product}
                    </td>

                    <td className="p-5 font-semibold">
                      {order.amount}
                    </td>

                    <td className="p-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
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
        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {/* Add Product */}
            <button
              onClick={() => window.location.href = '/products'}
              className="bg-purple-100 hover:bg-purple-200 rounded-2xl p-5 font-semibold transition"
            >
              Add Product
            </button>

            {/* Analytics */}
            <button
              onClick={() => window.location.href = '/analytics'}
              className="bg-green-100 hover:bg-green-200 rounded-2xl p-5 font-semibold transition"
            >
              View Analytics
            </button>

            {/* Inventory */}
            <button
              onClick={() => window.location.href = '/products'}
              className="bg-orange-100 hover:bg-orange-200 rounded-2xl p-5 font-semibold transition"
            >
              Manage Inventory
            </button>

            {/* Calendar */}
            <button
              onClick={() => window.location.href = '/calendar'}
              className="bg-pink-100 hover:bg-pink-200 rounded-2xl p-5 font-semibold transition"
            >
              View Calendar
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}