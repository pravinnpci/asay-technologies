import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "w-10 h-10", size = 40 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="asayGrad1" x1="10%" y1="100%" x2="90%" y2="0%">
          <stop offset="0%" stopColor="#091E3E" />
          <stop offset="60%" stopColor="#06A3DA" />
          <stop offset="100%" stopColor="#00befa" />
        </linearGradient>
        <linearGradient id="asayGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00befa" />
          <stop offset="100%" stopColor="#06A3DA" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#06A3DA" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Rounded Hexagonal / Shield Background Container */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="26"
        fill="url(#asayGrad1)"
        filter="url(#glow)"
      />

      {/* Modern High-Tech Stylized 'A' */}
      {/* Left Stalk */}
      <path
        d="M 28 74 L 46 22 C 48 18 52 18 54 22 L 72 74 C 73.5 78 70 82 65 82 C 62 82 59.5 80 58.5 77 L 54 62 L 46 62 L 41.5 77 C 40.5 80 38 82 35 82 C 30 82 26.5 78 28 74 Z"
        fill="white"
      />

      {/* Center Triangle Cutout */}
      <path
        d="M 50 36 L 56.5 54 L 43.5 54 Z"
        fill="#091E3E"
      />

      {/* Dynamic Cyber Accent Beam / Horizontal Crossbar */}
      <path
        d="M 37 53 L 63 53 C 65 53 66 55 65 57 C 64 58 63 58 61 58 L 39 58 C 37 58 36 58 35 57 C 34 55 35 53 37 53 Z"
        fill="url(#asayGrad2)"
      />

      {/* Glowing Tech Dot at Apex */}
      <circle cx="50" cy="24" r="3.5" fill="#00befa" />
    </svg>
  );
}
