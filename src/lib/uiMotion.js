// Motion constants for the shared page primitives (src/components/ui). Every value is from SPEC_PAGES_A/B/C; where
// the spec gives frame samples, the cubic-bezier was least-squares fitted to them (samples quoted beside each).
// Kept separate from src/lib/motion.js (homepage curves), which this file only imports from.
import { PILL_HOVER } from './motion.js'

// A T5.4 FaqAccordion "panel": height + answer opacity together, opacity .11@0 .51@111 .85@221 .94@330 .99@512
// 1@681 -> spec: spring { duration .6, bounce 0 }.
export const FAQ_PANEL = { type: 'spring', duration: 0.6, bounce: 0 }
// A T5.4 per-letter title reveal: opacity/y .75@~100ms .94@~250 1@~450, no stagger, once.
// Fit: 450ms cubic-bezier(.15,.7,.1,.95) (max error .002).
export const LETTER_REVEAL = { duration: 0.45, ease: [0.15, 0.7, 0.1, 0.95] }
// A T5.3 accordion bands: panel height ~450ms ease-out -> spec: spring { duration .45, bounce 0 }.
export const BAND_SPRING = { type: 'spring', duration: 0.45, bounce: 0 }
// B T7 QuestionAccordion: h59/op.64@66ms h66/op.94@204ms, settled ~500ms -> spec: spring k400 / c40.
export const ROWS_SPRING = { type: 'spring', stiffness: 400, damping: 40 }
// B T8 FaqCards: 66->258->287px by 150ms, opacity .84 -> 1 -> spec: height auto, ease-out .2s.
export const CARDS_OPEN = { duration: 0.2, ease: 'easeOut' }
// B R.6 hairline FAQ: plus rotates 45deg, .5deg@50ms 22@150 44@300 -> 0.3s ease-in-out. Answer: instant.
export const PLUS_ROTATE = { duration: 0.3, ease: 'easeInOut' }

// A T2.3 CardCarousel arrow click: 0 -> 380px, 85@97ms 344@220 settled ~390ms.
// Fit: 390ms cubic-bezier(.7,.45,.1,1) (max error .003).
export const CAROUSEL_SCROLL = { duration: 390, bezier: [0.7, 0.45, 0.1, 1] }
// B T3 CardRail arrow click: ~350ms ease-out, 85% at 210ms. Fit: 350ms cubic-bezier(0,.05,.2,.85).
export const RAIL_SCROLL = { duration: 350, bezier: [0, 0.05, 0.2, 0.85] }

// B T1 FilterChips select: fill white -> theme light, 113ms rgb(255,254,255) 270ms rgb(254,240,253) 425ms final.
// Fit (green-channel progress .05@113 .71@270 1@425): 425ms cubic-bezier(.75,0,.35,.85).
export const CHIP_FILL = { duration: 0.425, ease: [0.75, 0, 0.35, 0.85] }

// B T4 HoverToc / T5 chips / ShareRail / CTA chip: CSS transitions use cubic-bezier(.65,0,.35,1) (tailwind `ease-ui`).
export const UI_EASE = [0.65, 0, 0.35, 1]
// B T6 TickToc hover: tick widths 14 -> 26@60ms 42@150 48@300 50@600 (of 50). Fit: 600ms cubic-bezier(.25,.7,.05,1).
export const TICK_GROW = { duration: 0.6, ease: [0.25, 0.7, 0.05, 1] }
// B T6 TickToc popover: opacity .35@60ms .73@150 .95@300 (scale .97 -> 1, x -6 -> 0 on the same progress).
// Fit: 350ms cubic-bezier(.4,.85,.45,.8) (max error .001).
export const TOC_POPOVER = { duration: 0.35, ease: [0.4, 0.85, 0.45, 0.8] }

// C partner submit arrow (rotate -45deg on hover): duration not frame-sampled; the spec says to use the
// announcement-pill arrow spring (CLONE_SPEC §5), which is PILL_HOVER.
export const ARROW_HOVER = PILL_HOVER

// C F3 LogoWall strip reveal: "same as §7 reveal" = opacity 0, y 80 -> 1, 0, 0.6s Framer ease-out.
export { REVEAL_06 } from './motion.js'

// Plain cubic-bezier evaluator (for rAF-driven scroll tweens, where CSS/framer easings can't be used).
export function cubicBezier(x1, y1, x2, y2) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const X = (t) => ((ax * t + bx) * t + cx) * t
  const Y = (t) => ((ay * t + by) * t + cy) * t
  return (x) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let lo = 0
    let hi = 1
    for (let i = 0; i < 24; i++) {
      const m = (lo + hi) / 2
      if (X(m) < x) lo = m
      else hi = m
    }
    return Y((lo + hi) / 2)
  }
}

// Tween an element's scrollLeft with rAF. Returns a cancel function. Scroll-snap is suspended for the tween (a
// mandatory snap container would otherwise fight every intermediate scrollLeft) and restored at the end.
export function animateScrollLeft(el, to, { duration, bezier }, reduce = false) {
  const from = el.scrollLeft
  const max = el.scrollWidth - el.clientWidth
  const target = Math.max(0, Math.min(max, to))
  if (reduce || duration <= 0 || Math.abs(target - from) < 1) {
    el.scrollLeft = target
    return () => {}
  }
  const ease = cubicBezier(...bezier)
  const snap = el.style.scrollSnapType
  el.style.scrollSnapType = 'none'
  let raf = 0
  const t0 = performance.now()
  const step = (now) => {
    const p = Math.min(1, (now - t0) / duration)
    el.scrollLeft = from + (target - from) * ease(p)
    if (p < 1) raf = requestAnimationFrame(step)
    else el.style.scrollSnapType = snap
  }
  raf = requestAnimationFrame(step)
  return () => {
    cancelAnimationFrame(raf)
    el.style.scrollSnapType = snap
  }
}
