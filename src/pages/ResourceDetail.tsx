
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Video, Music, Book, Download, Star, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface ResourceData {
  id: string;
  title: string;
  description: string;
  type: string;
  level: string;
  popularity: number;
  downloadCount: string;
  isPremium?: boolean;
  isNew?: boolean;
  category: string;
  content?: string;
  fileSize?: string;
  lastUpdated?: string;
  requirements?: string[];
}

const ResourceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState<ResourceData | null>(null);

  useEffect(() => {
    // In a real app, you would fetch from an API
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const resourceData = findResourceById(slug || '');
      setResource(resourceData);
      setLoading(false);
    }, 500);
  }, [slug]);

  const findResourceById = (id: string) => {
    const allResources: ResourceData[] = [
      {
        id: "reading-practice-test-1",
        title: "Reading Practice Test 1",
        description: "Full-length practice test for the reading section with detailed answer explanations.",
        type: "PDF",
        level: "Intermediate",
        popularity: 4,
        downloadCount: "3.4K",
        category: "practice-tests",
        fileSize: "2.3 MB",
        lastUpdated: "2023-07-15",
        content: "This comprehensive reading practice test includes 40 questions covering all the question types you'll encounter in the actual exam. Each passage is followed by detailed explanations of the answers to help you understand the reasoning behind correct responses.",
        requirements: ["PDF Reader", "Printer (optional)", "40-60 minutes to complete"]
      },
      {
        id: "listening-practice-test-1",
        title: "Listening Practice Test 1",
        description: "Complete listening test with audio files and answer sheets.",
        type: "Audio",
        level: "All Levels",
        popularity: 5,
        downloadCount: "4.2K",
        category: "practice-tests",
        fileSize: "45 MB",
        lastUpdated: "2023-08-22",
        content: "This listening test package includes MP3 audio files for all four sections of the exam, along with question sheets and comprehensive answer keys. The recordings feature a variety of accents to prepare you for the actual test conditions.",
        requirements: ["Audio player", "Headphones", "30 minutes to complete"]
      },
      {
        id: "ielts-writing-task-2",
        title: "IELTS Writing Task 2 Guide",
        type: "Study Guide",
        level: "All Levels",
        description: "Comprehensive guide to mastering IELTS Writing Task 2 with model answers and expert tips.",
        popularity: 4.9,
        downloadCount: "24.5K",
        isPremium: true,
        category: "study-guides",
        fileSize: "5.1 MB",
        lastUpdated: "2023-09-10",
        content: "This complete guide to IELTS Writing Task 2 covers everything you need to know to achieve a band 7+ score. It includes 20 model essays with examiner comments, vocabulary lists for common topics, and step-by-step planning strategies.",
        requirements: ["PDF Reader", "Printer (optional)"]
      },
      {
        id: "toefl-speaking-templates",
        title: "TOEFL Speaking Templates",
        type: "Speaking Guide",
        level: "Intermediate",
        description: "Ready-to-use templates for all TOEFL speaking tasks to help structure your responses effectively.",
        popularity: 4.7,
        downloadCount: "18.3K",
        isNew: true,
        category: "study-guides",
        fileSize: "1.8 MB",
        lastUpdated: "2023-10-05",
        content: "These speaking templates provide you with ready-to-use frameworks for all six TOEFL speaking tasks. Each template includes time-management guidance, transition phrases, and example responses to help you maximize your score.",
        requirements: ["PDF Reader"]
      },
      {
        id: "pte-reading-practice",
        title: "PTE Reading Practice Set",
        type: "Practice Test",
        level: "Advanced",
        description: "Full-length PTE reading practice test with detailed answer explanations and scoring guide.",
        popularity: 4.8,
        downloadCount: "15.2K",
        isPremium: true,
        category: "practice-tests",
        fileSize: "3.7 MB",
        lastUpdated: "2023-10-18",
        content: "This PTE Academic reading practice set contains all question types you'll encounter in the real exam, including multiple-choice, reorder paragraphs, and fill in the blanks. Detailed explanations are provided for each answer.",
        requirements: ["PDF Reader", "60-75 minutes to complete"]
      },
      // Add some resources for each category
      {
        id: "academic-word-list",
        title: "Academic Word List - Complete Set",
        description: "Comprehensive vocabulary list essential for academic contexts.",
        type: "PDF",
        level: "All Levels",
        popularity: 5,
        downloadCount: "6.8K",
        category: "vocabulary-lists",
        fileSize: "1.2 MB",
        lastUpdated: "2023-06-11",
        content: "This resource contains the complete Academic Word List (AWL) organized by frequency and topic. It includes example sentences, collocations, and practice exercises to help you master these essential academic words.",
        requirements: ["PDF Reader"]
      },
      {
        id: "4-week-intensive-plan",
        title: "4-Week Intensive Study Plan",
        description: "Day-by-day study schedule for focused exam preparation in one month.",
        type: "PDF",
        level: "All Levels",
        popularity: 5,
        downloadCount: "4.9K",
        category: "lesson-plans",
        fileSize: "1.5 MB",
        lastUpdated: "2023-09-01",
        content: "This intensive 4-week study plan provides a day-by-day schedule to prepare for your exam in just one month. It includes recommended resources, practice exercises, and milestone tests to track your progress.",
        requirements: ["PDF Reader", "Commitment to 3-4 hours of daily study"]
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
        category: "downloadable-worksheets",
        fileSize: "2.8 MB",
        lastUpdated: "2023-11-02",
        content: "This set of printable worksheets helps you build your vocabulary through a variety of exercises, including matching, gap-fill, and word formation activities. Topics covered include education, environment, technology, and health.",
        requirements: ["PDF Reader", "Printer recommended"]
      },
      {
        id: "speaking-interview-techniques",
        title: "Speaking Interview Techniques",
        description: "Video demonstrations of effective responses for all speaking test parts.",
        type: "Video",
        level: "All Levels",
        popularity: 4,
        downloadCount: "3.1K",
        category: "video-tutorials",
        fileSize: "250 MB",
        lastUpdated: "2023-08-15",
        content: "This video tutorial series demonstrates effective speaking techniques for interview-based English proficiency tests. Watch native and non-native speakers provide model answers and learn strategies for improving fluency, pronunciation, and coherence.",
        requirements: ["Video player", "Headphones recommended", "60 minutes total viewing time"]
      }
    ];
    
    return allResources.find(item => item.id === id) || null;
  };

  const handleDownload = () => {
    // In a real app, you would initiate a file download
    toast({
      title: "Download started",
      description: `${resource?.title} is being downloaded to your device.`,
    });
    
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: "Your resource is ready to use!",
      });
    }, 2000);
  };

  const getResourceIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-10 w-10 text-indigo-500" />;
      case 'video':
        return <Video className="h-10 w-10 text-pink-500" />;
      case 'audio':
        return <Music className="h-10 w-10 text-amber-500" />;
      case 'study guide':
        return <Book className="h-10 w-10 text-emerald-500" />;
      case 'speaking guide':
        return <Book className="h-10 w-10 text-blue-500" />;
      case 'practice test':
        return <FileText className="h-10 w-10 text-purple-500" />;
      default:
        return <Book className="h-10 w-10 text-indigo-500" />;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-1/4"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-10 w-1/2"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-10"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!resource) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Resource Not Found</h2>
          <p className="mb-6">This resource doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/resources/categories')}>
            Browse Resources
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2" size={16} /> Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-gray-100 text-gray-700">
                  {resource.type}
                </Badge>
                <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500">
                  {resource.level}
                </Badge>
                {resource.isNew && (
                  <Badge className="bg-pink-500 text-white">New</Badge>
                )}
                {resource.isPremium && (
                  <Badge className="bg-yellow-500 text-white">Premium</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
              
              <div className="flex items-center gap-1 text-amber-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(resource.popularity) ? "currentColor" : "none"} 
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2">{resource.downloadCount} downloads</span>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {resource.content || resource.description}
                </p>
              </div>
              
              {resource.requirements && resource.requirements.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                  <ul className="list-disc pl-5">
                    {resource.requirements.map((req, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-400 mb-1">{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <Button 
                size="lg"
                className="w-full sm:w-auto flex items-center gap-2"
                onClick={handleDownload}
              >
                <Download size={18} /> Download Resource
              </Button>
            </div>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center my-6">
                  <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {getResourceIcon(resource.type)}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Format</span>
                    <span className="font-medium">{resource.type}</span>
                  </div>
                  
                  {resource.fileSize && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">File Size</span>
                      <span className="font-medium">{resource.fileSize}</span>
                    </div>
                  )}
                  
                  {resource.lastUpdated && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Last Updated</span>
                      <span className="font-medium flex items-center gap-1">
                        <Clock size={14} />
                        {resource.lastUpdated}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Level</span>
                    <span className="font-medium">{resource.level}</span>
                  </div>
                </div>
                
                {resource.isPremium ? (
                  <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                      <CheckCircle size={16} />
                      Premium Resource
                    </h3>
                    <p className="text-sm text-indigo-700 dark:text-indigo-400 mt-1">
                      This is a premium resource with enhanced content and features.
                    </p>
                  </div>
                ) : (
                  <div className="mt-8 bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 dark:text-green-300 flex items-center gap-2">
                      <CheckCircle size={16} />
                      Free Resource
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                      This resource is available for free to all users.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceDetail;
