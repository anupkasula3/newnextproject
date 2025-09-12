import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import StatisticsSection from '@/components/StatisticsSection';
import PerformanceTracker from '@/components/performance/PerformanceTracker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { BookOpen, Headphones, Edit, MessageSquare, ArrowRight, ChevronRight, BarChart3 } from 'lucide-react';

const examTypes = [
  {
    name: 'IELTS',
    description: 'International English Language Testing System',
    path: '/practice/ielts',
    gradient: 'from-indigo to-primary',
    icon: <BookOpen size={20} className="text-white" />
  },
  {
    name: 'TOEFL',
    description: 'Test of English as a Foreign Language',
    path: '/practice/toefl',
    gradient: 'from-teal to-cyan-600',
    icon: <Headphones size={20} className="text-white" />
  },
  {
    name: 'PTE',
    description: 'Pearson Test of English',
    path: '/practice/pte',
    gradient: 'from-purple to-magenta',
    icon: <Edit size={20} className="text-white" />
  },
  {
    name: 'GRE',
    description: 'Graduate Record Examination',
    path: '/practice/gre',
    gradient: 'from-orange to-coral',
    icon: <BookOpen size={20} className="text-white" />
  },
  {
    name: 'GMAT',
    description: 'Graduate Management Admission Test',
    path: '/practice/gmat',
    gradient: 'from-pink to-accent',
    icon: <BookOpen size={20} className="text-white" />
  },
  {
    name: 'SAT',
    description: 'Scholastic Assessment Test',
    path: '/practice/sat',
    gradient: 'from-coral to-orange',
    icon: <Edit size={20} className="text-white" />
  }
];

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Neplia | Language Learning Platform';
  }, []);

  const handleStartPreparation = () => {
    console.log('Start Preparation clicked, navigating to /practice');
    navigate('/practice');
  };

  return (
    <Layout>
      <HeroSection />
      
      {/* Start Your Journey Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-indigo-950/30">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent relative section-title">
              Start Your Journey
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
              Choose your exam and begin practicing with our specialized modules
            </p>
          </div>
          
          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-all duration-300 group glass-card">
              <CardContent className="pt-8 pb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo to-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Practice Tests</h3>
                <p className="text-muted-foreground mb-6 text-base">Start with targeted practice exercises</p>
                <Button asChild variant="outline" className="w-full h-12 text-base">
                  <Link to="/practice">Start Practice</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 group glass-card">
              <CardContent className="pt-8 pb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Help</h3>
                <p className="text-muted-foreground mb-6 text-base">Chat with teachers and students</p>
                <Button asChild variant="outline" className="w-full h-12 text-base">
                  <Link to="/chat">Join Chat</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 group glass-card">
              <CardContent className="pt-8 pb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple to-magenta rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
                <p className="text-muted-foreground mb-6 text-base">Monitor your improvement</p>
                <Button asChild variant="outline" className="w-full h-12 text-base">
                  <Link to="/dashboard">View Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Exam Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
            {examTypes.slice(0, 6).map((exam) => (
              <Card 
                key={exam.name} 
                className="exam-card group overflow-hidden glass-card shadow-glass hover:shadow-xl transition-all duration-300 animate-scale-in"
              >
                <CardHeader className={`bg-gradient-to-br ${exam.gradient} p-4 lg:p-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      {exam.icon}
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full text-xs text-white px-3 py-1">
                      Top
                    </div>
                  </div>
                  <CardTitle className="text-lg lg:text-xl xl:text-2xl font-bold text-white leading-tight">{exam.name}</CardTitle>
                  <CardDescription className="text-white/90 text-sm lg:text-base leading-tight">{exam.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 lg:p-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {['Reading', 'Writing', 'Speaking', 'Listening'].map((skill, index) => (
                        <span key={skill} className={`text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full ${index >= 2 ? 'hidden xl:inline-block' : ''}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="pt-2">
                      <Link to={exam.path} className="block w-full">
                        <Button 
                          className="w-full btn-primary text-sm lg:text-base font-medium group-hover:shadow-lg transform transition-all duration-300 flex justify-between items-center h-11 lg:h-12"
                        >
                          <span>Start Practice</span>
                          <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5 transform group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button 
              onClick={handleStartPreparation}
              className="inline-flex items-center px-8 py-4 rounded-lg btn-primary font-medium shadow-lg hover:shadow-xl transition-all text-lg h-14"
            >
              Start Your Preparation
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      <FeatureSection />
      
      <StatisticsSection />
      <TestimonialSection />
    </Layout>
  );
};

export default Index;
