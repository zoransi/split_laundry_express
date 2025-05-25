import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  name: {
    hr: string;
    en: string;
    de: string;
    it: string;
  };
  description: {
    hr: string;
    en: string;
    de: string;
    it: string;
  };
  category: 'WASH_AND_FOLD' | 'DRY_CLEANING' | 'IRONING' | 'BEDDING' | 'SPECIAL_CARE';
  basePrice: number;
  unit: 'KG' | 'PIECE' | 'SET';
  minQuantity: number;
  maxQuantity: number;
  estimatedTime: number; // in hours
  isEcoFriendly: boolean;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    name: {
      hr: { type: String, required: true },
      en: { type: String, required: true },
      de: { type: String, required: true },
      it: { type: String, required: true },
    },
    description: {
      hr: { type: String, required: true },
      en: { type: String, required: true },
      de: { type: String, required: true },
      it: { type: String, required: true },
    },
    category: {
      type: String,
      enum: ['WASH_AND_FOLD', 'DRY_CLEANING', 'IRONING', 'BEDDING', 'SPECIAL_CARE'],
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      enum: ['KG', 'PIECE', 'SET'],
      required: true,
    },
    minQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    maxQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    estimatedTime: {
      type: Number,
      required: true,
      min: 0,
    },
    isEcoFriendly: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ 'name.en': 'text', 'description.en': 'text' });

export const Service = mongoose.model<IService>('Service', serviceSchema); 