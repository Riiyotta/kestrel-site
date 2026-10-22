import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useActiveSection, scrollToId } from '../../lib/useActiveSection.js'
import { TICK_GROW, TOC_POPOVER } from '../../lib/uiMotion.js'

// Table-of-contents systems from SPEC_PAGES_B. All three take `items: TocItem[]` (src/data/types.js; build them with
// tocFromBlocks() from RichText.jsx), share the IntersectionObserver scroll-spy `useActiveSection`, and scroll to
// the heading through Lenis on click (`scrollToId`, offset 120 – below the spy line of 160).
//
// HoverToc (B T4 blog post, >=1200 only): fixed left 0 / top 50%, padding-left 24, width 250, rows 8 tall, gap 6.
//   Tick 2px tall, radius 999: 12 wide (20 when active). Colours: active = per-item accent (#4B4BF7, #EC4899 –
//   the two accents measured; live cycles brand colours), past #A3A3A3, upcoming #D4D4D4. Labels hidden
//   (opacity 0, translateX(-8px), max-width 0). Hover/focus anywhere on the nav -> expanded: gap 22, width 460,
//   ticks fade out, labels fade/slide in (h3 indented 14px), white gradient backdrop (460 x 100vh, fixed) fades in.
//   All 0.3s cubic-bezier(.65,0,.35,1); label colour .2s; tick opacity .22s. Label 12/16 w500, active #737373,
//   others #A3A3A3 (live renders a fallback serif here – normalised to the Ginto-Medium substitute).
// TickToc (B T6 article, >=1200 only): fixed left 28 / top 50%, 56 wide, one 10px button per h2; tick 2x14 radius
//   999, active #4B4BF7 @.9, others #111 @.22. Hover: ticks grow to section-proportional widths (35–56px, from
//   item.minute deltas) and opacity ~.9–1 (fitted 600ms cubic-bezier(.25,.7,.05,1)); the hovered tick shows a
//   popover at left 76: white, radius 16, padding 14px 16px, 272 wide, layered shadow, opacity 0 / scale .97 /
//   x −6 -> 1 / 1 / 0 (~350ms); content "NN · N min in" 12/16 w500 #7D7D7D, heading 14/19 −0.14 w500 #000,
//   summary 13/19 #6E6E6E (3 lines). Popover vertical placement is not measured: centred on the hovered tick.
// InlineToc (B T6 <1200): <details> 800 wide (350 phone), padding 0 18px, radius 16, inset 1px #E8E8E8 ring;
//   summary 52 tall, Ginto Medium 15/15 #000 + chevron right; list padding 0 0 16px 20px, gap 10, items Ginto
//   15/21 #5A5A5A buttons. Collapsed by default. (Chevron open-state rotation not measured: static.)
// prefers-reduced-motion: no transitions, instant scroll.

const ACCENTS = ['bg-toc-accent', 'bg-toc-accent-2']

