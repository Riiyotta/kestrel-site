import { useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import PlaceholderLogo from '../PlaceholderLogo.jsx'

// LogoMarquee – generic logo ticker, re-implemented from the Proof.jsx marquee (CLONE_SPEC §7) so other pages can
// use it without touching Proof (a later pass will switch Proof over).
// Engine (same as Proof): one Logo-Stack = the logo set in a row with `gap` px between logos; the track holds N
// copies and runs the global .marquee-left / .marquee-right keyframes (src/index.css) over one loop =
// stack width + gap, with duration = loop / speed. Linear, infinite, no hover slow-down; prefers-reduced-motion
// stops it (index.css). N is measured so the track always covers the viewport (min 3, as in Proof).
// Card (`card`, default): 132 tall, radius 16, bg rgba(255,255,255,.4), 1px rgba(0,0,0,.1) border, inner padding
// 10 with the 0/17/83/100% edge mask (CLONE_SPEC §7, A T1.2, B T7–T9, C A3/F3).
// Measured uses: A T1.2 ticker 1200 / 1102 / 936 / 350 wide, 11 logos, 50.8 px/s; C A3 about strip 1280 wide,
// 7 logos, 50 px/s, single row at every width; C F3 LogoWall viewport − 40, 17 logos, 50 px/s; homepage tickers
// 30 px/s with opposing directions.
// Since the homepage switch-over, Proof.jsx renders its strip and tickers through this component (motionId
// "proof-marquee" keeps the homepage motion hook). LogoEntry may carry `opacity` / `filter` (C A3: two of the 7 about
// logos are saturate(0), one also opacity .58); entries without them render exactly as before (no wrapper).

// Default placeholder set (fictional companies; geometry like the homepage set, h 18–30).
export const DEFAULT_LOGOS = [
  { name: 'Quillfin', shape: 'diamond', w: 144, h: 30 },
  { name: 'Harbourline', shape: 'bars', w: 142, h: 30 },
  { name: 'Corvane', shape: 'plus', w: 172, h: 26 },
  { name: 'Saltmere', shape: 'triangle', w: 185, h: 18 },
  { name: 'Brightpaw', shape: 'arc', w: 209, h: 30 },
  { name: 'Fernlo', shape: 'circle', w: 95, h: 30 },
  { name: 'Ostrin', shape: 'square', w: 85, h: 30 },
  { name: 'Mossgate', shape: 'square', w: 132, h: 30 },
  { name: 'Veloma', shape: 'ring', w: 93, h: 25 },
  { name: 'Arcwise', shape: 'arc', w: 111, h: 21 },
  { name: 'Nimbly', shape: 'circle', w: 119, h: 21 },
]

function LogoStack({ logos, height, gap, ariaHidden }) {
  return (
    <div data-logo-stack className="flex shrink-0 items-center" style={{ gap }} aria-hidden={ariaHidden || undefined}>
      {logos.map(({ name, shape, w, h, opacity, filter }, i) => {
        const hh = height ?? h
        const ww = height ? Math.round((w * height) / h) : w
        const logo = <PlaceholderLogo key={`${name}-${i}`} name={name} shape={shape} w={ww} h={hh} />
        if (opacity == null && !filter) return logo
        return (
          <span key={`${name}-${i}`} className="flex shrink-0" style={{ opacity, filter }}>
            {logo}
          </span>
        )
      })}
    </div>
  )
}

export default function LogoMarquee({
  logos = DEFAULT_LOGOS,
  speed = 50,
  direction = 'left',
  gap = 96,
  height = null,
  card = true,
  width = '100%',
  label = 'Customer logos',
  className = '',
  motionId = 'logo-marquee',
}) {
  const viewRef = useRef(null)
  const reduce = useReducedMotion()
  const [{ loop, copies }, setDims] = useState({ loop: 0, copies: 3 })

  useLayoutEffect(() => {
    const view = viewRef.current
    if (!view) return undefined
    const measure = () => {
      const stack = view.querySelector('[data-logo-stack]')
      if (!stack || !stack.offsetWidth) return
      const l = stack.offsetWidth + gap
      const c = Math.max(3, Math.ceil(view.clientWidth / l) + 2)
      setDims((d) => (d.loop === l && d.copies === c ? d : { loop: l, copies: c }))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(view)
    return () => ro.disconnect()
  }, [gap, logos, height])

  const run = !reduce && loop > 0
  const track = (
    <div
      data-motion={motionId}
      data-direction={direction}
      data-speed-px-s={speed}
      data-loop-px={loop || undefined}
      className={`flex w-max items-center ${run ? (direction === 'right' ? 'marquee-right' : 'marquee-left') : ''}`}
      style={{ gap, ...(run ? { '--marquee-loop': `${loop}px`, animationDuration: `${loop / speed}s` } : null) }}
    >
      {Array.from({ length: copies }, (_, i) => (
        <LogoStack key={i} logos={direction === 'right' ? [...logos].reverse() : logos} height={height} gap={gap} ariaHidden={i > 0} />
      ))}
    </div>
  )

  const w = typeof width === 'number' ? `${width}px` : width
  if (!card) {
    return (
      <div ref={viewRef} role="region" aria-label={label} data-ui="logo-marquee" className={`mask-marquee overflow-hidden ${className}`} style={{ width: w, maxWidth: '100%' }}>
        {track}
      </div>
    )
  }
  return (
    <div
      role="region"
      aria-label={label}
      data-ui="logo-marquee"
      className={`h-[132px] overflow-hidden rounded-card border border-card-border bg-marquee-bg ${className}`}
      style={{ width: w, maxWidth: '100%' }}
    >
      <div ref={viewRef} className="mask-marquee flex h-full items-center overflow-hidden p-[10px]">
        {track}
      </div>
    </div>
  )
}
