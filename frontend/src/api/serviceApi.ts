import axios from 'axios';
import { Service, ServiceFilters, ServicePriceCalculation } from '../types/service.types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const serviceApi = {
  // Get all services with optional filtering
  async getServices(filters?: ServiceFilters): Promise<Service[]> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());

    const response = await axios.get(`${API_URL}/services`, { params });
    return response.data.data;
  },

  // Get a single service by ID
  async getServiceById(id: string): Promise<Service> {
    const response = await axios.get(`${API_URL}/services/${id}`);
    return response.data.data;
  },

  // Calculate price for a service
  async calculatePrice(serviceId: string, quantity: number): Promise<ServicePriceCalculation> {
    const response = await axios.post(`${API_URL}/services/${serviceId}/calculate`, { quantity });
    return response.data.data;
  },

  // Admin only: Create a new service
  async createService(service: Partial<Service>, token: string): Promise<Service> {
    const response = await axios.post(`${API_URL}/services`, service, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  // Admin only: Update a service
  async updateService(id: string, service: Partial<Service>, token: string): Promise<Service> {
    const response = await axios.put(`${API_URL}/services/${id}`, service, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  // Admin only: Delete a service
  async deleteService(id: string, token: string): Promise<void> {
    await axios.delete(`${API_URL}/services/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
}; 