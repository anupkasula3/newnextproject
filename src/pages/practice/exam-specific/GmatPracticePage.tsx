
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  BookOpen, 
  Edit, 
  BarChart,
  Clock, 
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const GmatPracticePage = () => {
  const [selectedTab, setSelectedTab] = useState('module');
  const { toast } = useToast();
  
  const startFullMockExam = () => {
    toast({
      title: "Mock Exam Scheduled",
      description: "Your full GMAT mock exam has been scheduled. Good luck!",
    });
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">GMAT Practice Center</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Prepare for your GMAT exam with our comprehensive practice modules and full mock tests.
            </p>
          </div>

          <Tabs defaultValue="module" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="module">Individual Sections</TabsTrigger>
              <TabsTrigger value="mock">Full Mock Tests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="module" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-blue-800 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <BookOpen className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Verbal Reasoning</CardTitle>
                      <CardDescription className="text-white/80">
                        Enhance your verbal reasoning skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>65 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Reading Comprehension, Critical Reasoning, Sentence Correction</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with GMAT-style verbal reasoning questions to improve your comprehension and analytical skills.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/reading?exam=gmat" className="w-full">
                      <Button className="w-full" variant="outline">Start Verbal Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-green-800 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Calculator className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Quantitative Reasoning</CardTitle>
                      <CardDescription className="text-white/80">
                        Improve your mathematical skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>62 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Problem Solving and Data Sufficiency</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with math problems covering arithmetic, algebra, geometry, and word problems.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/reading?exam=gmat&section=quantitative" className="w-full">
                      <Button className="w-full" variant="outline">Start Quantitative Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-amber-700 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <BarChart className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Integrated Reasoning</CardTitle>
                      <CardDescription className="text-white/80">
                        Enhance your data interpretation skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>30 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Graphics Interpretation, Multi-Source Reasoning</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice analyzing and synthesizing data from multiple sources to solve complex problems.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/reading?exam=gmat&section=integrated" className="w-full">
                      <Button className="w-full" variant="outline">Start Integrated Reasoning</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-purple-700 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Edit className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Analytical Writing</CardTitle>
                      <CardDescription className="text-white/80">
                        Improve your analytical writing skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>30 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Analysis of an Argument</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice writing a critique of a given argument, demonstrating your critical thinking and writing skills.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/writing?exam=gmat" className="w-full">
                      <Button className="w-full" variant="outline">Start Writing Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="mock" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Full GMAT Mock Test</CardTitle>
                  <CardDescription>
                    Take a complete mock GMAT test under timed conditions to simulate the real exam experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-6 space-y-4">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-500" /> 
                      Complete GMAT Experience
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Analytical Writing (30 min)</p>
                          <p className="text-sm text-gray-500">Analysis of an Argument</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Integrated Reasoning (30 min)</p>
                          <p className="text-sm text-gray-500">12 questions in various formats</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Quantitative Reasoning (62 min)</p>
                          <p className="text-sm text-gray-500">31 questions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Verbal Reasoning (65 min)</p>
                          <p className="text-sm text-gray-500">36 questions</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-5 w-5 text-blue-800" />
                        <h4 className="font-medium">Take Your Mock Test</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Set aside approximately 3.5 hours to complete all sections of the test. Two optional 8-minute breaks are included.
                      </p>
                      <Link to="/practice/mock-test?exam=gmat">
                        <Button className="w-full bg-blue-800 hover:bg-blue-900" onClick={startFullMockExam}>
                          Start Full Mock Test
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Mock Test History</CardTitle>
                  <CardDescription>
                    Review your previous mock tests and track your progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">
                      You haven't taken any mock tests yet. Start a mock test to track your progress!
                    </p>
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

export default GmatPracticePage;
