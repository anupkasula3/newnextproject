
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-7xl md:text-9xl font-bold text-indigo mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md text-center mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center"
        >
          Return to Homepage
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
