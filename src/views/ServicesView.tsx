import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, X, Maximize2, Cpu, Globe, Zap, Shield, Database, Smartphone, Bot, Sparkles, Brain, Network, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const aiServices = [
  {
    icon: Brain,
    title: 'Enterprise RAG Systems',
    desc: 'Retrieval-Augmented Generation connecting LLMs with private company knowledge bases, pgvector/Pinecone vector databases, and semantic search with 100% citation accuracy.',
    badge: 'Enterprise Knowledge',
    link: '/solutions/ai-agents-rag-mcp'
  },
  {
    icon: Network,
    title: 'Model Context Protocol (MCP)',
    desc: 'Custom MCP server architecture linking Claude, Gemini, and OpenAI models directly with enterprise databases, dev tools, and live internal APIs.',
    badge: 'Standardized Integration',
    link: '/solutions/ai-agents-rag-mcp'
  },
  {
    icon: Bot,
    title: 'Autonomous AI Agents',
    desc: 'Multi-agent orchestration with LangGraph & CrewAI capable of autonomous task execution, continuous reasoning, code synthesis, and automated business workflows.',
    badge: 'Agentic Workflows',
    link: '/solutions/ai-agents-rag-mcp'
  },
  {
    icon: Zap,
    title: 'Custom AI Chatbots & Copilots',
    desc: 'Domain-specialized conversational AI assistants deployed on Web, WhatsApp, and Slack with conversational memory, persona tuning, and enterprise security guardrails.',
    badge: '24/7 Automation',
    link: '/solutions/ai-agents-rag-mcp'
  }
];

const faqData = [
  { q: 'What is Enterprise RAG and how does it prevent AI hallucinations?', a: 'RAG (Retrieval-Augmented Generation) feeds your company’s private, up-to-date documents and databases into the AI context before it answers. This ensures answers are grounded 100% in your actual data, with verifiable source citations.' },
  { q: 'How does Model Context Protocol (MCP) help my organization?', a: 'MCP provides a universal, standardized protocol for AI models to access internal company databases, file systems, GitHub, Jira, and custom APIs safely without custom brittle glue code.' },
  { q: 'Can you build Autonomous AI Agents that execute tasks automatically?', a: 'Yes! Using LangGraph and multi-agent patterns, we create agent swarms where agents collaborate, review each other’s work, execute tool calls, and deliver finished deliverables without manual micromanagement.' },
  { q: 'What industries do you specialize in?', a: 'We work across various sectors including Fintech, Healthtech, E-commerce, SaaS, and Logistics, providing tailor-made digital transformation and AI solutions.' },
  { q: 'How long does a typical project take?', a: 'Project timelines vary based on complexity. An AI Copilot or Web MVP typically takes 4-8 weeks, while full enterprise SaaS platforms span 8-16 weeks.' },
  { q: 'Do you offer post-launch support and maintenance?', a: 'Absolutely. We provide comprehensive SLA maintenance, LLM latency tuning, model updates, and infrastructure monitoring.' }
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-4 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-bold text-primary tracking-wider uppercase">Next-Gen AI & Digital Solutions</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-secondary mb-6"
          >
            Digital <span className="text-gradient">Innovations & AI</span>
          </motion.h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From Enterprise RAG and MCP Integration to Multi-Agent Workflows, Custom SaaS, and High-Performance Web Apps.
          </p>
        </div>

        {/* AI & Agentic Suite Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-secondary tracking-tight">Generative AI, RAG & MCP Engineering</h2>
            <p className="text-gray-500 text-sm mt-2">Pioneering autonomous intelligence for forward-thinking enterprises.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiServices.map((ai, i) => (
              <motion.div
                key={ai.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[2.5rem] border border-gray-200/80 shadow-xl hover:bg-secondary hover:text-white transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <ai.icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary group-hover:text-accent bg-primary/10 px-3 py-1 rounded-full">
                      {ai.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-secondary group-hover:text-white mb-3">{ai.title}</h3>
                  <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed mb-6">{ai.desc}</p>
                </div>

                <Link
                  to={ai.link}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group-hover:text-white group-hover:translate-x-2 transition-all mt-auto"
                >
                  View Details & Architecture <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
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
