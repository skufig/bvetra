import React, { useEffect, useRef } from 'react'

export default function AnimatedLogo({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const carRef = useRef<SVGGElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  const LOOP_DURATION = 30000
  const REDUCED_MOTION = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useEffect(() => {
    if (REDUCED_MOTION) return
    const svg = svgRef.current
    const car = carRef.current
    const path = pathRef.current
    if (!svg || !car || !path) return

    const supportsSMIL = !!svg.querySelector('animateMotion')
    if (supportsSMIL) return

    const pathLen = path.getTotalLength()
    const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2

    function step(ts: number) {
      if (!startRef.current) startRef.current = ts
      const elapsed = (ts - startRef.current) % LOOP_DURATION
      const t = elapsed / LOOP_DURATION
      const eased = ease(t)
      const dist = eased * pathLen

      const p = path.getPointAtLength(dist)
      const delta = 0.8
      const next = path.getPointAtLength(Math.min(dist + delta, pathLen))
      const angle = Math.atan2(next.y - p.y, next.x - p.x) * (180 / Math.PI)

      const offsetX = -160 * 0.12
      const offsetY = -80 * 0.12
      car.setAttribute('transform', `translate(${p.x + offsetX}, ${p.y + offsetY}) rotate(${angle})`)

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
      viewBox="0 0 360 160"
      width="240"
      height="106"
      className={className}
      role="img"
      aria-label="Animated sports car logo"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient id="gOr" x1="0" x2="1">
          <stop offset="0%" stopColor="#ff9a3c" />
          <stop offset="100%" stopColor="#ff6a00" />
        </linearGradient>

        <linearGradient id="gGold" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--primary, #b88a3a)" />
          <stop offset="100%" stopColor="var(--primary-600, #8f6a2a)" />
        </linearGradient>

        <filter id="sh" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="rgba(0,0,0,0.36)" />
        </filter>

        <path
          id="fig8"
          ref={pathRef as any}
          d="M180,80 C 260,12 340,12 260,80 C 200,148 120,148 180,80 C 240,12 140,12 180,80 Z"
          fill="none"
        />
      </defs>

      <g opacity="0.06">
        <use href="#fig8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g aria-hidden="true">
        <path
          d="M180,80 C 260,12 340,12 260,80 C 200,148 120,148 180,80 C 240,12 140,12 180,80 Z"
          stroke="url(#gOr)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.16"
          filter="url(#sh)"
        />
      </g>

      <g id="car" ref={carRef as any} transform="translate(-43,-22)" filter="url(#sh)">
        <g id="carBody" transform="scale(0.9)" fill="#060606">
          <path d="M24 62 C40 34 88 18 164 18 C240 18 296 36 324 70 C332 82 332 98 318 110 C300 128 264 128 160 128 C70 128 46 118 28 102 C14 90 16 74 24 62 Z" />
          <path d="M176 34 C196 34 218 46 232 62 C208 58 186 50 176 34 Z" fill="rgba(255,255,255,0.12)" />
        </g>

        <g id="wheels" transform="translate(0,0)">
          <g transform="translate(112,118)">
            <circle cx="0" cy="0" r="14" fill="#030303" />
            <circle cx="0" cy="0" r="6.6" fill="url(#gOr)" />
          </g>
          <g transform="translate(260,122)">
            <circle cx="0" cy="0" r="14" fill="#030303" />
            <circle cx="0" cy="0" r="6.6" fill="url(#gOr)" />
          </g>
        </g>

        <path d="M48 72 C112 54 232 54 300 72" stroke="url(#gOr)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.95" />

        <g id="headlights" opacity="0.12">
          <ellipse cx="312" cy="70" rx="8" ry="4" fill="#fff" />
          <ellipse cx="304" cy="68" rx="4" ry="2" fill="#fff" />
        </g>
      </g>

      <g id="speed" stroke="url(#gOr)" strokeWidth="3" strokeLinecap="round" opacity="0.98">
        <path d="M12 26 L48 18" />
        <path d="M6 40 L56 26" />
        <path d="M28 10 L72 32" />
      </g>

      <g style={{ display: REDUCED_MOTION ? 'none' : undefined }}>
        <animateMotion xlinkHref="#car" href="#car" dur="30s" repeatCount="indefinite" rotate="auto">
          <mpath xlinkHref="#fig8" />
        </animateMotion>

        <animateTransform
          xlinkHref="#carBody"
          attributeName="transform"
          type="scale"
          dur="9s"
          values="0.9;0.905;0.9"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
        />

        <animateTransform
          xlinkHref="#wheels"
          attributeName="transform"
          type="rotate"
          from="0 0 0"
          to="360 0 0"
          dur="1.05s"
          repeatCount="indefinite"
          additive="sum"
        />
      </g>

      <style jsx>{`
        svg { display:block; overflow:visible; }
        @media (prefers-reduced-motion: no-preference) {
          #trailPulse, #speed { animation: pulse 7.2s ease-in-out infinite; }
          @keyframes pulse { 0%{ opacity:0.06 } 50%{ opacity:0.22 } 100%{ opacity:0.06 } }
          svg:hover #car { transform-origin: center; transition: transform 420ms ease; transform: translateY(-3px) scale(1.004); }
        }
        @media (prefers-reduced-motion: reduce) {
          #car animateMotion, #car animateTransform, #wheels animateTransform { display: none; }
        }
      `}</style>
    </svg>
  )
}
