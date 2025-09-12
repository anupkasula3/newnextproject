
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ReadingHeader from '@/components/practice/reading/ReadingHeader';
import { ReadingInstructions } from '@/components/practice/reading/ReadingInstructions';
import { Clock, Save, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GreAnalyticalPractice = () => {
  const [essay, setEssay] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = () => {
    toast({
      title: "Essay Submitted",
      description: "Your analytical writing response has been submitted for evaluation.",
    });
  };
  
  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your essay draft has been saved.",
    });
  };
  
  const handleStart = () => {
    // Handle starting the practice
    console.log("Starting analytical writing practice");
  };
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <ReadingHeader 
          examType="gre"
          section="analytical"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          <div className="md:col-span-7 space-y-6">
            <Card className="bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Analyze an Issue</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                    <p className="italic">
                      "The increasing prevalence of automation in various industries will ultimately lead to economic 
                      inequality and widespread unemployment, unless governments implement strong regulatory measures."
                    </p>
                  </div>
                  
                  <p className="text-sm font-medium">
                    Write a response in which you discuss the extent to which you agree or disagree with the statement. 
                    In developing and supporting your position, consider ways in which the statement might or might not 
                    hold true and explain how these considerations shape your position.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="font-medium">Your Response:</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>30:00 minutes</span>
                  </div>
                </div>
                
                <Textarea
                  placeholder="Type your essay here..."
                  className="min-h-[300px] resize-y mb-4"
                  value={essay}
                  onChange={(e) => setEssay(e.target.value)}
                />
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleSaveDraft}>
                    <Save className="h-4 w-4 mr-2" /> Save Draft
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
                    <Send className="h-4 w-4 mr-2" /> Submit Essay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-5">
            <Tabs defaultValue="instructions">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="tips">Writing Tips</TabsTrigger>
              </TabsList>
              <TabsContent value="instructions">
                <ReadingInstructions 
                  examType="gre"
                  onStart={handleStart}
                />
              </TabsContent>
              <TabsContent value="tips">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Tips for GRE Analytical Writing</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Understand the task and address all parts of the prompt</li>
                      <li>• Take a clear position with specific examples</li>
                      <li>• Organize your response with a clear introduction, body, and conclusion</li>
                      <li>• Consider alternative perspectives to strengthen your argument</li>
                      <li>• Use varied sentence structure and vocabulary</li>
                      <li>• Proofread your essay for grammar and spelling errors</li>
                      <li>• Manage your time effectively (30 minutes per essay)</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GreAnalyticalPractice;
