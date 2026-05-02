import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

export function ContactView() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // Added phone number field
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (validate()) {
      try {
        // Save to Supabase
        const { error: supabaseError } = await supabase
          .from('contact_requests')
          .insert([{
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message
          }]);

        if (supabaseError) throw supabaseError;

        const accountSid = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
        const authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
        const contentSid = import.meta.env.VITE_TWILIO_CONTENT_SID;
        const whatsappNumber = import.meta.env.VITE_WEBSITE_WHATSAPP_NUMBER;
        const to = `whatsapp:${whatsappNumber}`;
        const from = 'whatsapp:+14155238886'; // Your Twilio WhatsApp Sandbox number

        const messageBody = `ASAY Technologies - New Contact Request\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject || 'N/A'}\nMessage: ${formData.message}`;

        const params: Record<string, string> = {
          'To': to,
          'From': from,
        };

        if (contentSid) {
          params['ContentSid'] = contentSid;
        } else {
          params['Body'] = messageBody;
        }

        await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(params)
        });
      } catch (error) {
        const err = error as any;
        console.error('Form Submission Failed:', {
          message: err?.message || 'Unknown error',
          hint: err?.hint,
          details: err?.details
        });
      }

      setSubmitted(true);
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
                { icon: Phone, label: 'Contact Number', value: '+91 9245464648', href: 'tel:+919245464648' },
                { 
                  icon: MessageSquare, 
                  label: 'WhatsApp Chat', 
                  value: '+91 9245464648',
                  href: 'https://wa.me/919245464648'
                },
                { icon: Mail, label: 'Email Address', value: 'hello@asaytech.com', href: 'mailto:hello@asaytech.com' },
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

            {/* Payment Info */}
            <div className="glass p-8 rounded-[2.5rem] border-white/40">
              <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">₹</span>
                Secure Payment Methods
              </h3>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white text-[10px] font-black italic">GPay</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-secondary">Pay on Google Pay</p>
                    <p className="text-xs font-bold text-primary">+91 9245464648</p>
                  </div>
                </div>
                <div className="px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-black italic">UPI</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-secondary">UPI ID</p>
                    <p className="text-xs font-bold text-primary">asaytech@okicici</p>
                  </div>
                </div>
              </div>
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
                  className="w-full py-5 bg-gradient-to-r from-secondary to-primary text-white rounded-2xl font-bold shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h2>
                <p className="text-gray-500 mb-8">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-secondary text-white rounded-xl font-bold"
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
