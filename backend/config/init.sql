-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Create addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL DEFAULT 'Croatia',
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create service categories table
CREATE TABLE IF NOT EXISTS service_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  time_required INTEGER NOT NULL, -- in minutes
  is_eco_friendly BOOLEAN NOT NULL DEFAULT false,
  image_url VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (category_id) REFERENCES service_categories(id) ON DELETE CASCADE
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  pickup_address_id INTEGER NOT NULL,
  delivery_address_id INTEGER NOT NULL,
  pickup_time TIMESTAMP NOT NULL,
  delivery_time TIMESTAMP NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (pickup_address_id) REFERENCES addresses(id),
  FOREIGN KEY (delivery_address_id) REFERENCES addresses(id)
);

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  billing_cycle VARCHAR(20) NOT NULL, -- monthly, yearly
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create subscription_services table
CREATE TABLE IF NOT EXISTS subscription_services (
  id SERIAL PRIMARY KEY,
  subscription_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Create delivery_personnel table
CREATE TABLE IF NOT EXISTS delivery_personnel (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  vehicle_type VARCHAR(50),
  license_plate VARCHAR(20),
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create order_tracking table
CREATE TABLE IF NOT EXISTS order_tracking (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  notes TEXT,
  tracked_by INTEGER,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (tracked_by) REFERENCES users(id)
);

-- Create loyalty_points table
CREATE TABLE IF NOT EXISTS loyalty_points (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create loyalty_transactions table
CREATE TABLE IF NOT EXISTS loyalty_transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  order_id INTEGER,
  points INTEGER NOT NULL,
  transaction_type VARCHAR(20) NOT NULL, -- earn, redeem
  description TEXT,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- Insert default service categories
INSERT INTO service_categories (name, description, created_at, updated_at)
VALUES 
  ('Laundry', 'Regular laundry services including washing, drying, and folding', NOW(), NOW()),
  ('Dry Cleaning', 'Professional dry cleaning for delicate fabrics', NOW(), NOW()),
  ('Ironing', 'Professional ironing services', NOW(), NOW()),
  ('Specialty Items', 'Cleaning services for specialty items like curtains, rugs, etc.', NOW(), NOW());

-- Insert default services
INSERT INTO services (category_id, name, description, price, time_required, is_eco_friendly, created_at, updated_at)
VALUES 
  (1, 'Regular Wash', 'Standard washing and drying service', 10.00, 120, false, NOW(), NOW()),
  (1, 'Eco-Friendly Wash', 'Washing with eco-friendly detergents', 12.00, 120, true, NOW(), NOW()),
  (1, 'Express Wash', 'Quick turnaround washing service', 15.00, 60, false, NOW(), NOW()),
  (2, 'Suit Cleaning', 'Dry cleaning for suits', 25.00, 240, false, NOW(), NOW()),
  (2, 'Dress Cleaning', 'Dry cleaning for dresses', 20.00, 240, false, NOW(), NOW()),
  (3, 'Shirt Ironing', 'Professional ironing for shirts', 5.00, 30, false, NOW(), NOW()),
  (3, 'Full Outfit Ironing', 'Ironing service for complete outfits', 15.00, 60, false, NOW(), NOW()),
  (4, 'Curtain Cleaning', 'Specialized cleaning for curtains', 30.00, 300, false, NOW(), NOW()),
  (4, 'Rug Cleaning', 'Deep cleaning for rugs', 40.00, 360, false, NOW(), NOW());

-- Create admin user (password: admin123)
INSERT INTO users (name, email, password, role, created_at, updated_at)
VALUES ('Admin User', 'admin@splitlaundry.com', '$2a$10$3GJH5mMQA9k6JGWkbYCQZu4C0ug4SeaH7A9YWWHZFr7QxZP58VmRK', 'admin', NOW(), NOW()); 