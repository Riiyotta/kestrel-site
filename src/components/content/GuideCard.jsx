import { Link } from 'react-router-dom'
import { BlogCover } from './BlogCard.jsx'
import { CIRKA } from '../ui/type.js'

// Guide cards – SPEC_PAGES_B T5 / T6. No hover change on any of them (measured).
// GuideCard: column gap 14; image 16:9 radius 16 cover; meta (topic · date) 14/18 #787878 gap 8; title Cirka 30/30
//   −1.2 #000 (clipped, 3 lines max); description Ginto 16/22.4 #6E6E6E (2 lines, clipped); author row avatar 24
//   radius 7 + name 14/18 #787878.
// GuideFeatured: 1280×425 row gap 48, padding 16, #F7F7F7, radius 28, centred; image 699×393 (663×373 @1280)
//   radius 18; body padding 8 24 8 0, gap 16: meta (white "latest guide" pill 14/14 Medium, padding 5 10 · topic ·
//   date 14/18 #787878; 13/18 @1280), title Cirka 40/36 (36/36 <1440), description 16/22.4 #666 (14/19.6 <1200,
//   3-line clamp), foot pt 12: avatar | dark pill 38 tall, padding 12 18, Ginto Medium 14/14 #FFF.
//   <1200: column, image full width 16:9, body padding 8 8 12.
// RelatedGuideCard (T6 Keep reading): column gap 10; image 424×230 radius 4 with a white topic pill top-right
//   (radius 177 → pill, padding 6 12, "Inter Display" 12/12 #666 → Inter); title Cirka 20/26 #000 (26/26 −1.04 on
//   tablet) with a 16×16 striped avatar glyph at the right.

export function Avatar({ author, size = 24, radius = 'rounded-avatar-sm' }) {
  if (author?.avatar) {
    return <img src={author.avatar} alt="" width={size} height={size} className={`shrink-0 object-cover ${radius}`} style={{ width: size, height: size }} />
  }
  // live: generated striped SVG when there is no author photo (decorative)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 overflow-hidden bg-chip-soft text-muted-5 ${radius}`}>
      <path d="M-4 8 8-4M-4 16 16-4M-4 24 24-4M4 28 28 4M12 28 28 12M20 28 28 20" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
    </svg>
  )
}

function Cover({ guide, className = '' }) {
  return (
    <div className={`relative aspect-video overflow-hidden bg-card-gray [container-type:inline-size] ${className}`}>
      <BlogCover cover={guide.cover} title={guide.title} />
    </div>
  )
}

export function GuideCard({ guide }) {
  return (
    <Link to={`/articles/${guide.slug}`} data-guide-card className="flex flex-col gap-3.5">
      <Cover guide={guide} className="rounded-card" />
      <p className="flex gap-2 font-sans text-small text-muted-5">
        <span>{guide.topic}</span>
        <span aria-hidden="true">·</span>
        <time>{guide.date}</time>
      </p>
      <h2 className={`${CIRKA} line-clamp-3 text-quote tracking-display-sub text-ink`}>{guide.title}</h2>
      <p className="line-clamp-2 font-sans text-body-16 text-muted-6">{guide.description}</p>
      <p className="flex items-center gap-2 font-sans text-small text-muted-5">
        <Avatar author={guide.author} />
        {guide.author?.name}
      </p>
    </Link>
  )
}

export function GuideFeatured({ guide, latestLabel, readLabel }) {
  return (
    <Link to={`/articles/${guide.slug}`} data-guide-featured className="flex flex-col gap-4 rounded-icon-tile bg-tag-bg p-4 lg:flex-row lg:items-center lg:gap-12">
      <Cover guide={guide} className="w-full rounded-footer-mark lg:w-[663px] lg:shrink-0 xl:w-[699px]" />
      <div className="flex flex-col gap-4 px-2 pb-3 pt-2 lg:py-2 lg:pl-0 lg:pr-6">
        <p className="flex flex-wrap items-center gap-2 font-sans text-small-13 text-muted-5 xl:text-small">
          <span className="rounded-nav-pill bg-white px-2.5 py-[5px] font-medium text-label text-ink">{latestLabel}</span>
          <span>{guide.topic}</span>
          <span aria-hidden="true">·</span>
          <time>{guide.date}</time>
        </p>
        <h2 className={`${CIRKA} text-compare-lg tracking-display-sub text-ink xl:max-w-[477px] xl:text-compare-xl xl:tracking-display-sub`}>{guide.title}</h2>
        <p className="line-clamp-3 font-sans text-para-14-phone text-muted lg:text-body-16">{guide.description}</p>
        <div className="flex items-center justify-between pt-3">
          <span className="flex items-center gap-2 font-sans text-small text-muted-5">
            <Avatar author={guide.author} />
            {guide.author?.name}
          </span>
          <span className="flex h-[38px] items-center rounded-nav-pill bg-ink-900 px-[18px] py-3 font-sans font-medium text-label text-white">{readLabel}</span>
        </div>
      </div>
    </Link>
  )
}

export function RelatedGuideCard({ guide }) {
  return (
    <Link to={`/articles/${guide.slug}`} data-related-guide className="flex flex-col gap-2.5">
      <div className="relative aspect-[424/230] overflow-hidden rounded-xs bg-card-gray [container-type:inline-size]">
        <BlogCover cover={guide.cover} title={guide.title} />
        <span className="absolute right-3 top-3 rounded-nav-pill bg-white px-3 py-1.5 font-inter text-name-12 text-muted">{guide.topic}</span>
      </div>
      <div className="flex items-start justify-between gap-3">
        <h3 className={`${CIRKA} text-cirka-20 text-ink md:text-quote-md md:tracking-display-sub lg:text-cirka-20 lg:tracking-normal`}>{guide.title}</h3>
        <Avatar author={null} size={16} radius="rounded-xs" />
      </div>
    </Link>
  )
}
