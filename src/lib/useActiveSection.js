import { useEffect, useState } from 'react'

// Scroll-spy shared by every TOC (HoverToc, TickToc, InlineToc) and anything else that needs "which heading is the
// reader on" (e.g. the B T2 story side menu).
//
// A heading counts as reached once its TOP passes `line` px from the viewport top. SPEC_PAGES_B T2 measured the
// switch at ~110–200px from the top, so the default is 160. Detection is IntersectionObserver-only (no scroll
// listener): the root is the viewport with its top edge pushed down to `line` and its bottom pushed far below the
// fold, so a heading's intersection ratio is 1 while it sits entirely below the line and drops under 1 the moment
// its top crosses it. That also catches Lenis jumps (ratio 1 -> 0 between two frames still fires a callback).
//
// Returns { activeId, activeIndex } – activeIndex is -1 before the first heading is reached.
// Observe headings (or other short anchors), not whole tall sections.
export function useActiveSection(ids, { line = 160 } = {}) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const key = ids.join('|')

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id))
    if (!els.some(Boolean) || typeof IntersectionObserver === 'undefined') return undefined
    const compute = () => {
      let idx = -1
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line + 1) idx = i
      })
      setActiveIndex(idx)
    }
    const io = new IntersectionObserver(compute, {
      rootMargin: `-${line}px 0px 100000px 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    })
    els.forEach((el) => el && io.observe(el))
    compute()
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, line])

  return { activeIndex, activeId: activeIndex >= 0 ? ids[activeIndex] : null }
}

// Smooth-scroll to an element id through Lenis (CLONE_SPEC §3 options) so the TOC click uses the same easing as
// wheel scrolling; falls back to native scrolling when Lenis isn't mounted. `offset` = px left above the target
// (keep it below the scroll-spy `line` so the clicked heading becomes the active one).
export function scrollToId(id, { offset = 120 } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (window.lenis) {
    window.lenis.scrollTo(el, { offset: -offset, immediate: !!reduce })
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
  }
}
