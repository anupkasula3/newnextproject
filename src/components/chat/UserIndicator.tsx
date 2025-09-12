import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, MessageSquare } from 'lucide-react';

interface UserIndicatorProps {
  userType: 'teacher' | 'student';
  roomTitle: string;
}

const UserIndicator: React.FC<UserIndicatorProps> = ({ userType, roomTitle }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`rounded-full p-2 ${
        userType === 'teacher' 
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      }`}>
        {userType === 'teacher' ? (
          <GraduationCap className="h-5 w-5" />
        ) : (
          <Users className="h-5 w-5" />
        )}
      </div>
      
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{roomTitle}</h2>
          <Badge variant={userType === 'teacher' ? 'default' : 'secondary'}>
            {userType === 'teacher' ? 'Expert Chat' : 'Study Group'}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          {userType === 'teacher' 
            ? 'Get expert help from certified IELTS instructors'
            : 'Connect and study with fellow IELTS candidates'
          }
        </p>
      </div>
    </div>
  );
};

export default UserIndicator;