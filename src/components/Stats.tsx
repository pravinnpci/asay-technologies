import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Smile, Award, Briefcase } from 'lucide-react';

const statData = [
  { icon: Award, label: 'Years of Excellence', value: 3, prefix: '+' },
  { icon: Users, label: 'Global Clients', value: 350, prefix: '+' },
  { icon: Briefcase, label: 'Projects Delivered', value: 650, prefix: '+' },
  { icon: Smile, label: 'Team Experts', value: 15, prefix: '+' },
];

function Counter({ value, prefix, duration = 2 }: { value: number, prefix: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{prefix}</span>;
}

export function Stats() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-3xl glass hover:bg-white/40 transition-colors group"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-4xl font-bold text-secondary mb-2 tracking-tight">
                <Counter value={stat.value} prefix={stat.prefix} />
              </h3>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
