
import { useToast } from "@/hooks/use-toast";

interface PerformanceData {
  userId: string;
  section: 'listening' | 'reading' | 'writing' | 'speaking';
  score: number;
  date: Date;
}

interface UserProgress {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  overall: number;
}

// Mock user ID - in a real app, this would come from auth
const DEMO_USER_ID = "demo-user-123";

// Simulate backend storage with localStorage
const saveProgress = (data: PerformanceData): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // Get existing progress data
      const existingDataString = localStorage.getItem('userProgressData');
      const existingData = existingDataString ? JSON.parse(existingDataString) : [];
      
      // Add new progress data
      existingData.push({
        ...data,
        id: `progress-${Date.now()}`, // Add a unique ID
        date: new Date().toISOString()
      });
      
      // Save back to localStorage
      localStorage.setItem('userProgressData', JSON.stringify(existingData));
      
      // Simulate network delay
      setTimeout(() => resolve(true), 800);
    } catch (error) {
      console.error("Error saving progress:", error);
      resolve(false);
    }
  });
};

// Get user progress data
export const getUserProgress = (userId: string = DEMO_USER_ID): Promise<UserProgress> => {
  return new Promise((resolve) => {
    try {
      // Get progress data from localStorage
      const progressDataString = localStorage.getItem('userProgressData');
      const progressData = progressDataString ? JSON.parse(progressDataString) : [];
      
      // Filter data for the current user
      const userProgressData = progressData.filter((item: any) => item.userId === userId);
      
      if (userProgressData.length === 0) {
        // Return default values if no data exists
        resolve({
          listening: 0,
          reading: 0,
          writing: 0,
          speaking: 0,
          overall: 0
        });
        return;
      }
      
      // Calculate average scores for each section
      const sections = ['listening', 'reading', 'writing', 'speaking'] as const;
      const results: Record<string, number[]> = {
        listening: [],
        reading: [],
        writing: [],
        speaking: []
      };
      
      // Group scores by section
      userProgressData.forEach((item: PerformanceData) => {
        if (results[item.section]) {
          results[item.section].push(item.score);
        }
      });
      
      // Calculate the average for each section
      const progress: UserProgress = {
        listening: 0,
        reading: 0,
        writing: 0,
        speaking: 0,
        overall: 0
      };
      
      // Calculate average for each section
      sections.forEach(section => {
        const scores = results[section];
        if (scores.length > 0) {
          const total = scores.reduce((sum, score) => sum + score, 0);
          progress[section] = Math.round(total / scores.length);
        }
      });
      
      // Calculate overall progress
      const sectionsWithData = sections.filter(section => progress[section] > 0);
      if (sectionsWithData.length > 0) {
        const totalScore = sectionsWithData.reduce((sum, section) => sum + progress[section], 0);
        progress.overall = Math.round(totalScore / sectionsWithData.length);
      }
      
      // Simulate network delay
      setTimeout(() => resolve(progress), 600);
    } catch (error) {
      console.error("Error fetching progress:", error);
      // Return default values if error occurs
      resolve({
        listening: 0,
        reading: 0,
        writing: 0,
        speaking: 0,
        overall: 0
      });
    }
  });
};

// Complete a section and record the score
export const completeSection = async (
  section: 'listening' | 'reading' | 'writing' | 'speaking',
  score: number,
  userId: string = DEMO_USER_ID
): Promise<boolean> => {
  // Validate score
  if (score < 0 || score > 100) {
    console.error("Invalid score. Score must be between 0 and 100");
    return false;
  }
  
  // Save progress data
  const performanceData: PerformanceData = {
    userId,
    section,
    score,
    date: new Date()
  };
  
  return await saveProgress(performanceData);
};

