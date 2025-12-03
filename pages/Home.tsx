import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useCourseContext } from '../context/CourseContext';
import CourseCard from '../components/CourseCard';

const Home: React.FC = () => {
  const { state } = useCourseContext();
  const featuredCourses = state.courses.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-indigo-600 text-white shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
        <div className="relative px-6 py-16 sm:px-12 sm:py-24 lg:py-32 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Unlock Your Potential with <span className="text-indigo-200">LearnFlow</span>
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 max-w-lg">
              Master the skills of tomorrow. Expert-led courses in Development, Design, and Business designed to accelerate your career.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-8 rounded-full transition-colors shadow-lg flex items-center gap-2"
              >
                Browse Courses <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="pt-4 flex items-center gap-6 text-indigo-100 text-sm font-medium">
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Lifetime Access</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Expert Mentors</span>
            </div>
          </div>
          
          <div className="hidden md:block md:w-1/2">
             <div className="relative">
                 <div className="absolute -inset-4 bg-indigo-400/30 rounded-full blur-xl animate-pulse"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Students learning" 
                    className="relative rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                 />
             </div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Courses</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Hand-picked by our editors for you.</p>
          </div>
          <Link to="/catalog" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">12k+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Students Enrolled</div>
              </div>
               <div>
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">120+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Top Courses</div>
              </div>
               <div>
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">50+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Expert Mentors</div>
              </div>
               <div>
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">4.8</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Average Rating</div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Home;