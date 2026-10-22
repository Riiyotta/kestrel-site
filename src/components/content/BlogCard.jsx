import { Link } from 'react-router-dom'
import { KestrelMark } from '../Logo.jsx'

// BlogCard – SPEC_PAGES_B T3 `Variant 1` (also T4 related posts).
//   Column gap 24, whole card is a link. Image box radius 8, overflow clip, aspect ≈1.905, cover. Title Ginto 24/24
//   −0.96 #000. Meta row padding-top 24, gap 8: date 16/16 −0.32 · 4×4 #17171C dot · "N Mins".
//   size "featured": image → title gap 36, title Ginto 44/48 −1.76 (32/36 @1280, 24/26 <1200), meta gap 14,
//   meta 14/14 −0.28 @1280.
//   Hover: image scale 1 → 1.07, .5s cubic-bezier(.22,1,.36,1) (`ease-zoom`); nothing else. Focus-visible = hover.
//   prefers-reduced-motion: no zoom transition.
// Covers are generated gradient placeholders (spec Z2: brand cover art → generated gradient covers).

const TONES = {
  indigo: 'from-tint-lavender via-white to-tint-pink',
  magenta: 'from-tint-pink via-tint-yellow to-white',
  sun: 'from-tint-yellow via-white to-tint-green',
  mint: 'from-tint-green via-white to-tint-lavender',
  lavender: 'from-tint-lavender via-tint-pink to-tint-yellow',
  peach: 'from-tint-peach via-white to-tint-lavender',
}

export function BlogCover({ cover = {}, title, className = '' }) {
  if (cover.src) return <img src={cover.src} alt="" loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full object-cover ${className}`} />
  return (
    <div aria-hidden="true" className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-br p-[6%] ${TONES[cover.tone] || TONES.indigo} ${className}`}>
      <KestrelMark className="h-[14%] w-auto" />
      {title ? <span className="line-clamp-2 max-w-[70%] font-display text-[clamp(12px,2.6cqw,28px)] leading-[1.05] text-ink">{title}</span> : null}
    </div>
  )
}

function Meta({ post, featured }) {
  return (
    <div
      className={`flex items-center pt-6 font-sans text-ink ${featured ? 'gap-3.5 text-blog-meta lg:text-blog-meta-sm xl:text-blog-meta' : 'gap-2 text-blog-meta'}`}
    >
      <span>{post.date}</span>
      <span aria-hidden="true" className="h-1 w-1 rounded-pill bg-meta-dot" />
      <span>{post.readingMinutes} Mins</span>
    </div>
  )
}

export default function BlogCard({ post, featured = false, className = '' }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      data-blog-card={featured ? 'featured' : 'card'}
      className={`group flex w-full flex-col ${featured ? 'gap-6 md:gap-9' : 'gap-6'} ${className}`}
    >
      <div className="relative aspect-[1.905] w-full overflow-clip rounded-sm bg-card-gray [container-type:inline-size]">
        <div data-zoom className="absolute inset-0 transition-transform duration-500 ease-zoom group-hover:scale-[1.07] group-focus-visible:scale-[1.07] motion-reduce:transition-none">
          <BlogCover cover={post.cover} title={post.title} />
        </div>
      </div>
      <div className="flex flex-col">
        {featured ? (
          <h2 className="font-sans text-blog-feature-sm text-ink lg:text-blog-feature-lg xl:text-blog-feature-xl">{post.title}</h2>
        ) : (
          <h3 className="font-sans text-title-24-tight text-ink">{post.title}</h3>
        )}
        <Meta post={post} featured={featured} />
      </div>
    </Link>
  )
}
