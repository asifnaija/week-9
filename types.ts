import React from 'react';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: 'Development' | 'Design' | 'Business' | 'Marketing';
  description: string;
  totalLessons: number;
}

export interface UserProgress {
  [courseId: string]: {
    completedLessons: number;
    isCompleted: boolean;
  };
}

export type Theme = 'light' | 'dark';

export interface AppState {
  courses: Course[];
  enrolledIds: string[];
  wishlistIds: string[];
  progress: UserProgress;
  theme: Theme;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
}

export type Action =
  | { type: 'TOGGLE_THEME' }
  | { type: 'ENROLL_COURSE'; payload: string }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'UPDATE_PROGRESS'; payload: { courseId: string; completedLessons: number } }
  | { type: 'INIT_STATE'; payload: Partial<AppState> };

export interface CourseContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}