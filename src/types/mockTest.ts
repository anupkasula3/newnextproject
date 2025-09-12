
export interface MockTestSection {
  id: string;
  title: string;
  type: 'listening' | 'reading' | 'writing' | 'speaking';
  description: string;
  duration: number; // in minutes
  questions: MockTestQuestion[];
}

export interface MockTestQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'fill-in-blank' | 'essay' | 'speaking-prompt';
  options?: {
    id: string;
    text: string;
  }[];
  correctAnswer?: string;
  maxWords?: number;
}

export interface MockTest {
  id: string;
  title: string;
  description: string;
  sections: MockTestSection[];
  totalDuration: number; // in minutes
}

export interface MockTestResult {
  testId: string;
  userId?: string;
  date: string;
  sectionScores: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
  overallScore: number;
}
