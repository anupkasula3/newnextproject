
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin, Globe, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Business } from '@/types/business';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  return (
    <Card className="h-full flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          {business.logoUrl ? (
            <img 
              src={business.logoUrl} 
              alt={`${business.name} logo`} 
              className="w-12 h-12 object-contain rounded"
            />
          ) : (
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center rounded">
              <Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          )}
          <div>
            <CardTitle className="text-lg">{business.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{business.industry}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {business.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{business.location}</span>
          </div>
          
          {business.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <a 
                href={business.website.startsWith('http') ? business.website : `https://${business.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {business.website.replace(/^https?:\/\//i, '')}
              </a>
            </div>
          )}
          
          {business.employeeCount && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span>{business.employeeCount} employees</span>
            </div>
          )}
          
          {business.foundedYear && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>Founded in {business.foundedYear}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/business/${business.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BusinessCard;
