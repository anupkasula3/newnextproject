
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  userId: string;
  username: string;
  type: 'speaking' | 'writing' | 'test';
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export function NotificationBadge() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const { toast } = useToast();

  // Simulate fetching notifications
  useEffect(() => {
    // This would be an API call in a real application
    const mockNotifications: Notification[] = [
      {
        id: '1',
        userId: 'user1',
        username: 'JohnDoe',
        type: 'speaking',
        message: 'John Doe has completed a speaking test and needs review',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        isRead: false,
      },
      {
        id: '2',
        userId: 'user2',
        username: 'JaneSmith',
        type: 'writing',
        message: 'Jane Smith has submitted a writing task for review',
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        isRead: false,
      },
      {
        id: '3',
        userId: 'user3',
        username: 'SamWilson',
        type: 'test',
        message: 'Sam Wilson has completed a full mock test',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        isRead: true,
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  const handleNotificationClick = (notificationId: string) => {
    // Mark notification as read
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
    
    // Update unread count
    setUnreadCount(prev => Math.max(0, prev - 1));
    
    // In a real app, navigate to the appropriate page or take other actions
    toast({
      title: "Notification opened",
      description: "You would normally be redirected to review the submission.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
    
    toast({
      title: "All notifications marked as read",
      description: "No new notifications.",
    });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffMins / 1440);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 px-2"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No notifications
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className={`cursor-pointer p-3 flex flex-col items-start gap-1 ${notification.isRead ? 'opacity-70' : 'bg-muted/40'}`}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex justify-between w-full">
                  <Badge variant={notification.isRead ? "outline" : "default"} className="capitalize">
                    {notification.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(notification.timestamp)}
                  </span>
                </div>
                <p className="text-sm">{notification.message}</p>
                <div className="text-xs text-muted-foreground">
                  From: {notification.username}
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-center">
              <Button variant="ghost" size="sm" className="w-full">
                View all notifications
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
