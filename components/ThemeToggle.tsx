import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useCourseContext } from '../context/CourseContext';

const ThemeToggle: React.FC = () => {
  const { state, dispatch } = useCourseContext();

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-100"
      aria-label="Toggle theme"
    >
      {state.theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;