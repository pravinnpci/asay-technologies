import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Twitter, Github, Linkedin, Instagram, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ENV } from '../config/env';
import { sendEmailSubmission } from '../lib/mail';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterStatus('error');
      setNewsletterMessage('Please enter a valid email address.');
      return;
    }

    setNewsletterStatus('loading');
    try {
      await sendEmailSubmission({
        formType: 'newsletter',
        name: 'Newsletter Subscriber',
        email: newsletterEmail
      });

      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch (err) {
      console.log('Newsletter sub:', err);
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-secondary text-white border-t border-white/5">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <Logo className="w-full h-full" size={40} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ASAY <span className="text-primary">InfoTech</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Empowering organizations with cutting-edge technology and innovative digital solutions for a fast-evolving world.
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              {[
                { 
                  icon: Linkedin, 
                  href: 'https://www.linkedin.com/in/asay-infotech-web-app-development-278841432/', 
                  label: 'LinkedIn',
                  color: 'hover:bg-[#0A66C2]'
                },
                { 
                  icon: Instagram, 
                  href: 'https://www.instagram.com/asayinfotech/', 
                  label: 'Instagram',
                  color: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]'
                },
                { 
                  icon: Mail, 
                  href: 'mailto:asayinfotech@gmail.com', 
                  label: 'Email Us',
                  color: 'hover:bg-[#EA4335]'
                },
                { 
                  icon: () => (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                  ), 
                  href: 'https://www.google.com/search?q=ASAY+InfoTech+Guduvanchery', 
                  label: 'Google',
                  color: 'hover:bg-[#4285F4]'
                }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className={`w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/70 ${item.color} hover:text-white transition-all transform hover:-translate-y-1 border border-white/10`}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Solutions */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-4">
              {[
                { name: 'AI Agents, RAG & MCP', path: '/solutions/ai-agents-rag-mcp' },
                { name: 'Web App Development', path: '/solutions/web-app-development' },
                { name: 'SaaS Platforms', path: '/solutions/saas-platforms' },
                { name: 'Cloud Integration', path: '/solutions/cloud-integration' },
                { name: 'Digital Services', path: '/solutions/digital-services' },
                { name: 'Custom Software', path: '/solutions/custom-software' }
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
                <a href="mailto:asayinfotech@gmail.com" className="text-gray-400 hover:text-primary transition-colors font-medium">asayinfotech@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary w-5 h-5 shrink-0" />
                <a href="tel:+916382907182" className="text-gray-400 hover:text-primary transition-colors font-medium">+91 6382907182</a>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider text-xs">Join Newsletter</h4>
              <p className="text-gray-400 text-xs mb-3">Get the latest technology insights & project updates.</p>

              {newsletterStatus === 'success' ? (
                <div className="p-3 bg-green-500/20 border border-green-500/40 rounded-xl flex items-center gap-2 text-green-400 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-green-400" />
                  <span>Subscribed! Check your inbox for confirmation.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all pr-12 text-xs"
                    />
                    <button 
                      type="submit" 
                      disabled={newsletterStatus === 'loading'}
                      className="absolute right-2 top-2 bottom-2 px-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors disabled:opacity-50 flex items-center justify-center"
                      aria-label="Subscribe to newsletter"
                    >
                      {newsletterStatus === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {newsletterStatus === 'error' && (
                    <p className="text-[11px] text-red-400 pl-1">{newsletterMessage}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>© {currentYear} ASAY InfoTech Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookies Settings</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
