
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { blogPosts, getRelatedPosts } from '@/data/blogData';
import BlogCard from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  Tag, 
  ArrowLeft, 
  User, 
  Share2, 
  Heart, 
  Bookmark, 
  ChevronRight, 
  MessageSquare, 
  Copy, 
  Twitter, 
  Facebook,
  Linkedin,
  BookOpen
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState(blogPosts.find(p => p.slug === slug));
  const [relatedPosts, setRelatedPosts] = useState<typeof blogPosts>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeCommentTab, setActiveCommentTab] = useState("newest");
  
  // Scroll progress tracking for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setReadingProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (slug) {
      const currentPost = blogPosts.find(p => p.slug === slug);
      setPost(currentPost);
      
      if (currentPost) {
        setRelatedPosts(getRelatedPosts(currentPost.id, 3));
      }
    }
  }, [slug]);

  // Social share handling
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || 'Neplia Blog Post';
    
    switch(platform) {
      case 'copy':
        navigator.clipboard.writeText(url)
          .then(() => toast.success("Link copied to clipboard!"))
          .catch(() => toast.error("Failed to copy link"));
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        break;
    }
  };
  
  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Ensure we have a valid image URL, fallback to a free source image if needed
  const coverImage = post.coverImage && post.coverImage.startsWith('http') 
    ? post.coverImage 
    : `https://images.unsplash.com/photo-1523633589114-88eaf4b4f1a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`;

  // Ensure author avatar, fallback to a placeholder
  const authorAvatar = post.author.avatar && post.author.avatar.startsWith('http')
    ? post.author.avatar
    : `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80`;

  const toggleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success("Article added to your favorites!");
    }
  };
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      toast.success("Article saved to your reading list!");
    }
  };

  // Custom renderer for markdown elements to apply styling
  const customRenderers = {
    h1: (props: any) => <h1 className="text-3xl font-bold text-indigo-600 mt-8 mb-4 animate-fade-in" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold text-indigo mt-6 mb-3 animate-fade-in" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold text-indigo-500 mt-5 mb-2 animate-fade-in" {...props} />,
    h4: (props: any) => <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-4 mb-2 animate-fade-in" {...props} />,
    p: (props: any) => <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed animate-fade-in" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-6 my-4 space-y-2 animate-fade-in" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-6 my-4 space-y-2 animate-fade-in" {...props} />,
    li: (props: any) => <li className="text-gray-700 dark:text-gray-300 pl-2" {...props} />,
    a: (props: any) => <a className="text-indigo underline hover:text-indigo-600 transition-colors" {...props} />,
    blockquote: (props: any) => (
      <blockquote className="border-l-4 border-indigo pl-4 italic my-6 text-gray-700 dark:text-gray-300 bg-indigo-50 dark:bg-indigo-900/20 py-2 pr-2 rounded-r animate-fade-in" {...props} />
    ),
    code: (props: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm" {...props} />
    ),
    pre: (props: any) => (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-6 animate-fade-in" {...props} />
    ),
    img: (props: any) => (
      <div className="my-6 animate-fade-in">
        <img className="rounded-lg shadow-md w-full" {...props} />
        {props.alt && <p className="text-center text-sm text-gray-500 mt-2">{props.alt}</p>}
      </div>
    ),
  };

  // Comments data - would be integrated with backend in a real implementation
  const comments = [
    {
      id: 1,
      user: {
        name: "Maya Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      text: "This article really helped me prepare for my IELTS exam. The tips for the speaking section were particularly useful!",
      date: "2023-10-25T14:53:00Z",
      likes: 12
    },
    {
      id: 2,
      user: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      text: "I've been struggling with time management during exams. The strategies mentioned here are practical and I'll definitely be implementing them in my next test.",
      date: "2023-10-24T09:32:00Z",
      likes: 8
    },
    {
      id: 3,
      user: {
        name: "Sara Ahmed",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      text: "Great breakdown of the exam structure. As someone preparing for this exam for the first time, I find this extremely helpful.",
      date: "2023-10-22T16:15:00Z",
      likes: 5
    }
  ];

  return (
    <Layout>
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50"
        style={{ marginTop: '64px' }}
      >
        <div 
          className="h-full bg-gradient-to-r from-indigo via-violet-500 to-purple-500"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center text-sm text-muted-foreground mb-8 animate-fade-in">
            <Link to="/" className="hover:text-indigo transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/blog" className="hover:text-indigo transition-colors">Blog</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground font-medium truncate">{post.title}</span>
          </div>
          
          {/* Cover Image with Gradient Overlay */}
          <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl group animate-fade-in">
            <AspectRatio ratio={21 / 9}>
              <img 
                src={coverImage}
                alt={post.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
              <div className="inline-block bg-indigo text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-lg mb-4 transform hover:translate-y-1 transition-transform">
                {post.category}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white drop-shadow-md">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social Sharing and Stats - Fixed Position Sidebar on larger screens */}
          <div className="hidden lg:flex flex-col fixed left-8 top-1/2 transform -translate-y-1/2 gap-4 z-10 animate-fade-in">
            <button 
              onClick={toggleLike}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md",
                isLiked ? "bg-coral text-white" : "bg-white dark:bg-gray-800 hover:bg-coral/10"
              )}
              title="Like this article"
            >
              <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
            </button>
            <button 
              onClick={toggleBookmark}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md",
                isBookmarked ? "bg-indigo text-white" : "bg-white dark:bg-gray-800 hover:bg-indigo/10"
              )}
              title="Save to reading list"
            >
              <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
            </button>
            
            {/* Share buttons */}
            <button 
              onClick={() => handleShare('copy')}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-md"
              title="Copy link"
            >
              <Copy className="h-5 w-5" />
            </button>
            <button 
              onClick={() => handleShare('twitter')}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[#1DA1F2] transition-all duration-300 shadow-md"
              title="Share on Twitter"
            >
              <Twitter className="h-5 w-5" />
            </button>
            <button 
              onClick={() => handleShare('facebook')}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[#4267B2] transition-all duration-300 shadow-md"
              title="Share on Facebook"
            >
              <Facebook className="h-5 w-5" />
            </button>
            <button 
              onClick={() => handleShare('linkedin')}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[#0077B5] transition-all duration-300 shadow-md"
              title="Share on LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              {/* Author Information */}
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl mb-8 shadow-md border border-indigo-100/50 dark:border-indigo-900/20 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
                <Avatar className="h-16 w-16 ring-4 ring-white dark:ring-gray-800 shadow-md">
                  {authorAvatar ? (
                    <AvatarImage src={authorAvatar} alt={post.author.name} className="object-cover" />
                  ) : (
                    <AvatarFallback>
                      <User className="h-6 w-6 text-gray-500" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className="font-bold text-lg">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">{post.author.title}</div>
                </div>
              </div>
              
              {/* Social Sharing for Mobile */}
              <div className="flex lg:hidden items-center justify-center gap-3 mb-8 animate-fade-in">
                <button 
                  onClick={toggleLike}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-all duration-300",
                    isLiked ? "bg-coral/10 text-coral" : "bg-gray-100 dark:bg-gray-800"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                  <span>Like</span>
                </button>
                <button 
                  onClick={toggleBookmark}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-all duration-300",
                    isBookmarked ? "bg-indigo/10 text-indigo" : "bg-gray-100 dark:bg-gray-800"
                  )}
                >
                  <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
                  <span>Save</span>
                </button>
                <button 
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-1 px-4 py-2 rounded-full text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
              
              {/* Article Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12 prose-headings:font-heading prose-img:rounded-xl prose-img:shadow-lg">
                <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
                
                {/* Tags Section - Mobile (inside article content) */}
                <div className="lg:hidden mt-12 bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30 p-6 rounded-xl shadow-sm animate-fade-in">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-indigo" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Link key={tag} to={`/blog?tag=${tag}`}>
                        <Badge variant="outline" className="bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer border-indigo/30 text-indigo">
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Comments Section */}
                <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <MessageSquare className="w-6 h-6 mr-2 text-indigo" />
                    Discussion ({comments.length})
                  </h3>
                  
                  <Tabs defaultValue="newest" value={activeCommentTab} onValueChange={setActiveCommentTab} className="mb-6">
                    <TabsList className="bg-gray-100 dark:bg-gray-800">
                      <TabsTrigger value="newest">Newest</TabsTrigger>
                      <TabsTrigger value="popular">Most Popular</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="space-y-6">
                    {comments
                      .sort((a, b) => activeCommentTab === "newest" 
                        ? new Date(b.date).getTime() - new Date(a.date).getTime()
                        : b.likes - a.likes
                      )
                      .map(comment => (
                        <div key={comment.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                              <AvatarFallback>
                                {comment.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium">{comment.user.name}</h4>
                                <span className="text-xs text-gray-500">
                                  {new Date(comment.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.text}</p>
                              <div className="mt-2 flex items-center gap-4">
                                <button className="text-xs flex items-center gap-1 text-gray-500 hover:text-indigo">
                                  <Heart className="h-3 w-3" />
                                  <span>{comment.likes}</span>
                                </button>
                                <button className="text-xs text-gray-500 hover:text-indigo">Reply</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  
                  <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Add a comment</h4>
                    <textarea 
                      className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-[120px]"
                      placeholder="Share your thoughts..."
                    ></textarea>
                    <div className="mt-3 flex justify-end">
                      <Button>Post Comment</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3 space-y-8">
              {/* Table of Contents */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 animate-fade-in sticky top-24">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-indigo" />
                  Contents
                </h3>
                <nav className="space-y-1">
                  <a href="#" className="block py-2 px-3 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo font-medium">
                    Introduction
                  </a>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Quantitative Aptitude: Strategic Approach
                  </a>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Reasoning: Systematic Problem-Solving
                  </a>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Exam Day Execution Strategy
                  </a>
                  <a href="#" className="block py-2 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Preparation Timeline
                  </a>
                </nav>
              </div>
              
              {/* Tags Section - Desktop */}
              <div className="hidden lg:block bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 animate-fade-in">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-indigo" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link key={tag} to={`/blog?tag=${tag}`}>
                      <Badge variant="outline" className="bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer border-indigo/30 text-indigo">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-950/30 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-lg font-semibold mb-4 border-l-4 border-indigo pl-3">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((post, idx) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
                        <div className="flex gap-3 p-3 rounded-lg hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors animate-fade-in" style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
                          <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md">
                            <img 
                              src={post.coverImage || "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"} 
                              alt={post.title} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium line-clamp-2 group-hover:text-indigo transition-colors">{post.title}</h4>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Newsletter signup */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-xl shadow-lg overflow-hidden animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="relative">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full"></div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">Subscribe to Our Newsletter</h3>
                  <p className="text-white/80 text-sm mb-4">Get the latest exam tips and resources delivered to your inbox weekly.</p>
                  
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 mb-3"
                  />
                  <Button className="w-full bg-white text-indigo hover:bg-white/90">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-12" />
          
          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/40 dark:to-purple-950/40 p-10 rounded-2xl shadow-lg transform hover:scale-[1.01] transition-transform duration-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex items-center justify-center p-4 bg-indigo/10 dark:bg-indigo/20 rounded-full mb-6">
              <Calendar className="h-8 w-8 text-indigo" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo to-purple bg-clip-text text-transparent">Ready to Explore More?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Dive deeper into our extensive collection of expert guides and resources to accelerate your exam preparation journey.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-indigo to-purple hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-lg">
              <Link to="/blog">Discover More Articles</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
