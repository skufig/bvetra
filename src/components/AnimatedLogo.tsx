import React, { useEffect, useRef } from 'react'

export default function AnimatedLogo({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const carRef = useRef<SVGGElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  // Animation settings
  const LOOP_DURATION = 28000 // ms — long, mesmerizing loop
  const REDUCED_MOTION = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useEffect(() => {
    if (REDUCED_MOTION) return

    const svg = svgRef.current
    const car = carRef.current
    const path = pathRef.current
    if (!svg || !car || !path) return

    // If browser supports SMIL, it will run automatically.
    // We still provide JS fallback for browsers without SMIL (some WebKit builds).
    const supportsSMIL = typeof (document.createElementNS as any) === 'function' &&
      !!(svg.querySelector('animateMotion') && (svg.querySelector('animateMotion') as SVGElement).getAttribute)

    if (supportsSMIL) {
      return // let SMIL handle it
    }

    // Precompute path length and steps
    const pathLen = path.getTotalLength()

    // Easing function (smooth in-out)
    const easeInOutSine = (t: number) => (1 - Math.cos(Math.PI * t)) / 2

    function step(timestamp: number) {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = (timestamp - startRef.current) % LOOP_DURATION
      const t = elapsed / LOOP_DURATION // 0..1
      const eased = easeInOutSine(t)

      // For figure-eight effect we map eased to path length (0..1)
      // But to make motion continuous (no abrupt jumps) we travel forward along path with loop
      const dist = eased * pathLen

      const point = path.getPointAtLength(dist)
      // get tangent to rotate car: small delta forward on path
      const delta = 0.5
      const nextPoint = path.getPointAtLength(Math.min(dist + delta, pathLen))
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI)

      // Position car: translate so car's internal origin lines up correctly
      // Car group initial transform used translate(-24,-12) in original SVG,
      // we counteract that by applying translate to place car center at point.
      // Adjust offsets to visually center the car on the path.
      const offsetX = -24
      const offsetY = -12
      car.setAttribute('transform', `translate(${point.x + offsetX}, ${point.y + offsetY}) rotate(${angle})`)

      rafRef.current = window.requestAnimationFrame(step)
    }

    rafRef.current = window.requestAnimationFrame(step)

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      startRef.current = null
    }
  }, [REDUCED_MOTION])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 140"
      width="160"
      height="70"
      className={className}
      role="img"
      aria-label="Bvetra animated logo"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient id="lg" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--primary-600)" />
        </linearGradient>

        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(0,0,0,0.36)" />
        </filter>

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <path
          id="figure8"
          ref={pathRef as any}
          d="M160,70
             C 235,10 300,10 235,70
             C 170,130 90,130 160,70
             C 230,10 120,10 160,70 Z"
          fill="none"
        />
      </defs>

      {/* faint guide */}
      <g opacity="0.06" transform="translate(0,0)">
        <use href="#figure8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* glow trail */}
      <g aria-hidden="true">
        <path
          id="trail"
          d="M160,70 C 235,10 300,10 235,70 C 170,130 90,130 160,70 C 230,10 120,10 160,70 Z"
          stroke="url(#lg)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.18"
          filter="url(#glow)"
        />
      </g>

      {/* car group - main element to animate */}
      <g id="car" ref={carRef as any} transform="translate(-24,-12)" filter="url(#softShadow)">
        <g id="carBody" transform="scale(1)" fill="url(#lg)">
          <path d="M22 48 L54 28 L212 28 L244 48 L256 60 Q262 74 250 86 L228 96 L54 96 Q42 92 30 86 Q18 80 22 48 Z" />
          <path d="M132 30 L158 30 L172 44 L142 44 Z" fill="rgba(255,255,255,0.18)" />
          <rect x="228" y="24" width="18" height="6" rx="1.5" fill="rgba(0,0,0,0.12)" transform="rotate(8 237 27)" />
        </g>

        <g id="wheels" fill="#050505">
          <g transform="translate(80,96)">
            <circle cx="0" cy="0" r="10" />
            <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.12)" />
          </g>
          <g transform="translate(210,98)">
            <circle cx="0" cy="0" r="10" />
            <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.12)" />
          </g>
        </g>
      </g>

      {/* SMIL animateMotion as primary method (keeps max smoothness where supported) */}
      <g style={{ display: REDUCED_MOTION ? 'none' : undefined }}>
        <animateMotion xlinkHref="#car" href="#car" dur="28s" repeatCount="indefinite" rotate="auto">
          <mpath xlinkHref="#figure8" />
        </animateMotion>

        <animateTransform
          xlinkHref="#carBody"
          attributeName="transform"
          type="scale"
          dur="9s"
          values="1;1.015;1"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
        />

        <animateTransform
          xlinkHref="#wheels"
          attributeName="transform"
          type="rotate"
          from="0 0 0"
          to="360 0 0"
          dur="1.1s"
          repeatCount="indefinite"
          additive="sum"
        />
      </g>

      <style jsx>{`
        svg { display: block; overflow: visible; }
        @media (prefers-reduced-motion: no-preference) {
          #trail { animation: pulse 6.4s ease-in-out infinite; }
          @keyframes pulse { 0%{ opacity:0.08 } 50%{ opacity:0.22 } 100%{ opacity:0.08 } }
          svg:hover #car { transform-origin: center; transition: transform 420ms ease; transform: translateY(-2px) scale(1.003); }
        }
        @media (prefers-reduced-motion: reduce) {
          #car animateMotion, #car animateTransform, #wheels animateTransform { display: none; }
        }
      `}</style>
    </svg>
  )
}
