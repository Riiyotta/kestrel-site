// Shared motion helpers for Nav / Hero / AnnouncementPill / Button / VideoTeaser.
// Every value below was measured on the live site (frame-sampled framer-motion output); see the
// comments for the raw samples each curve was fitted to.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAnimationFrame, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/* ---------- curves ---------- */

// Desktop nav (dropdown, scrim, indicator, shell, labels, chevrons). Fitted to frame samples:
// dropdown opacity .22@58ms .65@106 .86@155 .95@207 1@306 -> cubic-bezier(.22,1,.36,1) 0.35s (+1 frame lag).
export const NAV_EASE = [0.22, 1, 0.36, 1]
// Hover latency (pointer entering Product from below, 5 clean trials, first frame with opacity > .01): live
// 73/93/87/99/82ms vs clone 16–19ms -> +0.055s delay on opening.
export const NAV_FADE = { duration: 0.35, ease: NAV_EASE, delay: 0.055 }
// Indicator x/width + shell width: 481->575 / 1080->865, .23@39 .56@71 .84@120 .95@172 .98@218 -> 0.33s.
// Switch latency (pointer entering Industries while Product is open, 5 clean trials): live shell starts moving
// 55/51/52/63/51ms after entry vs clone 17–20ms; after the start both track (live 930@53 889@105 874@154 867@203
// 865@301, indicator 509->575 / 94->104) -> +0.03s delay. (PANEL_* delays below already include the live latency.)
export const NAV_MORPH = { duration: 0.33, ease: NAV_EASE, delay: 0.03 }
// Close: hold, then 1 -> .62@+64ms .18@+115 .04@+167 0@+214. Re-measured from the exact pointer-leave event
// (pointer jumped out of the pill/Shell, 5 clean trials): live fade starts 288/273/273/287/287ms and hits 0 at
// 453/438/438/454/454ms (.968@0 .735@+32 .361@+66 .155@+101 .054@+132 .010@+165 0@+198); clone with 0.24 started at
// 267–270ms -> hold 0.255s. (An earlier run on an overloaded machine read 299–337ms on live; discarded.)
// The extra grace is a plain delay, not a bigger hover area: live closes as soon as the pointer leaves the
// pill or the dropdown Shell (sideways exits next to the Shell close too).
export const NAV_CLOSE = { duration: 0.21, ease: [0.45, 0, 0.1, 0.9], delay: 0.255 }
// Panel crossfade: outgoing 1->0 (.73@71 .27@120 .08@172 0@269), incoming 0->1 (.10@120 .32@172 .62@218 .86@269 1@367).
export const PANEL_OUT = { duration: 0.3, ease: NAV_EASE, delay: 0.03 }
export const PANEL_IN = { duration: 0.29, ease: [0.44, 0, 0.56, 1], delay: 0.04 }

// Phone nav sheet (390x844, real touch taps): scrim .35@44 .60@76 .77@120 .93@176 1@306,
// pill height 52->458 tracks it; close: height .26@47 .54@79 .73@113 .85@146 .96@213.
// Re-measured from the touchstart event (390x844, touch taps): live pill height 127@57 204@78 266@96 317@115 354@134
// 381@154 404@172 418@191 431@213 446@253 453@289 456@322 = the clone's curve ~50ms later; the scrim follows the same
// curve ~80ms after the tap (.181@96 .342@115 .482@134 .597@154 .765@191 .867@213 .927@253 .961@289). Close: height
// 363@58 247@91 168@123 118@157 90@188 72@226 62@256 57@289 (~45ms later), scrim .949@91 .617@123 .375@157 .218@188
// .123@226 .067@256 .035@289 (~75ms later, tail slightly longer). -> delays below (Framer tap pipeline).
export const PHONE_OPEN = { duration: 0.3, ease: [0.15, 1, 0.7, 1], delay: 0.05 }
export const PHONE_CLOSE = { duration: 0.23, ease: [0.3, 0.9, 0.6, 0.9], delay: 0.045 }
export const PHONE_SCRIM_OPEN = { ...PHONE_OPEN, delay: 0.08 }
export const PHONE_SCRIM_CLOSE = { ...PHONE_CLOSE, delay: 0.075 }
// Hamburger bars: rotate 0->45 .41@44 .67@76 .86@120 .96@176 .993@241; middle bar 1->0 by ~150ms.
export const PHONE_BARS = { duration: 0.27, ease: [0.2, 0.6, 0.2, 1] }
// Sub-menu expand (row 52->870): .22@48 .48@78 .69@110 .82@142 .90@178 .95@210 .99@278; collapse slightly quicker.
export const SUB_OPEN = { duration: 0.37, ease: [0.25, 0.9, 0.3, 1] }
export const SUB_CLOSE = { duration: 0.34, ease: [0.25, 0.8, 0.3, 1] }

