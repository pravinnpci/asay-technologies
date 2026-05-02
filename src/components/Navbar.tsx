import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Rocket, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Success Stories', href: '/testimonials' },
    { name: 'Careers', href: '/careers' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-7xl z-50 transition-all duration-500",
          scrolled ? "top-4" : "top-6"
        )}
      >
        <div className={cn(
          "mx-auto flex items-center justify-between px-8 py-3 rounded-[2.5rem] transition-all duration-500 border border-white/20 shadow-2xl overflow-hidden",
          scrolled ? "bg-white/90 backdrop-blur-xl py-2 shadow-primary/10" : "bg-white/60 backdrop-blur-xl"
        )}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group z-10 shrink-0 transition-transform active:scale-95">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform">
              <Rocket className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <span className="hidden sm:block text-2xl font-black tracking-tighter text-secondary">
              ASAY <span className="text-primary">Technologies</span>
            </span>
          </Link>

          {/* Desktop Navigation - Minimalist Clean Menu */}
          <div className="hidden lg:flex items-center flex-1 justify-end px-10">
            <div className="flex items-center gap-6 xl:gap-10">
              {navLinks.map((link) => (
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
                  {/* Hover background effect */}
                  <div className="absolute -inset-x-3 -inset-y-2 bg-primary/0 group-hover:bg-primary/5 rounded-xl transition-colors duration-300 -z-10" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-2xl bg-gray-50 text-secondary border border-gray-200 shadow-sm hover:shadow-md transition-all active:scale-90"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown - Modern Minimalist */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-4 lg:hidden"
            >
              <div className="glass mx-auto w-full rounded-[2.5rem] p-6 shadow-3xl border-white/60 overflow-y-auto max-h-[80vh]">
                <ul className="grid grid-cols-1 gap-3">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm uppercase tracking-widest group",
                          location.pathname === link.href 
                            ? "bg-primary text-white shadow-lg shadow-primary/30" 
                            : "text-secondary hover:bg-primary/5 hover:translate-x-2"
                        )}
                      >
                        {link.name}
                        <ChevronRight className={cn(
                          "w-4 h-4 transition-transform group-hover:translate-x-1",
                          location.pathname === link.href ? "text-white" : "text-primary"
                        )} />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-secondary/5 flex justify-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/30">Asay Technologies © 2026</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
