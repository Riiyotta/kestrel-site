import { useSearchParams } from 'react-router-dom'
import FilterChips from '../../components/ui/FilterChips.jsx'
import CardCarousel from '../../components/ui/CardCarousel.jsx'
import { BODY_SCALE, CIRKA, H2_SCALE } from '../../components/ui/type.js'
import BlogCard from '../../components/content/BlogCard.jsx'
import BlogFeatured from '../../components/content/BlogFeatured.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { BLOG_CATEGORIES, BLOG_INDEX, blogPosts } from '../../data/blog.js'

// T3 BlogIndex – SPEC_PAGES_B T3.
// IndexTitle: padding 160 64 36 (1000: 136 40 32; 390: 120 24 32), max-w 1440, gap 24, left: H1 Cirka 75/72
//   (58 / 48 / 40) + lede 20/26 rgba(0,0,0,.75) (18/23.4, 16/20.8).
// BlogFeatured (sticky featured + 3 latest) → CardRail (CardCarousel "rail", bg rgba(66,71,219,.04), padding 80 64 /
//   72 40 / 64 24, cards 360 wide, gap 32; the track runs to the right viewport edge as on live) → Browse all
//   (padding 80 64, gap 24; H2 Cirka 40/36; FilterChips "tabs" synced to ?selected-category=; grid 3 × (416 / 363),
//   2 cols @1000, 1 @390, gap 56 32, align start; every card rendered, no pagination – as live).
// Browse-all and rail side padding below 1200 for the browse block isn't measured: 40 tablet / 16 phone (358 cards).

export default function BlogIndex() {
  useDocumentTitle('Blog | Kestrel')
  const [params, setParams] = useSearchParams()
  const cat = params.get('selected-category') || 'all'
  const featured = blogPosts.find((p) => p.featured) || blogPosts[0]
  const latest = blogPosts.filter((p) => p !== featured && p.category !== 'podcast').slice(0, 3)
  const podcasts = blogPosts.filter((p) => p.category === 'podcast')
  const grid = cat === 'all' ? blogPosts : blogPosts.filter((p) => p.category === cat)
  const setCat = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('selected-category')
    else next.set('selected-category', id)
    setParams(next, { replace: true, preventScrollReset: true })
  }
  return (
    <div data-page="blog-index">
      <header className="mx-auto flex w-full max-w-page flex-col gap-6 px-6 pb-8 pt-[120px] md:px-10 md:pt-[136px] lg:px-16 lg:pb-9 lg:pt-[160px]">
        <h1 className={`text-ink ${H2_SCALE}`}>{BLOG_INDEX.title}</h1>
        <p className={`text-body-75 ${BODY_SCALE}`}>{BLOG_INDEX.lede}</p>
      </header>
      <BlogFeatured featured={featured} latest={latest} />
      <section data-section="blog-rail" className="overflow-hidden bg-rail-tint px-6 py-16 md:px-10 md:py-[72px] lg:px-16 lg:py-20">
        <CardCarousel
          variant="rail"
          title={BLOG_INDEX.railTitle}
          label="Podcast episodes"
          items={podcasts}
          className="mx-auto max-w-[1312px]"
          trackClassName="-mr-6 pr-6 md:-mr-10 md:pr-10 lg:-mr-16 lg:pr-16"
          renderItem={(p) => (
            <div className="w-[360px] max-md:w-[300px]">
              <BlogCard post={p} />
            </div>
          )}
        />
      </section>
      <section data-section="blog-browse" className="mx-auto flex w-full max-w-page flex-col gap-6 px-4 py-20 md:px-10 lg:px-16">
        <h2 className={`${CIRKA} text-compare-lg tracking-display-sub text-ink xl:text-compare-xl xl:tracking-display-sub`}>{BLOG_INDEX.browseTitle}</h2>
        <FilterChips variant="tabs" label="Blog categories" items={BLOG_CATEGORIES} value={cat} onChange={setCat} />
        <div data-blog-grid className="grid grid-cols-1 items-start gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {grid.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
