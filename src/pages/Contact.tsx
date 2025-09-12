
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className={`font-bold mb-4 text-center ${isMobile ? 'text-2xl' : 'text-4xl'}`}>Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-10 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="mx-auto bg-indigo-50 dark:bg-indigo-900/30 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-5 w-5 text-indigo" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
              <p className="text-gray-500 dark:text-gray-500 mt-1 text-sm">Mon-Fri 9AM-6PM EST</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="mx-auto bg-indigo-50 dark:bg-indigo-900/30 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-5 w-5 text-indigo" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">support@neplia.com</p>
              <p className="text-gray-500 dark:text-gray-500 mt-1 text-sm">We'll respond within 24 hours</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="mx-auto bg-indigo-50 dark:bg-indigo-900/30 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-5 w-5 text-indigo" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Office</h3>
              <p className="text-gray-600 dark:text-gray-400">123 Education Lane</p>
              <p className="text-gray-500 dark:text-gray-500 mt-1 text-sm">San Francisco, CA 94103</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 md:p-10">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        className="w-full" 
                        placeholder="John Doe" 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email</label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        className="w-full" 
                        placeholder="john@example.com" 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleChange}
                        required 
                        className="w-full" 
                        placeholder="How can we help you?" 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        value={formData.message}
                        onChange={handleChange}
                        required 
                        className="w-full" 
                        rows={5} 
                        placeholder="Please describe your question or issue in detail..." 
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-indigo hover:bg-indigo/90">
                      <Send className="h-4 w-4 mr-2" /> Send Message
                    </Button>
                  </div>
                </form>
              </div>
              
              <div className="hidden lg:block relative">
                <div className="absolute inset-0 bg-indigo-600 opacity-10"></div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12615.478265090142!2d-122.41589417167659!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1631234567890!5m2!1sen!2sus" 
                  className="w-full h-full" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Neplia Office Location"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="https://facebook.com/neplia" className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-indigo transition-colors">
                <svg className="h-5 w-5 text-indigo" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://twitter.com/neplia" className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-indigo transition-colors">
                <svg className="h-5 w-5 text-indigo" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://instagram.com/neplia" className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-indigo transition-colors">
                <svg className="h-5 w-5 text-indigo" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://linkedin.com/company/neplia" className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-indigo transition-colors">
                <svg className="h-5 w-5 text-indigo" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://youtube.com/neplia" className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-indigo transition-colors">
                <svg className="h-5 w-5 text-indigo" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
