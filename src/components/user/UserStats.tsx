
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Zap, TrendingUp, Clock } from 'lucide-react';

const UserStats = () => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-purple-600" />
          Your Progress Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-gray-800 rounded-lg">
            <Target className="h-10 w-10 text-purple-600 mb-3" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">7.5</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Target Score</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-teal-50 dark:bg-gray-800 rounded-lg">
            <Zap className="h-10 w-10 text-teal-500 mb-3" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">6.8</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Current Level</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-pink-50 dark:bg-gray-800 rounded-lg">
            <Clock className="h-10 w-10 text-pink-500 mb-3" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">28</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Days to Exam</span>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Listening</span>
              <span className="text-sm font-medium">7.0</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Reading</span>
              <span className="text-sm font-medium">6.5</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Writing</span>
              <span className="text-sm font-medium">6.0</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="bg-pink-500 h-full rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Speaking</span>
              <span className="text-sm font-medium">7.5</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStats;
