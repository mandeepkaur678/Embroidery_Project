import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import {
  validateOrderId,
  validateCreateOrderInput,
  validateOrderStatusInput,
} from '../middleware/orderMiddleware.js';

const router = express.Router();

// ==========================================
// Customer Order Routes (Protected)
// ==========================================

/**
 * @route   POST /api/orders
 * @desc    Create new COD order from cart
 * @access  Private (Customer)
 */
router.post('/', protect, validateCreateOrderInput, createOrder);

/**
 * @route   GET /api/orders/my-orders
 * @desc    Get logged-in user's order history
 * @access  Private (Customer)
 */
router.get('/my-orders', protect, getMyOrders);

// ==========================================
// Admin Order Routes (Protected/Admin)
// ==========================================

/**
 * @route   GET /api/orders
 * @desc    Get all orders across all users
 * @access  Private/Admin
 */
router.get('/', protect, admin, getAllOrders);

/**
 * @route   GET /api/orders/admin/all
 * @desc    Get all orders across all users (Alias)
 * @access  Private/Admin
 */
router.get('/admin/all', protect, admin, getAllOrders);

/**
 * @route   PUT /api/orders/:id/status
 * @desc    Update order status (Admin only)
 * @access  Private/Admin
 */
router.put(
  '/:id/status',
  protect,
  admin,
  validateOrderId,
  validateOrderStatusInput,
  updateOrderStatus
);

/**
 * @route   DELETE /api/orders/:id
 * @desc    Delete order (Admin only)
 * @access  Private/Admin
 */
router.delete(
  '/:id',
  protect,
  admin,
  validateOrderId,
  deleteOrder
);

// ==========================================
// Shared Routes (Owner or Admin access)
// ==========================================

/**
 * @route   GET /api/orders/:id
 * @desc    Get single order details by ID (Owner or Admin)
 * @access  Private
 */
router.get('/:id', protect, validateOrderId, getOrderById);

/**
 * @route   PUT /api/orders/:id/cancel
 * @desc    Cancel order (Pending or Confirmed status only)
 * @access  Private (Customer)
 */
router.put('/:id/cancel', protect, validateOrderId, cancelOrder);

export default router;
