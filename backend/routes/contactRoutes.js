import express from 'express';
import {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactMessageStatus,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/', createContactMessage);
router.get('/', protect, admin, getContactMessages);
router.get('/:id', protect, admin, getContactMessageById);
router.patch('/:id/status', protect, admin, updateContactMessageStatus);
router.delete('/:id', protect, admin, deleteContactMessage);

export default router;
