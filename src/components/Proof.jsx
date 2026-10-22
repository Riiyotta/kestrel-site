import { useRef } from 'react'
import { MotionConfig, motion, useTransform } from 'framer-motion'
import PlaceholderLogo from './PlaceholderLogo.jsx'
import LogoMarquee, { DEFAULT_LOGOS } from './ui/LogoMarquee.jsx'
import { PROOF_HOVER, REVEAL_06, useReducedMotion, useScrollTrigger, useViewport } from '../lib/motion.js'
import { useSlideshow, wrap } from '../lib/useSlideshow.js'

// PROOF – CLONE_SPEC §7 (1440), §15 (1200–1439), §16 (phone <810). 810–1199 = Framer Tablet bento (measured on live).
// Static settled state. Motion hooks for the animation pass:
//   [data-motion="proof-card"]          bento card reveal (see Motion below).
//   [data-motion="proof-card-hover"]    hover (wide cards, lg+): see Motion below.
//   [data-motion="proof-logos"]         logo strip reveal: opacity 0, y 80 -> 1, 0, ~500ms ease-out, once, when its
//                                       top reaches ~80–90% of the viewport.
//   [data-motion="proof-marquee"]       track: continuous translateX leftward at ~50px/s, linear, infinite; loop
//                                       length = one [data-logo-stack] + 96px gap (data-loop-px). data-direction
//                                       = left | right (810–1439 + phone: top row left, bottom row right).
//   [data-motion="proof-phone-track"]   phone slideshow track: translateX = 64 - index * 278 relative to the
//                                       viewport (data-slide-step); first child is a loop copy of the last slide; swipe physics not measured (§20).
//   [data-motion="proof-phone-dot"]     pager dots, active opacity 1 / inactive .3 (live).

// Motion (measured on live – Framer bundle effect configs, verified frame by frame; see src/lib/motion.js):
//   proof-card    once, when the bento grid top reaches viewport - 200px: opacity 0 / y 80 -> 1 / 0, 0.6s
//                 cubic-bezier(.12,.23,.5,1); per-card delay wide1 0, stat1 .1, quote .2, wide2 .4, stat2/stat3 .5s.
//                 md+ only (phone uses the slideshow, no reveal on live).
//   proof-logos   xl strip only (md/lg tickers have no reveal on live): same tween, delay 0, once, when the strip's
//                 translated box (top + 80) enters the viewport.
//   proof-card-hover  wide Photo+Quote cards only, lg+ (off on the Tablet breakpoint): scale 1.02,
//                 spring { duration .6, bounce 0 }. (No lift – 624x262 -> 636x267 is the scale alone.)
//   proof-marquee 50px/s (xl strip, Ticker speed 50) / 30px/s (md/lg/phone tickers, speed 30), linear, no hover slow-down.
//   proof-phone-track  Framer Slideshow: autoplay every 5s while in view, spring .6/0, drag; dots fade {duration:.3}.

const BG = '/assets/decor' // ASSET_MANIFEST group (a): soft blur-field card backgrounds (copied from _files)

const COPY = {
  h2: 'Outcomes, not hype.',
  sub: 'Where other tools hand customers off, Kestrel steps in and settles high-stakes issues with care.',
}

// Placeholder photo fills (content photos -> tint gradient blocks of the same geometry).
const PHOTO_A = 'bg-gradient-to-br from-tint-yellow via-card-gray to-tint-pink'
const PHOTO_B = 'bg-gradient-to-br from-tint-lavender via-card-gray to-tint-green'

// Stock portraits (Pexels, see IMAGE_CREDITS.md / public/assets/photos/slots.json). The tint gradient stays on the
// box as the loading backdrop; the <img> fills it with object-fit: cover (focus kept for the 230x153 phone crop).
// alt="" – decorative next to the visible name/role.
const PORTRAIT_1 = { src: '/assets/photos/proof-portrait-1.webp', position: '50% 20%' }
const PORTRAIT_2 = { src: '/assets/photos/proof-portrait-2.webp', position: '50% 35%' }

