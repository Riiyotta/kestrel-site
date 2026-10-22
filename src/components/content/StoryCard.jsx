import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PlaceholderLogo from '../PlaceholderLogo.jsx'
import { CIRKA } from '../ui/type.js'
import { STORY_THEME, useStoryHover } from './storyTheme.js'
import './content.css'

// StoryCard – SPEC_PAGES_B T1 card system (+ T2 RelatedStories card). 4 layouts × 4 themes (§1.1).
//   featured  1120×675 row, gap 8, padding 16, radius 16, theme-light bg; text column 472 (8+8 padding,
//             space-between): title Cirka 60/60 −2.4 (50/50 @1280, 40/40 @1000) theme dark, w440 (354 @1000) →
//             16 → PillLinkButton; bottom row name Ginto Bold 20/25 + role 20/26 theme mid (16/25 + 18/23.4 @1280,
//             16/20.8 @1000), logo ≤126×30 right. Image 608×643 radius 6 cover, side alternates. @1000 920×554.
//   wide      1120×320 row gap 16: text panel (theme light, radius 16, padding 16+8; title Cirka 40/40 −1.6,
//             36/36 @1280, 34/34 @1000) + image panel 303×320 radius 16. Lift on both panels.
//   quote     1120×320, 1px theme-dark ring, inner white radius 15 padding 16+8, centred gap 24: quote Cirka 40/40
//             (36/36 <1440) max-w 820 theme dark; name/role 20/25 + 20/26 theme mid. Not a link: no hover.
//   related   T2 Story-Card-Desktop 413×394 (358×358 <1200), padding 24, radius 16, theme light: logo 340×30 → 32 →
//             title Cirka 40/40 (36 @1280, 34 @1000, 30/28 @390) w365 → button at the bottom.
//   Phone (<810): featured + wide collapse to Featured-Mobile (358 wide, column gap 8, padding 16 16 24, image
//   first 326×345 radius 6; text padding 16, gap 32: title Cirka 30/28 −1.2, mobile button 125×42, name Ginto Bold
//   11/11 + role 14/18.2 w204, logo 82×30). Quote-Mobile: inner padding 32, gap 32, quote Cirka 24/24, name Ginto
//   Medium 11/14, role 11/11.
// Hover (whole card is the link): §1.3 button inversion + §1.4 lift, one spring (useStoryHover). Focus = hover.

