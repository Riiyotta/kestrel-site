// Framer Slideshow (live: Stories + phone Proof) re-implemented on framer-motion. Behaviour read from the live
// component source and checked on the page:
//  - autoplay: setTimeout(interval) restarted on every index change; only while in view (playOffscreen false),
//    not while dragging; hover does NOT pause (effectsHover true). Stories advanced 5037ms / 10040ms after entering.
//  - slide transition: spring { duration .6, bounce 0 } (SLIDE_SPRING).
//  - drag (x, no momentum): on release, |velocity| > 200px/s moves max(1, round(|offset| / item)) slides in the
//    fling direction, otherwise |offset| > item / 2 moves round(|offset| / item) slides; else snaps back.
import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, useInView, useMotionValue } from 'framer-motion'
import { SLIDE_SPRING } from './motion.js'

export function useSlideshow({ step, item, interval = 5, enabled = true, viewRef }) {
  const [index, setIndex] = useState(0) // unbounded
  const raw = useMotionValue(0) // px, = -index * step at rest (unbounded; consumers wrap it)
  const [dragging, setDragging] = useState(false)
  const inView = useInView(viewRef)
  const anim = useRef(null)
  const dragStart = useRef(0)
  const indexRef = useRef(0)
  const stepRef = useRef(step)

  const goTo = useCallback(
    (next) => {
      indexRef.current = next
      setIndex(next)
      anim.current?.stop()
      anim.current = animate(raw, -next * stepRef.current, SLIDE_SPRING)
    },
    [raw],
  )

  // breakpoint change -> re-place without animating
  useEffect(() => {
    stepRef.current = step
    anim.current?.stop()
    raw.jump(-indexRef.current * step)
  }, [step, raw])

  useEffect(() => {
    if (!enabled || !inView || dragging) return
    const id = setTimeout(() => goTo(indexRef.current + 1), interval * 1000)
    return () => clearTimeout(id)
  }, [enabled, inView, dragging, index, interval, goTo])

  const pan = enabled
    ? {
        onPanStart: () => {
          anim.current?.stop()
          dragStart.current = raw.get()
          setDragging(true)
        },
        onPan: (_, info) => raw.set(dragStart.current + info.offset.x),
        onPanEnd: (_, info) => {
          setDragging(false)
          const r = info.offset.x
          const v = info.velocity.x
          const c = Math.round(Math.abs(r) / item)
          const l = c === 0 ? 1 : c
          let d = 0
          if (v > 200) d = -l
          else if (v < -200) d = l
          else if (r < -item / 2) d = c
          else if (r > item / 2) d = -c
          // the drag moved the track by r; the base index is unchanged, so animate from the dragged position
          goTo(indexRef.current + d)
        },
      }
    : {}

  return { index, raw, goTo, pan, dragging }
}

// Wrap an unbounded value into [min, max) (Framer's wrap()).
export const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}
