
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Headphones, BookOpen, Edit, MessageSquare, BarChart3, Calendar, Crown, Clock, Award, PlusCircle, Timer, Trophy, Star } from 'lucide-react';
import UserStats from '@/components/user/UserStats';
import UserCourseProgress from '@/components/user/UserCourseProgress';
import RecentActivity from '@/components/user/RecentActivity';
import UpcomingTests from '@/components/user/UpcomingTests';
import PremiumPlans from '@/components/user/PremiumPlans';
import UserPreferences from '@/components/user/UserPreferences';
import ProfileStats from '@/components/user/ProfileStats';
import AchievementsBadges from '@/components/user/AchievementsBadges';
import StudyPlan from '@/components/user/StudyPlan';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { mockTestData } from '@/data/mockTestData';
import { useToast } from '@/hooks/use-toast';
import ListeningSection from '@/components/dashboard/ListeningSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserDashboard = () => {
  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || 'User';
  const { toast } = useToast();
  
  // State for exam timer
  const [timerActive, setTimerActive] = useState(false);
  const [examTime, setExamTime] = useState(0);
  const [examStartTime, setExamStartTime] = useState<Date | null>(null);
  const [showPremiumPlans, setShowPremiumPlans] = useState(false);
  
  // Define the missing handleUpgradeClick function
  const handleUpgradeClick = () => {
    setShowPremiumPlans(true);
    
    // Scroll to the premium plans section
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById('premium-plans')?.offsetTop || 0,
        behavior: 'smooth',
      });
    }, 100);
  };
  
  // Calculate remaining time
  const getRemainingTime = () => {
    if (!examStartTime || !examTime) return '00:00:00';
    
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - examStartTime.getTime()) / 1000);
    const remaining = Math.max(0, examTime * 60 - elapsed);
    
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };
  
  // Start timer for selected exam
  const startExamTimer = (sectionId: string) => {
    const section = mockTestData.sections.find(s => s.id === sectionId);
    if (section) {
      setExamTime(section.duration);
      setExamStartTime(new Date());
      setTimerActive(true);
    }
  };
  
  // Reset timer
  const resetTimer = () => {
    setTimerActive(false);
    setExamStartTime(null);
  };

  // Get selected preferences
  const selectedExam = localStorage.getItem('selectedExam') || '';
  const selectedCountry = localStorage.getItem('selectedCountry') || '';
  
  // Get exam-specific services based on selected exam
  const getExamSpecificServices = () => {
    // Basic services available for all exam types
    const baseServices = [
      {
        icon: Headphones,
        title: "Listening Practice",
        description: "Improve your English listening skills with our curated practice tests",
        color: "bg-indigo text-white",
        link: "/practice/listening"
      },
      {
        icon: BookOpen,
        title: "Reading Tests",
        description: "Enhance your reading comprehension with timed exercises",
        color: "bg-teal text-white",
        link: "/practice/reading"
      },
      {
        icon: Edit,
        title: "Writing Evaluation",
        description: "Get AI-powered feedback on your writing tasks",
        color: "bg-coral text-white",
        link: "/practice/writing"
      },
      {
        icon: MessageSquare,
        title: "Speaking Assessment",
        description: "Practice your speaking skills with our voice analysis tools",
        color: "bg-indigo text-white",
        link: "/practice/speaking"
      }
    ];
    
    // Add exam-specific services
    if (selectedExam.includes('ielts')) {
      baseServices.push({
        icon: BarChart3,
        title: "IELTS Band Score Calculator",
        description: "Estimate your IELTS band score based on practice results",
        color: "bg-teal text-white",
        link: "#progress"
      });
    } else if (selectedExam === 'toefl') {
      baseServices.push({
        icon: BarChart3,
        title: "TOEFL Score Predictor",
        description: "Predict your TOEFL score based on practice performance",
        color: "bg-teal text-white",
        link: "#progress"
      });
    } else if (selectedExam === 'pte') {
      baseServices.push({
        icon: BarChart3,
        title: "PTE Score Analyzer",
        description: "Analyze your PTE practice scores and get improvement recommendations",
        color: "bg-teal text-white",
        link: "#progress"
      });
    } else if (selectedExam === 'duolingo') {
      baseServices.push({
        icon: BarChart3,
        title: "Duolingo Score Estimator",
        description: "Get an estimate of your potential Duolingo English Test score",
        color: "bg-teal text-white",
        link: "#progress"
      });
    } else if (selectedExam === 'cambridge') {
      baseServices.push({
        icon: BarChart3,
        title: "Cambridge Level Assessment",
        description: "Assess your current CEFR level and track your progress",
        color: "bg-teal text-white",
        link: "#progress"
      });
    } else if (selectedExam === 'oet') {
      baseServices.push({
        icon: BarChart3,
        title: "OET Grade Predictor",
        description: "Predict your OET grade based on practice performance",
        color: "bg-teal text-white",
        link: "#progress"
      });
    }
    
    // Add mock test for all exam types
    baseServices.push({
      icon: Calendar,
      title: `${selectedExam ? getExamName(selectedExam) : 'Mock'} Tests`,
      description: "Take full-length mock tests under exam conditions",
      color: "bg-coral text-white",
      link: "/practice/mock-test"
    });
    
    return baseServices;
  };
  
  // Helper function to get exam name
  const getExamName = (id: string): string => {
    const exams: Record<string, string> = {
      'ielts-academic': 'IELTS Academic',
      'ielts-general': 'IELTS General Training',
      'toefl': 'TOEFL',
      'pte': 'PTE Academic',
      'duolingo': 'Duolingo',
      'cambridge': 'Cambridge English',
      'oet': 'OET',
    };
    
    return exams[id] || 'Mock';
  };
  
  // Get country name
  const getCountryName = (code: string): string => {
    const countries: Record<string, string> = {
      'us': 'United States',
      'uk': 'United Kingdom',
      'ca': 'Canada',
      'au': 'Australia',
      'nz': 'New Zealand',
      'in': 'India',
      'sg': 'Singapore',
      'my': 'Malaysia',
      'ph': 'Philippines',
      'hk': 'Hong Kong',
    };
    
    return countries[code] || 'Global';
  };
  
  // Get services based on selected exam
  const services = getExamSpecificServices();

  return (
    <Layout>
      <div className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 pt-12 pb-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {userName}</h1>
              <p className="text-muted-foreground">
                {selectedExam 
                  ? `Your ${getExamName(selectedExam)} preparation dashboard ${selectedCountry ? `for ${getCountryName(selectedCountry)}` : ''}`
                  : "Your personal exam preparation dashboard"}
              </p>
            </div>
            
            {timerActive && (
              <div className="mt-4 md:mt-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg px-4 py-2 flex items-center">
                <Timer className="h-5 w-5 text-indigo mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Exam Timer</div>
                  <div className="text-xl font-mono font-semibold">{getRemainingTime()}</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-3 text-red-500 hover:text-red-700 hover:bg-red-100"
                  onClick={resetTimer}
                >
                  Reset
                </Button>
              </div>
            )}
            
            {!timerActive && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="mt-4 md:mt-0 bg-indigo hover:bg-indigo/90">
                    <Timer className="mr-2 h-4 w-4" />
                    Start Exam Timer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Select Exam Section</AlertDialogTitle>
                    <AlertDialogDescription>
                      Choose which exam section you want to practice with a timer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="grid gap-4 py-4">
                    {mockTestData.sections.map((section) => (
                      <Button
                        key={section.id}
                        variant="outline"
                        className="w-full justify-start text-left"
                        onClick={() => {
                          startExamTimer(section.id);
                          const closeButton = document.querySelector('[data-radix-alert-dialog-close-button]');
                          if (closeButton) {
                            (closeButton as HTMLElement).click();
                          }
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{section.title}</span>
                          <span className="text-xs text-muted-foreground flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" /> {section.duration} minutes
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          
          
          {/* Enhanced Profile Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <UserStats />
                </div>
                <div>
                  <UserPreferences />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <UserCourseProgress />
                </div>
                <div>
                  <RecentActivity />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats">
              <ProfileStats />
            </TabsContent>
            
            <TabsContent value="achievements">
              <AchievementsBadges />
            </TabsContent>
            
            <TabsContent value="study-plan">
              <StudyPlan />
            </TabsContent>
            
            <TabsContent value="progress">
              <ListeningSection />
            </TabsContent>
          </Tabs>
          
          {showPremiumPlans ? (
            <div className="mb-12" id="premium-plans">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Upgrade Your Experience</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPremiumPlans(false)}
                  className="text-sm"
                >
                  Hide Plans
                </Button>
              </div>
              <PremiumPlans />
            </div>
          ) : (
            <div className="bg-indigo-50 dark:bg-gray-800/50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between mb-12">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Crown className="mr-2 h-5 w-5 text-indigo" /> Premium Features
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Unlock advanced features with our premium plan for even better 
                  {selectedExam ? ` ${getExamName(selectedExam)}` : ' exam'} preparation
                </p>
              </div>
              <Button className="bg-indigo hover:bg-indigo/90" onClick={handleUpgradeClick}>
                View Premium Plans
              </Button>
            </div>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button className="hidden">View Premium Features</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center">
                  <Crown className="mr-2 h-5 w-5 text-indigo" /> Premium Features
                </SheetTitle>
                <SheetDescription>
                  Elevate your IELTS preparation with our premium tools
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <Award className="h-5 w-5 text-indigo mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Expert Evaluation</h4>
                    <p className="text-sm text-muted-foreground">Get your essays evaluated by IELTS certified experts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <Clock className="h-5 w-5 text-indigo mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Unlimited Mock Tests</h4>
                    <p className="text-sm text-muted-foreground">Take as many full-length tests as you need</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <MessageSquare className="h-5 w-5 text-indigo mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">1-on-1 Coaching</h4>
                    <p className="text-sm text-muted-foreground">Live video sessions with IELTS tutors</p>
                  </div>
                </div>
                <SheetClose asChild>
                  <Button className="w-full mt-4 bg-indigo hover:bg-indigo/90" onClick={handleUpgradeClick}>
                    Upgrade Now
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
