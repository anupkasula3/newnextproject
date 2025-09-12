
export interface SpeakingQuestion {
  id: string;
  part: 1 | 2 | 3;
  text: string;
  duration?: number; // in seconds
  preparation?: number; // in seconds for Part 2
  notes?: string;
  followUp?: string[];
  category?: string; // Added category field
}

export interface SpeakingTask {
  id: string;
  title: string;
  description: string;
  questions: SpeakingQuestion[];
  category: string; // Added category field
}

export interface SpeakingResponse {
  questionId: string;
  audioUrl: string;
  duration: number;
  submittedAt: Date;
}

export interface SpeakingSubmission {
  id: string;
  userId: string;
  taskId: string;
  responses: SpeakingResponse[];
  status: 'pending' | 'reviewed';
  submittedAt: Date;
  score?: {
    fluency: number;
    vocabulary: number;
    grammar: number;
    pronunciation: number;
    overall: number;
    feedback?: string;
  };
  reviewedAt?: Date;
  reviewedBy?: string;
}

// Categories for speaking practice
export type SpeakingCategory = 
  | 'family' 
  | 'work' 
  | 'education' 
  | 'hobbies' 
  | 'hometown' 
  | 'travel' 
  | 'technology' 
  | 'environment'
  | 'health'
  | 'food';
