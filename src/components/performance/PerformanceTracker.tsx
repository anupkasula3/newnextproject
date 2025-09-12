
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { ChartBar, ChartLine, Trophy, Clock, RefreshCw } from 'lucide-react';
import { cn } from "@/lib/utils";
import { getUserProgress, useUserProgress } from '@/services/userProgressService';
import { CustomProgress } from '@/components/ui/custom-progress';

interface PerformanceStats {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  overall: number;
}

const PerformanceTracker = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('demoUserLoggedIn') === 'true');
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats>({
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0,
    overall: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const { trackCompletion } = useUserProgress();

  // Fetch user progress on component mount
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProgress();
    }
  }, [isLoggedIn]);

  const fetchUserProgress = async () => {
    setIsLoading(true);
    try {
      const progress = await getUserProgress();
      setPerformanceStats(progress);
    } catch (error) {
      console.error('Failed to fetch user progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteSection = async (section: 'listening' | 'reading' | 'writing' | 'speaking') => {
    if (!isLoggedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your progress",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a random score between 60 and 95 for demo purposes
    const score = Math.floor(Math.random() * 36) + 60;
    
    // Track completion and save to backend
    const success = await trackCompletion(section, score);
    
    if (success) {
      // Refresh progress data
      fetchUserProgress();
    }
  };

  // Login helper function for demo
  const handleDemoLogin = () => {
    localStorage.setItem('demoUserLoggedIn', 'true');
    setIsLoggedIn(true);
    toast({
      title: "Welcome back!",
      description: "You are now logged in as a demo user",
    });
  };

  if (!isLoggedIn) {
    return (
      <Card className="w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-indigo-100 dark:border-indigo-900/30">
        <CardHeader>
          <CardTitle className="text-indigo-700 dark:text-indigo-400">Track Your Progress</CardTitle>
          <CardDescription>Sign in to view and track your performance</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="text-center mb-6">
            <Trophy className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Sign in to track your progress across all sections and see your detailed performance metrics.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Sign In
              </Button>
            </Link>
            <Button variant="outline" onClick={handleDemoLogin}>
              Demo Login
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-indigo-100 dark:border-indigo-900/30">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-indigo-700 dark:text-indigo-400">Your Performance</CardTitle>
            <CardDescription>Track your progress across all sections</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={fetchUserProgress} 
            disabled={isLoading} 
            className="rounded-full"
          >
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChartBar className="h-5 w-5 text-indigo-500" />
              <span>Listening</span>
            </div>
            <span className="text-sm font-medium">{performanceStats.listening}%</span>
          </div>
          <CustomProgress 
            value={performanceStats.listening} 
            className="h-2 bg-indigo-100" 
            indicatorClassName="bg-indigo-500" 
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChartBar className="h-5 w-5 text-purple-500" />
              <span>Reading</span>
            </div>
            <span className="text-sm font-medium">{performanceStats.reading}%</span>
          </div>
          <CustomProgress 
            value={performanceStats.reading} 
            className="h-2 bg-purple-100" 
            indicatorClassName="bg-purple-500" 
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChartBar className="h-5 w-5 text-pink-500" />
              <span>Writing</span>
            </div>
            <span className="text-sm font-medium">{performanceStats.writing}%</span>
          </div>
          <CustomProgress 
            value={performanceStats.writing} 
            className="h-2 bg-pink-100" 
            indicatorClassName="bg-pink-500" 
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChartBar className="h-5 w-5 text-blue-500" />
              <span>Speaking</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-xs text-amber-500">Results within 2hrs</span>
            </div>
          </div>
          <CustomProgress 
            value={performanceStats.speaking} 
            className="h-2 bg-blue-100" 
            indicatorClassName="bg-blue-500" 
          />
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ChartLine className="h-5 w-5 text-green-500" />
              <span className="font-semibold">Overall</span>
            </div>
            <span className="text-sm font-medium">{performanceStats.overall}%</span>
          </div>
          <CustomProgress 
            value={performanceStats.overall} 
            className="h-3 bg-green-100" 
            indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-500" 
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 flex-wrap">
        <Button 
          onClick={() => handleCompleteSection('listening')}
          variant="outline"
          className="border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          disabled={isLoading}
        >
          Complete Listening
        </Button>
        <Button 
          onClick={() => handleCompleteSection('reading')}
          variant="outline"
          className="border-purple-200 hover:bg-purple-50 hover:text-purple-700"
          disabled={isLoading}
        >
          Complete Reading
        </Button>
        <Button 
          onClick={() => handleCompleteSection('writing')}
          variant="outline"
          className="border-pink-200 hover:bg-pink-50 hover:text-pink-700"
          disabled={isLoading}
        >
          Complete Writing
        </Button>
        <Button 
          onClick={() => handleCompleteSection('speaking')}
          variant="outline"
          className="border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          disabled={isLoading}
        >
          Complete Speaking
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PerformanceTracker;
