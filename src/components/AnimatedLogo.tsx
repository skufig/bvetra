import React from 'react'

export default function AnimatedLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" width="40" height="20" className={className} aria-hidden="true" focusable="false" role="img">
      <defs>
        <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--primary-600)" />
        </linearGradient>

        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(0,0,0,0.12)" />
        </filter>
      </defs>

      <!-- Car body -->
      <g transform="translate(0,0)" filter="url(#shadow)">
        <rect x="6" y="18" rx="6" ry="6" width="88" height="22" fill="url(#lg)" />
        <rect x="58" y="8" rx="5" ry="5" width="28" height="16" fill="url(#lg)" />
        <!-- windows -->
        <rect x="62" y="10" width="10" height="10" rx="1" fill="rgba(255,255,255,0.22)" />
        <rect x="74" y="10" width="10" height="10" rx="1" fill="rgba(255,255,255,0.16)" />
        <!-- wheels -->
        <circle cx="26" cy="44" r="6" fill="#111" />
        <circle cx="78" cy="44" r="6" fill="#111" />
        <circle cx="26" cy="44" r="3" fill="rgba(255,255,255,0.12)" />
        <circle cx="78" cy="44" r="3" fill="rgba(255,255,255,0.12)" />
      </g>

      <!-- Motion lines -->
      <g id="motion" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" opacity="0.9">
        <path d="M-6 28 L0 28" />
        <path d="M-12 34 L-4 34" />
        <path d="M-18 22 L-8 22" />
      </g>

      <style jsx>{`
        svg { overflow: visible; display: block; }
        @media (prefers-reduced-motion: no-preference) {
          /* translate the car slightly (subtle bounce) */
          g { transform-origin: center; animation: float 3.8s ease-in-out infinite; }
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
            100% { transform: translateY(0); }
          }

          /* moving motion lines to simulate speed */
          #motion { animation: dash 700ms linear infinite; }
          @keyframes dash {
            0% { transform: translateX(0); opacity: 0.95; }
            60% { transform: translateX(32px); opacity: 0.0; }
            100% { transform: translateX(64px); opacity: 0; }
          }
        }
      `}</style>
    </svg>
  )
          }
