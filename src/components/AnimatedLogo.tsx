import React, { useEffect, useRef } from 'react'

export default function AnimatedSportsCarLogo({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const carRef = useRef<SVGGElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  const LOOP_DURATION = 4000
  const REDUCED_MOTION = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useEffect(() => {
    if (REDUCED_MOTION) return
    const svg = svgRef.current
    const car = carRef.current
    const path = pathRef.current
    if (!svg || !car || !path) return

    const pathLen = path.getTotalLength()
    
    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3)
    }

    function step(ts: number) {
      if (!startRef.current) startRef.current = ts
      const elapsed = (ts - startRef.current) % LOOP_DURATION
      const t = (elapsed / LOOP_DURATION) * 2
      const segment = Math.floor(t) % 2
      const progress = t % 1
      
      let easedProgress
      if (segment === 0) {
        // Первая половина пути - ускорение
        easedProgress = easeOutCubic(progress)
      } else {
        // Вторая половина пути - замедление
        easedProgress = 1 - easeOutCubic(1 - progress)
      }
      
      const totalProgress = (segment + easedProgress) / 2
      const dist = totalProgress * pathLen

      const p = path.getPointAtLength(dist)
      const lookAhead = Math.min(dist + 2, pathLen)
      const next = path.getPointAtLength(lookAhead)
      const angle = Math.atan2(next.y - p.y, next.x - p.x) * (180 / Math.PI)

      car.setAttribute('transform', `translate(${p.x - 45}, ${p.y - 20}) rotate(${angle})`)

      rafRef.current = window.requestAnimationFrame(step)
    }

    rafRef.current = window.requestAnimationFrame(step)
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [REDUCED_MOTION])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 100"
      width="200"
      height="100"
      className={className}
      role="img"
      aria-label="Sports car logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Градиенты */}
        <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff6a00" />
          <stop offset="50%" stopColor="#ff3d00" />
          <stop offset="100%" stopColor="#ff1744" />
        </linearGradient>

        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#2979ff" />
        </linearGradient>

        <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#37474f" />
          <stop offset="100%" stopColor="#102027" />
        </linearGradient>

        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#78909c" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#37474f" stopOpacity="0.8" />
        </linearGradient>

        {/* Тени и эффекты */}
        <filter id="carShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
        </filter>

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Траектория движения */}
        <path
          id="motionPath"
          ref={pathRef as any}
          d="M 20,50 C 40,20 160,20 180,50 C 200,80 40,80 20,50 Z"
          fill="none"
          stroke="none"
        />
      </defs>

      {/* Фоновая траектория */}
      <path
        d="M 20,50 C 40,20 160,20 180,50 C 200,80 40,80 20,50 Z"
        fill="none"
        stroke="url(#accentGradient)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.3"
      />

      {/* Машина */}
      <g ref={carRef as any} filter="url(#carShadow)">
        {/* Основной кузов */}
        <path
          d="M 10,30 L 15,25 L 25,20 L 75,20 L 85,25 L 90,30 L 92,35 L 92,40 L 90,45 L 85,50 L 75,55 L 25,55 L 15,50 L 10,45 L 8,40 L 8,35 Z"
          fill="url(#carGradient)"
          stroke="#000"
          strokeWidth="0.5"
        />

        {/* Лобовое стекло */}
        <path
          d="M 25,25 L 35,22 L 65,22 L 75,25 L 75,35 L 65,32 L 35,32 Z"
          fill="url(#glassGradient)"
          stroke="#000"
          strokeWidth="0.3"
        />

        {/* Заднее стекло */}
        <path
          d="M 15,35 L 25,32 L 25,42 L 15,45 Z"
          fill="url(#glassGradient)"
          stroke="#000"
          strokeWidth="0.3"
        />

        {/* Боковая полоса */}
        <path
          d="M 20,35 L 80,35 L 80,45 L 20,45 Z"
          fill="url(#accentGradient)"
          stroke="#000"
          strokeWidth="0.3"
          opacity="0.9"
        />

        {/* Передний бампер */}
        <path
          d="M 85,28 L 90,30 L 90,40 L 85,42 L 80,40 L 80,30 Z"
          fill="#263238"
          stroke="#000"
          strokeWidth="0.3"
        />

        {/* Задний бампер */}
        <path
          d="M 10,32 L 15,30 L 20,32 L 20,42 L 15,44 L 10,42 Z"
          fill="#263238"
          stroke="#000"
          strokeWidth="0.3"
        />

        {/* Передняя фара */}
        <ellipse cx="87" cy="35" rx="3" ry="2" fill="#ffff00" filter="url(#glow)" />
        
        {/* Задняя фара */}
        <ellipse cx="13" cy="35" rx="2" ry="1.5" fill="#ff3d00" filter="url(#glow)" />

        {/* Колеса */}
        <g>
          {/* Переднее колесо */}
          <g transform="translate(25, 55)">
            <circle cx="0" cy="0" r="8" fill="url(#wheelGradient)" stroke="#000" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="4" fill="#455a64" stroke="#000" strokeWidth="0.3" />
            <circle cx="0" cy="0" r="1.5" fill="#cfd8dc" />
            {/* Спицы */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="0"
                y1="0"
                x2={Math.cos(angle * Math.PI / 180) * 6}
                y2={Math.sin(angle * Math.PI / 180) * 6}
                stroke="#78909c"
                strokeWidth="0.8"
              />
            ))}
          </g>

          {/* Заднее колесо */}
          <g transform="translate(75, 55)">
            <circle cx="0" cy="0" r="8" fill="url(#wheelGradient)" stroke="#000" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="4" fill="#455a64" stroke="#000" strokeWidth="0.3" />
            <circle cx="0" cy="0" r="1.5" fill="#cfd8dc" />
            {/* Спицы */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="0"
                y1="0"
                x2={Math.cos(angle * Math.PI / 180) * 6}
                y2={Math.sin(angle * Math.PI / 180) * 6}
                stroke="#78909c"
                strokeWidth="0.8"
              />
            ))}
          </g>
        </g>

        {/* Вентиляционные решетки */}
        <g opacity="0.7">
          <rect x="40" y="32" width="15" height="3" rx="1" fill="#37474f" />
          <rect x="45" y="37" width="10" height="2" rx="1" fill="#37474f" />
        </g>

        {/* Спойлер */}
        <path
          d="M 70,18 L 80,15 L 82,18 L 70,20 Z"
          fill="#d32f2f"
          stroke="#000"
          strokeWidth="0.3"
        />
      </g>

      {/* Анимационные элементы */}
      {!REDUCED_MOTION && (
        <>
          {/* Эффект скорости */}
          <g opacity="0.6">
            <animate 
              attributeName="opacity"
              values="0.2;0.8;0.2"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <path
              d="M 5,45 L 15,40"
              stroke="url(#accentGradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 5,50 L 12,48"
              stroke="url(#accentGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </>
      )}

      <style jsx>{`
        svg {
          display: block;
          overflow: visible;
          max-width: 100%;
          height: auto;
        }
        
        @media (prefers-reduced-motion: reduce) {
          svg {
            animation: none;
          }
        }
        
        @media (prefers-reduced-motion: no-preference) {
          svg:hover {
            transform: scale(1.02);
            transition: transform 0.3s ease;
          }
        }
      `}</style>
    </svg>
  )
}
