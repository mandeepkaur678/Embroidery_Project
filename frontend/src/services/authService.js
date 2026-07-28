/**
 * authService.js
 * Centralized API service for authentication endpoints.
 * All calls go to /api/users/* via Vite proxy → Express backend.
 */

const API_BASE = '/api/users';

/**
 * Register a new user
 * @param {{ name: string, email: string, password: string }} data
 * @returns {Promise<{ accessToken, refreshToken, data: user }>}
 */
export const registerApi = async ({ name, email, password }) => {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Registration failed');
  }

  return json; // { success, message, data, accessToken, refreshToken }
};

/**
 * Login an existing user
 * @param {{ email: string, password: string }} data
 * @returns {Promise<{ accessToken, refreshToken, data: user }>}
 */
export const loginApi = async ({ email, password }) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Login failed');
  }

  return json; // { success, message, data, accessToken, refreshToken }
};
