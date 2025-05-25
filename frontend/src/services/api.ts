import axios, { type AxiosRequestConfig } from 'axios';
import type { Order, OrderTracking } from '../types';

export type OrderStatus = 'pending' | 'processing' | 'picked_up' | 'cleaning' | 'ready' | 'delivered' | 'cancelled';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface OrderItem {
  service_id: number;
  quantity: number;
  price: number;
  special_instructions?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
}

export interface PickupDetails {
  date: string;
  time: string;
  special_instructions?: string;
}

export interface OrderData {
  items: OrderItem[];
  customer_info: CustomerInfo;
  pickup_details: PickupDetails;
  payment_method: string;
  total_amount: number;
}

export const orderService = {
  createOrder: async (orderData: OrderData): Promise<Order> => {
    try {
      const response = await api.post<ApiResponse<Order>>('/orders', orderData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  getOrders: async (): Promise<Order[]> => {
    try {
      const response = await api.get<ApiResponse<Order[]>>('/orders');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  getOrderById: async (orderId: string): Promise<Order> => {
    try {
      const response = await api.get<ApiResponse<Order>>(`/orders/${orderId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrderHistory: async (orderId: string): Promise<OrderTracking[]> => {
    try {
      const response = await api.get<ApiResponse<OrderTracking[]>>(`/orders/${orderId}/history`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  cancelOrder: async (orderId: string) => {
    try {
      const response = await api.post(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const paymentService = {
  createPaymentIntent: async (amount: number) => {
    try {
      const response = await api.post('/payments/create-intent', { amount });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  confirmPayment: async (paymentIntentId: string) => {
    try {
      const response = await api.post(`/payments/confirm/${paymentIntentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPaymentStatus: async (paymentIntentId: string) => {
    try {
      const response = await api.get(`/payments/status/${paymentIntentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPaymentHistory: async (orderId: string) => {
    try {
      const response = await api.get(`/payments/history/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  refundPayment: async (paymentId: string) => {
    try {
      const response = await api.post(`/payments/${paymentId}/refund`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', { email, password });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData: { name: string; email: string; password: string }): Promise<AuthResponse> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', userData);
      return response.data.data;
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

export interface OrderFeedback {
  rating: number;
  comment: string;
  createdAt: string;
}

export const feedbackService = {
  submitFeedback: async (orderId: string, feedback: { rating: number; comment: string }) => {
    try {
      const response = await api.post(`/orders/${orderId}/feedback`, feedback);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFeedback: async (orderId: string) => {
    try {
      const response = await api.get(`/orders/${orderId}/feedback`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api; 