
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { businesses, filterBusinesses } from '@/data/businessData';
import { BusinessFilter } from '@/types/business';
import BusinessList from '@/components/business/BusinessList';
import BusinessFilterComponent from '@/components/business/BusinessFilter';
import { Building2 } from 'lucide-react';

const Business = () => {
  const [filter, setFilter] = useState<BusinessFilter>({});
  const filteredBusinesses = filterBusinesses(filter);

  const handleFilterChange = (newFilter: BusinessFilter) => {
    setFilter(newFilter);
  };

  const handleResetFilter = () => {
    setFilter({});
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mb-4">
            <Building2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Business Directory</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Explore our curated list of businesses across various industries. 
            Connect with potential partners, clients, or employers to expand your network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <BusinessFilterComponent 
              filter={filter}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilter}
            />
          </div>
          <div className="lg:col-span-3">
            <BusinessList businesses={filteredBusinesses} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Business;
