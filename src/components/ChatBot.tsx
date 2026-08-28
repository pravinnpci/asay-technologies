import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Bot, User, Loader2, Sparkles, MapPin, Briefcase, Phone, Cpu, Users } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cn } from '../lib/utils';
import { ENV } from '../config/env';

// ── 1. Enterprise RAG Document Store (Scraped & Chunked Site Knowledge) ─────
interface RAGDocumentChunk {
  id: string;
  category: 'company' | 'leadership' | 'location' | 'contact' | 'services' | 'careers' | 'process' | 'pricing';
  title: string;
  keywords: string[];
  content: string;
  sourceUri: string;
}

const RAG_KNOWLEDGE_CORPUS: RAGDocumentChunk[] = [
  {
    id: 'corp_identity',
    category: 'company',
    title: 'Company Overview & Metrics',
    keywords: ['about', 'company', 'history', 'asay', 'infotech', 'profile', 'metrics', 'stats', 'experience', 'who are you'],
    content: `🚀 **ASAY InfoTech (Pvt Ltd)** is an enterprise technology and Generative AI engineering company founded in 2022.
• **Years of Excellence:** 3+ Years in Global Tech Delivery.
• **Global Clients:** 150+ Clients across US, UK, Middle East, and India.
• **Completed Projects:** 350+ Enterprise Web, AI, and SaaS deployments.
• **Core Team:** 15+ Specialized Engineers (AI, Cloud, Full-Stack).
• **Client Satisfaction:** 99.5% with 24/7 SLA maintenance.`,
    sourceUri: 'https://asayinfotech.in/about'
  },
  {
    id: 'corp_leadership',
    category: 'leadership',
    title: 'Executive Leadership Team',
    keywords: ['leadership', 'team', 'ceo', 'md', 'cto', 'founder', 'director', 'manager', 'sivabarathi', 'bakiyalakshmi', 'premkumar', 'bakiya', 'pravin'],
    content: `🏢 **ASAY InfoTech Leadership Team:**
• **Sivabarathi M** — Chief Executive Officer (CEO & Founder)
  *Strategic visionary leading corporate expansion, client relationships, and global AI roadmap.*
• **Bakiyalakshmi** — Manager and Managing Director (MD)
  *Overseeing corporate leadership, operational governance, and client delivery excellence.*
• **Premkumar A** — Chief Technology Officer (CTO)
  *Technical mastermind architecting Enterprise RAG, Cloud infrastructure, and AI Agent ecosystems.*`,
    sourceUri: 'https://asayinfotech.in/about#leadership'
  },
  {
    id: 'corp_location',
    category: 'location',
    title: 'Headquarters & Office Address',
    keywords: ['location', 'address', 'office', 'where', 'place', 'chennai', 'guduvanchery', 'madambakkam', 'landmark', 'reach us', 'enga'],
    content: `📍 **ASAY InfoTech Headquarters:**
First Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery, Chennai - 603202, Tamil Nadu, India.

📌 **Landmark:** Near Madambakkam Post Office, Guduvanchery.
🕒 **Working Hours:** Monday – Saturday (9:00 AM – 7:00 PM IST). Visitors are welcome with prior appointment.`,
    sourceUri: 'https://asayinfotech.in/contact'
  },
  {
    id: 'corp_contact',
    category: 'contact',
    title: 'Official Contact Channels',
    keywords: ['contact', 'phone', 'whatsapp', 'mobile', 'call', 'email', 'mail', 'number', 'reach', 'telephone'],
    content: `📞 **Official Contact Channels:**
• **Direct Phone / WhatsApp:** ${ENV.WHATSAPP_NUMBER}
• **Official Email:** ${ENV.COMPANY_EMAIL}
• **Instagram:** @asayinfotech
• **Free Consultation:** You can submit project details on our Contact page or chat directly on WhatsApp for an instant technical estimate.`,
    sourceUri: 'https://asayinfotech.in/contact'
  },
  {
    id: 'rag_solutions',
    category: 'services',
    title: 'Enterprise RAG & Hybrid Vector Search',
    keywords: ['rag', 'retrieval', 'vector', 'database', 'embeddings', 'pinecone', 'pgvector', 'chromadb', 'milvus', 'hallucination', 'semantic search'],
    content: `🧠 **Enterprise RAG (Retrieval-Augmented Generation):**
We build high-accuracy private RAG pipelines connecting LLMs directly to your enterprise knowledge base (PDFs, SQL/NoSQL databases, Docs, APIs).
• **Vector Databases:** Pinecone, pgvector (PostgreSQL), ChromaDB, Milvus.
• **Key Capabilities:** Hybrid dense/sparse search, neural reranking, source citation, and zero hallucination guarantee for legal, medical, and fintech domains.`,
    sourceUri: 'https://asayinfotech.in/solutions/generative-ai'
  },
  {
    id: 'mcp_solutions',
    category: 'services',
    title: 'Model Context Protocol (MCP) Architecture',
    keywords: ['mcp', 'model context protocol', 'protocol', 'tool calling', 'connector', 'mcp server', 'claude', 'gemini'],
    content: `🔌 **Model Context Protocol (MCP) Implementation:**
We engineer standardized MCP servers enabling AI models (Claude 3.5 Sonnet, Gemini 2.0, GPT-4o) to safely access external tools, company databases, Git repositories, Jira tickets, and internal microservice APIs.`,
    sourceUri: 'https://asayinfotech.in/solutions/generative-ai'
  },
  {
    id: 'agents_solutions',
    category: 'services',
    title: 'Autonomous AI Agents & Swarms',
    keywords: ['agent', 'ai agent', 'swarm', 'langgraph', 'crewai', 'autogen', 'autonomous', 'multi-agent', 'orchestration'],
    content: `🤖 **Autonomous AI Multi-Agent Swarms:**
Using LangGraph and CrewAI, we deploy autonomous agent swarms that collaborate to solve multi-step business goals—including code generation, automated testing, customer dispute arbitration, and inventory sync.`,
    sourceUri: 'https://asayinfotech.in/solutions/generative-ai'
  },
  {
    id: 'web_saas_cloud',
    category: 'services',
    title: 'Web, SaaS Platforms & Cloud DevOps',
    keywords: ['web', 'website', 'react', 'nextjs', 'saas', 'cloud', 'aws', 'docker', 'kubernetes', 'devops', 'ci cd', 'terraform', 'software', 'erp', 'crm'],
    content: `💻 **Full-Stack Web, SaaS & Cloud Engineering:**
• **Frontend:** React 19, Next.js, Vite, TypeScript, Tailwind CSS (Lighthouse 95+ Score).
• **SaaS Engineering:** Multi-tenant isolated databases, automated subscription billing (Stripe, Razorpay), RBAC security.
• **Cloud & DevOps:** AWS, Google Cloud, Docker, Kubernetes, Terraform, zero-downtime CI/CD deployment pipelines.`,
    sourceUri: 'https://asayinfotech.in/services'
  },
  {
    id: 'careers_jobs',
    category: 'careers',
    title: 'Open Careers & Recruitment',
    keywords: ['career', 'careers', 'job', 'jobs', 'hiring', 'vacancy', 'apply', 'work', 'salary', 'developer', 'react developer', 'cloud architect', 'designer'],
    content: `💼 **Current Career Openings at ASAY InfoTech:**
1. **Senior React / Next.js Developer** (3–5 Yrs Exp | Full-Time | Chennai HQ)
2. **Cloud Infrastructure Architect** (5+ Yrs Exp | AWS/Docker/K8s | Chennai HQ)
3. **Product UI/UX Designer** (2–4 Yrs Exp | Figma & Design Systems | Chennai HQ)

👉 **How to Apply:** Visit https://asayinfotech.in/careers, click 'Apply Now', upload your resume, and you will receive an immediate acknowledgment and WhatsApp interview schedule!`,
    sourceUri: 'https://asayinfotech.in/careers'
  },
  {
    id: 'pricing_process',
    category: 'pricing',
    title: 'Engagement Models, Pricing & Delivery',
    keywords: ['price', 'pricing', 'cost', 'quote', 'estimate', 'budget', 'timeline', 'process', 'sdlc', 'how much'],
    content: `💡 **Pricing & Project Timelines:**
• **MVP / Standard Web Apps:** 4–8 Weeks delivery.
• **Enterprise SaaS & AI Systems:** 8–16 Weeks with dedicated sprints.
• **100% Free Consultation:** We provide a free initial architectural blueprint and quote. Contact us on WhatsApp (${ENV.WHATSAPP_NUMBER}) or email ${ENV.COMPANY_EMAIL}.`,
    sourceUri: 'https://asayinfotech.in/services'
  }
];

