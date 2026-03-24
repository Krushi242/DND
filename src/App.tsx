import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Product1 = lazy(() => import('./pages/Product1'));
const Product2 = lazy(() => import('./pages/Product2'));
const Contact = lazy(() => import('./pages/Contact'));


const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:text-accent bg-[#FAF9F6]">
        <Navbar />
        <main>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005948]"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/vegetable-seeds" element={<Product1 />} />
              <Route path="/field-crop-seeds" element={<Product2 />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <SpeedInsights/>

      </div>
    </Router>
  );
};


export default App;
