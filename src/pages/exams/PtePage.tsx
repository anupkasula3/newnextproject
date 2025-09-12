import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Headphones, MessageSquare, Edit, BarChart3, Calendar, CheckCircle2, Award, Users, Shield, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const PtePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-coral/10 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-coral/10 dark:bg-coral/20 text-coral dark:text-coral-300 rounded-full text-sm font-medium mb-4">
                PTE Academic Preparation
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Master the <span className="text-coral">PTE Academic</span> Test
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Comprehensive preparation for the Pearson Test of English Academic with AI-powered tools.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/practice">
                  <Button size="lg" className="bg-coral hover:bg-coral/90 text-white rounded-lg px-6 py-6 h-auto">
                    Start PTE Preparation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/practice/mock-test?type=pte">
                  <Button variant="outline" size="lg" className="rounded-lg px-6 py-6 h-auto">
                    Take Practice Test
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
              {[
                { label: "Success Rate", value: "91%" },
                { label: "70+ Score Students", value: "7K+" },
                { label: "Practice Tests", value: "250+" },
                { label: "Question Types", value: "20+" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-3xl font-bold text-coral mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">PTE Academic Skills</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Prepare for all the key skills tested in the PTE Academic exam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Speaking & Writing",
                description: "Integrated tasks that assess both speaking and writing abilities",
                icon: MessageSquare,
                color: "bg-coral",
                link: "/practice/speaking"
              },
              {
                title: "Reading",
                description: "Multiple-choice, reorder paragraphs, and fill in the blanks questions",
                icon: BookOpen,
                color: "bg-indigo",
                link: "/practice/reading"
              },
              {
                title: "Listening",
                description: "Audio recordings with various question formats to test comprehension",
                icon: Headphones,
                color: "bg-teal-600",
                link: "/practice/listening"
              },
              {
                title: "Enabling Skills",
                description: "Grammar, vocabulary, oral fluency, pronunciation, spelling, and written discourse",
                icon: Edit,
                color: "bg-indigo-800",
                link: "/practice/writing"
              }
            ].map((skill, index) => (
              <Link key={index} to={skill.link} className="block">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 h-full"
                >
                  <div className={`${skill.color} h-2 w-full`}></div>
                  <div className="p-6">
                    <div className={`${skill.color} text-white rounded-full h-12 w-12 flex items-center justify-center mb-4`}>
                      <skill.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{skill.description}</p>
                    <div className="mt-4 text-coral text-sm font-medium flex items-center">
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
            <h2 className="text-3xl font-bold mb-4">PTE Academic Scores</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understand what each score range means and what you need to achieve for your goals.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  range: "50-64",
                  title: "Intermediate",
                  description: "Limited command of English with frequent errors and misunderstandings",
                  color: "border-yellow-400 dark:border-yellow-500"
                },
                {
                  range: "65-79",
                  title: "Good",
                  description: "Effective command of English despite occasional inaccuracies",
                  color: "border-coral dark:border-coral-400"
                },
                {
                  range: "80-90",
                  title: "Advanced",
                  description: "Full operational command of English with only occasional unsystematic errors",
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

            <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Score Requirements by Purpose</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { purpose: "Australia Migration", score: "65+" },
                  { purpose: "UK Visa & Immigration", score: "59-79" },
                  { purpose: "Canadian Immigration", score: "50-70" },
                  { purpose: "Top Universities", score: "70-85" },
                  { purpose: "Most Universities", score: "58-65" },
                  { purpose: "Graduate Programs", score: "65-79" }
                ].map((purposeScore, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
                    <span className="font-medium text-sm">{purposeScore.purpose}</span>
                    <span className="text-coral font-bold">{purposeScore.score}</span>
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
            <h2 className="text-3xl font-bold mb-4">Our PTE Prep Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to achieve your target PTE score.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Computer-Based Practice",
                description: "Authentic PTE-style interface for realistic test simulation",
                icon: Monitor
              },
              {
                title: "AI Speaking Scorer",
                description: "Advanced AI technology to evaluate your speaking responses",
                icon: MessageSquare
              },
              {
                title: "Detailed Analytics",
                description: "Track your progress with skill-by-skill performance insights",
                icon: BarChart3
              },
              {
                title: "Personalized Study Plans",
                description: "Custom study plans based on your diagnostic results",
                icon: Calendar
              },
              {
                title: "Item Type Training",
                description: "Focused practice for all 20 PTE question types",
                icon: BookOpen
              },
              {
                title: "Score Guarantee",
                description: "Achieve your target score or get an extended premium subscription",
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
                <div className="bg-coral/10 dark:bg-coral/20 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-coral" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-coral to-coral-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Succeed in PTE Academic?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful test-takers who achieved their target scores with Neplia.
            </p>
            <Link to="/practice">
              <Button size="lg" className="bg-white text-coral hover:bg-gray-100 rounded-lg px-6 py-6 h-auto">
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

export default PtePage;
