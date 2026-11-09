import React, { useState, useEffect } from 'react';
import { MessageSquare, PhoneCall, ChevronUp, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ENV } from '../config/env';

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);

  const whatsappNumber = ENV.WHATSAPP_NUMBER.replace(/[^0-9+]/g, '');
  const message = "Hi ASAY InfoTech, I'd like to inquire about your software and AI solutions.";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleChatState = (e: any) => {
      if (e.detail && typeof e.detail.isOpen === 'boolean') {
        setIsChatActive(e.detail.isOpen);
      }
    };
    window.addEventListener('ai-chat-state-changed', handleChatState);
    return () => window.removeEventListener('ai-chat-state-changed', handleChatState);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAiChat = () => {
    window.dispatchEvent(new CustomEvent('toggle-ai-chat'));
  };

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-[100] flex flex-col items-center gap-2.5">
      {/* 1. Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-white text-secondary rounded-2xl shadow-xl flex items-center justify-center border border-gray-200/80 hover:bg-primary hover:text-white transition-all group relative"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform" />
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-secondary text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none whitespace-nowrap">
              Scroll to Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. AI Assistant Launcher */}
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleAiChat}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-all relative group ${
          isChatActive 
            ? "bg-secondary text-primary border-2 border-primary" 
            : "bg-gradient-to-tr from-secondary to-[#0e3b6e] text-white hover:border-primary/50"
        }`}
        aria-label="Toggle ASAY AI Assistant"
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white flex items-center justify-center">
          <Sparkles className="w-2 h-2 text-white" />
        </span>
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-secondary text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none whitespace-nowrap">
          ASAY AI Assistant
        </span>
      </motion.button>

      {/* 3. WhatsApp Direct Chat Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
        className="w-12 h-12 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-xl hover:shadow-[#25D366]/40 transition-all relative group"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-secondary text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </motion.a>

      {/* 4. Direct Phone Call Button */}
      <motion.a
        href={`tel:${whatsappNumber}`}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
        className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl hover:shadow-primary/40 transition-all relative group"
        aria-label="Call ASAY InfoTech"
      >
        <PhoneCall className="w-5 h-5" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-secondary text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none whitespace-nowrap">
          Call {ENV.WHATSAPP_NUMBER}
        </span>
      </motion.a>
    </div>
  );
}
