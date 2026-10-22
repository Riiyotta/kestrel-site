import { GINTO } from '../ui/type.js'

// MetaCard – SPEC_PAGES_A T4 sticky side card ("Role").
//   300 wide, padding 28, column gap 28, bg #FBFBFB, radius 16, 1px border (Framer token; fallback #CCCCCC),
//   position sticky top 120. Two label/value pairs (gap 14): label Ginto 14/18 #000, value 14/18 #666; the website
//   value is a link followed (gap 4) by an external-link icon. Then a full-width black pill 244x39: bg #000,
//   radius 349, padding 12, label Inter 600 14/15.4 −0.56 #FFF.
//   Hidden at <=1199 (the page shows "Category: …" under the lede on phone instead).
// Button hover: not measured -> none. No motion.

function ExternalIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M4 1.5H1.5v7h7V6M6 1.5h2.5V4M8.5 1.5 4.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function MetaCard({ website, category, cta = { label: 'Get a demo', href: '/get-a-demo' }, className = '' }) {
  return (
    <aside className={`sticky top-[120px] flex w-[300px] shrink-0 flex-col gap-7 self-start rounded-card border border-preview-border bg-meta-card p-7 ${className}`}>
      <dl className={`flex flex-col gap-3.5 ${GINTO} text-small`}>
        {website ? (
          <div>
            <dt className="text-ink">Website</dt>
            <dd className="m-0">
              <a href={website.href} className="inline-flex items-center gap-1 text-muted" {...(website.href !== "#" ? { target: "_blank", rel: "noreferrer" } : null)}>
                {website.label}
                <ExternalIcon />
              </a>
            </dd>
          </div>
        ) : null}
        <div>
          <dt className="text-ink">Category</dt>
          <dd className="m-0 text-muted">{category}</dd>
        </div>
      </dl>
      <a href={cta.href} className="flex h-[39px] w-full items-center justify-center rounded-pill bg-ink p-3 font-inter text-pill-14 font-semibold text-white">
        {cta.label}
      </a>
    </aside>
  )
}
