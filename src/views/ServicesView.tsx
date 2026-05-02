import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, X, Maximize2, Cpu, Globe, Zap, Shield, Database, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';

const faqData = [
  { q: 'What industries do you specialize in?', a: 'We work across various sectors including Fintech, Healthtech, E-commerce, and Logistics, providing tailor-made digital transformation solutions.' },
  { q: 'How long does a typical project take?', a: 'Project timelines vary based on complexity. A standard MVP typically takes 8-12 weeks, while large-scale enterprise solutions can span several months.' },
  { q: 'Do you offer post-launch support?', a: 'Absolutely. We provide comprehensive maintenance and support packages to ensure your platform remains secure, updated, and high-performing.' },
  { q: 'Which technologies do you use?', a: 'We specialize in modern stacks including React, Node.js, Python, AWS, and GCP, choosing the best tools for each unique project requirements.' },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
];

export function ServicesView() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-secondary mb-6"
          >
            Digital <span className="text-gradient">Innovations</span>
          </motion.h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Comprehensive end-to-end solutions designed to scale your business and enhance your digital presence.
          </p>
        </div>

        {/* Detailed Services Grid */}
        <div className="grid grid-cols-1 gap-12 mb-32">
          {[
            { icon: Cpu, title: 'Strategic Consulting', text: 'We align technology with your business goals to drive long-term growth and efficiency.', color: 'from-blue-400 to-indigo-500' },
            { icon: Globe, title: 'Global Scaling', text: 'Cloud-native architectures that support users worldwide with zero latency.', color: 'from-primary to-secondary' },
            { icon: Zap, title: 'Rapid Prototyping', text: 'Turn your ideas into functional MVPs in record time without compromising quality.', color: 'from-orange-400 to-red-500' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1">
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-xl shadow-secondary/20`}>
                  <item.icon className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-secondary mb-4">{item.title}</h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">{item.text}</p>
                <div className="grid grid-cols-2 gap-4">
                  {['Enterprise Ready', 'Custom APIs', '24/7 Security', 'Real-time Data'].map((tag) => (
                    <div key={tag} className="flex items-center gap-2 text-sm font-bold text-gray-600">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full relative">
                <div className="glass p-4 rounded-[2.5rem] border-white overflow-hidden shadow-2xl">
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=800`}
                    alt={item.title}
                    fallback-src="https://via.placeholder.com/800"
                    className="rounded-[2rem] w-full h-[400px] object-cover"
                    onError={(e) => { e.currentTarget.src = galleryImages[i % galleryImages.length]; }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Section */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold text-center text-secondary mb-12">Project Showcase</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative cursor-pointer group rounded-3xl overflow-hidden glass p-3 shadow-xl hover:bg-secondary transition-all duration-500 border border-white/20"
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt="Project" className="w-full h-64 object-cover rounded-2xl" />
                <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center m-3 rounded-2xl">
                  <Maximize2 className="text-white w-10 h-10 mb-2 bounce-animation" />
                  <span className="text-white font-black text-xs uppercase tracking-[0.2em]">View Project</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-secondary mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <div key={i} className={cn(
                "rounded-2xl border-white/40 overflow-hidden group transition-all duration-500 shadow-lg",
                activeFaq === i 
                  ? "bg-secondary scale-[1.02] ring-4 ring-primary/20 shadow-2xl" 
                  : "glass hover:bg-white/60"
              )}>
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className={cn(
                    "w-full px-8 py-6 flex items-center justify-between text-left transition-all duration-300",
                    activeFaq === i ? "text-white" : "hover:bg-primary/5 text-secondary"
                  )}
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  {activeFaq === i ? (
                    <Minus className="w-6 h-6 text-accent" />
                  ) : (
                    <Plus className="w-6 h-6 text-primary group-hover:rotate-90 transition-transform" />
                  )}
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8 text-white leading-relaxed text-base"
                    >
                      <div className="pt-2 border-t border-white/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white glass p-3 rounded-full hover:bg-white/20 transition-all">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage}
              className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
