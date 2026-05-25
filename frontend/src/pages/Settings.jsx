import React, { useState, useEffect } from 'react';

export default function Settings() {
  // Store Settings State
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'VendorHub',
    storeEmail: 'akshayamalla09@gmail.com',
    storePhone: '',
    storeAddress: '',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotionalEmails: false,
    smsAlerts: false,
  });

  // Appearance Settings
  const [appearance, setAppearance] = useState({
    theme: 'light',
    compactView: false,
    sidebarCollapsed: false,
  });

  // Security Settings
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
  });

  // Password Change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Invoice Settings
  const [invoiceSettings, setInvoiceSettings] = useState({
    invoicePrefix: 'INV',
    taxRate: 18,
    footerNote: 'Thank you for your business!',
  });

  const [activeTab, setActiveTab] = useState('general');
  const [saveMessage, setSaveMessage] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedStore = localStorage.getItem('vendorhub_store_settings');
    const savedNotifications = localStorage.getItem('vendorhub_notification_settings');
    const savedAppearance = localStorage.getItem('vendorhub_appearance_settings');
    const savedSecurity = localStorage.getItem('vendorhub_security_settings');
    const savedInvoice = localStorage.getItem('vendorhub_invoice_settings');

    if (savedStore) setStoreSettings(JSON.parse(savedStore));
    if (savedNotifications) setNotificationSettings(JSON.parse(savedNotifications));
    if (savedAppearance) setAppearance(JSON.parse(savedAppearance));
    if (savedSecurity) setSecurity(JSON.parse(savedSecurity));
    if (savedInvoice) setInvoiceSettings(JSON.parse(savedInvoice));
  }, []);

  // Save all settings
  const saveAllSettings = () => {
    localStorage.setItem('vendorhub_store_settings', JSON.stringify(storeSettings));
    localStorage.setItem('vendorhub_notification_settings', JSON.stringify(notificationSettings));
    localStorage.setItem('vendorhub_appearance_settings', JSON.stringify(appearance));
    localStorage.setItem('vendorhub_security_settings', JSON.stringify(security));
    localStorage.setItem('vendorhub_invoice_settings', JSON.stringify(invoiceSettings));
    
    setSaveMessage('✅ Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('❌ New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('❌ Password must be at least 6 characters!');
      return;
    }
    alert('✅ Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordForm(false);
  };

  // Handle store data export
  const exportData = () => {
    const exportData = {
      storeSettings,
      notificationSettings,
      appearance,
      security,
      invoiceSettings,
      exportDate: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vendorhub_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    alert('📥 Data exported successfully!');
  };

  // Handle data import
  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (imported.storeSettings) setStoreSettings(imported.storeSettings);
          if (imported.notificationSettings) setNotificationSettings(imported.notificationSettings);
          if (imported.appearance) setAppearance(imported.appearance);
          if (imported.security) setSecurity(imported.security);
          if (imported.invoiceSettings) setInvoiceSettings(imported.invoiceSettings);
          alert('✅ Settings imported successfully!');
        } catch (error) {
          alert('❌ Invalid backup file!');
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs = [
    { id: 'general', name: '🏪 General', icon: '🏪' },
    { id: 'notifications', name: '🔔 Notifications', icon: '🔔' },
    { id: 'appearance', name: '🎨 Appearance', icon: '🎨' },
    { id: 'security', name: '🔒 Security', icon: '🔒' },
    { id: 'invoice', name: '🧾 Invoice', icon: '🧾' },
    { id: 'data', name: '💾 Data', icon: '💾' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-500 mt-1">Manage your store preferences and configurations</p>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl text-center animate-in fade-in">
            {saveMessage}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-t-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          
          {/* General Settings Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">🏪 General Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  <input
                    type="text"
                    value={storeSettings.storeName}
                    onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Email</label>
                  <input
                    type="email"
                    value={storeSettings.storeEmail}
                    onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={storeSettings.storePhone}
                    onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 12345 67890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    value={storeSettings.currency}
                    onChange={(e) => setStoreSettings({...storeSettings, currency: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="INR">₹ Indian Rupee (INR)</option>
                    <option value="USD">$ US Dollar (USD)</option>
                    <option value="EUR">€ Euro (EUR)</option>
                    <option value="GBP">£ British Pound (GBP)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Address</label>
                  <textarea
                    value={storeSettings.storeAddress}
                    onChange={(e) => setStoreSettings({...storeSettings, storeAddress: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Your full store address"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">🔔 Notification Preferences</h2>
              
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: '📧 Email Notifications', desc: 'Receive email updates about your store' },
                  { key: 'orderUpdates', label: '📦 Order Updates', desc: 'Get notified when new orders arrive' },
                  { key: 'promotionalEmails', label: '🎯 Promotional Emails', desc: 'Receive offers and product updates' },
                  { key: 'smsAlerts', label: '📱 SMS Alerts', desc: 'Get instant SMS for urgent updates' },
                ].map(notif => (
                  <label key={notif.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                    <div>
                      <span className="font-medium text-gray-800">{notif.label}</span>
                      <p className="text-sm text-gray-500">{notif.desc}</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 transition-all duration-300">
                      <input
                        type="checkbox"
                        checked={notificationSettings[notif.key]}
                        onChange={(e) => setNotificationSettings({...notificationSettings, [notif.key]: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-all"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">🎨 Appearance Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <div className="flex gap-3">
                    {['light', 'dark', 'auto'].map(theme => (
                      <button
                        key={theme}
                        onClick={() => setAppearance({...appearance, theme})}
                        className={`px-4 py-2 rounded-lg capitalize transition-all ${
                          appearance.theme === theme
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setAppearance({...appearance, compactView: false})}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        !appearance.compactView
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Comfortable
                    </button>
                    <button
                      onClick={() => setAppearance({...appearance, compactView: true})}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        appearance.compactView
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Compact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">🔒 Security Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <span className="font-medium text-gray-800">Two-Factor Authentication</span>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      checked={security.twoFactorAuth}
                      onChange={(e) => setSecurity({...security, twoFactorAuth: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <select
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    🔑 Change Password
                  </button>
                  
                  {showPasswordForm && (
                    <form onSubmit={handlePasswordChange} className="mt-4 space-y-4 p-4 bg-gray-50 rounded-xl">
                      <input
                        type="password"
                        placeholder="Current Password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <div className="flex gap-3">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Update Password</button>
                        <button type="button" onClick={() => setShowPasswordForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Cancel</button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Invoice Tab */}
          {activeTab === 'invoice' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">🧾 Invoice Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Prefix</label>
                  <input
                    type="text"
                    value={invoiceSettings.invoicePrefix}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, invoicePrefix: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="INV"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                  <input
                    type="number"
                    value={invoiceSettings.taxRate}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, taxRate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Footer Note</label>
                  <textarea
                    value={invoiceSettings.footerNote}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, footerNote: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows="2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Data Management Tab */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">💾 Data Management</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-2">📤 Export Data</h3>
                  <p className="text-sm text-gray-600 mb-4">Download all your settings as a backup file</p>
                  <button onClick={exportData} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Export Settings
                  </button>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-2">📥 Import Data</h3>
                  <p className="text-sm text-gray-600 mb-4">Restore settings from a backup file</p>
                  <label className="cursor-pointer">
                    <input type="file" accept=".json" onChange={importData} className="hidden" />
                    <span className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 inline-block">
                      Import Settings
                    </span>
                  </label>
                </div>

                <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-2">🔄 Reset All Settings</h3>
                  <p className="text-sm text-gray-600 mb-4">Reset everything to default values</p>
                  <button 
                    onClick={() => {
                      if(window.confirm('⚠️ Are you sure? This will erase all your settings!')) {
                        localStorage.clear();
                        window.location.reload();
                      }
                    }} 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={saveAllSettings}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              💾 Save All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
