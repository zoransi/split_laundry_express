import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Cart from '../components/Cart';
import { Service } from '../types/service.types';
import { serviceApi } from '../api/serviceApi';
import ServiceCard from '../components/ServiceCard';

const ServicesPage: React.FC = () => {
  const { addItem } = useCart();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await serviceApi.getServices();
        setServices(data);
        setError(null);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4 text-center">Our Services</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Split Laundry Express offers a range of premium laundry and dry cleaning services
            tailored to meet your specific needs. All services include free pickup and delivery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
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
        </div>

        <div className="lg:col-span-1">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage; 