import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Rocket, Twitter, Github, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white border-t border-white/5">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg transform rotate-12">
                <Rocket className="text-white w-6 h-6 -rotate-12" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ASAY <span className="text-primary">Technologies</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Empowering organizations with cutting-edge technology and innovative digital solutions for a fast-evolving world.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 border border-white/10"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-4">
              {[
                'Web App Development',
                'SaaS Platforms',
                'Cloud Integration',
                'Digital Services',
                'Custom Software'
              ].map((item) => (
                <li key={item}>
                  <Link 
                    to="/services" 
                    className="text-gray-400 hover:text-white hover:bg-primary px-3 -ml-3 py-1 rounded-lg transition-all duration-300 flex items-center gap-2 group text-sm hover:translate-x-2"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all font-bold" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Success Stories', path: '/testimonials' },
                { name: 'Careers', path: '/careers' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-gray-400 hover:text-white hover:bg-primary px-3 -ml-3 py-1 rounded-lg transition-all duration-300 flex items-center gap-2 group text-sm hover:translate-x-2"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all font-bold" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Map Placeholder */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Locations</h4>
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary w-5 h-5 mt-1 shrink-0" />
                <span className="text-gray-400 leading-relaxed font-medium">Headquarters (India): First Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery 603202</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-primary w-5 h-5 shrink-0" />
                <a href="mailto:hello@asaytech.com" className="text-gray-400 hover:text-primary transition-colors font-medium">hello@asaytech.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary w-5 h-5 shrink-0" />
                <a href="tel:+919245464648" className="text-gray-400 hover:text-primary transition-colors font-medium">+91 9245464648</a>
              </div>
            </div>

            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Payments Accepted</h4>
            <div className="flex gap-4 mb-8">
              <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold text-gray-400 group hover:border-primary/50 transition-colors cursor-default">
                <span className="text-primary">G</span>Pay
              </div>
              <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold text-gray-400 group hover:border-primary/50 transition-colors cursor-default">
                UPI
              </div>
              <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold text-gray-400 group hover:border-primary/50 transition-colors cursor-default">
                Bank Transfer
              </div>
            </div>

            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-xs">Join Newsletter</h4>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all pr-12 text-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 px-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>© {currentYear} Asay Technologies Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
