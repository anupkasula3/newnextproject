
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronRight, Shield, Lock, EyeOff, KeyRound, Info, AlertCircle, FileText, GlobeLock } from 'lucide-react';

const Privacy = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
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
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-cyan-50/30 to-purple-50/20 dark:from-indigo-950/30 dark:via-cyan-950/20 dark:to-purple-950/10 -z-10"></div>
        <div className="absolute top-40 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-indigo-700 dark:opacity-10 -z-10"></div>
        <div className="absolute top-10 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-cyan-700 dark:opacity-10 -z-10"></div>
        
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className={`font-bold mb-4 ${isMobile ? 'text-3xl' : 'text-5xl'} bg-gradient-to-r from-indigo-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent section-title`}>
                Privacy Policy
              </h1>
              <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <span>Home</span>
                <ChevronRight size={14}/>
                <span className="text-primary">Privacy</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="mb-8 policy-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-cyan-600 dark:text-cyan-400" size={24} />
                <h2 className="text-xl font-semibold">Our Privacy Commitment</h2>
              </div>
              <p className="lead text-lg text-gray-700 dark:text-gray-300">
                At Neplia, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our service. Your trust is our top priority.
              </p>
            </motion.div>
            
            <Card className="overflow-hidden mb-10">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 dark:from-indigo-900/30 dark:to-cyan-900/30 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <FileText className="text-cyan-600 dark:text-cyan-400" size={20} />
                    <h2 className="text-xl font-semibold">Privacy Policy Details</h2>
                  </div>
                  <div className="text-xs px-3 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300 rounded-full">
                    Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                
                <motion.div 
                  className="prose prose-lg dark:prose-invert max-w-none p-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={item} className="policy-section">
                    <h2 className="policy-heading">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 text-sm font-bold">1</span>
                      Information We Collect
                    </h2>
                    <p className="pl-10 text-gray-700 dark:text-gray-300">
                      We collect information that you provide directly to us when you:
                    </p>
                    <ul className="list-disc ml-16 mt-2 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Create an account or user profile</li>
                      <li>Purchase a subscription</li>
                      <li>Participate in assessments, tests, or surveys</li>
                      <li>Contact our customer support</li>
                      <li>Interact with our platform</li>
                    </ul>
                  </motion.div>
                  
                  <motion.div variants={item} className="policy-section">
                    <h2 className="policy-heading">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 text-sm font-bold">2</span>
                      How We Use Your Information
                    </h2>
                    <p className="pl-10 text-gray-700 dark:text-gray-300">
                      We use the information we collect to:
                    </p>
                    <ul className="list-disc ml-16 mt-2 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Provide, maintain, and improve our services</li>
                      <li>Process transactions and send related information</li>
                      <li>Send you technical notices, updates, and support messages</li>
                      <li>Respond to your comments, questions, and requests</li>
                      <li>Personalize your experience on our platform</li>
                      <li>Monitor and analyze trends, usage, and activities</li>
                    </ul>
                  </motion.div>
                  
                  <motion.div variants={item} className="policy-section">
                    <h2 className="policy-heading">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 text-sm font-bold">3</span>
                      Information Sharing and Disclosure
                    </h2>
                    <p className="pl-10 text-gray-700 dark:text-gray-300">
                      We may share your information with:
                    </p>
                    <ul className="list-disc ml-16 mt-2 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Service providers who perform services on our behalf</li>
                      <li>Third-party partners with whom we offer co-branded services</li>
                      <li>Law enforcement or other parties as required by law</li>
                    </ul>
                  </motion.div>
                  
                  <motion.div variants={item} className="policy-section">
                    <h2 className="policy-heading">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 text-sm font-bold">4</span>
                      Data Security
                    </h2>
                    <p className="pl-10 text-gray-700 dark:text-gray-300">
                      We implement appropriate security measures to protect the security of your personal information. 
                      However, please be aware that no security measures are perfect or impenetrable, and we cannot 
                      guarantee the security of your data transmitted to our site.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item} className="policy-section">
                    <h2 className="policy-heading">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 text-sm font-bold">5</span>
                      Your Choices
                    </h2>
                    <p className="pl-10 text-gray-700 dark:text-gray-300">
                      You can access and update certain information about yourself by logging into your account. 
                      You can also opt out of receiving promotional emails from us by following the instructions in those emails.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item} className="policy-section">
                    <h2 className="policy-heading">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 text-sm font-bold">6</span>
                      International Data Transfers
                    </h2>
                    <p className="pl-10 text-gray-700 dark:text-gray-300">
                      We may transfer information that we collect about you to affiliated entities, or to other third parties across 
                      borders and from your country or jurisdiction to other countries or jurisdictions around the world.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item} className="policy-section">
                    <h2 className="policy-heading">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 text-sm font-bold">7</span>
                      Changes to this Privacy Policy
                    </h2>
                    <p className="pl-10 text-gray-700 dark:text-gray-300">
                      We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the 
                      date at the top of the policy and, in some cases, we may provide you with additional notice.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item} className="policy-section">
                    <h2 className="policy-heading">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 text-sm font-bold">8</span>
                      Contact Us
                    </h2>
                    <p className="pl-10 text-gray-700 dark:text-gray-300">
                      If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@neplia.com" className="text-cyan-600 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300 hover:underline">privacy@neplia.com</a>
                    </p>
                  </motion.div>
                  
                  <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
                    <div className="flex flex-wrap gap-3 justify-center">
                      <motion.div 
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-300 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Lock size={16} />
                        <span>Encrypted Data</span>
                      </motion.div>
                      
                      <motion.div 
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <EyeOff size={16} />
                        <span>Privacy First</span>
                      </motion.div>
                      
                      <motion.div 
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <KeyRound size={16} />
                        <span>Secure Access</span>
                      </motion.div>
                    </div>
                    
                    <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                      Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-cyan-50 dark:bg-cyan-950/30 rounded-xl p-6 border border-cyan-100 dark:border-cyan-900/50 shadow-sm mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <GlobeLock className="text-cyan-600 dark:text-cyan-400" size={24} />
                <h3 className="text-xl font-semibold">Global Data Protection</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                We adhere to international data protection standards including GDPR, CCPA, and other 
                applicable regulations. We're committed to protecting your personal data regardless of 
                where you access our services from.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
