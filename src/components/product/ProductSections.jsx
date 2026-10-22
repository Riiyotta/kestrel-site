import { useEffect, useState } from 'react'
import Button from '../Button.jsx'
import BlogCard from '../content/BlogCard.jsx'
import IntegrationOrbit from '../commerce/IntegrationOrbit.jsx'
import { BAND_SCALE, BODY_SCALE } from '../ui/type.js'

// /product bespoke sections – SPEC_PAGES_A T2.3 header, T2.5 OrbitSection and T2.6 BlogGrid.
//
// CarouselHeader (T2.3 /product): column gap 16, H2 Ginto 64/77 −2.56 centred (band scale; 32/38 phone) + sub Ginto
//   20/26 rgba(0,0,0,.75) centred.
// OrbitSection (T2.5): padding 80px 64px, row gap 225, max-w 1200: IntegrationOrbit 474 (commerce, reused) left +
//   text column 501 (column gap 25): H2 Ginto 38/42 −1.52 #333 -> p 20/26 #808080 (max-w 793) -> Button dark lg with
//   arrow. Phone: orbit 338 on top, text centred below. Tablet not measured: stacked like phone with the 474 orbit.
// BlogGrid (T2.6): padding 48px 64px (48px 20px phone), max-w 1200 content, column gap 16: 2px top rule #F0F0F0 ->
//   H2 Ginto 64/77 −2.56 left (32/38 phone) -> 3 columns (378.66 each, gap 32; 1 column phone) of the shared B T3
//   BlogCard (same tokens: image ≈1.9:1 r8, title Ginto 24/24, meta row 16/16 + 4px #17171C dot) -> centred
//   Button light lg ("view all →"). The grid -> button gap is not measured: 16 (the column gap).
// Motion: orbit loop (inside IntegrationOrbit, ±8.04°/s); BlogCard hover zoom (B T3).

export function CarouselHeader({ title, sub }) {
  return (
    <div className="flex flex-col items-center gap-4 px-5 text-center">
      <h2 className={`text-ink ${BAND_SCALE}`}>{title}</h2>
      <p className={`${BODY_SCALE} text-body-75`}>{sub}</p>
    </div>
  )
}

function usePhone() {
  const q = '(max-width: 809.98px)'
  const [phone, setPhone] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setPhone(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return phone
}

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="ml-1.5 inline-block">
      <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function OrbitSection({ data, tiles, hrefFor }) {
  const phone = usePhone()
  return (
    <section data-section="orbit" className="mx-auto flex w-full max-w-[1328px] flex-col items-center gap-12 px-5 py-20 md:px-8 lg:flex-row lg:gap-[225px] lg:px-16">
      <IntegrationOrbit size={phone ? 338 : 474} tiles={tiles} hrefFor={hrefFor} />
      <div className="flex w-full flex-col items-center gap-[25px] text-center lg:w-[501px] lg:items-start lg:text-left">
        <h2 className="font-framer font-sans text-title-38 text-body">{data.title}</h2>
        <p className={`max-w-[793px] ${BODY_SCALE} text-muted-3`}>{data.body}</p>
        <Button variant="dark" href={data.cta.href}>
          {data.cta.label}
          <Arrow />
        </Button>
      </div>
    </section>
  )
}

export function BlogGrid({ title, posts, cta }) {
  return (
    <section data-section="blog-grid" className="mx-auto flex w-full max-w-[1328px] flex-col gap-4 px-5 py-12 lg:px-16">
      <div className="h-0.5 w-full bg-blog-rule" />
      <h2 className={`text-left text-ink ${BAND_SCALE}`}>{title}</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="flex justify-center pt-4">
        <Button variant="light" href={cta.href}>
          {cta.label}
        </Button>
      </div>
    </section>
  )
}
