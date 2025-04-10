// User types
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  created_at: string;
}

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Service types
export interface ServiceCategory {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
}

export interface Service {
  id: number;
  category_id: number;
  name: string;
  description?: string;
  price: number;
  time_required: number;
  is_eco_friendly: boolean;
  image_url?: string;
}

// Order types
export interface OrderItem {
  id?: number;
  service_id: number;
  quantity: number;
  price: number;
  special_instructions?: string;
}

export interface Address {
  id?: number;
  address_line1: string;
  address_line2?: string;
  city: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

export interface Order {
  id?: number;
  user_id?: number;
  pickup_address_id: number;
  delivery_address_id: number;
  pickup_time: string;
  delivery_time: string;
  status?: string;
  total_amount: number;
  payment_status?: string;
  payment_method?: string;
  notes?: string;
  items: OrderItem[];
}

export interface OrderTracking {
  id: number;
  order_id: number;
  status: string;
  location?: string;
  notes?: string;
  created_at: string;
}

// Subscription types
export interface Subscription {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  price: number;
  billing_cycle: string;
  status: string;
  start_date: string;
  end_date?: string;
}

export interface SubscriptionService {
  id: number;
  subscription_id: number;
  service_id: number;
  quantity: number;
}

// Loyalty types
export interface LoyaltyPoints {
  id: number;
  user_id: number;
  points: number;
}

export interface LoyaltyTransaction {
  id: number;
  user_id: number;
  order_id?: number;
  points: number;
  transaction_type: string;
  description?: string;
  created_at: string;
} 