
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, DollarSign, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const pricingPlans = [
  {
    name: 'Free Trial',
    price: '$0',
    duration: '/month',
    description: 'Start your IELTS preparation journey',
    features: [
      'Limited practice tests',
      'Basic progress tracking',
      'Community forum access',
      '1 AI-graded essay per month',
      'Email support'
    ],
    buttonText: 'Start Free Trial',
    buttonLink: '/signup',
    highlighted: false
  },
  {
    name: 'Premium',
    price: '$19.99',
    duration: '/month',
    description: 'Everything you need to ace your exam',
    features: [
      'Unlimited practice tests',
      'Advanced progress analytics',
      'Community forum access',
      'AI-graded essays & feedback',
      'Speaking test simulation',
      'Priority email support',
      'Study planner & reminders'
    ],
    buttonText: 'Get Premium',
    buttonLink: '/signup?plan=premium',
    highlighted: true
  },
  {
    name: 'Premium Plus',
    price: '$29.99',
    duration: '/month',
    description: 'The ultimate IELTS preparation package',
    features: [
      'All Premium features',
      'One-on-one tutor sessions',
      'Custom study plan',
      'Mock interview with feedback',
      'University application guidance',
      '24/7 priority support',
      'Score guarantee'
    ],
    buttonText: 'Get Premium Plus',
    buttonLink: '/signup?plan=premium-plus',
    highlighted: false
  }
];

const Pricing = () => {
  useEffect(() => {
    document.title = 'Pricing Plans | Neplia';
    window.scrollTo(0, 0);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="relative overflow-hidden py-16 md:py-24">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-indigo-950/30 dark:via-gray-900 dark:to-gray-900 -z-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-indigo-700 dark:opacity-10 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent -z-10"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300"
            >
              <DollarSign className="inline-block w-4 h-4 mr-1" />
              Flexible Plans
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              Choose the <span className="text-indigo-600 dark:text-indigo-400">Perfect Plan</span> for Your Journey
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
            >
              Get access to premium IELTS preparation resources and tools designed to help you achieve your target score
            </motion.p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={item}
                className={`pricing-card ${plan.highlighted ? 'relative ring-2 ring-indigo-600 dark:ring-indigo-500' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                      <Star className="inline-block w-3 h-3 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`p-6 ${plan.highlighted ? 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50' : ''}`}>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="price-highlight">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">{plan.duration}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                  
                  <Link to={plan.buttonLink}>
                    <Button 
                      className={`w-full ${plan.highlighted 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' 
                        : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200'}`}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      {plan.buttonText}
                    </Button>
                  </Link>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-16 max-w-3xl mx-auto text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Need a custom solution?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We offer special pricing for educational institutions, language schools, and corporate training programs.
            </p>
            <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950/50">
              Contact Sales
            </Button>
          </div>

          <div className="mt-20 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              All plans include a 14-day money-back guarantee. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
