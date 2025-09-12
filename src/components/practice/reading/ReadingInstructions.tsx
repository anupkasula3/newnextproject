
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, ArrowRight, BookOpen, Calculator, BrainCircuit } from 'lucide-react';

interface ReadingInstructionsProps {
  onStart: () => void;
  examType?: string;
  section?: string;
}

export const ReadingInstructions = ({ onStart, examType = 'ielts', section = 'reading' }: ReadingInstructionsProps) => {
  const getInstructionsByExamAndSection = () => {
    if (examType.includes('toefl')) {
      const toeflType = examType.split('-')[1] || 'ibt';
      
      if (toeflType === 'pbt') {
        return {
          title: 'TOEFL PBT Reading Practice',
          time: '55 minutes',
          questions: '50 questions',
          icon: <BookOpen className="h-8 w-8 text-teal-600" />,
          description: 'This test assesses your ability to understand academic texts, including grammar and vocabulary. You will read passages and answer various question types.',
          instructions: [
            'Read each passage carefully before answering the questions',
            'Answer all questions based only on the information in the passages',
            'Manage your time wisely - approximately 65 seconds per question',
            'Pay attention to grammar and structure questions in this PBT format'
          ],
          buttonColor: 'bg-gradient-to-r from-teal-600 to-teal-800'
        };
      } else if (toeflType === 'essentials') {
        return {
          title: 'TOEFL Essentials Reading Practice',
          time: 'Adaptive',
          questions: 'Multiple short passages',
          icon: <BookOpen className="h-8 w-8 text-teal-600" />,
          description: 'This adaptive test assesses your reading skills through shorter passages and a variety of question formats.',
          instructions: [
            'The difficulty adapts based on your performance',
            'Read each passage carefully before answering questions',
            'Focus on main ideas, details, and vocabulary in context',
            'Expect a mix of academic and general interest topics'
          ],
          buttonColor: 'bg-gradient-to-r from-teal-600 to-teal-800'
        };
      } else if (toeflType === 'itp') {
        return {
          title: 'TOEFL ITP Reading Practice',
          time: '60 minutes',
          questions: 'Multiple passage-based questions',
          icon: <BookOpen className="h-8 w-8 text-teal-600" />,
          description: 'This institutional testing format evaluates your reading comprehension skills with academic passages designed for school placement.',
          instructions: [
            'Focus on understanding main ideas and supporting details',
            'Look for specific facts and information in each passage',
            'Practice identifying inferences and author\'s purpose',
            'Pay attention to vocabulary in context questions'
          ],
          buttonColor: 'bg-gradient-to-r from-teal-600 to-teal-800'
        };
      } else {
        // Default TOEFL iBT
        return {
          title: 'TOEFL iBT Reading Practice',
          time: '35 minutes',
          questions: '20 questions',
          icon: <BookOpen className="h-8 w-8 text-teal-600" />,
          description: 'This test assesses your ability to understand academic texts in a university environment. You will read passages and answer various question types.',
          instructions: [
            'Read each passage carefully before answering the questions',
            'Look for main ideas, details, inferences, and rhetorical functions',
            'Manage your time wisely - approximately 105 seconds per question',
            'Review your answers if time permits'
          ],
          buttonColor: 'bg-gradient-to-r from-teal-600 to-teal-800'
        };
      }
    }
    else if (examType === 'gre' && section === 'verbal') {
      return {
        title: 'GRE Verbal Reasoning Practice',
        time: '30 minutes',
        questions: '20 questions',
        icon: <BookOpen className="h-8 w-8 text-purple-600" />,
        description: 'This test includes reading comprehension, text completion, and sentence equivalence questions to assess your verbal reasoning abilities.',
        instructions: [
          'Read each passage carefully before attempting the questions',
          'Some questions may have more than one correct answer',
          'Pay attention to keywords in the text completion questions',
          'Manage your time carefully - aim for 1-2 minutes per question'
        ],
        buttonColor: 'bg-gradient-to-r from-purple-600 to-purple-800'
      };
    } 
    else if (examType === 'gre' && section === 'quantitative') {
      return {
        title: 'GRE Quantitative Reasoning Practice',
        time: '35 minutes',
        questions: '20 questions',
        icon: <Calculator className="h-8 w-8 text-blue-600" />,
        description: 'This test assesses your basic mathematical skills and understanding of elementary mathematical concepts in arithmetic, algebra, geometry, and data analysis.',
        instructions: [
          'Read each question carefully before attempting to solve',
          'Some questions may be multiple-choice with more than one correct answer',
          'You may need to perform calculations to arrive at the correct answer',
          'Manage your time carefully - aim for 1-2 minutes per question'
        ],
        buttonColor: 'bg-gradient-to-r from-blue-600 to-blue-800'
      };
    }
    else if (examType === 'gre' && section === 'mixed') {
      return {
        title: 'GRE Integrated Practice',
        time: '60 minutes',
        questions: '30 questions',
        icon: <BrainCircuit className="h-8 w-8 text-amber-600" />,
        description: 'This integrated practice session includes a mix of verbal, quantitative, and analytical writing tasks to help you prepare for the full GRE experience.',
        instructions: [
          'The test includes different question types from all GRE sections',
          'Manage your time carefully between different question types',
          'Read instructions for each section carefully before proceeding',
          'Try to maintain your focus throughout the mixed format'
        ],
        buttonColor: 'bg-gradient-to-r from-amber-600 to-amber-800'
      };
    }
    else if (examType === 'sat' && section === 'math') {
      return {
        title: 'SAT Math Practice',
        time: '70 minutes',
        questions: '44 questions',
        icon: <Calculator className="h-8 w-8 text-blue-600" />,
        description: 'This test assesses your mathematical reasoning, problem-solving skills, and understanding of algebraic concepts.',
        instructions: [
          'The test includes both calculator and no-calculator questions',
          'Some questions are multiple-choice, others require you to enter your answer',
          'Read each question carefully before solving',
          'Check your work when possible'
        ],
        buttonColor: 'bg-gradient-to-r from-blue-600 to-blue-800'
      };
    }
    else if (examType === 'sat' && section === 'reading') {
      return {
        title: 'SAT Reading & Writing Practice',
        time: '64 minutes',
        questions: '54 questions',
        icon: <BookOpen className="h-8 w-8 text-red-600" />,
        description: 'This test assesses your reading comprehension skills, grammar knowledge, and ability to analyze text passages.',
        instructions: [
          'Read each passage carefully before answering questions',
          'Pay attention to the main ideas and supporting details',
          'For writing questions, focus on grammar, punctuation, and clarity',
          'Manage your time - approximately 1 minute per question'
        ],
        buttonColor: 'bg-gradient-to-r from-red-600 to-red-800'
      };
    }
    else {
      return {
        title: `${examType.toUpperCase()} Reading Practice`,
        time: '60 minutes',
        questions: '40 questions',
        icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
        description: `This test assesses your ability to understand academic texts and answer questions based on the information provided.`,
        instructions: [
          'Read each passage carefully before answering the questions',
          'Answer all questions based only on the information in the passages',
          'Manage your time wisely - allocate appropriate time for each passage',
          'Review your answers if time permits'
        ],
        buttonColor: 'bg-gradient-to-r from-indigo-600 to-indigo-800'
      };
    }
  };

  const instructions = getInstructionsByExamAndSection();

  return (
    <Card className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 shadow-md p-6 rounded-xl">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
            {instructions.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold">{instructions.title}</h2>
            <div className="flex items-center gap-4 mt-1 text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>{instructions.time}</span>
              </div>
              <div className="text-sm">
                {instructions.questions}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-gray-600 dark:text-gray-300">
            {instructions.description}
          </p>
        </div>
        
        <div className="border-t border-b border-gray-200 dark:border-gray-800 py-4">
          <h3 className="font-semibold mb-3">Instructions:</h3>
          <ul className="space-y-2">
            {instructions.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <span className="text-sm font-semibold mr-2 text-indigo-600 dark:text-indigo-400">{index + 1}.</span>
                <span className="text-gray-600 dark:text-gray-300">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={onStart}
            className={`${instructions.buttonColor} text-white px-6 py-6 h-auto flex items-center gap-2 shadow-lg hover:opacity-90 transition-colors`}
          >
            Start Practice Test
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
