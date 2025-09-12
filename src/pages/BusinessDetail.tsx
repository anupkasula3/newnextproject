
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getBusinessById } from '@/data/businessData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, MapPin, Globe, Users, Calendar, Mail, Phone, DollarSign } from 'lucide-react';

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const business = getBusinessById(id || '');

  if (!business) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Business Not Found</h1>
          <p className="mb-8">The business you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/business">Back to Business Directory</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center" 
          asChild
        >
          <Link to="/business">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  {business.logoUrl ? (
                    <img 
                      src={business.logoUrl} 
                      alt={`${business.name} logo`} 
                      className="w-20 h-20 object-contain rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center rounded">
                      <Building2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{business.name}</h1>
                    <div className="flex items-center mt-1 text-muted-foreground">
                      <span className="mr-2">{business.industry}</span>
                      <span>•</span>
                      <span className="ml-2">{business.size} Business</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm">{business.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">About</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {business.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Company Details</h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        <div>
                          <p className="font-medium">Employee Count</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {business.employeeCount || 'Not specified'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        <div>
                          <p className="font-medium">Founded</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {business.foundedYear || 'Not specified'}
                          </p>
                        </div>
                      </div>
                      
                      {business.annualRevenue && (
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          <div>
                            <p className="font-medium">Annual Revenue</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {business.annualRevenue}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                    <div className="space-y-3">
                      {business.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          <div>
                            <p className="font-medium">Website</p>
                            <a 
                              href={business.website.startsWith('http') ? business.website : `https://${business.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                            >
                              {business.website}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {business.contactEmail && (
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          <div>
                            <p className="font-medium">Email</p>
                            <a 
                              href={`mailto:${business.contactEmail}`}
                              className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                            >
                              {business.contactEmail}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {business.contactPhone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <a 
                              href={`tel:${business.contactPhone}`}
                              className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                            >
                              {business.contactPhone}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">Take Action</h2>
                <div className="space-y-3">
                  {business.contactEmail && (
                    <Button className="w-full">
                      <Mail className="mr-2 h-4 w-4" /> Contact Business
                    </Button>
                  )}
                  
                  {business.website && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                    >
                      <a 
                        href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Globe className="mr-2 h-4 w-4" /> Visit Website
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Similar Businesses</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Explore more businesses in the {business.industry} industry
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  asChild
                >
                  <Link to={`/business?industry=${business.industry}`}>
                    View Similar Businesses
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessDetail;
