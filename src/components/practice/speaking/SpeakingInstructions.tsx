
import React from 'react';
import { SpeakingTask } from '@/types/speaking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MicIcon, Clock, Volume2, AlertCircle } from 'lucide-react';

interface SpeakingInstructionsProps {
  task: SpeakingTask;
  onStart: () => void;
  onBack: () => void;
  examType?: string;
}

export const SpeakingInstructions: React.FC<SpeakingInstructionsProps> = ({ 
  task, 
  onStart, 
  onBack,
  examType = 'ielts'
}) => {
  const getExamInstructions = () => {
    switch(examType.toLowerCase()) {
      case 'toefl':
        return [
          "You'll complete speaking tasks similar to the TOEFL exam.",
          "You'll have preparation time for some tasks before recording your response.",
          "For independent tasks, you'll answer questions about your opinions or experiences.",
          "For integrated tasks, you'll synthesize information from reading and listening materials.",
          "You can play back your responses to review your performance."
        ];
      case 'pte':
        return [
          "You'll complete speaking tasks similar to the PTE Academic exam.",
          "Tasks include Read Aloud, Repeat Sentence, and Describe Image sections.",
          "Your microphone will automatically record when the timer starts.",
          "Focus on clear pronunciation and natural intonation.",
          "You can review your responses after recording."
        ];
      case 'gre':
      case 'gmat':
        return [
          `You'll complete speaking tasks similar to the ${examType.toUpperCase()} exam.`,
          "You'll analyze issues and arguments on various topics.",
          "Take time to organize your thoughts before speaking.",
          "Focus on logical structure and clear articulation.",
          "Your responses will be evaluated on critical thinking and verbal expression."
        ];
      default: // IELTS
        return [
          "You'll complete a simulated IELTS speaking test with 3 parts.",
          "Part 1: Introduction and questions on familiar topics.",
          "Part 2: Individual long turn - speak for 1-2 minutes on a given topic.",
          "Part 3: Two-way discussion on more abstract topics related to Part 2.",
          "You'll be evaluated on fluency, vocabulary, grammar, and pronunciation."
        ];
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{task.title}</CardTitle>
            <CardDescription className="mt-2">{task.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
          <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-300 flex items-center mb-3">
            <MicIcon className="mr-2 h-5 w-5" /> 
            {examType.toUpperCase()} Speaking Test Instructions
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-indigo-700 dark:text-indigo-300">
            {getExamInstructions().map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium flex items-center mb-2">
              <Clock className="mr-2 h-5 w-5" /> 
              Test Duration
            </h3>
            <p>This speaking practice will take approximately 10-15 minutes to complete.</p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium flex items-center mb-2">
              <Volume2 className="mr-2 h-5 w-5" /> 
              Audio Requirements
            </h3>
            <p>Make sure you're in a quiet environment with a working microphone.</p>
          </div>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
          <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300 flex items-center mb-2">
            <AlertCircle className="mr-2 h-5 w-5" /> 
            Important Notes
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-amber-700 dark:text-amber-400">
            <li>Permission to access your microphone will be requested when you start.</li>
            <li>Your responses will be recorded for evaluation and feedback.</li>
            <li>Try to speak clearly and at a natural pace.</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 dark:bg-gray-800 px-6 py-4 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Categories
        </Button>
        <Button onClick={onStart} className="bg-indigo">
          Start Practice 
        </Button>
      </CardFooter>
    </Card>
  );
};
