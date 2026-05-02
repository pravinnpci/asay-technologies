import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

export function FloatingActions() {
  const whatsappNumber = "+919245464648";
  const message = "Hi Asay Tech, I'd like to inquire about your services.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/40 transition-shadow relative group"
      >
        <MessageSquare className="w-8 h-8" />
        <span className="absolute right-full mr-4 px-4 py-2 bg-white text-secondary text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none whitespace-nowrap border border-gray-100">
          Chat on WhatsApp
        </span>
      </motion.a>

      {/* Call Button (Mobile only logic usually, but here for convenience) */}
      <motion.a
        href="tel:+919245464648"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-primary/40 transition-shadow relative group"
      >
        <PhoneCall className="w-7 h-7" />
        <span className="absolute right-full mr-4 px-4 py-2 bg-white text-secondary text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none whitespace-nowrap border border-gray-100">
          Call Us
        </span>
      </motion.a>
    </div>
  );
}
