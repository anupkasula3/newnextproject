import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import FullMockExam from '@/components/practice/FullMockExam';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Calendar, Clock, ArrowUp, ArrowDown, Sparkles, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from "@/hooks/use-toast";
import { getRecommendationForBand, getSectionSpecificRecommendation } from '@/data/mockTestData';
import { useIsMobile } from '@/hooks/use-mobile';

type SectionScore = {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}

interface TestHistory {
  id: string;
  date: string;
  overallBand: number;
  sectionScores: SectionScore;
}

interface MockTestPageProps {
  examType?: string;
}

const MockTestPage: React.FC<MockTestPageProps> = ({ examType }) => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState<SectionScore>({
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0
  });
  const [testHistory, setTestHistory] = useState<TestHistory[]>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const fetchTestHistory = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        const mockHistory: TestHistory[] = [
          {
            id: '1',
            date: '2023-09-15',
            overallBand: 6.5,
            sectionScores: {
              listening: 6.0,
              reading: 7.0,
              writing: 6.5,
              speaking: 6.5
            }
          },
          {
            id: '2',
            date: '2023-10-22',
            overallBand: 7.0,
            sectionScores: {
              listening: 7.5,
              reading: 7.0,
              writing: 6.5,
              speaking: 7.0
            }
          }
        ];
        
        setTestHistory(mockHistory);
      } catch (error) {
        console.error('Error fetching test history:', error);
        toast({
          title: "Error",
          description: "Failed to load test history. Please try again later.",
          variant: "destructive",
        });
      }
    };
    
    if (isCompleted) {
      fetchTestHistory();
    }
  }, [isCompleted, toast]);
  
  const calculateOverallBand = (sectionScores: SectionScore): number => {
    const { listening, reading, writing, speaking } = sectionScores;
    const average = (listening + reading + writing + speaking) / 4;
    return Math.round(average * 2) / 2; // Round to nearest 0.5
  };
  
  const handleMockTestComplete = (sectionScores: SectionScore) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setScores(sectionScores);
      setIsCompleted(true);
      setIsLoading(false);
      
      const newTest: TestHistory = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        overallBand: calculateOverallBand(sectionScores),
        sectionScores
      };
      
      setTestHistory(prev => [newTest, ...prev]);
      
      toast({
        title: "Mock Test Completed",
        description: "Your test has been scored and saved. View your results below.",
      });
    }, 2000);
  };
  
  const handleRetakeTest = () => {
    setIsCompleted(false);
    setScores({
      listening: 0,
      reading: 0,
      writing: 0,
      speaking: 0
    });
  };
  
  const handleBackToPractice = () => {
    navigate('/practice');
  };
  
  const getBandColor = (band: number): string => {
    if (band >= 8) return "text-green-600 dark:text-green-400";
    if (band >= 7) return "text-blue-600 dark:text-blue-400";
    if (band >= 6) return "text-indigo dark:text-indigo-400";
    if (band >= 5) return "text-orange-500 dark:text-orange-400";
    return "text-red-500 dark:text-red-400";
  };
  
  const getProgressColor = (band: number): string => {
    if (band >= 8) return "bg-green-500";
    if (band >= 7) return "bg-blue-500";
    if (band >= 6) return "bg-indigo";
    if (band >= 5) return "bg-orange-500";
    return "bg-red-500";
  };
  
  const overallBand = calculateOverallBand(scores);
  
  const getPreviousScore = (section: keyof SectionScore): { score: number | null, change: number } => {
    if (testHistory.length < 2) return { score: null, change: 0 };
    
    const current = testHistory[0].sectionScores[section];
    const previous = testHistory[1].sectionScores[section];
    
    return {
      score: previous,
      change: Number((current - previous).toFixed(1))
    };
  };
  
  const getPageTitle = (): string => {
    if (examType) {
      if (examType === 'sat-math') return 'SAT Math Practice Test';
      if (examType === 'sat-english') return 'SAT English Practice Test';
      return `${examType.toUpperCase()} Mock Test`;
    }
    return 'IELTS Mock Test';
  };
  
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {!isCompleted ? (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold">{getPageTitle()}</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Take a comprehensive {examType ? examType.toUpperCase() : 'IELTS'} practice test under timed conditions.
                </p>
              </div>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-t-indigo border-gray-200 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Scoring your test...</p>
                </div>
              ) : (
                <FullMockExam onComplete={handleMockTestComplete} examType={examType} />
              )}
            </>
          ) : (
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold tracking-tight">Your Mock Test Results</h1>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">
                      {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Review your performance across all sections of the IELTS exam.
                </p>
              </div>
              
              {/* Overall Score Card */}
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-indigo p-3">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Overall Band Score</h2>
                      <div className="mt-2 text-5xl font-bold text-indigo">
                        {overallBand.toFixed(1)}
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {overallBand >= 8 ? "Expert user" : 
                         overallBand >= 7 ? "Very good user" : 
                         overallBand >= 6 ? "Competent user" : 
                         overallBand >= 5 ? "Modest user" : 
                         "Limited user"}
                      </p>
                      
                      {testHistory.length > 1 && (
                        <div className="mt-3 flex justify-center items-center">
                          {testHistory[0].overallBand > testHistory[1].overallBand ? (
                            <div className="flex items-center text-green-500">
                              <ArrowUp className="h-4 w-4 mr-1" />
                              <span>+{(testHistory[0].overallBand - testHistory[1].overallBand).toFixed(1)} from last test</span>
                            </div>
                          ) : testHistory[0].overallBand < testHistory[1].overallBand ? (
                            <div className="flex items-center text-red-500">
                              <ArrowDown className="h-4 w-4 mr-1" />
                              <span>-{(testHistory[1].overallBand - testHistory[0].overallBand).toFixed(1)} from last test</span>
                            </div>
                          ) : (
                            <span className="text-gray-500">Same as last test</span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="w-full max-w-md mt-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-medium mb-2 flex items-center">
                          <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
                          Recommendation:
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {getRecommendationForBand(overallBand)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Individual Section Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(scores).map(([section, score]) => {
                  const previousScore = getPreviousScore(section as keyof SectionScore);
                  
                  return (
                    <Card key={section} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex justify-between items-center">
                          <span className="capitalize">{section}</span>
                          <Badge className={getBandColor(score)}>
                            Band {score.toFixed(1)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Progress 
                              value={(score / 9) * 100} 
                              className={`h-2 flex-grow ${getProgressColor(score)}`} 
                            />
                            
                            {previousScore.score !== null && (
                              <div className={`text-sm font-medium ${
                                previousScore.change > 0 ? 'text-green-500' : 
                                previousScore.change < 0 ? 'text-red-500' : 
                                'text-gray-500'
                              }`}>
                                {previousScore.change > 0 ? '+' : ''}
                                {previousScore.change}
                              </div>
                            )}
                          </div>
                          
                          <div className="text-sm">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Strengths:</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                              {score >= 7 
                                ? `You demonstrate strong ${section} skills with only occasional inaccuracies.` 
                                : `You show some good ${section} ability but with noticeable limitations.`}
                            </p>
                            
                            <div className="flex justify-between mb-1 mt-3">
                              <span className="font-medium">Recommendation:</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                              {getSectionSpecificRecommendation(section as 'listening' | 'reading' | 'writing' | 'speaking', score)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {/* Test History */}
              {testHistory.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Test History
                    </CardTitle>
                    <CardDescription>
                      Your previous mock test results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="text-left p-2">Date</th>
                            <th className="text-center p-2">Listening</th>
                            <th className="text-center p-2">Reading</th>
                            <th className="text-center p-2">Writing</th>
                            <th className="text-center p-2">Speaking</th>
                            <th className="text-center p-2">Overall</th>
                          </tr>
                        </thead>
                        <tbody>
                          {testHistory.map((test, index) => (
                            <tr key={test.id} className={index === 0 ? "font-medium bg-gray-50 dark:bg-gray-800" : ""}>
                              <td className="p-2">
                                {new Date(test.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                                {index === 0 && (
                                  <span className="ml-2 text-xs bg-indigo/10 text-indigo px-2 py-0.5 rounded">
                                    Latest
                                  </span>
                                )}
                              </td>
                              <td className="text-center p-2">{test.sectionScores.listening.toFixed(1)}</td>
                              <td className="text-center p-2">{test.sectionScores.reading.toFixed(1)}</td>
                              <td className="text-center p-2">{test.sectionScores.writing.toFixed(1)}</td>
                              <td className="text-center p-2">{test.sectionScores.speaking.toFixed(1)}</td>
                              <td className={`text-center p-2 font-medium ${getBandColor(test.overallBand)}`}>
                                {test.overallBand.toFixed(1)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    Next Steps
                  </CardTitle>
                  <CardDescription>
                    Continue your IELTS preparation journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Practice Weak Areas</h4>
                      <p className="text-sm text-gray-500">
                        Focus on improving your lowest-scoring sections with targeted practice.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Review Test Answers</h4>
                      <p className="text-sm text-gray-500">
                        Go through your responses to understand where you made mistakes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Take Another Mock Test</h4>
                      <p className="text-sm text-gray-500">
                        Regular practice tests will help track your progress over time.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className={`${isMobile ? 'flex-col space-y-3' : 'space-x-4'}`}>
                  <Button 
                    variant="default" 
                    onClick={handleRetakeTest}
                    className={`${isMobile ? 'w-full' : 'flex-1'} bg-indigo hover:bg-indigo/90`}
                  >
                    Retake Mock Test
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleBackToPractice}
                    className={`${isMobile ? 'w-full' : 'flex-1'}`}
                  >
                    Back to Practice
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MockTestPage;
