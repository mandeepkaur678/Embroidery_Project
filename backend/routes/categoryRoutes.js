import express from 'express';
import {
  getCategories,
  searchCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// ==========================================
// Public Category Routes
// ==========================================

/**
 * @route   GET /api/categories/search
 * @desc    Search categories
 * @access  Public
 */
router.get('/search', searchCategories);

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
/**
 * @route   POST /api/categories
 * @desc    Create a new category
 * @access  Private/Admin
 */
router
  .route('/')
  .get(getCategories)
  .post(protect, admin, createCategory);

/**
 * @route   GET /api/categories/:id
 * @desc    Get a single category by ID
 * @access  Public
 */
/**
 * @route   PUT /api/categories/:id
 * @desc    Update category by ID
 * @access  Private/Admin
 */
/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete category by ID
 * @access  Private/Admin
 */
router
  .route('/:id')
  .get(getCategoryById)
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

export default router;
