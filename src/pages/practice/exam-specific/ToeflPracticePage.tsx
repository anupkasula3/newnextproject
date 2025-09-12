
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headphones, BookOpen, Edit, MessageSquare, Trophy, CheckCircle2, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const ToeflPracticePage = () => {
  const navigate = useNavigate();
  const [toeflType, setToeflType] = useState('ibt');
  const [selectedTab, setSelectedTab] = useState('module');
  const { toast } = useToast();
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    document.title = 'TOEFL Practice | Neplia';
    
    // Save exam preference to localStorage
    localStorage.setItem('selectedExam', 'toefl');
  }, []);
  
  const toeflTypes = [
    { value: 'ibt', label: '🖥️ TOEFL iBT (Most Popular)', description: '2024 Shorter Format' },
    { value: 'pbt', label: '📝 TOEFL PBT (Legacy Paper Test)', description: 'For regions without Internet tests' },
    { value: 'essentials', label: '⚡ TOEFL Essentials (Shortened Adaptive Test)', description: 'Shorter, adaptive version' },
    { value: 'itp', label: '🏫 TOEFL ITP (For School Placement)', description: 'For academic institutions' }
  ];
  
  const ibtPracticeOptions = [
    {
      title: 'Reading Practice',
      description: '20 questions, 35 minutes - Academic passages with multiple-choice questions',
      icon: BookOpen,
      path: '/practice/reading?exam=toefl',
      color: 'bg-blue-600'
    },
    {
      title: 'Listening Practice',
      description: '28 questions, 36 minutes - Lectures and conversations with comprehension questions',
      icon: Headphones,
      path: '/practice/listening?exam=toefl',
      color: 'bg-indigo'
    },
    {
      title: 'Speaking Practice',
      description: '4 tasks, 16 minutes - Independent and integrated speaking tasks',
      icon: MessageSquare,
      path: '/practice/speaking?exam=toefl',
      color: 'bg-amber-600'
    },
    {
      title: 'Writing Practice',
      description: '2 tasks, 29 minutes - Integrated and independent writing tasks',
      icon: Edit,
      path: '/practice/writing?exam=toefl',
      color: 'bg-purple-600'
    }
  ];
  
  const pbtPracticeOptions = [
    {
      title: 'Reading Practice',
      description: '50 questions, 55 minutes - Reading comprehension and grammar questions',
      icon: BookOpen,
      path: '/practice/reading?exam=toefl-pbt',
      color: 'bg-blue-600'
    },
    {
      title: 'Listening Practice',
      description: '50 questions, 30-40 minutes - Short conversations and lectures',
      icon: Headphones,
      path: '/practice/listening?exam=toefl-pbt',
      color: 'bg-indigo'
    },
    {
      title: 'Structure Practice',
      description: '40 questions, 25 minutes - Structure and written expression tasks',
      icon: MessageSquare,
      path: '/practice/speaking?exam=toefl-pbt',
      color: 'bg-amber-600'
    },
    {
      title: 'Writing Practice',
      description: '30 minutes - TWE (Test of Written English)',
      icon: Edit,
      path: '/practice/writing?exam=toefl-pbt',
      color: 'bg-purple-600'
    }
  ];
  
  const essentialsPracticeOptions = [
    {
      title: 'Reading Practice',
      description: 'Adaptive difficulty - Short passages with vocabulary and comprehension questions',
      icon: BookOpen,
      path: '/practice/reading?exam=toefl-essentials',
      color: 'bg-blue-600'
    },
    {
      title: 'Listening Practice',
      description: 'Adaptive difficulty - Short conversations and mini-lectures',
      icon: Headphones,
      path: '/practice/listening?exam=toefl-essentials',
      color: 'bg-indigo'
    },
    {
      title: 'Speaking Practice',
      description: '10 minutes - Quick response speaking tasks with adaptive difficulty',
      icon: MessageSquare,
      path: '/practice/speaking?exam=toefl-essentials',
      color: 'bg-amber-600'
    },
    {
      title: 'Writing Practice',
      description: 'Short writing tasks with varied formats',
      icon: Edit,
      path: '/practice/writing?exam=toefl-essentials',
      color: 'bg-purple-600'
    }
  ];
  
  const itpPracticeOptions = [
    {
      title: 'Reading Practice',
      description: 'Institution-focused reading comprehension passages',
      icon: BookOpen,
      path: '/practice/reading?exam=toefl-itp',
      color: 'bg-blue-600'
    },
    {
      title: 'Listening Practice',
      description: 'Academic lecture and conversation comprehension',
      icon: Headphones,
      path: '/practice/listening?exam=toefl-itp',
      color: 'bg-indigo'
    },
    {
      title: 'Structure Practice',
      description: 'Language form and meaning questions',
      icon: MessageSquare,
      path: '/practice/speaking?exam=toefl-itp',
      color: 'bg-amber-600'
    },
    {
      title: 'Writing Practice',
      description: 'Supplemental writing practice for ITP preparation',
      icon: Edit,
      path: '/practice/writing?exam=toefl-itp',
      color: 'bg-purple-600'
    }
  ];
  
  const getPracticeOptions = () => {
    switch(toeflType) {
      case 'pbt': return pbtPracticeOptions;
      case 'essentials': return essentialsPracticeOptions;
      case 'itp': return itpPracticeOptions;
      default: return ibtPracticeOptions;
    }
  };
  
  const practiceOptions = getPracticeOptions();
  
  const startFullMockExam = () => {
    toast({
      title: "Mock Exam Scheduled",
      description: `Your full TOEFL ${toeflType.toUpperCase()} mock exam has been scheduled. Good luck!`,
    });
  };
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TOEFL Practice Center</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Prepare for your TOEFL exam with our comprehensive practice modules and full mock tests.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-6">
            <div className="text-left mb-2 text-sm font-medium">Which TOEFL exam are you preparing for?</div>
            <Select value={toeflType} onValueChange={setToeflType}>
              <SelectTrigger>
                <SelectValue placeholder="Select TOEFL Exam Type" />
              </SelectTrigger>
              <SelectContent>
                {toeflTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div>{type.label}</div>
                      <div className="text-xs text-gray-500">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="module" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="module">Individual Modules</TabsTrigger>
              <TabsTrigger value="mock">Full Mock Tests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="module" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {practiceOptions.map((option, index) => (
                  <Card key={index} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <CardHeader className={`${option.color} text-white p-6 flex flex-row items-center space-x-4`}>
                      <div className="bg-white/20 p-2 rounded-full">
                        <option.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{option.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="mb-6">{option.description}</p>
                      <Button 
                        onClick={() => navigate(option.path)}
                        className="w-full bg-indigo hover:bg-indigo-600"
                      >
                        Start Practice
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mock" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Full TOEFL {toeflType.toUpperCase()} Mock Test</CardTitle>
                  <p className="text-gray-500 dark:text-gray-400">
                    Take a complete mock TOEFL test under timed conditions to simulate the real exam experience
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-6 space-y-4">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-500" /> 
                      Complete TOEFL Experience
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {practiceOptions.map((option, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium">{option.title.replace(' Practice', '')}</p>
                            <p className="text-sm text-gray-500">{option.description.split('-')[0]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-5 w-5 text-indigo" />
                        <h4 className="font-medium">Take Your Mock Test</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Set aside approximately 2-3 hours to complete all sections of the test. You can take breaks between sections.
                      </p>
                      <Button 
                        onClick={() => navigate(`/practice/mock-test?exam=toefl-${toeflType}`)}
                        className="w-full bg-indigo hover:bg-indigo/90"
                      >
                        Start Full Mock Test
                      </Button>
                    </div>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Mock Test History</CardTitle>
                      <p className="text-gray-500 dark:text-gray-400">
                        Review your previous mock tests and track your progress
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">
                          You haven't taken any mock tests yet. Start a mock test to track your progress!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ToeflPracticePage;
