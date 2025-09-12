import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Video, Music, Book, Bookmark, Calendar, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CategoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const getCategoryData = (id: string) => {
    const categories = [
      {
        id: "practice-tests",
        title: "Practice Tests",
        description: "Mock tests and sample questions to assess your progress and identify areas for improvement.",
        icon: <FileText size={24} style={{ color: "#8B5CF6" }} />,
        color: "#8B5CF6"
      },
      {
        id: "video-tutorials", 
        title: "Video Tutorials",
        description: "Watch expert instructors explain complex topics with clear examples and visual demonstrations.",
        icon: <Video size={24} style={{ color: "#EC4899" }} />,
        color: "#EC4899"
      },
      {
        id: "study-guides",
        title: "Study Guides",
        description: "Comprehensive materials to improve your understanding of key concepts and test-taking strategies.",
        icon: <Book size={24} style={{ color: "#10B981" }} />,
        color: "#10B981"
      },
      {
        id: "vocabulary-lists",
        title: "Vocabulary Lists",
        description: "Essential words and phrases to expand your lexicon, organized by topic and difficulty level.",
        icon: <Bookmark size={24} style={{ color: "#F97316" }} />,
        color: "#F97316"
      },
      {
        id: "lesson-plans",
        title: "Lesson Plans",
        description: "Structured learning schedules to optimize your study time and ensure comprehensive preparation.",
        icon: <Calendar size={24} style={{ color: "#3B82F6" }} />,
        color: "#3B82F6"
      },
      {
        id: "downloadable-worksheets",
        title: "Downloadable Worksheets",
        description: "Printable exercises for offline practice with answer keys and detailed explanations for self-study.",
        icon: <Download size={24} style={{ color: "#6366F1" }} />,
        color: "#6366F1"
      }
    ];
    
    return categories.find(category => category.id === id) || null;
  };

  const getResourcesByCategory = (categoryId: string) => {
    const allResources = [
      {
        id: "reading-practice-test-1",
        title: "Reading Practice Test 1",
        description: "Full-length practice test for the reading section with detailed answer explanations.",
        type: "PDF",
        level: "Intermediate",
        popularity: 4,
        downloadCount: "3.4K",
        category: "practice-tests"
      },
      {
        id: "listening-practice-test-1",
        title: "Listening Practice Test 1",
        description: "Complete listening test with audio files and answer sheets.",
        type: "Audio",
        level: "All Levels",
        popularity: 5,
        downloadCount: "4.2K",
        category: "practice-tests"
      },
      {
        id: "full-mock-test-1",
        title: "Full Mock Test - Academic",
        description: "Complete simulation of the exam with all four sections.",
        type: "PDF",
        level: "Advanced",
        popularity: 5,
        downloadCount: "5.7K",
        isPremium: true,
        category: "practice-tests"
      },
      
      {
        id: "reading-strategies-video",
        title: "Reading Strategies Video Course",
        description: "Video lessons on effective reading techniques and question-answering strategies.",
        type: "Video",
        level: "Beginner",
        popularity: 4,
        downloadCount: "2.8K",
        category: "video-tutorials"
      },
      {
        id: "writing-task-2-masterclass",
        title: "Writing Task 2 Masterclass",
        description: "Comprehensive video guide to excelling in the essay writing section.",
        type: "Video",
        level: "Intermediate",
        popularity: 5,
        downloadCount: "3.9K",
        isPremium: true,
        category: "video-tutorials"
      },
      {
        id: "speaking-interview-techniques",
        title: "Speaking Interview Techniques",
        description: "Video demonstrations of effective responses for all speaking test parts.",
        type: "Video",
        level: "All Levels",
        popularity: 4,
        downloadCount: "3.1K",
        category: "video-tutorials"
      },
      
      {
        id: "complete-study-guide",
        title: "Complete Study Guide",
        description: "A comprehensive guide covering all essential topics for exam preparation.",
        type: "PDF",
        level: "All Levels",
        popularity: 5,
        downloadCount: "5.2K",
        isPremium: true,
        category: "study-guides"
      },
      {
        id: "grammar-for-writing",
        title: "Grammar for Writing Success",
        description: "Detailed guide to the grammar structures needed for high scores in writing.",
        type: "PDF",
        level: "Intermediate",
        popularity: 4,
        downloadCount: "2.9K",
        category: "study-guides"
      },
      
      {
        id: "academic-word-list",
        title: "Academic Word List - Complete Set",
        description: "Comprehensive vocabulary list essential for academic contexts.",
        type: "PDF",
        level: "All Levels",
        popularity: 5,
        downloadCount: "6.8K",
        category: "vocabulary-lists"
      },
      {
        id: "topic-based-vocabulary",
        title: "Topic-Based Vocabulary Collection",
        description: "Vocabulary organized by common exam topics like environment, education, and technology.",
        type: "PDF",
        level: "Intermediate",
        popularity: 4,
        downloadCount: "3.7K",
        isNew: true,
        category: "vocabulary-lists"
      },
      
      {
        id: "4-week-intensive-plan",
        title: "4-Week Intensive Study Plan",
        description: "Day-by-day study schedule for focused exam preparation in one month.",
        type: "PDF",
        level: "All Levels",
        popularity: 5,
        downloadCount: "4.9K",
        category: "lesson-plans"
      },
      {
        id: "3-month-comprehensive-plan",
        title: "3-Month Comprehensive Study Plan",
        description: "Detailed study roadmap for thorough preparation over three months.",
        type: "PDF",
        level: "Beginner",
        popularity: 4,
        downloadCount: "3.2K",
        category: "lesson-plans"
      },
      
      {
        id: "vocabulary-builder",
        title: "Vocabulary Builder Worksheets",
        description: "Exercises to expand your vocabulary for all test sections with topical word lists.",
        type: "PDF",
        level: "Intermediate",
        popularity: 3,
        downloadCount: "1.8K",
        isNew: true,
        category: "downloadable-worksheets"
      },
      {
        id: "grammar-practice-worksheets",
        title: "Grammar Practice Worksheets",
        description: "Printable exercises focused on common grammar points tested in the exam.",
        type: "PDF",
        level: "All Levels",
        popularity: 4,
        downloadCount: "2.6K",
        category: "downloadable-worksheets"
      }
    ];
    
    return allResources.filter(resource => resource.category === categoryId);
  };

  const category = getCategoryData(slug || '');
  const resources = getResourcesByCategory(slug || '');

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
          <p className="mb-6">The category you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/resources/categories')}>
            Back to Resources
          </Button>
        </div>
      </Layout>
    );
  }

  const ResourceCard = ({ resource }: { resource: any }) => {
    const getIcon = (type: string) => {
      switch (type.toLowerCase()) {
        case 'pdf':
          return <FileText className="text-indigo-500" />;
        case 'video':
          return <Video className="text-pink-500" />;
        case 'audio':
          return <Music className="text-amber-500" />;
        case 'book':
          return <Book className="text-emerald-500" />;
        default:
          return <Bookmark className="text-indigo-500" />;
      }
    };
  
    return (
      <Card 
        className="h-full hover:shadow-md transition-all cursor-pointer" 
        onClick={() => navigate(`/resources/${resource.id}`)}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="mb-1 text-xl">{resource.title}</CardTitle>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  {resource.type}
                </Badge>
                <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20">
                  {resource.level}
                </Badge>
                {resource.isNew && (
                  <Badge className="bg-pink-500 text-white hover:bg-pink-600">New</Badge>
                )}
                {resource.isPremium && (
                  <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">Premium</Badge>
                )}
              </div>
            </div>
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
              {getIcon(resource.type)}
            </div>
          </div>
          <CardDescription>{resource.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill={i < resource.popularity ? "currentColor" : "none"} 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
            <span className="text-sm text-gray-500 ml-2">{resource.downloadCount} downloads</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full gap-2">
            <Download size={16} /> Download Resource
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/resources/categories')}
        >
          <ArrowLeft className="mr-2" size={16} /> Back to Resources
        </Button>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="rounded-full p-4" 
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              {category.icon}
            </div>
            <h1 className="text-3xl font-bold">{category.title}</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            {category.description}
          </p>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Available Resources</h2>
          
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No resources available in this category yet.</p>
              <Button onClick={() => navigate('/resources/categories')}>
                Browse Other Categories
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryDetail;
