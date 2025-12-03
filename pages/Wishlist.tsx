import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCourseContext } from '../context/CourseContext';
import CourseCard from '../components/CourseCard';

const Wishlist: React.FC = () => {
  const { state } = useCourseContext();
  
  const wishlistCourses = state.courses.filter(course => 
    state.wishlistIds.includes(course.id)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Courses you've saved for later.
        </p>
      </div>

      {wishlistCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-full mb-6">
            <Heart className="w-12 h-12 text-red-500 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
            Save interesting courses here to find them easily later.
          </p>
          <Link
            to="/catalog"
            className="bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Browse Catalog
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;