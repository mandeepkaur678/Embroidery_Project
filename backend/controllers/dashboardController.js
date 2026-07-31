import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import Order from '../models/Order.js';

/**
 * @desc    Get aggregated stats for Admin Dashboard
 * @route   GET /api/dashboard/stats
 * @access  Private/Admin
 */
export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalProducts,
      totalCategories,
      totalUsers,
      allOrders
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Order.find({}),
    ]);

    const totalOrders = allOrders.length;
    const pendingOrders = allOrders.filter(o => o.orderStatus === 'Pending').length;
    const completedOrders = allOrders.filter(o => o.orderStatus === 'Delivered').length;

    // Calculate total revenue from delivered/completed orders
    const revenue = allOrders
      .filter(o => o.orderStatus === 'Delivered')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    return res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalCategories,
        totalOrders,
        pendingOrders,
        completedOrders,
        totalUsers,
        revenue,
      },
    });
  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching dashboard statistics',
    });
  }
};
