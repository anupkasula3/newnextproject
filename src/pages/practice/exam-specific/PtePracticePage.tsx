
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Headphones, 
  MessageSquare, 
  Clock, 
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const PtePracticePage = () => {
  const [selectedTab, setSelectedTab] = useState('module');
  const { toast } = useToast();
  
  const startFullMockExam = () => {
    toast({
      title: "Mock Exam Scheduled",
      description: "Your full PTE Academic mock exam has been scheduled. Good luck!",
    });
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">PTE Academic Practice Center</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Prepare for your PTE Academic exam with our comprehensive practice modules and full mock tests.
            </p>
          </div>

          <Tabs defaultValue="module" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="module">Individual Modules</TabsTrigger>
              <TabsTrigger value="mock">Full Mock Tests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="module" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-teal-700 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <MessageSquare className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Speaking & Writing</CardTitle>
                      <CardDescription className="text-white/80">
                        Enhance your speaking and writing skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>77-93 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Personal introduction, Read aloud, Repeat sentence, and more</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice various speaking and writing tasks including summarizing written text and essays.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/speaking?exam=pte" className="w-full">
                      <Button className="w-full" variant="outline">Start Speaking & Writing</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-blue-700 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <BookOpen className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Reading Practice</CardTitle>
                      <CardDescription className="text-white/80">
                        Improve your reading comprehension
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>32-41 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Multiple choice, Re-order paragraphs, Fill in the blanks</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with various reading tasks to improve your reading comprehension.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/reading?exam=pte" className="w-full">
                      <Button className="w-full" variant="outline">Start Reading Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-purple-700 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Headphones className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Listening Practice</CardTitle>
                      <CardDescription className="text-white/80">
                        Enhance your listening skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>45-57 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Summarize spoken text, Multiple choice, Fill in the blanks</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with various listening tasks to improve your listening comprehension.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/listening?exam=pte" className="w-full">
                      <Button className="w-full" variant="outline">Start Listening Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="mock" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Full PTE Academic Mock Test</CardTitle>
                  <CardDescription>
                    Take a complete mock PTE Academic test under timed conditions to simulate the real exam experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-6 space-y-4">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-500" /> 
                      Complete PTE Academic Experience
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Speaking & Writing (77-93 min)</p>
                          <p className="text-sm text-gray-500">Personal Introduction, Read Aloud, Essay, etc.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Reading (32-41 min)</p>
                          <p className="text-sm text-gray-500">Multiple choice, Re-order paragraphs, etc.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Listening (45-57 min)</p>
                          <p className="text-sm text-gray-500">Summarize spoken text, Multiple choice, etc.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-5 w-5 text-teal-700" />
                        <h4 className="font-medium">Take Your Mock Test</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Set aside approximately 3 hours to complete all sections of the test. Short breaks are allowed between sections.
                      </p>
                      <Link to="/practice/mock-test?exam=pte">
                        <Button className="w-full bg-teal-700 hover:bg-teal-800" onClick={startFullMockExam}>
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

export default PtePracticePage;
