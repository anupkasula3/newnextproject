
import { Option } from './listening';

export interface ReadingQuestion {
  id: string;
  number: number;
  text: string;
  type: 'multiple-choice' | 'fill-in-blank' | 'matching' | 'true-false';
  options?: Option[];
  instruction?: string;
  maxWords?: number;
  correctAnswer: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  text: string;
  questions: ReadingQuestion[];
}

export interface ReadingTest {
  id: string;
  title: string;
  description: string;
  passages: ReadingPassage[];
  totalQuestions: number;
  duration: number; // in minutes
}
