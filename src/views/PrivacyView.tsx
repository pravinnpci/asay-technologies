import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export function PrivacyView() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-app-bg">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto glass rounded-[3rem] p-8 md:p-16 shadow-2xl border-white/40"
        >
          <div className="flex items-center gap-4 mb-8 text-primary">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-black text-secondary tracking-tighter">Privacy Policy</h1>
          </div>

          <div className="space-y-12 text-gray-600">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" /> 1. Data Protection
              </h2>
              <p className="leading-relaxed">
                At Asay Technologies, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our website and services. We are committed to ensuring that your data is handled with the highest level of security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" /> 2. Information We Collect
              </h2>
              <p className="leading-relaxed">
                We may collect personal identification information from Users in various ways, including when Users visit our site, register, fill out a form, or subscribe to our newsletter. This may include name, email address, phone number, and professional details.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Usage data and cookies to improve user experience.</li>
                <li>Contact information submitted via our forms.</li>
                <li>Professional history for career applications.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> 3. How We Use Your Data
              </h2>
              <p className="leading-relaxed">
                The information we collect is used to personalize your experience, improve our website, process transactions, and send periodic emails regarding our services and updates. Your information will never be sold or shared with third parties for marketing purposes without your explicit consent.
              </p>
            </section>

            <div className="pt-12 border-t border-gray-100 mt-20 text-sm text-gray-400">
              <p>Last updated: May 1, 2026. For any questions regarding this policy, please contact us at privacy@asaytech.com</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
