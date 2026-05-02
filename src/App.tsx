import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, MessageSquare } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import AboutView from './views/AboutView';
import { TestimonialsView } from './views/TestimonialsView';
import { ServicesView } from './views/ServicesView';
import { CareersView } from './views/CareersView';
import { ContactView } from './views/ContactView';
import { PrivacyView } from './views/PrivacyView';
import { FloatingActions } from './components/FloatingActions';
import { cn } from './lib/utils';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.documentElement.style.scrollBehavior = 'smooth';
    };

    // Use a small timeout to ensure the route change and DOM updates have finished
    const timeoutId = setTimeout(handleScroll, 0);
    return () => clearTimeout(timeoutId);
  }, [pathname]);
  return null;
}

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-app-bg text-gray-900 overflow-x-hidden selection:bg-primary/30">
        <Navbar />

        <main className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/testimonials" element={<TestimonialsView />} />
            <Route path="/services" element={<ServicesView />} />
            <Route path="/careers" element={<CareersView />} />
            <Route path="/contact" element={<ContactView />} />
            <Route path="/privacy" element={<PrivacyView />} />
          </Routes>
        </main>

        <Footer />
        <FloatingActions />

        {/* Back To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-40 right-9 w-12 h-12 bg-white text-secondary rounded-full shadow-2xl flex items-center justify-center border border-primary/20 hover:bg-primary z-[100] group transition-all"
              aria-label="Back to top"
            >
              <ChevronUp className="w-7 h-7 group-hover:text-white group-hover:-translate-y-1 transition-all" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Global Decor */}
        <div className="pointer-events-none fixed inset-0 z-[-1] opacity-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px]" />
        </div>
      </div>
    </Router>
  );
}
