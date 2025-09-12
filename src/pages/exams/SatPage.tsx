import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, BookOpen, BarChart3, Clock, CheckCircle2, Award, Brain, Sigma, FileText, PenTool, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const SatPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
                SAT Preparation
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Ace the <span className="text-blue-600">SAT</span> With Confidence
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Comprehensive preparation for both Math and English sections of the SAT with personalized study plans.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/selection?exam=sat">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-6 h-auto">
                    Start SAT Preparation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/practice/mock-test?type=sat">
                  <Button variant="outline" size="lg" className="rounded-lg px-6 py-6 h-auto">
                    Take Practice Test
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
              {[
                { label: "Average Score Increase", value: "200+" },
                { label: "1400+ Score Students", value: "5K+" },
                { label: "Practice Tests", value: "240+" },
                { label: "College Admissions", value: "1,000+" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SAT-Specific Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">SAT Test Sections</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master both the Math and English sections of the SAT with our specialized preparation modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Mathematics",
                description: "Comprehensive preparation for algebra, problem solving, data analysis, and advanced math concepts",
                icon: Calculator,
                color: "bg-blue-600",
                subsections: [
                  {
                    title: "Algebra",
                    description: "Linear equations, inequalities, functions",
                    icon: Sigma
                  },
                  {
                    title: "Problem Solving & Data Analysis",
                    description: "Quantitative reasoning and interpreting data",
                    icon: BarChart3
                  },
                  {
                    title: "Advanced Math",
                    description: "Quadratics, functions, and complex equations",
                    icon: Brain
                  }
                ],
                link: "/practice/sat/math"
              },
              {
                title: "Evidence-Based Reading & Writing",
                description: "Develop critical reading skills and improve your writing with focused practice on grammar and comprehension",
                icon: BookOpen,
                color: "bg-indigo",
                subsections: [
                  {
                    title: "Reading Comprehension",
                    description: "Analyze passages from various disciplines",
                    icon: FileText
                  },
                  {
                    title: "Writing & Language",
                    description: "Grammar, expression, and rhetorical skills",
                    icon: PenTool
                  },
                  {
                    title: "Vocabulary in Context",
                    description: "Understanding words in their textual context",
                    icon: BookOpen
                  }
                ],
                link: "/practice/sat/reading"
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700"
              >
                <div className={`${section.color} h-2 w-full`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`${section.color} text-white rounded-full h-12 w-12 flex items-center justify-center mr-4`}>
                      <section.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">{section.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {section.description}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {section.subsections.map((subsection, i) => (
                      <div key={i} className="flex items-start bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-3">
                          <subsection.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{subsection.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subsection.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Link to={section.link}>
                    <Button className={`w-full ${section.color} hover:opacity-90 text-white`}>
                      Start {section.title} Practice
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Score Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">SAT Score Ranges</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understand what your target score means and what you need to achieve for your dream colleges.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  range: "1000-1200",
                  title: "Moderate",
                  description: "Sufficient for many state universities and colleges",
                  color: "border-yellow-400 dark:border-yellow-500"
                },
                {
                  range: "1200-1400",
                  title: "Competitive",
                  description: "Suitable for many selective colleges and universities",
                  color: "border-blue-600 dark:border-blue-400"
                },
                {
                  range: "1400-1600",
                  title: "Highly Competitive",
                  description: "Gives you a strong chance at Ivy League and elite institutions",
                  color: "border-green-500 dark:border-green-400"
                }
              ].map((scoreLevel, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-t-4 ${scoreLevel.color}`}
                >
                  <div className="text-xl font-bold mb-1">{scoreLevel.range}</div>
                  <div className="text-lg font-medium mb-2">{scoreLevel.title}</div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{scoreLevel.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our SAT Prep Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to achieve your target SAT score.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Focused Subject Drills",
                description: "Target specific math concepts and reading/writing skills with custom practice sets",
                icon: Brain
              },
              {
                title: "Full-Length Practice Tests",
                description: "Take timed tests that mirror the exact format of the real SAT",
                icon: Clock
              },
              {
                title: "Performance Analytics",
                description: "Detailed insights into your strengths and weaknesses in each section",
                icon: BarChart3
              },
              {
                title: "Strategy Lessons",
                description: "Learn proven techniques to maximize your score in each section",
                icon: BookOpen
              },
              {
                title: "Personalized Study Plans",
                description: "Custom study schedules based on your current level and test date",
                icon: Calendar
              },
              {
                title: "Score Guarantee",
                description: "Improve your score by at least 100 points or get an extended subscription for free",
                icon: Award
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-blue-50 dark:bg-blue-900/30 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Boost Your SAT Score?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who achieved their dream scores with Neplia.
            </p>
            <Link to="/selection?exam=sat">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-lg px-6 py-6 h-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="mt-8 flex items-center justify-center space-x-8">
              {[
                { label: "7-Day Free Trial", icon: Clock },
                { label: "Expert Support", icon: Award },
                { label: "100+ Point Guarantee", icon: CheckCircle2 }
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <feature.icon className="h-5 w-5 mr-2 text-white opacity-90" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SatPage;
