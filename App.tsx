import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;