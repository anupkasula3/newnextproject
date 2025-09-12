
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Resource } from '@/types/resource';

interface PopularResourcesProps {
  title?: string;
  resources?: Resource[];
}

const PopularResources = ({ 
  title = "Popular Resources", 
  resources = defaultResources 
}: PopularResourcesProps) => {
  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <Link to="/resources/all">
          <Button variant="ghost" className="flex items-center gap-1 text-indigo-600">
            View All <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <Badge className={resource.badge === 'Premium' 
                  ? 'bg-indigo-500 text-white' 
                  : resource.badge === 'New' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-amber-500 text-white'}>
                  {resource.badge}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                {resource.type} 
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Star size={14} className="text-amber-500 fill-amber-500 mr-1" />
                  {resource.rating}
                </div>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Download size={14} className="mr-1" />
                  {resource.downloads}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {resource.description}
              </p>
            </CardContent>
            <CardFooter>
              <Link to={`/resources/${resource.id}`} className="w-full">
                <Button className="w-full">
                  View Resource
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Default resources data
const defaultResources: Resource[] = [
  {
    id: 'ielts-writing-guide',
    title: 'IELTS Writing Task 2 Guide',
    description: 'Master the IELTS Writing Task 2 with our comprehensive guide featuring model answers and examiner tips.',
    type: 'Study Guide',
    category: 'IELTS',
    rating: 4.9,
    downloads: '24.5K',
    badge: 'Popular'
  },
  {
    id: 'toefl-speaking-templates',
    title: 'TOEFL Speaking Templates',
    description: 'Ready-to-use templates for all TOEFL speaking tasks with expert guidance on timing and delivery.',
    type: 'Template Pack',
    category: 'TOEFL',
    rating: 4.8,
    downloads: '18.3K',
    badge: 'New'
  },
  {
    id: 'gre-vocab-flashcards',
    title: 'GRE Vocabulary Flashcards',
    description: 'Interactive flashcards covering the most frequently tested GRE vocabulary words with mnemonics.',
    type: 'Study Cards',
    category: 'GRE',
    rating: 4.7,
    downloads: '15.7K',
    badge: 'Premium'
  },
  {
    id: 'sat-math-practice',
    title: 'SAT Math Practice Questions',
    description: 'Comprehensive collection of SAT math practice questions organized by difficulty level with step-by-step solutions.',
    type: 'Practice Set',
    category: 'SAT',
    rating: 4.8,
    downloads: '21.2K',
    badge: 'Bestseller'
  }
];

export default PopularResources;