function CardPhoto({ img }) {
  if (!img) return null
  return (
    <img
      src={img.src}
      alt=""
      loading="lazy"
      decoding="async"
      draggable="false"
      className="block h-full w-full object-cover"
      style={{ objectPosition: img.position }}
    />
  )
}

const CARDS = {
  wide1: {
    kind: 'photoQuote',
    bg: `${BG}/proof-wide-1.jpg`,
    photo: PHOTO_A,
    img: PORTRAIT_1,
    quote: '“We ran four vendors head to head and Kestrel came out ahead on every score.”',
    name: 'Dana Whitfield',
    role: 'Member Care Lead',
    logo: { name: 'Quillfin', shape: 'diamond' },
  },
  stat1: {
    kind: 'stat',
    bg: `${BG}/proof-stat-1.jpg`,
    value: '92%',
    label: 'Shorter wait times',
    logo: { name: 'Corvane', shape: 'plus', w: 114 },
  },
  quote: {
    kind: 'quote',
    bg: `${BG}/proof-quote-1.jpg`,
    quote: '“We can now grow our support volume without growing the size of our team.”',
    logo: { name: 'Brightpaw', shape: 'arc', w: 122 },
  },
  stat2: {
    kind: 'stat',
    bg: `${BG}/proof-stat-2.jpg`,
    value: '64%',
    label: 'Lift in renewals',
    logo: { name: 'Mossgate', shape: 'square', w: 110 },
  },
  wide2: {
    kind: 'photoQuote',
    bg: `${BG}/proof-wide-2.jpg`,
    photo: PHOTO_B,
    img: PORTRAIT_2,
    quote:
      '“Our market moves fast, so having Kestrel support our growth while also lifting the customer experience is simply non-negotiable.”',
    name: 'Owen Castellano',
    role: 'Head of Support',
    logo: { name: 'Harbourline', shape: 'bars' },
  },
  stat3: {
    kind: 'stat',
    bg: `${BG}/proof-stat-3.jpg`,
    value: '98%',
    label: 'Answer accuracy',
    logo: { name: 'Tidewell', shape: 'ring', w: 106 },
  },
}

// Bento order (4-col grid at every bento breakpoint; col = 222 @md / 262 @lg / 296 @xl). Measured on live:
// md (810–1199, gap 16): row1 [wide1 3][stat1], row2 [quote 2][stat3 2], row3 [wide2 3][stat2]
// lg (gap 24):           row1 [wide1 3][stat1], row2 [quote][wide2 3],   row3 [stat2 2][stat3 2]
// xl (gap 32):           row1 [wide1 2][stat1][quote], row2 [stat2][wide2 2][stat3]
const BENTO = [
  { id: 'wide1', span: 'md:col-span-3 xl:col-span-2', order: 'md:order-1' },
  { id: 'stat1', span: 'md:col-span-1', order: 'md:order-2' },
  { id: 'quote', span: 'md:col-span-2 lg:col-span-1', order: 'md:order-3' },
  { id: 'stat2', span: 'md:col-span-1 lg:col-span-2 xl:col-span-1', order: 'md:order-6 lg:order-5 xl:order-4', small: true },
  { id: 'wide2', span: 'md:col-span-3 xl:col-span-2', order: 'md:order-5 lg:order-4 xl:order-5' },
  { id: 'stat3', span: 'md:col-span-2 xl:col-span-1', order: 'md:order-4 lg:order-6' },
]

const DISPLAY = 'font-framer font-display tracking-display-sub'
// quote 26/26 @md, 28/28 @lg, 30/30 @xl (live)
const QUOTE = `${DISPLAY} text-quote-md text-ink md:tracking-display-sub lg:text-quote-lg lg:tracking-display-sub xl:text-quote xl:tracking-display-sub`
const STAT = `${DISPLAY} text-stat tracking-display-sub text-ink-900`
// "stat2" (the 60% card) is a different Framer component: 48/50 + 14/19.6 label @md, 58/60 @lg, 72 @xl.
const STAT_SMALL = `${DISPLAY} text-stat tracking-display-sub text-ink-900 md:text-stat-md-sm md:tracking-display-sub lg:text-stat-lg-sm lg:tracking-display-sub xl:text-stat xl:tracking-display-sub`

