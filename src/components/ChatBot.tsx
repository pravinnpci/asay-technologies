import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cn } from '../lib/utils';
import { ENV } from '../config/env';

// Company knowledge base for instant, guaranteed offline/fail-safe AI assistance
const companyKnowledge: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['location', 'where', 'address', 'place', 'office', 'chennai', 'guduvanchery', 'located'],
    answer: "🏢 **ASAY InfoTech Headquarters:**\nFirst Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery, Chennai - 603202, Tamil Nadu, India."
  },
  {
    keywords: ['phone', 'contact', 'call', 'mobile', 'number', 'reach'],
    answer: "📞 You can reach us directly:\n• **Phone / Call:** +91 6382907182\n• **WhatsApp:** +91 6382907182\n• **Email:** asayinfotech@gmail.com\n\nFeel free to visit our **Contact** page to send a direct project inquiry!"
  },
  {
    keywords: ['whatsapp', 'chat'],
    answer: "💬 You can chat with our team on WhatsApp directly at **+91 6382907182** or click the green WhatsApp icon at the bottom right!"
  },
  {
    keywords: ['email', 'mail'],
    answer: "✉️ Our official email address is **asayinfotech@gmail.com**. We typically respond within 24 hours."
  },
  {
    keywords: ['rag', 'retrieval', 'vector', 'hallucination', 'semantic search', 'knowledge base'],
    answer: "🧠 **Enterprise RAG (Retrieval-Augmented Generation):**\nWe build custom RAG pipelines using vector databases (Pinecone, pgvector, ChromaDB), hybrid dense/sparse search, and reranking. This allows LLMs to query your private company documents and databases with 100% factual accuracy and zero hallucination!"
  },
  {
    keywords: ['mcp', 'model context protocol', 'tool calling', 'connector'],
    answer: "🔌 **Model Context Protocol (MCP) Integration:**\nWe develop custom MCP servers and clients to connect Claude, Gemini, and GPT directly with your enterprise databases, GitHub/Jira tools, file systems, and internal APIs safely and securely!"
  },
  {
    keywords: ['agent', 'swarm', 'langgraph', 'crewai', 'autogen', 'autonomous'],
    answer: "🤖 **Autonomous AI Agents & Multi-Agent Swarms:**\nWe build agentic workflows using LangGraph and CrewAI that can plan multi-step execution paths, execute tools, review outputs, and automate complex end-to-end business operations autonomously!"
  },
  {
    keywords: ['chatbot', 'chatbox', 'copilot', 'bot', 'conversational ai'],
    answer: "💬 **Custom AI Chatbots & Copilots:**\nWe build domain-trained conversational AI bots deployed across Web, WhatsApp, and Slack with conversational memory, custom personas, and enterprise security guardrails!"
  },
  {
    keywords: ['service', 'solution', 'what do you do', 'expertise', 'build', 'offer', 'ai'],
    answer: "🚀 **ASAY InfoTech Core Solutions:**\n1. **AI Agents, RAG & MCP Engineering** (Autonomous Swarms, Vector Search)\n2. **Custom AI Chatbots & Copilots** (24/7 Web, WhatsApp & Slack)\n3. **Web App Development** (React, Next.js, Node.js)\n4. **SaaS Platforms** (Multi-tenant, Subscription engines)\n5. **Cloud Integration & DevOps** (AWS, GCP, Docker, Kubernetes)\n6. **Custom Enterprise Software** (CRM, ERP, Automation Portals)\n\nCheck out our **Services** page for in-depth specs!"
  },
  {
    keywords: ['career', 'job', 'hiring', 'vacancy', 'apply', 'work with you'],
    answer: "💼 We are actively hiring talented professionals!\n• **Senior React Developer** (3-5 Years)\n• **Cloud & DevOps Engineer** (2-4 Years)\n• **UI/UX Product Designer** (2+ Years)\n\nVisit our **Careers** page to submit your application directly!"
  },
  {
    keywords: ['ceo', 'md', 'director', 'founder', 'leadership', 'team', 'owner'],
    answer: "👥 **Our Leadership Team:**\n• **Sivabarathi P** - Chief Executive Officer (CEO)\n• **Pravinkumar A** - Manager and MD\n• **Premkumar A** - Chief Technology Officer (CTO)"
  },
  {
    keywords: ['price', 'cost', 'quote', 'estimate', 'budget', 'rate'],
    answer: "💡 Project costs vary depending on features, scale, and timeline. Standard MVPs typically take 4-8 weeks. Visit our **Contact** page or WhatsApp us at **+91 6382907182** for a free technical consultation and tailored quote!"
  },
  {
    keywords: ['hello', 'hi', 'hey', 'vanakkam', 'morning', 'evening'],
    answer: "Hello! 👋 Welcome to **ASAY InfoTech**. How can I help you today? You can ask about our services, office location, contact details, career openings, or project estimates."
  }
];

