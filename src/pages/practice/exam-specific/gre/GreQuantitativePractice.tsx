import React from 'react';
import Layout from '@/components/Layout';
import { ReadingQuestions } from '@/components/practice/reading/ReadingQuestions';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReadingHeader from '@/components/practice/reading/ReadingHeader';
import { ReadingInstructions } from '@/components/practice/reading/ReadingInstructions';
import { Calculator } from 'lucide-react';

const GreQuantitativePractice = () => {
  const handleStart = () => {
    // Handle starting the practice
    console.log("Starting quantitative practice");
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <ReadingHeader 
          examType="gre"
          section="quantitative"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          <div className="md:col-span-7 space-y-6">
            <Card className="bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Quantitative Problems</h2>
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                    <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                    <p className="font-medium mb-2">Problem Set Instructions:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This section measures your ability to understand, interpret and analyze quantitative information, 
                      solve problems using mathematical models, and apply basic mathematical skills and elementary mathematical concepts of arithmetic, 
                      algebra, geometry, probability and statistics.
                    </p>
                  </div>
                  
                  <div>
                    <p className="mb-4">
                      For each question, select the best answer from the options provided. Some questions may require 
                      calculations and basic mathematical operations. You may use scratch paper for calculations.
                    </p>
                    
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-6">
                      Note: The GRE General Test allows the use of calculators in the Quantitative Reasoning section. 
                      You can use the basic calculator provided by clicking the calculator icon above.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <ReadingQuestions examType="gre" section="quantitative" />
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
                  <div className="text-4xl font-bold mb-2">35:00</div>
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

export default GreQuantitativePractice;