function CardShell({ bg, className = '', hover = false, children }) {
  // Border = Framer ::after overlay (1px rgba(0,0,0,.1), radius 16) – drawn on top, takes no layout space.
  const reduce = useReducedMotion()
  const { w } = useViewport()
  const canHover = hover && !reduce && w >= 1200
  return (
    <motion.article
      data-motion="proof-card-hover"
      className={`relative h-full overflow-hidden rounded-card shadow-card-rest ${className}`}
      whileHover={canHover ? { scale: 1.02 } : undefined}
      transition={PROOF_HOVER}
    >
      <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full rounded-card object-cover" />
      <div className="relative h-full">{children}</div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-card border border-card-border" />
    </motion.article>
  )
}

function Logo({ logo, w = 165, h = 30 }) {
  return <PlaceholderLogo name={logo.name} shape={logo.shape} w={logo.w ? Math.round((logo.w * h) / 30) : w} h={h} />
}

/* ---------- bento cards (md+) ---------- */

function DesktopCard({ card, small = false }) {
  // Card padding 16px 24px 16px 16px; text column inset 8px top/bottom (live: text at +24, logo at -24).
  if (card.kind === 'photoQuote') {
    return (
      <CardShell bg={card.bg} className="pb-4 pl-4 pr-6 pt-4" hover>
        <div className="flex h-full items-end gap-6">
          <div className={`h-[230px] w-[230px] shrink-0 overflow-hidden rounded-sm ${card.photo}`} aria-hidden="true">
            <CardPhoto img={card.img} />
          </div>
          {/* text column = remaining width: 404 @md, 540 @lg, 330 @xl */}
          <div className="flex h-full min-w-0 flex-1 flex-col justify-between py-2">
            <p className={QUOTE}>{card.quote}</p>
            <div className="flex items-end">
              {/* name block and logo slot split the column in halves (live 202/202 @md, 165/165 @xl) */}
              <div className="min-w-0 flex-1">
                <p className="font-sans font-medium text-name-13 text-ink lg:text-tag">{card.name}</p>
                <p className="font-sans text-para-14-phone text-ink lg:text-body-16">{card.role}</p>
              </div>
              <div className="flex min-w-0 flex-1">
                <Logo logo={card.logo} />
              </div>
            </div>
          </div>
        </div>
      </CardShell>
    )
  }
  if (card.kind === 'quote') {
    return (
      <CardShell bg={card.bg} className="pb-4 pl-4 pr-6 pt-4">
        <div className="flex h-full flex-col justify-between py-2">
          <p className={QUOTE}>{card.quote}</p>
          <Logo logo={card.logo} />
        </div>
      </CardShell>
    )
  }
  return (
    <CardShell bg={card.bg} className="pb-4 pl-4 pr-6 pt-4">
      <div className="flex h-full flex-col justify-between py-2">
        {/* number -> label gap 16 (live) */}
        <div className="flex flex-col gap-4">
          <p className={small ? STAT_SMALL : STAT}>{card.value}</p>
          <p className={`font-sans text-body-16 text-ink-900 ${small ? 'md:text-para-14-phone lg:text-body-16' : ''}`}>{card.label}</p>
        </div>
        <Logo logo={card.logo} />
      </div>
    </CardShell>
  )
}

/* ---------- phone slides (<810) ---------- */

// Live @390: slides 262 wide, step 278 (gap 16); stat column = 262x215 + 262x215 (gap 16); Photo+Quote-Mobile
// 262x446 with a 230x153 photo on top, padding 16, gap 16. The last slide peeks in on the left (loop).
const PHONE_QUOTE = `${DISPLAY} text-quote-phone tracking-display-sub text-ink`

