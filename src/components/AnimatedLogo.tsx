import React from 'react'

export default function AnimatedLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 90" width="56" height="32" className={className} aria-hidden="true" focusable="false" role="img">
      <defs>
        <linearGradient id="lg" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--primary-600)" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="rgba(0,0,0,0.28)" />
        </filter>
      </defs>

      {/* Sportscar oriented as if moving downwards (tilt) */}
      <g transform="translate(0,0) scale(1)" filter="url(#shadow)" className="car">
        {/* main body */}
        <path d="M16 36 L36 22 L92 22 L122 36 L132 46 Q136 54 128 60 L116 66 L38 66 Q28 64 20 60 Q12 56 16 36 Z"
              fill="url(#lg)" />
        {/* cockpit */}
        <path d="M56 26 L80 26 L88 34 L68 34 Z" fill="rgba(255,255,255,0.18)" />
        {/* spoiler */}
        <rect x="102" y="20" width="14" height="4" rx="1" fill="rgba(0,0,0,0.12)" transform="rotate(6 109 22)" />
        {/* wheels */}
        <g transform="translate(24,64)">
          <circle cx="0" cy="0" r="8" fill="#070707" />
          <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.12)" />
        </g>
        <g transform="translate(104,66)">
          <circle cx="0" cy="0" r="8" fill="#070707" />
          <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.12)" />
        </g>
      </g>

      {/* Speed streaks (move downwards to match direction) */}
      <g id="motion" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" opacity="0.95">
        <path d="M10 12 L30 26" />
        <path d="M2 6 L26 26" />
        <path d="M22 2 L46 30" />
      </g>

      <style jsx>{`
        svg { overflow: visible; display: block; }
        @media (prefers-reduced-motion: no-preference) {
          .car { transform-origin: 80px 40px; animation: floatSubtle 3.6s ease-in-out infinite; }
          #motion { animation: motionDash 700ms linear infinite; transform-origin: 0 0; }
        }
      `}</style>
    </svg>
  )
}