// Hero satellite reveal (opacity / x / y / scale share one progress): .07@65 .26@165 .50@315 .70@512
// .83@714 .92@913 .97@1112 1@1500 -> cubic-bezier(.15,.35,.25,1) 1.5s. Same curve when hiding (scroll back up).
export const REVEAL = { duration: 1.5, ease: [0.15, 0.35, 0.25, 1] }
// Photo blur 5px -> 0 runs on its own ease-in-out with a short hold (live, warmed-up page, jump 0 -> 700, ms after
// the scroll): 5@101 4.97@171 4.88@239 4.73@304 4.50@368 4.21@433 3.85@496 3.43@562 2.96@629 2.47@697 1.98@763
// 1.52@830 1.10@896 .75@966 .47@1031 .25@1097 .11@1167 .02@1230 0@1296 (QA run: 4.28@432 1.61@829 .04@1249).
// Least-squares fit: delay .12s + 1.12s cubic-bezier(.45,.05,.55,.9) (max error .03px).
export const REVEAL_BLUR = { duration: 1.12, ease: [0.45, 0.05, 0.55, 0.9], delay: 0.12 }

// Announcement pill hover (arrow rotate -45 / scale 1.4, inner bg, label colour): overdamped spring,
// arrow -6.1@82 -20.4@215 -30.1@347 -36@482 -39.6@614 -41.7@749 -43@882 -44.1@1083 -> k 70 / c 22 / m 1.
// Re-measured with real pointer hovers: the arrow and bg trail the clone's start by ~45ms in and out (live's Framer
// hover pipeline; a CSS :hover on the same page has no lag) -> delay .045. Inner bg: see mixBg in AnnouncementPill.
export const PILL_HOVER = { type: 'spring', stiffness: 70, damping: 22, mass: 1, delay: 0.045 }
// On-load appear of the glow wrapper (from __framer__appearAnimationsContent). Live WAAPI keyframes (Element.animate
// patched at load): opacity .001 -> 1.012 -> 1 and scale 0 -> 1.012 -> 1 over 1240ms, delay 700; sampled after the
// rise: .41@154 .59@214 .735@281 .843@348 .943@447 .98@514 1@586 1.012@714 1.007@915 1.001@1182.
export const PILL_APPEAR = { type: 'spring', stiffness: 203, damping: 47, mass: 4.1, delay: 0.7 }
// Glow "breathing" loop: 5.0s period, sampled every 100ms (scale values, linear between samples).
export const PILL_BREATH_TIMES = [
  0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2,
  3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.95, 5.0,
]
export const PILL_BREATH_SCALE = [
  1, 1.0027, 1.0044, 1.0047, 1.0035, 1.0005, 0.9953, 0.9876, 0.9769, 0.963, 0.9458, 0.9269, 0.9093, 0.8982, 0.8953, 0.8998,
  0.9, 0.9, 0.8977, 0.8958, 0.8952, 0.8962, 0.8989, 0.9036, 0.9108, 0.9209, 0.9342, 0.9509, 0.9698, 0.9879, 1.0004, 1.0048,
  1, 1,
]

/* ---------- hooks ---------- */

