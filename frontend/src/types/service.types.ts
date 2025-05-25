export type ServiceCategory = 'WASH' | 'DRY' | 'IRON' | 'FOLD' | 'DELIVERY';
export type ServiceUnit = 'KG' | 'PIECE' | 'SET';
export type Language = 'hr' | 'en' | 'de' | 'it';

export interface ServiceTranslation {
  hr: string;
  en: string;
  de: string;
  it: string;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: number;
  duration: number;
  isAvailable: boolean;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ServicePriceCalculation {
  totalPrice: number;
  estimatedTime: number;
}

export interface ServiceFilters {
  category?: ServiceCategory;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
} 