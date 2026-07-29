/**
 * adminService.js
 * Service for Admin operations (Products, Categories, Users, Orders)
 * Includes bearer token headers and mock fallbacks.
 */

import { MOCK_PRODUCTS } from '../data/mockProducts';

const TOKEN_KEY = 'artful_access_token';

const getAuthHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// In-memory fallback stores for offline/mock operation
let localProducts = [...MOCK_PRODUCTS];

let localCategories = [
  { _id: 'cat_1', name: 'Embroidered Clothing', description: 'Kurta, dupattas, scarves, and dresses', count: 14, status: 'Active' },
  { _id: 'cat_2', name: 'Home Decor', description: 'Hoop art, cushion covers, and tapestries', count: 18, status: 'Active' },
  { _id: 'cat_3', name: 'Bags & Pouches', description: 'Canvas totes, pouches, and clutch bags', count: 10, status: 'Active' },
  { _id: 'cat_4', name: 'Accessories', description: 'Bookmarks, scrunchies, and hairpins', count: 12, status: 'Active' },
  { _id: 'cat_5', name: 'Custom Embroidery', description: 'Personalized portraits and family keepsakes', count: 8, status: 'Active' },
];

let localUsers = [
  { _id: 'usr_101', name: 'Artful Stitches Admin', email: 'admin@example.com', role: 'admin', phone: '+91 98765 43210', createdAt: '2026-01-10T10:00:00.000Z' },
  { _id: 'usr_102', name: 'Priya Sharma', email: 'priya@example.com', role: 'user', phone: '+91 98123 45678', createdAt: '2026-03-15T14:30:00.000Z' },
  { _id: 'usr_103', name: 'Ananya Verma', email: 'ananya@example.com', role: 'user', phone: '+91 97654 32109', createdAt: '2026-04-20T09:15:00.000Z' },
  { _id: 'usr_104', name: 'Rohan Patel', email: 'rohan@example.com', role: 'user', phone: '+91 99887 76655', createdAt: '2026-05-12T11:45:00.000Z' },
  { _id: 'usr_105', name: 'Kavita Singh', email: 'kavita@example.com', role: 'user', phone: '+91 91234 56789', createdAt: '2026-06-01T16:00:00.000Z' },
];

let localOrders = [
  { _id: 'ORD-9821', customerName: 'Priya Sharma', email: 'priya@example.com', totalAmount: 3149, itemsCount: 2, status: 'Pending', createdAt: '2026-07-28T09:30:00.000Z' },
  { _id: 'ORD-9820', customerName: 'Ananya Verma', email: 'ananya@example.com', totalAmount: 1899, itemsCount: 1, status: 'Processing', createdAt: '2026-07-27T14:20:00.000Z' },
  { _id: 'ORD-9819', customerName: 'Rohan Patel', email: 'rohan@example.com', totalAmount: 4249, itemsCount: 3, status: 'Shipped', createdAt: '2026-07-26T11:00:00.000Z' },
  { _id: 'ORD-9818', customerName: 'Kavita Singh', email: 'kavita@example.com', totalAmount: 1250, itemsCount: 1, status: 'Delivered', createdAt: '2026-07-25T16:45:00.000Z' },
  { _id: 'ORD-9817', customerName: 'Vikram Mehta', email: 'vikram@example.com', totalAmount: 2999, itemsCount: 1, status: 'Delivered', createdAt: '2026-07-24T10:15:00.000Z' },
];

// ==========================================
// 1. PRODUCT CRUD OPERATIONS
// ==========================================

export const getAdminProducts = async () => {
  try {
    const res = await fetch('/api/products', { headers: getAuthHeaders() });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    }
  } catch (e) {
    console.warn('API fetch products error, using local state.', e.message);
  }
  return [...localProducts];
};

export const getAdminProductById = async (id) => {
  try {
    const res = await fetch(`/api/products/${id}`, { headers: getAuthHeaders() });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) return data.data;
    }
  } catch (e) {
    console.warn('API fetch product by ID error.', e.message);
  }
  return localProducts.find(p => p._id === id) || null;
};

