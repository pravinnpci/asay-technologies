import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Cpu, Globe, Zap, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 border-primary/30"
            >
              <Zap className="w-4 h-4 text-primary" fill="currentColor" />
              <span className="text-sm font-semibold text-secondary">Advanced IT Solutions</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Transitioning Ideas into <br />
              <span className="text-gradient">Digital Reality</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Asay Technologies is a top-tier software development company excelling in custom solutions, AI/ML, and cloud integration. 
              We deliver high-quality products with 99.5% global client satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                to="/contact"
                className="px-8 py-4 bg-secondary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary transition-all shadow-xl hover:-translate-y-1"
              >
                Get Started Today <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 glass rounded-xl font-bold text-secondary hover:bg-gray-100 transition-all border-primary/20"
              >
                Our Services
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                <span className="text-sm font-medium">Modern Tech Stack</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">Global Delivery</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative glass p-4 rounded-[2rem] border-white/40 shadow-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000"
                alt="IT Solutions"
                className="rounded-2xl w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent pointer-events-none" />

              {/* Floating Stat Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl border-white/50 shadow-xl hidden sm:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Rocket className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">500+</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Success Stories</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
