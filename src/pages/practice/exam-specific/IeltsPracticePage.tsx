
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
  Edit, 
  Clock, 
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const IeltsPracticePage = () => {
  const [selectedTab, setSelectedTab] = useState('module');
  const { toast } = useToast();
  
  const startFullMockExam = () => {
    toast({
      title: "Mock Exam Scheduled",
      description: "Your full IELTS mock exam has been scheduled. Good luck!",
    });
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">IELTS Practice Center</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Prepare for your IELTS exam with our comprehensive practice modules and full mock tests.
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
                  <CardHeader className="bg-indigo/90 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Headphones className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Listening Practice</CardTitle>
                      <CardDescription className="text-white/80">
                        Improve your listening comprehension skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>30-40 minutes per test</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Multiple choice, fill-in-the-blank, and more</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with authentic IELTS-style audio recordings and answer various question types.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/listening?exam=ielts" className="w-full">
                      <Button className="w-full" variant="outline">Start Listening Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-teal-600 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <BookOpen className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Reading Practice</CardTitle>
                      <CardDescription className="text-white/80">
                        Enhance your reading comprehension
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>60 minutes per test</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Academic and General Training passages</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Read academic passages and answer various question types to improve your comprehension.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/reading?exam=ielts" className="w-full">
                      <Button className="w-full" variant="outline">Start Reading Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-coral text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Edit className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Writing Practice</CardTitle>
                      <CardDescription className="text-white/80">
                        Improve your written English
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>60 minutes per test</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Task 1 and Task 2 practice</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice writing essays, reports, letters, and more with detailed feedback.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/writing?exam=ielts" className="w-full">
                      <Button className="w-full" variant="outline">Start Writing Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-indigo-800 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <MessageSquare className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Speaking Practice</CardTitle>
                      <CardDescription className="text-white/80">
                        Develop your speaking skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>11-14 minutes per test</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Parts 1, 2, and 3 with recording</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with simulated interview questions and record your responses.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/speaking?exam=ielts" className="w-full">
                      <Button className="w-full" variant="outline">Start Speaking Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="mock" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Full IELTS Mock Test</CardTitle>
                  <CardDescription>
                    Take a complete mock IELTS test under timed conditions to simulate the real exam experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-6 space-y-4">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-500" /> 
                      Complete IELTS Experience
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Listening (30 min)</p>
                          <p className="text-sm text-gray-500">4 sections, 40 questions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Reading (60 min)</p>
                          <p className="text-sm text-gray-500">3 passages, 40 questions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Writing (60 min)</p>
                          <p className="text-sm text-gray-500">Task 1 and Task 2</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Speaking (11-14 min)</p>
                          <p className="text-sm text-gray-500">3 parts interview</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-5 w-5 text-indigo" />
                        <h4 className="font-medium">Take Your Mock Test</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Set aside approximately 3 hours to complete all sections of the test. You can take breaks between sections.
                      </p>
                      <Link to="/practice/mock-test?exam=ielts">
                        <Button className="w-full bg-indigo hover:bg-indigo/90" onClick={startFullMockExam}>
                          Start Full Mock Test
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Academic Test</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          For university admission and professional registration.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Link to="/practice/mock-test?type=academic&exam=ielts">
                          <Button variant="outline" className="w-full">Start Academic Mock</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">General Training Test</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          For work, migration, or training in an English-speaking environment.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Link to="/practice/mock-test?type=general&exam=ielts">
                          <Button variant="outline" className="w-full">Start General Mock</Button>
                        </Link>
                      </CardFooter>
                    </Card>
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

export default IeltsPracticePage;
