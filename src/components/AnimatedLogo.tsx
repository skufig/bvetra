import React, { useEffect, useRef } from 'react'

export default function AnimatedLogo({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const carRef = useRef<SVGGElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  const LOOP_DURATION = 30000 // ms — длинный плавный цикл
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

    if (supportsSMIL) {
      return // SMIL выполнит анимацию там, где поддерживается
    }

    const pathLen = path.getTotalLength()
    const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2

    function step(ts: number) {
      if (!startRef.current) startRef.current = ts
      const elapsed = (ts - startRef.current) % LOOP_DURATION
      const t = elapsed / LOOP_DURATION
      const eased = ease(t)
      const dist = eased * pathLen

      const p = path.getPointAtLength(dist)
      const delta = 0.5
      const next = path.getPointAtLength(Math.min(dist + delta, pathLen))
      const angle = Math.atan2(next.y - p.y, next.x - p.x) * (180 / Math.PI)

      const offsetX = -28
      const offsetY = -18
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
      width="160"
      height="72"
      className={className}
      role="img"
      aria-label="Bvetra animated logo"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient id="orangeGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#ff9a3c" />
          <stop offset="100%" stopColor="#ff6a00" />
        </linearGradient>

        <filter id="drop" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="rgba(0,0,0,0.28)" />
        </filter>

        <path
          id="figure8path"
          ref={pathRef as any}
          d="M180,80 C 260,10 340,10 260,80 C 200,150 120,150 180,80 C 240,10 140,10 180,80 Z"
          fill="none"
        />
      </defs>

      <g opacity="0.06">
        <use href="#figure8path" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g aria-hidden="true">
        <path
          d="M180,80 C 260,10 340,10 260,80 C 200,150 120,150 180,80 C 240,10 140,10 180,80 Z"
          stroke="url(#orangeGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.16"
          filter="url(#drop)"
        />
      </g>

      <g id="car" ref={carRef as any} transform="translate(-28,-18)" filter="url(#drop)">
        <g id="body" fill="#0b0b0b">
          <path d="M28 56 L64 34 L304 34 L340 56 L356 74 Q362 94 344 108 L316 122 L64 122 Q50 118 36 108 Q22 98 28 56 Z" />
          <path d="M170 36 L204 36 L222 52 L186 52 Z" fill="rgba(255,255,255,0.12)" />
        </g>

        <g id="wheels">
          <g transform="translate(96,126)">
            <circle cx="0" cy="0" r="12" fill="#111" />
            <circle cx="0" cy="0" r="6.2" fill="url(#orangeGrad)" />
          </g>
          <g transform="translate(268,130)">
            <circle cx="0" cy="0" r="12" fill="#111" />
            <circle cx="0" cy="0" r="6.2" fill="url(#orangeGrad)" />
          </g>
        </g>

        <path d="M64 64 C 120 46 240 46 312 64" stroke="url(#orangeGrad)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
      </g>

      <g id="motionLines" stroke="url(#orangeGrad)" strokeWidth="3" strokeLinecap="round" opacity="0.95">
        <path d="M14 28 L40 20" />
        <path d="M6 40 L48 26" />
        <path d="M24 12 L60 28" />
      </g>

      <g style={{ display: REDUCED_MOTION ? 'none' : undefined }}>
        <animateMotion xlinkHref="#car" href="#car" dur="30s" repeatCount="indefinite" rotate="auto">
          <mpath xlinkHref="#figure8path" href="#figure8path" />
        </animateMotion>

        <animateTransform
          xlinkHref="#body"
          attributeName="transform"
          type="scale"
          dur="8s"
          values="1;1.01;1"
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
          #trail, #motionLines { animation: pulse 6.8s ease-in-out infinite; }
          @keyframes pulse { 0% { opacity: 0.06 } 50% { opacity: 0.2 } 100% { opacity: 0.06 } }
          svg:hover #car { transform-origin: center; transition: transform 420ms ease; transform: translateY(-3px) scale(1.004); }
          #motionLines { transform-origin: center; animation-duration: 4.2s; }
        }
        @media (prefers-reduced-motion: reduce) {
          #car animateMotion, #car animateTransform, #wheels animateTransform { display: none; }
        }
      `}</style>
    </svg>
  )
}
