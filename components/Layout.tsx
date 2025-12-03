import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, GraduationCap, Heart, Home, Menu, Search, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useCourseContext } from '../context/CourseContext';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state } = useCourseContext();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Browse', path: '/catalog', icon: Search },
    { name: 'My Learning', path: '/learning', icon: GraduationCap, badge: state.enrolledIds.length },
    { name: 'Wishlist', path: '/wishlist', icon: Heart, badge: state.wishlistIds.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                  LearnFlow
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                  {item.badge ? (
                    <span className="ml-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </NavLink>
              ))}
              <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2"></div>
              <ThemeToggle />
              <div className="flex items-center gap-3 pl-2">
                <img
                  src={state.user.avatar}
                  alt="Profile"
                  className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-700"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-3 rounded-md text-base font-medium ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                  {item.badge ? (
                    <span className="ml-auto bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </NavLink>
              ))}
            </div>
            <div className="pt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={state.user.avatar}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-gray-800 dark:text-white">
                    {state.user.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400 mt-1">
                    {state.user.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <Outlet />
      </main>

       <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                &copy; 2024 LearnFlow Edutech. All rights reserved.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;