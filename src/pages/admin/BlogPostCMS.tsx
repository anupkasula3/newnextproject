import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Search, Edit, Trash2, Eye, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { blogPosts as initialBlogPosts } from '@/data/blogData';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import BlogTextEditorToolbar from '@/components/admin/BlogTextEditorToolbar';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  categories: string[];
  template?: string;
  images?: string[];
}

interface BlogTemplate {
  id: string;
  name: string;
  structure: string;
}

const blogTemplates: BlogTemplate[] = [
  {
    id: "standard",
    name: "Standard Article",
    structure: "# Title\n\n## Introduction\nWrite your introduction here...\n\n## Main Section\nWrite your main content here...\n\n## Conclusion\nWrite your conclusion here..."
  },
  {
    id: "tutorial",
    name: "Step-by-Step Tutorial",
    structure: "# Tutorial Title\n\n## Introduction\nExplain what this tutorial will cover...\n\n## Prerequisites\nList required knowledge and tools...\n\n## Step 1: Getting Started\nDescribe the first step...\n\n## Step 2: Next Steps\nDescribe the next steps...\n\n## Conclusion\nSummarize what was learned..."
  },
  {
    id: "list",
    name: "List Post",
    structure: "# List Title\n\n## Introduction\nIntroduce your list topic...\n\n## 1. First Item\nDescribe the first item...\n\n## 2. Second Item\nDescribe the second item...\n\n## 3. Third Item\nDescribe the third item...\n\n## Conclusion\nWrap up your list post..."
  },
  {
    id: "review",
    name: "Product/Service Review",
    structure: "# Review Title\n\n## Introduction\nIntroduce what you're reviewing...\n\n## Overview\nProvide a high-level overview...\n\n## Pros\n- First pro point\n- Second pro point\n\n## Cons\n- First con point\n- Second con point\n\n## Verdict\nGive your final assessment..."
  }
];

const convertBlogPosts = () => {
  return initialBlogPosts.map(post => ({
    id: Number(post.id),
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    slug: post.slug,
    publishedAt: post.publishedAt,
    author: {
      name: post.author.name,
      avatar: post.author.avatar || "/placeholder.svg"
    },
    coverImage: post.coverImage,
    categories: post.tags || [],
    template: "standard",
    images: []
  }));
};

