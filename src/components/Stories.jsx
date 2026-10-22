import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useTransform } from 'framer-motion'
import PlaceholderLogo from './PlaceholderLogo.jsx'
import { PILL_HOVER, STORY_HOVER, useReducedMotion, useViewport } from '../lib/motion.js'
import EmployeeCard from './ui/EmployeeCard.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { CIRKA } from './ui/type.js'
import { useSlideshow, wrap } from '../lib/useSlideshow.js'

// Motion (live Framer Slideshow props + frame samples @1440):
//   stories-track  autoplay every 5.0s while in view (advanced at 5037 / 10040ms), hover does not pause, drag on
//                  (see src/lib/useSlideshow.js); slide = spring { duration .6, bounce 0 }; infinite via 4 copies.
//   story-slide    scale/origin follow the track continuously (Framer effectsScale .9): with o = slide offset from the
//                  slot, scale = interp(o, [-item, 0, gap, item], [.9, 1, 1, .9]), originX = interp(.., [1, 1, 0, 0]).
//   stories-dot    opacity 1 / .2, tween { duration .3 }; click jumps to that story.
//   story card     md+ hover on the card's border layer: scale 1.05 + shadow 0 3px 30px rgba(0,0,0,.2),
//                  spring { duration .45, bounce .25 } (none on the phone card variant).

// STORIES CAROUSEL – CLONE_SPEC §13 (1440; §15: same 501x695 card, H2 58/58), §16 (phone 294x470 card).
// 810–1199 (live Tablet) = desktop carousel with a 48/50 H2. Static settled state: first story active (dot 1).
// Motion hooks for the animation pass:
//   [data-motion="stories-track"]   auto-advance every 5.0s, slide by data-step-px (533 md+ = 501 + 32 gap;
//                                   phone 314 = 294 + 20 gap, live), ease [0.16,1,0.3,1] .6s.
//                                   24 slides = 6 stories x 4 copies; data-active-index starts at 6 (copy 2, story 1)
//                                   – loop by resetting instantly across copies. CSS var --active drives the offset.
//   [data-motion="story-slide"]     active scale 1, others .9 (transform-origin toward the active slide), animates
//                                   with the slide. data-story = story index 0–5.
//   [data-motion="stories-dot"]     6 dots, active opacity 1 / inactive .2.

const H2 = 'Field notes from our teams.'

const STORIES = [
  {
    quote:
      '“When Kestrel hands a case to one of our people, the groundwork is already done, so they can act straight away and close it far faster than before.”',
    name: 'Marcus Oyelaran',
    role: 'Head of Customer Care',
    logo: ['Harbourline', 'bars'],
    photo: 'from-tint-green via-card-gray to-tint-lavender',
    img: '/assets/photos/story-1.webp',
  },
  {
    quote:
      '“We want to bring Kestrel into more of our queues, like email and phone, so our own team can spend its time on the genuinely complicated cases.”',
    name: 'Priya Raman',
    role: 'Customer Experience AI Lead',
    logo: ['Quillfin', 'diamond'],
    photo: 'from-tint-yellow via-card-gray to-tint-pink',
    img: '/assets/photos/story-2.webp',
  },
  {
    quote:
      '“Support is a growth lever for us now. Kestrel lets us scale the service we offer without ever losing the personal touch our customers expect.”',
    name: 'Hannah Lindgren',
    role: 'Head of Support Operations',
    logo: ['Fernlo', 'circle'],
    photo: 'from-tint-pink via-card-gray to-tint-yellow',
    img: '/assets/photos/story-3.webp',
    imgPos: 'object-[30%_50%] md:object-center',
  },
  {
    quote:
      '“Kestrel took on our messiest billing questions from day one. The backlog dropped within a month and the team finally had room to breathe again.”',
    name: 'Diego Morales',
    role: 'VP of Customer Success',
    logo: ['Corvane', 'plus'],
    photo: 'from-tint-lavender via-card-gray to-tint-green',
    img: '/assets/photos/story-4.webp',
  },
  {
    quote:
      '“Our risk team signed off quickly because every action Kestrel takes is logged and explainable. That made the rollout far smoother than we expected.”',
    name: 'Aisha Bello',
    role: 'Director of Member Services',
    logo: ['Tidewell', 'ring'],
    photo: 'from-card-gray via-tint-yellow to-tint-green',
    img: '/assets/photos/story-5.webp',
    imgPos: 'object-[35%_50%] md:object-center',
  },
  {
    quote:
      '“Customers get real answers at two in the morning now, not a promise that someone will call back. That shift alone changed how people talk about us.”',
    name: 'Sam Whitaker',
    role: 'Support Operations Manager',
    logo: ['Mossgate', 'square'],
    photo: 'from-tint-pink via-card-gray to-tint-lavender',
    img: '/assets/photos/story-6.webp',
  },
]

