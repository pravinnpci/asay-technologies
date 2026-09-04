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
import { TermsView } from './views/TermsView';
import { CookiesView } from './views/CookiesView';
import { SolutionDetailView } from './views/SolutionDetailView';
import { BlogView } from './views/BlogView';
import { BlogPostView } from './views/BlogPostView';
import { FloatingActions } from './components/FloatingActions';
import { ChatBot } from './components/ChatBot';
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
            <Route path="/services/:slug" element={<SolutionDetailView />} />
            <Route path="/solutions/:slug" element={<SolutionDetailView />} />
            <Route path="/careers" element={<CareersView />} />
            <Route path="/blog" element={<BlogView />} />
            <Route path="/blog/:slug" element={<BlogPostView />} />
            <Route path="/contact" element={<ContactView />} />
            <Route path="/privacy" element={<PrivacyView />} />
            <Route path="/terms" element={<TermsView />} />
            <Route path="/cookies" element={<CookiesView />} />
          </Routes>
        </main>

        <Footer />
        <FloatingActions />
        <ChatBot />

        {/* Global Decor */}
        <div className="pointer-events-none fixed inset-0 z-[-1] opacity-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px]" />
        </div>
      </div>
    </Router>
  );
}
