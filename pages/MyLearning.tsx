import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useCourseContext } from '../context/CourseContext';
import CourseCard from '../components/CourseCard';

const MyLearning: React.FC = () => {
  const { state } = useCourseContext();
  
  const enrolledCourses = state.courses.filter(course => 
    state.enrolledIds.includes(course.id)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Learning</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Track your progress and continue where you left off.
        </p>
      </div>

      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-full mb-6">
            <BookOpen className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No active courses
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
            You haven't enrolled in any courses yet. Explore our catalog to start your learning journey today.
          </p>
          <Link
            to="/catalog"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
          >
            Explore Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyLearning;