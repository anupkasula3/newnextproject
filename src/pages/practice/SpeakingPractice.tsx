
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import SpeakingHeader from '@/components/practice/speaking/SpeakingHeader';
import { SpeakingInstructions } from '@/components/practice/speaking/SpeakingInstructions';
import { SpeakingTest } from '@/components/practice/speaking/SpeakingTest';
import { SpeakingCategorySelector } from '@/components/practice/speaking/SpeakingCategorySelector';
import { SpeakingTask } from '@/types/speaking';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUserProgress } from '@/services/userProgressService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';

const SpeakingPractice = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SpeakingTask | null>(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [examType, setExamType] = useState('ielts');
  
  const { toast } = useToast();
  const { trackCompletion } = useUserProgress();
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    // Check login status
    const loggedIn = localStorage.getItem('demoUserLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    // Get exam type from URL or localStorage
    const queryParams = new URLSearchParams(location.search);
    const examParam = queryParams.get('exam');
    
    if (examParam) {
      setExamType(examParam.toLowerCase());
      // Also save to localStorage for persistence
      localStorage.setItem('selectedExam', examParam.toLowerCase());
    } else {
      const savedExam = localStorage.getItem('selectedExam');
      if (savedExam) {
        setExamType(savedExam.split('-')[0]);
      }
    }
  }, [location]);
  
  const handleTestFinish = async () => {
    // In a real app, this would fetch the final score from the server
    // For demo purposes, we'll simulate a score
    const simulatedScore = 6 + Math.random() * 3;
    const roundedScore = Math.round(simulatedScore * 2) / 2;
    
    setFinalScore(roundedScore);
    setTestCompleted(true);
    setTestStarted(false);
    
    // Track completion in progress system
    if (isLoggedIn) {
      await trackCompletion('speaking', roundedScore * 10); // Convert to 0-100 scale
    }
    
    toast({
      title: "Test Evaluation Complete",
      description: `Your final speaking score is ${roundedScore}. Admin has been notified of your submission.`,
    });
  };
  
  const resetTest = () => {
    setTestCompleted(false);
    setSelectedTask(null);
    setFinalScore(null);
  };
  
  const handleLogin = () => {
    // In a real app, this would authenticate with a server
    localStorage.setItem('demoUserLoggedIn', 'true');
    setIsLoggedIn(true);
    setShowLoginDialog(false);
    
    toast({
      title: "Logged In",
      description: "You have successfully logged in.",
    });
  };
  
  const handleStartTask = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }
    
    setTestStarted(true);
  };
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <SpeakingHeader examType={examType} />
        
        {testCompleted && finalScore ? (
          <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/20 overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center">
                <Badge className="mb-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1">
                  Test Completed
                </Badge>
                <h2 className="text-2xl font-bold mb-2">Your Speaking Score</h2>
                <div className="inline-block bg-white dark:bg-gray-800 rounded-full p-6 mb-4 shadow-md">
                  <span className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {finalScore}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your speaking test has been reviewed. This score reflects your performance in fluency, pronunciation, vocabulary, and grammar.
                </p>
                <Button 
                  onClick={resetTest} 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  Take Another Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : !testStarted ? (
          <>
            {!selectedTask ? (
              <SpeakingCategorySelector onSelectTask={(task) => setSelectedTask(task)} examType={examType} />
            ) : (
              <SpeakingInstructions 
                task={selectedTask}
                onStart={handleStartTask} 
                onBack={() => setSelectedTask(null)}
                examType={examType}
              />
            )}
          </>
        ) : (
          <SpeakingTest task={selectedTask!} onFinish={handleTestFinish} examType={examType} />
        )}
      </div>
      
      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              You need to sign in to track your progress and take the speaking test.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email"
                type="email"
                placeholder="your@email.com"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input 
                id="password"
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              This is a demo login. For testing, any email and password will work.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleLogin}
              className="gap-2"
              disabled={!loginData.email || !loginData.password}
            >
              <Lock className="h-4 w-4" />
              Sign In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SpeakingPractice;
