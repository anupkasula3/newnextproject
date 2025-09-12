
// Common types for all exam test sections
export type IeltsSection = 'listening' | 'reading' | 'writing' | 'speaking';
export type ToeflSection = 'listening' | 'reading' | 'writing' | 'speaking';
export type ToeflType = 'ibt' | 'pbt' | 'essentials' | 'itp';
export type QuestionType = 'multiple-choice' | 'fill-in-blank' | 'matching' | 'true-false' | 'essay' | 'speaking-prompt';

export interface IeltsOption {
  value: string;
  label: string;
}

export interface IeltsQuestion {
  id: string;
  number: number;
  text: string;
  type: QuestionType;
  options?: IeltsOption[];
  instruction?: string;
  maxWords?: number;
  correctAnswer: string;
  points?: number;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface IeltsPassage {
  id: string;
  title: string;
  text: string;
  questions: IeltsQuestion[];
}

export interface IeltsTask {
  id: string;
  title: string;
  description: string;
  section: IeltsSection;
  passages?: IeltsPassage[]; // For reading
  audioUrl?: string; // For listening
  questions?: IeltsQuestion[]; // For direct questions
  prompt?: string; // For writing/speaking
  duration: number; // in minutes
  totalQuestions?: number;
  createdAt: string;
  updatedAt: string;
}

// TOEFL specific types
export interface ToeflTask extends IeltsTask {
  toeflType: ToeflType;
}

// Admin section
export interface AdminIeltsTaskForm {
  title: string;
  description: string;
  section: IeltsSection;
  duration: number;
  passages?: IeltsPassage[];
  audioUrl?: string;
  questions?: IeltsQuestion[];
  prompt?: string;
}

export interface AdminToeflTaskForm extends AdminIeltsTaskForm {
  toeflType: ToeflType;
}