export const createAdminProduct = async (productData) => {
  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) return data.data;
    }
  } catch (e) {
    console.warn('API create product error, storing locally.', e.message);
  }

  const newProd = {
    _id: `prod_${Date.now()}`,
    name: productData.name,
    description: productData.description,
    price: Number(productData.price),
    originalPrice: productData.originalPrice ? Number(productData.originalPrice) : null,
    discountPercent: productData.originalPrice
      ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
      : 0,
    category: productData.category,
    images: [productData.imageUrl || productData.images?.[0] || 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=800'],
    stock: Number(productData.stock || 10),
    material: productData.material || 'Organic Linen',
    sizes: productData.sizes ? (typeof productData.sizes === 'string' ? productData.sizes.split(',') : productData.sizes) : ['Free Size'],
    colors: productData.colors ? (typeof productData.colors === 'string' ? productData.colors.split(',') : productData.colors) : ['Soft Sage'],
    createdAt: new Date().toISOString(),
  };

  localProducts.unshift(newProd);
  return newProd;
};

export const updateAdminProduct = async (id, productData) => {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) return data.data;
    }
  } catch (e) {
    console.warn('API update product error, updating locally.', e.message);
  }

  const index = localProducts.findIndex(p => p._id === id);
  if (index !== -1) {
    localProducts[index] = {
      ...localProducts[index],
      name: productData.name,
      description: productData.description,
      price: Number(productData.price),
      originalPrice: productData.originalPrice ? Number(productData.originalPrice) : localProducts[index].originalPrice,
      category: productData.category,
      images: [productData.imageUrl || productData.images?.[0] || localProducts[index].images[0]],
      stock: Number(productData.stock),
      material: productData.material,
    };
    return localProducts[index];
  }
  throw new Error('Product not found');
};

export const deleteAdminProduct = async (id) => {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      const data = await res.json();
      localProducts = localProducts.filter(p => p._id !== id);
      return data;
    }
  } catch (e) {
    console.warn('API delete product error, removing locally.', e.message);
  }

  localProducts = localProducts.filter(p => p._id !== id);
  return { success: true, message: 'Product deleted successfully.' };
};

// ==========================================
// 2. CATEGORY MANAGEMENT
// ==========================================

export const getAdminCategories = async () => {
  return [...localCategories];
};

export const createAdminCategory = async (catData) => {
  const newCat = {
    _id: `cat_${Date.now()}`,
    name: catData.name,
    description: catData.description || '',
    count: 0,
    status: 'Active'
  };
  localCategories.push(newCat);
  return newCat;
};

export const updateAdminCategory = async (id, catData) => {
  const idx = localCategories.findIndex(c => c._id === id);
  if (idx !== -1) {
    localCategories[idx] = { ...localCategories[idx], ...catData };
    return localCategories[idx];
  }
  throw new Error('Category not found');
};

export const deleteAdminCategory = async (id) => {
  localCategories = localCategories.filter(c => c._id !== id);
  return { success: true };
};

// ==========================================
// 3. USER MANAGEMENT
// ==========================================

export const getAdminUsers = async () => {
  try {
    const res = await fetch('/api/users', { headers: getAuthHeaders() });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
    }
  } catch (e) {
    console.warn('API fetch users error, returning mock users.', e.message);
  }
  return [...localUsers];
};

export const updateUserRole = async (userId, role) => {
  try {
    const res = await fetch(`/api/users/${userId}/role`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ role }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (e) {
    console.warn('API update user role error, updating locally.', e.message);
  }

  const idx = localUsers.findIndex(u => u._id === userId);
  if (idx !== -1) {
    localUsers[idx].role = role;
    return localUsers[idx];
  }
  throw new Error('User not found');
};

export const deleteAdminUser = async (userId) => {
  try {
    const res = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      localUsers = localUsers.filter(u => u._id !== userId);
      return { success: true };
    }
  } catch (e) {
    console.warn('API delete user error, deleting locally.', e.message);
  }

  localUsers = localUsers.filter(u => u._id !== userId);
  return { success: true };
};

// ==========================================
// 4. ORDER MANAGEMENT
// ==========================================

export const getAdminOrders = async () => {
  return [...localOrders];
};

export const updateOrderStatus = async (orderId, status) => {
  const idx = localOrders.findIndex(o => o._id === orderId);
  if (idx !== -1) {
    localOrders[idx].status = status;
    return localOrders[idx];
  }
  throw new Error('Order not found');
};
