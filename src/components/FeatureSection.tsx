
import React from 'react';
import { Headphones, BookOpen, Edit, MessageSquare, BarChart3, Calendar, ArrowRight, CheckCircle, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const examFeatures = [
  {
    title: "IELTS Academic",
    description: "Perfect for university admission and professional registration abroad",
    icon: "🎓",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    skills: ["Listening", "Reading", "Writing", "Speaking"],
    path: "/exams/ielts",
    color: "from-indigo-600 to-indigo-800"
  },
  {
    title: "PTE Academic",
    description: "Computer-based test accepted by thousands of universities globally",
    icon: "💻",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    skills: ["Speaking & Writing", "Reading", "Listening"],
    path: "/exams/pte",
    color: "from-teal-500 to-teal-700"
  },
  {
    title: "TOEFL",
    description: "Recognized by more than 11,000 universities in 150+ countries",
    icon: "🌎",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    skills: ["Reading", "Listening", "Speaking", "Writing"],
    path: "/exams/toefl",
    color: "from-purple-600 to-purple-800"
  },
  {
    title: "SAT",
    description: "Standard test for college admissions in the United States",
    icon: "📝",
    image: "https://images.unsplash.com/photo-1585432959315-d9342fd58eb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    skills: ["Reading", "Writing & Language", "Math", "Essay (Optional)"],
    path: "/exams/sat",
    color: "from-pink-500 to-pink-700"
  }
];

const additionalFeatures = [
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visualize your improvement with detailed analytics and performance insights.",
    color: "bg-gradient-to-br from-cyan-500 to-cyan-700 text-white",
    delay: 0.5
  },
  {
    icon: Calendar,
    title: "Study Planning",
    description: "Get personalized study schedules tailored to your target test date.",
    color: "bg-gradient-to-br from-orange-500 to-orange-700 text-white",
    delay: 0.6
  }
];

const FeatureAnimation = ({ children, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

const FeatureSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute top-1/4 -right-24 w-80 h-80 bg-teal-200 dark:bg-teal-900/20 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/20 rounded-full opacity-30 blur-3xl"></div>
        </div>

        <div className="relative">
          <FeatureAnimation delay={0}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Complete Preparation Suite
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Choose Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Exam Path</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                Select from our comprehensive range of exam preparation courses tailored to your needs
              </p>
            </div>
          </FeatureAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {examFeatures.map((exam, index) => (
              <FeatureAnimation key={index} delay={index * 0.1}>
                <Link to={exam.path} className="block">
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                    <div className="absolute inset-0 w-full h-full">
                      <img 
                        src={exam.image} 
                        alt={exam.title} 
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-b ${exam.color} opacity-80`}></div>
                    </div>
                    
                    <div className="relative p-8 text-white h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center mb-4">
                          <span className="text-3xl mr-3">{exam.icon}</span>
                          <h3 className="text-2xl font-bold">{exam.title}</h3>
                        </div>
                        <p className="text-white/90 mb-6">{exam.description}</p>
                        
                        <div className="space-y-2">
                          <p className="font-semibold flex items-center">
                            <Award className="h-4 w-4 mr-2" />
                            Key Skills Tested
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {exam.skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="mt-8 bg-white text-gray-900 hover:bg-white/90 self-start"
                      >
                        Start Preparation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </FeatureAnimation>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {additionalFeatures.map((feature, index) => (
              <FeatureAnimation key={index} delay={feature.delay}>
                <div className={`${feature.color} rounded-xl overflow-hidden shadow-xl p-6`}>
                  <div className="rounded-full bg-white/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/90">{feature.description}</p>
                </div>
              </FeatureAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
