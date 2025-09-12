
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, ArrowRight, Video, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResourceCategory } from '@/types/resource';

interface ResourceCategoryCardProps {
  category: ResourceCategory;
}

const ResourceCategoryCard: React.FC<ResourceCategoryCardProps> = ({ category }) => {
  const getIcon = () => {
    switch (category.icon) {
      case 'book':
        return <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      case 'file':
        return <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      case 'video':
        return <Video className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      case 'audio':
        return <Music className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{category.name}</CardTitle>
          {category.featured && (
            <Badge className="bg-amber-500 text-white">Featured</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {category.description}
        </p>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
            {getIcon()}
          </div>
          <span className="font-medium">{category.resourceCount} resources</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/resources/categories/${category.id}`} className="w-full">
          <Button className="w-full flex justify-between items-center">
            Browse Resources
            <ArrowRight size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ResourceCategoryCard;
