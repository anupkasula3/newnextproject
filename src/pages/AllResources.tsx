
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Book, Video, Bookmark, Star, ExternalLink, Music, Library, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ResourceProps {
  id: string;
  title: string;
  description: string;
  type: string;
  level: string;
  popularity: number;
  downloadCount: string;
  isNew?: boolean;
  isPremium?: boolean;
  content?: string;
}

// All resources data
const allResources = [
  {
    id: "complete-study-guide",
    title: "Complete Study Guide",
    description: "A comprehensive guide covering all essential topics for exam preparation.",
    type: "PDF",
    level: "All Levels",
    popularity: 5,
    downloadCount: "5.2K",
    isPremium: true,
    content: "This comprehensive study guide covers all sections of the exam, including detailed explanations of question types, strategies for each section, and practice questions with answers and explanations. The guide also includes tips from top scorers and common mistakes to avoid."
  },
  {
    id: "reading-techniques",
    title: "Mastering Reading Techniques",
    description: "Learn effective strategies for improving reading comprehension and speed.",
    type: "Book",
    level: "Intermediate",
    popularity: 4,
    downloadCount: "3.8K",
    content: "This resource teaches advanced reading techniques including skimming, scanning, and detailed reading approaches. It contains targeted exercises for improving reading speed while maintaining comprehension, and strategies for handling different question types in the reading section."
  },
  {
    id: "listening-practice",
    title: "Listening Practice Collection",
    description: "Audio samples with practice questions to enhance listening skills for various accents.",
    type: "Audio",
    level: "Beginner",
    popularity: 4,
    downloadCount: "2.9K",
    isNew: true,
    content: "This collection features over 50 audio recordings covering a range of accents, speech patterns, and topics. Each recording is accompanied by questions that mimic the format of the actual exam, with detailed answer explanations and transcripts for self-study."
  },
  {
    id: "writing-task-analysis",
    title: "Writing Task Analysis",
    description: "Sample essays with expert annotations and feedback for improving writing skills.",
    type: "PDF",
    level: "Advanced",
    popularity: 5,
    downloadCount: "4.7K",
    content: "This guide analyzes over 30 high-scoring essay responses, highlighting effective structures, vocabulary use, and grammar patterns. It includes step-by-step approaches to both writing tasks, with templates and phrases that can boost your score."
  },
  {
    id: "speaking-tutorial",
    title: "Speaking Test Tutorial",
    description: "Video guide demonstrating effective speaking strategies and response structures.",
    type: "Video",
    level: "All Levels",
    popularity: 5,
    downloadCount: "6.1K",
    isPremium: true,
    content: "This comprehensive video tutorial features expert instructors demonstrating ideal responses for all speaking test sections. It includes tips for managing nervousness, strategies for extending answers, and techniques for handling difficult questions with confidence."
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
    content: "These worksheets contain over 500 essential vocabulary words organized by topics commonly found in the exam. Each worksheet includes definitions, example sentences, collocations, and exercises to help you memorize and use these words effectively in your test."
  },
  {
    id: "grammar-mastery",
    title: "Grammar Mastery Guide",
    description: "Detailed explanations of essential grammar rules with examples and practice exercises.",
    type: "PDF",
    level: "Beginner",
    popularity: 4,
    downloadCount: "3.2K",
    content: "This guide covers the most important grammar points for the exam, explaining rules in simple language with clear examples. Each grammar point includes practice exercises and common error analysis to help you avoid mistakes."
  },
  {
    id: "timed-practice-tests",
    title: "Timed Practice Tests",
    description: "Full-length practice tests with timers to simulate actual exam conditions.",
    type: "PDF",
    level: "Advanced",
    popularity: 5,
    downloadCount: "4.9K",
    isPremium: true,
    content: "This collection includes 5 complete practice tests that mimic the format, difficulty, and timing of the real exam. Each test comes with detailed answer explanations and score conversion tables to help you gauge your progress."
  },
  {
    id: "pronunciation-guide",
    title: "Pronunciation Guide",
    description: "Audio lessons focusing on difficult sounds, stress, and intonation patterns.",
    type: "Audio",
    level: "All Levels",
    popularity: 4,
    downloadCount: "2.7K",
    content: "This audio guide helps you master the sounds that non-native speakers find most challenging. It includes listening and speaking exercises for vowels, consonants, word stress, and sentence intonation to improve your overall pronunciation."
  },
  {
    id: "note-taking-strategies",
    title: "Effective Note-Taking Strategies",
    description: "Learn how to take efficient notes during the listening section to improve your responses.",
    type: "Video",
    level: "Intermediate",
    popularity: 4,
    downloadCount: "2.3K",
    isNew: true,
    content: "This video tutorial teaches you systematic approaches to note-taking during the listening test. It demonstrates techniques for capturing key information, organizing your notes, and using abbreviations and symbols to save time."
  },
  {
    id: "academic-word-list",
    title: "Academic Word List Explorer",
    description: "Interactive tool to learn and practice using essential academic vocabulary.",
    type: "PDF",
    level: "Intermediate",
    popularity: 4,
    downloadCount: "3.1K",
    content: "This resource contains the complete Academic Word List organized by frequency and topic. Each word is presented with definitions, example sentences, collocations, and synonyms to help expand your academic vocabulary."
  },
  {
    id: "paraphrasing-techniques",
    title: "Paraphrasing Techniques Workshop",
    description: "Learn methods to rephrase information using different vocabulary and structures.",
    type: "Video",
    level: "Advanced",
    popularity: 4,
    downloadCount: "2.5K",
    content: "This workshop demonstrates effective techniques for paraphrasing text, an essential skill for both the speaking and writing tests. It includes step-by-step examples and practice exercises to help you avoid repetition and plagiarism."
  }
];

