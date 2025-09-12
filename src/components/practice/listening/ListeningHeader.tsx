
import React from 'react';
import { Headphones } from 'lucide-react';

const ListeningHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <Headphones className="h-8 w-8 text-indigo" />
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">IELTS Listening Practice</h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
        Improve your listening skills with our authentic IELTS listening tests. Each test contains 4 sections with increasing difficulty, just like the real exam.
      </p>
    </div>
  );
};

export default ListeningHeader;
