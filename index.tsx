import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { CourseProvider } from './context/CourseContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <CourseProvider>
        <App />
      </CourseProvider>
    </HashRouter>
  </React.StrictMode>
);