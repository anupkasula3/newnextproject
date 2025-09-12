
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedPosts } from '@/data/blogData';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Sparkles, RefreshCw, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const FeaturedBlogs = () => {
  const { toast } = useToast();
  const featuredPosts = getFeaturedPosts(1); // Only get the first featured post
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(featuredPosts[0]);
  
  // Function to handle content editing
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentPost({
      ...currentPost,
      content: e.target.value
    });
  };
  
  // Function to save edited content
  const saveContent = () => {
    setIsEditing(false);
    toast({
      title: "Content Saved",
      description: "Your changes have been successfully saved.",
    });
  };
  
  // Function to regenerate content
  const regenerateContent = () => {
    // Simulating content regeneration - in a real app, this would call an API
    const dummyContent = "Newly regenerated content that discusses effective strategies for IELTS speaking preparation. Focus on fluency, vocabulary expansion, and practice with timed responses. Remember to structure your answers clearly and provide relevant examples from personal experience.";
    
    setCurrentPost({
      ...currentPost,
      content: currentPost.content + "\n\n" + dummyContent
    });
    
    toast({
      title: "Content Regenerated",
      description: "New content has been added to your article.",
    });
  };
  
  if (!currentPost) return null;
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-72 h-72 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div 
          className="text-center mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-indigo-100/80 dark:bg-indigo-900/20 backdrop-blur-sm px-4 py-2 rounded-full text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-3">
            <Sparkles className="h-4 w-4 mr-1.5" />
            <span>Editor's Pick</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Featured Article
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our top recommended reading to help you excel in your exam preparation journey.
          </p>
        </motion.div>
        
        <div className="mx-auto max-w-4xl">
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img 
                src={currentPost.coverImage || "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"} 
                alt={currentPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full mb-3 inline-block">
                  {currentPost.category}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{currentPost.title}</h3>
                <div className="flex items-center space-x-4">
                  <img 
                    src={currentPost.author.avatar} 
                    alt={currentPost.author.name}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <div>
                    <p className="text-white font-medium">{currentPost.author.name}</p>
                    <p className="text-white/70 text-sm">{new Date(currentPost.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })} · {currentPost.readingTime}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-3 mb-6">
                {currentPost.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-end space-x-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4" />
                  {isEditing ? "Cancel Editing" : "Edit Content"}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={regenerateContent}
                >
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </Button>
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <Textarea 
                    value={currentPost.content}
                    onChange={handleContentChange}
                    className="min-h-[300px]"
                  />
                  <Button onClick={saveContent} className="w-full">Save Changes</Button>
                </div>
              ) : (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
                    {currentPost.excerpt}
                  </p>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentPost.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-center">
                <Button asChild size="lg" className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                  <Link to={`/blog/${currentPost.slug}`} className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Read Full Article
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
