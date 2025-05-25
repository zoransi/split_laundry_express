import React, { useState } from 'react';
import { Service } from '../types/service.types';
import { useCart } from '../contexts/CartContext';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(service, quantity);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Service Image */}
      <div className="relative h-48">
        <img
          src={service.imageUrl || '/placeholder-service.jpg'}
          alt={service.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Service Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {service.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {service.description}
        </p>

        {/* Price and Duration */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${service.price.toFixed(2)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Duration: {service.duration}h
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-4">
          <label htmlFor={`quantity-${service._id}`} className="text-sm text-gray-600">
            Quantity:
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-2 py-1 border rounded-md hover:bg-gray-50"
            >
              -
            </button>
            <input
              type="number"
              id={`quantity-${service._id}`}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-16 text-center border rounded-md"
            />
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="px-2 py-1 border rounded-md hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!service.isAvailable}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {service.isAvailable ? 'Add to Cart' : 'Currently Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard; 