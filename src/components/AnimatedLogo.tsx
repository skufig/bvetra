import React from 'react'

export default function AnimatedLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width="40" height="40" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--primary-600)" />
        </linearGradient>
      </defs>

      <g transform="translate(10,10) scale(0.8)">
        <circle cx="40" cy="40" r="34" fill="url(#g)" />
        <text x="40" y="48" textAnchor="middle" fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" fontWeight="700" fontSize="36" fill="white">B</text>
      </g>

      <style jsx>{`
        svg { will-change: transform; display: block; }
        @media (prefers-reduced-motion: no-preference) {
          svg { animation: float 4s ease-in-out infinite; }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
        }
      `}</style>
    </svg>
  )
}
