import React, { useState, useEffect, useCallback } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, Edit, HelpCircle, BookOpen, BarChart2, Download, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/Layout';
import { writingTaskData } from "@/data/writingTaskData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { AIWritingAssistant } from '@/components/practice/writing/AIWritingAssistant';

const WritingPractice: React.FC = () => {
  const { toast } = useToast();
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [essayText, setEssayText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{
    taskAchievement: number;
    coherenceAndCohesion: number;
    lexicalResource: number;
    grammaticalRangeAndAccuracy: number;
    overallBand: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    aiSuggestions: string[];
  } | null>(null);

  const countWords = useCallback((text: string): number => {
    if (!text || text.trim() === '') {
      return 0;
    }
    
    const wordsArray = text.trim().split(/\s+/).filter(word => word.length > 0);
    return wordsArray.length;
  }, []);

  const handleStartTask = (taskId: string, category: 'academic' | 'essay') => {
    setActiveTask(taskId);
    setEssayText('');
    setWordCount(0);
    setSubmitted(false);
    setFeedback(null);
    
    const task = writingTaskData[category].find(task => task.id === taskId);
    if (task) {
      setTimeRemaining(task.timeLimit * 60);
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            toast({
              title: "Time's up!",
              description: "Your time for this task has ended. Please submit your essay now.",
              variant: "destructive",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setEssayText(text);
    
    const count = countWords(text);
    setWordCount(count);
    
    console.log("Text changed:", text);
    console.log("Words array:", text.trim().split(/\s+/).filter(word => word.length > 0));
    console.log("Words counted:", count);
  };

  const evaluateEssay = (text: string, taskType: 'academic' | 'essay') => {
    const minWordCount = taskType === 'academic' ? 150 : 250;
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const paragraphs = text.split(/\n\n+/).filter(para => para.trim().length > 0);
    
    const hasIntroduction = paragraphs.length > 0;
    const hasConclusion = paragraphs.length > 2;
    const averageSentenceLength = wordCount / Math.max(sentences.length, 1);
    const averageParagraphLength = wordCount / Math.max(paragraphs.length, 1);
    
    let taskAchievement = wordCount >= minWordCount ? 6 : 5;
    taskAchievement += hasIntroduction && hasConclusion ? 1 : 0;
    
    let coherenceAndCohesion = 5;
    coherenceAndCohesion += paragraphs.length >= 4 ? 1 : 0;
    coherenceAndCohesion += averageParagraphLength > 40 && averageParagraphLength < 100 ? 1 : 0;
    
    let lexicalResource = 5.5;
    lexicalResource += text.includes('furthermore') || text.includes('moreover') || text.includes('consequently') ? 0.5 : 0;
    lexicalResource += text.includes('therefore') || text.includes('thus') || text.includes('hence') ? 0.5 : 0;
    
    let grammaticalRangeAndAccuracy = 5.5;
    grammaticalRangeAndAccuracy += averageSentenceLength > 10 && averageSentenceLength < 20 ? 0.5 : 0;
    grammaticalRangeAndAccuracy += sentences.length > 15 ? 0.5 : 0;
    
    taskAchievement = Math.min(taskAchievement, 9);
    coherenceAndCohesion = Math.min(coherenceAndCohesion, 9);
    lexicalResource = Math.min(lexicalResource, 9);
    grammaticalRangeAndAccuracy = Math.min(grammaticalRangeAndAccuracy, 9);
    
    const overallBand = Math.round((taskAchievement + coherenceAndCohesion + lexicalResource + grammaticalRangeAndAccuracy) / 4 * 2) / 2;
    
    const strengths = [];
    const weaknesses = [];
    const suggestions = [];
    
    if (wordCount >= minWordCount) {
      strengths.push("You've written a sufficient number of words.");
    }
    if (hasIntroduction && hasConclusion) {
      strengths.push("Your essay has a clear structure with introduction and conclusion.");
    }
    if (paragraphs.length >= 4) {
      strengths.push("Good paragraph organization.");
    }
    
    if (wordCount < minWordCount) {
      weaknesses.push(`Your essay is below the minimum word count of ${minWordCount} words.`);
    }
    if (!hasIntroduction || !hasConclusion) {
      weaknesses.push("Your essay lacks a clear introduction or conclusion.");
    }
    if (paragraphs.length < 3) {
      weaknesses.push("Your essay needs more paragraphs for better organization.");
    }
    if (averageSentenceLength > 25) {
      weaknesses.push("Your sentences are too long on average.");
    }
    
    suggestions.push(`Aim for at least ${minWordCount} words to fully address the task.`);
    suggestions.push("Include a clear introduction that presents the main idea and a conclusion that summarizes your points.");
    suggestions.push("Organize your ideas into more paragraphs. Each paragraph should contain a single main idea.");
    suggestions.push("Try to vary your sentence length. Mix shorter sentences with longer ones for better readability.");
    suggestions.push("Use more linking phrases (e.g., 'furthermore', 'consequently', 'in addition') to improve cohesion.");
    suggestions.push("Incorporate a wider range of vocabulary related to the topic.");
    
    return {
      taskAchievement,
      coherenceAndCohesion,
      lexicalResource,
      grammaticalRangeAndAccuracy,
      overallBand,
      strengths,
      weaknesses,
      suggestions,
      aiSuggestions: []
    };
  };

  const handleSubmit = async () => {
    let taskCategory: 'academic' | 'essay' = 'academic';
    const academicTask = writingTaskData.academic.find(task => task.id === activeTask);
    const essayTask = writingTaskData.essay.find(task => task.id === activeTask);
    
    if (essayTask) {
      taskCategory = 'essay';
    }
    
    const essayFeedback = evaluateEssay(essayText, taskCategory);
    setFeedback(essayFeedback);
    setSubmitted(true);
    
    toast({
      title: "Essay submitted successfully!",
      description: `Your overall band score: ${essayFeedback.overallBand.toFixed(1)}`,
      variant: "default",
    });
  };

  const handleAIFeedbackReceived = (feedbackArray: string[]) => {
    setFeedback(prev => {
      if (prev) {
        return {
          ...prev,
          aiSuggestions: feedbackArray,
        };
      }
      return prev;
    });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const getActiveTask = () => {
    if (!activeTask) return null;
    
    let task = writingTaskData.academic.find(task => task.id === activeTask);
    if (!task) {
      task = writingTaskData.essay.find(task => task.id === activeTask);
    }
    
    return task;
  };

  const currentTask = getActiveTask();

  const renderTaskCards = (tasks: any[], category: 'academic' | 'essay') => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">{task.title}</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                {task.category}
              </span>
            </div>
            
            <div className="relative h-40 mb-4 rounded-md overflow-hidden">
              <img 
                src={task.imageUrl} 
                alt={task.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1456513080867-f24f142c9fa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1673&q=80";
                }}
              />
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {task.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{task.timeLimit} mins</span>
              </div>
              <div className="flex items-center">
                <Edit className="w-4 h-4 mr-1" />
                <span>Min {task.minWords} words</span>
              </div>
            </div>
            
            <Button 
              onClick={() => handleStartTask(task.id, category)} 
              className="w-full"
            >
              Start Practice
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const renderFeedback = () => {
    if (!feedback) return null;
    
    const { 
      taskAchievement, 
      coherenceAndCohesion, 
      lexicalResource, 
      grammaticalRangeAndAccuracy, 
      overallBand,
      strengths,
      weaknesses,
      suggestions,
      aiSuggestions
    } = feedback;
    
    const getBandDescription = (score: number) => {
      if (score >= 8) return "Very Good to Expert";
      if (score >= 7) return "Good";
      if (score >= 6) return "Competent";
      if (score >= 5) return "Modest";
      if (score >= 4) return "Limited";
      return "Basic to Very Limited";
    };
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">IELTS Writing Assessment</h3>
          <Badge variant="outline" className="text-lg px-3 py-1">
            Overall: {overallBand.toFixed(1)}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Task Achievement</span>
                <span className="text-sm font-medium">{taskAchievement.toFixed(1)} - {getBandDescription(taskAchievement)}</span>
              </div>
              <Progress value={(taskAchievement / 9) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Coherence & Cohesion</span>
                <span className="text-sm font-medium">{coherenceAndCohesion.toFixed(1)} - {getBandDescription(coherenceAndCohesion)}</span>
              </div>
              <Progress value={(coherenceAndCohesion / 9) * 100} className="h-2" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Lexical Resource</span>
                <span className="text-sm font-medium">{lexicalResource.toFixed(1)} - {getBandDescription(lexicalResource)}</span>
              </div>
              <Progress value={(lexicalResource / 9) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Grammatical Range & Accuracy</span>
                <span className="text-sm font-medium">{grammaticalRangeAndAccuracy.toFixed(1)} - {getBandDescription(grammaticalRangeAndAccuracy)}</span>
              </div>
              <Progress value={(grammaticalRangeAndAccuracy / 9) * 100} className="h-2" />
            </div>
          </div>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="strengths">
            <AccordionTrigger className="text-green-600 dark:text-green-400 font-medium">
              Strengths
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 pl-2">
                {strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="weaknesses">
            <AccordionTrigger className="text-amber-600 dark:text-amber-400 font-medium">
              Areas for Improvement
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 pl-2">
                {weaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="suggestions">
            <AccordionTrigger className="text-blue-600 dark:text-blue-400 font-medium">
              Suggestions for Improvement
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 pl-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="ai-feedback">
            <AccordionTrigger className="text-indigo-600 dark:text-indigo-400 font-medium">
              AI Analysis
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                {aiSuggestions.map((suggestion, index) => (
                  <p key={index} className="text-sm">{suggestion}</p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="tips">
            <AccordionTrigger className="text-purple-600 dark:text-purple-400 font-medium">
              IELTS Band Score Criteria
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>IELTS writing is assessed on these four criteria:</p>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li><strong>Task Achievement/Response</strong>: How well you address all parts of the task and develop a position or argument.</li>
                  <li><strong>Coherence and Cohesion</strong>: How well your writing flows, is organized, and uses linking words/phrases.</li>
                  <li><strong>Lexical Resource</strong>: The range and accuracy of your vocabulary.</li>
                  <li><strong>Grammatical Range and Accuracy</strong>: The variety and correctness of your sentence structures.</li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {activeTask && currentTask ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <Button 
                variant="outline" 
                onClick={() => setActiveTask(null)}
                className="gap-2"
              >
                <BookOpen className="w-4 h-4" /> Back to Tasks
              </Button>
              
              <div className="flex items-center space-x-4">
                {timeRemaining !== null && (
                  <div className="flex items-center px-3 py-1 bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-md font-medium">
                    <Clock className="w-4 h-4 mr-2" />
                    {formatTime(timeRemaining)}
                  </div>
                )}
                
                <div className="flex items-center px-3 py-1 bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-md font-medium">
                  <Edit className="w-4 h-4 mr-2" />
                  {wordCount} words
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{currentTask.title}</h2>
              
              <div className="mb-6">
                {currentTask.imageUrl && (
                  <div className="relative h-64 mb-4 rounded-md overflow-hidden">
                    <img 
                      src={currentTask.imageUrl} 
                      alt={currentTask.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1456513080867-f24f142c9fa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1673&q=80";
                      }}
                    />
                  </div>
                )}
                
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-3 text-lg">{currentTask.description}</p>
                  <div className="p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-600 rounded-r-md">
                    <p className="italic">{currentTask.instructions}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <div className="text-sm font-medium">
                    Word Count: {wordCount} / {currentTask.minWords}+
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Min. {currentTask.minWords} words recommended
                  </div>
                </div>
                <Progress value={(wordCount / (currentTask.minWords || 1)) * 100} className="h-2" />
              </div>
              
              <Textarea 
                value={essayText}
                onChange={handleTextChange}
                placeholder="Write your response here..."
                className="min-h-[300px] mb-4 text-base"
                disabled={submitted}
              />
              
              <div className="flex justify-between">
                <Button variant="outline" className="gap-2">
                  <HelpCircle className="w-4 h-4" /> Writing Tips
                </Button>
                
                <div className="space-x-2">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Save Draft
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={wordCount < (currentTask.minWords || 1) || submitted}
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" /> Submit
                  </Button>
                </div>
              </div>
              
              {submitted && (
                <div className="mt-4">
                  <AIWritingAssistant 
                    essayText={essayText}
                    prompt={currentTask.instructions}
                    onFeedbackReceived={handleAIFeedbackReceived}
                  />
                </div>
              )}
            </div>
            
            {submitted && !feedback && (
              <div className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg p-6 flex items-start">
                <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Successfully Submitted!</h3>
                  <p className="mt-1">
                    Thank you for submitting your essay. In a full application, this would be evaluated and feedback would be provided.
                  </p>
                  <Button 
                    onClick={() => setActiveTask(null)} 
                    variant="link" 
                    className="mt-2 p-0 h-auto text-green-700 dark:text-green-300"
                  >
                    Return to task selection
                  </Button>
                </div>
              </div>
            )}
            
            {submitted && feedback && renderFeedback()}
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">IELTS Writing Practice</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Master your writing skills with our interactive tasks designed to simulate the actual IELTS exam. 
                Choose from Task 1 (Academic) or Task 2 (Essay) to begin your practice.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <Tabs defaultValue="academic" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="academic" className="text-base py-3">
                    Task 1: Academic
                  </TabsTrigger>
                  <TabsTrigger value="essay" className="text-base py-3">
                    Task 2: Essay
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="academic" className="px-1">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-800 dark:text-indigo-200">
                        <BarChart2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">Academic Task</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Describe visual information in 20 minutes (150+ words)
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      In Task 1 of the Academic Writing module, you'll be presented with a graph, table, chart, or diagram and asked to describe the information in your own words. You should spend about 20 minutes on this task and write at least 150 words.
                    </p>
                  </div>
                  
                  {renderTaskCards(writingTaskData.academic, 'academic')}
                </TabsContent>
                
                <TabsContent value="essay" className="px-1">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-800 dark:text-teal-200">
                        <Edit className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">Essay Task</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Write an essay in 40 minutes (250+ words)
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      In Task 2 of the Writing module, you'll be asked to write an essay in response to a point of view, argument, or problem. You should spend about 40 minutes on this task and write at least 250 words. This task contributes twice as much as Task 1 to your Writing score.
                    </p>
                  </div>
                  
                  {renderTaskCards(writingTaskData.essay, 'essay')}
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Writing Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg text-indigo-700 dark:text-indigo-300">Task 1: Academic</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 pl-2">
                    <li>Identify the main trends or significant features in the visual</li>
                    <li>Use appropriate language to describe changes (increase, decrease, fluctuate)</li>
                    <li>Include an overview paragraph summarizing the key points</li>
                    <li>Group related information logically into paragraphs</li>
                    <li>Avoid giving reasons or your own opinions</li>
                    <li>Use a variety of sentence structures and vocabulary</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg text-teal-700 dark:text-teal-300">Task 2: Essay</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 pl-2">
                    <li>Address all parts of the task in your response</li>
                    <li>Include an introduction, body paragraphs, and conclusion</li>
                    <li>Support your main points with reasons and examples</li>
                    <li>Organize your ideas clearly with logical progression</li>
                    <li>Use appropriate linking words to connect ideas</li>
                    <li>Check your writing for grammar, vocabulary, and spelling errors</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default WritingPractice;
