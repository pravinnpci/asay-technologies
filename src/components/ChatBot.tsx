import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cn } from '../lib/utils';
import { ENV } from '../config/env';

// Comprehensive Full-Site Knowledge Base for ASAY InfoTech
interface KnowledgeItem {
  category: string;
  keywords: string[];
  answer: string;
}

const siteKnowledgeBase: KnowledgeItem[] = [
  // 1. Company Identity & Location
  {
    category: 'location',
    keywords: ['location', 'where', 'address', 'place', 'office', 'chennai', 'guduvanchery', 'located', 'enga', 'edam'],
    answer: "🏢 **ASAY InfoTech Headquarters:**\nFirst Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery, Chennai - 603202, Tamil Nadu, India.\n\n📍 Landmark: Near Madambakkam Post Office, Guduvanchery."
  },
  {
    category: 'contact',
    keywords: ['phone', 'contact', 'call', 'mobile', 'number', 'reach', 'telephone', 'cell', 'pesa'],
    answer: `📞 **Contact ASAY InfoTech:**\n• **Direct Call / Phone:** ${ENV.WHATSAPP_NUMBER}\n• **WhatsApp Support:** ${ENV.WHATSAPP_NUMBER}\n• **Official Email:** ${ENV.COMPANY_EMAIL}\n• **Working Hours:** Monday – Saturday (9:00 AM – 7:00 PM IST)\n\nYou can also submit an inquiry on our **Contact** page for a free quote!`
  },
  {
    category: 'whatsapp',
    keywords: ['whatsapp', 'chat', 'message'],
    answer: `💬 You can chat directly with our engineering and HR team on WhatsApp at **${ENV.WHATSAPP_NUMBER}** or click the floating WhatsApp button on the bottom right!`
  },
  {
    category: 'email',
    keywords: ['email', 'mail', 'gmail', 'id'],
    answer: `✉️ Our official email is **${ENV.COMPANY_EMAIL}**. All project inquiries, resumes, and newsletter queries are monitored 24/7 with a response within 24 hours.`
  },
  {
    category: 'leadership',
    keywords: ['ceo', 'md', 'director', 'founder', 'leadership', 'team', 'owner', 'head', 'manager', 'sivabarathi', 'bakiyalakshmi', 'premkumar', 'bakiya'],
    answer: "🏢 **ASAY InfoTech Leadership Team:**\n• **Sivabarathi M** - Chief Executive Officer (CEO & Founder)\n• **Bakiyalakshmi** - Manager and Managing Director (MD)\n• **Premkumar A** - Chief Technology Officer (CTO)\n\nOur team brings deep engineering excellence in Cloud, AI, and Full-Stack enterprise systems."
  },
  {
    category: 'about',
    keywords: ['about', 'company', 'history', 'story', 'journey', 'who are you', 'profile', 'clients', 'stats', 'metrics'],
    answer: "🚀 **About ASAY InfoTech:**\nFounded in 2022, ASAY InfoTech is a global technology and AI engineering company.\n• **Years of Excellence:** 3+ Years\n• **Global Clients:** 150+ Global Clients\n• **Projects Completed:** 350+ Successful Digital Projects\n• **Team Size:** 15+ Core Technical Experts\n• **Client Satisfaction:** 99.5% globally."
  },

  // 2. AI Solutions (RAG, MCP, AI Agents, Chatbots)
  {
    category: 'rag',
    keywords: ['rag', 'retrieval', 'vector', 'hallucination', 'semantic search', 'knowledge base', 'pinecone', 'pgvector', 'chromadb', 'embeddings'],
    answer: "🧠 **Enterprise RAG (Retrieval-Augmented Generation):**\nWe design high-accuracy Enterprise RAG pipelines that connect Large Language Models (LLMs) directly to your private company data (PDFs, docs, SQL/NoSQL databases).\n• **Vector Databases:** Pinecone, pgvector (PostgreSQL), ChromaDB, Milvus.\n• **Features:** Hybrid dense/sparse search, neural reranking, source citation, and zero hallucination guarantee!"
  },
  {
    category: 'mcp',
    keywords: ['mcp', 'model context protocol', 'protocol', 'tool calling', 'connector', 'mcp server'],
    answer: "🔌 **Model Context Protocol (MCP) Integration:**\nWe build custom MCP servers and client architectures that standardize how AI models (Claude, Gemini, OpenAI) connect to external tools, databases, Git repositories, Jira, and internal REST APIs safely."
  },
  {
    category: 'agents',
    keywords: ['agent', 'ai agent', 'swarm', 'langgraph', 'crewai', 'autogen', 'autonomous', 'multi-agent', 'workflow'],
    answer: "🤖 **Autonomous AI Agents & Multi-Agent Swarms:**\nWe build multi-agent workflows using LangGraph and CrewAI. These agents independently break down complex goals, plan steps, execute code, verify outputs, and collaborate to automate end-to-end business operations."
  },
  {
    category: 'chatbots',
    keywords: ['chatbot', 'chatbox', 'bot', 'copilot', 'conversational', 'assistant', 'customer support bot'],
    answer: "💬 **Custom AI Chatbots & Copilots:**\nWe build intelligent domain-trained AI assistants with long-term memory, custom personality, and security guardrails. Deployable across Web, WhatsApp, and Slack for 24/7 automated customer support and internal copilots."
  },

  // 3. Web & Enterprise Solutions
  {
    category: 'web-development',
    keywords: ['web', 'website', 'react', 'nextjs', 'frontend', 'spa', 'html', 'tailwind', 'portal'],
    answer: "💻 **Web App Development:**\n• **Stack:** React 19, Next.js, TypeScript, Vite, Tailwind CSS, Node.js.\n• **Key Features:** Sub-second page loads, Lighthouse 95+ performance, mobile-first responsive design, secure REST & GraphQL APIs."
  },
  {
    category: 'saas',
    keywords: ['saas', 'platform', 'multi tenant', 'subscription', 'billing', 'stripe', 'paddle', 'tenant'],
    answer: "🏢 **SaaS Platforms:**\n• Multi-tenant isolated databases and data security.\n• Automated subscription billing (Stripe, Paddle, Razorpay).\n• Role-Based Access Control (RBAC) and real-time revenue analytics dashboards."
  },
  {
    category: 'cloud',
    keywords: ['cloud', 'aws', 'gcp', 'docker', 'kubernetes', 'devops', 'ci cd', 'terraform', 'hosting'],
    answer: "☁️ **Cloud Integration & DevOps:**\n• Cloud platforms: AWS, Google Cloud Platform (GCP).\n• Containerization: Docker, Docker Compose, Kubernetes.\n• Automation: Infrastructure as Code (Terraform), GitHub Actions CI/CD with zero-downtime deployment."
  },
  {
    category: 'custom-software',
    keywords: ['custom software', 'software', 'erp', 'crm', 'bespoke', 'portal', 'automation'],
    answer: "⚙️ **Custom Enterprise Software:**\nWe develop bespoke enterprise systems tailored to unique business processes, including custom CRM, ERP portals, inventory managers, and supply chain automation engines."
  },

  // 4. Careers & Hiring
  {
    category: 'careers',
    keywords: ['career', 'careers', 'job', 'jobs', 'hiring', 'vacancy', 'apply', 'work', 'salary', 'developer vacancy', 'react developer', 'designer'],
    answer: "💼 **Current Career Openings at ASAY InfoTech:**\n1. **Senior React Developer** (3–5 Years Exp | Full-time | Chennai)\n2. **Cloud Infrastructure Architect** (5+ Years Exp | AWS/Kubernetes | Chennai)\n3. **Product UI/UX Designer** (2–4 Years Exp | Figma & Design Systems | Chennai)\n\n👉 **How to Apply:** Visit our **Careers** page (`/careers`), click 'Apply Now', and fill in your details. You will receive an instant confirmation email and WhatsApp connection option!"
  },

  // 5. Pricing, Payments & Delivery Process
  {
    category: 'pricing',
    keywords: ['price', 'pricing', 'cost', 'quote', 'estimate', 'budget', 'rate', 'how much'],
    answer: "💡 **Pricing & Timelines:**\n• **MVP / Standard Projects:** 4–8 weeks delivery.\n• **Enterprise SaaS / AI Agent Systems:** 8–16 weeks.\n• **Consultation:** We offer a 100% FREE initial technical architecture consultation. Contact us via WhatsApp (+91 6382907182) or our Contact page!"
  },
  {
    category: 'payments',
    keywords: ['payment', 'pay', 'upi', 'gpay', 'bank', 'transfer', 'card'],
    answer: "💳 **Accepted Payment Methods:**\nWe accept payments via Google Pay (GPay), UPI, Bank NEFT/RTGS/IMPS Transfers, and International Wire Transfers."
  },
  {
    category: 'process',
    keywords: ['process', 'how do you work', 'steps', 'workflow', 'methodology', 'sdlc'],
    answer: "🔄 **Our 4-Step Engineering Process:**\n1. **01. Discovery & Wireframing:** Requirements, user journeys, architecture selection.\n2. **02. Agile Sprint Build:** Continuous integration, weekly milestone demos.\n3. **03. Quality Assurance:** Security audit, automated load & cross-device testing.\n4. **04. Production Launch & 24/7 Care:** Zero-downtime deployment, SSL, SLA maintenance."
  },

  // 6. Greetings
  {
    category: 'greetings',
    keywords: ['hello', 'hi', 'hey', 'vanakkam', 'morning', 'evening', 'namaste', 'hola'],
    answer: "Hello! 👋 Welcome to **ASAY InfoTech**.\n\nI am your 24/7 AI Assistant. I can help you with:\n• 🧠 Enterprise RAG, MCP & AI Agents\n• 💻 Web App & SaaS Development\n• 🏢 Chennai Office Location & Contact Details\n• 💼 Open Career Vacancies\n• 💡 Project Estimates & Technical Quotes\n\nWhat would you like to know today?"
  }
];

