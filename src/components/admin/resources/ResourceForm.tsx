
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Save } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

export interface ResourceFormData {
  id?: string;
  title: string;
  description: string;
  type: string;
  category: string;
  badge: 'Popular' | 'New' | 'Premium' | 'Bestseller';
  file?: File | null;
  previewImage?: File | null;
}

interface ResourceFormProps {
  initialData?: ResourceFormData;
  onSubmit: (data: ResourceFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}) => {
  const [formData, setFormData] = useState<ResourceFormData>(initialData || {
    title: '',
    description: '',
    type: '',
    category: '',
    badge: 'New',
    file: null,
    previewImage: null
  });

  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'resource' | 'preview') => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (fileType === 'resource') {
        setResourceFile(file);
        setFormData({ ...formData, file });
        toast({
          title: "Resource file selected",
          description: `${file.name} (${(file.size / 1024).toFixed(2)} KB)`
        });
      } else {
        setPreviewImage(file);
        setFormData({ ...formData, previewImage: file });
        toast({
          title: "Preview image selected",
          description: `${file.name} (${(file.size / 1024).toFixed(2)} KB)`
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const resourceTypes = [
    "Study Guide", 
    "Practice Test", 
    "Template Pack", 
    "Flashcards", 
    "Study Cards", 
    "Video Tutorial", 
    "Audio Lesson"
  ];

  const categories = [
    "IELTS", 
    "TOEFL", 
    "PTE", 
    "GRE", 
    "GMAT", 
    "SAT"
  ];

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Resource' : 'Upload New Resource'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="Resource title" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              placeholder="Detailed description of the resource" 
              rows={4} 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Resource Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {resourceTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="badge">Badge</Label>
              <Select 
                value={formData.badge} 
                onValueChange={(value: 'Popular' | 'New' | 'Premium' | 'Bestseller') => 
                  handleSelectChange('badge', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select badge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Popular">Popular</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Bestseller">Bestseller</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resource-file">Resource File</Label>
            <Input 
              id="resource-file" 
              type="file" 
              onChange={(e) => handleFileChange(e, 'resource')} 
            />
            {resourceFile && (
              <p className="text-sm text-gray-500">
                {resourceFile.name} ({(resourceFile.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preview-image">Preview Image</Label>
            <Input 
              id="preview-image" 
              type="file" 
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'preview')} 
            />
            {previewImage && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">
                  {previewImage.name} ({(previewImage.size / 1024).toFixed(2)} KB)
                </p>
                <div className="w-full max-w-xs h-32 bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={URL.createObjectURL(previewImage)} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Upload className="mr-2 h-4 w-4" />}
            {isEditing ? 'Update Resource' : 'Upload Resource'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ResourceForm;