// Get all speaking test submissions for admin review
export const getSpeakingSubmissions = (): Promise<any[]> => {
  return new Promise((resolve) => {
    try {
      // Get progress data from localStorage
      const progressDataString = localStorage.getItem('userProgressData');
      const progressData = progressDataString ? JSON.parse(progressDataString) : [];
      
      // Filter speaking submissions
      const speakingSubmissions = progressData.filter((item: any) => item.section === 'speaking');
      
      // Mock questions for demo
      const mockQuestions = [
        "Describe a time when you had to learn something quickly. What was it and why did you need to learn it fast?",
        "Talk about your favorite book or movie. Why do you like it?",
        "Describe your hometown and what you like about it.",
        "What kind of technology do you use every day? How does it help you?"
      ];
      
      // Add mock response data if available
      const submissionsWithResponses = speakingSubmissions.map((submission: any, index: number) => {
        return {
          ...submission,
          id: submission.id || `submission-${Date.now()}-${index}`,
          userId: submission.userId,
          question: mockQuestions[index % mockQuestions.length],
          responseAudio: 'https://example.com/mock-audio.mp3', // Mock audio URL
          responseText: 'This is a mock transcription of the speaking response. In a real implementation, this would be the actual transcript of the student\'s spoken response to the IELTS speaking prompt. The transcript would be analyzed by the instructor to evaluate fluency, vocabulary usage, grammatical accuracy, and pronunciation.',
          reviewed: submission.reviewed || false
        };
      });
      
      // If there are no submissions, add a mock one for demonstration
      if (submissionsWithResponses.length === 0) {
        submissionsWithResponses.push({
          id: `demo-submission-${Date.now()}`,
          userId: "STU-2023-789",
          section: "speaking",
          score: 0, // Will be set by the reviewer
          date: new Date().toISOString(),
          question: mockQuestions[0],
          responseAudio: 'https://example.com/mock-audio.mp3',
          responseText: 'This is a demo speaking response for the IELTS test. In a real scenario, this would contain the transcription of the student\'s answer to the speaking prompt. The instructor would use this transcript along with the audio recording to evaluate the student\'s speaking skills according to the IELTS band descriptors.',
          reviewed: false
        });
      }
      
      // Simulate network delay
      setTimeout(() => resolve(submissionsWithResponses), 600);
    } catch (error) {
      console.error("Error fetching speaking submissions:", error);
      resolve([]);
    }
  });
};

// Save speaking review results
export const saveSpeakingReview = (
  submissionId: string,
  scores: {fluency: number, vocabulary: number, grammar: number, pronunciation: number},
  feedback: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // Get existing progress data
      const progressDataString = localStorage.getItem('userProgressData');
      const progressData = progressDataString ? JSON.parse(progressDataString) : [];
      
      // Update the submission with review data
      const updatedData = progressData.map((item: any) => {
        if (item.id === submissionId) {
          return {
            ...item,
            reviewed: true,
            reviewDate: new Date().toISOString(),
            scores,
            feedback,
            // Calculate overall score (average of the 4 criteria)
            overallScore: Object.values(scores).reduce((sum: number, score: number) => sum + score, 0) / 4
          };
        }
        return item;
      });
      
      // Save back to localStorage
      localStorage.setItem('userProgressData', JSON.stringify(updatedData));
      
      // Simulate network delay
      setTimeout(() => resolve(true), 800);
    } catch (error) {
      console.error("Error saving speaking review:", error);
      resolve(false);
    }
  });
};

// Use this hook in components to track user performance
export const useUserProgress = () => {
  const { toast } = useToast();
  
  const trackCompletion = async (
    section: 'listening' | 'reading' | 'writing' | 'speaking', 
    score: number
  ) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('demoUserLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your progress",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      const success = await completeSection(section, score);
      
      if (success) {
        let message = `Your ${section} exercise has been completed`;
        if (section === 'writing') {
          message += ". AI is evaluating your response.";
        } else if (section === 'speaking') {
          message += ". Results will be available within 2 hours.";
        }
        
        toast({
          title: "Progress Saved",
          description: message
        });
      }
      
      return success;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your progress",
        variant: "destructive"
      });
      return false;
    }
  };
  
  // Function to get demo login status
  const isDemoLoggedIn = (): boolean => {
    return localStorage.getItem('demoUserLoggedIn') === 'true';
  };
  
  // Function to toggle demo login
  const toggleDemoLogin = (): boolean => {
    const currentStatus = isDemoLoggedIn();
    localStorage.setItem('demoUserLoggedIn', (!currentStatus).toString());
    return !currentStatus;
  };
  
  return {
    trackCompletion,
    getUserProgress,
    getSpeakingSubmissions,
    saveSpeakingReview,
    isDemoLoggedIn,
    toggleDemoLogin
  };
};
