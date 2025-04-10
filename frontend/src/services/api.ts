import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

// Authentication services
export const authService = {
  // Register a new user
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login a user
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    
    // Store token and user data in localStorage
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('isLoggedIn', 'true');
    }
    
    return response.data;
  },

  // Logout a user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
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