import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'teacher' | 'student';
  avatar?: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isCurrentUser = message.sender === (localStorage.getItem('userName') || 'You');
  
  return (
    <div className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
      <Avatar className="w-8 h-8">
        <AvatarImage src={message.avatar} />
        <AvatarFallback className={`text-xs ${
          message.type === 'teacher' 
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
            : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
        }`}>
          {message.sender.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex-1 max-w-xs md:max-w-md ${isCurrentUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
          <span className="text-sm font-medium">{message.sender}</span>
          {message.type === 'teacher' && (
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              Teacher
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
        </div>
        
        <div className={`rounded-lg px-3 py-2 text-sm ${
          isCurrentUser
            ? 'bg-primary text-primary-foreground ml-4'
            : message.type === 'teacher'
            ? 'bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100 mr-4'
            : 'bg-muted mr-4'
        }`}>
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;