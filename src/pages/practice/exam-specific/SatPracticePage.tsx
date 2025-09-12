
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  BookOpen, 
  Clock, 
  CheckCircle2,
  Trophy,
  ArrowRight,
  FileText,
  PenTool
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';

const SatPracticePage = () => {
  const [selectedTab, setSelectedTab] = useState('module');
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const startFullMockExam = () => {
    toast({
      title: "Mock Exam Scheduled",
      description: "Your full SAT mock exam has been scheduled. Good luck!",
    });
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight inline-block bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">SAT Practice Center</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Prepare for your SAT exam with our comprehensive practice modules and full mock tests.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-red-800 mx-auto mt-2 rounded-full"></div>
          </div>

          <Tabs defaultValue="module" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="module" className="data-[state=active]:bg-red-700 data-[state=active]:text-white">Individual Sections</TabsTrigger>
              <TabsTrigger value="mock" className="data-[state=active]:bg-red-700 data-[state=active]:text-white">Full Mock Tests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="module" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-800">
                  <CardHeader className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <BookOpen className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Reading & Writing</CardTitle>
                      <CardDescription className="text-white/80">
                        Enhance your reading and writing skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-red-600" />
                        <span>64 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-red-600" />
                        <span>Reading comprehension, grammar, and expression of ideas</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with SAT-style reading and writing questions to improve your verbal skills.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                      <Link to="/practice/sat/reading" className="w-full">
                        <Button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:opacity-90 flex items-center justify-center gap-2">
                          <FileText className="h-4 w-4" />
                          Reading
                        </Button>
                      </Link>
                      <Link to="/practice/sat/writing" className="w-full">
                        <Button className="w-full bg-gradient-to-r from-red-700 to-red-900 hover:opacity-90 flex items-center justify-center gap-2">
                          <PenTool className="h-4 w-4" />
                          Writing
                        </Button>
                      </Link>
                    </div>
                    <Link to="/practice/sat/vocabulary" className="w-full mt-3 block">
                      <Button variant="outline" className="w-full border-red-200 text-red-700 hover:bg-red-50 flex items-center justify-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Vocabulary
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-800">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Calculator className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Math</CardTitle>
                      <CardDescription className="text-white/80">
                        Improve your mathematical skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span>70 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                        <span>Algebra, problem-solving, data analysis, and advanced math</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with math problems covering a range of topics to boost your quantitative skills.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/sat/math" className="w-full">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90 flex items-center justify-center gap-2">
                        Start Math Practice
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="mock" className="space-y-6">
              <Card className="border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Full SAT Mock Test</CardTitle>
                  <CardDescription className="text-center">
                    Take a complete mock SAT test under timed conditions to simulate the real exam experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="rounded-lg border border-gray-100 dark:border-gray-800 p-6 space-y-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                    <h3 className="font-semibold text-lg flex items-center text-center justify-center gap-2 mb-4">
                      <Trophy className="h-5 w-5 text-yellow-500" /> 
                      <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">Complete SAT Experience</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start p-4 border border-gray-100 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 shadow-sm">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Reading & Writing (64 min)</p>
                          <p className="text-sm text-gray-500">54 questions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-4 border border-gray-100 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 shadow-sm">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Math (70 min)</p>
                          <p className="text-sm text-gray-500">44 questions</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-md border border-gray-100 dark:border-gray-800 shadow-inner">
                      <div className="flex items-center space-x-2 mb-3">
                        <Clock className="h-5 w-5 text-red-600" />
                        <h4 className="font-medium">Take Your Mock Test</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-5">
                        Set aside approximately 2.5 hours to complete all sections of the test. A 10-minute break is included.
                      </p>
                      <Link to="/practice/mock-test?exam=sat" className="block">
                        <Button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:opacity-90 shadow-lg flex items-center justify-center gap-2" onClick={startFullMockExam}>
                          Start Full Mock Test
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 dark:border-gray-800 shadow-md">
                <CardHeader>
                  <CardTitle>Your Mock Test History</CardTitle>
                  <CardDescription>
                    Review your previous mock tests and track your progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Clock className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      You haven't taken any mock tests yet. 
                    </p>
                    <p className="text-sm text-gray-400">Start a mock test to track your progress!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default SatPracticePage;
