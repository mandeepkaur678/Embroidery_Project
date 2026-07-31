import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginApi, registerApi } from '../services/authService';
import { getUserProfileApi, updateUserProfileApi, addUserAddressApi, updateUserAddressApi, deleteUserAddressApi } from '../services/userService';

// ─── Storage helpers ──────────────────────────────────────────────────────────
const TOKEN_KEY = 'artful_access_token';
const REFRESH_KEY = 'artful_refresh_token';
const USER_KEY = 'artful_user';

const storeTokens = (accessToken, refreshToken, user) => {
  if (accessToken) localStorage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
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
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(accessToken && user);

  // Sync user profile on mount if token exists
  const refreshUserProfile = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;
    try {
      setLoading(true);
      const userData = await getUserProfileApi();
      setUser(userData);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch (err) {
      console.warn('Could not sync user profile from server:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      refreshUserProfile();
    }
  }, [accessToken, refreshUserProfile]);

  /** Login  */
  const login = useCallback(async ({ email, password }) => {
    const json = await loginApi({ email, password });
    const token = json.accessToken || json.token;
    const userData = json.data || json.user;
    storeTokens(token, json.refreshToken, userData);
    setAccessToken(token);
    setUser(userData);
    return userData;
  }, []);

  /** Register  */
  const register = useCallback(async ({ name, email, password }) => {
    const json = await registerApi({ name, email, password });
    const token = json.accessToken || json.token;
    const userData = json.data || json.user;
    storeTokens(token, json.refreshToken, userData);
    setAccessToken(token);
    setUser(userData);
    return userData;
  }, []);

  /** Update Profile */
  const updateProfile = useCallback(async (profileData) => {
    const updated = await updateUserProfileApi(profileData);
    setUser(updated);
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
    return updated;
  }, []);

  /** Address helpers */
  const addAddress = useCallback(async (addressData) => {
    const addresses = await addUserAddressApi(addressData);
    setUser((prev) => {
      const updated = { ...prev, addresses };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    });
    return addresses;
  }, []);

  const updateAddress = useCallback(async (addressId, addressData) => {
    const addresses = await updateUserAddressApi(addressId, addressData);
    setUser((prev) => {
      const updated = { ...prev, addresses };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    });
    return addresses;
  }, []);

  const deleteAddress = useCallback(async (addressId) => {
    const addresses = await deleteUserAddressApi(addressId);
    setUser((prev) => {
      const updated = { ...prev, addresses };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    });
    return addresses;
  }, []);

  /** Logout */
  const logout = useCallback(() => {
    clearTokens();
    setAccessToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        refreshUserProfile,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
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
