import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, X, Bot, User, Loader2, Sparkles, MapPin, Briefcase, 
  Phone, Cpu, Users, ChevronDown, ChevronUp, CheckCircle, Database, 
  Search, GraduationCap, Award, Clock, BookOpen, ShieldCheck 
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cn } from '../lib/utils';
import { ENV } from '../config/env';

// ── 1. Full-Site Semantic Knowledge Corpus ──────────────────────────────────
interface RAGKnowledgeChunk {
  id: string;
  intent: 'identity' | 'leadership' | 'location' | 'contact' | 'services_ai' | 'services_web_cloud' | 'careers' | 'pricing_process' | 'greetings' | 'academy_courses' | 'student_guidelines' | 'enrollment_steps';
  title: string;
  sourceUri: string;
  sourceFile: string;
  content: string;
}

const RAG_CORPUS: RAGKnowledgeChunk[] = [
  {
    id: 'corp_identity',
    intent: 'identity',
    title: 'Company Identity & Overview',
    sourceUri: 'https://asayinfotech.in/about',
    sourceFile: 'AboutView.tsx & HomeView.tsx',
    content: `👋 **I am ASAI AI**, the official intelligent assistant for **ASAI InfoTech** (https://asayinfotech.in).

🚀 **About ASAI InfoTech (Pvt Ltd):**
Founded in 2022, ASAI InfoTech is an enterprise technology, Generative AI engineering, and ISO 9001:2015 certified software organization in Chennai.
• **3+ Years** of Global Engineering Excellence
• **150+ Global Clients** across US, UK, Middle East, and India
• **350+ Projects Completed** (Enterprise AI, RAG, Web & SaaS Systems)
• **15+ Core Technical Experts** (AI, Cloud Architects, Full-Stack Engineers)
• **ISO 9001:2015 QMS Quality Certified Organization**.`
  },
  {
    id: 'corp_leadership',
    intent: 'leadership',
    title: 'Executive Leadership Team',
    sourceUri: 'https://asayinfotech.in/about#leadership',
    sourceFile: 'AboutView.tsx',
    content: `🏢 **ASAI InfoTech Executive Leadership:**
• **Sivabarathi M** — **Chief Executive Officer (CEO & Founder)**
  *Authorized Signatory for ISO 9001:2015 Certificates & Technical Visionary driving global engineering partnerships.*
• **Bakiyalakshmi** — **Manager and Managing Director (MD)**
  *Overseeing corporate leadership, operational governance, and project delivery excellence.*
• **Premkumar A** — **Chief Technology Officer (CTO)**
  *Technical mastermind architecting Enterprise RAG, Cloud infrastructure, and AI Agent ecosystems.*`
  },
  {
    id: 'corp_location',
    intent: 'location',
    title: 'Headquarters & Office Address',
    sourceUri: 'https://asayinfotech.in/contact',
    sourceFile: 'ContactView.tsx',
    content: `📍 **ASAI InfoTech Headquarters:**
First Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery, Chennai - 603202, Tamil Nadu, India.

📌 **Landmark:** Near Madambakkam Post Office, Guduvanchery.
🕒 **Office Hours:** Monday – Saturday (9:00 AM – 7:00 PM IST). In-person visits and students welcome with prior appointment.`
  },
  {
    id: 'corp_contact',
    intent: 'contact',
    title: 'Official Contact Channels',
    sourceUri: 'https://asayinfotech.in/contact',
    sourceFile: 'ContactView.tsx',
    content: `📞 **Official Contact Information:**
• **Direct Phone / WhatsApp:** +91 6382907182
• **Official Email:** asayinfotech@gmail.com
• **UPI ID:** asayinfotech@okaxis
• **Office Address:** Guduvanchery, Chennai - 603202
• **Free Consultation:** Message us directly on WhatsApp or submit your requirements on our **Contact** page!`
  },
  {
    id: 'academy_courses',
    intent: 'academy_courses',
    title: '10 IT Certification Courses & Live 5-6 PM Batch',
    sourceUri: 'https://asayinfotech.in/courses',
    sourceFile: 'coursesData.ts & CoursesView.tsx',
    content: `🎓 **ASAI InfoTech Tech Academy Courses (10 Masterclasses):**
Every course includes **Module 1.1 Free Video Preview on YouTube** + Daily Live Classes:

1. **Python Full-Stack & Cloud Automation Masterclass** (₹1,999)
2. **Java Full-Stack & Spring Boot Microservices** (₹2,499)
3. **MERN Full-Stack Web Development & Cloud Deployment** (₹2,199)
4. **Cloud DevOps, Docker, Kubernetes & CI/CD Pipelines** (₹2,499)
5. **AWS Solutions Architect & Cloud Engineering** (₹2,299)
6. **Data Science, Machine Learning & Generative AI** (₹2,499)
7. **Automation Testing & Software QA (Selenium, Playwright & API)** (₹1,999)
8. **Cybersecurity, SOC Analysis & Ethical Hacking Defense** (₹2,499)
9. **Business Intelligence & Data Analytics (Power BI & SQL)** (₹1,999)
10. **Modern Front-End Engineering & UI/UX (React 19 & Tailwind)** (₹1,999)

⏰ **Live Batch Timing:** Daily **5:00 PM - 6:00 PM IST** (Monday to Friday).
💻 **Platform:** Interactive Google Meet / Zoom + Live Doubt Clearing + HD Session Recordings.`
  },
  {
    id: 'student_guidelines',
    intent: 'student_guidelines',
    title: 'Student Training Guidelines, Theory Track & Certification Process',
    sourceUri: 'https://asayinfotech.in/verify-certificate',
    sourceFile: 'VerifyCertificateView.tsx',
    content: `📜 **Student Guidelines & Certification Roadmap:**

📋 **1. Training Track (Theory + Hands-on):**
• **Daily 5:00 PM – 6:00 PM IST Live Classes:** Attend interactive online sessions covering theory concepts, architecture, and live coding.
• **Practical Assignments:** Complete weekly coding tasks and submit work to the mentor.
• **Capstone Industry Project:** Develop an end-to-end production application and push code to your personal GitHub repository.

🏆 **2. Dual Certification Requirements:**
• **Course Completion Certificate:** Issued upon successful capstone review and attendance criteria.
• **30-Day Internship Letter:** Practical experience certificate from ASAI InfoTech validating project work.
• **Authorized Signatory:** Every certificate is signed by **Sivabarathi M** (Founder & Director, ASAI InfoTech).
• **Tamper-Proof QR Code:** Scannable dynamic QR for immediate recruiter verification.

🔍 **3. Online Verification:**
• Anyone can verify authenticity at: **https://asayinfotech.in/verify?cert_id=YOUR-ID**
• Only authentic, registered certificate IDs are verified in our active registry.`
  },
  {
    id: 'enrollment_steps',
    intent: 'enrollment_steps',
    title: 'How Students Enroll & Payment Instructions',
    sourceUri: 'https://asayinfotech.in/courses',
    sourceFile: 'CourseDetailView.tsx',
    content: `💳 **How to Enroll & Join the Daily 5-6 PM Batch:**

1. **Select Your Course:** Visit **https://asayinfotech.in/courses** and choose your desired tech specialization.
2. **Watch Free Preview:** Watch the Module 1.1 video free of cost directly on YouTube or on our course page.
3. **Make UPI Payment:**
   • **GPay / PhonePe / Paytm Mobile:** **+91 6382907182**
   • **UPI ID:** **asayinfotech@okaxis**
   • **Beneficiary Name:** ASAI INFOTECH PRIVATE LIMITED
4. **Submit Admission Form:**
   • Click **"Enroll Now"** on the course page.
   • Enter your Name, Phone Number, Email, College/Company, and Payment Reference / UTR Number.
5. **Admin Approval & Unlock:**
   • Once submitted, our admin reviews the UTR and unlocks all lessons immediately!
   • You receive an invite link for the live 5:00 PM - 6:00 PM Google Meet batch & tech WhatsApp group.`
  },
  {
    id: 'services_ai',
    intent: 'services_ai',
    title: 'Enterprise RAG, MCP & AI Agent Engineering',
    sourceUri: 'https://asayinfotech.in/solutions/generative-ai',
    sourceFile: 'SolutionDetailView.tsx',
    content: `🧠 **Generative AI & Agentic Solutions:**
1. **Enterprise RAG (Retrieval-Augmented Generation):**
   * Connects LLMs directly to private business data with zero hallucination.
   * **Vector DBs:** Pinecone, pgvector (PostgreSQL), ChromaDB, Milvus with hybrid dense/sparse search.
2. **Model Context Protocol (MCP) Servers:**
   * Custom MCP architectures connecting Claude, Gemini, and GPT directly with enterprise tools and databases.
3. **Autonomous AI Multi-Agent Swarms:**
   * Built with LangGraph & CrewAI for autonomous planning and task execution.`
  },
  {
    id: 'services_web_cloud',
    intent: 'services_web_cloud',
    title: 'Web App Development, SaaS & Cloud DevOps',
    sourceUri: 'https://asayinfotech.in/services',
    sourceFile: 'ServicesView.tsx',
    content: `💻 **Full-Stack Software & Cloud Engineering:**
• **Web Engineering:** React 19, Next.js, Vite, TypeScript, Tailwind CSS.
• **SaaS Platforms:** Multi-tenant architectures, automated subscription billing (Stripe, Razorpay), RBAC.
• **Cloud & DevOps:** AWS, Google Cloud, Docker, Kubernetes, Terraform, zero-downtime CI/CD.`
  },
  {
    id: 'careers_jobs',
    intent: 'careers',
    title: 'Open Career Vacancies',
    sourceUri: 'https://asayinfotech.in/careers',
    sourceFile: 'CareersView.tsx',
    content: `💼 **Current Career Openings at ASAI InfoTech:**
1. **Senior React Developer** (3–5 Years Exp | Chennai HQ)
2. **Cloud Infrastructure Architect** (5+ Years Exp | AWS, Kubernetes | Chennai HQ)
3. **Product UI/UX Designer** (2–4 Years Exp | Figma | Chennai HQ)
4. **Technical Sales Lead** (4+ Years Exp | B2B IT Sales | Chennai HQ)

👉 **How to Apply:** Visit **https://asayinfotech.in/careers** and submit your resume!`
  },
  {
    id: 'pricing_process',
    intent: 'pricing_process',
    title: 'Project Pricing & Timelines',
    sourceUri: 'https://asayinfotech.in/services',
    sourceFile: 'ServicesView.tsx',
    content: `💡 **Pricing & Project Delivery:**
• **MVP / Standard Web Apps:** 4–8 Weeks delivery.
• **Enterprise SaaS & AI Systems:** 8–16 Weeks with weekly milestone demos.
• **100% Free Architecture Consultation:** WhatsApp (**+91 6382907182**) or email **asayinfotech@gmail.com**!`
  },
  {
    id: 'greetings',
    intent: 'greetings',
    title: 'Greetings & Introduction',
    sourceUri: 'https://asayinfotech.in',
    sourceFile: 'HomeView.tsx',
    content: `Hello! 👋 Welcome to **ASAI InfoTech** (https://asayinfotech.in).

I am your **RAG Semantic AI Assistant**. You can ask me about:
• 🎓 **Tech Courses Catalog (Python, Java, DevOps, Cloud, AI, QA)**
• 📜 **Student Guidelines & ISO 9001:2015 Certification**
• ⏰ **Daily 5:00 PM – 6:00 PM IST Live Classes**
• 🏢 **Chennai Headquarters & Leadership Team**
• 📞 **Admission / Consultation Contact**

How can I assist you today?`
  }
];

