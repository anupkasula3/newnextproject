
export interface Option {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  number: number;
  text: string;
  type: 'multiple-choice' | 'fill-in-blank' | 'matching' | 'true-false';
  options?: Option[];
  instruction?: string;
  maxWords?: number;
  correctAnswer: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  questions: Question[];
}

export interface ListeningTest {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  totalQuestions: number;
  duration: number; // in minutes
}
