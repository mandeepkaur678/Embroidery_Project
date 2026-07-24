import express from 'express';
import {
  createAddress,
  getUserAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from '../controllers/addressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all address endpoints
router.use(protect);

/**
 * @route   POST /api/addresses - Create a new address
 * @route   GET /api/addresses - Get all user addresses
 */
router
  .route('/')
  .post(createAddress)
  .get(getUserAddresses);

/**
 * @route   GET /api/addresses/:id - Get address by ID
 * @route   PUT /api/addresses/:id - Update address by ID
 * @route   DELETE /api/addresses/:id - Delete address by ID
 */
router
  .route('/:id')
  .get(getAddressById)
  .put(updateAddress)
  .delete(deleteAddress);

export default router;
