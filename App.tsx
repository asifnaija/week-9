import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useCourseContext } from './context/CourseContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import MyLearning from './pages/MyLearning';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';

const AppContent: React.FC = () => {
  const { state } = useCourseContext();

  return (
    // Top-level div handles the dark mode class based on context
    <div className={state.theme === 'dark' ? 'dark' : ''}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="learning" element={<MyLearning />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  // App is now wrapped in the provider in index.tsx
  // This separation allows testing AppContent with a mock provider
  return <AppContent />;
};

export default App;