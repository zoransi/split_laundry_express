import { Request, Response } from 'express';
import { Service, IService } from '../models/service.model';

export const serviceController = {
  // Get all active services with optional filtering
  async getAllServices(req: Request, res: Response) {
    try {
      const { category, isEcoFriendly, search } = req.query;
      const query: any = { isActive: true };

      if (category) {
        query.category = category;
      }

      if (isEcoFriendly === 'true') {
        query.isEcoFriendly = true;
      }

      if (search) {
        query.$text = { $search: search as string };
      }

      const services = await Service.find(query).sort({ category: 1, basePrice: 1 });
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching services', error });
    }
  },

  // Get a single service by ID
  async getServiceById(req: Request, res: Response) {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching service', error });
    }
  },

  // Create a new service (admin only)
  async createService(req: Request, res: Response) {
    try {
      const serviceData: Partial<IService> = req.body;
      const service = new Service(serviceData);
      await service.save();
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ message: 'Error creating service', error });
    }
  },

  // Update a service (admin only)
  async updateService(req: Request, res: Response) {
    try {
      const service = await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: 'Error updating service', error });
    }
  },

  // Soft delete a service (admin only)
  async deleteService(req: Request, res: Response) {
    try {
      const service = await Service.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting service', error });
    }
  },

  // Calculate price for a service
  async calculatePrice(req: Request, res: Response) {
    try {
      const { serviceId, quantity } = req.body;
      const service = await Service.findById(serviceId);
      
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      if (quantity < service.minQuantity || quantity > service.maxQuantity) {
        return res.status(400).json({ 
          message: `Quantity must be between ${service.minQuantity} and ${service.maxQuantity} ${service.unit}` 
        });
      }

      const totalPrice = service.basePrice * quantity;
      res.json({ 
        serviceId,
        quantity,
        unit: service.unit,
        basePrice: service.basePrice,
        totalPrice,
        estimatedTime: service.estimatedTime * quantity
      });
    } catch (error) {
      res.status(500).json({ message: 'Error calculating price', error });
    }
  }
}; 