// ── 2. LangChain-style Semantic Retriever & Guardrail Scoping Engine ─────────
function semanticRAGSearch(query: string): { chunk: RAGDocumentChunk; score: number } | null {
  const clean = query.toLowerCase().trim();
  if (!clean) return null;

  let bestMatch: RAGDocumentChunk | null = null;
  let highestScore = 0;

  for (const doc of RAG_KNOWLEDGE_CORPUS) {
    let score = 0;
    // 1. Keyword density match
    for (const kw of doc.keywords) {
      if (clean === kw) score += 20;
      else if (clean.includes(kw)) score += kw.length > 4 ? 8 : 3;
    }

    // 2. Title and Content n-gram overlap
    const queryTokens = clean.split(/\s+/).filter(t => t.length > 2);
    for (const token of queryTokens) {
      if (doc.title.toLowerCase().includes(token)) score += 5;
      if (doc.content.toLowerCase().includes(token)) score += 2;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = doc;
    }
  }

  // Threshold check for RAG confidence
  if (bestMatch && highestScore >= 5) {
    return { chunk: bestMatch, score: highestScore };
  }

  return null;
}

// ── 3. Strict Domain Guardrail (Anti-Hallucination & Scope Enforcement) ─────
function isOutOfDomainQuery(query: string): boolean {
  const q = query.toLowerCase();
  const allowedTopics = [
    'asay', 'infotech', 'sivabarathi', 'bakiyalakshmi', 'premkumar', 'ceo', 'md', 'cto',
    'rag', 'vector', 'mcp', 'agent', 'ai', 'chatbot', 'react', 'next', 'saas', 'cloud',
    'aws', 'docker', 'devops', 'service', 'project', 'price', 'cost', 'quote', 'contact',
    'phone', 'whatsapp', 'email', 'address', 'location', 'chennai', 'guduvanchery', 'job',
    'career', 'hiring', 'vacancy', 'apply', 'team', 'developer', 'software', 'website',
    'hi', 'hello', 'hey', 'vanakkam', 'thanks', 'thank you', 'help'
  ];

  const hasRelevantKeyword = allowedTopics.some(t => q.includes(t));
  return !hasRelevantKeyword && q.length > 10;
}