const BlogPostCMS = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageUploadOpen, setImageUploadOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedPosts = localStorage.getItem('adminBlogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const converted = convertBlogPosts();
      setPosts(converted);
      localStorage.setItem('adminBlogPosts', JSON.stringify(converted));
    }
  }, []);

  const handleCreatePost = () => {
    const template = blogTemplates.find(t => t.id === selectedTemplate) || blogTemplates[0];
    
    const newPost: BlogPost = {
      id: Date.now(),
      title: "New Blog Post",
      content: template.structure,
      excerpt: "Brief excerpt of the blog post",
      slug: `new-blog-post-${Date.now()}`,
      publishedAt: new Date().toISOString().split('T')[0],
      author: {
        name: "Admin User",
        avatar: "/placeholder.svg"
      },
      coverImage: "/placeholder.svg",
      categories: ["General"],
      template: template.id,
      images: []
    };
    
    setCurrentPost(newPost);
    setIsNewPost(true);
    setDialogOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setIsNewPost(false);
    setDialogOpen(true);
  };

  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('adminBlogPosts', JSON.stringify(updatedPosts));
    
    toast({
      title: "Post Deleted",
      description: "The blog post has been deleted successfully",
    });
  };

  const handleSavePost = () => {
    if (!currentPost) return;
    
    if (isNewPost) {
      const updatedPosts = [...posts, currentPost];
      setPosts(updatedPosts);
      localStorage.setItem('adminBlogPosts', JSON.stringify(updatedPosts));
      toast({
        title: "Post Created",
        description: "Your new blog post has been created successfully",
      });
    } else {
      const updatedPosts = posts.map(post => 
        post.id === currentPost.id ? currentPost : post
      );
      setPosts(updatedPosts);
      localStorage.setItem('adminBlogPosts', JSON.stringify(updatedPosts));
      toast({
        title: "Post Updated",
        description: "The blog post has been updated successfully",
      });
    }
    
    setDialogOpen(false);
    setCurrentPost(null);
  };

  const handleInputChange = (field: keyof BlogPost, value: string) => {
    if (!currentPost) return;
    
    if (field === "title") {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      setCurrentPost({
        ...currentPost,
        [field]: value,
        slug: slug
      });
    } else {
      setCurrentPost({
        ...currentPost,
        [field]: value
      });
    }
  };

  const handleTemplateChange = (templateId: string) => {
    if (!currentPost) return;
    
    const template = blogTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    const confirmChange = window.confirm(
      "Changing template will replace your current content. Are you sure you want to continue?"
    );
    
    if (confirmChange) {
      setCurrentPost({
        ...currentPost,
        content: template.structure,
        template: templateId
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isThumbnail: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file || !currentPost) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      
      if (isThumbnail) {
        setCurrentPost({
          ...currentPost,
          coverImage: result
        });
        toast({
          title: "Thumbnail Uploaded",
          description: "The thumbnail has been uploaded successfully",
        });
      } else {
        setCurrentImage(result);
        setImageUploadOpen(true);
      }
    };
    reader.readAsDataURL(file);
    
    // Reset the file input
    e.target.value = '';
  };

  const insertImageToContent = () => {
    if (!currentPost || !currentImage) return;
    
    const cursorPosition = document.getElementById('content') as HTMLTextAreaElement;
    const position = cursorPosition?.selectionStart || 0;
    
    const imageMarkdown = `\n![Image](${currentImage})\n`;
    const newContent = currentPost.content.substring(0, position) + 
                      imageMarkdown + 
                      currentPost.content.substring(position);
    
    const updatedImages = [...(currentPost.images || []), currentImage];
    
    setCurrentPost({
      ...currentPost,
      content: newContent,
      images: updatedImages
    });
    
    setImageUploadOpen(false);
    setCurrentImage(null);
    
    toast({
      title: "Image Inserted",
      description: "The image has been inserted into your content",
    });
  };

  const handleFormatText = (formatType: string, formatValue?: string) => {
    if (!currentPost || !contentTextareaRef.current) return;
    
    const textarea = contentTextareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = currentPost.content.substring(start, end);
    
    let formattedText = '';
    let newCursorPosition = start;
    
    switch (formatType) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        newCursorPosition = start + 2; // Position cursor after the first **
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        newCursorPosition = start + 1; // Position cursor after the first *
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        newCursorPosition = start + 3; // Position cursor after <u>
        break;
      case 'strikethrough':
        formattedText = `~~${selectedText}~~`;
        newCursorPosition = start + 2;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        newCursorPosition = start + 1;
        break;
      case 'superscript':
        formattedText = `<sup>${selectedText}</sup>`;
        newCursorPosition = start + 5;
        break;
      case 'subscript':
        formattedText = `<sub>${selectedText}</sub>`;
        newCursorPosition = start + 5;
        break;
      case 'heading':
      case 'list':
      case 'quote':
        // First check if we're at the start of a line already
        const beforeSelection = currentPost.content.substring(0, start);
        const isAtLineStart = beforeSelection.length === 0 || beforeSelection.charAt(beforeSelection.length - 1) === '\n';
        
        if (isAtLineStart) {
          formattedText = `${formatValue}${selectedText}`;
        } else {
          formattedText = `\n${formatValue}${selectedText}`;
        }
        
        newCursorPosition = start + formattedText.length; // Position cursor at the end
        break;
      case 'link':
        if (formatValue) {
          formattedText = formatValue;
          newCursorPosition = start + formattedText.length;
        }
        break;
      case 'align':
        if (formatValue === 'center') {
          formattedText = `<div style="text-align: center">${selectedText}</div>`;
        } else if (formatValue === 'right') {
          formattedText = `<div style="text-align: right">${selectedText}</div>`;
        } else {
          formattedText = `<div style="text-align: left">${selectedText}</div>`;
        }
        newCursorPosition = start + formattedText.length;
        break;
      case 'color':
        if (formatValue) {
          if (formatValue.includes('$SELECTED_TEXT$')) {
            const textToUse = selectedText || 'Text';
            formattedText = formatValue.replace('$SELECTED_TEXT$', textToUse);
          } else {
            formattedText = formatValue;
            if (selectedText) {
              formattedText = formatValue.replace(">Text<", `>${selectedText}<`);
            }
          }
          newCursorPosition = start + formattedText.length;
        }
        break;
      case 'table':
        if (formatValue) {
          formattedText = formatValue;
          newCursorPosition = start + formattedText.length;
        }
        break;
      default:
        return;
    }
    
    // Insert the formatted text
    const newContent = 
      currentPost.content.substring(0, start) + 
      formattedText + 
      currentPost.content.substring(end);
    
    setCurrentPost({
      ...currentPost,
      content: newContent
    });
    
    // This needs a slight delay to ensure the state is updated and the textarea rerenders
    setTimeout(() => {
      if (contentTextareaRef.current) {
        if (selectedText.length > 0) {
          contentTextareaRef.current.selectionStart = start + formattedText.length;
          contentTextareaRef.current.selectionEnd = start + formattedText.length;
        } else {
          contentTextareaRef.current.selectionStart = newCursorPosition;
          contentTextareaRef.current.selectionEnd = newCursorPosition;
        }
        contentTextareaRef.current.focus();
      }
    }, 10);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="template-select">Select Template</Label>
              <Select value={selectedTemplate} onValueChange={selectTemplate}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Template" />
                </SelectTrigger>
                <SelectContent>
                  {blogTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="flex items-center gap-2 self-end" onClick={handleCreatePost}>
              <Plus className="h-4 w-4" />
              Create New Post
            </Button>
          </div>
        </div>
        
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search posts..." 
            className="h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author.name}</TableCell>
                  <TableCell>{post.publishedAt}</TableCell>
                  <TableCell>{post.template ? blogTemplates.find(t => t.id === post.template)?.name || "Standard" : "Standard"}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      Published
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/blog/${post.slug}`} target="_blank">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPosts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No posts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNewPost ? "Create New Blog Post" : "Edit Blog Post"}</DialogTitle>
            <DialogDescription>
              {isNewPost 
                ? "Fill in the details to create a new blog post" 
                : "Make changes to the existing blog post"}
            </DialogDescription>
          </DialogHeader>

          {currentPost && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={currentPost.title} 
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template">Template</Label>
                  <Select 
                    value={currentPost.template || "standard"} 
                    onValueChange={handleTemplateChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Template" />
                    </SelectTrigger>
                    <SelectContent>
                      {blogTemplates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea 
                  id="excerpt" 
                  value={currentPost.excerpt} 
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Content</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Insert Image
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>
                
                <BlogTextEditorToolbar onFormatText={handleFormatText} />
                
                <Textarea 
                  id="content" 
                  ref={contentTextareaRef}
                  value={currentPost.content} 
                  rows={15}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publishedAt">Publish Date</Label>
                  <Input 
                    id="publishedAt" 
                    type="date" 
                    value={currentPost.publishedAt} 
                    onChange={(e) => handleInputChange("publishedAt", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input 
                    id="slug" 
                    value={currentPost.slug} 
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="flex items-center gap-1"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Thumbnail
                  </Button>
                  <input 
                    type="file" 
                    ref={thumbnailInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, true)}
                  />
                </div>
                
                <div className="border rounded-md p-2 bg-gray-50">
                  {currentPost.coverImage && (
                    <div className="relative">
                      <img 
                        src={currentPost.coverImage} 
                        alt="Cover" 
                        className="w-full h-48 object-cover rounded-md" 
                      />
                    </div>
                  )}
                  <Input 
                    id="coverImage" 
                    value={currentPost.coverImage} 
                    onChange={(e) => handleInputChange("coverImage", e.target.value)}
                    className="mt-2"
                    placeholder="Or enter image URL directly"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categories">Categories (comma separated)</Label>
                <Input 
                  id="categories" 
                  value={currentPost.categories.join(', ')} 
                  onChange={(e) => {
                    const categoriesArray = e.target.value.split(',').map(cat => cat.trim()).filter(Boolean);
                    setCurrentPost({
                      ...currentPost,
                      categories: categoriesArray
                    });
                  }}
                />
              </div>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePost}>
              Save Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={imageUploadOpen} onOpenChange={setImageUploadOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Insert Image</AlertDialogTitle>
            <AlertDialogDescription>
              Preview your image before inserting it into the content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {currentImage && (
            <div className="py-4">
              <img 
                src={currentImage} 
                alt="Preview" 
                className="max-h-80 mx-auto rounded-md" 
              />
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setImageUploadOpen(false);
              setCurrentImage(null);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={insertImageToContent}>
              Insert Image
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default BlogPostCMS;
