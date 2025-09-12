import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Headphones, 
  MessageSquare, 
  Edit, 
  Calculator,
  Trophy,
  ExternalLink,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { usePracticeLimit } from '@/hooks/use-practice-limit';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const examTitles: Record<string, string> = {
  'ielts': 'IELTS',
  'toefl': 'TOEFL',
  'pte': 'PTE Academic',
  'duolingo': 'Duolingo English Test',
  'cambridge': 'Cambridge English',
  'oet': 'OET',
  'sat': 'SAT',
  'gre': 'GRE',
  'gmat': 'GMAT'
};

const PracticePage = () => {
  const [examType, setExamType] = useState('ielts');
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { canPractice, practiceCount, practicesLeft } = usePracticeLimit();
  
  useEffect(() => {
    const savedExam = localStorage.getItem('selectedExam');
    
    if (savedExam) {
      let baseExamType = savedExam.split('-')[0];
      
      if (savedExam.startsWith('ielts')) {
        baseExamType = 'ielts';
      }
      
      setExamType(baseExamType);
    }
    
    const queryParams = new URLSearchParams(location.search);
    const examParam = queryParams.get('exam');
    
    if (examParam) {
      setExamType(examParam);
      
      // Redirect to specific exam practice page
      const validExams = ['ielts', 'toefl', 'pte', 'gre', 'gmat', 'sat'];
      if (validExams.includes(examParam)) {
        navigate(`/practice/${examParam}`, { replace: true });
      }
    }
  }, [location, navigate]);

  const getExamTitle = () => {
    return examTitles[examType] || 'IELTS';
  };

  const examTypes = [
    {
      name: 'IELTS',
      path: '/practice/ielts',
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-700',
      sections: ['Reading', 'Listening', 'Writing', 'Speaking']
    },
    {
      name: 'TOEFL',
      path: '/practice/toefl',
      color: 'bg-gradient-to-r from-blue-500 to-blue-700',
      sections: ['Reading', 'Listening', 'Writing', 'Speaking']
    },
    {
      name: 'PTE',
      path: '/practice/pte',
      color: 'bg-gradient-to-r from-teal-600 to-teal-800',
      sections: ['Reading', 'Listening', 'Speaking & Writing']
    },
    {
      name: 'GRE',
      path: '/practice/gre',
      color: 'bg-gradient-to-r from-purple-600 to-purple-800',
      sections: ['Verbal', 'Quantitative', 'Analytical Writing']
    },
    {
      name: 'GMAT',
      path: '/practice/gmat',
      color: 'bg-gradient-to-r from-blue-700 to-blue-900',
      sections: ['Verbal', 'Quantitative', 'Integrated Reasoning', 'Analytical Writing']
    },
    {
      name: 'SAT',
      path: '/practice/sat',
      color: 'bg-gradient-to-r from-red-600 to-red-800',
      sections: ['Reading & Writing', 'Math']
    }
  ];

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Exam Practice Center
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Prepare for your exams with our comprehensive practice modules and full mock tests.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-2 rounded-full"></div>
          </div>
          
          {!canPractice() && (
            <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400 mb-8">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Practice Limit Reached</AlertTitle>
              <AlertDescription>
                You've used all {practiceCount} of your free daily practice attempts. Upgrade to premium for unlimited practice or wait 24 hours for your limit to reset.
              </AlertDescription>
              <div className="mt-4">
                <Link to="/pricing">
                  <Button className="bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800">
                    Upgrade to Premium
                  </Button>
                </Link>
              </div>
            </Alert>
          )}
          
          {canPractice() && practicesLeft < 3 && (
            <Alert className="bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-300 mb-8">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Practice Limit Warning</AlertTitle>
              <AlertDescription>
                You have {practicesLeft} free practice {practicesLeft === 1 ? 'attempt' : 'attempts'} remaining today. Upgrade to premium for unlimited practice.
              </AlertDescription>
              <div className="mt-4">
                <Link to="/pricing">
                  <Button variant="outline" className="border-indigo text-indigo hover:bg-indigo-50 dark:hover:bg-indigo-950">
                    View Premium Options
                  </Button>
                </Link>
              </div>
            </Alert>
          )}
          
          <div className="pt-6">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Select an exam to begin practicing:
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {examTypes.map((exam) => (
                <Link key={exam.name} to={exam.path} className="transform transition-all duration-300 hover:scale-105">
                  <div className={`${exam.color} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all`}>
                    <div className="p-5 md:p-6 text-white">
                      <h3 className="font-bold text-lg md:text-xl mb-2">{exam.name}</h3>
                      <div className="text-xs md:text-sm text-white/80 mb-3">
                        {exam.sections.length} practice sections
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {exam.sections.slice(0, 2).map((section, idx) => (
                          <span key={idx} className="inline-block bg-white/20 rounded-full px-2 py-0.5 text-xs">
                            {section}
                          </span>
                        ))}
                        {exam.sections.length > 2 && (
                          <span className="inline-block bg-white/20 rounded-full px-2 py-0.5 text-xs">
                            +{exam.sections.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-white/10 p-3 flex items-center justify-center">
                      <span className="text-white text-sm flex items-center">
                        Start Practice <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Practice by Skill
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
                Focus on specific language skills across different exam formats
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/practice/reading" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all text-center border border-gray-100 dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium">Reading</h3>
              </Link>
              
              <Link to="/practice/listening" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all text-center border border-gray-100 dark:border-gray-700">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium">Listening</h3>
              </Link>
              
              <Link to="/practice/speaking" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all text-center border border-gray-100 dark:border-gray-700">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-medium">Speaking</h3>
              </Link>
              
              <Link to="/practice/writing" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all text-center border border-gray-100 dark:border-gray-700">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Edit className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium">Writing</h3>
              </Link>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/practice/mock-test" className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-white shadow-lg hover:opacity-90 transition-all">
              <Trophy className="mr-2 h-5 w-5" />
              Take a Full Mock Test
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PracticePage;
