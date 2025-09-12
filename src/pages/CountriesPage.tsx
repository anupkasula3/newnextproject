
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Search, Bookmark, CircleCheck, Info, BookOpen, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const CountriesPage = () => {
  // Major countries with their exam requirements
  const countries = [
    {
      name: "Australia",
      flag: "🇦🇺",
      exams: ["IELTS", "PTE", "TOEFL", "Cambridge English"],
      requirements: "IELTS 6.0-7.0 or equivalent for most visas and universities",
      color: "bg-indigo"
    },
    {
      name: "Canada",
      flag: "🇨🇦",
      exams: ["IELTS", "CELPIP", "TOEFL"],
      requirements: "IELTS 6.0-6.5 or equivalent for PR and student visas",
      color: "bg-coral"
    },
    {
      name: "United Kingdom",
      flag: "🇬🇧",
      exams: ["IELTS", "PTE", "TOEFL", "Trinity ISE"],
      requirements: "IELTS 5.5-7.0 depending on visa type and university",
      color: "bg-teal-600"
    },
    {
      name: "United States",
      flag: "🇺🇸",
      exams: ["TOEFL", "IELTS", "Duolingo", "PTE"],
      requirements: "TOEFL 80+ or equivalent for most universities",
      color: "bg-indigo-800"
    },
    {
      name: "New Zealand",
      flag: "🇳🇿",
      exams: ["IELTS", "PTE", "TOEFL", "Cambridge English"],
      requirements: "IELTS 5.5-6.5 for most visas and universities",
      color: "bg-teal-600"
    },
    {
      name: "Germany",
      flag: "🇩🇪",
      exams: ["TestDaF", "DSH", "IELTS", "TOEFL"],
      requirements: "IELTS 6.0-7.0 for English-taught programs",
      color: "bg-indigo"
    },
    {
      name: "Singapore",
      flag: "🇸🇬",
      exams: ["IELTS", "TOEFL", "PTE"],
      requirements: "IELTS 6.5-7.0 for most universities",
      color: "bg-coral"
    },
    {
      name: "Ireland",
      flag: "🇮🇪",
      exams: ["IELTS", "TOEFL", "PTE", "Cambridge English"],
      requirements: "IELTS 6.0-6.5 for most visas and universities",
      color: "bg-teal-600"
    },
    {
      name: "Netherlands",
      flag: "🇳🇱",
      exams: ["IELTS", "TOEFL", "Cambridge English"],
      requirements: "IELTS 6.0-7.0 for English-taught programs",
      color: "bg-indigo-800"
    },
    {
      name: "Sweden",
      flag: "🇸🇪",
      exams: ["IELTS", "TOEFL", "Cambridge English"],
      requirements: "IELTS 6.5-7.0 for English-taught programs",
      color: "bg-indigo"
    },
    {
      name: "Norway",
      flag: "🇳🇴",
      exams: ["IELTS", "TOEFL", "PTE"],
      requirements: "IELTS 6.5-7.0 for English-taught programs",
      color: "bg-coral"
    },
    {
      name: "Denmark",
      flag: "🇩🇰",
      exams: ["IELTS", "TOEFL", "Cambridge English"],
      requirements: "IELTS 6.5-7.0 for most universities",
      color: "bg-teal-600"
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
                Country Requirements
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                English Exam Requirements by <span className="text-indigo">Country</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Explore the different English proficiency requirements for immigration, study, and work across the globe.
              </p>
              <div className="relative max-w-xl mx-auto mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for a country..." 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo focus:border-indigo dark:focus:ring-indigo-400 dark:focus:border-indigo-400 outline-none transition"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className={`${country.color} h-2 w-full`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{country.flag}</span>
                      <h3 className="text-xl font-bold">{country.name}</h3>
                    </div>
                    <button className="text-gray-400 hover:text-indigo dark:hover:text-indigo-300 transition-colors">
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Accepted Exams:</h4>
                      <div className="flex flex-wrap gap-2">
                        {country.exams.map((exam, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-medium"
                          >
                            {exam}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">General Requirements:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{country.requirements}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link 
                      to={`/country/${country.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-indigo dark:text-indigo-300 text-sm font-medium flex items-center hover:underline"
                    >
                      View Detailed Requirements <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Understanding Country Requirements</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Different countries have different English proficiency requirements for various purposes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Immigration & PR",
                  description: "Requirements for permanent residency and migration",
                  icon: Globe
                },
                {
                  title: "Study & Education",
                  description: "Requirements for university and college admission",
                  icon: BookOpen
                },
                {
                  title: "Work & Employment",
                  description: "Requirements for work visas and professional registration",
                  icon: Users
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                    <category.icon className="h-6 w-6 text-indigo" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start mb-4">
                <Info className="h-5 w-5 text-indigo mt-0.5 mr-3 flex-shrink-0" />
                <h3 className="text-xl font-bold">Important Notes</h3>
              </div>
              <div className="space-y-4 ml-8">
                <div className="flex items-start">
                  <CircleCheck className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Requirements may change frequently. Always check the official immigration or university websites for the most up-to-date information.
                  </p>
                </div>
                <div className="flex items-start">
                  <CircleCheck className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Some institutions or programs may have higher requirements than the general country standard.
                  </p>
                </div>
                <div className="flex items-start">
                  <CircleCheck className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Different visa categories may have different English proficiency requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-4">Start Your Preparation Journey</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                Select your target country and let us customize your preparation experience.
              </p>
              <Link to="/selection">
                <Button size="lg" className="bg-indigo hover:bg-indigo/90 text-white rounded-lg px-6 py-6 h-auto">
                  Personalize Your Preparation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CountriesPage;
