
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type PracticeLimitStats = {
  practiceCount: number;
  lastReset: string;
  isPremium: boolean;
};

// Maximum number of free practice attempts per day
const FREE_PRACTICE_LIMIT = 5;

export const usePracticeLimit = () => {
  const [stats, setStats] = useState<PracticeLimitStats>({
    practiceCount: 0,
    lastReset: new Date().toISOString(),
    isPremium: false
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadStats = () => {
      const storedStats = localStorage.getItem('practiceLimitStats');
      if (storedStats) {
        const parsedStats = JSON.parse(storedStats) as PracticeLimitStats;
        
        // Check if reset is needed (24h passed since last reset)
        const lastReset = new Date(parsedStats.lastReset);
        const now = new Date();
        const hoursPassed = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);
        
        if (hoursPassed >= 24) {
          // Reset counter
          const resetStats = {
            practiceCount: 0,
            lastReset: now.toISOString(),
            isPremium: parsedStats.isPremium
          };
          localStorage.setItem('practiceLimitStats', JSON.stringify(resetStats));
          setStats(resetStats);
        } else {
          setStats(parsedStats);
        }
      }
    };

    loadStats();
  }, []);

  const incrementPracticeCount = () => {
    const updatedCount = stats.practiceCount + 1;
    const updatedStats = { ...stats, practiceCount: updatedCount };
    
    localStorage.setItem('practiceLimitStats', JSON.stringify(updatedStats));
    setStats(updatedStats);

    if (!stats.isPremium && updatedCount >= FREE_PRACTICE_LIMIT) {
      toast({
        title: "Practice Limit Reached",
        description: "You've reached your daily practice limit. Upgrade to premium for unlimited practice or wait 24 hours.",
        variant: "destructive",
        duration: 8000,
      });
      
      return false;
    }
    
    return true;
  };

  const canPractice = () => {
    return stats.isPremium || stats.practiceCount < FREE_PRACTICE_LIMIT;
  };

  const resetCounter = () => {
    const resetStats = {
      practiceCount: 0,
      lastReset: new Date().toISOString(),
      isPremium: stats.isPremium
    };
    localStorage.setItem('practiceLimitStats', JSON.stringify(resetStats));
    setStats(resetStats);
  };

  return {
    practiceCount: stats.practiceCount,
    isPremium: stats.isPremium,
    canPractice,
    incrementPracticeCount,
    resetCounter,
    practicesLeft: FREE_PRACTICE_LIMIT - stats.practiceCount
  };
};
