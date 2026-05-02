import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { cn } from '../lib/utils';

const testimonials = [
  {
    name: 'Jason Panda',
    role: 'CEO, Panda Holding Group LLC',
    text: 'Working with the Asay Tech team has been an incredible experience. Their technical skills, attention to detail and customer service are unmatched. They’ve played a key role in our corporate strategy and growth.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Product Manager, Global Solutions',
    text: 'Asay Technologies delivered our enterprise platform ahead of schedule with exceptional quality. Their proactive approach to problem-solving saved us months of development time.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  },
  {
    name: 'Michael Chen',
    role: 'CTO, InnovateX',
    text: 'The AI/ML integration provided by Asay Tech transformed how we handle our internal data analytics. Their expertise in modern engineering is truly top-notch.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-app-bg overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-secondary mb-4 tracking-tight">What Our Clients Say</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Don't just take our word for it—hear from the leaders we've helped succeed.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "p-10 rounded-[3rem] shadow-2xl relative group transition-all duration-500 border-2",
                "bg-white text-gray-900 border-transparent hover:bg-secondary hover:text-white"
              )}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                   <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg transition-all group-hover:border-white/20" />
                   <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-lg bg-primary text-white border-2 border-white transition-all group-hover:border-secondary">
                      <Quote className="w-3 h-3" />
                   </div>
                </div>
                <div>
                  <h4 className="text-xl font-black tracking-tight text-secondary group-hover:text-white transition-colors">{t.name}</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary group-hover:text-accent transition-colors">{t.role}</p>
                </div>
              </div>

              <p className="text-lg font-medium leading-relaxed italic text-gray-600 group-hover:text-white/80 transition-colors">
                "{t.text}"
              </p>
              
              <div className="mt-8 flex gap-1">
                {[...Array(5)].map((_, starIdx) => (
                  <Star key={starIdx} className="w-4 h-4 fill-current text-primary group-hover:text-accent transition-colors" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
