import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, ChevronDown, Bot, Laptop, Database, 
  Cloud, Sparkles, Code2, Layers, ArrowRight 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

const solutionsList = [
  {
    name: 'AI Agents, RAG & MCP',
    href: '/solutions/ai-agents-rag-mcp',
    desc: 'Autonomous swarms, enterprise RAG & MCP tool servers',
    icon: Bot,
    badge: 'Popular'
  },
  {
    name: 'Web App Development',
    href: '/solutions/web-app-development',
    desc: 'High-performance React & Next.js modern web applications',
    icon: Laptop
  },
  {
    name: 'SaaS Platforms',
    href: '/solutions/saas-platforms',
    desc: 'Multi-tenant cloud architectures with recurring billing',
    icon: Database
  },
  {
    name: 'Cloud Integration',
    href: '/solutions/cloud-integration',
    desc: 'AWS, GCP, Docker orchestration & zero-downtime CI/CD',
    icon: Cloud
  },
  {
    name: 'Digital Services',
    href: '/solutions/digital-services',
    desc: 'End-to-end digital transformation & custom AI integration',
    icon: Sparkles
  },
  {
    name: 'Custom Software',
    href: '/solutions/custom-software',
    desc: 'Tailored enterprise ERP, CRM & operational portals',
    icon: Code2
  }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
    setSolutionsOpen(false);
    setMobileSolutionsOpen(false);
  }, [location]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
    }, 200);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Success Stories', href: '/testimonials' },
    { name: 'Careers', href: '/careers' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Contact', href: '/contact' },
  ];

  const isSolutionsActive = location.pathname.startsWith('/solutions');

  return (
    <>
      <nav
        id="navbar"
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-7xl z-50 transition-all duration-500",
          scrolled ? "top-4" : "top-6"
        )}
      >
        <div className={cn(
          "mx-auto flex items-center justify-between px-6 sm:px-8 py-3 rounded-[2.5rem] transition-all duration-500 border border-white/20 shadow-2xl overflow-visible",
          scrolled ? "bg-white/95 backdrop-blur-xl py-2 shadow-primary/10" : "bg-white/80 backdrop-blur-xl"
        )}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group z-10 shrink-0 transition-transform active:scale-95">
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <Logo className="w-full h-full" size={44} />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-secondary">
              ASAY <span className="text-primary">InfoTech</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-end px-6 xl:px-10">
            <div className="flex items-center gap-5 xl:gap-8">
              {/* Home */}
              <div className="relative group">
                <Link
                  to="/"
                  className={cn(
                    "font-black transition-all hover:text-primary uppercase text-[10px] xl:text-[11px] tracking-[0.2em] whitespace-nowrap py-2 flex items-center gap-1",
                    location.pathname === '/' ? "text-primary" : "text-secondary"
                  )}
                >
                  Home
                </Link>
                <motion.div 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                  animate={{ width: location.pathname === '/' ? '100%' : '0%' }}
                />
              </div>

              {/* Solutions Dropdown Menu */}
              <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                  className={cn(
                    "font-black transition-all hover:text-primary uppercase text-[10px] xl:text-[11px] tracking-[0.2em] whitespace-nowrap py-2 flex items-center gap-1.5 group",
                    isSolutionsActive ? "text-primary" : "text-secondary"
                  )}
                >
                  <span>Solutions</span>
                  <ChevronDown className={cn(
                    "w-3.5 h-3.5 transition-transform duration-300 text-primary",
                    solutionsOpen ? "rotate-180" : ""
                  )} />
                </button>
                <motion.div 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300"
                  animate={{ width: isSolutionsActive ? '100%' : '0%' }}
                />

                {/* Dropdown Menu Overlay */}
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full -left-12 mt-2 w-[420px] bg-white/95 backdrop-blur-2xl rounded-3xl p-4 shadow-3xl border border-gray-100 z-50"
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-3 py-1 mb-2">
                        Enterprise Solutions Catalog
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        {solutionsList.map((sol) => (
                          <Link
                            key={sol.name}
                            to={sol.href}
                            onClick={() => setSolutionsOpen(false)}
                            className={cn(
                              "p-3 rounded-2xl transition-all flex items-start gap-3.5 group hover:bg-primary/10",
                              location.pathname === sol.href ? "bg-primary/10 border border-primary/20" : ""
                            )}
                          >
                            <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors mt-0.5">
                              <sol.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-secondary group-hover:text-primary transition-colors tracking-tight">
                                  {sol.name}
                                </span>
                                {sol.badge && (
                                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-[9px] font-extrabold rounded-full">
                                    {sol.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                                {sol.desc}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all self-center shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Nav Links */}
              {navLinks.slice(1).map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.href}
                    className={cn(
                      "font-black transition-all hover:text-primary uppercase text-[10px] xl:text-[11px] tracking-[0.2em] whitespace-nowrap py-2 flex items-center gap-1",
                      location.pathname === link.href ? "text-primary" : "text-secondary"
                    )}
                  >
                    {link.name}
                  </Link>
                  <motion.div 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                    animate={{ width: location.pathname === link.href ? '100%' : '0%' }}
                  />
                  <div className="absolute -inset-x-3 -inset-y-2 bg-primary/0 group-hover:bg-primary/5 rounded-xl transition-colors duration-300 -z-10" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-gray-50 text-secondary border border-gray-200 shadow-sm hover:shadow-md transition-all active:scale-90"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-3 lg:hidden"
            >
              <div className="glass mx-auto w-full rounded-[2.5rem] p-5 shadow-3xl border-white/60 overflow-y-auto max-h-[85vh] bg-white/95 backdrop-blur-2xl">
                <ul className="grid grid-cols-1 gap-2">
                  {/* Home Link */}
                  <li>
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center justify-between p-3.5 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest",
                        location.pathname === '/' 
                          ? "bg-primary text-white shadow-lg shadow-primary/30" 
                          : "text-secondary hover:bg-primary/5"
                      )}
                    >
                      Home
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </li>

                  {/* Solutions Accordion */}
                  <li className="rounded-2xl bg-gray-50/70 border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                      className="w-full flex items-center justify-between p-3.5 font-bold text-xs uppercase tracking-widest text-secondary hover:bg-primary/5 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" /> Solutions
                      </span>
                      <ChevronDown className={cn("w-4 h-4 text-primary transition-transform", mobileSolutionsOpen ? "rotate-180" : "")} />
                    </button>
                    {mobileSolutionsOpen && (
                      <div className="p-2 space-y-1 bg-white border-t border-gray-100">
                        {solutionsList.map((sol) => (
                          <Link
                            key={sol.name}
                            to={sol.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-primary/10 text-xs font-semibold text-gray-700"
                          >
                            <sol.icon className="w-4 h-4 text-primary shrink-0" />
                            <span>{sol.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>

                  {/* Other Links */}
                  {navLinks.slice(1).map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-3.5 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest group",
                          location.pathname === link.href 
                            ? "bg-primary text-white shadow-lg shadow-primary/30" 
                            : "text-secondary hover:bg-primary/5"
                        )}
                      >
                        {link.name}
                        <ChevronRight className={cn(
                          "w-4 h-4 transition-transform group-hover:translate-x-1",
                          location.pathname === link.href ? "text-white" : "text-primary"
                        )} />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">ASAY InfoTech © 2026</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
