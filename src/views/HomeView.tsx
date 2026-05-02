import React from 'react';
import { motion } from 'motion/react';
import { Laptop, Database, Cloud, Smartphone, BarChart, Shield, ArrowRight, Linkedin, Twitter } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { Link } from 'react-router-dom';

const services = [
  { icon: Laptop, title: 'Web Development', desc: 'Sleek, high-performance web applications built with modern frameworks.' },
  { icon: Database, title: 'Custom SaaS', desc: 'Scalable cloud-native solutions for complex business challenges.' },
  { icon: Cloud, title: 'Cloud Solutions', desc: 'Secure and efficient infrastructure optimization and migration.' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Intuitive cross-platform mobile experiences for iOS and Android.' },
  { icon: BarChart, title: 'Data Analytics', desc: 'Transforming raw data into actionable business intelligence.' },
  { icon: Shield, title: 'Cybersecurity', desc: 'Robust protection for your digital assets and user data.' },
];

export function HomeView() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* Storytelling Timeline Section */}
      <section className="py-20 bg-app-bg">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-secondary uppercase tracking-widest">Our Journey</h2>
            
            <div className="relative space-y-12">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />
              
              {[
                { year: '2022', title: 'The Vision', text: 'Asay Technologies founded with a mission to simplify enterprise digital transformation.' },
                { year: '2023', title: 'Scaling Up', text: 'Expanded our core team and launched our first international SaaS platform.' },
                { year: '2024', title: 'Global Impact', text: 'Serving 100+ clients across 5 continents with cutting-edge cloud solutions.' },
                { year: '2025', title: 'Innovation Lead', text: 'Integrating AI and modern architectures to redefine industry standards.' }
              ].map((step, i) => (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1 text-center md:text-right">
                    <div className={`${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8 text-center md:text-left'}`}>
                      <span className="text-4xl font-bold text-primary/40 mb-2 block">{step.year}</span>
                      <h3 className="text-xl font-bold text-secondary mb-2">{step.title}</h3>
                      <p className="text-gray-500">{step.text}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-secondary rounded-full border-4 border-white shadow-lg z-10 shrink-0" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-app-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-secondary tracking-tight">Our Expertise</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">We combine technical mastery with creative strategies to deliver exceptional results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/40 hover:bg-secondary hover:border-transparent transition-all duration-500 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 group-hover:bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl transition-all duration-500" />
                
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all text-primary relative z-10">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-secondary group-hover:text-white transition-colors relative z-10 tracking-tight">{service.title}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors relative z-10">{service.desc}</p>
                <Link to="/services" className="text-sm font-bold text-primary group-hover:text-white flex items-center gap-2 group-hover:translate-x-2 transition-all relative z-10">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <Testimonials />

      {/* Leadership Section */}
      <section className="py-24 bg-app-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-secondary tracking-tight">Our Leadership</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">The visionaries behind Asay Technologies, committed to innovation and excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sivabarathi P',
                role: 'CEO',
                desc: 'Strategic leader driving the mission and vision of Asay Technologies.',
                image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800'
              },
              {
                name: 'Premkumar A',
                role: 'Chief Technology Officer',
                desc: 'Technical mastermind driving innovation across our ecosystem.',
                image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800'
              },
              {
                name: 'Pravinkumar A',
                role: 'Manager and MD',
                desc: 'Overseeing operations and ensuring technical and strategic excellence.',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800'
              }
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group w-full"
              >
                <div className="relative glass p-4 rounded-[3rem] border-primary/10 overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-primary/40 hover:bg-secondary hover:border-transparent group-hover:scale-[1.02] h-full flex flex-col">
                  <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 relative shrink-0">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                      <div className="flex gap-4">
                         <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                            <Linkedin className="w-5 h-5" />
                         </a>
                         <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                            <Twitter className="w-5 h-5" />
                         </a>
                      </div>
                    </div>
                  </div>
                  <div className="text-center pb-4 transition-colors flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-secondary mb-1 group-hover:text-white">{member.name}</h3>
                    <p className="text-primary font-bold tracking-widest uppercase text-[10px] mb-4 group-hover:text-accent">{member.role}</p>
                    <p className="text-gray-500 text-sm leading-relaxed px-4 group-hover:text-white/80 mt-auto">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-[3rem] bg-gradient-to-br from-secondary via-secondary to-primary p-12 md:p-20 relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to transform <br className="hidden md:block" /> your digital presence?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Join dozens of successful businesses that have scaled with our custom solutions. We're ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-10 py-5 bg-white text-secondary rounded-2xl font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                Get Started Today
              </Link>
              <Link
                to="/careers"
                className="w-full sm:w-auto px-10 py-5 glass border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all"
              >
               Join Our Team
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
