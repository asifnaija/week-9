import React from 'react';
import { Heart, Star, BookOpen } from 'lucide-react';
import { useCourseContext } from '../context/CourseContext';
import { Course } from '../types';
import ProgressBar from './ProgressBar';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { state, dispatch } = useCourseContext();
  
  const isEnrolled = state.enrolledIds.includes(course.id);
  const isWishlisted = state.wishlistIds.includes(course.id);
  const progress = state.progress[course.id];

  const handleEnroll = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ENROLL_COURSE', payload: course.id });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_WISHLIST', payload: course.id });
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isWishlisted 
                ? 'bg-red-50 text-red-500' 
                : 'bg-white/90 text-gray-400 hover:text-red-500'
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
        {isEnrolled && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            ENROLLED
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
            {course.category}
          </span>
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">{course.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          by {course.instructor}
        </p>

        {isEnrolled && progress ? (
          <div className="mt-auto">
             <div className="mb-4">
                <ProgressBar current={progress.completedLessons} total={course.totalLessons} />
             </div>
             <button
               className="w-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors flex items-center justify-center gap-2"
             >
                <BookOpen className="w-4 h-4" />
                Continue Learning
             </button>
          </div>
        ) : (
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${course.price}
            </span>
            <button
              onClick={handleEnroll}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              Enroll Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;