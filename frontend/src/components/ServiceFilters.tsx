import React from 'react';
import { ServiceCategory, ServiceFilters as ServiceFiltersType } from '../types/service.types';

interface ServiceFiltersProps {
  currentFilters: ServiceFiltersType;
  onFilterChange: (filters: ServiceFiltersType) => void;
}

const ServiceFilters: React.FC<ServiceFiltersProps> = ({
  currentFilters,
  onFilterChange,
}) => {
  const categories: ServiceCategory[] = ['WASH', 'DRY', 'IRON', 'FOLD', 'DELIVERY'];

  const handleCategoryChange = (category: ServiceCategory | '') => {
    onFilterChange({
      ...currentFilters,
      category: category || undefined,
    });
  };

  const handleSearchChange = (search: string) => {
    onFilterChange({
      ...currentFilters,
      search: search || undefined,
    });
  };

  const handlePriceRangeChange = (min: string, max: string) => {
    onFilterChange({
      ...currentFilters,
      minPrice: min ? Number(min) : undefined,
      maxPrice: max ? Number(max) : undefined,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>

      {/* Search */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <input
          type="text"
          id="search"
          value={currentFilters.search || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search services..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Categories */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categories
        </label>
        <select
          value={currentFilters.category || ''}
          onChange={(e) => handleCategoryChange(e.target.value as ServiceCategory | '')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0) + category.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={currentFilters.minPrice || ''}
            onChange={(e) => handlePriceRangeChange(e.target.value, currentFilters.maxPrice?.toString() || '')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={currentFilters.maxPrice || ''}
            onChange={(e) => handlePriceRangeChange(currentFilters.minPrice?.toString() || '', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={handleClearFilters}
        className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ServiceFilters; 