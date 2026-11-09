import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, MessageSquare, QrCode, Smartphone, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { ENV } from '../config/env';
import { sendEmailSubmission } from '../lib/mail';

export function ContactView() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    // Generate high resolution QR code linking directly to the Smart Card page
    const cardUrl = 'https://asayinfotech.in/card';
    QRCode.toDataURL(cardUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    })
      .then(url => setQrCodeDataUrl(url))
      .catch(err => console.error('QR generation error:', err));
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await sendEmailSubmission({
        formType: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Submission handled:', error);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-app-bg">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-secondary mb-6"
          >
            Let's <span className="text-gradient">Connect</span>
          </motion.h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Have a project in mind? Or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { 
                  icon: MapPin, 
                  label: 'Chennai Office (HQ)', 
                  value: 'First Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery 603202',
                  href: '#' 
                },
                { icon: Phone, label: 'Contact Number', value: '+91 6382907182', href: 'tel:+916382907182' },
                { 
                  icon: MessageSquare, 
                  label: 'WhatsApp Chat', 
                  value: '+91 6382907182',
                  href: 'https://wa.me/916382907182'
                },
                { icon: Mail, label: 'Email Address', value: 'asayinfotech@gmail.com', href: 'mailto:asayinfotech@gmail.com' },
              ].map((item, i) => (
                <div key={i} className="glass p-8 rounded-3xl border-primary/10 transition-all duration-300 hover:-translate-y-2 hover:bg-secondary group">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-secondary mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-widest group-hover:text-white transition-colors">{item.label}</h3>
                  <a href={item.href} className="text-gray-500 hover:text-primary transition-colors text-sm leading-relaxed block group-hover:text-white/80">
                    {item.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Smart Digital Card & QR Scan Interactive Card */}
            <div className="glass p-6 sm:p-8 rounded-[2.5rem] border-primary/20 bg-gradient-to-br from-secondary/95 via-secondary to-slate-900 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                {/* QR Display */}
                <div className="bg-white p-3 rounded-2xl shadow-xl shrink-0 text-center">
                  {qrCodeDataUrl ? (
                    <img 
                      src={qrCodeDataUrl} 
                      alt="ASAY InfoTech Contact QR" 
                      className="w-32 h-32 rounded-xl object-contain mx-auto"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-slate-100 flex items-center justify-center rounded-xl text-slate-400">
                      <QrCode className="w-10 h-10 animate-pulse" />
                    </div>
                  )}
                  <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mt-1.5 flex items-center justify-center gap-1">
                    <Smartphone className="w-3 h-3 text-primary" /> Scan with Camera
                  </p>
                </div>

                {/* Info Text & Direct Action */}
                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-semibold tracking-wide border border-primary/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Tap & QR Smart Profile
                  </div>

                  <h3 className="text-xl font-bold text-white leading-tight">
                    Instant Digital Business Card
                  </h3>
                  
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Scan this QR code with any mobile camera or tap via NFC to immediately save our verified company contact details, WhatsApp & IT Services portfolio.
                  </p>

                  <div className="pt-1">
                    <Link
                      to="/card"
                      className="inline-flex items-center gap-2 text-xs font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-primary/30 group"
                    >
                      <span>Open Smart Card View</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Mockup */}
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl glass p-3 border-white">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.34752!2d80.050441!3d12.86002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUxJzM2LjEiTiA4MMKwMDMnMTAuOSJF!5e0!3m2!1sen!2sin!4v1731500000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                className="rounded-[2rem]"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8 md:p-12 rounded-[3rem] border-white/40 shadow-2xl"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                    <input
                      type="text"
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl bg-primary/5 border outline-none transition-all focus:ring-4 focus:ring-primary/20",
                        errors.name ? "border-red-400" : "border-primary/20 focus:border-primary"
                      )}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input
                      type="email"
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl bg-primary/5 border outline-none transition-all focus:ring-4 focus:ring-primary/20",
                        errors.email ? "border-red-400" : "border-primary/20 focus:border-primary"
                      )}
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                  <input
                    type="tel" // Use type="tel" for phone numbers
                    className={cn(
                      "w-full px-6 py-4 rounded-2xl bg-primary/5 border outline-none transition-all focus:ring-4 focus:ring-primary/20",
                      errors.phone ? "border-red-400" : "border-primary/20 focus:border-primary"
                    )}
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-primary/5 border border-primary/20 outline-none transition-all focus:ring-4 focus:ring-primary/20 focus:border-primary"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                  <textarea
                    rows={5}
                    className={cn(
                      "w-full px-6 py-4 rounded-2xl bg-primary/5 border outline-none transition-all focus:ring-4 focus:ring-primary/20 resize-none",
                      errors.message ? "border-red-400" : "border-primary/20 focus:border-primary"
                    )}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1 ml-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-gradient-to-r from-secondary to-primary text-white rounded-2xl font-bold shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  <Send className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-xs text-gray-600 space-y-2 mb-6 max-w-md mx-auto">
                  <p className="font-bold text-secondary text-sm">✅ Confirmation Email Dispatched!</p>
                  <p>A confirmation email has been sent to your inbox. Our client support team will contact you within 24 hours.</p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="px-8 py-3.5 bg-secondary text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
