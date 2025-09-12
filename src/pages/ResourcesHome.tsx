
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, FileText, Video, Download, Headphones, MessageSquare, BarChart3, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const ResourcesHome = () => {
  // Sample resource categories
  const categories = [
    {
      title: "Practice Tests",
      description: "Full-length mock tests for all major English proficiency exams",
      icon: FileText,
      color: "bg-indigo",
      count: 156,
      link: "/resources/category/practice-tests"
    },
    {
      title: "Study Guides",
      description: "Comprehensive guides covering all test sections and strategies",
      icon: BookOpen,
      color: "bg-teal-600",
      count: 89,
      link: "/resources/category/study-guides"
    },
    {
      title: "Video Tutorials",
      description: "Expert video lessons explaining key concepts and techniques",
      icon: Video,
      color: "bg-coral",
      count: 112,
      link: "/resources/category/video-tutorials"
    },
    {
      title: "Audio Lessons",
      description: "Listening practice materials with various accents and topics",
      icon: Headphones,
      color: "bg-indigo-800",
      count: 78,
      link: "/resources/category/audio-lessons"
    },
    {
      title: "Writing Samples",
      description: "Model essays and reports with expert annotations",
      icon: MessageSquare,
      count: 94,
      color: "bg-teal-600",
      link: "/resources/category/writing-samples"
    },
    {
      title: "Score Calculators",
      description: "Tools to estimate your scores and track improvement",
      icon: BarChart3,
      count: 12,
      color: "bg-indigo",
      link: "/resources/category/score-calculators"
    }
  ];

  // Sample popular resources
  const popularResources = [
    {
      title: "IELTS Writing Task 2 Master Guide",
      type: "Study Guide",
      views: "24.5K",
      rating: 4.9,
      exam: "IELTS",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHN0dWR5JTIwbm90ZXN8ZW58MHx8MHx8fDA%3D",
      link: "/resources/ielts-writing-task-2-guide"
    },
    {
      title: "TOEFL Listening Comprehensive Practice",
      type: "Practice Test",
      views: "18.7K",
      rating: 4.8,
      exam: "TOEFL",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN0dWR5JTIwbm90ZXN8ZW58MHx8MHx8fDA%3D",
      link: "/resources/toefl-listening-practice"
    },
    {
      title: "PTE Speaking: Describe Image Strategies",
      type: "Video Tutorial",
      views: "15.2K",
      rating: 4.7,
      exam: "PTE",
      image: "https://images.unsplash.com/photo-1600195077077-7c815f540a3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHN0dWR5JTIwbm90ZXN8ZW58MHx8MHx8fDA%3D",
      link: "/resources/pte-speaking-describe-image"
    },
    {
      title: "Cambridge C1 Advanced Reading Test",
      type: "Practice Test",
      views: "12.8K",
      rating: 4.6,
      exam: "Cambridge",
      image: "https://images.unsplash.com/photo-1612599316791-451087e7a6d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHN0dWR5JTIwbm90ZXN8ZW58MHx8MHx8fDA%3D",
      link: "/resources/cambridge-c1-advanced-reading"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
                Study Resources
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Premium <span className="text-indigo">Learning Resources</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Access our comprehensive collection of study materials, practice tests, and guides for all major English proficiency exams.
              </p>
              <div className="relative max-w-xl mx-auto mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for study materials..." 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo focus:border-indigo dark:focus:ring-indigo-400 dark:focus:border-indigo-400 outline-none transition"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {["IELTS", "TOEFL", "PTE", "Cambridge", "Duolingo", "OET", "Listening", "Reading", "Writing", "Speaking"].map((tag, i) => (
                  <Link 
                    key={i}
                    to={`/resources/tag/${tag.toLowerCase()}`}
                    className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo dark:hover:text-indigo-300 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Resource Categories</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Browse our comprehensive collection of study materials organized by type.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <Link key={index} to={category.link} className="block">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 h-full"
                >
                  <div className={`${category.color} h-2 w-full`}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${category.color} text-white rounded-full h-12 w-12 flex items-center justify-center`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium px-2 py-1">
                        {category.count} items
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
                    <div className="mt-4 text-indigo text-sm font-medium flex items-center">
                      Browse Resources <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Resources Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Resources</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                The most frequently accessed study materials from our collection.
              </p>
            </div>
            <Link to="/resources/all" className="mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center">
                View All Resources
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularResources.map((resource, index) => (
              <Link key={index} to={resource.link} className="block group">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 h-full"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={resource.image} 
                      alt={resource.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full text-xs font-medium px-2 py-1">
                      {resource.exam}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{resource.type}</span>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{resource.views} views</span>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-xs font-medium ml-1">{resource.rating}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-indigo dark:group-hover:text-indigo-300 transition-colors line-clamp-1">{resource.title}</h3>
                    <div className="mt-2 text-indigo text-sm font-medium flex items-center">
                      View Resource <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Resources Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Resources by Exam</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find study materials specific to your target English proficiency test.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { name: "IELTS", icon: "🌟", count: 256, color: "bg-indigo", link: "/resources/ielts" },
              { name: "TOEFL", icon: "🌎", count: 184, color: "bg-teal-600", link: "/resources/toefl" },
              { name: "PTE", icon: "💻", count: 142, color: "bg-coral", link: "/resources/pte" },
              { name: "Cambridge", icon: "🏛️", count: 98, color: "bg-indigo-800", link: "/resources/cambridge" },
              { name: "Duolingo", icon: "🦉", count: 76, color: "bg-teal-600", link: "/resources/duolingo" },
              { name: "OET", icon: "⚕️", count: 64, color: "bg-indigo", link: "/resources/oet" }
            ].map((exam, index) => (
              <Link key={index} to={exam.link} className="block group">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 h-full p-6 text-center"
                >
                  <div className={`h-12 w-12 ${exam.color} rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3`}>
                    {exam.icon}
                  </div>
                  <h3 className="font-bold mb-1 group-hover:text-indigo dark:group-hover:text-indigo-300 transition-colors">{exam.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{exam.count} resources</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-indigo-50 dark:bg-indigo-900/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-4">Get Our FREE Study Pack</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Download our comprehensive study pack with practice tests, vocabulary lists, and essential tips for your English proficiency exam.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "10 Practice Tests with Answers",
                      "Essential Vocabulary List (500+ words)",
                      "Test-Taking Strategies Guide",
                      "Score Calculation Worksheet"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mr-3 flex-shrink-0">✓</div>
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-indigo hover:bg-indigo/90 text-white flex items-center">
                    <Download className="mr-2 h-5 w-5" />
                    Download Free Study Pack
                  </Button>
                </div>
                <div className="hidden md:block bg-indigo-100 dark:bg-indigo-900/30 relative">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="max-w-xs">
                      <div className="aspect-[3/4] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute inset-0 flex flex-col p-6">
                          <div className="mb-4">
                            <div className="h-6 w-24 bg-indigo rounded-full mb-2"></div>
                            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                          </div>
                          <div className="flex-1 flex flex-col space-y-2">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-4/6"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4"></div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                            <div className="h-8 bg-indigo rounded-md"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Access all our premium resources and practice tests with a Neplia account.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-indigo hover:bg-indigo/90 text-white rounded-lg px-6 py-6 h-auto w-full sm:w-auto">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/resources/all">
                <Button variant="outline" size="lg" className="rounded-lg px-6 py-6 h-auto w-full sm:w-auto">
                  Browse All Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResourcesHome;
