
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Calculator, BookOpen, Edit, Clock, Trophy, ChevronRight, Sparkles } from 'lucide-react';

const GrePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">GRE Exam Preparation</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive resources and practice tests to help you excel in your Graduate Record Examination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 overflow-hidden shadow-lg border-purple-100 dark:border-purple-900/30">
              <CardHeader className="pb-3">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-3">
                  <BrainCircuit className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl">Verbal Reasoning</CardTitle>
                <CardDescription>
                  Master reading comprehension, text completion, and sentence equivalence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Develop strategies for analyzing complex passages</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Learn techniques for identifying key context clues</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Practice with GRE-style vocabulary questions</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/practice/gre/verbal" className="w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Start Verbal Practice
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 overflow-hidden shadow-lg border-blue-100 dark:border-blue-900/30">
              <CardHeader className="pb-3">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-3">
                  <Calculator className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl">Quantitative Reasoning</CardTitle>
                <CardDescription>
                  Strengthen your math skills for problem solving and data interpretation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Review essential arithmetic, algebra, and geometry concepts</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Learn strategies for quantitative comparison questions</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Practice with data interpretation problems</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/practice/gre/quantitative" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Start Quantitative Practice
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-900 overflow-hidden shadow-lg border-green-100 dark:border-green-900/30">
              <CardHeader className="pb-3">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-3">
                  <Edit className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl">Analytical Writing</CardTitle>
                <CardDescription>
                  Develop your ability to articulate complex ideas clearly and effectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Master techniques for analyzing an issue and an argument</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Learn to organize your ideas logically and coherently</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Get feedback on your essays from AI and experts</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/practice/gre/analytical" className="w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Start Writing Practice
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mb-16">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6 lg:p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                  <div className="w-24 h-24 bg-white/60 dark:bg-white/10 rounded-full flex items-center justify-center shadow-inner">
                    <Trophy className="w-12 h-12 text-amber-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Full GRE Mock Tests</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Experience the real GRE exam environment with our full-length practice tests. 
                    Each test includes Verbal Reasoning, Quantitative Reasoning, and Analytical Writing sections, 
                    timed exactly like the official exam.
                  </p>
                  <Link to="/practice/gre">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Take a Full GRE Mock Test
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Why Prepare with Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <Sparkles className="h-6 w-6 text-amber-500 mb-2" />
                  <CardTitle className="text-lg">Expert-Designed Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our practice materials are designed by GRE experts to match the test's format and difficulty.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <Clock className="h-6 w-6 text-blue-500 mb-2" />
                  <CardTitle className="text-lg">Real Test Environment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Practice under timed conditions to build stamina and improve your time management skills.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <BookOpen className="h-6 w-6 text-green-500 mb-2" />
                  <CardTitle className="text-lg">Extensive Question Bank</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Access thousands of practice questions covering all GRE topics and question types.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/practice/gre">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Start Your GRE Preparation Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GrePage;