// Intelligent Scoring & Semantic Search Function
function getFullSiteKnowledgeResponse(userText: string): string | null {
  const clean = userText.toLowerCase().trim();
  if (!clean) return null;

  let bestMatch: KnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of siteKnowledgeBase) {
    let score = 0;
    for (const keyword of item.keywords) {
      if (clean === keyword) {
        score += 15; // Exact match
      } else if (clean.includes(keyword)) {
        score += keyword.length > 3 ? 5 : 2; // Substring match
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore > 0) {
    return bestMatch.answer;
  }

  return null;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { 
      role: 'model', 
      text: "Hi! 👋 I'm your ASAY InfoTech AI Assistant. I can answer any questions about our AI Agents, RAG, MCP, Web & SaaS solutions, office location, contact numbers, or career openings. How can I help you today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-ai-chat', handleToggle);
    return () => window.removeEventListener('toggle-ai-chat', handleToggle);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('ai-chat-state-changed', { detail: { isOpen } }));
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const apiKey = ENV.GEMINI_API_KEY;
      let reply: string | null = null;

      // 1. If valid Gemini API key is configured, call Gemini with site system prompt
      if (apiKey && !apiKey.startsWith('YOUR_') && apiKey.length > 20) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are ASAY AI, the professional assistant for ASAY InfoTech (https://asayinfotech.in). 
Company Details:
- Address: First Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery, Chennai 603202.
- Contact: Phone/WhatsApp ${ENV.WHATSAPP_NUMBER}, Email ${ENV.COMPANY_EMAIL}, Instagram: https://www.instagram.com/asayinfotech/
- Founders: Sivabarathi M (CEO & Founder), Bakiyalakshmi (MD), Premkumar A (CTO).
- Stats: 3+ Years of Excellence, 150+ Global Clients, 350+ Projects Completed, 15+ Team Experts.
- Capabilities: Enterprise RAG (Pinecone, pgvector), Model Context Protocol (MCP), Autonomous AI Agents (LangGraph, CrewAI), Custom AI Chatbots, Web Development (React, Next.js, Vite), SaaS Platforms, Cloud DevOps (AWS, Docker).
- Careers: Senior React Developer, Cloud Architect, UI/UX Designer.
Always provide factual, polite, formatted markdown responses with bullet points.`
          });

          const result = await model.generateContent(userText);
          const response = await result.response;
          reply = response.text();
        } catch (apiError) {
          console.warn('Gemini API live call skipped, using local knowledge engine:', apiError);
        }
      }

      // 2. Guaranteed Full-Site Knowledge Base Fallback
      if (!reply) {
        const localMatch = getFullSiteKnowledgeResponse(userText);
        if (localMatch) {
          reply = localMatch;
        } else {
          reply = `Thank you for your inquiry about "${userText}".\n\nAt **ASAY InfoTech**, we specialize in:\n• **Generative AI:** Enterprise RAG, Model Context Protocol (MCP) & Autonomous AI Agents.\n• **Software Engineering:** High-Performance Web Apps, SaaS Platforms, Cloud DevOps & Custom Portals.\n\nFor a tailored quote or detailed discussion, feel free to chat directly on **WhatsApp (${ENV.WHATSAPP_NUMBER})** or email **${ENV.COMPANY_EMAIL}**!`;
        }
      }

      setMessages(prev => [...prev, { role: 'model', text: reply || '' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'model', 
          text: `ASAY InfoTech Headquarters: First Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery, Chennai 603202.\n\nContact us directly on WhatsApp (${ENV.WHATSAPP_NUMBER}) or email ${ENV.COMPANY_EMAIL}!` 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-24 right-5 sm:right-6 z-[105] glass w-[300px] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col overflow-hidden shadow-3xl border border-white/60 rounded-[2.5rem]"
        >
          {/* Chat Header */}
          <div className="p-4 bg-secondary text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/30 rounded-xl flex items-center justify-center border border-primary/40">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                  ASAY AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                </h3>
                <p className="text-[10px] text-green-400 font-medium">● Full-Site AI Knowledge Active</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/10 p-2 rounded-xl transition-colors text-white/80 hover:text-white"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/70 text-xs">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex items-start gap-2.5", m.role === 'user' ? "flex-row-reverse" : "")}>
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                  m.role === 'model' ? "bg-primary text-white" : "bg-secondary text-white"
                )}>
                  {m.role === 'model' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={cn(
                  "p-3.5 rounded-2xl leading-relaxed max-w-[85%] shadow-sm whitespace-pre-line font-medium",
                  m.role === 'model' 
                    ? "bg-white text-gray-800 rounded-tl-none border border-gray-100" 
                    : "bg-primary text-white rounded-tr-none"
                )}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-primary text-xs font-bold animate-pulse pl-9">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Processing query...
              </div>
            )}
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="px-3 py-2 bg-white/80 border-t border-gray-100 flex gap-2 overflow-x-auto text-[10px]">
            {['🧠 RAG & AI', '🔌 MCP Protocol', '🤖 AI Agents', '🏢 Office Location', '💼 Open Jobs', '📞 Contact Details'].map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  const query = chip.replace(/[^a-zA-Z\s]/g, '').trim();
                  setInput(query);
                }}
                className="px-2.5 py-1 bg-primary/10 hover:bg-primary hover:text-white text-secondary font-bold rounded-lg transition-colors whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about AI, services, jobs, location..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium text-xs border border-gray-200"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading} 
                className="absolute right-1.5 p-2 bg-secondary text-white rounded-lg hover:bg-primary transition-all disabled:opacity-40 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}