import React, { createContext, useContext, useState, useCallback } from 'react';
import { loginApi, registerApi } from '../services/authService';

// ─── Storage helpers ──────────────────────────────────────────────────────────
const TOKEN_KEY = 'artful_access_token';
const REFRESH_KEY = 'artful_refresh_token';
const USER_KEY = 'artful_user';

const storeTokens = (accessToken, refreshToken, user) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
};

const loadUser = () => {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadUser);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);

  const isAuthenticated = Boolean(accessToken && user);

  /** Login  */
  const login = useCallback(async ({ email, password }) => {
    const json = await loginApi({ email, password });
    storeTokens(json.accessToken, json.refreshToken, json.data);
    setAccessToken(json.accessToken);
    setUser(json.data);
    return json.data;
  }, []);

  /** Register  */
  const register = useCallback(async ({ name, email, password }) => {
    const json = await registerApi({ name, email, password });
    storeTokens(json.accessToken, json.refreshToken, json.data);
    setAccessToken(json.accessToken);
    setUser(json.data);
    return json.data;
  }, []);

  /** Logout */
  const logout = useCallback(() => {
    clearTokens();
    setAccessToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
