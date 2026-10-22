import { CIRKA, GINTO } from '../ui/type.js'

// FeatureCardGrid – SPEC_PAGES_B T7 "Section 2" difference cards (/competitors).
//   Grid: 3 x 416 @1440 / 3 x 395 @1280 (gap 16 col + row), 2 x 460 @1000, 1 x 370 @390 – i.e. equal columns
//   filling the 1280 container (3 cols >=1200, 2 cols 810–1199, 1 col phone).
//   Card: bg #F7F7F7 (tag-bg), radius 16, padding 16px 24px 16px 16px, column gap 16; 216 tall @1440, 198 @1000
//   (min-height; grid rows stretch to the tallest card); rest shadow 0 3px 30px rgba(0,0,0,0) = none visible.
//   Icon ~35x36 decorative glyph (live: black glyph SVG -> own icons, ink) -> title Cirka 26/26 −1.04 #000 (1 line)
//   -> info Ginto 14/18 #000 (13/14.3 phone).
//   No hover change measured; no motion.

const ICONS = {
  target: (
    <>
      <circle cx="18" cy="18" r="14" />
      <circle cx="18" cy="18" r="8" />
      <circle cx="18" cy="18" r="2.5" fill="currentColor" />
    </>
  ),
  layers: (
    <>
      <path d="M18 5 4 12l14 7 14-7-14-7Z" />
      <path d="m4 18 14 7 14-7" />
      <path d="m4 24 14 7 14-7" />
    </>
  ),
  channels: (
    <>
      <rect x="4" y="7" width="18" height="13" rx="3" />
      <path d="M9 20v5l5-5" />
      <rect x="16" y="15" width="16" height="12" rx="3" />
    </>
  ),
  wrench: <path d="M23.5 5.5a7 7 0 0 0-8.6 9L5.5 23.9a3 3 0 0 0 4.2 4.2l9.4-9.4a7 7 0 0 0 9-8.6l-4.3 4.3-4-1-1-4 4.3-4.3Z" />,
  shield: (
    <>
      <path d="M18 4 6 8.5v8.2c0 7.3 5 12.6 12 15.3 7-2.7 12-8 12-15.3V8.5L18 4Z" />
      <path d="m12.5 18 4 4 7-8" />
    </>
  ),
  globe: (
    <>
      <circle cx="18" cy="18" r="14" />
      <path d="M4 18h28M18 4c4 4 6 8.7 6 14s-2 10-6 14c-4-4-6-8.7-6-14s2-10 6-14Z" />
    </>
  ),
}

function Glyph({ name }) {
  return (
    <svg width="35" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-ink">
      {ICONS[name] || ICONS.target}
    </svg>
  )
}

export default function FeatureCardGrid({ items = [], className = '' }) {
  return (
    <ul data-ui="feature-card-grid" className={`mx-auto grid w-full max-w-container grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {items.map((it) => (
        <li key={it.title} className="flex flex-col gap-4 rounded-card bg-tag-bg py-4 pl-4 pr-6 md:min-h-[198px] xl:min-h-[216px]">
          <Glyph name={it.icon} />
          <h3 className={`${CIRKA} text-faq-card-q tracking-display-sub text-ink`}>{it.title}</h3>
          <p className={`${GINTO} text-small-13-tight text-ink md:text-small`}>{it.body}</p>
        </li>
      ))}
    </ul>
  )
}
