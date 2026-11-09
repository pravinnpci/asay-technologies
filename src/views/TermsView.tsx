import React from 'react';
import { motion } from 'motion/react';
import { FileCheck, ShieldCheck, Scale, AlertCircle } from 'lucide-react';
import { ENV } from '../config/env';

export function TermsView() {
  return (
    <div className="pt-36 pb-20 min-h-screen bg-app-bg">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto glass rounded-[3rem] p-8 md:p-16 shadow-2xl border-white/60"
        >
          <div className="flex items-center gap-4 mb-8 text-primary">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-secondary tracking-tight">Terms of Service</h1>
              <p className="text-xs text-gray-400 font-medium">ASAY InfoTech Professional Agreement</p>
            </div>
          </div>

          <div className="space-y-10 text-gray-600 text-sm md:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" /> 1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the website, software, or digital engineering services provided by <strong>ASAY InfoTech</strong> ("Company", "we", "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> 2. Intellectual Property & Deliverables
              </h2>
              <p>
                All bespoke software, codebases, custom models, and architectures developed for clients under contract become the property of the client upon final milestone payment completion. Pre-existing proprietary frameworks, boilerplates, and open-source packages remain subject to their respective standard licenses.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" /> 3. Service Level Agreements & Support
              </h2>
              <p>
                We provide comprehensive quality assurance, bug fixes, and post-launch maintenance according to individual statement of work (SOW) agreements. Standard production support includes cloud monitoring, security patch management, and technical advisory.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" /> 4. Governing Law & Jurisdiction
              </h2>
              <p>
                These terms are governed by and construed in accordance with the laws of Tamil Nadu, India. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts in Chennai, India.
              </p>
            </section>

            <div className="pt-8 border-t border-gray-100 mt-12 text-xs text-gray-400">
              <p>Last updated: August 2026. For questions regarding these terms, please contact us at <strong>{ENV.COMPANY_EMAIL}</strong> or call <strong>{ENV.WHATSAPP_NUMBER}</strong>.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
