import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

import Home from './pages/Home';

// Lazy load pages
const About = lazy(() => import('./pages/About'));
const Product1 = lazy(() => import('./pages/Product1'));
const Product2 = lazy(() => import('./pages/Product2'));
const Products = lazy(() => import('./pages/Products'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Videos = lazy(() => import('./pages/Videos'));

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen selection:text-accent ${isAdminPage ? 'bg-white' : 'bg-[#FAF9F6]'}`}>
      {!isAdminPage && <Navbar />}
      <main>
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005948]"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vegetable-seeds" element={<Product1 />} />
            <Route path="/field-crop-seeds" element={<Product2 />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/videos" element={<Videos />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminPage && <Footer />}
      {import.meta.env.PROD && <SpeedInsights />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;
