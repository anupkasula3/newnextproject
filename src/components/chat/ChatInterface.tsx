import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Paperclip, Smile } from 'lucide-react';

interface ChatInterfaceProps {
  userType: 'teacher' | 'student';
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'teacher' | 'student';
  avatar?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userType }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: userType === 'teacher' ? 'Dr. Sarah Johnson' : 'Alex Chen',
      content: userType === 'teacher' 
        ? "Hello! I'm here to help with your IELTS preparation. What specific area would you like to work on today?"
        : "Hey everyone! Just finished a practice writing task. Anyone want to share tips for Task 1 Academic?",
      timestamp: new Date(Date.now() - 300000),
      type: userType,
      avatar: userType === 'teacher' ? '/teacher-avatar.jpg' : '/student-avatar.jpg'
    },
    {
      id: '2',
      sender: userType === 'teacher' ? 'Student Mike' : 'Emma Rodriguez',
      content: userType === 'teacher'
        ? "Hi Dr. Johnson! I'm struggling with Speaking Part 2. Could you give me some tips on how to structure my response?"
        : "Great question Alex! For Task 1, I always start by paraphrasing the question, then describe the overall trend before going into specifics.",
      timestamp: new Date(Date.now() - 240000),
      type: userType === 'teacher' ? 'student' : 'student'
    },
    {
      id: '3',
      sender: userType === 'teacher' ? 'Dr. Sarah Johnson' : 'David Kim',
      content: userType === 'teacher'
        ? "Absolutely! For Speaking Part 2, remember the 4-point structure: What, Where/When, Why, and How you feel about it. Use the 1-minute preparation time to jot down key points for each section."
        : "That's exactly what I do too! Also, don't forget to use linking words like 'furthermore', 'in addition', and 'however' to show coherence.",
      timestamp: new Date(Date.now() - 180000),
      type: userType
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userName = localStorage.getItem('userName') || 'You';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: userName,
        content: newMessage,
        timestamp: new Date(),
        type: 'student' // User is always a student in this context
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate response after a delay
      if (userType === 'teacher') {
        setIsTyping(true);
        setTimeout(() => {
          const teacherResponse: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'Dr. Sarah Johnson',
            content: getTeacherResponse(newMessage),
            timestamp: new Date(),
            type: 'teacher',
            avatar: '/teacher-avatar.jpg'
          };
          setMessages(prev => [...prev, teacherResponse]);
          setIsTyping(false);
        }, 2000);
      }
    }
  };

  const getTeacherResponse = (message: string): string => {
    const responses = [
      "That's a great question! Let me help you with that. For IELTS preparation, I recommend focusing on...",
      "I can see you're working hard on this. Here's a tip that many of my students find helpful...",
      "Excellent progress! To improve further, try practicing with these specific techniques...",
      "That's a common challenge many IELTS candidates face. Let me share some strategies...",
      "Good observation! The key to mastering this skill is consistent practice with feedback..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            {userType === 'teacher' ? 'Teacher Support Chat' : 'Student Study Group'}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{userType === 'teacher' ? '5 teachers' : '23 students'} online</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-sm">Teacher is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Smile className="h-4 w-4" />
            </Button>
            <Input
              placeholder={`Message ${userType === 'teacher' ? 'teacher' : 'students'}...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;