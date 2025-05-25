import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service } from '../types/service.types';

interface CartItem {
  service: Service;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (service: Service, quantity?: number) => void;
  removeItem: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (service: Service, quantity: number = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.service._id === service._id);
      if (existingItem) {
        return currentItems.map(item =>
          item.service._id === service._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...currentItems, { service, quantity }];
    });
  };

  const removeItem = (serviceId: string) => {
    setItems(currentItems => currentItems.filter(item => item.service._id !== serviceId));
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(serviceId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.service._id === serviceId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + (item.service.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 