import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Headphones, MessageSquare, Edit, BarChart3, Calendar, CheckCircle2, Award, Users, Shield, BookMarked, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const IeltsPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
                IELTS Preparation
              </span>
              <h1 className={`font-bold tracking-tight mb-6 ${isMobile ? 'text-3xl' : 'text-4xl md:text-6xl'}`}>
                Master the <span className="text-indigo">IELTS</span> with Confidence
              </h1>
              <p className={`text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 ${isMobile ? 'text-base' : 'text-xl'}`}>
                Comprehensive preparation for both Academic and General Training IELTS tests with tailored resources for your target score and country.
              </p>
              
              {isMobile ? (
                <div className="flex flex-col items-center justify-center gap-3">
                  <Link to="/selection?exam=ielts-academic" className="w-full">
                    <Button size="lg" className="bg-indigo hover:bg-indigo/90 text-white rounded-lg w-full py-5">
                      Start IELTS Academic
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/selection?exam=ielts-general" className="w-full">
                    <Button variant="outline" size="lg" className="rounded-lg w-full py-5">
                      Start IELTS General
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-row items-center justify-center gap-4">
                  <Link to="/selection?exam=ielts-academic">
                    <Button size="lg" className="bg-indigo hover:bg-indigo/90 text-white rounded-lg px-6 py-6 h-auto">
                      Start IELTS Academic
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/selection?exam=ielts-general">
                    <Button variant="outline" size="lg" className="rounded-lg px-6 py-6 h-auto">
                      Start IELTS General
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>

            <div className={`grid grid-cols-2 ${isMobile ? 'gap-3 mb-8' : 'md:grid-cols-4 gap-6 mb-12'} text-center`}>
              {[
                { label: "Success Rate", value: "92%" },
                { label: "Band 7+ Students", value: "10K+" },
                { label: "Practice Tests", value: "500+" },
                { label: "Countries", value: "40+" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 md:p-4 border border-gray-100 dark:border-gray-700 ${isMobile && index >= 2 ? 'col-span-1' : ''}`}
                >
                  <div className={`font-bold text-indigo mb-1 ${isMobile ? 'text-xl md:text-2xl' : 'text-3xl'}`}>{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`font-bold mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>IELTS Test Modules</h2>
            <p className={`text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${isMobile ? 'text-base' : 'text-lg'}`}>
              Prepare for all four IELTS test components with our specialized modules.
            </p>
          </div>

          {isMobile ? (
            <div className="space-y-4 max-w-md mx-auto">
              {[
                {
                  title: "Listening",
                  description: "Improve your listening skills with authentic IELTS-style audio recordings",
                  icon: Headphones,
                  color: "bg-indigo",
                  link: "/practice/listening"
                },
                {
                  title: "Reading",
                  description: "Enhance your reading comprehension with timed practice passages",
                  icon: BookOpen,
                  color: "bg-teal-600",
                  link: "/practice/reading"
                },
                {
                  title: "Writing",
                  description: "Master both Task 1 and Task 2 with expert guidance and feedback",
                  icon: Edit,
                  color: "bg-coral",
                  link: "/practice/writing"
                },
                {
                  title: "Speaking",
                  description: "Develop your spoken English skills for all three parts of the interview",
                  icon: MessageSquare,
                  color: "bg-indigo-800",
                  link: "/practice/speaking"
                }
              ].map((module, index) => (
                <Link key={index} to={module.link} className="block">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center p-4">
                      <div className={`${module.color} text-white rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0`}>
                        <module.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">{module.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{module.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-indigo ml-auto flex-shrink-0" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Listening",
                  description: "Improve your listening skills with authentic IELTS-style audio recordings",
                  icon: Headphones,
                  color: "bg-indigo",
                  link: "/practice/listening"
                },
                {
                  title: "Reading",
                  description: "Enhance your reading comprehension with timed practice passages",
                  icon: BookOpen,
                  color: "bg-teal-600",
                  link: "/practice/reading"
                },
                {
                  title: "Writing",
                  description: "Master both Task 1 and Task 2 with expert guidance and feedback",
                  icon: Edit,
                  color: "bg-coral",
                  link: "/practice/writing"
                },
                {
                  title: "Speaking",
                  description: "Develop your spoken English skills for all three parts of the interview",
                  icon: MessageSquare,
                  color: "bg-indigo-800",
                  link: "/practice/speaking"
                }
              ].map((module, index) => (
                <Link key={index} to={module.link} className="block">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 h-full"
                  >
                    <div className={`${module.color} h-2 w-full`}></div>
                    <div className="p-6">
                      <div className={`${module.color} text-white rounded-full h-12 w-12 flex items-center justify-center mb-4`}>
                        <module.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{module.description}</p>
                      <div className="mt-4 text-indigo text-sm font-medium flex items-center">
                        Start Practice <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Band Score Section - Mobile version is simplified */}
      <section className="py-10 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`font-bold mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>IELTS Band Scores</h2>
            <p className={`text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${isMobile ? 'text-base' : 'text-lg'}`}>
              Understand what each band score means and what you need to achieve for your goals.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {isMobile ? (
              <div className="space-y-4">
                {[
                  {
                    band: "Bands 5-6",
                    title: "Moderate User",
                    description: "Partial command of the language, can handle basic communication in your own field",
                    color: "border-yellow-400 dark:border-yellow-500"
                  },
                  {
                    band: "Bands 6.5-7.5",
                    title: "Good User",
                    description: "Generally effective command of the language despite inaccuracies and misunderstandings",
                    color: "border-indigo dark:border-indigo-400"
                  },
                  {
                    band: "Bands 8-9",
                    title: "Expert User",
                    description: "Complete operational command of the language with only occasional unsystematic inaccuracies",
                    color: "border-green-500 dark:border-green-400"
                  }
                ].map((bandLevel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border-l-4 ${bandLevel.color}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-lg font-bold">{bandLevel.band}</div>
                      <div className="text-md font-medium">{bandLevel.title}</div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{bandLevel.description}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    band: "Bands 5-6",
                    title: "Moderate User",
                    description: "Partial command of the language, can handle basic communication in your own field",
                    color: "border-yellow-400 dark:border-yellow-500"
                  },
                  {
                    band: "Bands 6.5-7.5",
                    title: "Good User",
                    description: "Generally effective command of the language despite inaccuracies and misunderstandings",
                    color: "border-indigo dark:border-indigo-400"
                  },
                  {
                    band: "Bands 8-9",
                    title: "Expert User",
                    description: "Complete operational command of the language with only occasional unsystematic inaccuracies",
                    color: "border-green-500 dark:border-green-400"
                  }
                ].map((bandLevel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-t-4 ${bandLevel.color}`}
                  >
                    <div className="text-xl font-bold mb-1">{bandLevel.band}</div>
                    <div className="text-lg font-medium mb-2">{bandLevel.title}</div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{bandLevel.description}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Country scores - mobile friendly */}
            <div className={`mt-8 md:mt-12 bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700`}>
              <h3 className={`font-bold mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>Required Scores by Country</h3>
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 md:grid-cols-4 gap-4'}`}>
                {[
                  { country: "Australia", score: "6.0-7.0" },
                  { country: "Canada", score: "6.0-7.0" },
                  { country: "UK", score: "5.5-7.0" },
                  { country: "USA", score: "6.0-7.0" },
                  { country: "New Zealand", score: "5.5-6.5" },
                  { country: "Singapore", score: "6.5-7.0" },
                  { country: "Germany", score: "6.5-7.0" },
                  { country: "Ireland", score: "6.0-6.5" }
                ].map((countryScore, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg ${isMobile ? 'bg-gray-50 dark:bg-gray-800' : ''}`}>
                    <span className="font-medium">{countryScore.country}</span>
                    <span className="text-indigo font-bold">{countryScore.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned for mobile */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`font-bold mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Our IELTS Prep Features</h2>
            <p className={`text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${isMobile ? 'text-base' : 'text-lg'}`}>
              Everything you need to achieve your target band score.
            </p>
          </div>

          {isMobile ? (
            <div className="space-y-3 max-w-md mx-auto">
              {[
                {
                  title: "Full-Length Mock Tests",
                  description: "Realistic practice tests with timed sections and official-style questions",
                  icon: Calendar
                },
                {
                  title: "AI-Powered Feedback",
                  description: "Instant feedback on your speaking and writing with detailed improvement suggestions",
                  icon: MessageSquare
                },
                {
                  title: "Performance Analytics",
                  description: "Track your progress over time with detailed performance insights",
                  icon: BarChart3
                },
                {
                  title: "Expert Study Plans",
                  description: "Personalized study plans based on your target band score and timeline",
                  icon: BookMarked
                },
                {
                  title: "Community Support",
                  description: "Connect with fellow test-takers to share tips and strategies",
                  icon: Users
                },
                {
                  title: "Band Score Guarantee",
                  description: "Achieve your target band score or get an extended premium subscription for free",
                  icon: Shield
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start">
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 h-10 w-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-indigo" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Full-Length Mock Tests",
                  description: "Realistic practice tests with timed sections and official-style questions",
                  icon: Calendar
                },
                {
                  title: "AI-Powered Feedback",
                  description: "Instant feedback on your speaking and writing with detailed improvement suggestions",
                  icon: MessageSquare
                },
                {
                  title: "Performance Analytics",
                  description: "Track your progress over time with detailed performance insights",
                  icon: BarChart3
                },
                {
                  title: "Expert Study Plans",
                  description: "Personalized study plans based on your target band score and timeline",
                  icon: BookMarked
                },
                {
                  title: "Community Support",
                  description: "Connect with fellow test-takers to share tips and strategies",
                  icon: Users
                },
                {
                  title: "Band Score Guarantee",
                  description: "Achieve your target band score or get an extended premium subscription for free",
                  icon: Shield
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-indigo" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Updated CTA Section without authentication */}
      <section className={`py-10 md:py-16 ${isMobile ? 'bg-indigo' : 'bg-gradient-to-r from-indigo to-indigo-600'} text-white`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`font-bold mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Ready to Ace Your IELTS?</h2>
            <p className={`opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto ${isMobile ? 'text-base' : 'text-xl'}`}>
              Start your IELTS preparation journey with our comprehensive practice materials.
            </p>
            
            {isMobile ? (
              <div className="space-y-3">
                <Link to="/selection?exam=ielts-academic" className="block">
                  <Button size="lg" className="bg-white text-indigo hover:bg-gray-100 rounded-lg w-full py-5">
                    Start Practice Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <div className="flex flex-col space-y-2 mt-6">
                  {[
                    { label: "Practice Materials", icon: BookMarked },
                    { label: "Mock Tests", icon: CheckCircle2 },
                    { label: "Instant Feedback", icon: BarChart3 }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center justify-center">
                      <feature.icon className="h-4 w-4 mr-2 text-white opacity-90" />
                      <span className="text-sm font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <Link to="/selection?exam=ielts-academic">
                  <Button size="lg" className="bg-white text-indigo hover:bg-gray-100 rounded-lg px-6 py-6 h-auto">
                    Start Practice Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <div className="mt-8 flex items-center justify-center space-x-8">
                  {[
                    { label: "Practice Materials", icon: BookMarked },
                    { label: "Mock Tests", icon: CheckCircle2 },
                    { label: "Instant Feedback", icon: BarChart3 }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <feature.icon className="h-5 w-5 mr-2 text-white opacity-90" />
                      <span className="text-sm font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IeltsPage;
