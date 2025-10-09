import React, { useEffect, useRef } from 'react'

export default function SportsCarLogo({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const speedLinesRef = useRef<SVGGElement | null>(null)
  
  useEffect(() => {
    const svg = svgRef.current
    const speedLines = speedLinesRef.current
    if (!svg || !speedLines) return

    // Анимация линий скорости с правильной типизацией
    const lines = speedLines.querySelectorAll('.speed-line')
    lines.forEach((line, index) => {
      const svgLine = line as SVGPathElement
      const delay = index * 200
      svgLine.style.animation = `speedEffect 1.5s ease-in-out ${delay}ms infinite`
    })

    return () => {
      lines.forEach(line => {
        const svgLine = line as SVGPathElement
        svgLine.style.animation = ''
      })
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 512 512"
      width="200"
      height="200"
      className={className}
      role="img"
      aria-label="Sports car with speed effect"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Градиенты для машины */}
        <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff3d00" />
          <stop offset="50%" stopColor="#de2a4e" />
          <stop offset="100%" stopColor="#ff1744" />
        </linearGradient>

        <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#37474f" />
          <stop offset="100%" stopColor="#102027" />
        </linearGradient>

        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a3dddc" />
          <stop offset="100%" stopColor="#78909c" />
        </linearGradient>

        {/* Фильтр для свечения */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Линии скорости */}
      <g ref={speedLinesRef} className="speed-lines">
        <path 
          className="speed-line"
          d="M 50,350 L 120,350"
          stroke="url(#carBodyGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0"
        />
        <path 
          className="speed-line"
          d="M 40,370 L 110,370"
          stroke="url(#carBodyGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0"
        />
        <path 
          className="speed-line"
          d="M 60,330 L 130,330"
          stroke="url(#carBodyGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0"
        />
        <path 
          className="speed-line"
          d="M 450,350 L 380,350"
          stroke="url(#carBodyGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0"
        />
        <path 
          className="speed-line"
          d="M 460,370 L 390,370"
          stroke="url(#carBodyGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0"
        />
        <path 
          className="speed-line"
          d="M 440,330 L 370,330"
          stroke="url(#carBodyGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0"
        />
      </g>

      {/* Основной кузов машины */}
      <path
        d="M16.946,292.039L16.946,292.039c13.616,9.484,29.81,14.568,46.404,14.568h380.742 c8.288,0,16.563-0.667,24.744-1.994l27.398-4.443c4.513-0.732,7.83-4.63,7.83-9.202v-17.949c0-5.445-2.893-10.481-7.599-13.223 l-15.43-8.993c-28.237-16.456-60.333-25.127-93.014-25.127H287.016h-93.295c-4.989,0-9.951-0.726-14.731-2.154l-27.863-8.326 c-16.045-4.795-33.176-4.553-49.08,0.692l0,0c-5.51,1.817-11.275,2.743-17.077,2.743H46.254c-26.36,0-37.948,21.981-37.948,40.069 l-0.363,15.595C7.779,281.344,11.16,288.008,16.946,292.039z"
        fill="url(#carBodyGradient)"
        filter="url(#glow)"
      />

      {/* Акцентные детали */}
      <path
        d="M328.089,228.784c-6.84-7.89-70.373-41.549-92.537-47.828c-2.036-0.577-4.05,0.97-4.05,3.086v12.601 c0,1.311,0.799,2.488,2.017,2.972c9.093,3.617,46.207,18.808,55.026,29.169L328.089,228.784L328.089,228.784z"
        fill="url(#accentGradient)"
      />

      <path
        d="M281.74,234.421l-27.632,1.733c-3.178,0.199-5.924-2.194-6.163-5.368l-0.721-9.596 c-0.299-3.989,3.424-7.082,7.291-6.055l27.865,7.4c1.849,0.491,3.183,2.098,3.326,4.005l0.23,3.061 C286.124,232.097,284.237,234.264,281.74,234.421z"
        fill="url(#accentGradient)"
      />

      {/* Колеса */}
      <circle cx="95.873" cy="289.671" r="41.502" fill="url(#wheelGradient)"/>
      <circle cx="95.873" cy="289.671" r="18.639" fill="#C7C9C9"/>
      
      <circle cx="406.21" cy="289.671" r="41.502" fill="url(#wheelGradient)"/>
      <circle cx="406.21" cy="289.671" r="18.639" fill="#C7C9C9"/>

      {/* Дополнительные детали */}
      <path
        d="M160.764,230.611l8.636-29.231c1.51-5.111,6.389-8.469,11.703-8.052l0,0 c5.871,0.46,10.401,5.359,10.401,11.249v24.386L160.764,230.611z"
        fill="#272F37"
      />

      {/* Стеклянные элементы */}
      <path
        d="M481.037,250.804c-12.52-7.296-25.8-13.054-39.551-17.212l18.826,25.858 c2.66,3.655,7.44,5.074,11.663,3.463l18.04-6.877L481.037,250.804z"
        fill="url(#accentGradient)"
        opacity="0.8"
      />

      <style jsx>{`
        svg {
          display: block;
          overflow: visible;
          max-width: 100%;
          height: auto;
        }

        @keyframes speedEffect {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          50% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(20px);
          }
        }

        .speed-line {
          animation: speedEffect 1.5s ease-in-out infinite;
        }

        .speed-line:nth-child(1) { animation-delay: 0ms; }
        .speed-line:nth-child(2) { animation-delay: 200ms; }
        .speed-line:nth-child(3) { animation-delay: 400ms; }
        .speed-line:nth-child(4) { animation-delay: 100ms; }
        .speed-line:nth-child(5) { animation-delay: 300ms; }
        .speed-line:nth-child(6) { animation-delay: 500ms; }

        @media (prefers-reduced-motion: reduce) {
          .speed-line {
            animation: none;
            opacity: 0.3;
          }
        }

        svg:hover .speed-line {
          animation-duration: 0.8s;
        }
      `}</style>
    </svg>
  )
}