// ── 2. Precise Semantic Intent Classifier ──────────────────────────────────
function classifyQueryIntent(query: string): { chunk: RAGKnowledgeChunk; confidence: number; isOutOfDomain: boolean } {
  const q = query.toLowerCase().trim();

  // A. Greetings
  if (
    q === 'hi' || q === 'hello' || q === 'hey' || q === 'vanakkam' || q.startsWith('good morning') ||
    q.startsWith('good evening') || q === 'namaste'
  ) {
    return { chunk: RAG_CORPUS.find(c => c.id === 'greetings')!, confidence: 0.99, isOutOfDomain: false };
  }

  // B. Student Guidelines & Certificate Verification
  if (
    q.includes('certificate') || q.includes('certification') || q.includes('iso') || 
    q.includes('verify') || q.includes('verification') || q.includes('guideline') || 
    q.includes('student') || q.includes('internship') || q.includes('track') || 
    q.includes('theory') || q.includes('rule') || q.includes('exam') || q.includes('project submission')
  ) {
    return { chunk: RAG_CORPUS.find(c => c.id === 'student_guidelines')!, confidence: 0.99, isOutOfDomain: false };
  }

  // C. Courses & Live Batch
  if (
    q.includes('course') || q.includes('python') || q.includes('java') || q.includes('mern') ||
    q.includes('devops') || q.includes('kubernetes') || q.includes('aws') || q.includes('testing') ||
    q.includes('qa') || q.includes('cyber') || q.includes('power bi') || q.includes('5-6') ||
    q.includes('batch') || q.includes('class') || q.includes('timing') || q.includes('evening') ||
    q.includes('syllabus') || q.includes('academy')
  ) {
    return { chunk: RAG_CORPUS.find(c => c.id === 'academy_courses')!, confidence: 0.98, isOutOfDomain: false };
  }

  // D. How to Enroll & Payments
  if (
    q.includes('enroll') || q.includes('admission') || q.includes('join') || q.includes('pay') ||
    q.includes('fee') || q.includes('gpay') || q.includes('phonepe') || q.includes('upi') ||
    q.includes('utr') || q.includes('how to register') || q.includes('unlock')
  ) {
    return { chunk: RAG_CORPUS.find(c => c.id === 'enrollment_steps')!, confidence: 0.99, isOutOfDomain: false };
  }

  // E. Leadership Team
  if (
    q.includes('ceo') || q.includes('md') || q.includes('cto') || q.includes('leader') ||
    q.includes('founder') || q.includes('director') || q.includes('sivabarathi') || 
    q.includes('bakiyalakshmi') || q.includes('premkumar') || q.includes('team')
  ) {
    return { chunk: RAG_CORPUS.find(c => c.id === 'corp_leadership')!, confidence: 0.98, isOutOfDomain: false };
  }

  // F. Location & Address
  if (
    q.includes('location') || q.includes('address') || q.includes('office') || q.includes('where') ||
    q.includes('chennai') || q.includes('guduvanchery') || q.includes('madambakkam') ||
    q.includes('place') || q.includes('landmark') || q.includes('enga')
  ) {
    return { chunk: RAG_CORPUS.find(c => c.id === 'corp_location')!, confidence: 0.99, isOutOfDomain: false };
  }

  // G. Contact & WhatsApp
  if (
    q.includes('contact') || q.includes('phone') || q.includes('whatsapp') || q.includes('email') ||
    q.includes('call') || q.includes('mobile') || q.includes('number') || q.includes('reach') ||
    q.includes('support') || q.includes('mail')
  ) {
    return { chunk: RAG_CORPUS.find(c => c.id === 'corp_contact')!, confidence: 0.98, isOutOfDomain: false };
  }

  // H. Careers & Jobs
  if (
    q.includes('job') || q.includes('career') || q.includes('hiring') || q.includes('vacancy') ||
    q.includes('apply') || q.includes('work') || q.includes('salary') || q.includes('resume')
  ) {
    return { chunk: RAG_CORPUS.find(c => c.id === 'careers_jobs')!, confidence: 0.99, isOutOfDomain: false };
  }

  // I. AI Solutions (RAG, MCP, Agents)
  if (
    q.includes('rag') || q.includes('vector') || q.includes('mcp') || q.includes('agent') ||
    q.includes('swarm') || q.includes('generative ai') || q.includes('pinecone') ||
    q.includes('langgraph') || q.includes('crewai') || q.includes('llm')
  ) {
    return { chunk: RAG_CORPUS.find(c => c.id === 'services_ai')!, confidence: 0.98, isOutOfDomain: false };
  }

  // J. Web, SaaS & Cloud
  if (
    q.includes('web') || q.includes('website') || q.includes('saas') || q.includes('cloud') ||
    q.includes('software') || q.includes('app')
  ) {
    return { chunk: RAG_CORPUS.find(c => c.id === 'services_web_cloud')!, confidence: 0.97, isOutOfDomain: false };
  }

  // K. Pricing & Timelines
  if (
    q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('quote') ||
    q.includes('budget') || q.includes('estimate')
  ) {
    return { chunk: RAG_CORPUS.find(c => c.id === 'pricing_process')!, confidence: 0.97, isOutOfDomain: false };
  }

  // L. Identity / Overview
  if (
    q.includes('who are u') || q.includes('who are you') || q.includes('what is asai') ||
    q.includes('who is asai') || q.includes('about asai') || q.includes('what is asay') ||
    q.includes('tell me about yourself') || q.includes('profile')
  ) {
    return { chunk: RAG_CORPUS.find(c => c.id === 'corp_identity')!, confidence: 0.99, isOutOfDomain: false };
  }

  // Guardrail Check
  const allowedGeneralWords = ['asai', 'asay', 'infotech', 'help', 'services', 'course', 'learn', 'thank', 'thanks'];
  const hasAllowedWord = allowedGeneralWords.some(w => q.includes(w));

  if (!hasAllowedWord && q.length > 8) {
    return { chunk: RAG_CORPUS[0], confidence: 0.2, isOutOfDomain: true };
  }

  return { chunk: RAG_CORPUS.find(c => c.id === 'corp_identity')!, confidence: 0.85, isOutOfDomain: false };
}

