
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ListeningTest, TestType, DifficultyLevel } from '@/components/practice/listening/ListeningTest';
import { ListeningInstructions } from '@/components/practice/listening/ListeningInstructions';
import ListeningHeader from '@/components/practice/listening/ListeningHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Headphones, BookOpen, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from '@/components/ui/progress';

const testTypes = [
  {
    id: 'general' as TestType,
    title: 'General Training',
    description: 'For those taking IELTS for migration or work purposes',
    progress: 70
  },
  {
    id: 'academic' as TestType,
    title: 'Academic',
    description: 'For those taking IELTS for higher education or professional registration',
    progress: 85
  },
  {
    id: 'practice' as TestType,
    title: 'Mini Practice',
    description: 'A shorter practice session with immediate feedback',
    progress: 100
  }
];

const difficultyLevels = [
  { value: 'beginner' as DifficultyLevel, label: 'Beginner (Band 4-5)' },
  { value: 'intermediate' as DifficultyLevel, label: 'Intermediate (Band 5.5-6.5)' },
  { value: 'advanced' as DifficultyLevel, label: 'Advanced (Band 7+)' }
];

const ListeningPractice = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState<TestType>('academic');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('intermediate');
  const { toast } = useToast();
  
  const handleStartTest = () => {
    setTestStarted(true);
    toast({
      title: "Test Started",
      description: `Starting ${selectedTestType} test at ${selectedDifficulty} difficulty`,
    });
  };
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <ListeningHeader />
        
        {/* Add link to complete listening page */}
        <div className="flex justify-end mb-4">
          <Link to="/practice/listening/complete">
            <Button variant="outline" className="flex items-center">
              View All Listening Tests
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {!testStarted ? (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Listening Test</CardTitle>
                <CardDescription>
                  Choose the test type and difficulty level that matches your goals
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {testTypes.map((test) => (
                    <Card 
                      key={test.id} 
                      className={`cursor-pointer transition-all border-2 hover:shadow-md ${
                        selectedTestType === test.id 
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" 
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedTestType(test.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{test.title}</CardTitle>
                          <Headphones className={`h-5 w-5 ${
                            selectedTestType === test.id ? "text-indigo-500" : "text-gray-400"
                          }`} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 mb-2">{test.description}</p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Success Rate</span>
                            <span>{test.progress}%</span>
                          </div>
                          <Progress value={test.progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Difficulty Level
                    </label>
                    <Select 
                      value={selectedDifficulty} 
                      onValueChange={(value: DifficultyLevel) => setSelectedDifficulty(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficultyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg border border-muted-foreground/20">
                    <div className="flex gap-3">
                      <BookOpen className="h-5 w-5 text-indigo-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">What to expect</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          The IELTS Listening test takes approximately 30 minutes. You will hear four recordings and answer questions for each. The test format is the same for both Academic and General Training versions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Link to="/practice/listening/complete">
                  <Button variant="outline">
                    Browse All Tests
                  </Button>
                </Link>
                <Button 
                  onClick={handleStartTest} 
                  className="bg-indigo hover:bg-indigo-600"
                >
                  Start Listening Test
                </Button>
              </CardFooter>
            </Card>
            
            <ListeningInstructions onStart={handleStartTest} />
          </div>
        ) : (
          <ListeningTest testType={selectedTestType} difficulty={selectedDifficulty} />
        )}
      </div>
    </Layout>
  );
};

export default ListeningPractice;
