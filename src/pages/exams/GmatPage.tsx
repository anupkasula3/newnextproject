
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Calculator, Lightbulb, PieChart, BarChart3, Calendar, CheckCircle2, Award, Users, Shield, BookMarked } from 'lucide-react';
import { motion } from 'framer-motion';

const GmatPage = () => {
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
                GMAT Preparation
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Master the <span className="text-indigo">GMAT</span> with Precision
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Comprehensive preparation for the Graduate Management Admission Test with tailored resources for your target business school.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/selection?exam=gmat">
                  <Button size="lg" className="bg-indigo hover:bg-indigo/90 text-white rounded-lg px-6 py-6 h-auto">
                    Start GMAT Preparation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/practice/mock-test">
                  <Button variant="outline" size="lg" className="rounded-lg px-6 py-6 h-auto">
                    Take Practice Test
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
              {[
                { label: "Success Rate", value: "93%" },
                { label: "700+ Students", value: "7K+" },
                { label: "Practice Tests", value: "350+" },
                { label: "Business Schools", value: "150+" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-3xl font-bold text-indigo mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">GMAT Test Sections</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Prepare for all GMAT test components with our specialized modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Quantitative Reasoning",
                description: "Master problem-solving and data sufficiency questions",
                icon: Calculator,
                color: "bg-teal-600",
                link: "/admin/exams/gmat/quantitative"
              },
              {
                title: "Verbal Reasoning",
                description: "Improve reading comprehension, critical reasoning, and sentence correction",
                icon: BookOpen,
                color: "bg-indigo-800",
                link: "/admin/exams/gmat/verbal"
              },
              {
                title: "Integrated Reasoning",
                description: "Learn to analyze and evaluate information from multiple sources",
                icon: PieChart,
                color: "bg-purple-600",
                link: "/admin/exams/gmat/integrated"
              },
              {
                title: "Analytical Writing",
                description: "Develop skills to analyze arguments and articulate critiques",
                icon: Lightbulb,
                color: "bg-coral",
                link: "/admin/exams/gmat/analytical"
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
        </div>
      </section>

      {/* Score Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">GMAT Score Range</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understand what each score means and what you need to achieve for your target business schools.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  score: "200-550",
                  title: "Below Average",
                  description: "May be sufficient for some business programs, but challenging for competitive schools",
                  color: "border-yellow-400 dark:border-yellow-500"
                },
                {
                  score: "550-650",
                  title: "Average to Good",
                  description: "Competitive for many MBA programs, shows solid understanding of content",
                  color: "border-indigo dark:border-indigo-400"
                },
                {
                  score: "650-800",
                  title: "Excellent",
                  description: "Highly competitive for top business schools, demonstrates mastery of content",
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
                  <div className="text-xl font-bold mb-1">{scoreLevel.score}</div>
                  <div className="text-lg font-medium mb-2">{scoreLevel.title}</div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{scoreLevel.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Required Scores by Business School Tier</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { school: "Harvard Business School", score: "720-730" },
                  { school: "Stanford GSB", score: "720-730" },
                  { school: "Wharton", score: "720-730" },
                  { school: "Chicago Booth", score: "710-720" },
                  { school: "MIT Sloan", score: "710-720" },
                  { school: "Columbia", score: "700-720" },
                  { school: "Top 10 US Schools", score: "700+" },
                  { school: "Top 20 US Schools", score: "680+" },
                  { school: "Top European Schools", score: "680+" }
                ].map((schoolScore, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
                    <span className="font-medium">{schoolScore.school}</span>
                    <span className="text-indigo font-bold">{schoolScore.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our GMAT Prep Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to achieve your target GMAT score.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Adaptive Practice Tests",
                description: "Realistic computer-adaptive tests that mimic the official GMAT experience",
                icon: Calendar
              },
              {
                title: "Video Explanations",
                description: "Step-by-step video solutions for every practice question",
                icon: BookOpen
              },
              {
                title: "Performance Analytics",
                description: "Track your progress over time with detailed performance insights",
                icon: BarChart3
              },
              {
                title: "Customized Study Plans",
                description: "Personalized study plans based on your target score and timeline",
                icon: BookMarked
              },
              {
                title: "MBA Admissions Support",
                description: "Guidance on business school selection and application strategy",
                icon: Users
              },
              {
                title: "Score Improvement Guarantee",
                description: "Achieve at least a 50-point improvement or get an extended subscription for free",
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo to-indigo-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Excel on Your GMAT?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful test-takers who achieved their target scores with Neplia.
            </p>
            <Link to="/selection?exam=gmat">
              <Button size="lg" className="bg-white text-indigo hover:bg-gray-100 rounded-lg px-6 py-6 h-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="mt-8 flex items-center justify-center space-x-8">
              {[
                { label: "Premium Resources", icon: CheckCircle2 },
                { label: "Expert Support", icon: Award },
                { label: "7-Day Free Trial", icon: Calendar }
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

export default GmatPage;
