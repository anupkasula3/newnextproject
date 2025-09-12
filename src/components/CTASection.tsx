
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  "Full access to all IELTS practice modules",
  "Unlimited AI writing assessments",
  "Personalized study plan",
  "Progress tracking dashboard",
  "Mobile app access"
];

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 -right-[20%] h-[500px] w-[500px] rounded-full bg-indigo/5 blur-3xl"></div>
        <div className="absolute bottom-0 -left-[10%] h-[300px] w-[300px] rounded-full bg-teal/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Achieve Your Target IELTS Score?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Start your 7-day free trial today. No credit card required.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
              <div className="w-full md:w-1/2">
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">After free trial</span>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">$14.99</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Cancel anytime. No obligations.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Link to="/signup" className="block w-full">
                    <Button className="w-full bg-indigo hover:bg-indigo/90 text-white">
                      Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/pricing" className="block w-full text-center text-indigo dark:text-indigo-300 hover:underline text-sm">
                    View all pricing options
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-indigo hover:underline dark:text-indigo-300">Terms of Service</Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-indigo hover:underline dark:text-indigo-300">Privacy Policy</Link>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
