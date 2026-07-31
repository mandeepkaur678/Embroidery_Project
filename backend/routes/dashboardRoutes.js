import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get aggregated stats for Admin Dashboard
 * @access  Private/Admin
 */
router.get('/stats', protect, admin, getDashboardStats);

export default router;
