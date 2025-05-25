import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/service.mjs';

dotenv.config();

const services = [
  {
    name: 'Wash & Fold',
    description: 'Professional washing and folding service for your clothes',
    price: 2.50,
    category: 'WASH',
    duration: 24,
    isAvailable: true,
    imageUrl: 'https://example.com/wash-fold.jpg'
  },
  {
    name: 'Dry Cleaning',
    description: 'Expert dry cleaning for delicate and special garments',
    price: 5.00,
    category: 'WASH',
    duration: 48,
    isAvailable: true,
    imageUrl: 'https://example.com/dry-cleaning.jpg'
  },
  {
    name: 'Ironing Service',
    description: 'Professional ironing for perfectly pressed clothes',
    price: 1.50,
    category: 'IRON',
    duration: 12,
    isAvailable: true,
    imageUrl: 'https://example.com/ironing.jpg'
  },
  {
    name: 'Express Wash',
    description: 'Quick washing service completed within 4 hours',
    price: 4.00,
    category: 'WASH',
    duration: 4,
    isAvailable: true,
    imageUrl: 'https://example.com/express-wash.jpg'
  },
  {
    name: 'Home Delivery',
    description: 'Convenient delivery service to your doorstep',
    price: 3.00,
    category: 'DELIVERY',
    duration: 2,
    isAvailable: true,
    imageUrl: 'https://example.com/delivery.jpg'
  }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Insert new services
    await Service.insertMany(services);
    console.log('Services seeded successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices(); 