function getKnowledgeBaseResponse(userText: string): string | null {
  const clean = userText.toLowerCase().trim();
  for (const item of companyKnowledge) {
    if (item.keywords.some(k => clean.includes(k))) {
      return item.answer;
    }
  }
  return null;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { 
      role: 'model', 
      text: "Hi! I'm your ASAY InfoTech AI assistant. How can I help you today? Feel free to ask about our services, Chennai office location, contact numbers, or career opportunities." 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

      // 1. If a valid Gemini API key is configured and not leaked/dummy, attempt live LLM call
      if (apiKey && !apiKey.startsWith('YOUR_') && apiKey.length > 20) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are ASAY AI, the professional assistant for ASAY InfoTech. Contact: Phone/WhatsApp ${ENV.WHATSAPP_NUMBER}, Email ${ENV.COMPANY_EMAIL}. Address: First Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery, Chennai 603202. Services: Web App Development, SaaS Platforms, Cloud Integration, Digital Services, Custom Software. Be professional, direct and helpful.`
          });

          const result = await model.generateContent(userText);
          const response = await result.response;
          reply = response.text();
        } catch (apiError) {
          console.warn('Gemini API call skipped/fallback:', apiError);
        }
      }

      // 2. Guaranteed Knowledge Base Fallback if Gemini key is blocked or not provided
      if (!reply) {
        const localMatch = getKnowledgeBaseResponse(userText);
        if (localMatch) {
          reply = localMatch;
        } else {
          reply = `Thank you for your question! We specialize in custom web applications, SaaS platforms, cloud integrations, and enterprise software.\n\nFor detailed assistance with "${userText}", please reach our engineering team directly via **WhatsApp (${ENV.WHATSAPP_NUMBER})** or email **${ENV.COMPANY_EMAIL}**!`;
        }
      }

      setMessages(prev => [...prev, { role: 'model', text: reply || '' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'model', 
          text: "Our headquarters is located at: First Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery, Chennai 603202. Contact us anytime at +91 6382907182 or asayinfotech@gmail.com!" 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-48 right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass mb-6 w-[290px] sm:w-[360px] h-[460px] flex flex-col overflow-hidden shadow-3xl border border-white/60 rounded-[2.5rem]"
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
                  <p className="text-[10px] text-green-400 font-medium">● Online 24/7</p>
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
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 text-xs">
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
                  Thinking...
                </div>
              )}
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="px-3 py-2 bg-white/70 border-t border-gray-100 flex gap-2 overflow-x-auto text-[10px]">
              {['🧠 RAG & AI', '🔌 MCP', '🤖 AI Agents', '🏢 Location', '💼 Services', '📞 Contact'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => {
                    const query = chip.replace(/[^a-zA-Z]/g, '');
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
                  placeholder="Ask a question..."
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

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-[101]",
          isOpen ? "bg-white text-secondary border border-gray-200" : "bg-secondary text-white hover:bg-primary"
        )}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X className="w-7 h-7" /> : <Bot className="w-7 h-7" />}
      </motion.button>
    </div>
  );
}