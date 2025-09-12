
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calculator,
  Edit,
  Clock, 
  CheckCircle2,
  Trophy,
  BrainCircuit
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const GrePracticePage = () => {
  const [selectedTab, setSelectedTab] = useState('module');
  const { toast } = useToast();

  const startFullMockExam = () => {
    toast({
      title: "Mock Exam Scheduled",
      description: "Your full GRE mock exam has been scheduled. Good luck!",
    });
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">GRE Practice Center</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Prepare for your GRE exam with our comprehensive practice modules and full mock tests.
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
                  <CardHeader className="bg-purple-700 text-white p-6 flex flex-row items-center space-x-4">
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
                        <span>30 minutes per section</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Reading Comprehension, Text Completion, Sentence Equivalence</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with GRE-style verbal reasoning questions to improve your vocabulary and comprehension.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/gre/verbal" className="w-full">
                      <Button className="w-full" variant="outline">Start Verbal Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-blue-700 text-white p-6 flex flex-row items-center space-x-4">
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
                        <span>35 minutes per section</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Quantitative Comparison, Problem Solving, Data Interpretation</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with math problems covering arithmetic, algebra, geometry, and data analysis.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/gre/quantitative" className="w-full">
                      <Button className="w-full" variant="outline">Start Quantitative Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-green-700 text-white p-6 flex flex-row items-center space-x-4">
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
                        <span>30 minutes per essay</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Analyze an Issue and Analyze an Argument tasks</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice writing clear, focused, and well-structured essays under timed conditions.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/gre/analytical" className="w-full">
                      <Button className="w-full" variant="outline">Start Writing Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-amber-700 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <BrainCircuit className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Integrated Practice</CardTitle>
                      <CardDescription className="text-white/80">
                        Combined skills practice
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>60 minutes practice session</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Mixed verbal, quantitative, and analytical tasks</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with a combination of question types to improve your overall GRE performance.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/gre/mixed" className="w-full">
                      <Button className="w-full" variant="outline">Start Integrated Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="mock" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Full GRE Mock Test</CardTitle>
                  <CardDescription>
                    Take a complete mock GRE test under timed conditions to simulate the real exam experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-6 space-y-4">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-500" /> 
                      Complete GRE Experience
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Analytical Writing (60 min)</p>
                          <p className="text-sm text-gray-500">2 essays (Analyze an Issue, Analyze an Argument)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Verbal Reasoning (60 min)</p>
                          <p className="text-sm text-gray-500">2 sections, 20 questions each</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Quantitative Reasoning (70 min)</p>
                          <p className="text-sm text-gray-500">2 sections, 20 questions each</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Experimental Section (varies)</p>
                          <p className="text-sm text-gray-500">May be included to simulate real exam</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-5 w-5 text-purple-600" />
                        <h4 className="font-medium">Take Your Mock Test</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Set aside approximately 3.75 hours to complete all sections of the test. You can take a 10-minute break between sections.
                      </p>
                      <Link to="/practice/mock-test?exam=gre">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={startFullMockExam}>
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

export default GrePracticePage;
