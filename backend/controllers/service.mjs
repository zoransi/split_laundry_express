import Service from '../models/service.mjs';

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isAvailable: true });
    res.status(200).json({
      status: 'success',
      data: services
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching services',
      error: error.message
    });
  }
};

// Get service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: service
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching service',
      error: error.message
    });
  }
};

// Create new service (admin only)
export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      status: 'success',
      data: service
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error creating service',
      error: error.message
    });
  }
};

// Update service (admin only)
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: service
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error updating service',
      error: error.message
    });
  }
};

// Delete service (admin only)
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting service',
      error: error.message
    });
  }
}; 