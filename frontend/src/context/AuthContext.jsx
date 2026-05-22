import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

// Demo users for testing the routing system
const DEMO_USERS = {
  'admin@vendorhub.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@vendorhub.com',
    password: 'admin',
    role: 'admin',
    avatar: null,
    storeName: 'VendorHub Admin',
  },
  'vendor@vendorhub.com': {
    id: '2',
    name: 'Sarah Mitchell',
    email: 'vendor@vendorhub.com',
    password: 'vendor',
    role: 'vendor',
    avatar: null,
    storeName: 'Mitchell\'s Boutique',
    storeSlug: 'mitchells-boutique',
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for persisted auth on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vendorhub_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem('vendorhub_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    // Simulate API latency
    await new Promise((r) => setTimeout(r, 800));

    const demoUser = DEMO_USERS[email];
    if (demoUser && demoUser.password === password) {
      const { password: _, ...userData } = demoUser;
      setUser(userData);
      localStorage.setItem('vendorhub_user', JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  }, []);

  const register = useCallback(async ({ name, email, password, role = 'vendor' }) => {
    // Simulate API latency
    await new Promise((r) => setTimeout(r, 800));

    if (DEMO_USERS[email]) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
      avatar: null,
      storeName: `${name}'s Store`,
      storeSlug: name.toLowerCase().replace(/\s+/g, '-') + '-store',
    };

    setUser(newUser);
    localStorage.setItem('vendorhub_user', JSON.stringify(newUser));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('vendorhub_user');
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isVendor: user?.role === 'vendor',
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
