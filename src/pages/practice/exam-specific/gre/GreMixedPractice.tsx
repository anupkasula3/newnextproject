
import React from 'react';
import Layout from '@/components/Layout';
import { ReadingQuestions } from '@/components/practice/reading/ReadingQuestions';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReadingHeader from '@/components/practice/reading/ReadingHeader';
import { ReadingInstructions } from '@/components/practice/reading/ReadingInstructions';
import { BrainCircuit, BookOpen, Calculator } from 'lucide-react';

const GreMixedPractice = () => {
  const handleStart = () => {
    // Handle starting the practice
    console.log("Starting mixed practice");
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <ReadingHeader 
          examType="gre"
          section="mixed"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          <div className="md:col-span-7 space-y-6">
            <Card className="bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-full mr-3">
                    <BrainCircuit className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-xl font-semibold">Integrated GRE Practice</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This mixed practice section includes questions from all GRE test areas to help you prepare 
                      for the full exam experience. You'll encounter verbal reasoning, quantitative reasoning, 
                      and analytical writing tasks in sequence, simulating the varied demands of the actual test.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                      <span className="text-sm">Verbal Reasoning</span>
                    </div>
                    
                    <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                      <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <span className="text-sm">Quantitative Reasoning</span>
                    </div>
                    
                    <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                      <BrainCircuit className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                      <span className="text-sm">Analytical Writing</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Section 1: Verbal and Quantitative Questions</h3>
                <ReadingQuestions examType="gre" section="mixed" />
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-5">
            <Tabs defaultValue="instructions">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="timer">Timer</TabsTrigger>
              </TabsList>
              <TabsContent value="instructions">
                <ReadingInstructions 
                  examType="gre"
                  onStart={handleStart}
                />
              </TabsContent>
              <TabsContent value="timer" className="flex justify-center py-10">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">60:00</div>
                  <p className="text-gray-500 dark:text-gray-400">Time remaining</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GreMixedPractice;
