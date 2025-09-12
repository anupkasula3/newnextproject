import React from 'react';
import Layout from '@/components/Layout';
import { ReadingQuestions } from '@/components/practice/reading/ReadingQuestions';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReadingHeader from '@/components/practice/reading/ReadingHeader';
import { ReadingInstructions } from '@/components/practice/reading/ReadingInstructions';

const GreVerbalPractice = () => {
  const handleStart = () => {
    // Handle starting the practice
    console.log("Starting verbal practice");
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <ReadingHeader 
          examType="gre"
          section="verbal"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          <div className="md:col-span-7 space-y-6">
            <Card className="bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Reading Passage</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    The concept of biophilic design has gained increasing prominence in urban planning and architecture. 
                    This approach, which integrates natural elements and experiences into the built environment, 
                    stems from the biophilia hypothesis—the idea that humans possess an innate tendency to seek connections 
                    with nature and other forms of life. Urban planners and architects have begun to incorporate biophilic 
                    elements such as green walls, interior gardens, natural lighting, and water features into their designs, 
                    recognizing that these elements can positively impact human health and well-being.
                  </p>
                  
                  <p>
                    Research indicates that exposure to biophilic elements in urban spaces can reduce stress, 
                    improve cognitive function, and enhance mood. In one study, office workers in environments 
                    with natural elements reported a 15% higher level of well-being and demonstrated a 6% increase 
                    in productivity compared to those in conventional office settings. Similarly, hospital patients 
                    with views of nature from their windows have shown faster recovery times than those facing brick walls.
                  </p>
                  
                  <p>
                    Contemporary urban development increasingly challenges the traditional segregation of various 
                    urban functions. Mixed-use developments, which combine residential, commercial, and sometimes 
                    industrial spaces within a single project, have gained popularity as a sustainable approach to 
                    urban planning. By integrating diverse functions, these developments can reduce transportation 
                    needs, create vibrant communities with round-the-clock activity, and optimize land use in densely populated areas.
                  </p>
                  
                  <p>
                    However, implementing biophilic design and mixed-use development faces challenges. Economic constraints, 
                    regulatory hurdles, and established planning paradigms can impede adoption. Additionally, there remains 
                    the question of whether these approaches can be equitably implemented across diverse socioeconomic contexts, 
                    or if they will primarily benefit affluent urban areas.
                  </p>
                  
                  <p>
                    Despite these challenges, the trajectory of urban design increasingly recognizes the importance 
                    of creating environments that support human health while efficiently addressing spatial constraints. 
                    As cities continue to grow, the integration of nature and diverse functionality into urban development 
                    represents not merely an aesthetic preference but a critical consideration for sustainable and human-centered urban spaces.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <ReadingQuestions examType="gre" section="verbal" />
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
                  <div className="text-4xl font-bold mb-2">30:00</div>
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

export default GreVerbalPractice;
