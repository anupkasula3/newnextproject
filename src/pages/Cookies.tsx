
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronRight, Cookie, FileText, Clipboard, Settings, Clock, CircleAlert, HelpCircle } from 'lucide-react';

const Cookies = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Scroll to top when component mounts
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
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-amber-50/30 to-yellow-50/20 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-yellow-950/10 -z-10"></div>
        <div className="absolute top-40 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-orange-700 dark:opacity-10 -z-10"></div>
        <div className="absolute top-10 right-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-amber-700 dark:opacity-10 -z-10"></div>
        
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className={`font-bold mb-4 ${isMobile ? 'text-3xl' : 'text-5xl'} bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent`}>
                Cookie Policy
              </h1>
              <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <span>Home</span>
                <ChevronRight size={14}/>
                <span className="text-primary">Cookies</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="mb-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="text-amber-600 dark:text-amber-400" size={24} />
                <h2 className="text-xl font-semibold">About Our Cookies</h2>
              </div>
              <p className="lead text-lg text-gray-700 dark:text-gray-300">
                This Cookie Policy explains how Neplia uses cookies and similar technologies to recognize you when 
                you visit our website. It explains what these technologies are and why we use them, as well as your 
                rights to control our use of them.
              </p>
            </motion.div>
            
            <Card className="overflow-hidden mb-10">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-500/10 to-amber-500/10 dark:from-orange-900/30 dark:to-amber-900/30 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <FileText className="text-amber-600 dark:text-amber-400" size={20} />
                    <h2 className="text-xl font-semibold">Cookie Policy Details</h2>
                  </div>
                  <div className="text-xs px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 rounded-full">
                    Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                
                <motion.div 
                  className="prose prose-lg dark:prose-invert max-w-none p-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-6 mb-4 text-amber-700 dark:text-amber-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-sm font-bold">1</span>
                      What Are Cookies?
                    </h2>
                    <p className="pl-10">
                      Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                      Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well 
                      as to provide reporting information.
                    </p>
                    <p className="pl-10 mt-4">
                      Cookies set by the website owner (in this case, Neplia) are called "first-party cookies". Cookies set by 
                      parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party 
                      features or functionality to be provided on or through the website.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-amber-700 dark:text-amber-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-sm font-bold">2</span>
                      Why Do We Use Cookies?
                    </h2>
                    <p className="pl-10">
                      We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons 
                      for our Websites to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies 
                      enable us to track and target the interests of our users to enhance the experience on our Websites. Third parties 
                      serve cookies through our Websites for advertising, analytics, and other purposes.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-amber-700 dark:text-amber-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-sm font-bold">3</span>
                      Types of Cookies We Use
                    </h2>
                    <p className="pl-10">
                      The specific types of first and third-party cookies served through our Websites and the purposes they perform include:
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-2 pl-10 text-amber-600 dark:text-amber-400">Essential Cookies</h3>
                    <p className="pl-10">
                      These cookies are strictly necessary to provide you with services available through our website and to use some of its 
                      features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot 
                      refuse them without impacting how our website functions.
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-2 pl-10 text-amber-600 dark:text-amber-400">Performance and Functionality Cookies</h3>
                    <p className="pl-10">
                      These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. 
                      However, without these cookies, certain functionality may become unavailable.
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-2 pl-10 text-amber-600 dark:text-amber-400">Analytics and Customization Cookies</h3>
                    <p className="pl-10">
                      These cookies collect information that is used either in aggregate form to help us understand how our website is being used 
                      or how effective our marketing campaigns are, or to help us customize our website for you.
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-2 pl-10 text-amber-600 dark:text-amber-400">Advertising Cookies</h3>
                    <p className="pl-10">
                      These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad 
                      from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are 
                      based on your interests.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-amber-700 dark:text-amber-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-sm font-bold">4</span>
                      How Can You Control Cookies?
                    </h2>
                    <p className="pl-10">
                      You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept 
                      or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality 
                      and areas of our website may be restricted.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-amber-700 dark:text-amber-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-sm font-bold">5</span>
                      Updates to This Cookie Policy
                    </h2>
                    <p className="pl-10">
                      We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for 
                      other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed 
                      about our use of cookies and related technologies.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <h2 className="flex items-center gap-2 text-xl font-semibold mt-8 mb-4 text-amber-700 dark:text-amber-400">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-sm font-bold">6</span>
                      Contact Us
                    </h2>
                    <p className="pl-10">
                      If you have any questions about our use of cookies or other technologies, please contact us at: <a href="mailto:privacy@neplia.com" className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 hover:underline">privacy@neplia.com</a>
                    </p>
                  </motion.div>
                  
                  <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
                    <div className="flex flex-wrap gap-3 justify-center">
                      <motion.div 
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Clipboard size={16} />
                        <span>Cookie Preferences</span>
                      </motion.div>
                      
                      <motion.div 
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Settings size={16} />
                        <span>Manage Settings</span>
                      </motion.div>
                      
                      <motion.div 
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <HelpCircle size={16} />
                        <span>Cookie Help</span>
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
              className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-6 border border-amber-100 dark:border-amber-900/50 shadow-sm mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <CircleAlert className="text-amber-600 dark:text-amber-400" size={24} />
                <h3 className="text-xl font-semibold">Important Cookie Notice</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Our website uses cookies to improve your browsing experience, analyze site traffic, and personalize content. 
                By continuing to use our site, you consent to our use of cookies in accordance with our Cookie Policy.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cookies;
