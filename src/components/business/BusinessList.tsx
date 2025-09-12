
import React from 'react';
import BusinessCard from './BusinessCard';
import { Business } from '@/types/business';

interface BusinessListProps {
  businesses: Business[];
  isLoading?: boolean;
}

const BusinessList = ({ businesses, isLoading = false }: BusinessListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="animate-pulse h-64 rounded-lg bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No businesses found</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your filters or check back later for more businesses.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
};

export default BusinessList;
