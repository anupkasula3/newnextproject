
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const stats = [
  { value: "30k+", label: "Active Users", icon: "👨‍🎓", color: "bg-gradient-to-br from-indigo-500 to-indigo-700" },
  { value: "500+", label: "Practice Tests", icon: "📝", color: "bg-gradient-to-br from-purple-500 to-purple-700" },
  { value: "95%", label: "Success Rate", icon: "🎯", color: "bg-gradient-to-br from-pink-500 to-pink-700" },
  { value: "24/7", label: "Support", icon: "🌟", color: "bg-gradient-to-br from-teal-500 to-teal-700" }
];

const StatisticsSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-6 py-10 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
              Join Thousands of Successful IELTS Test-Takers
            </h2>
            
            <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-4 gap-6 md:gap-8'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center ${isMobile ? 'w-14 h-14' : 'w-18 h-18'} mb-4 ${stat.color} backdrop-blur-sm rounded-full shadow-inner transform hover:scale-110 transition-all duration-300`}>
                    <span className="text-xl text-white font-bold">{stat.icon}</span>
                  </div>
                  <p className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-white mb-2`}>{stat.value}</p>
                  <p className="text-white/90 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
