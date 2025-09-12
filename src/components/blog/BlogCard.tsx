
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, Tag, User, MessageCircle, Eye } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

const BlogCard = ({ post, variant = 'default', className }: BlogCardProps) => {
  // Ensure we have a valid image URL
  const coverImage = post.coverImage || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";
  
  // Ensure we have a valid author avatar
  const authorAvatar = post.author.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80";
  
  return (
    <Card className={cn(
      "h-full overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-800 group",
      post.featured && "ring-2 ring-indigo/30",
      variant === 'featured' && "md:flex",
      className
    )}>
      <Link to={`/blog/${post.slug}`} className={cn("block h-full", variant === 'featured' && "md:flex")}>
        <div className={cn(
          "relative overflow-hidden",
          variant === 'compact' ? "h-32" : (variant === 'featured' ? "md:w-2/5 h-60 md:h-auto" : "")
        )}>
          <AspectRatio ratio={variant === 'featured' ? 4/3 : 16/9}>
            <img 
              src={coverImage} 
              alt={post.title} 
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-indigo to-purple text-white border-none shadow-sm font-medium"
            >
              {post.category}
            </Badge>
          </div>
          
          {variant !== 'compact' && (
            <div className="absolute bottom-3 left-3 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white/90 text-xs flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                <Eye className="w-3 h-3" />
                {Math.floor(Math.random() * 500) + 100}
              </span>
              <span className="text-white/90 text-xs flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                <MessageCircle className="w-3 h-3" />
                {Math.floor(Math.random() * 20) + 1}
              </span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "flex flex-col",
          variant === 'featured' && "md:w-3/5"
        )}>
          <CardHeader className={variant === 'compact' ? "py-3 px-4" : 'pb-2'}>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}</span>
              <span className="mx-1">•</span>
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
            </div>
            <h3 className={`font-bold line-clamp-2 ${
              variant === 'compact' 
                ? 'text-base' 
                : (variant === 'featured' ? 'text-2xl' : 'text-xl')
            } group-hover:text-indigo transition-colors duration-200`}>
              {post.title}
            </h3>
          </CardHeader>
          
          {variant !== 'compact' && (
            <CardContent>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center mt-4">
                <Avatar className="h-8 w-8 mr-2 ring-2 ring-indigo-100 dark:ring-indigo-900">
                  {authorAvatar ? (
                    <AvatarImage src={authorAvatar} alt={post.author.name} />
                  ) : (
                    <AvatarFallback>
                      <User className="h-4 w-4 text-gray-500" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{post.author.name}</span>
                  {post.author.title && (
                    <span className="text-xs text-muted-foreground">{post.author.title}</span>
                  )}
                </div>
              </div>
            </CardContent>
          )}
          
          {variant === 'default' && (
            <CardFooter className="flex items-center border-t pt-4 text-sm mt-auto">
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-gray-100 dark:bg-gray-800 text-indigo border-indigo/20">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{post.tags.length - 2}</span>
                  )}
                </div>
              </div>
            </CardFooter>
          )}
        </div>
      </Link>
    </Card>
  );
};

export default BlogCard;
