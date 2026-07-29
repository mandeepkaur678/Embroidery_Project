/**
 * productService.js
 * API service for product retrieval with query filtering and mock data fallback.
 */

import { MOCK_PRODUCTS } from '../data/mockProducts';

const API_BASE = '/api/products';

/**
 * Fetch products from API or fallback mock dataset with filter support
 * @param {Object} params - { category, search, sort, minPrice, maxPrice, color }
 * @returns {Promise<{ products: Array, total: number }>}
 */
export const fetchProducts = async (params = {}) => {
  const {
    category = 'All Products',
    search = '',
    sort = 'featured',
    minPrice = 0,
    maxPrice = 5000,
    color = ''
  } = params;

  try {
    // Build query params
    const query = new URLSearchParams();
    if (category && category !== 'All Products') query.append('category', category);
    if (search) query.append('search', search);

    const res = await fetch(`${API_BASE}?${query.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const result = await res.json();
      if (result.success && Array.isArray(result.data) && result.data.length > 0) {
        // Apply client-side sorting & filtering if API returns un-sorted array
        let filtered = filterAndSortProducts(result.data, { category, search, sort, minPrice, maxPrice, color });
        return { products: filtered, total: filtered.length };
      }
    }
  } catch (err) {
    console.warn('Backend API connection unavailable, using local Artful Stitches mock dataset.', err.message);
  }

  // Local fallback processing
  let filtered = filterAndSortProducts(MOCK_PRODUCTS, { category, search, sort, minPrice, maxPrice, color });
  return { products: filtered, total: filtered.length };
};

/**
 * Helper to apply filtering and sorting logic
 */
function filterAndSortProducts(products, { category, search, sort, minPrice, maxPrice, color }) {
  let list = [...products];

  // Category filter
  if (category && category !== 'All Products') {
    list = list.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  }

  // Search keyword filter
  if (search && search.trim() !== '') {
    const q = search.toLowerCase();
    list = list.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  }

  // Price range filter
  list = list.filter(p => {
    const activePrice = p.price || 0;
    return activePrice >= minPrice && activePrice <= maxPrice;
  });

  // Color filter
  if (color && color !== '') {
    list = list.filter(p =>
      p.colors && p.colors.some(c => c.toLowerCase() === color.toLowerCase())
    );
  }

  // Sorting
  switch (sort) {
    case 'newest':
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      break;
    case 'price-asc':
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case 'price-desc':
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case 'popular':
      list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
      break;
    case 'featured':
    default:
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  return list;
}
