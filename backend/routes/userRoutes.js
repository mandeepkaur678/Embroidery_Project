import express from 'express';
import { Router } from 'express';
import {
  registerUser,
  loginUser,
  refreshToken,
  getUserProfile,
  updateUserProfile,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  getUsers,
  getUserById,
  updateUserStatus,
  updateUserRole,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// ==========================================
// Public Auth Routes
// ==========================================

/**
 * @route   POST /api/users/register
 * @desc    Register a new user account
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user and receive tokens
 * @access  Public
 */
router.post('/login', loginUser);

/**
 * @route   POST /api/users/refresh-token
 * @desc    Get new access token using refresh token
 * @access  Public
 */
router.post('/refresh-token', refreshToken);

// ==========================================
// Protected User Routes (LoggedIn Users)
// ==========================================

/**
 * @route   GET /api/users/profile
 * @desc    Get current user's profile
 * @access  Private
 */

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user's profile
 * @access  Private
 */
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

/**
 * @route   POST /api/users/addresses
 * @desc    Add new address to user profile
 * @access  Private
 */
router.post('/addresses', protect, addUserAddress);

/**
 * @route   PUT /api/users/addresses/:addressId
 * @desc    Update an existing address by address ID
 * @access  Private
 */
/**
 * @route   DELETE /api/users/addresses/:addressId
 * @desc    Delete an address by address ID
 * @access  Private
 */
router
  .route('/addresses/:addressId')
  .put(protect, updateUserAddress)
  .delete(protect, deleteUserAddress);

// ==========================================
// Admin Routes (Admin Privilege Required)
// ==========================================

/**
 * @route   GET /api/users
 * @desc    Get all users list
 * @access  Private/Admin
 */
router.get('/', protect, admin, getUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user details by user ID
 * @access  Private/Admin
 */
/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user by ID
 * @access  Private/Admin
 */
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser);

/**
 * @route   PUT /api/users/:id/status
 * @desc    Activate or deactivate a user account
 * @access  Private/Admin
 */
router.put('/:id/status', protect, admin, updateUserStatus);

/**
 * @route   PUT /api/users/:id/role
 * @desc    Update user role (user/admin)
 * @access  Private/Admin
 */
router.put('/:id/role', protect, admin, updateUserRole);

export default router;