function PhoneCard({ card }) {
  if (card.kind === 'photoQuote') {
    return (
      <CardShell bg={card.bg} className="p-4">
        <div className="flex h-full flex-col gap-4">
          <div className={`h-[153px] w-[230px] shrink-0 overflow-hidden rounded-sm ${card.photo}`} aria-hidden="true">
            <CardPhoto img={card.img} />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <p className={PHONE_QUOTE}>{card.quote}</p>
            <div className="flex flex-col gap-2">
              <div>
                <p className="font-sans font-medium text-name-11 text-ink">{card.name}</p>
                <p className="font-sans text-small-13-tight text-ink">{card.role}</p>
              </div>
              <Logo logo={card.logo} w={110} h={20} />
            </div>
          </div>
        </div>
      </CardShell>
    )
  }
  // Quote-Mobile / Stats-Mobile: padding 16 24 16 16, content from the top (no 8px inset)
  return (
    <CardShell bg={card.bg} className="pb-4 pl-4 pr-6 pt-4">
      <div className="flex h-full flex-col justify-between">
        {card.kind === 'quote' ? (
          <p className={`${DISPLAY} text-quote tracking-display-sub text-ink-900`}>{card.quote}</p>
        ) : (
          <div className="flex flex-col gap-4">
            <p className={STAT}>{card.value}</p>
            <p className="font-sans text-body-16 text-ink-900">{card.label}</p>
          </div>
        )}
        <Logo logo={card.logo} w={110} h={20} />
      </div>
    </CardShell>
  )
}

const PHONE_SLIDES = [['wide1'], ['quote', 'stat1'], ['wide2'], ['stat3', 'stat2']]
const PHONE_STEP = 278

function PhoneSlide({ ids, i, loopCopy = false }) {
  return (
    <div data-slide={i} data-loop-copy={loopCopy || undefined} aria-hidden={loopCopy || undefined} className="flex w-[262px] flex-col gap-4">
      {ids.map((id) => (
        <div key={id} className={ids.length === 1 ? 'h-[446px]' : 'h-[215px]'}>
          <PhoneCard card={CARDS[id]} />
        </div>
      ))}
    </div>
  )
}

