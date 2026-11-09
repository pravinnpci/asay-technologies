import React from 'react';
import { motion } from 'motion/react';
import { 
  Laptop, Database, Cloud, Smartphone, BarChart, Shield, 
  ArrowRight, Bot, Sparkles, Brain, Cpu, Network, MessageSquare, Zap, CheckCircle2,
  Linkedin, Twitter, MapPin, Building2, Globe2
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { Link } from 'react-router-dom';

const aiCapabilities = [
  {
    icon: Brain,
    title: 'Enterprise RAG Systems',
    subtitle: 'Retrieval-Augmented Generation',
    desc: 'Query your private company documents, PDFs, and databases with zero hallucination using hybrid vector search (Pinecone, pgvector) and neural reranking.',
    tags: ['Vector DBs', 'Semantic Search', 'Zero Hallucination', 'Source Citations'],
    link: '/solutions/ai-agents-rag-mcp'
  },
  {
    icon: Network,
    title: 'Model Context Protocol (MCP)',
    subtitle: 'Standardized Tool & System Integration',
    desc: 'We build custom MCP servers connecting Claude, Gemini, and GPT directly with internal company APIs, live databases, and operational tools.',
    tags: ['MCP Protocol', 'Tool Calling', 'DB Connectors', 'Enterprise APIs'],
    link: '/solutions/ai-agents-rag-mcp'
  },
  {
    icon: Cpu,
    title: 'Autonomous AI Agents',
    subtitle: 'Multi-Agent Task Swarms',
    desc: 'Multi-agent orchestration with LangGraph and CrewAI that independently reason, self-correct, and execute complex multi-step workflows.',
    tags: ['LangGraph', 'CrewAI', 'Agentic Workflows', 'Task Automation'],
    link: '/solutions/ai-agents-rag-mcp'
  },
  {
    icon: MessageSquare,
    title: 'Custom AI Chatbots & Copilots',
    subtitle: '24/7 Intelligent Conversational AI',
    desc: 'Domain-trained AI chatbots with memory, guardrails, and role personalization across Web, WhatsApp, and Slack to automate customer engagement.',
    tags: ['24/7 Support', 'WhatsApp AI', 'Slack Bot', 'Voice Copilots'],
    link: '/solutions/ai-agents-rag-mcp'
  }
];

const services = [
  { icon: Bot, title: 'AI Agents & RAG', desc: 'Autonomous agentic workflows, MCP server integrations, and enterprise RAG search.', link: '/solutions/ai-agents-rag-mcp' },
  { icon: Laptop, title: 'Web Development', desc: 'Sleek, high-performance web applications built with React, Vite & Next.js.', link: '/solutions/web-app-development' },
  { icon: Database, title: 'Custom SaaS', desc: 'Scalable cloud-native multi-tenant solutions for complex business challenges.', link: '/solutions/saas-platforms' },
  { icon: Cloud, title: 'Cloud & DevOps', desc: 'Docker containerization, CI/CD automation, and high-availability cloud setups.', link: '/solutions/cloud-integration' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Intuitive cross-platform mobile experiences for iOS and Android devices.', link: '/services' },
  { icon: Shield, title: 'Cybersecurity', desc: 'Robust protection for digital assets, encrypted storage, and user privacy.', link: '/services' },
];

export function HomeView() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* Cutting-Edge AI & Agentic Systems Showcase */}
      <section className="py-24 bg-gradient-to-b from-[#091E3E] to-[#0d2850] text-white relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 rounded-full mb-4 border border-primary/30 text-primary">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-white">Next-Gen AI Engineering</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
              Enterprise <span className="text-gradient">RAG, MCP & AI Agents</span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              We build production-ready Generative AI systems — from private RAG vector search to standardized MCP tool servers and autonomous multi-agent task swarms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiCapabilities.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 hover:border-primary/50 transition-all duration-500 flex flex-col justify-between group shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      Production Ready
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-primary text-xs font-bold uppercase tracking-wider mb-4">{item.subtitle}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">{item.desc}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-semibold text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group-hover:text-white group-hover:translate-x-2 transition-all"
                  >
                    Explore {item.title} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 p-4 sm:p-6 rounded-3xl backdrop-blur-md">
              <span className="text-sm font-semibold text-gray-300">
                Ready to deploy custom AI Agents, RAG, or MCP for your business?
              </span>
              <Link
                to="/contact"
                className="px-6 py-3 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-accent transition-all shadow-lg"
              >
                Schedule AI Architecture Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Storytelling Timeline Section */}
      <section className="py-20 bg-app-bg">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-secondary uppercase tracking-widest">Our Journey</h2>
            
            <div className="relative space-y-12">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />
              
              {[
                { year: '2022', title: 'The Vision', text: 'ASAY InfoTech founded with a mission to simplify enterprise digital transformation.' },
                { year: '2023', title: 'Scaling Up', text: 'Expanded our core team and launched our first international SaaS platform.' },
                { year: '2024', title: 'Global Impact', text: 'Serving 150+ clients across 5 continents with cutting-edge cloud solutions.' },
                { year: '2025', title: 'Innovation Lead', text: 'Integrating AI and modern architectures to redefine industry standards.' },
                { 
                  year: '2026', 
                  title: 'Enterprise AI & Autonomous Agents', 
                  text: 'Full-scale implementation of Autonomous AI Agents, Enterprise RAG pipelines, AI Chatbots, and Model Context Protocol (MCP) ecosystems for intelligent automation.',
                  isCurrent: true 
                }
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
                      <div className="flex items-center gap-2 justify-center md:justify-end mb-1">
                        {step.isCurrent && (
                          <span className="px-2.5 py-0.5 bg-primary/10 text-primary border border-primary/30 rounded-full text-[10px] font-black uppercase tracking-wider animate-pulse">
                            Active AI Roadmap
                          </span>
                        )}
                        <span className={`text-4xl font-bold ${step.isCurrent ? 'text-primary' : 'text-primary/40'} block`}>
                          {step.year}
                        </span>
                      </div>
                      <h3 className={`text-xl font-bold ${step.isCurrent ? 'text-primary' : 'text-secondary'} mb-2`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full border-4 border-white shadow-lg z-10 shrink-0 flex items-center justify-center ${step.isCurrent ? 'bg-primary ring-4 ring-primary/30 animate-pulse' : 'bg-secondary'}`}>
                    {step.isCurrent && <div className="w-3 h-3 bg-white rounded-full animate-ping" />}
                  </div>
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

      {/* Regional & Local IT Presence Section (SEO Optimized for Guduvanchery, Tambaram, Chennai) */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-3 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              Regional Tech Hub & Global Delivery
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight mb-4">
              Leading <span className="text-primary">IT & Software Company</span> in Guduvanchery, Tambaram & Chennai
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Headquartered in Guduvanchery, ASAY InfoTech delivers cutting-edge Autonomous AI Agents, Custom Web Applications, Enterprise ERPs, and Cloud Architecture for startups, enterprises, and institutions across Chennai, Tamil Nadu, and worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-gray-200/80 shadow-md hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Guduvanchery & GST Road HQ</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Strategically positioned in Guduvanchery (Madambakkam / GST corridor), offering rapid on-site consultation, software prototyping, and agile project delivery for local businesses and institutions.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">Guduvanchery</span>
                <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">Maraimalai Nagar</span>
                <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">Chengalpattu</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-gray-200/80 shadow-md hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tambaram & Chennai Metro</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Full-stack web application development, custom SaaS platforms, and enterprise AI engineering tailored for fast-growing companies and startups across Tambaram, Chromepet, Guindy & OMR IT corridor.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">Tambaram</span>
                <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">Chennai OMR</span>
                <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">Chromepet</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-gray-200/80 shadow-md hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Global Enterprise Delivery</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Partnering with international clients across the US, UK, UAE, and Singapore to engineer resilient multi-tenant architectures, AI agent swarms, and high-concurrency cloud systems.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">Remote & Global</span>
                <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">Fiverr Verified</span>
                <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />
      <Testimonials />

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
