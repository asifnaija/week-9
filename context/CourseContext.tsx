import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Action, CourseContextType } from '../types';
import { MOCK_COURSES, INITIAL_USER } from '../constants';

const initialState: AppState = {
  courses: MOCK_COURSES,
  enrolledIds: [],
  wishlistIds: [],
  progress: {},
  theme: 'light',
  user: INITIAL_USER,
};

// Pure reducer function for easy unit testing
export const courseReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    
    case 'ENROLL_COURSE':
      if (state.enrolledIds.includes(action.payload)) return state;
      return {
        ...state,
        enrolledIds: [...state.enrolledIds, action.payload],
        progress: {
          ...state.progress,
          [action.payload]: { completedLessons: 0, isCompleted: false },
        },
      };

    case 'TOGGLE_WISHLIST':
      const inWishlist = state.wishlistIds.includes(action.payload);
      return {
        ...state,
        wishlistIds: inWishlist
          ? state.wishlistIds.filter((id) => id !== action.payload)
          : [...state.wishlistIds, action.payload],
      };

    case 'UPDATE_PROGRESS':
      const { courseId, completedLessons } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      const total = course ? course.totalLessons : 100;
      return {
        ...state,
        progress: {
          ...state.progress,
          [courseId]: {
            completedLessons,
            isCompleted: completedLessons >= total,
          },
        },
      };

    case 'INIT_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  // Persistence Logic (Simulating useLocalStorage hook logic)
  useEffect(() => {
    const savedState = localStorage.getItem('learnflow_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        dispatch({ type: 'INIT_STATE', payload: parsed });
      } catch (e) {
        console.error('Failed to parse state', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('learnflow_state', JSON.stringify({
        enrolledIds: state.enrolledIds,
        wishlistIds: state.wishlistIds,
        progress: state.progress,
        theme: state.theme
    }));
  }, [state.enrolledIds, state.wishlistIds, state.progress, state.theme]);

  return (
    <CourseContext.Provider value={{ state, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};