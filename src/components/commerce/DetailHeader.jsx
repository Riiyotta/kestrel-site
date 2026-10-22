import { Link } from 'react-router-dom'
import PlaceholderLogo from '../PlaceholderLogo.jsx'
import { BODY_SCALE, GINTO, H3_SCALE } from '../ui/type.js'

// DetailHeader – SPEC_PAGES_A T4 back link + title block.
//   Back link (row gap 10): 32x11 left arrow + "Back" Ginto 16/22.4 #666 (14/19.6 phone) -> /integrations.
//   Title block (column gap 10): row gap 10 of icon tile 52x52 white, radius 12, padding 12.05px 15.07px (28x28
//   logo -> placeholder glyph) + H1 Cirka 60/60 −2.4 (50/50 / 40/40 / 40/36). Lede Ginto 20/26 #666
//   (18/23.4 @1280/1000, 16/20.8 phone). Phone only: "Category: <name>" 13/14.3, label #000 + value #666, gap 4.
//   The icon tile's edge on the PNG is a 1px rgba(0,0,0,.1) ring (sampled; the spec lists no border).
// Back-link hover: not measured -> none. No motion.

export default function DetailHeader({ name, lede, category, logo, backHref = '/integrations' }) {
  return (
    <div className="flex flex-col gap-10">
      <Link to={backHref} className={`flex items-center gap-2.5 self-start ${GINTO} text-para-14-phone text-muted md:text-body-16`}>
        <svg width="32" height="11" viewBox="0 0 32 11" fill="none" aria-hidden="true">
          <path d="M31 5.5H1.5M5.5 1 1 5.5 5.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </Link>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-playbook border border-card-border bg-white px-[15.07px] py-[12.05px]">
            <PlaceholderLogo name={name} shape={logo?.shape} w={28} h={28} mark markScale={0.85} />
          </span>
          <h1 className={`text-ink ${H3_SCALE}`}>{name}</h1>
        </div>
        <p className={`${BODY_SCALE} text-muted`}>{lede}</p>
        {category ? (
          <p className={`flex gap-1 ${GINTO} text-small-13-tight md:hidden`}>
            <span className="text-ink">Category:</span>
            <span className="text-muted">{category}</span>
          </p>
        ) : null}
      </div>
    </div>
  )
}
