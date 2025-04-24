import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, totalItems, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-500 text-center py-4">Your cart is empty</p>
        <Link
          to="/services"
          className="block text-center w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
        >
          Browse Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.service.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{item.service.icon}</div>
              <div>
                <h3 className="font-medium">{item.service.title}</h3>
                <p className="text-sm text-gray-500">{item.service.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3 py-1">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.service.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-lg font-medium">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between text-lg font-medium">
          <span>Total Amount:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <Link
          to="/checkout"
          className="block text-center w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart; 