export function useViewport() {
  const read = () => ({ w: typeof window === 'undefined' ? 1440 : window.innerWidth, h: typeof window === 'undefined' ? 900 : window.innerHeight })
  const [vp, setVp] = useState(read)
  useEffect(() => {
    const on = () => setVp(read())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return vp
}

// Window scrollY as a motion value. Lenis drives native scroll (window.scrollTo every frame), so this is
// already Lenis-smoothed.
export function useWindowScrollY() {
  return useScroll().scrollY
}

// The live Framer scroll transforms (Photo-Center zoom, Unicorn bg) trail their target with an exponential
// follow: after an instant 0 -> 400 jump the residual was .55@85ms .24@168 .10@250 .045@334 .019@416
// (=> time constant ~100ms). Parallax on the satellites is NOT smoothed (exact k*scrollY every frame).
export function useSmoothFollow(source, tau = 0.1) {
  const out = useMotionValue(source.get())
  useAnimationFrame((_, delta) => {
    const target = source.get()
    const cur = out.get()
    if (Math.abs(target - cur) < 0.001) {
      if (cur !== target) out.set(target)
      return
    }
    const k = 1 - Math.exp(-Math.min(delta, 64) / 1000 / tau)
    out.set(cur + (target - cur) * k)
  })
  return out
}

// Fires `cb(scrollY)` on every scroll change and once on mount.
export function useScrollCallback(scrollY, cb) {
  useMotionValueEvent(scrollY, 'change', cb)
  useEffect(() => {
    cb(scrollY.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export { useReducedMotion }

/* =====================================================================================
   Sections 3–10 (Proof → Footer). Values read from the live Framer bundle (effect configs) and
   cross-checked against frame-sampled computed styles on the live page; raw samples beside each.
   ===================================================================================== */

// Framer "appear" tween used by every in-view reveal below (bundle transition2/4–10/19).
// Tools middle tile 0.4s: .142@29ms .288@61 .436@98 .546@129 .648@162 .742@196 .82@230 .91@280 .97@332 1@400.
// Proof card 4 (0.6s): .045@15 .251@82 .429@148 .585@216 .719@284 .822@349 .903@416 .961@485 .992@549 1@614.
export const FRAMER_EASE_OUT = [0.12, 0.23, 0.5, 1]
export const REVEAL_06 = { duration: 0.6, ease: FRAMER_EASE_OUT }
export const REVEAL_04 = { duration: 0.4, ease: FRAMER_EASE_OUT }

// Duration-based springs (framer-motion maps duration/bounce exactly like the Framer runtime).
// Stories slide (533px): .035@12ms .153@36 .332@69 .484@94 .632@129 .741@159 .82@195 .884@228 .95@294 .986@411 1@~600.
export const SLIDE_SPRING = { type: 'spring', duration: 0.6, bounce: 0 }
// Playbook tree mask reveal (bundle transition1$6): .063@74 .163@143 .273@208 .385@275 .488@341 .579@407
// .661@476 .784@612 .858@744 .907@850 .955@1042 .979@1242 .991@1441 .999@1974.
export const TREE_SPRING = { type: 'spring', duration: 2, bounce: 0 }
// Compare desktop card crossfade + label row (bundle transition1$9/$11): .023@~45 .166@150 .668@290 .953@400 1@600.
export const COMPARE_FADE = { duration: 0.6, ease: [0.7, 0, 0.3, 1] }
// Compare label opacity (inner Word-Active/Deactive, transition1$12) – undershoots to .399 on fade-out.
export const LABEL_SPRING = { type: 'spring', duration: 0.4, bounce: 0.2 }
// Proof wide-card hover (bundle animation14): scale 1.02.
export const PROOF_HOVER = { type: 'spring', duration: 0.6, bounce: 0 }
// Story card hover (bundle animation$1 on the card "border" layer): scale 1.05 + shadow .2; 1.026@10ms 1.041@55 1.05@116.
export const STORY_HOVER = { type: 'spring', duration: 0.45, bounce: 0.25 }

// Window scroll offset where a Framer scroll target keyframe sits: ref top at (viewport * threshold - 50).
// Verified: tree mask 3057/3391/2469 and line mask 3845/4035/2812 (1440/1000/390), tags 4292/4484/3235.
const targetY = (top, vh, threshold) => top - vh * threshold + 50

function docRect(el) {
  const r = el.getBoundingClientRect()
  return { top: r.top + window.scrollY, height: r.height }
}

// Measures an (untransformed) element's document rect; re-measures on resize and on any body size change.
export function useDocRect(ref) {
  const rect = useRef({ top: 0, height: 0, vh: 900 })
  useLayoutEffect(() => {
    const measure = () => {
      if (!ref.current) return
      rect.current = { ...docRect(ref.current), vh: window.innerHeight }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    if (ref.current) ro.observe(ref.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [ref])
  return rect
}

// Framer "appear on scroll target": `on` once the ref's top reaches viewportHeight + offset (offset -200 =>
// 200px inside the viewport). Replays (goes false when the ref drops back below that line) unless `once`.
// `instant` is true while the state still comes from the initial measurement (apply it without a tween).
export function useScrollTrigger(ref, { offset = 0, once = false, enabled = true } = {}) {
  const [state, setState] = useState({ on: true, instant: true })
  const cur = useRef(state)
  const done = useRef(false)
  const first = useRef(true)
  useLayoutEffect(() => {
    const check = () => {
      const el = ref.current
      if (!el || !enabled) return
      if (once && done.current) return
      if (el.getClientRects().length === 0) return // display:none at this breakpoint
      const on = el.getBoundingClientRect().top <= window.innerHeight + offset
      if (on && once) done.current = true
      const instant = first.current
      first.current = false
      if (on !== cur.current.on || instant !== cur.current.instant) {
        cur.current = { on, instant }
        setState(cur.current)
      }
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [ref, enabled, offset, once])
  return enabled ? state : { on: true, instant: true }
}

// Framer scroll transform with two scroll-target keyframes: 0 when the ref's top is at (vh * threshold - 50),
// 1 when it has scrolled one ref-height further. Linear, unsmoothed (Lenis already smooths native scroll).
export function useScrubProgress(ref, { threshold = 1 } = {}) {
  const { scrollY } = useScroll()
  const rect = useDocRect(ref)
  return useTransform(scrollY, (y) => {
    const { top, height, vh } = rect.current
    if (!height) return 0
    return Math.min(1, Math.max(0, (y - targetY(top, vh, threshold)) / height))
  })
}

// Live timers (Compare variant cycle, Integrations tile loops) start when Framer hydrates the page, not at load or
// when the section scrolls into view: every tile loop has phase 0 at the same instant and the Compare cycle starts
// with it (useOnVariantChange fires on mount; it keeps running offscreen). Hydration time, s after navigation start
// (performance.now()), derived from frame samples on live (fresh contexts, no scroll):
//   compare first switch - 8s: 3.56 3.63 3.98 4.77 3.47 4.37 6.76 @1440, 2.94 3.67 @1000, 2.81 3.55 5.74 @390
//   tile loops t0 (all 8 tiles identical): 4.81 5.38 8.39 @1440 (slower network runs), 3.13 @390
// It varies run to run on live with network speed (2.8–9s); 3.8s is the median, used as the clone's fixed origin.
export const LIVE_HYDRATION_S = 3.8
// Seconds since the live-equivalent timer origin (negative before it).
export const sinceHydration = () => performance.now() / 1000 - LIVE_HYDRATION_S

// Framer loop effect, repeatType "mirror", linear: 0 -> distance over `duration` s and back, from mount.
// `phase` (s) starts the loop part-way so a static snapshot position can be kept as the resting frame.
export function mirrorLoop(t, distance, duration, phase = 0) {
  const u = (t + phase) / duration
  const k = u % 2
  return distance * (k < 1 ? k : 2 - k)
}
