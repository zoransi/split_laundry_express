import React, { createContext, useContext, useState, useEffect } from 'react';

interface Service {
  id: number;
  title: string;
  price: string;
  description: string;
  icon: string;
}

interface CartItem {
  service: Service;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (service: Service) => void;
  removeItem: (serviceId: number) => void;
  updateQuantity: (serviceId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (service: Service) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.service.id === service.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { service, quantity: 1 }];
    });
  };

  const removeItem = (serviceId: number) => {
    setItems(prevItems => prevItems.filter(item => item.service.id !== serviceId));
  };

  const updateQuantity = (serviceId: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(serviceId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.service.id === serviceId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = items.reduce((sum, item) => {
    const price = parseFloat(item.service.price.replace(/[^0-9.-]+/g, ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
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