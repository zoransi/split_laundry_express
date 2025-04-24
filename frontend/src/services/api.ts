import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // If the token is expired, log the user out
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface OrderData {
  serviceId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  pickupDate: string;
  pickupTime: string;
  specialInstructions?: string;
}

export const orderService = {
  createOrder: async (orderData: OrderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrderById: async (orderId: string) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData: { name: string; email: string; password: string }) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData: any) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },

  // Change user password
  changePassword: async (passwordData: any) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  },
};

// Services API
export const servicesService = {
  // Get all services
  getAll: async () => {
    const response = await api.get('/services');
    return response.data;
  },

  // Get a specific service
  getById: async (id: number) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  // Get services by category
  getByCategory: async (categoryId: number) => {
    const response = await api.get(`/services/category/${categoryId}`);
    return response.data;
  },
};

// Orders API
export const ordersService = {
  // Get all orders for the current user
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Get a specific order
  getById: async (id: number) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Create a new order
  create: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Cancel an order
  cancel: async (id: number) => {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data;
  },
};

export default api; 