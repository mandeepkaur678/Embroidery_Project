import express from 'express';
import {
  createAddress,
  getUserAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from '../controllers/addressController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  validateAddressId,
  validateAddressInput,
} from '../middleware/addressMiddleware.js';

const router = express.Router();

// Apply auth middleware to all address endpoints
router.use(protect);

/**
 * @route   POST /api/addresses - Create a new address
 * @route   GET /api/addresses - Get all addresses for logged-in user
 */
router
  .route('/')
  .post(validateAddressInput, createAddress)
  .get(getUserAddresses);

/**
 * @route   GET /api/addresses/:id - Get address details by ID
 * @route   PUT /api/addresses/:id - Update address details by ID
 * @route   DELETE /api/addresses/:id - Delete address by ID
 */
router
  .route('/:id')
  .get(validateAddressId, getAddressById)
  .put(validateAddressId, validateAddressInput, updateAddress)
  .delete(validateAddressId, deleteAddress);

export default router;
