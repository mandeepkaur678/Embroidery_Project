/**
 * userService.js
 * Centralized API service for user profile and address management.
 */

const API_BASE = '/api/users';

const getAuthHeaders = () => {
  const token = localStorage.getItem('artful_access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Fetch currently authenticated user's profile
 */
export const getUserProfileApi = async () => {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch user profile');
  }
  return json.data;
};

/**
 * Update user profile (name, phone, profileImage, password)
 */
export const updateUserProfileApi = async (profileData) => {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(profileData),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to update user profile');
  }
  return json.data;
};

/**
 * Add a new shipping address
 */
export const addUserAddressApi = async (addressData) => {
  const res = await fetch(`${API_BASE}/addresses`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(addressData),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to add shipping address');
  }
  return json.data; // returns updated addresses array
};

/**
 * Update an existing shipping address
 */
export const updateUserAddressApi = async (addressId, addressData) => {
  const res = await fetch(`${API_BASE}/addresses/${addressId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(addressData),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to update shipping address');
  }
  return json.data;
};

/**
 * Delete a shipping address
 */
export const deleteUserAddressApi = async (addressId) => {
  const res = await fetch(`${API_BASE}/addresses/${addressId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to delete address');
  }
  return json.data;
};