export function HoverToc({ items = [], className = '' }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const ids = useMemo(() => items.map((i) => i.id), [items])
  const { activeIndex } = useActiveSection(ids)
  const T = reduce ? 'transition-none' : 'transition-all duration-300 ease-ui'
  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[30] hidden h-screen w-[460px] bg-toc-backdrop lg:block ${T} ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <nav
        aria-label="On this page"
        data-ui="hover-toc"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
        className={`fixed left-0 top-1/2 z-[31] hidden -translate-y-1/2 flex-col pl-6 lg:flex ${T} ${open ? 'w-[460px] gap-[22px]' : 'w-[250px] gap-1.5'} ${className}`}
      >
        {items.map((item, i) => {
          const state = i === activeIndex ? 'active' : i < activeIndex ? 'past' : 'upcoming'
          const tickColour = state === 'active' ? ACCENTS[i % ACCENTS.length] : state === 'past' ? 'bg-toc-past' : 'bg-toc-upcoming'
          return (
            <button
              key={item.id}
              type="button"
              aria-current={state === 'active' ? 'location' : undefined}
              onClick={() => scrollToId(item.id)}
              className="relative block h-2 w-[226px] text-left"
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded-nav-pill ${tickColour} ${
                  reduce ? '' : 'transition-[opacity,width,background-color] duration-[220ms] ease-ui'
                } ${state === 'active' ? 'w-5' : 'w-3'} ${open ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute left-0 top-1/2 block -translate-y-1/2 overflow-hidden whitespace-nowrap font-sans font-medium text-toc-12 ${
                  item.level === 3 ? 'pl-3.5' : ''
                } ${state === 'active' ? 'text-muted-7' : 'text-toc-past'} ${reduce ? '' : 'transition-[opacity,transform,max-width,color] duration-300 ease-ui'} ${
                  open ? 'max-w-[420px] translate-x-0 opacity-100' : 'max-w-0 -translate-x-2 opacity-0'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}

export function TickToc({ items = [], className = '' }) {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(-1)
  const ids = useMemo(() => items.map((i) => i.id), [items])
  const { activeIndex } = useActiveSection(ids)
  // section-proportional tick widths (35–56px) from the minute offsets; equal when not given
  const widths = useMemo(() => {
    const spans = items.map((it, i) => (items[i + 1]?.minute != null && it.minute != null ? items[i + 1].minute - it.minute : null))
    const known = spans.filter((s) => s != null)
    const avg = known.length ? known.reduce((a, b) => a + b, 0) / known.length : 1
    const w = spans.map((s) => (s == null ? avg : s))
    const lo = Math.min(...w)
    const hi = Math.max(...w)
    return w.map((v) => (hi === lo ? 45 : 35 + ((v - lo) / (hi - lo)) * 21))
  }, [items])
  const rail = hover >= 0
  const T = reduce ? { duration: 0 } : TICK_GROW
  return (
    <nav
      aria-label="In this guide"
      data-ui="tick-toc"
      onMouseLeave={() => setHover(-1)}
      className={`fixed left-7 top-1/2 z-[31] hidden w-14 -translate-y-1/2 flex-col lg:flex ${className}`}
    >
      {items.map((item, i) => {
        const active = i === activeIndex
        return (
          <div key={item.id} className="relative" onMouseEnter={() => setHover(i)}>
            <button
              type="button"
              aria-label={item.label}
              aria-current={active ? 'location' : undefined}
              onClick={() => scrollToId(item.id)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(-1)}
              className="flex h-2.5 w-full items-center"
            >
              <motion.span
                aria-hidden="true"
                className={`block h-0.5 rounded-nav-pill ${active ? 'bg-toc-accent' : 'bg-toc-tick'}`}
                initial={false}
                animate={{ width: rail ? widths[i] : 14, opacity: active ? 0.9 : rail ? 0.9 : 0.22 }}
                transition={T}
              />
            </button>
            <AnimatePresence>
              {hover === i ? (
                <motion.div
                  role="tooltip"
                  className="pointer-events-none absolute left-12 top-1/2 w-[272px] origin-left rounded-card bg-white px-4 py-3.5 shadow-toc-pop"
                  style={{ y: '-50%' }}
                  initial={{ opacity: 0, scale: 0.97, x: -6 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.97, x: -6 }}
                  transition={reduce ? { duration: 0 } : TOC_POPOVER}
                >
                  <p className="mb-1 font-sans font-medium text-toc-12 text-toc-meta">
                    {String(i + 1).padStart(2, '0')}
                    {item.minute != null ? ` · ${item.minute} min in` : ''}
                  </p>
                  <p className="font-sans font-medium text-toc-14 text-ink">{item.label}</p>
                  {item.summary ? <p className="mt-1 line-clamp-3 font-sans text-toc-13 text-muted-6">{item.summary}</p> : null}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
}

export function InlineToc({ items = [], title = 'In this guide', className = '' }) {
  return (
    <details data-ui="inline-toc" className={`w-full max-w-[800px] rounded-card px-[18px] shadow-ring-hairline lg:hidden ${className}`}>
      <summary className="flex h-[52px] cursor-pointer list-none items-center justify-between font-sans font-medium text-toc-15 text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <ol className="m-0 flex list-none flex-col gap-2.5 pb-4 pl-5">
        {items.map((item) => (
          <li key={item.id}>
            <button type="button" onClick={() => scrollToId(item.id)} className="text-left font-sans text-toc-15-loose text-toc-item">
              {item.label}
            </button>
          </li>
        ))}
      </ol>
    </details>
  )
}

// Convenience switch: <Toc variant="hover" | "tick" | "inline" items={...} />
export default function Toc({ variant = 'hover', ...props }) {
  if (variant === 'tick') return <TickToc {...props} />
  if (variant === 'inline') return <InlineToc {...props} />
  return <HoverToc {...props} />
}
