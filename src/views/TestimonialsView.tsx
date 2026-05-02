import React from 'react';
import { motion } from 'motion/react';
import { Testimonials } from '../components/Testimonials';

export function TestimonialsView() {
  return (
    <div className="pt-24 pb-20">
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-secondary mb-8 tracking-tight"
            >
              Client <span className="text-gradient"> Success</span> Stories
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              Discover how Asay Technologies has helped organizations around the globe transform their digital capabilities and reach new heights.
            </motion.p>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-8">Ready to be our next success story?</h2>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">Join the ranks of leading companies that trust us with their core technology and digital vision.</p>
          <a
            href="/contact"
            className="px-12 py-5 bg-secondary text-white rounded-2xl font-bold hover:bg-primary transition-all shadow-2xl inline-block"
          >
            Start Your Journey
          </a>
        </div>
      </section>
    </div>
  );
}
