/**
 * adminService.js
 * Service for Admin operations (Dashboard Stats, Products, Categories, Users, Orders)
 * Includes JWT Bearer authentication headers and fallback data.
 */


const TOKEN_KEY = 'artful_access_token';

const getAuthHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};


let localCategories = [
  { _id: 'cat_1', name: 'Embroidered Clothing', description: 'Kurta, dupattas, scarves, and dresses', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600', isActive: true },
  { _id: 'cat_2', name: 'Home Decor', description: 'Hoop art, cushion covers, and tapestries', image: 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=600', isActive: true },
  { _id: 'cat_3', name: 'Bags & Pouches', description: 'Canvas totes, pouches, and clutch bags', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600', isActive: true },
  { _id: 'cat_4', name: 'Accessories', description: 'Bookmarks, scrunchies, and hairpins', image: 'https://images.unsplash.com/photo-1606760227091-3dd858d97218?auto=format&fit=crop&q=80&w=600', isActive: true },
  { _id: 'cat_5', name: 'Custom Embroidery', description: 'Personalized portraits and family keepsakes', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600', isActive: true },
];

let localUsers = [
  { _id: 'usr_101', name: 'Artful Stitches Admin', email: 'admin@artfulstitches.com', role: 'admin', phone: '+91 98765 43210', isActive: true, createdAt: '2026-01-10T10:00:00.000Z' },
  { _id: 'usr_102', name: 'Priya Sharma', email: 'priya@example.com', role: 'user', phone: '+91 98123 45678', isActive: true, createdAt: '2026-03-15T14:30:00.000Z' },
  { _id: 'usr_103', name: 'Ananya Verma', email: 'ananya@example.com', role: 'user', phone: '+91 97654 32109', isActive: true, createdAt: '2026-04-20T09:15:00.000Z' },
  { _id: 'usr_104', name: 'Rohan Patel', email: 'rohan@example.com', role: 'user', phone: '+91 99887 76655', isActive: false, createdAt: '2026-05-12T11:45:00.000Z' },
  { _id: 'usr_105', name: 'Kavita Singh', email: 'kavita@example.com', role: 'user', phone: '+91 91234 56789', isActive: true, createdAt: '2026-06-01T16:00:00.000Z' },
];

let localOrders = [
  { _id: 'ORD-9821', customerName: 'Priya Sharma', email: 'priya@example.com', totalAmount: 3149, itemsCount: 2, orderStatus: 'Pending', status: 'Pending', paymentMethod: 'COD', paymentStatus: 'Pending', createdAt: '2026-07-28T09:30:00.000Z' },
  { _id: 'ORD-9820', customerName: 'Ananya Verma', email: 'ananya@example.com', totalAmount: 1899, itemsCount: 1, orderStatus: 'Processing', status: 'Processing', paymentMethod: 'COD', paymentStatus: 'Pending', createdAt: '2026-07-27T14:20:00.000Z' },
  { _id: 'ORD-9819', customerName: 'Rohan Patel', email: 'rohan@example.com', totalAmount: 4249, itemsCount: 3, orderStatus: 'Shipped', status: 'Shipped', paymentMethod: 'COD', paymentStatus: 'Pending', createdAt: '2026-07-26T11:00:00.000Z' },
  { _id: 'ORD-9818', customerName: 'Kavita Singh', email: 'kavita@example.com', totalAmount: 1250, itemsCount: 1, orderStatus: 'Delivered', status: 'Delivered', paymentMethod: 'COD', paymentStatus: 'Paid', createdAt: '2026-07-25T16:45:00.000Z' },
  { _id: 'ORD-9817', customerName: 'Vikram Mehta', email: 'vikram@example.com', totalAmount: 2999, itemsCount: 1, orderStatus: 'Delivered', status: 'Delivered', paymentMethod: 'COD', paymentStatus: 'Paid', createdAt: '2026-07-24T10:15:00.000Z' },
];

// ==========================================
// 0. DASHBOARD STATS
// ==========================================

export const getDashboardStats = async () => {
  try {
    const res = await fetch('/api/dashboard/stats', { headers: getAuthHeaders() });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return data.data;
      }
    }
  } catch (e) {
    console.warn('Dashboard stats API error, using calculated stats.', e.message);
  }

  // Fallback calculated stats
  const totalProducts = localProducts.length;
  const totalCategories = localCategories.length;
  const totalOrders = localOrders.length;
  const pendingOrders = localOrders.filter(o => (o.orderStatus || o.status) === 'Pending').length;
  const completedOrders = localOrders.filter(o => (o.orderStatus || o.status) === 'Delivered').length;
  const totalUsers = localUsers.length;
  const revenue = localOrders.filter(o => (o.orderStatus || o.status) === 'Delivered').reduce((sum, o) => sum + o.totalAmount, 0);

  return {
    totalProducts,
    totalCategories,
    totalOrders,
    pendingOrders,
    completedOrders,
    totalUsers,
    revenue,
  };
};

// ==========================================
// 1. PRODUCT CRUD OPERATIONS
// ==========================================

export const getAdminProducts = async () => {
  try {
    const res = await fetch('/api/products?includeInactive=true', { headers: getAuthHeaders() });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch products');
    }
    if (!data.success || !data.data) {
      throw new Error('products were not fetched');
    }
    return data.data;
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
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
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to create product');
    }
    if (!data.success || !data.data) {
      throw new Error('product was not created');
    }
    return data.data;
  } catch (error) {
    console.error('Error creating product', error);
    throw error;
  }
};

