import test from 'node:test';
import assert from 'node:assert/strict';
import { filterAndSortProducts } from './productService.js';
import { MOCK_PRODUCTS } from '../data/mockProducts.js';

test('filters mock products by category names and keeps the results consistent', () => {
  const result = filterAndSortProducts(MOCK_PRODUCTS, {
    category: 'Home Decor',
    search: '',
    sort: 'featured',
    minPrice: 0,
    maxPrice: 5000,
    color: '',
  });

  assert.equal(result.length, 3);
  assert.ok(result.every((product) => product.category === 'Home Decor'));
});
