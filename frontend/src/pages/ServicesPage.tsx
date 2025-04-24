import React, { useState } from 'react';
import OrderForm from '../components/OrderForm';

interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  icon: string;
}

const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: 1,
      title: 'Wash & Fold',
      description: 'Our most popular service. We wash, dry, and fold your everyday clothes.',
      price: '$1.50 per pound',
      icon: '👕',
    },
    {
      id: 2,
      title: 'Dry Cleaning',
      description: 'Professional dry cleaning for your delicate garments, suits, and formal wear.',
      price: 'Starting at $3.99 per item',
      icon: '👔',
    },
    {
      id: 3,
      title: 'Ironing Service',
      description: 'Get your clothes perfectly pressed and ready to wear.',
      price: '$2.00 per item',
      icon: '🧥',
    },
    {
      id: 4,
      title: 'Bedding & Linens',
      description: 'Cleaning for sheets, pillowcases, duvet covers, and other household linens.',
      price: 'Starting at $5.99 per item',
      icon: '🛏️',
    },
    {
      id: 5,
      title: 'Express Service',
      description: 'Same-day turnaround for when you need your laundry in a rush.',
      price: '+50% of standard price',
      icon: '⚡',
    },
    {
      id: 6,
      title: 'Eco-Friendly Cleaning',
      description: 'Environmentally friendly cleaning options using biodegradable detergents.',
      price: '+10% of standard price',
      icon: '🌿',
    },
  ];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4 text-center">Our Services</h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Split Laundry Express offers a range of premium laundry and dry cleaning services
        tailored to meet your specific needs. All services include free pickup and delivery.
      </p>

      {selectedService ? (
        <OrderForm selectedService={selectedService} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h2 className="text-xl font-bold mb-2">{service.title}</h2>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="mt-auto">
                    <span className="text-primary-600 font-semibold">{service.price}</span>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 flex justify-end">
                  <button 
                    onClick={() => handleServiceSelect(service)}
                    className="text-primary-600 font-medium hover:text-primary-800"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Special Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2">Vacation Rental Package</h3>
                <p className="text-gray-600 mb-4">
                  Perfect for Airbnb hosts and property managers. Includes washing and pressing
                  of all bedding, towels, and linens between guest stays.
                </p>
                <p className="text-primary-600 font-semibold">Custom pricing based on volume</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2">Monthly Subscription</h3>
                <p className="text-gray-600 mb-4">
                  Regular laundry service on a schedule that works for you. Save up to 20% compared
                  to individual orders.
                </p>
                <p className="text-primary-600 font-semibold">Starting at $99/month</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServicesPage; 