const ResourceCard = ({ resource }: { resource: ResourceProps }) => {
  const navigate = useNavigate();
  
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

  const handleViewResource = () => {
    navigate(`/resources/${resource.id}`);
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Downloading resource: ${resource.title}`);
    // In a real app, this would trigger a download
  };

  return (
    <Card className="h-full hover:shadow-md transition-all cursor-pointer" onClick={handleViewResource}>
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
            <Star key={i} size={16} fill={i < resource.popularity ? "currentColor" : "none"} />
          ))}
          <span className="text-sm text-gray-500 ml-2">{resource.downloadCount} downloads</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1 gap-2" onClick={handleDownload}>
          <Download size={16} /> Download
        </Button>
        <Button className="flex-1 gap-2" onClick={handleViewResource}>
          <ExternalLink size={16} /> View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

const AllResources = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [resourceType, setResourceType] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const itemsPerPage = 9;
  
  // Filter resources based on search term, type, and level
  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = resourceType === "all" || resource.type.toLowerCase() === resourceType.toLowerCase();
    const matchesLevel = levelFilter === "all" || resource.level === levelFilter;
    
    return matchesSearch && matchesType && matchesLevel;
  });
  
  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResources = filteredResources.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">All Learning Resources</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse our complete collection of study materials, practice tests, and learning guides.
          </p>
        </div>
        
        {/* Filter and Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search Resources</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Resource Type</label>
              <Select value={resourceType} onValueChange={setResourceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="All Levels">For All Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {currentResources.length} of {filteredResources.length} resources
          </p>
          <div className="flex items-center gap-2">
            <Library size={18} />
            <span className="font-medium">Resource Library</span>
          </div>
        </div>
        
        {currentResources.length > 0 ? (
          <>
            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentResources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="my-8">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }} 
                      />
                    </PaginationItem>
                  )}
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    // Only show current page, first, last, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(page);
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      (page === currentPage - 2 && currentPage > 3) ||
                      (page === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      return <PaginationItem key={page}><PaginationEllipsis /></PaginationItem>;
                    }
                    return null;
                  })}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }} 
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Bookmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No resources found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setResourceType("all");
                setLevelFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllResources;
