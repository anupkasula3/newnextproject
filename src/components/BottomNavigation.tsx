import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, MessageSquare, User, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const bottomNavItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Practice', path: '/practice', icon: BookOpen },
  { name: 'Tests', path: '/practice/mock-test', icon: Trophy },
  { name: 'Chat', path: '/chat', icon: MessageSquare },
  { name: 'Profile', path: '/dashboard', icon: User },
];

const BottomNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isLoggedIn = localStorage.getItem('demoUserLoggedIn') === 'true';
  const isGuest = localStorage.getItem('userName') === 'Guest' && !isLoggedIn;
  const isUserActive = isLoggedIn || isGuest;

  // Only show on mobile and not on admin pages
  if (!isMobile || location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-border/50 shadow-lg safe-area-pb">
      <div className="grid grid-cols-5 h-16 max-w-screen-sm mx-auto">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === '/practice' && location.pathname.startsWith('/practice'));
          
          // Show login for profile if not logged in
          const targetPath = item.name === 'Profile' && !isUserActive ? '/login' : item.path;
          
          return (
            <Link
              key={item.name}
              to={targetPath}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95",
                "min-h-[64px] px-2 py-1.5",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground active:text-primary"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive && "text-primary"
              )} />
              <span className={cn(
                "text-xs font-medium transition-colors truncate",
                isActive && "text-primary"
              )}>
                {item.name}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;