import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { useCourseContext } from '../context/CourseContext';
import CourseCard from '../components/CourseCard';

const categories = ['All', 'Development', 'Design', 'Business', 'Marketing'];

const Catalog: React.FC = () => {
  const { state } = useCourseContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = useMemo(() => {
    return state.courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [state.courses, searchTerm, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Course Catalog</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Find the perfect course to upgrade your skills.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-20 z-10">
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
          />
        </div>
      </div>

      {/* Results */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
           <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
           <h3 className="text-lg font-medium text-gray-900 dark:text-white">No courses found</h3>
           <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or category filters.</p>
           <button 
             onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
             className="mt-4 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
           >
             Clear all filters
           </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;