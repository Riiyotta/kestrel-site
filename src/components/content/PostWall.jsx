import { useLayoutEffect, useRef, useState } from 'react'
import './content.css'

// PostWall + SocialPostCard – SPEC_PAGES_B T10.
// PostWall: row gap 20, padding 64 32 32 (phone 64 24 32), max-w 1440; three independent flex columns (posts are
//   pre-assigned via `column`), cards gap 20. 1000: 2 columns – the third list is not rendered (as live).
//   390: one column (lists stacked).
// SocialPostCard: max-w 500, padding 24, bg #F3F4F9, radius 8, 1px #808080, shadow 0 2px 12px rgba(0,0,0,.08).
//   Live uses the system font stack here; per the brief, fallback-font text gets the brand substitute (Inter).
//   Header (mb 16): avatar 38 round + name 18 w600 + headline 14/19.6 (mb 4) | 24×24 network glyph (generic icon).
//   Body (mb 16) 14/21 #000, clamped to ~9 lines (189px) with a "show more" text button (16 w600 #0077B5,
//   margin 8 0) that toggles to "show less" (instant). Optional image radius 8. Footer: age 14px rgba(0,0,0,.6).
//   No hover state.

function GenericIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-muted">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 14 16 8M11 8h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SocialPostCard({ post }) {
  const bodyRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [overflows, setOverflows] = useState(false)
  useLayoutEffect(() => {
    const el = bodyRef.current
    if (!el) return undefined
    const check = () => setOverflows(el.scrollHeight > 190)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [post.body])
  return (
    <article data-social-card className="w-full max-w-[500px] rounded-sm border border-solid border-muted-3 bg-social-bg p-6 shadow-social">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <img src={post.author.avatar} alt="" width="38" height="38" loading="lazy" className="h-[38px] w-[38px] shrink-0 rounded-full object-cover" />
          <div className="min-w-0">
            <a href={post.url} className="block font-sans font-semibold text-social-name text-ink">
              {post.author.name}
            </a>
            <p className="mb-1 font-sans text-para-14-phone text-ink">{post.author.headline}</p>
          </div>
        </div>
        <GenericIcon />
      </header>
      <div className="mb-4">
        <p ref={bodyRef} className={`whitespace-pre-line font-sans text-jobs-14 text-ink ${open ? '' : 'social-clamp'}`}>
          {post.body}
        </p>
        {overflows ? (
          <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="my-2 font-sans text-[16px] font-semibold text-social-link">
            {open ? 'show less' : 'show more'}
          </button>
        ) : null}
      </div>
      {post.image ? <img src={post.image} alt="" loading="lazy" decoding="async" className="mb-4 w-full rounded-sm object-cover" /> : null}
      <p className="font-sans text-small text-social-age">{post.age}</p>
    </article>
  )
}

export default function PostWall({ posts }) {
  const cols = [1, 2, 3].map((c) => posts.filter((p) => p.column === c))
  return (
    <section data-section="post-wall" className="mx-auto flex w-full max-w-page flex-col gap-5 px-6 pb-8 pt-16 md:flex-row md:px-8">
      {cols.map((list, i) => (
        <div key={i} data-post-column={i + 1} className={`flex flex-1 flex-col items-center gap-5 ${i === 2 ? 'md:hidden lg:flex' : ''}`}>
          {list.map((p, j) => (
            <SocialPostCard key={j} post={p} />
          ))}
        </div>
      ))}
    </section>
  )
}
