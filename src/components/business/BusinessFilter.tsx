
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BusinessFilter } from '@/types/business';

interface BusinessFilterProps {
  filter: BusinessFilter;
  onFilterChange: (filter: BusinessFilter) => void;
  onReset: () => void;
}

const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Retail',
  'Hospitality',
  'Construction',
  'Transportation',
  'Energy',
  'Agriculture',
  'Other'
];

const sizes = ['Small', 'Medium', 'Large', 'Enterprise'];

const BusinessFilterComponent = ({ filter, onFilterChange, onReset }: BusinessFilterProps) => {
  const handleIndustryChange = (value: string) => {
    onFilterChange({ ...filter, industry: value });
  };

  const handleSizeChange = (value: 'Small' | 'Medium' | 'Large' | 'Enterprise') => {
    onFilterChange({ ...filter, size: value });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filter, location: e.target.value });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Filter Businesses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="industry" className="text-sm font-medium">Industry</label>
          <Select 
            value={filter.industry || ''} 
            onValueChange={handleIndustryChange}
          >
            <SelectTrigger id="industry">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Industries</SelectItem>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="size" className="text-sm font-medium">Business Size</label>
          <Select 
            value={filter.size || ''} 
            onValueChange={(value) => handleSizeChange(value as any)}
          >
            <SelectTrigger id="size">
              <SelectValue placeholder="All Sizes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sizes</SelectItem>
              {sizes.map(size => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">Location</label>
          <Input 
            id="location" 
            placeholder="Any location" 
            value={filter.location || ''} 
            onChange={handleLocationChange}
          />
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-2" 
          onClick={onReset}
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default BusinessFilterComponent;
