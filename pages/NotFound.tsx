import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <AlertCircle className="w-20 h-20 text-indigo-600 dark:text-indigo-400 mb-6" />
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
        Page Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;