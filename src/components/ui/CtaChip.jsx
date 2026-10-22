import { useEffect, useState } from 'react'

// CtaChip – SPEC_PAGES_B T6 `.lae-chip` (article pages; replaces the VideoTeaser there).
//   position fixed, bottom 24, left 50% (translateX −50%), 486x38, bg #FFF, radius 999, padding 0 14px 0 4px, gap 10,
//   shadow 0 0 0 1px #E2E2E2 + 0 10px 24px −12px rgba(0,0,0,.2).
//   Content: dark tag pill (30 tall, bg #111, radius 999, padding 0 12px, Ginto Medium 12/12 #FFF, ≈4 chars) +
//   label Ginto 14/14 #1E1E1E (≈42 chars) + 14px arrow, 1x18 #E2E2E2 separator, trailing link Ginto 500 14/14 #111.
//   Visibility: hidden (opacity 0, translateY 14px, pointer-events none) while scrollY < `showAfter` (300) and again
//   once the footer reaches the viewport top (live hid it at ≈7600 on a 9287 page = the footer top); shown
//   otherwise. transition opacity .4s, transform .4s cubic-bezier(.65,0,.35,1).
//   Phone layout not measured: the chip is capped at 100vw − 32 and the label truncates.

export default function CtaChip({ tag = 'Demo', label, href = '#', trailing, trailingHref = '#', showAfter = 300, hideAtSelector = 'footer', className = '' }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const check = () => {
      const footer = hideAtSelector ? document.querySelector(hideAtSelector) : null
      const pastFooter = footer ? footer.getBoundingClientRect().top <= 0 : false
      setShown(window.scrollY >= showAfter && !pastFooter)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [showAfter, hideAtSelector])

  return (
    <div
      data-ui="cta-chip"
      data-shown={shown}
      className={`fixed bottom-6 left-1/2 z-[32] flex h-[38px] max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-2.5 rounded-nav-pill bg-white pl-1 pr-3.5 shadow-cta-chip transition-[opacity,transform] duration-[400ms] ease-ui motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[14px] opacity-0'
      } ${className}`}
    >
      <a href={href} className="flex min-w-0 items-center gap-2.5">
        <span className="flex h-[30px] shrink-0 items-center rounded-nav-pill bg-toc-tick px-3 font-sans font-medium text-name-12 text-white">{tag}</span>
        <span className="truncate font-sans text-label text-cta-chip-label">{label}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-cta-chip-label">
          <path d="M1.5 7h11M8 2.5 12.5 7 8 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {trailing ? (
        <>
          <span aria-hidden="true" className="h-[18px] w-px shrink-0 bg-cta-chip-rule" />
          <a href={trailingHref} className="shrink-0 whitespace-nowrap font-sans font-medium text-label text-toc-tick">
            {trailing}
          </a>
        </>
      ) : null}
    </div>
  )
}
