import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Service } from '../models/service.model.js';

dotenv.config();

const sampleServices = [
  {
    name: {
      hr: 'Pranje i peglanje',
      en: 'Wash and Fold',
      de: 'Waschen und Falten',
      it: 'Lavaggio e piegatura'
    },
    description: {
      hr: 'Profesionalno pranje i peglanje vaše odjeće',
      en: 'Professional washing and folding of your clothes',
      de: 'Professionelles Waschen und Falten Ihrer Kleidung',
      it: 'Lavaggio e piegatura professionale dei vostri vestiti'
    },
    category: 'WASH_AND_FOLD',
    basePrice: 5.99,
    unit: 'KG',
    minQuantity: 1,
    maxQuantity: 20,
    estimatedTime: 24,
    isEcoFriendly: true,
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true
  },
  {
    name: {
      hr: 'Kemijsko čišćenje',
      en: 'Dry Cleaning',
      de: 'Chemische Reinigung',
      it: 'Lavaggio a secco'
    },
    description: {
      hr: 'Profesionalno kemijsko čišćenje za osjetljivu odjeću',
      en: 'Professional dry cleaning for delicate garments',
      de: 'Professionelle chemische Reinigung für empfindliche Kleidung',
      it: 'Lavaggio a secco professionale per capi delicati'
    },
    category: 'DRY_CLEANING',
    basePrice: 12.99,
    unit: 'PIECE',
    minQuantity: 1,
    maxQuantity: 10,
    estimatedTime: 48,
    isEcoFriendly: false,
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true
  },
  {
    name: {
      hr: 'Peglanje',
      en: 'Ironing',
      de: 'Bügeln',
      it: 'Stiratura'
    },
    description: {
      hr: 'Profesionalno peglanje vaše odjeće',
      en: 'Professional ironing of your clothes',
      de: 'Professionelles Bügeln Ihrer Kleidung',
      it: 'Stiratura professionale dei vostri vestiti'
    },
    category: 'IRONING',
    basePrice: 3.99,
    unit: 'PIECE',
    minQuantity: 1,
    maxQuantity: 15,
    estimatedTime: 12,
    isEcoFriendly: true,
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true
  },
  {
    name: {
      hr: 'Posteljina',
      en: 'Bedding',
      de: 'Bettwäsche',
      it: 'Biancheria da letto'
    },
    description: {
      hr: 'Pranje i peglanje posteljine',
      en: 'Washing and ironing of bedding',
      de: 'Waschen und Bügeln von Bettwäsche',
      it: 'Lavaggio e stiratura della biancheria da letto'
    },
    category: 'BEDDING',
    basePrice: 15.99,
    unit: 'SET',
    minQuantity: 1,
    maxQuantity: 5,
    estimatedTime: 36,
    isEcoFriendly: true,
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true
  },
  {
    name: {
      hr: 'Posebna njega',
      en: 'Special Care',
      de: 'Spezielle Pflege',
      it: 'Cura speciale'
    },
    description: {
      hr: 'Posebna njega za osjetljivu i skupu odjeću',
      en: 'Special care for delicate and expensive garments',
      de: 'Spezielle Pflege für empfindliche und teure Kleidung',
      it: 'Cura speciale per capi delicati e costosi'
    },
    category: 'SPECIAL_CARE',
    basePrice: 25.99,
    unit: 'PIECE',
    minQuantity: 1,
    maxQuantity: 5,
    estimatedTime: 72,
    isEcoFriendly: true,
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/split_laundry');
    console.log('Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Insert new services
    await Service.insertMany(sampleServices);
    console.log('Added sample services');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 