// ── 4. Main Interactive RAG ChatBot Component ──────────────────────────────
export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; source?: string }[]>([
    { 
      role: 'model', 
      text: "👋 Welcome to **ASAY InfoTech**!\n\nI am your **RAG Semantic AI Assistant**. I have complete indexed knowledge of our company services, leadership, Chennai headquarters, open jobs, and AI/Web capabilities.\n\nHow can I help your business today?" 
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

  const handleSend = async (customQuery?: string) => {
    const queryToSend = (customQuery || input).trim();
    if (!queryToSend || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: queryToSend }]);
    setIsLoading(true);

    try {
      // Step A: Domain Guardrail Verification
      if (isOutOfDomainQuery(queryToSend)) {
        setMessages(prev => [
          ...prev,
          {
            role: 'model',
            text: `ℹ️ I am the dedicated AI assistant for **ASAY InfoTech** (https://asayinfotech.in).\n\nI specialize strictly in answering questions about our **Enterprise RAG & AI Agents, Cloud & Web Engineering, Leadership Team, Office Location, Open Jobs, and Project Quotes**.\n\nPlease ask about ASAY InfoTech's services or contact our team directly on WhatsApp (**${ENV.WHATSAPP_NUMBER}**)!`
          }
        ]);
        setIsLoading(false);
        return;
      }

      // Step B: RAG Semantic Context Retrieval
      const ragResult = semanticRAGSearch(queryToSend);
      const retrievedContext = ragResult ? ragResult.chunk.content : RAG_KNOWLEDGE_CORPUS[0].content;
      const sourceUrl = ragResult ? ragResult.chunk.sourceUri : undefined;

      const apiKey = ENV.GEMINI_API_KEY;
      let finalReply: string | null = null;

      // Step C: Generative LLM with Strict RAG Context Injection
      if (apiKey && !apiKey.startsWith('YOUR_') && apiKey.length > 20) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are ASAY AI, the official RAG Assistant for ASAY InfoTech (https://asayinfotech.in).
Strict Rules:
1. Ground your answers ONLY in the provided RAG Context about ASAY InfoTech. Do not invent outside facts.
2. Leadership: Sivabarathi M (CEO & Founder), Bakiyalakshmi (Manager & MD), Premkumar A (CTO).
3. Location: First Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery, Chennai 603202.
4. Contact: Phone/WhatsApp ${ENV.WHATSAPP_NUMBER}, Email ${ENV.COMPANY_EMAIL}.
5. Format with bold titles, clean bullet points, and high professionalism.`
          });

          const ragPrompt = `RAG RETRIEVED CONTEXT:\n${retrievedContext}\n\nUSER QUESTION:\n${queryToSend}\n\nProvide an accurate, grounded, helpful answer based strictly on the context above.`;
          const result = await model.generateContent(ragPrompt);
          const response = await result.response;
          finalReply = response.text();
        } catch (llmError) {
          console.warn('Gemini live call fallback to deterministic RAG chunk:', llmError);
        }
      }

      // Step D: Deterministic RAG Fallback
      if (!finalReply) {
        if (ragResult) {
          finalReply = ragResult.chunk.content;
        } else {
          finalReply = `Thank you for your inquiry about "${queryToSend}".\n\nAt **ASAY InfoTech**, we provide:\n• **Generative AI:** Enterprise RAG, Model Context Protocol (MCP), and Autonomous Multi-Agent Swarms.\n• **Software Engineering:** High-Performance Web Apps (React 19/Next.js), SaaS Platforms & Cloud DevOps.\n\n📍 **Headquarters:** Guduvanchery, Chennai 603202.\n📞 **Direct Support:** WhatsApp **${ENV.WHATSAPP_NUMBER}** or email **${ENV.COMPANY_EMAIL}**.`;
        }
      }

      setMessages(prev => [...prev, { role: 'model', text: finalReply || '', source: sourceUrl }]);
    } catch (err) {
      console.error('RAG Chatbot Error:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: `🏢 **ASAY InfoTech Headquarters:**\nFirst Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery, Chennai - 603202.\n\n📞 Phone/WhatsApp: ${ENV.WHATSAPP_NUMBER} | ✉️ Email: ${ENV.COMPANY_EMAIL}`
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
          className="fixed bottom-24 right-5 sm:right-6 z-[105] glass w-[310px] sm:w-[390px] h-[540px] max-h-[82vh] flex flex-col overflow-hidden shadow-3xl border border-white/60 rounded-[2.5rem]"
        >
          {/* Header */}
          <div className="p-4 bg-secondary text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/30 rounded-xl flex items-center justify-center border border-primary/40">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                  ASAY RAG Assistant
                  <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                </h3>
                <p className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Enterprise Semantic RAG Active
                </p>
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

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/80 text-xs">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex items-start gap-2.5", m.role === 'user' ? "flex-row-reverse" : "")}>
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                  m.role === 'model' ? "bg-primary text-white" : "bg-secondary text-white"
                )}>
                  {m.role === 'model' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className="max-w-[85%] space-y-1">
                  <div className={cn(
                    "p-3.5 rounded-2xl leading-relaxed shadow-sm whitespace-pre-line font-medium",
                    m.role === 'model' 
                      ? "bg-white text-gray-800 rounded-tl-none border border-gray-100" 
                      : "bg-primary text-white rounded-tr-none"
                  )}>
                    {m.text}
                  </div>
                  {m.source && (
                    <div className="text-[9px] text-gray-400 font-mono pl-1">
                      📚 Source: {m.source}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-primary text-xs font-bold animate-pulse pl-9">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Retrieving RAG knowledge chunks...
              </div>
            )}
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="px-3 py-2 bg-white/90 border-t border-gray-100 flex gap-2 overflow-x-auto text-[10px] scrollbar-none">
            {[
              { label: 'Office Location', query: 'Where is ASAY InfoTech office location in Chennai?', icon: MapPin },
              { label: 'Open Jobs', query: 'What open career jobs and vacancies are available at ASAY InfoTech?', icon: Briefcase },
              { label: 'Contact Details', query: 'What are the official contact phone numbers and WhatsApp of ASAY InfoTech?', icon: Phone },
              { label: 'AI & RAG Solutions', query: 'What Enterprise RAG, MCP, and AI Agent services does ASAY InfoTech build?', icon: Cpu },
              { label: 'Leadership Team', query: 'Who is the CEO, MD, and CTO of ASAY InfoTech?', icon: Users },
            ].map((chip) => {
              const IconComp = chip.icon;
              return (
                <button
                  key={chip.label}
                  onClick={() => handleSend(chip.query)}
                  className="px-2.5 py-1 bg-primary/10 hover:bg-primary hover:text-white text-secondary font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 shadow-sm"
                >
                  <IconComp className="w-3 h-3" />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about AI, jobs, office location, contact..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium text-xs border border-gray-200"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={() => handleSend()} 
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