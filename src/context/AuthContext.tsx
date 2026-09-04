import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, LanguageCode } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    farmName?: string;
    location?: string;
    farmSize?: number;
    primaryCrop?: string;
    preferredLanguage?: LanguageCode;
  }) => Promise<{ success: boolean; error?: string; message?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (updatedUser: User) => void;
  welcomeMessage: string | null;
  clearWelcomeMessage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);

  const fetchCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/me', {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.warn('Auth check could not reach backend:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (identifier: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        const errMsg = data.error || 'Invalid name/email or password.';
        setError(errMsg);
        return { success: false, error: errMsg };
      }

      setUser(data.user);
      setWelcomeMessage(`Welcome, ${data.user.name}!`);
      return { success: true };
    } catch (err: any) {
      console.error('Login error:', err);
      const errMsg = 'Something went wrong. Please try again.';
      setError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  const signup = async (formData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    farmName?: string;
    location?: string;
    farmSize?: number;
    primaryCrop?: string;
    preferredLanguage?: LanguageCode;
  }): Promise<{ success: boolean; error?: string; message?: string }> => {
    try {
      setError(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        const errMsg = data.error || 'Something went wrong. Please try again.';
        setError(errMsg);
        return { success: false, error: errMsg };
      }

      // Automatically authenticate on signup
      setUser(data.user);
      setWelcomeMessage(`Welcome, ${data.user.name}!`);
      return {
        success: true,
        message: data.message || 'Account created successfully! Welcome to FAR[M]ATE.',
      };
    } catch (err: any) {
      console.error('Signup error:', err);
      const errMsg = 'Something went wrong. Please try again.';
      setError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.warn('Logout network error:', e);
    } finally {
      setUser(null);
      setWelcomeMessage(null);
    }
  };

  const refreshUser = async () => {
    await fetchCurrentUser();
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const clearWelcomeMessage = () => {
    setWelcomeMessage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        refreshUser,
        updateUser,
        welcomeMessage,
        clearWelcomeMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
