import React from 'react'

export default function AnimatedLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" width="64" height="40" className={className} aria-hidden="true" focusable="false" role="img">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--primary-600)" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="rgba(0,0,0,0.36)" />
        </filter>
      </defs>

      {/* Sportscar angled as moving downwards */}
      <g className="car" transform="translate(0,0)" filter="url(#shadow)">
        <path d="M22 48 L54 28 L132 28 L164 48 L176 60 Q182 74 170 86 L148 96 L54 96 Q42 92 30 86 Q18 80 22 48 Z" fill="url(#g1)" />
        <path d="M92 30 L118 30 L132 44 L102 44 Z" fill="rgba(255,255,255,0.18)" />
        <rect x="150" y="24" width="18" height="6" rx="1.5" fill="rgba(0,0,0,0.12)" transform="rotate(8 159 27)" />
        <g transform="translate(52,96)">
          <circle cx="0" cy="0" r="9" fill="#040404" />
          <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.12)" />
        </g>
        <g transform="translate(146,98)">
          <circle cx="0" cy="0" r="9" fill="#040404" />
          <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.12)" />
        </g>
      </g>

      {/* Exhaust / speed streaks moving downwards */}
      <g id="motion" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" opacity="0.95">
        <path d="M6 8 L36 42" />
        <path d="M0 2 L34 44" />
        <path d="M12 0 L56 52" />
      </g>

      <style jsx>{`
        svg { display:block; overflow:visible; }
        @media (prefers-reduced-motion: no-preference) {
          .car { transform-origin: 100px 60px; animation: floatSubtle 3.8s ease-in-out infinite; }
          #motion { animation: motionDash 700ms linear infinite; transform-origin: 0 0; }
          svg:hover .car { transform: translateY(-2px) scale(1.01); transition: transform 280ms ease; }
        }
      `}</style>
    </svg>
  )
}
