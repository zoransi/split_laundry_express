import React, { useEffect, useState } from 'react';
import { Service, ServiceCategory, ServiceFilters as ServiceFiltersType } from '../types/service.types';
import { serviceApi } from '../api/serviceApi';
import ServiceCard from '../components/ServiceCard';
import ServiceFilters from '../components/ServiceFilters';

const ServiceCatalog: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ServiceFiltersType>({});

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await serviceApi.getServices(filters);
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
  }, [filters]);

  const handleFilterChange = (newFilters: ServiceFiltersType) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ServiceFilters
            currentFilters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Services Grid */}
        <div className="lg:col-span-3">
          {services.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No services found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalog; 