/**
 * Mock Product Data for Artful Stitches Embroidery Shop
 * Structured to match the backend Product schema.
 */

export const MOCK_CATEGORIES = [
  'All Products',
  'Embroidered Clothing',
  'Home Decor',
  'Accessories',
  'Bags & Pouches',
  'Custom Embroidery'
];

export const MOCK_COLORS = [
  { name: 'Terracotta', hex: '#C47F5A' },
  { name: 'Muted Gold', hex: '#C9A45C' },
  { name: 'Soft Sage', hex: '#A5A58D' },
  { name: 'Dusty Blue', hex: '#7A93A6' },
  { name: 'Muted Rose', hex: '#D9A89E' },
  { name: 'Deep Terracotta', hex: '#AB6643' },
  { name: 'Dark Earth', hex: '#3F4335' }
];

export const MOCK_PRODUCTS = [
  {
    _id: 'prod_001',
    name: 'Floral Hand Embroidered Kurta',
    description: 'Hand-stitched botanical floral motifs on premium organic linen fabric. Made with 100% cotton embroidery thread.',
    price: 1899,
    originalPrice: 2499,
    discountPercent: 24,
    category: 'Embroidered Clothing',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 12,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Soft Sage', 'Muted Rose'],
    material: 'Organic Linen',
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 28,
    createdAt: '2026-06-15T10:00:00.000Z'
  },
  {
    _id: 'prod_002',
    name: 'Botanical Bloom Hoop Art (8 inch)',
    description: 'Intricate hand-embroidered wildflower garden mounted in a natural wooden embroidery hoop. Ready to hang.',
    price: 1250,
    originalPrice: 1600,
    discountPercent: 22,
    category: 'Home Decor',
    images: [
      'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 8,
    sizes: ['8 inch'],
    colors: ['Terracotta', 'Muted Gold', 'Soft Sage'],
    material: 'Natural Linen & Wood',
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 42,
    createdAt: '2026-07-01T12:30:00.000Z'
  },
  {
    _id: 'prod_003',
    name: 'Vintage Blossom Tote Bag',
    description: 'Sturdy eco-friendly canvas tote embroidered with delicate jasmine and daisy motifs. Features inner zipped pocket.',
    price: 999,
    originalPrice: 1399,
    discountPercent: 28,
    category: 'Bags & Pouches',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 15,
    sizes: ['Free Size'],
    colors: ['Dark Earth', 'Muted Gold'],
    material: 'Heavy Canvas Cotton',
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 19,
    createdAt: '2026-07-10T09:15:00.000Z'
  },
  {
    _id: 'prod_004',
    name: 'Monogram Embroidered Bookmark Set',
    description: 'Set of 3 handmade linen bookmarks embroidered with customized initials and vine patterns.',
    price: 499,
    originalPrice: 699,
    discountPercent: 28,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 25,
    sizes: ['Standard'],
    colors: ['Muted Rose', 'Soft Sage'],
    material: 'Pure Linen & Ribbon',
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 14,
    createdAt: '2026-06-20T14:20:00.000Z'
  },
  {
    _id: 'prod_005',
    name: 'Hand-Stitched Meadow Cushion Cover',
    description: 'Luxurious velvet cushion cover embellished with hand-embroidered lavender and fern details.',
    price: 1450,
    originalPrice: 1850,
    discountPercent: 21,
    category: 'Home Decor',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 9,
    sizes: ['16x16 inch', '18x18 inch'],
    colors: ['Soft Sage', 'Dusty Blue'],
    material: 'Cotton Velvet',
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 31,
    createdAt: '2026-07-15T11:00:00.000Z'
  },
  {
    _id: 'prod_006',
    name: 'Custom Portrait Embroidery Hoop',
    description: 'Personalized family or couple hand-embroidered portrait created from your favorite photo.',
    price: 2999,
    originalPrice: 3800,
    discountPercent: 21,
    category: 'Custom Embroidery',
    images: [
      'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 5,
    sizes: ['10 inch'],
    colors: ['Terracotta', 'Muted Rose'],
    material: 'Linen & Wooden Hoop',
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 56,
    createdAt: '2026-07-20T08:00:00.000Z'
  },
  {
    _id: 'prod_007',
    name: 'Embroidered Linen Scarf & Stole',
    description: 'Breathable handcrafted organic cotton scarf featuring hand-stitched border lace and floral corners.',
    price: 1699,
    originalPrice: 2199,
    discountPercent: 22,
    category: 'Embroidered Clothing',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 14,
    sizes: ['One Size'],
    colors: ['Muted Rose', 'Peach'],
    material: 'Organic Mulmul Cotton',
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 22,
    createdAt: '2026-07-05T16:45:00.000Z'
  },
  {
    _id: 'prod_008',
    name: 'Wildflower Cosmetic Pouch',
    description: 'Zipper pouch with waterproof lining, beautifully decorated with hand-embroidered field flowers.',
    price: 799,
    originalPrice: 1099,
    discountPercent: 27,
    category: 'Bags & Pouches',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 18,
    sizes: ['Medium'],
    colors: ['Muted Gold', 'Terracotta'],
    material: 'Linen Blend & Brass Zipper',
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 17,
    createdAt: '2026-07-18T15:30:00.000Z'
  },
  {
    _id: 'prod_009',
    name: 'Handcrafted Embroidered Hair Scrunchies (Pack of 3)',
    description: 'Silk-blend hair scrunchies delicately embroidered with tiny roses and leafy vines. Gentle on hair.',
    price: 399,
    originalPrice: 599,
    discountPercent: 33,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 30,
    sizes: ['Pack of 3'],
    colors: ['Muted Rose', 'Soft Sage', 'Terracotta'],
    material: 'Silk Satin Blend',
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 39,
    createdAt: '2026-06-28T10:20:00.000Z'
  },
  {
    _id: 'prod_010',
    name: 'Heritage Tree of Life Wall Hanging',
    description: 'Grand hand-embroidered wall tapestry depicting the ancient Tree of Life with shimmering gold threads.',
    price: 3499,
    originalPrice: 4500,
    discountPercent: 22,
    category: 'Home Decor',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 4,
    sizes: ['24x36 inch'],
    colors: ['Muted Gold', 'Deep Terracotta'],
    material: 'Raw Silk & Zari Thread',
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 15,
    createdAt: '2026-07-22T09:00:00.000Z'
  },
  {
    _id: 'prod_011',
    name: 'Custom Monogrammed Baby Blanket',
    description: 'Ultra-soft organic cotton receiving blanket custom embroidered with baby name and subtle stars.',
    price: 1799,
    originalPrice: 2200,
    discountPercent: 18,
    category: 'Custom Embroidery',
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 7,
    sizes: ['30x40 inch'],
    colors: ['Dusty Blue', 'Muted Rose'],
    material: '100% Organic Cotton',
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 26,
    createdAt: '2026-07-12T13:40:00.000Z'
  },
  {
    _id: 'prod_012',
    name: 'Embroidered Denim Jacket Custom Art',
    description: 'Upcycled vintage denim jacket embellished with custom hand-embroidered floral back panel.',
    price: 3299,
    originalPrice: 4200,
    discountPercent: 21,
    category: 'Embroidered Clothing',
    images: [
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 6,
    sizes: ['S', 'M', 'L'],
    colors: ['Dusty Blue', 'Terracotta'],
    material: 'Denim & Cotton Thread',
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 11,
    createdAt: '2026-07-25T11:15:00.000Z'
  }
];
