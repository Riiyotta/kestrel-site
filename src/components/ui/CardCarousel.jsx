import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { CAROUSEL_SCROLL, RAIL_SCROLL, animateScrollLeft } from '../../lib/uiMotion.js'
import { CIRKA } from './type.js'
import './ui.css'

// CardCarousel – native horizontal scroller with arrow buttons.
//
// variant "snap" (SPEC_PAGES_A T2.3 channel / principles carousel)
//   ul overflow-x auto, scroll-snap-type x mandatory, items snap-align center, gap 32, right-edge fade mask
//   (#000 0–85% -> transparent 100%). Arrows: absolutely positioned row (padding 18, space-between) vertically
//   centred on the track, 40x40 #000 radius 110 buttons with a white chevron; prev is opacity 0 at the start, next
//   opacity 0 at the end (no hover change). Click = smooth scroll to the next/previous snap point in ~390ms
//   (fitted cubic-bezier(.7,.45,.1,1)). Drag/swipe = native scroll. No autoplay.
//   Default card (`card` "square" 332x332 image on /product, "rectangle" 332x217 on /voice): 332 wide, column gap
//   24; image radius 18 cover; content gap 27.79: title Cirka 40/36 −1.6 #0D0D0D (36/36 <1440) -> subtitle Ginto
//   24/24 −0.96 #000 (14/17 phone) -> 3 bullets, gap 8, Ginto 16/22.4 #000 with a bold lead (14/19.6 phone).
// variant "rail" (SPEC_PAGES_B T3 tinted podcast rail – pass the BlogCard via renderItem)
//   Header row: `title` (Cirka 40/36 −1.6, 36/36 <1440) left + arrows right (gap 8): 40x40 radius 100, transparent,
//   1px rgba(18,18,18,.18) ring, 20x20 #000 chevron; prev hidden at the start. Track gap 32, cards overflow past
//   the right edge, no snap. Next scrolls by one viewport, clamped to the end, ~350ms ease-out (85% @210ms).
// The section shell (padding, bg, heading for "snap") is the template's job.
// Optional `item.art` (ReactNode, added for the product templates) fills the default card's image box when the item
// has no `image.src`; the box is now `relative` so an absolutely positioned illustration can fill it.

function ChevronIcon({ dir = 'next', size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d={dir === 'next' ? 'm8 5 5 5-5 5' : 'm12 5-5 5 5 5'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CarouselCard({ item, card = 'square' }) {
  return (
    <div className="flex w-[332px] flex-col gap-6 overflow-hidden">
      <div className={`relative w-[332px] overflow-hidden rounded-footer-mark bg-gradient-to-br from-tint-lavender via-white to-tint-yellow ${card === 'rectangle' ? 'h-[217px]' : 'h-[332px]'}`}>
        {item.image?.src ? <img src={item.image.src} alt={item.image.alt || ''} loading="lazy" className="h-full w-full object-cover" /> : item.art ?? null}
      </div>
      <div className="flex flex-col gap-[27.79px]">
        <h3 className={`${CIRKA} text-compare-lg tracking-display-sub text-ink-nav xl:text-compare-xl xl:tracking-display-sub`}>{item.title}</h3>
        {item.subtitle ? <p className="font-sans text-sub-14 text-ink md:text-title-24-tight">{item.subtitle}</p> : null}
        {item.bullets?.length ? (
          <ul className="flex flex-col gap-2">
            {item.bullets.map((b, i) => (
              <li key={i} className="font-sans text-para-14-phone text-ink md:text-body-16">
                <strong className="font-bold">{b.lead}</strong> {b.text}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default function CardCarousel({ items = [], variant = 'snap', card = 'square', title, renderItem, label = 'Carousel', className = '', trackClassName = '' }) {
  const trackRef = useRef(null)
  const cancel = useRef(() => {})
  const reduce = useReducedMotion()
  const [edges, setEdges] = useState({ start: true, end: false })

  const readEdges = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdges({ start: el.scrollLeft <= 1, end: el.scrollLeft >= max - 1 })
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return undefined
    readEdges()
    el.addEventListener('scroll', readEdges, { passive: true })
    const ro = new ResizeObserver(readEdges)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', readEdges)
      ro.disconnect()
      cancel.current()
    }
  }, [readEdges])

  const go = (dir) => {
    const el = trackRef.current
    if (!el) return
    cancel.current()
    if (variant === 'rail') {
      cancel.current = animateScrollLeft(el, el.scrollLeft + dir * el.clientWidth, RAIL_SCROLL, reduce)
      return
    }
    // next/previous snap point: the card whose centre is the next one past (or before) the current centre
    const centre = el.scrollLeft + el.clientWidth / 2
    const kids = Array.from(el.children)
    const centres = kids.map((k) => k.offsetLeft + k.offsetWidth / 2)
    const target = dir > 0 ? centres.find((c) => c > centre + 2) : [...centres].reverse().find((c) => c < centre - 2)
    if (target == null) return
    cancel.current = animateScrollLeft(el, target - el.clientWidth / 2, CAROUSEL_SCROLL, reduce)
  }

  const items_ = items.map((item, i) => (
    <li key={i} className={`shrink-0 ${variant === 'snap' ? 'snap-center' : ''}`}>
      {renderItem ? renderItem(item, i) : <CarouselCard item={item} card={card} />}
    </li>
  ))

  if (variant === 'rail') {
    return (
      <div data-ui="card-carousel" data-variant="rail" className={`flex flex-col gap-5 md:gap-6 ${className}`}>
        <div className="flex items-center justify-between gap-4">
          {title ? <h2 className={`${CIRKA} text-compare-lg tracking-display-sub text-ink xl:text-compare-xl xl:tracking-display-sub`}>{title}</h2> : <span />}
          <div className="flex gap-2">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                type="button"
                aria-label={dir < 0 ? 'Previous' : 'Next'}
                onClick={() => go(dir)}
                className={`flex h-10 w-10 items-center justify-center rounded-announce text-ink shadow-[inset_0_0_0_1px_theme(colors.arrow-ring)] ${
                  (dir < 0 && edges.start) || (dir > 0 && edges.end) ? 'invisible' : ''
                }`}
              >
                <ChevronIcon dir={dir < 0 ? 'prev' : 'next'} />
              </button>
            ))}
          </div>
        </div>
        <ul ref={trackRef} aria-label={label} className={`ui-noscrollbar relative m-0 flex list-none gap-8 overflow-x-auto p-0 ${trackClassName}`}>
          {items_}
        </ul>
      </div>
    )
  }

  return (
    <div data-ui="card-carousel" data-variant="snap" className={`relative ${className}`}>
      <ul
        ref={trackRef}
        aria-label={label}
        className={`ui-noscrollbar mask-carousel relative m-0 flex list-none snap-x snap-mandatory gap-8 overflow-x-auto p-0 ${trackClassName}`}
      >
        {items_}
      </ul>
      {/* fieldset: padding 18, space-between, vertically centred on the track */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between p-[18px]">
        {[-1, 1].map((dir) => {
          const hidden = (dir < 0 && edges.start) || (dir > 0 && edges.end)
          return (
            <button
              key={dir}
              type="button"
              aria-label={dir < 0 ? 'Previous' : 'Next'}
              tabIndex={hidden ? -1 : 0}
              onClick={() => go(dir)}
              className={`flex h-10 w-10 items-center justify-center rounded-[110px] bg-ink text-white ${hidden ? 'opacity-0' : 'pointer-events-auto opacity-100'}`}
            >
              <ChevronIcon dir={dir < 0 ? 'prev' : 'next'} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
