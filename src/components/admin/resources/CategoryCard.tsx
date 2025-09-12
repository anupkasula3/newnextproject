
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, FileText, BookOpen, Video, Music } from 'lucide-react';
import { ResourceCategory } from '@/types/resource';

interface CategoryCardProps {
  category: ResourceCategory;
  onEdit: (category: ResourceCategory) => void;
  onManageResources: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onManageResources }) => {
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
    <Card className="hover:shadow-md transition-all">
      <CardHeader>
        <CardTitle className="text-lg">{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
            {getIcon()}
          </div>
          <span className="font-medium">{category.resourceCount} resources</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          className="w-full" 
          variant="default" 
          onClick={() => onManageResources(category.id)}
        >
          Manage Resources
        </Button>
        <Button 
          className="w-full" 
          variant="outline"
          onClick={() => onEdit(category)}
        >
          <Edit className="h-4 w-4 mr-2" /> Edit Category
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