function Arrow({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// §1.3 PillLinkButton (presentational: the parent card is the link). Desktop 141×50 (2px theme-dark ring, inner
// 137×46 padding 16 24); mobile 125×42 (inner 12 16). Label Ginto Medium 14/14. Colours via .story-btn-inner.
export function PillLinkButton({ theme, label = 'See results', mobileOnly = false }) {
  const th = STORY_THEME[theme]
  return (
    <span className={`inline-flex self-start rounded-hero-tag p-0.5 ${th.ring}`}>
      <span
        className={`story-btn-inner flex items-center gap-1 rounded-hero-tag px-4 py-3 font-sans font-medium text-label ${
          mobileOnly ? '' : 'md:px-6 md:py-4'
        }`}
      >
        {label}
        <Arrow />
      </span>
    </span>
  )
}

function Person({ person, theme, size = 'card' }) {
  const th = STORY_THEME[theme]
  return (
    <div className={`flex min-w-0 flex-col ${th.mid}`}>
      <span className="font-sans font-bold text-name-11-tight md:text-story-name-md xl:text-name-20">{person.name}</span>
      <span className="max-w-[204px] font-sans text-body-14-phone md:max-w-[306px] md:text-body-16-md lg:text-body-18 xl:text-body-20">{person.role}</span>
    </div>
  )
}

const MotionLink = motion(Link)

function Photo({ src, className = '' }) {
  return (
    <div className={`overflow-hidden bg-card-gray ${className}`}>
      {src ? <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" /> : null}
    </div>
  )
}

function FeaturedCard({ story }) {
  const th = STORY_THEME[story.theme]
  const { style, handlers } = useStoryHover()
  const imgRight = story.imageSide !== 'left'
  return (
    <MotionLink
      to={`/customer-stories/${story.slug}`}
      data-story-card="featured"
      style={style}
      {...handlers}
      className={`story-lift ${th.vars} ${th.light} flex w-full flex-col gap-2 rounded-card px-4 pb-6 pt-4 md:h-[554px] md:flex-row md:p-4 xl:h-[675px]`}
    >
      <div className={`flex flex-col p-2 md:w-[386px] md:shrink-0 xl:w-[472px] ${imgRight ? 'md:order-1' : 'md:order-2'} order-2`}>
        <div className="flex h-full flex-col gap-8 p-2 md:justify-between md:gap-0">
          <div className="flex flex-col gap-8 md:gap-4">
            <h3 className={`${CIRKA} max-w-[294px] text-story-phone tracking-display-sub md:max-w-[354px] md:text-h3-md md:tracking-display-sub lg:text-h3-lg lg:tracking-display-sub xl:max-w-[440px] xl:text-h3-xl xl:tracking-display-sub ${th.dark}`}>
              {story.cardTitle}
            </h3>
            <PillLinkButton theme={story.theme} />
          </div>
          <div className="flex items-end justify-between gap-4">
            <Person person={story.person} theme={story.theme} />
            <PlaceholderLogo name={story.logo.name} shape={story.logo.shape} w={82} h={30} className={`${th.fill} md:hidden`} />
            <PlaceholderLogo name={story.logo.name} shape={story.logo.shape} w={126} h={30} className={`${th.fill} hidden md:block`} />
          </div>
        </div>
      </div>
      <Photo src={story.cardImage} className={`order-1 h-[345px] w-full rounded-photo-sm md:h-auto md:flex-1 ${imgRight ? 'md:order-2' : 'md:order-1'}`} />
    </MotionLink>
  )
}

function WideCard({ story }) {
  const th = STORY_THEME[story.theme]
  const { style, handlers } = useStoryHover()
  const imgRight = story.imageSide !== 'left'
  return (
    <MotionLink
      to={`/customer-stories/${story.slug}`}
      data-story-card="wide"
      style={style}
      {...handlers}
      className={`${th.vars} ${th.light} story-lift-phone flex w-full flex-col gap-2 rounded-card px-4 pb-6 pt-4 md:h-[320px] md:flex-row md:gap-4 md:bg-transparent md:p-0`}
    >
      <div className={`order-2 flex min-w-0 flex-1 flex-col rounded-card p-2 story-lift-panel md:p-4 ${th.light} ${imgRight ? 'md:order-1' : 'md:order-2'}`}>
        <div className="flex h-full flex-col gap-8 p-2 md:justify-between md:gap-0">
          <div className="flex flex-col gap-8 md:gap-4">
            <h3 className={`${CIRKA} max-w-[294px] text-story-phone tracking-display-sub md:max-w-[753px] md:text-story-34 md:tracking-display-sub lg:text-compare-lg lg:tracking-display-sub xl:text-h3-md xl:tracking-display-sub ${th.dark}`}>
              {story.cardTitle}
            </h3>
            <PillLinkButton theme={story.theme} />
          </div>
          <div className="flex items-end justify-between gap-4">
            <div className="md:max-w-[438px]">
              <Person person={story.person} theme={story.theme} />
            </div>
            <PlaceholderLogo name={story.logo.name} shape={story.logo.shape} w={82} h={30} className={`${th.fill} md:hidden`} />
            <PlaceholderLogo name={story.logo.name} shape={story.logo.shape} w={126} h={30} className={`${th.fill} hidden md:block`} />
          </div>
        </div>
      </div>
      <Photo
        src={story.cardImage}
        className={`order-1 h-[345px] w-full rounded-photo-sm story-lift-panel md:h-full md:w-[303px] md:shrink-0 md:rounded-card ${imgRight ? 'md:order-2' : 'md:order-1'}`}
      />
    </MotionLink>
  )
}

function QuoteCard({ item }) {
  const th = STORY_THEME[item.theme]
  return (
    <figure data-story-card="quote" className={`w-full rounded-card p-px ${th.ring}`}>
      <div className="flex flex-col items-center justify-center gap-8 rounded-[15px] bg-white p-8 text-center md:h-[318px] md:gap-6 md:p-6">
        <blockquote className={`${CIRKA} max-w-[820px] text-quote-phone tracking-display-sub md:text-compare-lg md:tracking-display-sub xl:text-h3-md xl:tracking-display-sub ${th.dark}`}>
          {item.quote}
        </blockquote>
        <figcaption className={`flex flex-col items-center ${th.mid}`}>
          <span className="font-sans font-medium text-name-11 md:font-bold md:text-name-20">{item.person.name}</span>
          <span className="font-sans text-name-11-tight md:text-body-20">{item.person.role}</span>
        </figcaption>
      </div>
    </figure>
  )
}

export function RelatedStoryCard({ story, className = '' }) {
  const th = STORY_THEME[story.theme]
  const { style, handlers } = useStoryHover()
  return (
    <MotionLink
      to={`/customer-stories/${story.slug}`}
      data-story-card="related"
      style={style}
      {...handlers}
      className={`story-lift ${th.vars} ${th.light} flex h-[358px] w-full max-w-[358px] flex-col justify-between rounded-card p-6 lg:h-[394px] lg:max-w-[413px] ${className}`}
    >
      <div className="flex flex-col gap-8">
        <PlaceholderLogo name={story.logo.name} shape={story.logo.shape} w={126} h={30} className={th.fill} />
        <h3 className={`${CIRKA} max-w-[365px] text-story-phone tracking-display-sub md:text-story-34 md:tracking-display-sub lg:text-compare-lg lg:tracking-display-sub xl:text-h3-md xl:tracking-display-sub ${th.dark}`}>
          {story.cardTitle}
        </h3>
      </div>
      <PillLinkButton theme={story.theme} />
    </MotionLink>
  )
}

export default function StoryCard({ item }) {
  if (item.layout === 'quote') return <QuoteCard item={item} />
  if (item.layout === 'wide') return <WideCard story={item} />
  return <FeaturedCard story={item} />
}
