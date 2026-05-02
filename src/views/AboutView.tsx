import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Users, Award, TrendingUp, Zap } from 'lucide-react';

const stats = [
  { label: 'Years of Excellence', value: '3+', icon: Award },
  { label: 'Global Clients', value: '350+', icon: Users },
  { label: 'Projects Completed', value: '650+', icon: Target },
  { label: 'Team Experts', value: '15+', icon: Zap },
];

export default function AboutView() {
  return (
    <div className="pt-24 pb-20 bg-app-bg">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-secondary mb-8 tracking-tight"
            >
              Pioneering <span className="text-gradient"> Excellence</span> in Business Solutions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              Since our inception, Asay Technologies has been at the forefront of digital innovation, 
              crafting bespoke solutions that empower businesses to scale and thrive in an ever-evolving tech landscape.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-secondary mb-4 tracking-tight">Our Philosophy</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" 
                  alt="Managing Director" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 glass p-8 rounded-3xl border-primary/20 shadow-2xl z-20 max-w-xs">
                <h4 className="text-xl font-bold text-secondary mb-1">Managing Director</h4>
                <p className="text-primary font-bold tracking-widest uppercase text-[10px]">Strategic Visionary</p>
              </div>
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary tracking-tight leading-tight">Message From Managing Director</h2>
              <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
                <p>
                  "At Asay Technologies, we believe that technology is not just about code and servers; it's about solving real-world problems and creating meaningful impact. Our journey began with a simple vision: to empower businesses with the tools they need to succeed in the digital age."
                </p>
                <p>
                  "We take pride in our ability to understand our clients' unique challenges and deliver solutions that are not only technically superior but also strategically aligned with their long-term goals. Every project we undertake is a commitment to excellence and a testament to our passion for innovation."
                </p>
              </div>
              
              <div className="pt-4 flex flex-wrap gap-4">
                {['Innovation', 'Commitment', 'Trust', 'Excellence'].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-xs font-bold text-gray-600 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-white/60 font-medium uppercase tracking-widest text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary tracking-tight">Our Core Values</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg mt-4">The principles that guide every decision we make and every line of code we write.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              { icon: Shield, title: 'Integrity First', desc: 'Honesty and transparency in all our dealings, from pricing to project timelines.' },
              { icon: Zap, title: 'Speed & Precision', desc: 'Rapid delivery cycles without compromising on the meticulous detail of our engineering.' },
              { icon: Users, title: 'Global Perspective', desc: 'Designing solutions that resonate across borders and support diverse user bases.' }
            ].map((value, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] glass border-white/40 text-center transition-all duration-500 hover:bg-secondary group"
              >
                <div className="w-16 h-16 mx-auto mb-8 bg-app-bg rounded-2xl shadow-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-4 group-hover:text-white transition-colors">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed group-hover:text-white/70 transition-colors">{value.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative rounded-[4rem] overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" 
              alt="Our global team" 
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end p-12">
              <div className="max-w-2xl">
                <h3 className="text-3xl font-bold text-white mb-4">A Global Team of Visionaries</h3>
                <p className="text-white/80 text-lg">
                  With experts spread across three continents, we bring a diverse range of perspectives and deep technical knowledge to every project.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-16 mt-32">
            <h2 className="text-4xl font-bold text-secondary tracking-tight">Our Leadership</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg mt-4">The team driving our mission forward with expertise and passion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'K. Asai Thambi',
                role: 'Founder & CEO',
                desc: 'Visionary leader with over a decade of expertise in digital strategy.',
                image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800'
              },
              {
                name: 'S. Rajesh',
                role: 'Chief Technology Officer',
                desc: 'Technical mastermind driving innovation across our ecosystem.',
                image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800'
              },
              {
                name: 'M. Priya',
                role: 'Operations Manager',
                desc: 'Ensuring seamless project delivery and operational excellence.',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800'
              }
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-[3rem] p-6 shadow-xl border border-gray-100 hover:bg-secondary hover:text-white transition-all duration-500 h-full flex flex-col">
                  <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 shrink-0">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-bold uppercase text-[10px] tracking-widest mb-4 group-hover:text-accent">{member.role}</p>
                  <p className="text-gray-500 text-sm group-hover:text-white/70 transition-colors mt-auto">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
