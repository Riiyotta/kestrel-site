import { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { scrollToId, useActiveSection } from '../../lib/useActiveSection.js'

// StorySideMenu – SPEC_PAGES_B T2 `5 Sections Menu`, desktop only (≥1200; the page hides the column below).
//   Sticky top 112 inside the 296 column. Card padding 32 24, radius 16, bg rgba(255,255,255,.6), blur 6.15,
//   shadow 0 4px 80.2px rgba(0,0,0,.1); column gap 40.
//   Facts (gap 22): label Ginto 14/18 #666 + value Ginto Medium 14/14 #000 (gap 8).
//   "In this article" (fact-label style) → 16 → row gap 8: progress rail + chapter links (column gap 4, rows 21 tall,
//   Ginto Medium 14/18; active #1A1A1A, inactive #808080, instant swap).
//   Progress rail: 2px wide, radius 47, padding 5 top/bottom, gradient #FF29E5 → #FACB12 51.92% → #4348DC, covered by
//   a #F2F2F2 overlay whose translateY grows with scroll: measured 0 → 113px over the body (offset
//   ['start 0.43', 'end 0.57']); the overlay is 65 tall on a 3-chapter rail, so it is fully off after ~57% of that
//   progress. Rebuilt as translateY 0% → 174% of the overlay height (113/65), so it scales with the chapter count.
//   Scroll-linked (not an animation), so it also runs under prefers-reduced-motion. Scroll-spy via
//   useActiveSection (line 160, inside the measured 110–200 window); click → scrollToId through Lenis.

export default function StorySideMenu({ facts, sections, bodyRef }) {
  const ids = useMemo(() => sections.map((s) => s.id), [sections])
  const { activeIndex } = useActiveSection(ids)
  const { scrollYProgress } = useScroll({ target: bodyRef, offset: ['start 0.43', 'end 0.57'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '174%'])
  const rows = [
    ['Company', facts.company],
    ['Industry', facts.industry],
    ['Company size', facts.size],
  ]
  return (
    <div className="sticky top-[112px]" data-ui="story-side-menu">
      <nav
        aria-label="Story"
        className="flex flex-col gap-10 rounded-card bg-side-card px-6 py-8 shadow-side-menu backdrop-blur-side-menu"
      >
        <dl className="flex flex-col gap-[22px]">
          {rows.map(([label, value]) => (
            <div key={label} className={`flex flex-col ${label === 'Industry' ? 'gap-3' : 'gap-2'}`}>
              <dt className="font-sans text-small text-muted">{label}</dt>
              <dd className="font-sans font-medium text-label text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-4">
          <p className="font-sans text-small text-muted">In this article</p>
          <div className="flex gap-2">
            <div className="relative w-0.5 shrink-0 overflow-hidden rounded-[47px]">
              <div className="absolute inset-x-0 inset-y-[5px] rounded-[47px] bg-progress-rail" />
              <motion.div aria-hidden="true" data-rail-overlay className="absolute -left-px top-0 h-full w-1 bg-panel" style={{ y }} />
            </div>
            <ul className="flex flex-col gap-1">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(s.id)}
                    aria-current={i === Math.max(activeIndex, 0) ? 'location' : undefined}
                    className={`flex h-[21px] w-[199px] items-center text-left font-sans font-medium text-small ${
                      i === Math.max(activeIndex, 0) ? 'text-ink-900' : 'text-muted-3'
                    }`}
                  >
                    {s.navLabel}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
