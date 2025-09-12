
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from 'lucide-react';
import { Resource } from '@/types/resource';

interface ResourceCardProps {
  resource: Resource;
  categoryName: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, categoryName, onEdit, onDelete }) => {
  return (
    <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-all">
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
        <CardDescription>
          {resource.type} • {categoryName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {resource.description}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-3">Downloads: {resource.downloads}</span>
          <span>Rating: {resource.rating}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onEdit(resource.id)}>
          <Edit className="h-4 w-4 mr-2" /> Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(resource.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
