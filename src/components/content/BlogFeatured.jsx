import BlogCard from './BlogCard.jsx'

// BlogFeatured – SPEC_PAGES_B T3 `Main`: padding 0 64 40; row gap 70: featured post 802 wide (642 @1280),
// position sticky top 120 while the 440-wide right column (gap 48, 3 BlogCards, image 440×231) scrolls past.
// <1200: stacked – featured full width (not sticky), then the 3 latest as full-width cards (gap 28 tablet, 24 phone).
// Padding below 1200 is not given for this block: the title block's side padding is reused (40 tablet, 24 phone).

export default function BlogFeatured({ featured, latest }) {
  return (
    <section data-section="blog-featured" className="mx-auto w-full max-w-page px-6 pb-10 md:px-10 lg:px-16">
      <div className="flex flex-col gap-7 max-md:gap-6 lg:flex-row lg:items-start lg:gap-[70px]">
        <div data-featured-post className="w-full lg:sticky lg:top-[120px] lg:w-[642px] lg:shrink-0 xl:w-[802px]">
          <BlogCard post={featured} featured />
        </div>
        <div className="flex w-full flex-col gap-7 max-md:gap-6 lg:w-[440px] lg:shrink-0 lg:gap-12">
          {latest.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
