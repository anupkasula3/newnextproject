
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UserCourseProgress = () => {
  const courses = [
    {
      title: "IELTS Academic Writing Task 1",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      lastActivity: "2 days ago"
    },
    {
      title: "Advanced Listening Strategies",
      progress: 40,
      totalLessons: 10,
      completedLessons: 4,
      lastActivity: "1 week ago"
    },
    {
      title: "Speaking Confidence Builder",
      progress: 20,
      totalLessons: 15,
      completedLessons: 3,
      lastActivity: "3 days ago"
    }
  ];

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Book className="mr-2 h-5 w-5 text-purple-600" />
          Your Learning Paths
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {courses.map((course, index) => (
            <div key={index} className="border border-muted rounded-lg p-4 hover:border-purple-600 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium">{course.title}</h3>
                <span className="text-sm text-muted-foreground">{course.lastActivity}</span>
              </div>
              
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full rounded-full ${index % 3 === 0 ? 'bg-purple-600' : index % 3 === 1 ? 'bg-teal-500' : 'bg-pink-500'}`} 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground flex items-center">
                  <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
                <span className="text-sm font-medium">{course.progress}% complete</span>
              </div>
              
              <Button size="sm" variant="outline" className="w-full">Continue Learning</Button>
            </div>
          ))}
          
          <Button variant="ghost" className="w-full border border-dashed border-muted hover:border-purple-600">
            Explore More Courses
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCourseProgress;