export const updateAdminProduct = async (id, productData) => {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to update product');
    }
    if (!data.success || !data.data) {
      throw new Error('product was not updated');
    }
    return data.data;
  } catch (error) {
    console.error('Error updating product', error);
    throw error;
  }

};

export const deleteAdminProduct = async (id) => {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to delete product');
    }
    if (!data.success) {
      throw new Error(data.message || 'product was not deleted');
    }
    return data;
  } catch (error) {
    console.error('Error deleting product', error);
    throw error;
  }
};

// ==========================================
// 2. CATEGORY MANAGEMENT
// ==========================================

export const getAdminCategories = async () => {
  try {
    const res = await fetch('/api/categories', { headers: getAuthHeaders() });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    }
  } catch (e) {
    console.warn('API fetch categories error, returning local categories.', e.message);
  }
  return [...localCategories];
};

export const getCategories = async (activeOnly = true) => {
  try {
    const url = activeOnly ? '/api/categories?active=true' : '/api/categories';
    const res = await fetch(url, { headers: getAuthHeaders() });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
    }
  } catch (e) {
    console.warn('API fetch public categories error, returning local categories.', e.message);
  }
  return [...localCategories];
};

export const createAdminCategory = async (catData) => {
  try {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(catData),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) return data.data;
    }
  } catch (e) {
    console.warn('API create category error, saving locally.', e.message);
  }

  const newCat = {
    _id: `cat_${Date.now()}`,
    name: catData.name,
    description: catData.description || '',
    image: catData.image || 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=600',
    featured: Boolean(catData.featured),
    displayOrder: Number(catData.displayOrder || 0),
    isActive: catData.isActive !== undefined ? catData.isActive : true,
    createdAt: new Date().toISOString(),
  };
  localCategories.push(newCat);
  return newCat;
};

export const updateAdminCategory = async (id, catData) => {
  try {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(catData),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) return data.data;
    }
  } catch (e) {
    console.warn('API update category error, updating locally.', e.message);
  }

  const idx = localCategories.findIndex(c => c._id === id);
  if (idx !== -1) {
    localCategories[idx] = { ...localCategories[idx], ...catData };
    return localCategories[idx];
  }
  throw new Error('Category not found');
};

export const deleteAdminCategory = async (id) => {
  try {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      localCategories = localCategories.filter(c => c._id !== id);
      return { success: true };
    }
  } catch (e) {
    console.warn('API delete category error, deleting locally.', e.message);
  }

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

export const getUserById = async (userId) => {
  try {
    const res = await fetch(`/api/users/${userId}`, { headers: getAuthHeaders() });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) return data.data;
    }
  } catch (e) {
    console.warn('API fetch user by ID error.', e.message);
  }
  return localUsers.find(u => u._id === userId) || null;
};

export const updateUserStatus = async (userId, isActive) => {
  try {
    const res = await fetch(`/api/users/${userId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ isActive }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (e) {
    console.warn('API update user status error, updating locally.', e.message);
  }

  const idx = localUsers.findIndex(u => u._id === userId);
  if (idx !== -1) {
    localUsers[idx].isActive = isActive;
    return localUsers[idx];
  }
  throw new Error('User not found');
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
  try {
    const res = await fetch('/api/orders/admin/all', { headers: getAuthHeaders() });
    if (res.ok) {
      const data = await res.json();
      if (data.success && (Array.isArray(data.data) || Array.isArray(data.orders))) {
        return data.data || data.orders;
      }
    }
  } catch (e) {
    console.warn('API fetch orders error, returning local orders.', e.message);
  }
  return [...localOrders];
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ orderStatus: status, status }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.order || data.data;
    }
  } catch (e) {
    console.warn('API update order status error, updating locally.', e.message);
  }

  const idx = localOrders.findIndex(o => o._id === orderId);
  if (idx !== -1) {
    localOrders[idx].orderStatus = status;
    localOrders[idx].status = status;
    if (status === 'Delivered') localOrders[idx].paymentStatus = 'Paid';
    return localOrders[idx];
  }
  throw new Error('Order not found');
};

export const deleteAdminOrder = async (orderId) => {
  try {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      localOrders = localOrders.filter(o => o._id !== orderId);
      return { success: true };
    }
  } catch (e) {
    console.warn('API delete order error, deleting locally.', e.message);
  }

  localOrders = localOrders.filter(o => o._id !== orderId);
  return { success: true };
};
