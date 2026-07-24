import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all cart routes with auth middleware
router.use(protect);

/**
 * @route   GET /api/cart - Get user cart
 * @route   POST /api/cart - Add item to cart
 * @route   DELETE /api/cart - Clear cart
 */
router
  .route('/')
  .get(getCart)
  .post(addToCart)
  .delete(clearCart);

/**
 * @route   PUT /api/cart/:productId - Update cart item quantity
 * @route   DELETE /api/cart/:productId - Remove item from cart
 */
router
  .route('/:productId')
  .put(updateCartItem)
  .delete(removeCartItem);

export default router;
