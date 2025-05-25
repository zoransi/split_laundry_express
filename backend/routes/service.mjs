import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/service.mjs';
import { authenticate } from '../middleware/auth.mjs';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Protected routes (admin only)
router.use(authenticate);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router; 