
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNavigation from './BottomNavigation';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950/30 dark:to-purple-950/20">
      <Navbar />
      <main className={`flex-grow ${isMobile ? 'pt-16 px-3 pb-20' : 'pt-20 pb-4'}`}>
        {children}
      </main>
      <Footer className={isMobile ? 'mb-16' : ''} />
      <BottomNavigation />
    </div>
  );
};

export default Layout;
