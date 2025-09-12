
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { speakingTasksData } from '@/data/speakingTasksData';
import { SpeakingTask, SpeakingCategory } from '@/types/speaking';
import { Mic, List, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SpeakingCategorySelectorProps {
  onSelectTask: (task: SpeakingTask) => void;
  examType?: string;
}

export const SpeakingCategorySelector: React.FC<SpeakingCategorySelectorProps> = ({ onSelectTask, examType = 'ielts' }) => {
  // Get unique categories
  const categories = Array.from(new Set(speakingTasksData.map(task => task.category))) as SpeakingCategory[];
  
  // Helper function to get human-readable category names
  const getCategoryTitle = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  // Helper function to get total time for a task
  const getTaskTotalTime = (task: SpeakingTask): number => {
    return task.questions.reduce((total, q) => {
      let questionTime = q.duration || 0;
      if (q.preparation) questionTime += q.preparation;
      return total + questionTime;
    }, 0);
  };
  
  // Format seconds to minutes and seconds
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m${secs > 0 ? ` ${secs}s` : ''}`;
  };
  
  const getExamSpecificTips = () => {
    switch(examType.toLowerCase()) {
      case 'toefl':
        return [
          {
            title: "Independent Speaking Task (45 seconds)",
            color: "green",
            description: "Express your opinion on a familiar topic. Focus on clear organization with an introduction, body, and conclusion."
          },
          {
            title: "Integrated Reading/Listening/Speaking Task (60 seconds)",
            color: "indigo",
            description: "Summarize information from both a reading passage and a related lecture. Take notes during preparation time."
          },
          {
            title: "Integrated Listening/Speaking Task (60 seconds)",
            color: "purple",
            description: "Summarize information from a lecture or conversation. Focus on key points and supporting details."
          }
        ];
      case 'pte':
        return [
          {
            title: "Read Aloud (30-40 seconds)",
            color: "green",
            description: "Read a text aloud with proper pronunciation and intonation. Practice pacing yourself appropriately."
          },
          {
            title: "Repeat Sentence (15-20 seconds)",
            color: "indigo",
            description: "Listen to and repeat a sentence exactly as you hear it. Focus on pronunciation and intonation."
          },
          {
            title: "Describe Image (40 seconds)",
            color: "purple",
            description: "Describe an image in detail. Mention what the image shows and any relevant details or trends."
          }
        ];
      case 'gre':
      case 'gmat':
        return [
          {
            title: "Analysis of an Issue (30 minutes)",
            color: "green",
            description: "Present your perspective on a topic. Structure your response logically with examples and reasoning."
          },
          {
            title: "Analysis of an Argument (30 minutes)",
            color: "indigo",
            description: "Evaluate the logic of a given argument. Focus on identifying flaws and supporting your critique."
          }
        ];
      default: // IELTS
        return [
          {
            title: "Part 1: Introduction and Interview (4-5 minutes)",
            color: "green",
            description: "Speak confidently about familiar topics like work, study, hometown, and hobbies. Give detailed answers but avoid one-word responses or very long answers."
          },
          {
            title: "Part 2: Individual Long Turn (3-4 minutes)",
            color: "indigo",
            description: "Use your preparation time wisely to make notes. Structure your talk with an introduction, main points, and conclusion. Keep speaking for the full 2 minutes."
          },
          {
            title: "Part 3: Two-way Discussion (4-5 minutes)",
            color: "purple",
            description: "This part explores more abstract ideas related to your Part 2 topic. Develop your answers with examples and explanations. Use a variety of vocabulary and complex sentence structures."
          }
        ];
    }
  };
  
  const getPageTitle = () => {
    switch(examType.toLowerCase()) {
      case 'toefl':
        return "Select TOEFL Speaking Practice Category";
      case 'pte':
        return "Select PTE Speaking Practice Category";
      case 'gre':
        return "Select GRE Speaking Practice Category";
      case 'gmat':
        return "Select GMAT Speaking Practice Category";
      default:
        return "Select IELTS Speaking Practice Category";
    }
  };
  
  const getPageDescription = () => {
    switch(examType.toLowerCase()) {
      case 'toefl':
        return "Choose a topic category to focus your TOEFL speaking practice. Each category contains questions across different tasks.";
      case 'pte':
        return "Choose a topic category to focus your PTE speaking practice. Each category contains different speaking task types.";
      case 'gre':
      case 'gmat':
        return `Choose a topic category to focus your ${examType.toUpperCase()} speaking practice. Each category contains analytical and issue-based tasks.`;
      default:
        return "Choose a topic category to focus your IELTS speaking practice. Each category contains questions across all three parts of the IELTS speaking test.";
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-gray-50 dark:bg-gray-800 p-6">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-xl">{getPageTitle()}</CardTitle>
          <CardDescription>
            {getPageDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {speakingTasksData.map((task) => (
              <Card 
                key={task.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer border"
                onClick={() => onSelectTask(task)}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-md">{task.title}</CardTitle>
                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
                      {getCategoryTitle(task.category)}
                    </Badge>
                  </div>
                  <CardDescription>{task.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2 pb-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <List className="h-4 w-4" />
                    <span>{task.questions.length} questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <Clock className="h-4 w-4" />
                    <span>Approx. {formatTime(getTaskTotalTime(task))}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-2">
                  <Button variant="outline" className="w-full mt-2">
                    <Mic className="h-4 w-4 mr-2" />
                    Start Practice
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Exam-specific Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{examType.toUpperCase()} Speaking Test Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getExamSpecificTips().map((tip, index) => {
              const bgClass = tip.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' :
                             tip.color === 'indigo' ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800' :
                             'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800';
              
              const textClass = tip.color === 'green' ? 'text-green-800 dark:text-green-300' :
                               tip.color === 'indigo' ? 'text-indigo-800 dark:text-indigo-300' :
                               'text-purple-800 dark:text-purple-300';
              
              const descClass = tip.color === 'green' ? 'text-green-700 dark:text-green-400' :
                                tip.color === 'indigo' ? 'text-indigo-700 dark:text-indigo-400' :
                                'text-purple-700 dark:text-purple-400';
              
              return (
                <div key={index} className={`${bgClass} p-4 rounded-md border`}>
                  <h4 className={`font-medium ${textClass}`}>{tip.title}</h4>
                  <p className={`text-sm ${descClass} mt-1`}>
                    {tip.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
