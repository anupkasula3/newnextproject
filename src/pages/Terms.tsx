
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { ChevronRight, FileText, Info, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

const Terms = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = 'Terms of Service | Neplia';
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
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-purple-50/30 to-white dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-gray-900 -z-10"></div>
        <div className="absolute top-20 left-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-indigo-700 dark:opacity-10 -z-10"></div>
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-purple-700 dark:opacity-10 -z-10"></div>
        
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className={`font-bold mb-4 ${isMobile ? 'text-3xl' : 'text-5xl'} section-title bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent`}>
                Terms of Service
              </h1>
              <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <span>Home</span>
                <ChevronRight size={14}/>
                <span className="text-primary">Terms</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="mb-8 policy-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-indigo-600 dark:text-indigo-400" size={24} />
                <h2 className="text-xl font-semibold">Agreement Overview</h2>
              </div>
              <p className="lead text-lg text-gray-700 dark:text-gray-300">
                Welcome to Neplia. These Terms of Service govern your use of our website, services, and applications. 
                By using our platform, you agree to these terms in full. Please read them carefully.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </motion.div>
            
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              <motion.div variants={item} className="policy-section">
                <h2 className="policy-heading text-indigo-600 dark:text-indigo-400">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold mr-3">1</span>
                  Acceptance of Terms
                </h2>
                <div className="pl-10 text-gray-700 dark:text-gray-300">
                  <p className="mb-3">
                    By accessing or using the Neplia platform, you acknowledge that you have read, understood, 
                    and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, 
                    you must not use our services.
                  </p>
                  <p>
                    These terms apply to all visitors, users, and others who access or use our services.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={item} className="policy-section">
                <h2 className="policy-heading text-indigo-600 dark:text-indigo-400">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold mr-3">2</span>
                  Account Registration
                </h2>
                <div className="pl-10 text-gray-700 dark:text-gray-300">
                  <p className="mb-3">
                    To access certain features of our platform, you may be required to register for an account. 
                    You agree to provide accurate, current, and complete information during the registration process 
                    and to update such information to keep it accurate, current, and complete.
                  </p>
                  <p>
                    You are responsible for safeguarding the password that you use to access our services and for 
                    any activities or actions under your password. We encourage you to use a strong, unique password 
                    for your account.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={item} className="policy-section">
                <h2 className="policy-heading text-indigo-600 dark:text-indigo-400">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold mr-3">3</span>
                  Subscriptions and Payments
                </h2>
                <div className="pl-10 text-gray-700 dark:text-gray-300">
                  <p className="mb-3">
                    Some of our services require payment. If you subscribe to a paid plan, you agree to pay the 
                    applicable fees as they become due. Fees are non-refundable except as required by law or as 
                    explicitly stated in these terms.
                  </p>
                  <p className="mb-3">
                    By providing a credit card or other payment method, you represent that you are authorized to 
                    use the designated payment method and you authorize us to charge your payment method for the 
                    total amount of your subscription or purchase.
                  </p>
                  <p>
                    We may change our fees at any time. If we change our fees, we will provide notice of the change 
                    on the website or by email, at our option, at least 14 days before the change takes effect.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={item} className="policy-section">
                <h2 className="policy-heading text-indigo-600 dark:text-indigo-400">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold mr-3">4</span>
                  Intellectual Property
                </h2>
                <div className="pl-10 text-gray-700 dark:text-gray-300">
                  <p className="mb-3">
                    The Neplia platform and its original content, features, and functionality are owned by Neplia 
                    and are protected by international copyright, trademark, patent, trade secret, and other 
                    intellectual property or proprietary rights laws.
                  </p>
                  <p>
                    You may not copy, modify, create derivative works of, publicly display, publicly perform, 
                    republish, download, or store any of our materials without the prior written consent of Neplia.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={item} className="policy-section">
                <h2 className="policy-heading text-indigo-600 dark:text-indigo-400">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold mr-3">5</span>
                  User Content
                </h2>
                <div className="pl-10 text-gray-700 dark:text-gray-300">
                  <p className="mb-3">
                    Our services may allow you to submit content such as answers, writings, and feedback. You retain 
                    ownership of any intellectual property rights that you hold in that content, but you grant us a 
                    worldwide, royalty-free, non-exclusive license to use, reproduce, modify, adapt, publish, translate, 
                    create derivative works from, distribute, and display such content in any media.
                  </p>
                  <p>
                    You represent and warrant that your content does not violate any third-party rights, including 
                    intellectual property rights and privacy rights, and that it complies with all applicable laws 
                    and regulations.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={item} className="policy-section">
                <h2 className="policy-heading text-indigo-600 dark:text-indigo-400">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold mr-3">6</span>
                  Termination
                </h2>
                <div className="pl-10 text-gray-700 dark:text-gray-300">
                  <p className="mb-3">
                    We may terminate or suspend your account and access to our services immediately, without prior 
                    notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                  </p>
                  <p>
                    Upon termination, your right to use our services will cease immediately. If you wish to terminate 
                    your account, you may simply discontinue using our services or contact us to request account deletion.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={item} className="policy-section">
                <h2 className="policy-heading text-indigo-600 dark:text-indigo-400">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold mr-3">7</span>
                  Limitation of Liability
                </h2>
                <div className="pl-10 text-gray-700 dark:text-gray-300">
                  <p className="mb-3">
                    In no event shall Neplia, its directors, employees, partners, agents, suppliers, or affiliates, be 
                    liable for any indirect, incidental, special, consequential or punitive damages, including without 
                    limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                  </p>
                  <ol className="list-decimal ml-6 space-y-1">
                    <li>Your access to or use of or inability to access or use our services;</li>
                    <li>Any conduct or content of any third party on our services;</li>
                    <li>Any content obtained from our services; and</li>
                    <li>Unauthorized access, use or alteration of your transmissions or content.</li>
                  </ol>
                </div>
              </motion.div>
              
              <motion.div variants={item} className="policy-section">
                <h2 className="policy-heading text-indigo-600 dark:text-indigo-400">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-bold mr-3">8</span>
                  Contact Us
                </h2>
                <div className="pl-10 text-gray-700 dark:text-gray-300">
                  <p>
                    If you have any questions about these Terms of Service, please contact us at: 
                    <a href="mailto:terms@neplia.com" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 ml-1 hover:underline">
                      terms@neplia.com
                    </a>
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800/50 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-3 text-indigo-600 dark:text-indigo-400">
                  <Info size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    If you have any questions or concerns about our Terms of Service or need clarification on any point, 
                    our support team is here to help.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      <HelpCircle size={16} className="text-indigo-500" />
                      <span>FAQ</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Support Center</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      <AlertCircle size={16} className="text-red-500" />
                      <span>Report Issue</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
