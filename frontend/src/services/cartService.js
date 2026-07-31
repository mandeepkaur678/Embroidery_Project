/**
 * cartService.js
 * Centralized API service for cart operations.
 */

const API_BASE = '/api/cart';

const getAuthHeaders = () => {
  const token = localStorage.getItem('artful_access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Fetch logged-in user's cart from backend
 */
export const getCartApi = async () => {
  const res = await fetch(API_BASE, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch cart');
  }
  return json.cart;
};

/**
 * Add an item to user cart
 */
export const addToCartApi = async (productId, quantity = 1) => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to add item to cart');
  }
  return json.cart;
};

/**
 * Update cart item quantity
 */
export const updateCartItemApi = async (productId, quantity) => {
  const res = await fetch(`${API_BASE}/${productId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ quantity }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to update cart item');
  }
  return json.cart;
};

/**
 * Remove an item from cart
 */
export const removeCartItemApi = async (productId) => {
  const res = await fetch(`${API_BASE}/${productId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to remove item from cart');
  }
  return json.cart;
};

/**
 * Clear all items from cart
 */
export const clearCartApi = async () => {
  const res = await fetch(API_BASE, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to clear cart');
  }
  return json.cart;
};
