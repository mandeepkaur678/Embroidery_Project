import Category from '../models/Category.js';

const defaultCategories = [
  {
    name: 'Embroidered Clothing',
    slug: 'embroidered-clothing',
    description: 'Kurta, dupattas, scarves, and dresses',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600',
    isActive: true,
    displayOrder: 1,
  },
  {
    name: 'Home Decor',
    slug: 'home-decor',
    description: 'Hoop art, cushion covers, and tapestries',
    image: 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=600',
    isActive: true,
    displayOrder: 2,
  },
  {
    name: 'Bags & Pouches',
    slug: 'bags-and-pouches',
    description: 'Canvas totes, pouches, and clutch bags',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    isActive: true,
    displayOrder: 3,
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Bookmarks, scrunchies, and hairpins',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd858d97218?auto=format&fit=crop&q=80&w=600',
    isActive: true,
    displayOrder: 4,
  },
  {
    name: 'Custom Embroidery',
    slug: 'custom-embroidery',
    description: 'Personalized portraits and family keepsakes',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    isActive: true,
    displayOrder: 5,
  },
];

export const ensureCategoriesSeeded = async () => {
  try {
    const count = await Category.countDocuments();
    if (count === 0) {
      await Category.insertMany(defaultCategories);
      console.log('✅ Default categories auto-seeded into MongoDB');
    }
  } catch (error) {
    console.error('Error seeding default categories:', error.message);
  }
};
