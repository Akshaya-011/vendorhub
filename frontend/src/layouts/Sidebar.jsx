import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {

  const navStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-xl mb-2 font-semibold transition ${
      isActive
        ? 'bg-black text-white'
        : 'bg-gray-100 text-black hover:bg-gray-200'
    }`;

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-5">

      <h1 className="text-2xl font-bold mb-8">
        VendorHub
      </h1>

      <NavLink to="/dashboard" className={navStyle}>
        Dashboard
      </NavLink>

      <NavLink to="/products" className={navStyle}>
        Products
      </NavLink>

      <NavLink to="/analytics" className={navStyle}>
        Analytics
      </NavLink>

      <NavLink to="/templates" className={navStyle}>
        Templates
      </NavLink>

      <NavLink to="/orders" className={navStyle}>
        Orders
      </NavLink>

      <NavLink to="/settings" className={navStyle}>
        Settings
      </NavLink>

    </div>
  );
}