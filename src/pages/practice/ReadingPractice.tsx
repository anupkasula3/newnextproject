
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { usePracticeLimit } from '@/hooks/use-practice-limit';
import ReadingHeader from '@/components/practice/reading/ReadingHeader';
import { ReadingInstructions } from '@/components/practice/reading/ReadingInstructions';
import { ReadingQuestions } from '@/components/practice/reading/ReadingQuestions';
import { readingTestData } from '@/data/readingTestData';

const ReadingPractice = () => {
  const [examType, setExamType] = useState('ielts');
  const [showTest, setShowTest] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { canPractice, incrementPracticeCount } = usePracticeLimit();
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    const queryParams = new URLSearchParams(location.search);
    const examParam = queryParams.get('exam');
    
    if (examParam) {
      setExamType(examParam.toLowerCase());
      // Also save to localStorage for persistence
      localStorage.setItem('selectedExam', examParam.toLowerCase());
      
      // Set the document title based on the exam type
      if (examParam.includes('toefl')) {
        const toeflType = examParam.split('-')[1] || 'ibt';
        const typeDisplay = toeflType.toUpperCase();
        document.title = `TOEFL ${typeDisplay} Reading Practice | Neplia`;
      } else {
        document.title = `${examParam.toUpperCase()} Reading Practice | Neplia`;
      }
    } else {
      const savedExam = localStorage.getItem('selectedExam');
      if (savedExam) {
        setExamType(savedExam);
        if (savedExam.includes('toefl')) {
          const toeflType = savedExam.split('-')[1] || 'ibt';
          const typeDisplay = toeflType.toUpperCase();
          document.title = `TOEFL ${typeDisplay} Reading Practice | Neplia`;
        } else {
          document.title = `${savedExam.toUpperCase()} Reading Practice | Neplia`;
        }
      } else {
        document.title = 'Reading Practice | Neplia';
      }
    }
  }, [location]);

  const getExamTitle = () => {
    if (examType.includes('toefl')) {
      const toeflType = examType.split('-')[1] || 'ibt';
      if (toeflType === 'pbt') {
        return 'TOEFL PBT Reading Practice';
      } else if (toeflType === 'essentials') {
        return 'TOEFL Essentials Reading Practice';
      } else if (toeflType === 'itp') {
        return 'TOEFL ITP Reading Practice';
      } else {
        return 'TOEFL iBT Reading Practice';
      }
    } else if (examType === 'pte') {
      return 'PTE Reading Practice';
    } else if (examType === 'gre') {
      return 'GRE Reading Practice';
    } else if (examType === 'gmat') {
      return 'GMAT Reading Practice';
    } else if (examType === 'sat') {
      return 'SAT Reading Practice';
    } else {
      return 'IELTS Reading Practice';
    }
  };
  
  const getExamDescription = () => {
    if (examType.includes('toefl')) {
      const toeflType = examType.split('-')[1] || 'ibt';
      if (toeflType === 'pbt') {
        return 'Improve your reading skills with TOEFL PBT-style passages and questions (50 questions, 55 minutes).';
      } else if (toeflType === 'essentials') {
        return 'Enhance your reading skills with adaptive TOEFL Essentials reading tasks.';
      } else if (toeflType === 'itp') {
        return 'Practice with TOEFL ITP reading comprehension passages for academic placement.';
      } else {
        return 'Improve your academic reading skills with TOEFL iBT-style passages and questions (20 questions, 35 minutes).';
      }
    } else if (examType === 'pte') {
      return 'Enhance your reading skills with various PTE Academic reading tasks.';
    } else if (examType === 'gre') {
      return 'Build your verbal reasoning skills with GRE-style reading comprehension passages.';
    } else if (examType === 'gmat') {
      return 'Develop your critical reasoning skills with GMAT reading passages.';
    } else if (examType === 'sat') {
      return 'Practice with SAT-style reading passages and evidence-based questions.';
    } else {
      return 'Enhance your reading comprehension with various text types and question formats.';
    }
  };

  const handleStartPractice = () => {
    if (!canPractice()) {
      toast({
        title: "Practice Limit Reached",
        description: "You've reached your daily free practice limit. Please upgrade to premium or wait 24 hours.",
        variant: "destructive"
      });
      navigate("/pricing");
      return;
    }
    
    const success = incrementPracticeCount();
    if (success) {
      setShowTest(true);
      toast({
        title: "Practice Started",
        description: `Your ${getExamTitle()} has started successfully.`,
      });
    } else {
      navigate("/pricing");
    }
  };

  // If the test is showing, render the test content
  if (showTest) {
    return (
      <Layout>
        <div className="container max-w-5xl mx-auto px-4 py-12">
          <ReadingHeader examType={examType} />
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">{readingTestData.passages[0].title}</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>{readingTestData.passages[0].text}</p>
                </div>
              </Card>
            </div>
            <ReadingQuestions examType={examType} />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-5xl mx-auto px-4 py-12">
        <ReadingHeader examType={examType} />
        
        <div className="grid gap-8 mb-16">
          <ReadingInstructions 
            examType={examType} 
            onStart={handleStartPractice}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ReadingPractice;
