import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import {
  validateProductId,
  validateProductInput,
} from '../middleware/productMiddleware.js';

const router = express.Router();

// ==========================================
// Public Product Routes
// ==========================================

/**
 * @route   GET /api/products
 * @desc    Get all products (supports ?category= & ?search=)
 * @access  Public
 */
/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private/Admin
 */
router
  .route('/')
  .get(getProducts)
  .post(protect, admin, validateProductInput, createProduct);

/**
 * @route   GET /api/products/:id
 * @desc    Get product details by ID
 * @access  Public
 */
/**
 * @route   PUT /api/products/:id
 * @desc    Update product by ID
 * @access  Private/Admin
 */
/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product by ID
 * @access  Private/Admin
 */
router
  .route('/:id')
  .get(validateProductId, getProductById)
  .put(protect, admin, validateProductId, validateProductInput, updateProduct)
  .delete(protect, admin, validateProductId, deleteProduct);

export default router;
