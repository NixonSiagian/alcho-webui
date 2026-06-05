/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LenisProvider from './components/LenisProvider';
import ScrollToTop from './components/common/ScrollToTop';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
const Products = lazy(() => import('./pages/Products'));
const Recipes = lazy(() => import('./pages/Recipes'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Horeca = lazy(() => import('./pages/Horeca'));
const OEM = lazy(() => import('./pages/OEM'));
const Distributor = lazy(() => import('./pages/Distributor'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Resources = lazy(() => import('./pages/Resources'));

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <LenisProvider>
        <div className="relative bg-brand-bg text-white font-sans selection:bg-brand-primary selection:text-brand-bg overflow-x-hidden">
          <Navbar />
          
          <main className="relative z-10 w-full min-h-screen">
            <Suspense fallback={
              <div className="h-screen w-full flex items-center justify-center bg-brand-bg">
                <div className="w-12 h-12 rounded-full border-2 border-brand-primary/20 border-t-brand-primary animate-spin" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/horeca" element={<Horeca />} />
                <Route path="/oem" element={<OEM />} />
                <Route path="/distributor" element={<Distributor />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/resources" element={<Resources />} />
                {/* Fallback */}
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </LenisProvider>
    </Router>
  );
}
