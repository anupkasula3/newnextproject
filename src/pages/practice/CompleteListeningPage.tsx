
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { ListeningTest } from '@/components/practice/listening/ListeningTest';
import { ListeningInstructions } from '@/components/practice/listening/ListeningInstructions';
import ListeningHeader from '@/components/practice/listening/ListeningHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Headphones, Filter, Clock, BookOpen, CheckCircle, BarChart2, ArrowUpDown, ArrowDown, ArrowUp, Search } from 'lucide-react';
import { listeningTestData } from '@/data/listeningTestData';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TestType, DifficultyLevel } from '@/components/practice/listening/ListeningTest';
import { useToast } from '@/hooks/use-toast';

type SortOption = 'newest' | 'oldest' | 'difficulty-asc' | 'difficulty-desc';
type FilterType = 'all' | 'conversation' | 'lecture' | 'discussion' | 'interview';

const CompleteListeningPage = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState<TestType>('academic');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('intermediate');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const { toast } = useToast();
  
  const handleStartTest = () => {
    setTestStarted(true);
    toast({
      title: "Test Started",
      description: `Starting ${selectedTestType} test at ${selectedDifficulty} difficulty`,
    });
  };

  // Navigate to different tabs
  const navigateToTab = (tabValue: string) => {
    // Find the tab trigger element
    const tabTrigger = document.querySelector(`[data-value="${tabValue}"]`) as HTMLElement;
    if (tabTrigger) {
      // Safely trigger a click event
      tabTrigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  };

  // Mock list of available tests (in a real app, this would come from an API)
  const availableTests = [
    {
      id: 'lt-001',
      title: 'Social Survey & Library Tour',
      description: 'Practice understanding conversations in academic settings',
      type: 'conversation',
      difficulty: 'beginner' as DifficultyLevel,
      duration: 20,
      questions: 15,
      progress: 0,
      date: '2025-03-28',
    },
    {
      id: 'lt-002',
      title: 'Academic Lecture: Urban Planning',
      description: 'Listen to a university lecture on urban development',
      type: 'lecture',
      difficulty: 'intermediate' as DifficultyLevel,
      duration: 25,
      questions: 20,
      progress: 65,
      date: '2025-03-25',
    },
    {
      id: 'lt-003',
      title: 'Workplace Discussion',
      description: 'Practice understanding workplace dialogues',
      type: 'discussion',
      difficulty: 'beginner' as DifficultyLevel,
      duration: 15,
      questions: 10,
      progress: 100,
      date: '2025-03-20',
    },
    {
      id: 'lt-004',
      title: 'Expert Interview: Climate Change',
      description: 'Listen to an in-depth interview with a climate scientist',
      type: 'interview',
      difficulty: 'advanced' as DifficultyLevel,
      duration: 30,
      questions: 25,
      progress: 0,
      date: '2025-03-15',
    },
    {
      id: 'lt-005',
      title: 'Medical Consultation',
      description: 'Practice understanding healthcare conversations',
      type: 'conversation',
      difficulty: 'intermediate' as DifficultyLevel,
      duration: 20,
      questions: 15,
      progress: 75,
      date: '2025-03-10',
    },
  ];
  
  // Filter and sort tests
  const filteredTests = availableTests
    .filter(test => {
      const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           test.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || test.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'difficulty-asc':
          const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'difficulty-desc':
          const difficultyOrderDesc = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
          return difficultyOrderDesc[b.difficulty] - difficultyOrderDesc[a.difficulty];
        default:
          return 0;
      }
    });
  
  // Get badge color based on difficulty
  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  // Get the appropriate icon for the sort direction
  const getSortIcon = (option: SortOption) => {
    if (option === 'difficulty-asc' || option === 'oldest') {
      return <ArrowUp className="h-4 w-4 mr-2" />;
    } else if (option === 'difficulty-desc' || option === 'newest') {
      return <ArrowDown className="h-4 w-4 mr-2" />;
    }
    return <ArrowUpDown className="h-4 w-4 mr-2" />;
  };
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <ListeningHeader />
        
        <Tabs defaultValue="practice" className="mt-8">
          <TabsList className="mb-8 w-full md:w-auto">
            <TabsTrigger value="practice" className="flex-1 md:flex-none">
              <Headphones className="h-4 w-4 mr-2" />
              Practice Tests
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-1 md:flex-none">
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed Tests
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1 md:flex-none">
              <BarChart2 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="practice" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Available Listening Tests</CardTitle>
                <CardDescription>
                  Choose from a variety of listening tests to practice your skills
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Search and Filter controls */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search tests..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Select value={filterType} onValueChange={(value: FilterType) => setFilterType(value)}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="conversation">Conversations</SelectItem>
                        <SelectItem value="lecture">Lectures</SelectItem>
                        <SelectItem value="discussion">Discussions</SelectItem>
                        <SelectItem value="interview">Interviews</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
                      <SelectTrigger className="w-[180px]">
                        {getSortIcon(sortOption)}
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="difficulty-asc">Easiest First</SelectItem>
                        <SelectItem value="difficulty-desc">Hardest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Test List */}
                <div className="space-y-4">
                  {filteredTests.length > 0 ? (
                    filteredTests.map((test) => (
                      <Card key={test.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-6 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold">{test.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">{test.description}</p>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{test.duration} mins</span>
                                </Badge>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" />
                                  <span>{test.questions} questions</span>
                                </Badge>
                                <Badge className={getDifficultyColor(test.difficulty)}>
                                  {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            
                            {test.progress > 0 && (
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span className="font-medium">{test.progress}%</span>
                                </div>
                                <Progress value={test.progress} className="h-2" />
                              </div>
                            )}
                            
                            <div className="flex flex-col md:flex-row gap-3 mt-4">
                              <Button 
                                onClick={() => {
                                  setSelectedTestType(test.difficulty === 'beginner' ? 'general' : 'academic');
                                  setSelectedDifficulty(test.difficulty);
                                  setTestStarted(true);
                                  toast({
                                    title: "Test Started",
                                    description: `Starting ${test.title}`,
                                  });
                                }}
                                className="bg-indigo hover:bg-indigo-600"
                              >
                                {test.progress > 0 && test.progress < 100 ? 'Resume Test' : 'Start Test'}
                              </Button>
                              
                              <Button variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500 dark:text-gray-400">No tests found matching your criteria.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery('');
                          setFilterType('all');
                          setSortOption('newest');
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Completed Tests</CardTitle>
                <CardDescription>
                  Review your test history and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Headphones className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No completed tests yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Complete a listening test to see your results here
                  </p>
                  <Button onClick={() => navigateToTab('practice')}>
                    Browse Practice Tests
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Listening Performance Analytics</CardTitle>
                <CardDescription>
                  Track your progress and identify areas for improvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart2 className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No analytics data available</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Complete more listening tests to see detailed performance analytics
                  </p>
                  <Button onClick={() => navigateToTab('practice')}>
                    Try a Practice Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {testStarted && (
          <div className="mt-8">
            <ListeningTest testType={selectedTestType} difficulty={selectedDifficulty} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompleteListeningPage;
