import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "w-10 h-10", size = 42 }: LogoProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
      whileTap={{ scale: 0.94 }}
      className={`relative inline-flex items-center justify-center cursor-pointer group select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background Cyber Ambient Aura on Hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF] via-[#06A3DA] to-[#2563EB] rounded-2xl opacity-0 group-hover:opacity-40 blur-md transition-all duration-500 scale-110 pointer-events-none" />

      {/* The Exact Authentic ASAY InfoTech Logo Mark */}
      <img
        src="/logo.png"
        alt="ASAY InfoTech"
        width={size}
        height={size}
        className="relative z-10 w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:brightness-110"
      />
    </motion.div>
  );
}
