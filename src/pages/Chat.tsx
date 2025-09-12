import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import UserIndicator from '@/components/chat/UserIndicator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, BookOpen, Brain, Star } from 'lucide-react';

const Chat = () => {
  const [activeChat, setActiveChat] = useState<'teacher' | 'student' | null>(null);
  const [onlineUsers, setOnlineUsers] = useState({
    teachers: 12,
    students: 247
  });

  const chatRooms = [
    {
      id: 'teacher-help',
      title: 'Teacher Support',
      description: 'Get help from certified IELTS instructors',
      type: 'teacher' as const,
      members: 45,
      icon: Brain,
      color: 'bg-blue-500',
      badge: 'Expert'
    },
    {
      id: 'study-group',
      title: 'Student Study Group',
      description: 'Connect with fellow IELTS candidates',
      type: 'student' as const,
      members: 128,
      icon: Users,
      color: 'bg-green-500',
      badge: 'Community'
    },
    {
      id: 'writing-help',
      title: 'Writing Task Help',
      description: 'Get feedback on your essays and reports',
      type: 'teacher' as const,
      members: 23,
      icon: BookOpen,
      color: 'bg-purple-500',
      badge: 'Feedback'
    },
    {
      id: 'speaking-practice',
      title: 'Speaking Practice Group',
      description: 'Practice speaking with other students',
      type: 'student' as const,
      members: 67,
      icon: MessageSquare,
      color: 'bg-orange-500',
      badge: 'Practice'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Study Chat</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with teachers and fellow students. Get help, share knowledge, and practice together.
            </p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm">{onlineUsers.teachers} Teachers Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">{onlineUsers.students} Students Online</span>
              </div>
            </div>
          </div>

          {activeChat ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <UserIndicator 
                  userType={activeChat} 
                  roomTitle={chatRooms.find(room => room.type === activeChat)?.title || ''}
                />
                <Button 
                  variant="outline" 
                  onClick={() => setActiveChat(null)}
                >
                  Back to Rooms
                </Button>
              </div>
              <ChatInterface userType={activeChat} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chatRooms.map((room) => (
                <Card 
                  key={room.id}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setActiveChat(room.type)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`rounded-lg p-3 ${room.color} text-white group-hover:scale-110 transition-transform`}>
                        <room.icon className="h-6 w-6" />
                      </div>
                      <Badge variant={room.type === 'teacher' ? 'default' : 'secondary'}>
                        {room.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{room.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{room.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{room.members} members</span>
                      </div>
                      {room.type === 'teacher' && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">4.9</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!activeChat && (
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Chat Guidelines</h3>
                    <div className="text-sm text-muted-foreground space-y-2 max-w-2xl mx-auto">
                      <p>• <strong>Teacher Rooms:</strong> Ask questions about IELTS techniques, get feedback on your work, and receive expert guidance.</p>
                      <p>• <strong>Student Rooms:</strong> Practice with peers, share study tips, and motivate each other.</p>
                      <p>• <strong>Be Respectful:</strong> Maintain a positive and supportive environment for everyone.</p>
                      <p>• <strong>Stay On Topic:</strong> Keep discussions related to IELTS preparation and English learning.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chat;