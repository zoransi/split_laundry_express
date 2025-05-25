import express from 'express';
import { serviceController } from '../controllers/service.controller';
import { isAdmin } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/calculate-price', serviceController.calculatePrice);

// Admin routes
router.post('/', isAdmin, serviceController.createService);
router.put('/:id', isAdmin, serviceController.updateService);
router.delete('/:id', isAdmin, serviceController.deleteService);

export default router; 