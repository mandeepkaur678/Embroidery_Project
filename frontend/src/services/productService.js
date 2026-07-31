/**
 * productService.js
 * API service for product retrieval with query filtering and mock data fallback.
 */



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

    if (search) query.append('search', search);

    const res = await fetch(`${API_BASE}?${query.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Failed to fetch products');
    }
    if (!result.success || !Array.isArray(result.data)) {
      throw new Error('products were not fetched');
    }
    // Apply client-side sorting & filtering if API returns un-sorted array
    let filtered = filterAndSortProducts(result.data, { category, search, sort, minPrice, maxPrice, color });
    return { products: filtered, total: filtered.length };
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }

};

/**
 * Helper to apply filtering and sorting logic
 */
function filterAndSortProducts(products, { category, search, sort, minPrice, maxPrice, color }) {
  let list = [...products];

  // Filter out inactive / soft-deleted products for public users
  list = list.filter((p) => p.isActive !== false && p.status !== 'Inactive');

  // Category filter
  if (category && category !== 'All Products') {
    const normalizedCategory = category.toLowerCase().trim();
    list = list.filter((p) => {
      const catName = typeof p.category === 'object'
        ? (p.category?.name || '')
        : (p.category || '');
      const catSlug = typeof p.category === 'object'
        ? (p.category?.slug || '')
        : '';
      const catId = typeof p.category === 'object'
        ? (p.category?._id || '')
        : (p.category || '');
      return (
        catName.toLowerCase().trim() === normalizedCategory ||
        catSlug.toLowerCase().trim() === normalizedCategory ||
        catId.toString() === category
      );
    });
  }

  // Search keyword filter
  if (search && search.trim() !== '') {
    const q = search.toLowerCase();
    list = list.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.name?.toLowerCase().includes(q)
    );
  }

  // Price range filter (if maxPrice is 5000 or default max, treat as 5000+ no upper limit)
  list = list.filter(p => {
    const activePrice = Number(p.price) || 0;
    if (maxPrice >= 5000) {
      return activePrice >= minPrice;
    }
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
