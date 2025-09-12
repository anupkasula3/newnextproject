import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import ExamTypeSelector from '@/components/selection/ExamTypeSelector';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, BookOpen, Headphones, Edit, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const examTypes = [
  {
    id: 'ielts-academic',
    name: 'IELTS Academic',
    description: 'For higher education and professional registration',
    icon: '🎓'
  },
  {
    id: 'ielts-general',
    name: 'IELTS General Training',
    description: 'For work experience, migration and secondary education',
    icon: '✈️'
  },
  {
    id: 'toefl',
    name: 'TOEFL',
    description: 'Test of English as a Foreign Language',
    icon: '📝'
  },
  {
    id: 'pte',
    name: 'PTE Academic',
    description: 'Pearson Test of English Academic',
    icon: '🖥️'
  },
  {
    id: 'duolingo',
    name: 'Duolingo English Test',
    description: 'Online English proficiency test',
    icon: '🦉'
  },
  {
    id: 'cambridge',
    name: 'Cambridge English',
    description: 'C1 Advanced & C2 Proficiency exams',
    icon: '🏛️'
  },
  {
    id: 'oet',
    name: 'OET',
    description: 'Occupational English Test for healthcare professionals',
    icon: '⚕️'
  },
  {
    id: 'sat',
    name: 'SAT',
    description: 'Scholastic Assessment Test for college admissions in the US',
    icon: '🧮'
  },
  {
    id: 'gre',
    name: 'GRE',
    description: 'Graduate Record Examination for graduate school admissions',
    icon: '🎯'
  },
  {
    id: 'gmat',
    name: 'GMAT',
    description: 'Graduate Management Admission Test for business schools',
    icon: '📊'
  }
];

const practiceOptions = [
  {
    icon: BookOpen,
    title: "Reading Practice",
    description: "Enhance your reading comprehension with academic and general training texts.",
    path: "/practice/reading",
    color: "bg-blue-600 text-white"
  },
  {
    icon: Headphones,
    title: "Listening Practice",
    description: "Improve your ability to understand spoken English in various contexts.",
    path: "/practice/listening",
    color: "bg-indigo text-white"
  },
  {
    icon: MessageSquare,
    title: "Speaking Practice",
    description: "Build confidence in your spoken English through interactive exercises.",
    path: "/practice/speaking",
    color: "bg-amber-600 text-white"
  },
  {
    icon: Edit,
    title: "Writing Practice",
    description: "Develop your written English skills for academic and general purposes.",
    path: "/practice/writing",
    color: "bg-purple-600 text-white"
  },
  {
    icon: Trophy,
    title: "Full Mock Test",
    description: "Complete a full test under timed conditions to simulate the real exam.",
    path: "/practice/mock-test",
    color: "bg-yellow-500 text-white"
  }
];

const SelectionHome: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedToeflType, setSelectedToeflType] = useState('ibt');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const toeflTypes = [
    { value: 'ibt', label: '🖥️ TOEFL iBT (Most Popular)' },
    { value: 'pbt', label: '📝 TOEFL PBT (Legacy Paper Test)' },
    { value: 'essentials', label: '⚡ TOEFL Essentials (Shortened Adaptive Test)' },
    { value: 'itp', label: '🏫 TOEFL ITP (For School Placement)' },
  ];

  useEffect(() => {
    document.title = 'Select Exam | Neplia';
    
    const savedExam = localStorage.getItem('selectedExam');
    if (savedExam) {
      setSelectedExam(savedExam);
    }
    
    const queryParams = new URLSearchParams(location.search);
    const examParam = queryParams.get('exam');
    
    if (examParam) {
      const validExam = examTypes.find(exam => exam.id === examParam);
      if (validExam) {
        setSelectedExam(examParam);
      }
    }
    
    const savedToeflType = localStorage.getItem('selectedToeflType');
    if (savedToeflType) setSelectedToeflType(savedToeflType);
  }, [location]);

  const handleExamChange = (exam: string) => {
    setSelectedExam(exam);
    localStorage.setItem('selectedExam', exam);
    if (exam !== "toefl") {
      localStorage.removeItem('selectedToeflType');
    }
  };

  const handleToeflTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedToeflType(value);
    localStorage.setItem('selectedToeflType', value);
  };

  const getExamPracticePath = (examId: string, toeflType?: string) => {
    if (examId === "toefl") {
      return `/exams/toefl${toeflType ? "?type=" + toeflType : ""}`;
    }
    const examMap: Record<string, string> = {
      'ielts-academic': '/exams/ielts',
      'ielts-general': '/exams/ielts',
      'pte': '/exams/pte',
      'duolingo': '/practice/ielts',
      'cambridge': '/practice/ielts',
      'oet': '/practice/ielts',
      'sat': '/exams/sat',
      'gre': '/exams/gre',
      'gmat': '/exams/gmat'
    };
    return examMap[examId] || '/practice';
  };

  const handleStartPractice = () => {
    if (!selectedExam) {
      toast({
        title: "Please select an exam type",
        description: "You need to select an exam type to continue.",
        variant: "destructive",
      });
      return;
    }
    const redirectPath = getExamPracticePath(selectedExam, selectedExam === "toefl" ? selectedToeflType : undefined);
    navigate(redirectPath);
  };

  const getCurrentExamName = () => {
    if (!selectedExam) return '';
    const exam = examTypes.find(e => e.id === selectedExam);
    return exam ? exam.name : '';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950/30 dark:to-purple-950/20 pt-16 pb-12">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-indigo via-purple-500 to-pink-500 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Choose Your Exam Type
            </motion.h1>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Select the exam you're preparing for to access tailored practice materials and tests.
            </motion.p>
          </div>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ExamTypeSelector 
              examTypes={examTypes} 
              selectedExam={selectedExam} 
              onExamChange={handleExamChange} 
            />
            {selectedExam === "toefl" && (
              <div className="max-w-xs mx-auto mt-6">
                <label htmlFor="toefl-type" className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Which TOEFL exam are you preparing for?
                </label>
                <select
                  id="toefl-type"
                  className="block w-full py-2 px-3 border border-gray-300 rounded shadow-sm bg-white dark:bg-gray-900 dark:border-gray-600"
                  value={selectedToeflType}
                  onChange={handleToeflTypeChange}
                >
                  {toeflTypes.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Select to start a full test or practice individual sections.
                </div>
              </div>
            )}
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleStartPractice} 
                className="bg-gradient-to-r from-indigo to-purple-600 hover:from-indigo/90 hover:to-purple-600/90 text-white px-6 py-6 text-lg"
              >
                Start Practicing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          <div className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Practice by Skill
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceOptions.map((option, index) => (
                <Link 
                  key={index}
                  to={option.path}
                  className="block hover:transform hover:-translate-y-1 transition-all duration-300"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 h-full"
                  >
                    <div className={`${option.color} p-5`}>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                        <option.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{option.title}</h3>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {option.description}
                      </p>
                      <div className="mt-auto pt-2 flex justify-end">
                        <span className="text-indigo font-medium flex items-center">
                          Start now <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SelectionHome;