const COPIES = 4
const ACTIVE = 6 // index into the 24-slide track (copy 2, story 0)

function StoryCard({ story, hover }) {
  // border layer radius 20 (shadow 0 3px 30px rgba(0,0,0,0)) > white card radius 20, 1px #E5E5E5, padding 24 (phone 16).
  // (Spec also lists an inner "Desktop-Card" radius 16 – visually covered by the white card, not rendered separately.)
  return (
    <motion.div
      className="h-full rounded-glass shadow-card-rest"
      whileHover={hover ? { scale: 1.05, boxShadow: '0px 3px 30px 0px rgba(0, 0, 0, 0.2)' } : undefined}
      transition={STORY_HOVER}
    >
      {/* 1px #E5E5E5 border = Framer ::after overlay on the white card (no layout space) */}
      <div className="relative flex h-full flex-col gap-4 rounded-glass bg-white p-4 md:gap-6 md:p-6">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-glass border border-card-gray" />
        {/* photo 453x343 (phone 262x230), radius 8 – stock photo (Pexels) over the tint gradient loading backdrop;
            alt="" – decorative next to the visible name/role */}
        <div className={`h-[230px] w-full shrink-0 overflow-hidden rounded-sm bg-gradient-to-br md:h-[343px] ${story.photo}`} aria-hidden="true">
          <img
            src={story.img}
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
            className={`block h-full w-full object-cover ${story.imgPos ?? ''}`}
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <p className="font-sans text-story-13 text-ink md:text-body-20 md:text-body">{story.quote}</p>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-sans font-medium text-name-12 text-ink-900 md:text-name-20">{story.name}</p>
              <p className="font-sans text-role-12 text-ink-900 md:text-body-20">{story.role}</p>
            </div>
            <span className="md:hidden">
              <PlaceholderLogo name={story.logo[0]} shape={story.logo[1]} w={78} h={20} />
            </span>
            <span className="hidden md:block">
              <PlaceholderLogo name={story.logo[0]} shape={story.logo[1]} w={109} h={28} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Slide({ i, raw, geo, hover }) {
  // o = this slide's offset from the visible slot (px, + = right of it); Framer slideshow effect keyframes
  const o = useTransform(raw, (v) => i * geo.step + geo.wrap(v))
  const scale = useTransform(o, [-geo.item, 0, geo.gap, geo.item], [0.9, 1, 1, 0.9])
  const originX = useTransform(o, [-geo.item, 0, geo.gap, geo.item], [1, 1, 0, 0])
  const offset = i - ACTIVE
  return (
    <motion.div
      data-motion="story-slide"
      data-story={i % STORIES.length}
      aria-hidden={offset !== 0 || undefined}
      className="h-[470px] w-[294px] shrink-0 md:h-[695px] md:w-[501px]"
      style={{ scale, originX }}
    >
      <StoryCard story={STORIES[i % STORIES.length]} hover={hover} />
    </motion.div>
  )
}

function HomeStories() {
  const slides = Array.from({ length: STORIES.length * COPIES }, (_, i) => i)
  const reduce = useReducedMotion()
  const { w } = useViewport()
  const phone = w < 810
  const N = STORIES.length
  const step = phone ? 314 : 533
  const item = phone ? 294 : 501
  const total = N * step
  const viewRef = useRef(null)
  // live Slideshow keeps autoplaying under prefers-reduced-motion: reduce (measured on the Proof phone slideshow,
  // same Framer component)
  const { index, raw, goTo, pan } = useSlideshow({ step, item, viewRef })
  // keep the centred slide within copies (N/2, 3N/2] + ACTIVE offset; raw 0 -> slide ACTIVE (copy 2, story 1)
  const geo = { step, item, gap: step - item, wrap: (v) => wrap(-1.5 * total, -0.5 * total, v) + total - ACTIVE * step }
  const x = useTransform(raw, (v) => -item / 2 + geo.wrap(v))
  const activeStory = ((index % N) + N) % N

  return (
    <section data-section="stories" className="relative mx-auto w-full max-w-page overflow-x-clip pb-20">
      {/* Colored-Blob-BG, decorative PNG (group (a)). Live: 1105x691 at y 42 (phone), 1437x898 at y 121 (md),
          126 (lg), 133 (xl); always horizontally centred. */}
      <img
        src="/assets/decor/stories-blobs.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[calc(50%-552.5px)] top-[42px] h-[691px] w-[1105px] max-w-none object-cover md:left-[calc(50%-718.5px)] md:top-[121px] md:h-[898px] md:w-[1437px] lg:top-[126px] xl:top-[133px]"
      />

      {/* carousel-mask: padding 80 (phone 56px 0 112px), gap 64 (phone 32), horizontal edge mask */}
      <div className="mask-stories relative flex flex-col items-center gap-8 pb-28 pt-14 md:gap-16 md:p-20">
        <h2 className="font-framer text-center font-display text-h2-phone tracking-display-sub text-ink md:text-h2-md md:tracking-display-sub lg:text-h2-lg lg:tracking-display-sub xl:text-h2-xl xl:tracking-display-sub">
          {H2}
        </h2>

        {/* Slideshow: visible slot 501 (phone 294) centred, track gap 32. */}
        <motion.div ref={viewRef} className="relative h-[470px] w-full touch-pan-y md:h-[695px]" {...pan}>
          <motion.div
            data-motion="stories-track"
            data-active-index={ACTIVE + activeStory}
            data-step-px="533"
            data-step-px-phone="314"
            className="absolute left-1/2 top-0 flex h-full items-center gap-5 md:gap-8"
            style={{ x }}
          >
            {slides.map((i) => (
              <Slide key={i} i={i} raw={raw} geo={geo} hover={!phone && !reduce} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Pagination: 6 dots 12px #FF29E5 (inactive .2), padding 12px 6px (first 12 6 12 12, last 12 12 12 6), pill bg
          rgba(229,229,229,.4). Live: 41px below the slideshow at every width (= 115px / 83px above the section bottom);
          rendered outside the masked wrapper so the edge mask cannot clip it. */}
      <div
        className="absolute bottom-[115px] left-1/2 flex -translate-x-1/2 rounded-pill bg-pager-bg md:bottom-[83px]"
        role="tablist"
        aria-label="Customer stories"
      >
        {STORIES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeStory}
            aria-label={`Story ${i + 1}`}
            onClick={() => goTo(index + (i - activeStory))}
            className={`py-3 ${i === 0 ? 'pl-3 pr-1.5' : i === STORIES.length - 1 ? 'pl-1.5 pr-3' : 'px-1.5'}`}
          >
            <motion.span
              data-motion="stories-dot"
              className="block h-3 w-3 rounded-full bg-brand-magenta"
              initial={false}
              animate={{ opacity: i === activeStory ? 1 : 0.2 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>
    </section>
  )
}

/* =====================================================================================================
   Page-template variants (COMPONENTS.md "Homepage component variants"). `card="home"` (default) renders the
   homepage section above, untouched. Every other card runs through VariantSlideshow below: the same Framer
   Slideshow mechanics as the homepage (useSlideshow: 5s autoplay while in view, spring .6/0, drag; 4 copies;
   inactive scale + originX keyed to the slide offset exactly like Slide above; dots #FF29E5, inactive .2, tween .3).
   ===================================================================================================== */

// Motion hooks (variants): [data-motion="stories-track"], [data-motion="story-slide"], [data-motion="stories-dot"]
// as on the homepage (the section carries data-variant), plus [data-motion="story-pill-arrow"] (wide card button
// arrow: hover 13 -> 18px + rotate −45°, announcement-pill spring).

// T1.6 tints (SPEC_PAGES_A): panel bg / quote + button colour.
const WIDE_TINTS = {
  pink: { bg: 'bg-tint-pink', text: 'text-tag-text-pink', ring: 'bg-tag-text-pink' }, // #FEEAFC / #400B39
  peach: { bg: 'bg-tint-peach', text: 'text-tag-text-red', ring: 'bg-tag-text-red' }, // #FCEDE8 / #3B1208
}
// B T8 / A /product split-card panel tints (per card).
const SPLIT_TINTS = {
  peach: 'bg-story-tint-peach', // #FDECE8
  pink: 'bg-story-tint-pink', // #FFEBFD
  green: 'bg-tint-green', // #E7F4E8
}

// Kestrel placeholder content (pages pass their own `items`).
const SAMPLE_WIDE = STORIES.slice(0, 4).map((st) => ({
  quote: st.quote,
  name: st.name,
  role: st.role,
  logo: { name: st.logo[0], shape: st.logo[1], w: 120, h: 28 },
  img: st.img,
  photo: st.photo,
  href: '/customer-stories',
}))
const SAMPLE_SPLIT = [
  { ...SAMPLE_WIDE[0], quote: '“We trialled three vendors side by side on answer quality, depth of setup and cost. Kestrel won on every one.”', tint: 'peach' },
  { ...SAMPLE_WIDE[1], quote: '“Kestrel keeps getting sharper, and it lets a small team give the kind of support our members expect.”', tint: 'green' },
  { ...SAMPLE_WIDE[2], quote: '“Setup took days, not months, and our queue has stayed calm ever since.”', tint: 'pink' },
]
const SAMPLE_EMPLOYEES = Array.from({ length: 8 }, (_, i) => ({
  quote: 'I joined to work on hard problems with kind people, and both have held up. Every week I ship something a customer notices.',
  name: ['Ines Varga', 'Tomás Reyes', 'Mei Takahashi', 'Ola Nordin', 'Ravi Menon', 'Chloe Dubois', 'Kofi Asante', 'Lena Hartmann'][i],
  role: ['Product Engineer', 'Design Lead', 'Solutions Engineer', 'Customer Lead', 'ML Engineer', 'Recruiter', 'Account Executive', 'Ops Manager'][i],
  photo: { src: `/assets/photos/story-${(i % 6) + 1}.webp` },
  tint: ['pink', 'cream', 'peach', 'grey', 'lavender'][i % 5],
}))

// Per-card slideshow defaults (all overridable through props).
//   wide        A T1.6: slot 956x393, gap 48 (step 1004), scale .9, pager pill 70 below; <1200 one static card.
//   split /     B T8 (+ A /product, the same Framer card – see report): slot 956, gap 32 (pitch 988), scale .9,
//   testimonial pager pill 70 below. <1200 "Mobile-Slideshow": 315x603 column card. Its gap (20), pager offset (42)
//               and pager fill (#F4F4F4) are read off recon/pages/competitor-detail/390-comp-zendesk.png (approx.;
//               the specs give geometry only).
//   employee    C careers phone carousel: EmployeeCard vertical 294 wide, gap 12 (pitch 306), scale .9, 8 dots
//               12 below (in flow: section height on live not measured), 5s. One geometry at every width (the template shows it below 810 only).
const PRESETS = {
  wide: { item: 956, gap: 48, scale: 0.9, pager: 'pill', pagerGap: 70, pagerOverlay: true, below1200: 'static' },
  split: { item: 956, gap: 32, scale: 0.9, pager: 'pill', pagerGap: 70, pagerOverlay: true, below1200: 'slider', mobileItem: 315, mobileGap: 20, mobilePager: 'soft', mobilePagerGap: 42 },
  employee: { item: 294, gap: 12, scale: 0.9, pager: 'pill', pagerGap: 12, pagerOverlay: false, below1200: 'same' },
}
PRESETS.testimonial = PRESETS.split
const PAGER_BG = { pill: 'bg-pager-bg', soft: 'bg-chip-soft' }

function PillArrow() {
  // 13x13 arrow (live: CSS mask of an SVG arrow, filled tint-dark)
  return (
    <svg viewBox="0 0 15 14" fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M1 7h12.5M8 1.5 13.5 7 8 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// A T1.6 "See customer story": outer 195x50, padding 2, radius 50, bg tint-dark; inner 191x46, padding 16px 24px,
// radius 50, bg tint; label Ginto Medium 14/14 tint-dark, gap 4, arrow 13x13. Hover: arrow 13 -> 18 + rotate −45°.
function StoryPill({ tint, href = '/customer-stories', label = 'See customer story' }) {
  const reduce = useReducedMotion()
  return (
    <motion.span className="inline-flex" initial="rest" animate="rest" whileHover={reduce ? undefined : 'hover'}>
      <Link to={href} className={`inline-flex h-[50px] rounded-hero-tag p-0.5 ${tint.ring}`}>
        <span className={`flex h-[46px] items-center gap-1 rounded-hero-tag px-6 font-sans font-medium text-label ${tint.bg} ${tint.text}`}>
          <span className="whitespace-nowrap">{label}</span>
          <motion.span
            data-motion="story-pill-arrow"
            className="flex shrink-0"
            style={{ width: 13, height: 13 }}
            variants={{ rest: { width: 13, height: 13, rotate: 0, transition: PILL_HOVER }, hover: { width: 18, height: 18, rotate: -45, transition: PILL_HOVER } }}
          >
            <PillArrow />
          </motion.span>
        </span>
      </Link>
    </motion.span>
  )
}

function StoryPhoto({ story, className }) {
  return (
    <div className={`shrink-0 overflow-hidden bg-gradient-to-br ${story.photo ?? 'from-tint-yellow via-card-gray to-tint-pink'} ${className}`} aria-hidden="true">
      {story.img ? <img src={story.img} alt="" loading="lazy" decoding="async" draggable="false" className="block h-full w-full object-cover" /> : null}
    </div>
  )
}

function StoryLogo({ logo }) {
  if (!logo) return null
  return <PlaceholderLogo name={logo.name} shape={logo.shape} w={logo.w ?? 120} h={logo.h ?? 28} />
}

// A T1.6 desktop card 956x393: photo 303x320 r16 + 16 gap + quote panel 637x321 (padding 16, r16, bg tint; inner
// padding 8, space-between). Quote Cirka 40/36 (36/36 @1200–1439) tint-dark; pill 16 below; footer row (align end,
// gap 8): name/role column 342 (name 20/25, role 20/26 rgba(0,0,0,.75); 18/25 + 18/23.4 @1200–1439) + logo
// right-aligned in a 239x28 box. Photo/panel are vertically centred in the 393 slot (alignment not measured).
function WideCard({ story, tint }) {
  return (
    <div className="flex h-[393px] w-[956px] items-center gap-4 rounded-card">
      <StoryPhoto story={story} className="h-[320px] w-[303px] rounded-card" />
      <div className={`h-[321px] w-[637px] rounded-card p-4 ${tint.bg}`}>
        <div className="flex h-full flex-col justify-between p-2">
          <div className="flex flex-col items-start gap-4">
            <p className={`${CIRKA} text-compare-lg tracking-display-sub xl:text-compare-xl xl:tracking-display-sub ${tint.text}`}>{story.quote}</p>
            <StoryPill tint={tint} href={story.href} label={story.cta} />
          </div>
          <div className="flex items-end gap-2">
            <div className="w-[342px] shrink-0">
              <p className="font-sans font-medium text-name-18 text-ink xl:text-name-20">{story.name}</p>
              <p className="font-sans text-body-18 text-body-75 xl:text-body-20">{story.role}</p>
            </div>
            <div className="flex h-[28px] w-[239px] items-center justify-end">
              <StoryLogo logo={story.logo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// A T1.6 below 1200: one static card, column gap 16, max-w 370 (326 @390), r16. Photo 370x391 r16; quote panel
// (padding 16, bg tint, inner padding 8, column gap 42): quote Cirka 36/36 #000, pill as desktop, name Ginto Medium
// 16/16 #000 + role 18/23.4 (810–1199) / 16/20.8 (phone) rgba(0,0,0,.75), logo right (111–129 wide on live).
function WideStatic({ story, tint }) {
  return (
    <div data-motion="story-static" className="flex w-full max-w-[370px] flex-col gap-4 rounded-card">
      <StoryPhoto story={story} className="aspect-[370/391] w-full rounded-card" />
      <div className={`rounded-card p-4 ${tint.bg}`}>
        <div className="flex flex-col gap-[42px] p-2">
          <p className={`${CIRKA} text-compare-lg tracking-display-sub text-ink`}>{story.quote}</p>
          <div>
            <StoryPill tint={tint} href={story.href} label={story.cta} />
          </div>
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="font-sans font-medium text-field-16 text-ink">{story.name}</p>
              <p className="font-sans text-body-16-md text-body-75 md:text-body-18">{story.role}</p>
            </div>
            <StoryLogo logo={story.logo} />
          </div>
        </div>
      </div>
    </div>
  )
}

// B T8 / A /product split card. >=1200: row 956x394 = image 456x394 (r 16 0 0 16, cover) + panel 500x394
// (r 0 16 16 0, padding 21.6, space-between, bg per card): quote Cirka 40/36 #000; name Ginto Medium 20/25 #000 +
// role 20/26 rgba(0,0,0,.75). <1200: 315x603 column, image 315x315 on top, panel below. Phone type is NOT in the
// specs: quote Cirka 24/24 (quote-phone) and name/role 14/18 are read off recon/pages/competitor-detail/
// 390-comp-zendesk.png (≈30 chars per 280px line, 24px pitch) – approximate.
function SplitCard({ story, mobile }) {
  const tint = SPLIT_TINTS[story.tint] ?? SPLIT_TINTS.peach
  if (mobile) {
    return (
      <div className="flex h-[603px] w-[315px] flex-col overflow-hidden rounded-card">
        <StoryPhoto story={story} className="h-[315px] w-full" />
        <div className={`flex flex-1 flex-col justify-between p-[21.6px] ${tint}`}>
          <p className={`${CIRKA} text-quote-phone tracking-display-sub text-ink`}>{story.quote}</p>
          <div>
            <p className="font-sans font-medium text-small text-ink">{story.name}</p>
            <p className="font-sans text-small text-body-75">{story.role}</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex h-[394px] w-[956px]">
      <StoryPhoto story={story} className="h-full w-[456px] rounded-l-card" />
      <div className={`flex h-full w-[500px] flex-col justify-between rounded-r-card p-[21.6px] ${tint}`}>
        <p className={`${CIRKA} text-compare-xl tracking-display-sub text-ink`}>{story.quote}</p>
        <div>
          <p className="font-sans font-medium text-name-20 text-ink">{story.name}</p>
          <p className="font-sans text-body-20 text-body-75">{story.role}</p>
        </div>
      </div>
    </div>
  )
}

function VariantSlide({ i, n, raw, geo, scaleTo, children }) {
  const o = useTransform(raw, (v) => i * geo.step + geo.wrap(v))
  const scale = useTransform(o, [-geo.item, 0, geo.gap, geo.item], [scaleTo, 1, 1, scaleTo])
  const originX = useTransform(o, [-geo.item, 0, geo.gap, geo.item], [1, 1, 0, 0])
  return (
    <motion.div data-motion="story-slide" data-story={i % n} className="shrink-0" style={{ width: geo.item, scale, originX }}>
      {children}
    </motion.div>
  )
}

/**
 * Generic slideshow on the homepage engine. `renderItem(item, index)` draws one card at `item` px wide.
 */
export function VariantSlideshow({ items, renderItem, item, gap, scale = 0.9, interval = 5, pager = 'pill', pagerGap = 70, pagerOverlay = false, label = 'Stories', className = '' }) {
  const N = items.length
  const step = item + gap
  const total = N * step
  const viewRef = useRef(null)
  const { index, raw, goTo, pan } = useSlideshow({ step, item, viewRef, interval })
  // raw 0 -> slide N (copy 1, item 0) centred; the centred slide stays within copies (N/2, 3N/2] (as HomeStories)
  const geo = { step, item, gap, wrap: (v) => wrap(-1.5 * total, -0.5 * total, v) }
  const x = useTransform(raw, (v) => -item / 2 + geo.wrap(v))
  const active = ((index % N) + N) % N
  const slides = Array.from({ length: N * COPIES }, (_, i) => i)
  return (
    // pagerOverlay: the pager takes no layout space and sits pagerGap below the slides (A T1.6: section 737 tall =
    // padding 204 + H2 60 + gap 80 + slot 393, so the 70 + 36 pager overlays the bottom padding, like the homepage).
    <div className={`relative flex w-full flex-col items-center ${className}`} style={pagerOverlay ? undefined : { gap: pagerGap }}>
      <motion.div ref={viewRef} className="relative w-full cursor-grab touch-pan-y active:cursor-grabbing" {...pan}>
        <motion.div
          data-motion="stories-track"
          data-active-index={N + active}
          data-step-px={step}
          className="relative left-1/2 flex w-max items-center"
          style={{ x, gap }}
        >
          {slides.map((i) => (
            <VariantSlide key={i} i={i} n={N} raw={raw} geo={geo} scaleTo={scale}>
              <div aria-hidden={i % N !== active || undefined}>{renderItem(items[i % N], i % N)}</div>
            </VariantSlide>
          ))}
        </motion.div>
      </motion.div>
      {/* dots exactly as the homepage pager: 12px #FF29E5, inactive .2, padding 12px 6px (outer ends 12) */}
      <div
        className={`flex rounded-pill ${PAGER_BG[pager] ?? PAGER_BG.pill} ${pagerOverlay ? 'absolute left-1/2 top-full -translate-x-1/2' : ''}`}
        style={pagerOverlay ? { marginTop: pagerGap } : undefined}
        role="tablist"
        aria-label={label}
      >
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(index + (i - active))}
            className={`py-3 ${i === 0 ? 'pl-3 pr-1.5' : i === N - 1 ? 'pl-1.5 pr-3' : 'px-1.5'}`}
          >
            <motion.span
              data-motion="stories-dot"
              className="block h-3 w-3 rounded-full bg-brand-magenta"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0.2 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * Stories – homepage carousel plus the template variants.
 * @param {object} props
 * @param {'home'|'wide'|'split'|'testimonial'|'employee'} [props.card='home']
 * @param {object[]} [props.items]   wide/split: { quote, name, role, img, photo?, logo?, href?, cta?, tint? };
 *                                   employee: EmployeeCard props.
 * @param {string} [props.title]     section H2 (Cirka 60 scale); omitted for `employee`.
 * @param {string} [props.sub]       optional sub under the title (B T8).
 * @param {'pink'|'peach'} [props.tint='pink']  wide card tint (A T1.6).
 * @param {number} [props.item] [props.gap] [props.scale] [props.interval] [props.pagerGap]
 * @param {'pill'|'soft'} [props.pager]
 * @param {boolean} [props.pagerOverlay]  pager overlays pagerGap below the slides (no layout space); wide/split true.
 * @param {'static'|'slider'|'same'} [props.below1200]  wide: 'static'; split/testimonial: 'slider'; employee: 'same'.
 * @param {number} [props.mobileItem] [props.mobileGap] [props.mobilePagerGap]  slider params below 1200.
 */
export default function Stories({ card = 'home', ...props }) {
  if (card === 'home' || !PRESETS[card]) return <HomeStories />
  return <StoriesVariant card={card} {...props} />
}

function StoriesVariant({ card, items, title, sub, tint = 'pink', className = '', ...overrides }) {
  const cfg = { ...PRESETS[card], ...Object.fromEntries(Object.entries(overrides).filter(([, v]) => v !== undefined)) }
  const { w } = useViewport()
  const desktop = w >= 1200 || cfg.below1200 === 'same'
  const wideTint = WIDE_TINTS[tint] ?? WIDE_TINTS.pink

  if (card === 'employee') {
    const list = items ?? SAMPLE_EMPLOYEES
    return (
      <div data-section="stories" data-variant="employee" className={`w-full overflow-x-clip ${className}`}>
        <VariantSlideshow
          items={list}
          item={cfg.item}
          gap={cfg.gap}
          scale={cfg.scale}
          interval={cfg.interval}
          pager={cfg.pager}
          pagerGap={cfg.pagerGap}
          pagerOverlay={cfg.pagerOverlay}
          label="Team stories"
          renderItem={(e) => <EmployeeCard layout="vertical" {...e} />}
        />
      </div>
    )
  }

  const list = items ?? (card === 'wide' ? SAMPLE_WIDE : SAMPLE_SPLIT)
  let body
  if (card === 'wide') {
    body = desktop ? (
      <VariantSlideshow
        className="max-w-[1200px]"
        items={list}
        item={cfg.item}
        gap={cfg.gap}
        scale={cfg.scale}
        interval={cfg.interval}
        pager={cfg.pager}
        pagerGap={cfg.pagerGap}
        pagerOverlay={cfg.pagerOverlay}
        label="Customer stories"
        renderItem={(st) => <WideCard story={st} tint={wideTint} />}
      />
    ) : (
      <WideStatic story={list[0]} tint={wideTint} />
    )
  } else {
    const mobile = !desktop
    body = (
      <VariantSlideshow
        className="max-w-[1200px]"
        items={list}
        item={mobile ? cfg.mobileItem : cfg.item}
        gap={mobile ? cfg.mobileGap : cfg.gap}
        scale={cfg.scale}
        interval={cfg.interval}
        pager={mobile ? cfg.mobilePager : cfg.pager}
        pagerGap={mobile ? cfg.mobilePagerGap : cfg.pagerGap}
        pagerOverlay={cfg.pagerOverlay}
        label="Customer testimonials"
        renderItem={(st) => <SplitCard story={st} mobile={mobile} />}
      />
    )
  }
  // A T1.6 / B T8 section: bg #fff, column, gap 80, padding 102px 32px; heading Cirka 60/60 (H3 scale) + optional
  // sub 20/26 rgba(0,0,0,.75), gap 16.
  return (
    <section data-section="stories" data-variant={card} className={`flex flex-col items-center gap-20 overflow-x-clip bg-white px-8 py-[102px] ${className}`}>
      {title ? <SectionHeading size="h3" gap={16} title={title} sub={sub} /> : null}
      {body}
    </section>
  )
}

// §13b AI-assistant note (live): full-width Inter 16/19.2 #828282 centred, padding-bottom 8, opacity 0 (kept for screen
// readers / LLMs). ~133 chars so it wraps like live: 1 line @1440 (27px block), 2 @1000 (47px), 3 @390 (66px).
export function AssistantNote() {
  return (
    <p className="pb-2 text-center font-inter text-ai-note text-ai-note opacity-0">
      Browsing with an AI assistant? It can request a Kestrel demo for you through our public booking endpoint, no account or login needed.
    </p>
  )
}
