
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';

export interface ExamType {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
}

interface ExamTypeSelectorProps {
  examTypes: ExamType[];
  selectedExam: string;
  onExamChange: (exam: string) => void;
}

const ExamTypeSelector: React.FC<ExamTypeSelectorProps> = ({ 
  examTypes, 
  selectedExam, 
  onExamChange 
}) => {
  // Default images for different exam types
  const getDefaultImage = (examId: string) => {
    const images = {
      'ielts-academic': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'ielts-general': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'toefl': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'pte': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'duolingo': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'cambridge': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'oet': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'sat': 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'gre': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'gmat': 'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    };
    
    return images[examId] || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Exam Type
      </div>
      <RadioGroup value={selectedExam} onValueChange={onExamChange} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {examTypes.map((exam, index) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Label
              htmlFor={`exam-${exam.id}`}
              className="cursor-pointer block h-full"
            >
              <Card className={`relative overflow-hidden h-full transition-all duration-300 ${
                selectedExam === exam.id 
                  ? 'border-2 border-indigo shadow-md' 
                  : 'hover:border-gray-300 hover:bg-gray-50 dark:hover:border-gray-600 dark:hover:bg-gray-800/50'
              }`}>
                <div className="h-32 overflow-hidden">
                  <img 
                    src={exam.image || getDefaultImage(exam.id)} 
                    alt={exam.name}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      selectedExam === exam.id ? 'scale-105' : 'group-hover:scale-105'
                    }`}
                  />
                  <div className={`absolute inset-0 h-32 bg-gradient-to-b ${
                    selectedExam === exam.id 
                      ? 'from-indigo/60 to-indigo/90' 
                      : 'from-gray-900/30 to-gray-900/70'
                  }`}></div>
                  <div className="absolute top-0 left-0 w-full p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{exam.icon}</span>
                      {selectedExam === exam.id && (
                        <CheckCircle2 className="h-5 w-5 bg-white text-indigo rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="font-medium text-lg mb-1">{exam.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {exam.description}
                  </div>
                  
                  <div className={`text-xs flex items-center ${
                    selectedExam === exam.id 
                      ? 'text-indigo font-medium' 
                      : 'text-gray-500'
                  }`}>
                    {selectedExam === exam.id ? 'Selected' : 'Select this exam'} 
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
                <RadioGroupItem
                  id={`exam-${exam.id}`}
                  value={exam.id}
                  className="sr-only"
                />
              </Card>
            </Label>
          </motion.div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ExamTypeSelector;
