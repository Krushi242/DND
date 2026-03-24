import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Product1 from './pages/Product1';
import Product2 from './pages/Product2';
import Contact from './pages/Contact';
import { SpeedInsights } from "@vercel/speed-insights/react";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:text-accent bg-[#FAF9F6]">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product-1" element={<Product1 />} />
            <Route path="/product-2" element={<Product2 />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <SpeedInsights/>

      </div>
    </Router>
  );
};


export default App;
