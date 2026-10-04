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
import { DigitalCardView } from './views/DigitalCardView';
import { PrivacyView } from './views/PrivacyView';
import { TermsView } from './views/TermsView';
import { CookiesView } from './views/CookiesView';
import { SolutionDetailView } from './views/SolutionDetailView';
import { BlogView } from './views/BlogView';
import { BlogPostView } from './views/BlogPostView';
import { CoursesView } from './views/CoursesView';
import { CourseDetailView } from './views/CourseDetailView';
import { VerifyCertificateView } from './views/VerifyCertificateView';
import { AdminView } from './views/AdminView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FloatingActions } from './components/FloatingActions';
import { ChatBot } from './components/ChatBot';
import { cn } from './lib/utils';

// Scroll to top and sync canonical tag on route change
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

    const timeoutId = setTimeout(handleScroll, 0);

    // Dynamic Route Title synchronization
    const getRouteTitle = (path: string): string => {
      if (path === '/' || path === '') {
        return 'ASAI InfoTech | Leading IT & Software Company in Guduvanchery, Tambaram & Chennai | AI & Web Development';
      }
      if (path === '/verify-certificate' || path === '/verify') {
        return 'ISO 9001:2015 Online Certificate Verification | ASAI InfoTech';
      }
      if (path === '/courses' || path === '/academy') {
        return 'Tech Academy & ISO 9001:2015 Certified Courses | ASAI InfoTech Chennai';
      }
      if (path === '/admin') {
        return 'Academy Management & Student Admissions Portal | ASAI InfoTech';
      }
      if (path === '/about') {
        return 'About Us | ASAI InfoTech - Top IT & Software Company in Guduvanchery & Chennai';
      }
      if (path === '/services') {
        return 'Enterprise IT Services & Software Solutions | ASAI InfoTech Guduvanchery, Chennai';
      }
      if (path.startsWith('/services/') || path.startsWith('/solutions/')) {
        return 'Enterprise Engineering Solution | ASAI InfoTech Chennai';
      }
      if (path === '/testimonials') {
        return 'Client Testimonials & Enterprise Reviews | ASAI InfoTech';
      }
      if (path === '/careers') {
        return 'Careers at ASAI InfoTech | Join Leading Tech Innovators in Guduvanchery, Chennai';
      }
      if (path === '/contact') {
        return 'Contact ASAI InfoTech | IT & Software Consultation in Guduvanchery, Chennai';
      }
      if (path === '/card') {
        return 'Smart Digital Business Card | Sivabarathi M - ASAI InfoTech';
      }
      if (path === '/blog') {
        return 'Tech Insights & Engineering Blog | ASAI InfoTech';
      }
      if (path.startsWith('/blog/')) {
        return 'Tech Article & Engineering Deep-Dive | ASAI InfoTech Blog';
      }
      if (path === '/privacy') {
        return 'Privacy Policy | ASAI InfoTech Software Solutions';
      }
      if (path === '/terms') {
        return 'Terms of Service | ASAI InfoTech';
      }
      if (path === '/cookies') {
        return 'Cookie Policy | ASAI InfoTech';
      }
      return 'ASAI InfoTech | Leading IT & Software Company in Guduvanchery, Tambaram & Chennai';
    };

    if (!pathname.startsWith('/courses/')) {
      document.title = getRouteTitle(pathname);
    }

    // Dynamic Canonical URL Tag for Googlebot & SEO indexing
    try {
      let canonicalLink = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      const cleanPath = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
      canonicalLink.setAttribute('href', `https://asayinfotech.in${cleanPath}`);
    } catch (err) {
      console.warn('Canonical update warning:', err);
    }

    // Refresh AdSense in SPA on page navigation
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      // ignore
    }

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
            <Route path="/academy" element={<CoursesView />} />
            <Route path="/courses" element={<CoursesView />} />
            <Route path="/courses/:courseId" element={<CourseDetailView />} />
            <Route path="/verify-certificate" element={<VerifyCertificateView />} />
            <Route path="/verify" element={<VerifyCertificateView />} />
            <Route path="/admin" element={
              <ErrorBoundary fallbackTitle="Admin Portal Recovery">
                <AdminView />
              </ErrorBoundary>
            } />
            <Route path="/careers" element={<CareersView />} />
            <Route path="/blog" element={<BlogView />} />
            <Route path="/blog/:slug" element={<BlogPostView />} />
            <Route path="/contact" element={<ContactView />} />
            <Route path="/card" element={<DigitalCardView />} />
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