function PhoneSlideshow() {
  const N = PHONE_SLIDES.length
  const viewRef = useRef(null)
  // live: slides 262 + gap 16 (step 278), item 262; 3 copies so neighbours exist on both sides while it wraps
  // live Slideshow keeps autoplaying (and springing) under prefers-reduced-motion: reduce
  const { index, raw, goTo, pan } = useSlideshow({ step: PHONE_STEP, item: 262, viewRef })
  const total = N * PHONE_STEP
  // raw 0 -> slide 0 of the middle copy (as in the static layout); wrapping keeps the centred slide within
  // (N/2, 3N/2] so both neighbours always exist
  const x = useTransform(raw, (v) => wrap(-1.5 * total, -0.5 * total, v) - total)
  const active = ((index % N) + N) % N
  return (
    <div className="flex flex-col items-center pb-[2px] md:hidden">
      {/* viewport bleeds to the screen edges (section padding 16) so neighbours peek */}
      <motion.div ref={viewRef} className="-mx-4 w-[calc(100%+32px)] touch-pan-y overflow-hidden" {...pan}>
        {/* slide 0 of the middle copy sits at 50vw - 131 (live x 64 @390) */}
        <div className="flex w-max" style={{ transform: `translateX(calc(50vw - 131px + ${total}px))` }}>
          <motion.div
            data-motion="proof-phone-track"
            data-slide-step={PHONE_STEP}
            data-active-index={active}
            className="flex w-max items-start gap-4"
            style={{ x }}
          >
            {[0, 1, 2].map((copy) =>
              PHONE_SLIDES.map((ids, i) => <PhoneSlide key={`${copy}-${i}`} ids={ids} i={i} loopCopy={copy !== 1} />),
            )}
          </motion.div>
        </div>
      </motion.div>
      {/* Pager (live): 102x36 pill, bg rgba(229,229,229,.4) + blur 10, radius 50; dots 12px #FF29E5, inactive .3;
          padding 12px 5px (first/last outer 12); 15px below the slides. Dot opacity tween {duration:.3}. */}
      <div className="mt-[15px] flex rounded-pill bg-pager-bg backdrop-blur-tag" role="tablist" aria-label="Proof slides">
        {PHONE_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Slide ${i + 1}`}
            data-motion="proof-phone-dot"
            onClick={() => goTo(index + (i - active))}
            className={`py-3 ${i === 0 ? 'pl-3 pr-[5px]' : i === PHONE_SLIDES.length - 1 ? 'pl-[5px] pr-3' : 'px-[5px]'}`}
          >
            <motion.span
              className="block h-3 w-3 rounded-full bg-brand-magenta"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------- logo marquee ---------- */

// 18 placeholder marks per Logo-Stack. Widths chosen so one stack = 4140px wide (sum 2508 + 17 x 96 gap), §7.
// Rendered by the shared LogoMarquee engine (same .marquee-left/right keyframes, loop = stack + 96 gap, 3 copies).
const HOME_LOGOS = [
  { name: 'Quillfin', shape: 'diamond', w: 144, h: 30 },
  { name: 'Harbourline', shape: 'bars', w: 142, h: 30 },
  { name: 'Corvane', shape: 'plus', w: 172, h: 26 },
  { name: 'Saltmere', shape: 'triangle', w: 185, h: 18 },
  { name: 'Brightpaw', shape: 'arc', w: 209, h: 30 },
  { name: 'Fernlo', shape: 'circle', w: 95, h: 30 },
  { name: 'Ostrin', shape: 'square', w: 85, h: 30 },
  { name: 'Mossgate', shape: 'square', w: 132, h: 30 },
  { name: 'Veloma', shape: 'ring', w: 93, h: 25 },
  { name: 'Arcwise', shape: 'arc', w: 111, h: 21 },
  { name: 'Nimbly', shape: 'circle', w: 119, h: 21 },
  { name: 'Tidewell', shape: 'ring', w: 165, h: 30 },
  { name: 'Plinthco', shape: 'bars', w: 150, h: 26 },
  { name: 'Kindra', shape: 'diamond', w: 128, h: 24 },
  { name: 'Granitebay', shape: 'triangle', w: 176, h: 22 },
  { name: 'Lumio', shape: 'plus', w: 104, h: 28 },
  { name: 'Pellowfield', shape: 'square', w: 160, h: 20 },
  { name: 'Driftly', shape: 'circle', w: 138, h: 26 },
]

const CARD_DELAY = { wide1: 0, stat1: 0.1, quote: 0.2, wide2: 0.4, stat2: 0.5, stat3: 0.5 } // live bundle

function BentoGrid() {
  const gridRef = useRef(null)
  // live (Framer MotionConfig reducedMotion "user", frame-sampled with prefers-reduced-motion: reduce): the reveal still
  // fires; opacity tweens as usual, transforms (y / scale / x) jump to their target at the trigger, delays ignored.
  const { on, instant } = useScrollTrigger(gridRef, { offset: -200, once: true })
  return (
    <div ref={gridRef} className="hidden auto-rows-[262px] grid-cols-4 gap-4 md:grid lg:gap-6 xl:gap-8">
      {BENTO.map(({ id, span, order, small }) => (
        <motion.div
          key={id}
          data-motion="proof-card"
          data-card={id}
          className={`${span} ${order}`}
          initial={false}
          animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={instant ? { duration: 0 } : { ...REVEAL_06, delay: CARD_DELAY[id] }}
        >
          <DesktopCard card={CARDS[id]} small={small} />
        </motion.div>
      ))}
    </div>
  )
}

function LogoStrip() {
  const sentinel = useRef(null)
  const { w } = useViewport()
  const xl = w >= 1440
  // live IO (threshold 0) watches the translated strip, i.e. layout top + 80 must reach the viewport bottom
  const { on, instant } = useScrollTrigger(sentinel, { offset: -80, once: true, enabled: xl })
  return (
    <div ref={sentinel}>
      <motion.div
        data-motion="proof-logos"
        initial={false}
        animate={on || !xl ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
        transition={instant || !xl ? { duration: 0 } : REVEAL_06}
      >
        {/* xl: bordered card strip, native logo heights, 50 px/s (live Ticker speed 50) */}
        <LogoMarquee logos={HOME_LOGOS} motionId="proof-marquee" className="hidden xl:block" />
        {/* md/lg/phone: two opposing 20px tickers, 30 px/s; each row carries the same horizontal edge mask */}
        <div className="-mx-[18px] flex flex-col gap-9 py-4 md:-mx-[5%] xl:hidden">
          <LogoMarquee logos={HOME_LOGOS} card={false} height={20} speed={30} direction="left" motionId="proof-marquee" />
          <LogoMarquee logos={HOME_LOGOS} card={false} height={20} speed={30} direction="right" motionId="proof-marquee" />
        </div>
      </motion.div>
    </div>
  )
}

// C A3 (/about): logos-only variant. Same Proof-Section shell without sub or bento: section bg
// linear-gradient(180deg, #FFF 0%, #F9F9F9 100%), padding 80 (phone 80px 32px), H2 only (homepage H2 scale:
// 75/72 -> 58/58 -> 48/50 -> 40/40), gap 52, then the single-row card strip at EVERY width (1280 @1440, 1120 @1280,
// 840 @1000, 326 @390 = the container), 50 px/s leftwards. No reveal (spec C T1 motion summary: marquee only).
// 80 + 144 (2-line H2) + 52 + 132 + 80 = 488 tall @1440 (live 488).
function ProofLogos({ heading, logos }) {
  return (
    <section data-section="proof" data-variant="logos" className="flex flex-col items-center bg-about-fade px-8 py-20 md:p-20">
      <div className="flex w-full max-w-container flex-col gap-[52px]">
        <h2 className={`${DISPLAY} text-center text-h2-phone text-ink md:text-h2-md md:tracking-display-sub lg:text-h2-lg lg:tracking-display-sub xl:text-h2-xl xl:tracking-display-sub`}>
          {heading}
        </h2>
        <LogoMarquee logos={logos} />
      </div>
    </section>
  )
}

// C A3 sample: 7 placeholder logos (live heights 19–33; widths not in the spec). Pages should pass their own.
const ABOUT_LOGOS = DEFAULT_LOGOS.slice(0, 7)

/**
 * @param {{ variant?: 'home' | 'logos', heading?: string, logos?: import('../data/types.js').LogoEntry[] }} props
 *   variant 'home' (default) = the homepage section, unchanged. 'logos' = C A3 /about block (heading + strip).
 */
export default function Proof({ variant = 'home', heading = 'Trusted by fast-growing teams and established names alike.', logos = ABOUT_LOGOS }) {
  if (variant === 'logos') return <ProofLogos heading={heading} logos={logos} />
  return (
    <MotionConfig reducedMotion="user">
    <section data-section="proof" className="flex flex-col items-center gap-8 overflow-x-clip bg-white px-4 py-14 md:px-8 md:py-20 lg:p-20">
      <div className="flex w-full max-w-container flex-col gap-[52px]">
        {/* heading -> sub gap 16, 24 at md (live) */}
        <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-4">
          <h2 className={`${DISPLAY} text-center text-h2-phone text-ink md:text-h2-md md:tracking-display-sub lg:text-h2-lg lg:tracking-display-sub xl:text-h2-xl xl:tracking-display-sub`}>
            {COPY.h2}
          </h2>
          {/* 14/18.2 #1A1A1A phone, 16/20.8 #1A1A1A md, 18/23.4 #333 lg, 20/26 #333 xl */}
          <p className="max-w-proof-sub text-center font-sans text-body-14-phone text-ink-900 md:text-body-16-md lg:text-body-18 lg:text-body xl:text-body-20">
            {COPY.sub}
          </p>
        </div>

        <div className="flex flex-col gap-6 pt-[10px] md:gap-8">
          {/* Bento grid (md+) */}
          <BentoGrid />

          <PhoneSlideshow />

          {/* Logo strip. xl: one bordered strip 1280x132. md/lg: two opposing tickers 110% of the container
              (1030 @1000, 1232 @1280); phone: 394 wide (bleeds 2px past the viewport). */}
          <LogoStrip />
        </div>
      </div>
    </section>
    </MotionConfig>
  )
}
