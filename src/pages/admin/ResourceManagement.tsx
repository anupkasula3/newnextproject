
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Trash2, Save, Plus, FileText, BookOpen, Edit, Folder, Video, Music } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Resource, ResourceFormData, ResourceCategory } from '@/types/resource';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ResourceCard from '@/components/admin/resources/ResourceCard';
import CategoryCard from '@/components/admin/resources/CategoryCard';

const ResourceManagement = () => {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 'ielts-writing-guide',
      title: 'IELTS Writing Task 2 Guide',
      description: 'Master the IELTS Writing Task 2 with our comprehensive guide featuring model answers and examiner tips.',
      type: 'Study Guide',
      category: 'ielts',
      rating: 4.9,
      downloads: '24.5K',
      badge: 'Popular'
    },
    {
      id: 'toefl-speaking-templates',
      title: 'TOEFL Speaking Templates',
      description: 'Ready-to-use templates for all TOEFL speaking tasks with expert guidance on timing and delivery.',
      type: 'Template Pack',
      category: 'toefl',
      rating: 4.8,
      downloads: '18.3K',
      badge: 'New'
    }
  ]);
  
  const [formData, setFormData] = useState<ResourceFormData>({
    title: '',
    description: '',
    type: '',
    category: '',
    badge: 'New',
    file: null,
    previewImage: null
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentResource, setCurrentResource] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  const [categoryForm, setCategoryForm] = useState<{
    id: string;
    name: string;
    description: string;
    icon: 'book' | 'file' | 'video' | 'audio';
  }>({
    id: '',
    name: '',
    description: '',
    icon: 'book'
  });

  const [categories, setCategories] = useState<ResourceCategory[]>([
    {
      id: 'ielts',
      name: 'IELTS',
      description: 'Resources for IELTS exam preparation',
      resourceCount: 18,
      icon: 'book',
      featured: true
    },
    {
      id: 'toefl', 
      name: 'TOEFL',
      description: 'Resources for TOEFL exam preparation',
      resourceCount: 12,
      icon: 'file',
      featured: true
    },
    {
      id: 'pte',
      name: 'PTE',
      description: 'Resources for PTE exam preparation',
      resourceCount: 8,
      icon: 'audio',
      featured: false
    },
    {
      id: 'gre',
      name: 'GRE',
      description: 'Resources for GRE exam preparation',
      resourceCount: 14,
      icon: 'file',
      featured: false
    },
    {
      id: 'gmat',
      name: 'GMAT',
      description: 'Resources for GMAT exam preparation',
      resourceCount: 10,
      icon: 'video',
      featured: false
    },
    {
      id: 'sat',
      name: 'SAT',
      description: 'Resources for SAT exam preparation',
      resourceCount: 6,
      icon: 'book',
      featured: false
    }
  ]);

  useEffect(() => {
    // This will help us manually trigger tab selection when needed
    const tabElement = document.getElementById(`${activeTab}-tab`);
    if (tabElement) {
      tabElement.click();
    }
  }, [activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setFormData({ ...formData, file: e.target.files[0] });
      toast({
        title: "File selected",
        description: `${e.target.files[0].name} (${(e.target.files[0].size / 1024).toFixed(2)} KB)`
      });
    }
  };

  const handlePreviewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, previewImage: e.target.files[0] });
      toast({
        title: "Preview image selected",
        description: `${e.target.files[0].name} (${(e.target.files[0].size / 1024).toFixed(2)} KB)`
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const resourceId = isEditing && currentResource ? currentResource : formData.title.toLowerCase().replace(/\s+/g, '-');
    
    // Find the category ID that corresponds to the selected category name
    const selectedCategoryObj = categories.find(cat => cat.name === formData.category);
    const categoryId = selectedCategoryObj ? selectedCategoryObj.id : '';
    
    const newResource: Resource = {
      id: resourceId,
      title: formData.title,
      description: formData.description,
      type: formData.type,
      category: categoryId, // Use the category ID
      rating: 5.0,
      downloads: 0,
      badge: formData.badge,
    };
    
    if (isEditing) {
      setResources(resources.map(r => r.id === resourceId ? { ...r, ...newResource } : r));
      toast({
        title: "Resource updated",
        description: `${formData.title} has been updated successfully.`
      });
    } else {
      setResources([...resources, newResource]);
      
      if (selectedCategoryObj) {
        setCategories(categories.map(cat => 
          cat.id === categoryId 
            ? { ...cat, resourceCount: cat.resourceCount + 1 }
            : cat
        ));
      }
      
      toast({
        title: "Resource created",
        description: `${formData.title} has been added to resources.`
      });
    }
    
    setFormData({
      title: '',
      description: '',
      type: '',
      category: '',
      badge: 'New',
      file: null,
      previewImage: null
    });
    setSelectedFile(null);
    setIsEditing(false);
    setCurrentResource(null);
    
    // Switch to "All Resources" tab after submitting
    setActiveTab('all');
  };

  const handleEdit = (id: string) => {
    const resource = resources.find(r => r.id === id);
    if (resource) {
      // Find the category name from the category ID
      const categoryObj = categories.find(cat => cat.id === resource.category);
      
      setFormData({
        title: resource.title,
        description: resource.description,
        type: resource.type,
        category: categoryObj ? categoryObj.name : '',
        badge: resource.badge,
        file: null,
        previewImage: null
      });
      setIsEditing(true);
      setCurrentResource(id);
      
      // Switch to the upload tab for editing
      setActiveTab('upload');
    }
  };

  const handleDelete = (id: string) => {
    const resourceToDelete = resources.find(r => r.id === id);
    if (resourceToDelete) {
      // Find the category and decrement the resource count
      const categoryId = resourceToDelete.category;
      setCategories(categories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, resourceCount: Math.max(0, cat.resourceCount - 1) }
          : cat
      ));
    }
    
    setResources(resources.filter(r => r.id !== id));
    toast({
      title: "Resource deleted",
      description: "The resource has been removed successfully."
    });
  };
  
  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryForm({ ...categoryForm, [name]: value });
  };
  
  const handleCategorySelectChange = (name: string, value: 'book' | 'file' | 'video' | 'audio') => {
    setCategoryForm({ ...categoryForm, [name]: value });
  };
  
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categoryId = categoryForm.id || categoryForm.name.toLowerCase().replace(/\s+/g, '-');
    
    const newCategory: ResourceCategory = {
      id: categoryId,
      name: categoryForm.name,
      description: categoryForm.description,
      resourceCount: 0,
      icon: categoryForm.icon,
    };
    
    if (selectedCategory) {
      setCategories(categories.map(c => c.id === categoryId ? { ...c, ...newCategory } : c));
      toast({
        title: "Category updated",
        description: `${categoryForm.name} has been updated successfully.`
      });
      setSelectedCategory(null);
    } else {
      setCategories([...categories, newCategory]);
      toast({
        title: "Category created",
        description: `${categoryForm.name} has been added to categories.`
      });
    }
    
    setCategoryForm({
      id: '',
      name: '',
      description: '',
      icon: 'book'
    });
    setCategoryFormOpen(false);
  };
  
  const handleEditCategory = (category: ResourceCategory) => {
    setCategoryForm({
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon
    });
    setSelectedCategory(category);
    setCategoryFormOpen(true);
  };
  
  const handleManageCategoryResources = (categoryId: string) => {
    // Set the search query to filter by the category ID
    setSearchQuery(categoryId);
    
    // Switch to the "All Resources" tab to show the filtered resources
    setActiveTab('all');
  };

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resourceTypes = ["Study Guide", "Practice Test", "Template Pack", "Flashcards", "Study Cards", "Video Tutorial", "Audio Lesson"];
  
  const handleNewResource = () => {
    setFormData({
      title: '',
      description: '',
      type: '',
      category: '',
      badge: 'New',
      file: null,
      previewImage: null
    });
    setIsEditing(false);
    setCurrentResource(null);
    setSelectedFile(null);
    setActiveTab('upload');
  };

  return (
    <AdminLayout>
      <div className="container p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Resource Management</h1>
          <Button onClick={handleNewResource}>
            <Plus className="mr-2 h-4 w-4" /> New Resource
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger id="all-tab" value="all">All Resources</TabsTrigger>
            <TabsTrigger id="upload-tab" value="upload">Upload Resource</TabsTrigger>
            <TabsTrigger id="categories-tab" value="categories">Categories</TabsTrigger>
            <TabsTrigger id="analytics-tab" value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="mb-6">
              <Input 
                placeholder="Search resources..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
                // Find the category name for this resource
                const category = categories.find(cat => cat.id === resource.category);
                const categoryName = category ? category.name : resource.category;
                
                return (
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource} 
                    categoryName={categoryName}
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                  />
                );
              })}
              
              {filteredResources.length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <FileText className="w-12 h-12 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">No resources found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search or add a new resource.</p>
                  <Button className="mt-4" onClick={handleNewResource}>
                    <Plus className="mr-2 h-4 w-4" /> Add Resource
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>{isEditing ? 'Edit Resource' : 'Upload New Resource'}</CardTitle>
                  <CardDescription>
                    Fill in the details to {isEditing ? 'update the' : 'add a new'} resource
                  </CardDescription>
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
                      <Label htmlFor="type">Type</Label>
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
                            <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="badge">Badge</Label>
                      <Select 
                        value={formData.badge} 
                        onValueChange={(value: 'Popular' | 'New' | 'Premium' | 'Bestseller') => handleSelectChange('badge', value)}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="file">Resource File</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="file" 
                          type="file" 
                          onChange={handleFileChange} 
                          className="flex-1"
                        />
                        <Button type="button" variant="outline" onClick={() => {
                          setSelectedFile(null);
                          setFormData({...formData, file: null});
                        }}>
                          Clear
                        </Button>
                      </div>
                      {formData.file && (
                        <p className="text-sm text-gray-500">
                          {formData.file.name} ({(formData.file.size / 1024).toFixed(2)} KB)
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="previewImage">Preview Image</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="previewImage" 
                          type="file" 
                          accept="image/*"
                          onChange={handlePreviewImageChange} 
                          className="flex-1"
                        />
                        <Button type="button" variant="outline" onClick={() => {
                          setFormData({...formData, previewImage: null});
                        }}>
                          Clear
                        </Button>
                      </div>
                      {formData.previewImage && (
                        <p className="text-sm text-gray-500">
                          {formData.previewImage.name} ({(formData.previewImage.size / 1024).toFixed(2)} KB)
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => {
                    setFormData({
                      title: '',
                      description: '',
                      type: '',
                      category: '',
                      badge: 'New',
                      file: null,
                      previewImage: null
                    });
                    setIsEditing(false);
                    setCurrentResource(null);
                    setSelectedFile(null);
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Upload className="mr-2 h-4 w-4" />}
                    {isEditing ? 'Update Resource' : 'Upload Resource'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onEdit={handleEditCategory}
                  onManageResources={handleManageCategoryResources}
                />
              ))}
              
              <Card 
                className="hover:shadow-md transition-shadow border-dashed border-2 cursor-pointer"
                onClick={() => {
                  setSelectedCategory(null);
                  setCategoryForm({
                    id: '',
                    name: '',
                    description: '',
                    icon: 'book'
                  });
                  setCategoryFormOpen(true);
                }}
              >
                <CardHeader>
                  <CardTitle className="text-lg">Add New Category</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center p-6">
                  <Button variant="ghost" className="h-20 w-20 rounded-full">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Dialog open={categoryFormOpen} onOpenChange={setCategoryFormOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                  <DialogDescription>
                    {selectedCategory ? 'Update category details below' : 'Enter details for the new category'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCategorySubmit}>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Category Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={categoryForm.name} 
                        onChange={handleCategoryInputChange} 
                        placeholder="e.g., TOEFL, IELTS, GRE" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        value={categoryForm.description} 
                        onChange={handleCategoryInputChange} 
                        placeholder="Brief description of this category" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="icon">Icon</Label>
                      <Select 
                        value={categoryForm.icon} 
                        onValueChange={(value: 'book' | 'file' | 'video' | 'audio') => handleCategorySelectChange('icon', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select icon" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="book">Book</SelectItem>
                          <SelectItem value="file">Document</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" type="button" onClick={() => setCategoryFormOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {selectedCategory ? 'Update Category' : 'Add Category'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Resource Analytics</CardTitle>
                <CardDescription>Track downloads and user engagement with your resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Downloads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">45.8K</div>
                      <p className="text-sm text-green-600">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Average Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">4.7</div>
                      <p className="text-sm text-green-600">+0.2 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{resources.length}</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Most Popular Resources</h3>
                  <div className="space-y-2">
                    {resources.slice(0, 5).map((resource, index) => (
                      <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-500">{index + 1}</span>
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-sm text-gray-500">{resource.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{resource.downloads} downloads</p>
                          <p className="text-sm text-gray-500">Rating: {resource.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ResourceManagement;