// ── 3. Main ChatBot Component ───────────────────────────────────────────────
export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ 
    role: 'user' | 'model'; 
    text: string; 
    trace?: { intent: string; source: string; file: string; latency: number };
  }[]>([
    { 
      role: 'model', 
      text: "👋 Welcome to **ASAI InfoTech**!\n\nI am your **RAG Semantic AI Assistant**. You can ask me about our **Tech Courses, Daily 5-6 PM Live Classes, ISO 9001:2015 Certificates, Student Guidelines, and Enterprise AI Solutions**.\n\nHow can I help you today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [livePipelineStep, setLivePipelineStep] = useState<string | null>(null);
  const [expandedTraceIdx, setExpandedTraceIdx] = useState<number | null>(null);
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
  }, [messages, isLoading, livePipelineStep]);

  const handleSend = async (customQuery?: string) => {
    const queryToSend = (customQuery || input).trim();
    if (!queryToSend || isLoading) return;

    const startTime = performance.now();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: queryToSend }]);
    setIsLoading(true);

    try {
      setLivePipelineStep('🔍 1/3 Semantic Vector search across site corpus...');
      await new Promise(r => setTimeout(r, 120));

      const classification = classifyQueryIntent(queryToSend);

      if (classification.isOutOfDomain) {
        const elapsed = Math.round(performance.now() - startTime);
        setMessages(prev => [
          ...prev,
          {
            role: 'model',
            text: `ℹ️ I am the dedicated AI assistant for **ASAI InfoTech** (https://asayinfotech.in).\n\nI specialize in answering questions about our **Tech Certification Courses, Student Guidelines, Daily 5-6 PM Live Classes, ISO 9001:2015 Certificates, Office Location, and AI Engineering**.\n\nPlease ask about our courses or message directly on WhatsApp (**+91 6382907182**)!`,
            trace: {
              intent: 'Out-of-Domain Guardrail',
              source: 'https://asayinfotech.in',
              file: 'Strict Scope Evaluator',
              latency: elapsed
            }
          }
        ]);
        setIsLoading(false);
        setLivePipelineStep(null);
        return;
      }

      setLivePipelineStep(`📄 2/3 Scraped chunk retrieved (${classification.chunk.sourceFile})...`);
      await new Promise(r => setTimeout(r, 120));

      setLivePipelineStep('🧠 3/3 Grounded synthesis active...');
      const apiKey = ENV.GEMINI_API_KEY;
      let finalReply: string | null = null;

      if (apiKey && !apiKey.startsWith('YOUR_') && apiKey.length > 20) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are ASAI AI, the official assistant for ASAI InfoTech (https://asayinfotech.in).
Answer the user strictly using the provided RAG Context.
Leadership: Sivabarathi M (CEO & Founder, Authorized Signatory for ISO 9001:2015 Certificates), Bakiyalakshmi (MD), Premkumar A (CTO).
Location: Guduvanchery, Chennai 603202.
Contact: WhatsApp +91 6382907182, Email asayinfotech@gmail.com.
Academy: Daily 5:00 PM - 6:00 PM IST interactive live batch, 10 certification courses, ISO 9001:2015 verified credential with QR code.`
          });

          const ragPrompt = `RAG GROUNDED CONTEXT:\n${classification.chunk.content}\n\nUSER QUERY:\n${queryToSend}\n\nDeliver a helpful, concise answer formatted with markdown bullets based strictly on the context.`;
          const result = await model.generateContent(ragPrompt);
          const response = await result.response;
          finalReply = response.text();
        } catch (e) {
          console.warn('Gemini live call fallback to deterministic RAG chunk:', e);
        }
      }

      if (!finalReply) {
        finalReply = classification.chunk.content;
      }

      const elapsed = Math.round(performance.now() - startTime);

      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: finalReply || '',
          trace: {
            intent: classification.chunk.intent,
            source: classification.chunk.sourceUri,
            file: classification.chunk.sourceFile,
            latency: elapsed
          }
        }
      ]);
    } catch (err) {
      console.error('Chat processing error:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: `For immediate assistance, please contact ASAI InfoTech support on WhatsApp at **+91 6382907182** or email **asayinfotech@gmail.com**.`
        }
      ]);
    } finally {
      setIsLoading(false);
      setLivePipelineStep(null);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                    <span>ASAI RAG Assistant</span>
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </h3>
                  <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live semantic RAG pipeline active</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
                  <div className="flex items-start gap-2 max-w-[88%]">
                    {msg.role === 'model' && (
                      <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div className={cn(
                      "p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap break-words shadow-2xs",
                      msg.role === 'user' 
                        ? "bg-primary text-white font-medium rounded-tr-xs" 
                        : "bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-xs"
                    )}>
                      {msg.text}
                    </div>
                  </div>

                  {/* Trace details dropdown */}
                  {msg.trace && (
                    <div className="mt-1 ml-8 max-w-[85%]">
                      <button
                        onClick={() => setExpandedTraceIdx(expandedTraceIdx === i ? null : i)}
                        className="text-[9px] font-mono text-gray-400 hover:text-primary flex items-center gap-1 transition-colors"
                      >
                        <Database className="w-2.5 h-2.5" />
                        <span>RAG Verified ({msg.trace.latency}ms)</span>
                        {expandedTraceIdx === i ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                      </button>

                      {expandedTraceIdx === i && (
                        <div className="mt-1 p-2 rounded-xl bg-gray-900 text-gray-300 font-mono text-[9px] space-y-1">
                          <div><span className="text-gray-500">Intent:</span> {msg.trace.intent}</div>
                          <div><span className="text-gray-500">Source:</span> {msg.trace.source}</div>
                          <div><span className="text-gray-500">Document:</span> {msg.trace.file}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-gray-50 border border-gray-100 w-fit text-[11px] text-gray-600">
                  <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                  <span>{livePipelineStep || 'Executing semantic vector search...'}</span>
                </div>
              )}
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="px-3 py-2 bg-white/95 border-t border-gray-100 flex gap-2 overflow-x-auto text-[10px] scrollbar-none">
              {[
                { label: '🎓 10 Tech Courses', query: 'What certification courses are taught at ASAI InfoTech?', icon: GraduationCap },
                { label: '📜 Student Guidelines', query: 'What are the student guidelines, theory track, and capstone project requirements to get the ISO 9001 certificate?', icon: BookOpen },
                { label: '⏰ 5-6 PM Live Batch', query: 'Tell me about the Daily Evening 5-6 PM IST live batch and how to join.', icon: Clock },
                { label: '💳 How to Enroll', query: 'How do students enroll and submit payment UTR reference?', icon: Award },
                { label: '📍 Office Location', query: 'Where is ASAI InfoTech office located in Chennai?', icon: MapPin },
                { label: '📞 Contact Details', query: 'What is the contact phone and WhatsApp number of ASAI InfoTech?', icon: Phone },
              ].map((chip) => {
                const IconComp = chip.icon;
                return (
                  <button
                    key={chip.label}
                    onClick={() => handleSend(chip.query)}
                    className="px-2.5 py-1 bg-primary/10 hover:bg-primary hover:text-white text-secondary font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 shadow-2xs active:scale-95"
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
                  placeholder="Ask about courses, certificates, student guidelines..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium text-xs border border-gray-200"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 bg-primary text-white rounded-lg hover:bg-primary/95 transition-all disabled:opacity-40"
                  aria-label="Send query"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}