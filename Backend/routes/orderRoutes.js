import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
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
 * @route   POST /api/orders - Create new COD order from cart
 * @route   GET /api/orders - Get all orders across all users (Admin)
 */
router
  .route('/')
  .post(protect, validateCreateOrderInput, createOrder)
  .get(protect, admin, getAllOrders);

/**
 * @route   GET /api/orders/my-orders
 * @desc    Get logged-in user's order history
 * @access  Private (Customer)
 */
router.get('/my-orders', protect, getMyOrders);

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

// ==========================================
// Admin Order Routes (Protected/Admin)
// ==========================================

/**
 * @route   PUT /api/orders/:id/status
 * @desc    Update order status and auto-mark payment as Paid on Delivery
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

export default router;
