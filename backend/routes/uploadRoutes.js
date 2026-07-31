import express from 'express';
import { uploadSingle, uploadMultiple } from '../middleware/uploadMiddleware.js';
import { uploadImage, uploadImages } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/upload/image
 * @desc    Upload a single product or profile image
 * @access  Private
 */
router.post('/image', protect, uploadSingle, uploadImage);

/**
 * @route   POST /api/upload/images
 * @desc    Upload multiple product images (up to 10)
 * @access  Private/Admin
 */
router.post('/images', protect, admin, uploadMultiple, uploadImages);

export default router;
