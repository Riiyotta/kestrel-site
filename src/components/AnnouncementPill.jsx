import { useEffect, useState } from 'react'
import { MotionConfig, animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { PILL_APPEAR, PILL_BREATH_SCALE, PILL_BREATH_TIMES, PILL_HOVER } from '../lib/motion.js'

// Announcement pill "Variant 1" (CLONE_SPEC §5) – used in Hero (and Footer later).
// Outer 277x54 (padding 6px 12px, backdrop blur 10) > inner pill 253x42 white, radius 100, 1px #E6E6E6.
// Glow behind: wrapper 297x74 radius 32 blur 12 > Glow 311x36 brand gradient B blur 24.
// Motion (measured on live):
//   - glow wrapper on-load appear: opacity .001 -> 1, scale 0 -> 1, spring 203 / 47 / 4.1, delay .7. Confirmed by
//     patching Element.prototype.animate on live: two WAAPI animations on the blur(12px) glow wrapper inside
//     "Variant 1" (opacity .001 -> 1.012 overshoot -> 1 and scale 0 -> 1.012 -> 1, 125 linear-baked keyframes,
//     1240ms, delay 700). Live starts that delay on its first rendered frame (rise ~750ms after FCP); the clone
//     waits for first-contentful-paint before starting it (framer-motion would otherwise count from mount).
//   - Glow breathing loop: 5.0s period (1 -> .9 with a small undershoot, hold ~1s, -> 1 with a 1.005 overshoot,
//     hold ~1s); keeps running on hover (live has no hover scale on the glow)
//   - hover: inner bg #FFF -> #1A1A1A, label -> transparent white -> #FFF, arrow rotate -45deg + scale 1.4 (15x14 -> 21x20),
//     overdamped spring k70 / c22 / m1. On hover-out the label snaps back to black instantly (live).

// true once the page has painted (FCP), so the appear delay counts from the first visible frame like live.
function useFirstPaint() {
  const [painted, setPainted] = useState(false)
  useEffect(() => {
    if (typeof PerformanceObserver === 'undefined' || performance.getEntriesByName('first-contentful-paint').length) {
      setPainted(true)
      return undefined
    }
    let po
    const done = () => setPainted(true)
    try {
      po = new PerformanceObserver((list) => {
        if (list.getEntriesByName('first-contentful-paint').length) done()
      })
      po.observe({ type: 'paint', buffered: true })
    } catch {
      done()
    }
    const t = setTimeout(done, 1500) // fallback (paint timing unsupported / never reported)
    return () => {
      po?.disconnect()
      clearTimeout(t)
    }
  }, [])
  return painted
}

const BREATH = { duration: 5, times: PILL_BREATH_TIMES.map((t) => t / 5), ease: 'linear', repeat: Infinity }

export function ArrowRight({ className = '', ...rest }) {
  return (
    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" aria-hidden="true" className={className} {...rest}>
      <path
        d="M1 7h12.5M8 1.5 13.5 7 8 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Inner bg #FFF <-> #1A1A1A follows the same spring as the arrow but live mixes the channels in squared
// (linear-light) space, framer's mixLinearColor: v = sqrt(255^2 (1-p) + 26^2 p). Live samples (pointer at 0ms,
// ~45ms input latency): 232@67 201@152 173@233 148@317 128@399 109@486 94@567 82@651 71@734 62@817 49@983 36@1256,
// which is the arrow's progress (.38@152 .76@399) through that mix; a plain sRGB tween reached 71 by 403ms.
const mixBg = (p) => {
  const v = Math.round(Math.sqrt(Math.max(0, 255 * 255 * (1 - p) + 26 * 26 * p)))
  return `rgb(${v}, ${v}, ${v})`
}

const inner = {
  rest: { color: '#000000', transition: { ...PILL_HOVER, color: { duration: 0, delay: PILL_HOVER.delay } } },
  // Live hover target is #1A1A1A (the static spec's #373737 was a mid-transition sample: the frame series
  // 254, 213, 168, 131, 103, 82, 66, 53, 45 @15..1083ms only fits this spring with a #1A1A1A end colour).
  // The label jumps to transparent white and its alpha follows the spring (.13@82 .46@215 .75@415 .91@682).
  hover: { color: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'], transition: PILL_HOVER },
}
// The variant-driven arrow starts ~2 frames before the animate()-driven bg; live starts them together
// (arrow -7.9@67 -17.3@152 -24.6@233 -30.1@317 -34.1@399 -37.1@486 -39.2@567 -40.8@651 -42.8@817, same t0 as the bg
// samples above), so the arrow waits an extra 30ms.
const ARROW_T = { ...PILL_HOVER, delay: PILL_HOVER.delay + 0.03 }
const arrow = {
  rest: { rotate: 0, scale: 1, transition: ARROW_T },
  hover: { rotate: -45, scale: 1.4, transition: ARROW_T },
}

export default function AnnouncementPill({ children, href = '#' }) {
  const reduce = useReducedMotion()
  const painted = useFirstPaint()
  const hoverP = useMotionValue(0)
  const innerBg = useTransform(hoverP, mixBg)
  const hoverTo = (v) => animate(hoverP, v, PILL_HOVER)
  return (
    <MotionConfig reducedMotion="user">
      <motion.a href={href} className="group relative inline-flex" data-motion="announcement" initial="rest" animate="rest" whileHover="hover" onHoverStart={() => hoverTo(1)} onHoverEnd={() => hoverTo(0)}>
        {/* glow wrapper (centring via framer x/y so it composes with the appear scale) */}
        <motion.span
          aria-hidden="true"
          data-motion="announcement-glow-wrapper"
          className="pointer-events-none absolute left-1/2 top-1/2 flex h-[74px] w-[297px] items-center justify-center rounded-logo-tile blur-glow"
          style={{ x: '-50%', y: '-50%' }}
          initial={{ opacity: 0.001, scale: 0 }}
          animate={painted ? { opacity: 1, scale: 1 } : { opacity: 0.001, scale: 0 }}
          transition={PILL_APPEAR}
        >
          <motion.span
            data-motion="announcement-glow"
            className="block h-9 w-[311px] shrink-0 bg-brand-3 blur-glow-lg"
            animate={reduce ? undefined : { scale: PILL_BREATH_SCALE }}
            transition={BREATH}
          />
        </motion.span>
        {/* outer: live computes border-radius 0 here, but the backdrop blur then renders as a visible hard-edged
            rectangle over the glow, so it takes the same pill radius as the inner pill (100px) */}
        <span className="relative flex h-[54px] items-center rounded-announce px-3 py-1.5 backdrop-blur-tag">
          {/* inner – 1px #E6E6E6 border is a Framer ::after overlay on the live site (takes no layout space) */}
          <motion.span
            variants={inner}
            style={{ backgroundColor: innerBg }}
            className="relative flex h-[42px] items-center gap-2 rounded-announce bg-white px-4 text-ink after:pointer-events-none after:absolute after:inset-0 after:rounded-announce after:border after:border-announce-border"
          >
            <span className="whitespace-nowrap font-sans font-medium text-announce tracking-announce">{children}</span>
            <motion.span variants={arrow} className="flex" data-motion="announcement-arrow">
              <ArrowRight />
            </motion.span>
          </motion.span>
        </span>
      </motion.a>
    </MotionConfig>
  )
}
