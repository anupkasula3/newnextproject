import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const examLinks = [
  { name: "IELTS", path: "/exams/ielts" },
  { name: "TOEFL", path: "/exams/toefl" },
  { name: "GRE", path: "/exams/gre" },
  { name: "GMAT", path: "/exams/gmat" },
  { name: "SAT", path: "/exams/sat" },
  { name: "PTE", path: "/exams/pte" },
];

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
  const isMobile = useIsMobile();
  
  return (
    <footer className={`bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className={`grid grid-cols-1 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-4'} gap-8 md:gap-12`}>
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-heading text-2xl font-bold text-indigo">
                Neplia<span className="text-coral">.</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
              Your ultimate platform for IELTS preparation. Study smarter, score higher.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/neplia" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com/neplia" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com/neplia" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://youtube.com/neplia" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {isMobile ? (
            <div className="grid grid-cols-2 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/practice" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      Practice Tests
                    </Link>
                  </li>
                  <li>
                    <Link to="/resources" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/team" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Exams */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Exams</h3>
                <ul className="space-y-3">
                  {examLinks.map((exam) => (
                    <li key={exam.name}>
                      <Link to={exam.path} className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                        {exam.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/practice" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      Practice Tests
                    </Link>
                  </li>
                  <li>
                    <Link to="/resources" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/team" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Exams */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Exams</h3>
                <ul className="space-y-3">
                  {examLinks.map((exam) => (
                    <li key={exam.name}>
                      <Link to={exam.path} className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                        {exam.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-indigo mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">support@neplia.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-indigo mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="mt-4">
                <Link to="/contact" className="inline-flex items-center font-medium text-indigo hover:text-indigo-700 dark:hover:text-indigo-300">
                  Send us a message
                  <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-row'} justify-between items-center`}>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Neplia.com. All rights reserved.
            </p>
            <div className={`${isMobile ? 'flex flex-wrap justify-center gap-4' : 'flex space-x-6'}`}>
              <Link to="/terms" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 text-sm">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 text-sm">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
