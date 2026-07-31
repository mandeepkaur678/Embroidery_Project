import axios from 'axios';

const fallbackCategories = [
  {
    _id: 'cat_1',
    name: 'Embroidered Clothing',
    slug: 'embroidered-clothing',
    description: 'Elegant kurtas, dupattas, scarves and dresses with hand-stitched detail.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600',
    isActive: true,
    productCount: 8,
  },
  {
    _id: 'cat_2',
    name: 'Home Decor',
    slug: 'home-decor',
    description: 'Hoop art, wall hangings, cushion covers and heirloom pieces.',
    image: 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=600',
    isActive: true,
    productCount: 6,
  },
  {
    _id: 'cat_3',
    name: 'Bags & Pouches',
    slug: 'bags-pouches',
    description: 'Curated totes, pouches and statement bags for everyday elegance.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    isActive: true,
    productCount: 5,
  },
  {
    _id: 'cat_4',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Bookmarks, scrunchies and keepsakes with fine stitched accents.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd858d97218?auto=format&fit=crop&q=80&w=600',
    isActive: true,
    productCount: 4,
  },
  {
    _id: 'cat_5',
    name: 'Custom Embroidery',
    slug: 'custom-embroidery',
    description: 'Personalized portraits and bespoke pieces made to remember.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    isActive: true,
    productCount: 7,
  },
];

const normalizeCategory = (category) => ({
  ...category,
  slug: category.slug || category.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  productCount: category.productCount ?? category.product_count ?? 0,
});

export const getCategories = async ({ activeOnly = true, search = '' } = {}) => {
  try {
    const response = await axios.get('/api/categories', {
      params: {
        ...(activeOnly ? { active: 'true' } : {}),
        ...(search ? { search } : {}),
      },
    });

    if (response.data?.success && Array.isArray(response.data.data)) {
      return response.data.data.map(normalizeCategory);
    }
  } catch (error) {
    console.warn('Falling back to local category data.', error.message);
  }

  const filtered = fallbackCategories.filter((category) => {
    if (!search) return true;
    const text = `${category.name} ${category.description} ${category.slug}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return filtered.map(normalizeCategory);
};

export const searchCategories = async (query = '') => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  try {
    const response = await axios.get('/api/categories/search', {
      params: { q: trimmed },
    });

    if (response.data?.success && Array.isArray(response.data.data)) {
      return response.data.data.map(normalizeCategory);
    }
  } catch (error) {
    console.warn('Category search failed, using local fallback.', error.message);
  }

  return getCategories({ activeOnly: true, search: trimmed });
};
