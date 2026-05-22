import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

// Demo users for offline fallback
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
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const userData = data.data.user;
        setUser(userData);
        localStorage.setItem('vendorhub_user', JSON.stringify(userData));
        localStorage.setItem('token', data.data.token);
        return { success: true };
      } else {
        throw new Error(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.warn('Backend login failed, attempting local fallback:', error.message);
      
      // Offline fallback
      await new Promise((r) => setTimeout(r, 500));
      const demoUser = DEMO_USERS[email];
      
      if (demoUser && demoUser.password === password) {
        const { password: _, ...userData } = demoUser;
        setUser(userData);
        localStorage.setItem('vendorhub_user', JSON.stringify(userData));
        localStorage.setItem('token', 'simulated_token');
        return { success: true };
      }
      return { success: false, error: error.message === 'Failed to fetch' ? 'Server is offline and credentials do not match demo users' : error.message };
    }
  }, []);

  const register = useCallback(async ({ name, email, password, role = 'vendor' }) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const userData = data.data.user;
        setUser(userData);
        localStorage.setItem('vendorhub_user', JSON.stringify(userData));
        localStorage.setItem('token', data.data.token);
        return { success: true };
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.warn('Backend register failed, attempting local fallback:', error.message);
      
      // Offline fallback
      await new Promise((r) => setTimeout(r, 500));
      
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
      localStorage.setItem('token', 'simulated_token');
      return { success: true };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('vendorhub_user');
    localStorage.removeItem('token');
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
