
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-24 pb-16 md:pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[20%] h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute top-[20%] -left-[10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] h-[300px] w-[300px] rounded-full bg-pink-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-300 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-purple-600 mr-2"></span>
              The Ultimate Exams Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Master <span className="highlight-text">IELTS, TOEFL, SAT, GRE, GMAT, PTE</span> and More with Precision and Confidence
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Practice all major language and academic exams with AI-powered feedback, progress tracking, and tailored practice to achieve your best score.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link to="/signup" className="btn-primary w-full sm:w-auto flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/practice" className="w-full sm:w-auto px-6 py-3 inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Explore Practice Tests
              </Link>
            </div>
            
            <div className="pt-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Trusted by over <span className="font-semibold text-gray-800 dark:text-gray-200">50,000+</span> students for IELTS, TOEFL, PTE, SAT, GRE, GMAT and beyond
              </p>
            </div>
          </div>
          
          {/* Hero Image/Illustration - Updated with new image */}
          <div className="w-full lg:w-1/2 animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-500/10 rounded-2xl transform rotate-3 scale-105"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                  alt="Students preparing for exams with technology" 
                  className="w-full h-auto"
                />
                
                {/* Floating Stats Card */}
                <div className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-xl flex items-center justify-between animate-float">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Your Progress</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">On track for your target score</p>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        className="w-2.5 h-10 rounded-full"
                        style={{ 
                          backgroundColor: i === 1 ? '#8B5CF6' : i === 2 ? '#06B6D4' : i === 3 ? '#EC4899' : '#E2E8F0',
                          height: `${i * 10}px`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 h-12 w-12 rounded-full bg-pink-500 animate-pulse-slow"></div>
              <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-cyan-500 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

