import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cn } from '../lib/utils';

// Initialize Gemini AI using the defined process variable
const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
const genAI = new GoogleGenerativeAI(apiKey);

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hi! I\'m your Asay Tech assistant. How can I help you explore our digital solutions today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      if (!apiKey || apiKey === 'undefined' || apiKey.length < 10) {
        console.error('ChatBot: API Key is missing or invalid. Check your .env file and Docker build args.');
        throw new Error('Missing Key');
      }

      // Initializing the model - Targeting the v1beta endpoint to match the working AI Studio configuration
      const model = genAI.getGenerativeModel({ 
        model: "gemini-flash-latest", // Using the alias that worked in your curl test
        systemInstruction: "You are Asay AI, the professional assistant for Asay Technologies. We specialize in modern, scalable, and reliable digital solutions. Our services include: Web Development, Custom SaaS, Cloud Solutions, Mobile Apps, Data Analytics, Cybersecurity, Strategic Consulting, Global Scaling, and Rapid Prototyping. Our contact details are: WhatsApp +91 9245464648, Email hello@asaytech.com. Our Chennai office address is: First Floor, No 3/31 Jawaharayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery 603202. Always provide these details directly when asked. Be professional and concise. For detailed project inquiries, suggest visiting the 'Contact' page. For more in-depth service information, suggest visiting the 'Services' page."
      }, { apiVersion: 'v1beta' });
      
      // Build a prompt that includes the last few messages for context
      const contextBuffer = messages.slice(-4).map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`).join('\n');
      const combinedPrompt = `Recent Conversation:\n${contextBuffer}\nUser: ${userText}\nAI:`;

      const result = await model.generateContent(combinedPrompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error('ChatBot Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I am having a bit of trouble connecting. Please try again later.' }]);
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
            className="glass mb-6 w-[260px] sm:w-[320px] h-[400px] flex flex-col overflow-hidden shadow-2xl border-white/60 rounded-[2.5rem]"
          >
            {/* Chat Header */}
            <div className="p-4 bg-secondary text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="font-bold tracking-tight text-white">Asay AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Message Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex items-start gap-3", m.role === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm", m.role === 'model' ? "bg-primary text-white" : "bg-secondary text-white")}>
                    {m.role === 'model' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                  </div>
                  <div className={cn("p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm", m.role === 'model' ? "bg-white text-gray-700 rounded-tl-none border border-gray-100" : "bg-primary text-white rounded-tr-none")}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold animate-pulse pl-11">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Typing...
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white/80 border-t border-gray-100">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm border border-gray-100"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} disabled={!input.trim() || isLoading} className="absolute right-1.5 p-2 bg-secondary text-white rounded-lg hover:bg-primary transition-all disabled:opacity-50 active:scale-95">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-[101]",
          isOpen ? "bg-white text-secondary border border-gray-100 shadow-none" : "bg-secondary text-white"
        )}
      >
        {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
      </motion.button>
    </div>
  );
}