/**
 * orderService.js
 * Centralized API service for placing and retrieving orders.
 */

const API_BASE = '/api/orders';

const getAuthHeaders = () => {
  const token = localStorage.getItem('artful_access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Place a new COD order
 * @param {{ shippingAddress: Object, paymentMethod: string }} orderData
 */
export const createOrderApi = async (orderData) => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to place order');
  }
  return json.order || json.data;
};

/**
 * Fetch logged-in user's order history
 */
export const getMyOrdersApi = async () => {
  const res = await fetch(`${API_BASE}/my-orders`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch order history');
  }
  return json.orders || json.data || [];
};

/**
 * Get order details by ID
 */
export const getOrderByIdApi = async (orderId) => {
  const res = await fetch(`${API_BASE}/${orderId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch order details');
  }
  return json.order || json.data;
};

/**
 * Cancel an order
 */
export const cancelOrderApi = async (orderId) => {
  const res = await fetch(`${API_BASE}/${orderId}/cancel`, {
    method: 'PUT',
    headers: getAuthHeaders(),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to cancel order');
  }
  return json.order || json.data;
};
