import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, ChevronDown, Bot, Laptop, Database, 
  Cloud, Sparkles, Code2, ArrowRight, GraduationCap, QrCode
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

const academyList = [
  {
    name: 'Tech Courses Catalog',
    href: '/courses',
    desc: 'Python, Java, DevOps, Cloud, AI & QA with 1st Free Video Preview',
    icon: GraduationCap,
    badge: 'Live 5-6 PM'
  },
  {
    name: 'Verify ISO 9001 Certificate',
    href: '/verify-certificate',
    desc: 'Tamper-proof online QR verification registry for recruiters & students',
    icon: QrCode
  }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [academyOpen, setAcademyOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileAcademyOpen, setMobileAcademyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const solTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const acadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
    setSolutionsOpen(false);
    setAcademyOpen(false);
    setMobileSolutionsOpen(false);
    setMobileAcademyOpen(false);
  }, [location]);

  const handleSolEnter = () => {
    if (solTimeoutRef.current) clearTimeout(solTimeoutRef.current);
    setSolutionsOpen(true);
    setAcademyOpen(false);
  };

  const handleSolLeave = () => {
    solTimeoutRef.current = setTimeout(() => setSolutionsOpen(false), 200);
  };

  const handleAcadEnter = () => {
    if (acadTimeoutRef.current) clearTimeout(acadTimeoutRef.current);
    setAcademyOpen(true);
    setSolutionsOpen(false);
  };

  const handleAcadLeave = () => {
    acadTimeoutRef.current = setTimeout(() => setAcademyOpen(false), 200);
  };

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Stories', href: '/testimonials' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const isSolutionsActive = location.pathname.startsWith('/solutions');
  const isAcademyActive = location.pathname.startsWith('/courses') || 
                          location.pathname.startsWith('/academy') || 
                          location.pathname.startsWith('/verify') || 
                          location.pathname.startsWith('/admin');

  return (
    <>
      <nav
        id="navbar"
        className={cn(
          "fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-7xl z-50 transition-all duration-300",
          scrolled ? "top-3 sm:top-4" : "top-4 sm:top-5"
        )}
      >
        <div className={cn(
          "mx-auto flex items-center justify-between px-5 sm:px-7 py-2.5 rounded-[2rem] transition-all duration-300 border border-white/20 shadow-xl overflow-visible",
          scrolled ? "bg-white/95 backdrop-blur-xl py-2 shadow-primary/10" : "bg-white/90 backdrop-blur-xl"
        )}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group z-10 shrink-0 transition-transform active:scale-95">
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <Logo className="w-full h-full" size={40} />
            </div>
            <span className="text-lg sm:text-xl font-black tracking-tighter text-secondary">
              ASAI <span className="text-primary">InfoTech</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-end px-4 xl:px-8">
            <div className="flex items-center gap-4 xl:gap-6 text-[11px] font-black uppercase tracking-[0.15em]">
              {/* Home */}
              <div className="relative group">
                <Link
                  to="/"
                  className={cn(
                    "transition-all hover:text-primary py-2 flex items-center gap-1",
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
                onMouseEnter={handleSolEnter}
                onMouseLeave={handleSolLeave}
              >
                <button
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                  className={cn(
                    "transition-all hover:text-primary py-2 flex items-center gap-1 group",
                    isSolutionsActive ? "text-primary" : "text-secondary"
                  )}
                >
                  <span>SOLUTIONS</span>
                  <ChevronDown className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200 text-primary",
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
                      transition={{ duration: 0.15 }}
                      className="absolute top-full -left-8 mt-2 w-[390px] bg-white/95 backdrop-blur-2xl rounded-3xl p-3.5 shadow-2xl border border-gray-100 z-50"
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-3 py-1 mb-1">
                        Enterprise Solutions
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {solutionsList.map((sol) => (
                          <Link
                            key={sol.name}
                            to={sol.href}
                            onClick={() => setSolutionsOpen(false)}
                            className={cn(
                              "p-2.5 rounded-2xl transition-all flex items-start gap-3 group hover:bg-primary/10",
                              location.pathname === sol.href ? "bg-primary/10 border border-primary/20" : ""
                            )}
                          >
                            <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors mt-0.5">
                              <sol.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-secondary group-hover:text-primary transition-colors">
                                  {sol.name}
                                </span>
                                {sol.badge && (
                                  <span className="px-1.5 py-0.5 bg-primary/20 text-primary text-[8px] font-extrabold rounded-full">
                                    {sol.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-gray-500 line-clamp-1">
                                {sol.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Academy Dropdown Menu */}
              <div 
                className="relative"
                onMouseEnter={handleAcadEnter}
                onMouseLeave={handleAcadLeave}
              >
                <button
                  onClick={() => setAcademyOpen(!academyOpen)}
                  className={cn(
                    "transition-all hover:text-primary py-2 flex items-center gap-1 group",
                    isAcademyActive ? "text-primary" : "text-secondary"
                  )}
                >
                  <span className="flex items-center gap-1">
                    <span>ACADEMY</span>
                    <span className="px-1.5 py-0.2 bg-emerald-500/15 text-emerald-600 text-[8px] font-bold rounded-full lowercase tracking-normal">
                      live
                    </span>
                  </span>
                  <ChevronDown className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200 text-primary",
                    academyOpen ? "rotate-180" : ""
                  )} />
                </button>
                <motion.div 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300"
                  animate={{ width: isAcademyActive ? '100%' : '0%' }}
                />

                <AnimatePresence>
                  {academyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full -left-8 mt-2 w-[390px] bg-white/95 backdrop-blur-2xl rounded-3xl p-3.5 shadow-2xl border border-gray-100 z-50"
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-3 py-1 mb-1">
                        ISO 9001:2015 Tech Academy
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {academyList.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setAcademyOpen(false)}
                            className={cn(
                              "p-2.5 rounded-2xl transition-all flex items-start gap-3 group hover:bg-primary/10",
                              location.pathname === item.href ? "bg-primary/10 border border-primary/20" : ""
                            )}
                          >
                            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors mt-0.5">
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-secondary group-hover:text-primary transition-colors">
                                  {item.name}
                                </span>
                                {item.badge && (
                                  <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-700 text-[8px] font-bold rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-gray-500 line-clamp-1">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Nav Links */}
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.href}
                    className={cn(
                      "transition-all hover:text-primary py-2 flex items-center gap-1",
                      location.pathname === link.href ? "text-primary" : "text-secondary"
                    )}
                  >
                    {link.name}
                  </Link>
                  <motion.div 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                    animate={{ width: location.pathname === link.href ? '100%' : '0%' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-gray-50 text-secondary border border-gray-200 shadow-sm transition-all active:scale-90"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-2 lg:hidden"
            >
              <div className="mx-auto w-full rounded-[2rem] p-4 shadow-2xl border border-gray-200 overflow-y-auto max-h-[82vh] bg-white/95 backdrop-blur-2xl">
                <ul className="grid grid-cols-1 gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <li>
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl transition-all",
                        location.pathname === '/' ? "bg-primary text-white" : "text-secondary hover:bg-gray-50"
                      )}
                    >
                      Home
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </li>

                  {/* Mobile Academy Accordion */}
                  <li className="rounded-xl bg-indigo-50/60 border border-indigo-100 overflow-hidden">
                    <button
                      onClick={() => setMobileAcademyOpen(!mobileAcademyOpen)}
                      className="w-full flex items-center justify-between p-3 text-indigo-950 font-bold transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" /> ACADEMY & CERTIFICATIONS
                      </span>
                      <ChevronDown className={cn("w-4 h-4 text-primary transition-transform", mobileAcademyOpen ? "rotate-180" : "")} />
                    </button>
                    {mobileAcademyOpen && (
                      <div className="p-2 space-y-1 bg-white border-t border-indigo-100">
                        {academyList.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 text-[11px] font-semibold text-gray-700"
                          >
                            <item.icon className="w-4 h-4 text-primary shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>

                  {/* Mobile Solutions Accordion */}
                  <li className="rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                      className="w-full flex items-center justify-between p-3 text-secondary font-bold transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" /> SOLUTIONS
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
                            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 text-[11px] font-semibold text-gray-700"
                          >
                            <sol.icon className="w-4 h-4 text-primary shrink-0" />
                            <span>{sol.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>

                  {/* Other Links */}
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl transition-all",
                          location.pathname === link.href ? "bg-primary text-white" : "text-secondary hover:bg-gray-50"
                        )}
                      >
                        {link.name}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </li>
                  ))}

                  {/* Mobile Nav Ends */}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
