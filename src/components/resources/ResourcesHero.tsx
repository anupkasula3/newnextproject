
import React from 'react';
import { Book, Download, Users, Award, FileText, Shield } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ResourcesHero = () => {
  const isMobile = useIsMobile();
  const isAdmin = sessionStorage.getItem('demoAdminLoggedIn') === 'true';
  
  const stats = [
    { icon: <FileText size={18} />, value: "500+", label: "Practice Materials" },
    { icon: <Download size={18} />, value: "50K+", label: "Downloads" },
    { icon: <Users size={18} />, value: "10K+", label: "Active Students" },
    { icon: <Award size={18} />, value: "98%", label: "Success Rate" },
  ];
  
  return (
    <div className="mb-8 md:mb-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-4 font-heading`}>
            <span className="rainbow-text">Premium Learning Resources</span>
          </h1>
          <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-gray-700 dark:text-gray-300 mb-6`}>
            Access our comprehensive collection of study materials, practice tests, 
            and learning guides designed by experts to help you achieve your target scores.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                  {stat.icon}
                  <span className="font-bold">{stat.value}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className={`flex flex-wrap ${isMobile ? 'gap-2' : 'gap-4'}`}>
            <Link to="/resources/all">
              <Button className={`gradient-bg text-white flex items-center gap-2 font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${isMobile ? 'px-4 py-2 text-sm' : ''}`}>
                <Book size={isMobile ? 16 : 20} />
                Browse All Resources
              </Button>
            </Link>
            <Button className={`colorful-border bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 font-medium rounded-lg transition-all ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'}`}>
              Recommended For You
            </Button>
            
            {isAdmin && (
              <Link to="/admin/resources">
                <Button variant="outline" className="flex items-center gap-2 ml-2">
                  <Shield size={16} />
                  Manage Resources
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-lg blur-md opacity-75"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1456513080867-f24142c9fa3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1673&q=80" 
                alt="Learning Resources" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="text-white">
                  <p className="font-bold">Get Started Today</p>
                  <p className="text-sm">Access premium study materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesHero;
