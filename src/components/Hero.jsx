import { forwardRef, useEffect, useRef, useState } from 'react'
import { motion, useTransform } from 'framer-motion'
import AnnouncementPill from './AnnouncementPill.jsx'
import Button from './Button.jsx'
import {
  REVEAL,
  REVEAL_BLUR,
  useReducedMotion,
  useScrollCallback,
  useSmoothFollow,
  useViewport,
  useWindowScrollY,
} from '../lib/motion.js'

// HERO – CLONE_SPEC §6 (desktop), §15 (1200–1439), §16/§17 (phone).
// Motion (all values re-measured on the live site, see src/lib/motion.js and the comments below):
//   [data-motion="hero-photo-center"]  scale 2->1 / y -64->0 (>=1440; 1.8 / -119 at 1200–1439) over scrollY 0->R,
//                                      R = 940 - 0.3*vh (669 @900 tall), ~100ms exponential follow
//   [data-motion="hero-glow"]          desktop y -353->0 over the same range; phone/tablet y 0->+281 over R
//   [data-motion="hero-satellite"]     revealed by trigger bands (reversible), 1.5s cubic-bezier(.15,.35,.25,1),
//                                      photos blur 5->0; linear unsmoothed parallax k*scrollY
//   [data-motion="hero-trigger-band"]  the 9 invisible 60px bands (doc y 0.7*vh + 400 + 60i)
//   [data-motion="hero-phone-tag"]     phone/tablet Center tag: band-0 reveal (x 37 / y -6 / scale 1.2 -> 0), k -.02
//   [data-motion="hero-reassurance"]   opacity 0 on live at all times (no reveal)

const COPY = {
  // lengths tuned so Inter lands on the live label widths (announcement 198.5, tags 159.5/183.2/204/135/179.1)
  announcement: 'Kestrel Voice 2.0 is live',
  h1: ['Customer cases, closed by AI', 'with every step on record'],
  // 1440 + phone (~220 chars); the 1200–1439 variant is shorter (~191 chars) to land 3 lines in 600px (§15).
  sub: "Kestrel picks up a customer's case, checks it against your written policies, takes the needed action in your own systems and notes down every step, so your team reviews finished outcomes instead of retyping answers.",
  subLg:
    "Kestrel picks up a customer's case, checks it against your policies, takes the needed action in your own systems and notes every step, so your team reviews outcomes instead of retyping.",
  primary: 'Get a demo',
  secondary: 'Start free trial',
  reassurance: 'Free 14-day pilot on your own tickets. No card needed and no contract to sign.',
  tags: {
    center: 'Claim photos received',
    tl: 'Address change confirmed',
    tr: 'Mortgage payment paused',
    bl: 'Late fee refunded',
    br: 'Statement copy emailed',
  },
}

/* ---------- tags ---------- */

const TONES = {
  yellow: { chip: 'bg-tint-yellow', label: 'text-tag-text-yellow', glyph: 'stroke-tag-meta-yellow' },
  lavender: { chip: 'bg-tint-lavender', label: 'text-tag-text-lavender', glyph: 'stroke-tag-meta-lavender' },
  pink: { chip: 'bg-tint-pink', label: 'text-tag-text-pink', glyph: 'stroke-tag-meta-pink' },
  green: { chip: 'bg-tint-green', label: 'text-tag-text-green', glyph: 'stroke-tag-meta-green' },
}

// Generic UI glyphs (own drawings): ticket, puzzle, magnifier, stack, wand.
const GLYPHS = {
  ticket: <path d="M2 5.5V4h11v1.5a2 2 0 0 0 0 4V11H2V9.5a2 2 0 0 0 0-4ZM6 6.5h3M6 8.5h3" />,
  puzzle: <path d="M3 3h3.5a1.5 1.5 0 1 1 3 0H13v3.5a1.5 1.5 0 1 0 0 3V13H9.5a1.5 1.5 0 1 0-3 0H3Z" />,
  search: <path d="M6.8 11.6a4.8 4.8 0 1 0 0-9.6 4.8 4.8 0 0 0 0 9.6ZM10.3 10.3 13.5 13.5" />,
  stack: <path d="M7.5 2 13 5 7.5 8 2 5Zm-5.5 5L7.5 10 13 7M2 9.5l5.5 3 5.5-3" />,
  wand: <path d="M2.5 12.5 9 6M10.5 2v2M10.5 7v2M8 4.5h-2M15 4.5h-2M12.2 2.8 11.5 3.5M9.5 5.5l-.7.7" />,
}

// Live revealed variant ("1 Font- Round", all viewports): outer glass rgba(231,231,231,.5) + blur 10, padding 3,
// 0.5px rgba(0,0,0,.2) rim drawn as an overlay; inner rgba(255,255,255,.8) padding 12; 24px chip (1px .1 rim
// overlay) + 8px gap + label Ginto Regular 16/22.4 #1A1A1A. 54 tall.
// Hidden variant ("1 Font - Blur End", what the tag shows while fading out on scroll-up): label Ginto Medium 16/18
// in the tone's tinted colour (lavender rgb(30,32,96)), ~6px wider; on the phone/tablet stage the hidden label is
// Medium 16/18 but stays #1A1A1A (tint=false). The label swap is discrete (switches at the start of the
// reveal/hide, like the live variant change).
function HeroTag({ tone, glyph, label, revealed = true, tint = true, className = '', ...rest }) {
  const t = TONES[tone]
  return (
    <div
      className={`flex w-fit rounded-hero-tag bg-tag-glass p-[3px] backdrop-blur-tag after:pointer-events-none after:absolute after:inset-0 after:rounded-hero-tag after:border-[0.5px] after:border-tag-border ${className}`}
      {...rest}
    >
      <div className="flex items-center gap-2 rounded-hero-tag bg-tag-glass-inner p-3">
        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-chip-round ring-1 ring-inset ring-chip-border ${t.chip}`}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={t.glyph}
            aria-hidden="true"
          >
            {GLYPHS[glyph]}
          </svg>
        </span>
        <span className={`whitespace-nowrap font-sans text-body-16 ${revealed ? 'text-ink-900' : `font-medium leading-[18px] ${tint ? t.label : 'text-ink-900'}`}`}>{label}</span>
      </div>
    </div>
  )
}

/* ---------- photos (Pexels stock, see IMAGE_CREDITS.md / public/assets/photos/slots.json) ---------- */

const PHOTO = (name) => `/assets/photos/${name}.webp`

// Stock photos per slot. The tint gradient stays on the box as the loading backdrop; the <img> fills the
// existing rounded/overflow-hidden box with object-fit: cover, so slot geometry, rim and motion are untouched.
const PHOTOS = {
  center: { src: PHOTO('hero-center'), alt: 'Woman on a phone call at her desk while working on a laptop' },
  tl: { src: PHOTO('hero-tl'), alt: 'Smiling woman with a coffee cup using a laptop on a sofa' },
  tr: { src: PHOTO('hero-tr'), alt: 'Father holding his baby in a nursery' },
  bl: { src: PHOTO('hero-bl'), alt: 'Woman in bed checking her phone' },
  br: { src: PHOTO('hero-br'), alt: 'Couple talking across a wooden cafe table' },
}

// frame: rim width (0 = none). flush: rim drawn inside the photo box (satellites) instead of 2px outside (Photo-Center).
// photo: { src, alt } (optional); eager: hero centre photo only (above the fold), everything else lazy.
const PhotoPlaceholder = forwardRef(function PhotoPlaceholder(
  { fill, frame = 4, flush = true, photo, eager = false, className = '', style, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={`absolute ${className}`} style={style} {...rest}>
      <div className={`h-full w-full overflow-hidden rounded-photo ${fill}`}>
        {photo && (
          <img
            src={photo.src}
            alt={photo.alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            {...(eager && { fetchpriority: 'high' })}
            draggable="false"
            className="block h-full w-full object-cover"
          />
        )}
      </div>
      {frame > 0 && (
        <span aria-hidden="true" className={`photo-frame ${flush ? 'photo-frame--flush' : ''}`} style={{ borderWidth: frame }} />
      )}
    </div>
  )
})

// §6 satellites, stage-relative (stage top = doc y 726 @1440 / 667 @1280). Re-measured on the live site at
// 1200, 1280 and 1440: one fluid formula per item covers 1200–1440 (left = a% of stage width + b px), except TR
// photo + TR tag which switch at the 1440 breakpoint. Sizes do not scale at 1200–1439 (the spec's lg sizes were
// mid-reveal values). Tag lefts for Center/BR include their resting x offsets (-110.74 / -120.6).
//
// Motion (measured on live, SSR initial styles + frame sampling):
//   hidden = pre-reveal offset/scale (opacity 0), k = parallax (translateY = k * scrollY, unsmoothed, applies
//   before and after the reveal), band = index of the trigger band (top->bottom) that reveals the item.
const SATELLITE_PHOTOS = [
  {
    id: 'tl',
    lg: { l: 'calc(9.75% - 129.9px)', t: 81, w: 259, h: 173 },
    k: 0.1,
    band: 1,
    hidden: { x: -15, y: -28, s: 0.8 },
    fill: 'bg-gradient-to-br from-card-gray to-tint-yellow',
  },
  {
    id: 'tr',
    lg: { l: 'calc(100% - 268px)', t: -6, w: 241, h: 319 },
    xl: { l: 'calc(100% - 250px)', t: 7, w: 235, h: 319 },
    k: -0.1,
    band: 3,
    hidden: { x: 10, y: -21, s: 0.8 },
    fill: 'bg-gradient-to-b from-tint-pink to-line-gray',
  },
  {
    id: 'bl',
    lg: { l: '122px', t: 566, w: 198, h: 257 },
    k: -0.1,
    band: 5,
    hidden: { x: -19, y: -41, s: 0.8 },
    fill: 'bg-gradient-to-tr from-tint-green to-card-gray',
  },
  {
    id: 'br',
    lg: { l: 'calc(90% - 196.5px)', t: 466, w: 404, h: 229 },
    k: 0.15,
    band: 8,
    hidden: { x: 7, y: 0, s: 0.8 },
    fill: 'bg-gradient-to-bl from-tint-lavender to-card-gray',
  },
]

const SATELLITE_TAGS = [
  // Center/BR: live transform = ry -27 + k*scrollY (translateY -327 / +213 @3000). Visual centres re-measured on live
  // at 1440 and 1280 (scroll 0 hidden and 3000 revealed): Center cy 953.3 @3000 (clone was 947 -> top 494 -> 527 with
  // ry -27), BR cy 1650.5 (clone was 1678 -> keep top 685, ry -27).
  { id: 'center', lg: { l: 'calc(69% - 110.74px)', t: 527 }, k: -0.1, ry: -27, band: 6, hidden: { x: 37, y: -6, s: 1.2 }, tone: 'yellow', glyph: 'ticket' },
  { id: 'tl', lg: { l: '60px', t: 231 }, k: 0.05, band: 0, hidden: { x: -21, y: -26, s: 0.9 }, tone: 'lavender', glyph: 'puzzle' },
  {
    id: 'tr',
    lg: { l: 'calc(100% - 369px)', t: 153 },
    xl: { l: 'calc(100% - 336px)', t: 158 },
    k: -0.2,
    band: 2,
    hidden: { x: 20, y: -21, s: 0.8 },
    tone: 'lavender',
    glyph: 'search',
  },
  { id: 'bl', lg: { l: '88px', t: 826 }, k: -0.15, band: 4, hidden: { x: -19, y: -38, s: 0.8 }, tone: 'green', glyph: 'stack' },
  // live parallax for the BR tag is 0.08 (spec said .05: 53.5px @669, 64 @800, 80 @1000)
  { id: 'br', lg: { l: 'calc(81% - 120.6px)', t: 685 }, k: 0.08, ry: -27, band: 7, hidden: { x: 66, y: -10, s: 0.8 }, tone: 'pink', glyph: 'wand' },
]

// CSS vars consumed by the position/size classes below (xl falls back to lg).
const posVars = ({ lg, xl = lg }) => ({
  '--l-lg': lg.l,
  '--t-lg': `${lg.t}px`,
  '--l-xl': xl.l,
  '--t-xl': `${xl.t}px`,
  ...(lg.w && { '--w-lg': `${lg.w}px`, '--h-lg': `${lg.h}px`, '--w-xl': `${xl.w}px`, '--h-xl': `${xl.h}px` }),
})
const POS = 'left-[var(--l-lg)] top-[var(--t-lg)] xl:left-[var(--l-xl)] xl:top-[var(--t-xl)]'
const SIZE = 'h-[var(--h-lg)] w-[var(--w-lg)] xl:h-[var(--h-xl)] xl:w-[var(--w-xl)]'

/* ---------- scroll geometry (measured on live) ---------- */
// The live Trigger-Container is 0.7*vh + 940 tall on desktop/tablet (phone: 0.65*vh + 1030), so:
//   - scroll-transform range R = container - vh  (669 @1440x900, 699 @1280x800 / 1000x800, 734 @390x844)
//   - trigger band i sits at doc y 0.7*vh + 400 + 60*i (phone 0.65*vh + 400 + 70*i) and fires when its top
//     enters the viewport, i.e. scrollY >= 400 + 60*i - 0.3*vh (phone 400 + 70*i - 0.35*vh). Reversible.
const isPhone = (w) => w < 810
const scrollRange = (w, vh) => (isPhone(w) ? 1030 - 0.35 * vh : 940 - 0.3 * vh)
const bandDocTop = (w, vh, i) => (isPhone(w) ? 0.65 * vh + 400 + 70 * i : 0.7 * vh + 400 + 60 * i)
const bandThreshold = (w, vh, i) => bandDocTop(w, vh, i) - vh

// Which bands are currently "in" (band top above the viewport bottom).
function useBands(scrollY, vp) {
  const [count, setCount] = useState(0)
  const update = (y) => {
    let n = 0
    for (let i = 0; i < 9; i++) if (y >= bandThreshold(vp.w, vp.h, i)) n = i + 1
    setCount((c) => (c === n ? c : n))
  }
  useScrollCallback(scrollY, update)
  useEffect(() => update(scrollY.get()), [vp.w, vp.h]) // eslint-disable-line react-hooks/exhaustive-deps
  // prefers-reduced-motion: live still reveals by band (see Satellite), so the bands stay active.
  return (i) => i < count
}

// Satellite = outer element carrying position + parallax (unsmoothed k*scrollY), inner element carrying the
// reveal (opacity/x/y/scale, 1.5s; photos also blur 5px -> 0 on a 1.15s ease-in-out).
const INSTANT = { duration: 0 }

// ry = constant rest translateY that live keeps in the same transform as the parallax (Center/BR tags: -27).
function Satellite({ scrollY, k, ry = 0, revealed, hidden, blur = false, reduce, className = '', style, children, ...rest }) {
  const parallax = useTransform(scrollY, (v) => (reduce ? 0 : k * v) + ry)
  const shown = { opacity: 1, x: 0, y: 0, scale: 1, ...(blur && { filter: 'blur(0px)' }) }
  const off = { opacity: 0, x: hidden.x, y: hidden.y, scale: hidden.s, ...(blur && { filter: 'blur(5px)' }) }
  return (
    <motion.div className={className} style={{ ...style, y: parallax }} {...rest}>
      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={revealed ? shown : off}
        // reduced motion (live, emulated prefers-reduced-motion): x/y/scale jump, opacity + blur still animate
        // on the band trigger (.019@33ms .104@89 .288@184 .495@316), parallax off.
        transition={reduce ? { ...REVEAL, x: INSTANT, y: INSTANT, scale: INSTANT, filter: REVEAL_BLUR } : { ...REVEAL, filter: REVEAL_BLUR }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function DesktopStage({ stageRef, scrollY, smoothY, vp, reduce }) {
  const R = scrollRange(vp.w, vp.h)
  const xl = vp.w >= 1440
  // Photo-Center: >=1440 scale 2 -> 1, y -64 -> 0; 1200–1439 scale 1.8 -> 1, y -119 -> 0 (live, linear in scrollY).
  const from = xl ? { s: 2, y: -64 } : { s: 1.8, y: -119 }
  const prog = useTransform(smoothY, (v) => (reduce ? 1 : Math.min(1, Math.max(0, v / R))))
  const photoScale = useTransform(prog, (p) => from.s + (1 - from.s) * p)
  const photoY = useTransform(prog, (p) => from.y * (1 - p))
  // Hero-Unicorn-Bg: y -353 -> 0 over the same range (1280 and 1440 alike).
  const glowY = useTransform(prog, (p) => -353 * (1 - p))
  const isIn = useBands(scrollY, vp)

  // Position the 9 trigger-band markers where the live bands sit for this viewport height.
  const [stageTop, setStageTop] = useState(726)
  useEffect(() => {
    if (stageRef.current) setStageTop(stageRef.current.getBoundingClientRect().top + window.scrollY)
  }, [vp.w, vp.h, stageRef])

  return (
    <div
      ref={stageRef}
      data-motion="hero-photo-stage"
      className="relative mt-2 hidden h-[925px] w-full overflow-x-clip lg:block"
    >
      {/* Hero-Unicorn-Bg stand-in: 2023x1299 (lg 1863x1197), centred (x -291 @1440), rest top doc 640 => -86.
          Centring moved from -translate-x-1/2 to framer x so it composes with the scroll-linked y. */}
      <motion.div
        data-motion="hero-glow"
        aria-hidden="true"
        style={{ x: '-50%', y: glowY }}
        className="hero-glow-placeholder hero-glow-drift pointer-events-none absolute left-1/2 top-[-86px] h-[1197px] w-[1863px] xl:h-[1299px] xl:w-[2023px]"
      >
        <div className="hero-glow-placeholder__colour" />
        <div className="hero-glow-placeholder__stripes" />
      </motion.div>

      {SATELLITE_PHOTOS.map((p) => (
        <Satellite
          key={p.id}
          scrollY={scrollY}
          k={p.k}
          hidden={p.hidden}
          blur
          reduce={reduce}
          revealed={isIn(p.band)}
          data-motion="hero-satellite"
          data-satellite={`photo-${p.id}`}
          data-parallax={p.k}
          data-reveal-order={p.band}
          data-reveal-scale={p.hidden.s}
          className={`absolute ${POS} ${SIZE}`}
          style={posVars(p)}
        >
          <PhotoPlaceholder fill={p.fill} photo={PHOTOS[p.id]} frame={4} className="inset-0" />
        </Satellite>
      ))}

      {/* Photo-Center: 628x362 radius 24, Border frame 632x366 r26 with 6px white rim. Rest x 406 / y 1008 doc.
          Outer box keeps the Tailwind centring; the inner layer carries the scroll-linked scale/y. */}
      <div className="absolute left-1/2 top-[282px] h-[362px] w-[628px] -translate-x-1/2">
        <motion.div data-motion="hero-photo-center" className="absolute inset-0" style={{ scale: photoScale, y: photoY }}>
          <PhotoPlaceholder
            fill="bg-gradient-to-br from-tint-lavender via-card-gray to-tint-yellow"
            photo={PHOTOS.center}
            eager
            frame={6}
            flush={false}
            className="inset-0"
          />
        </motion.div>
      </div>

      {SATELLITE_TAGS.map((t) => (
        <Satellite
          key={t.id}
          scrollY={scrollY}
          k={t.k}
          ry={t.ry}
          hidden={t.hidden}
          reduce={reduce}
          revealed={isIn(t.band)}
          data-motion="hero-satellite"
          data-satellite={`tag-${t.id}`}
          data-parallax={t.k}
          data-reveal-order={t.band}
          data-reveal-scale={t.hidden.s}
          className={`absolute ${POS}`}
          style={posVars(t)}
        >
          <HeroTag tone={t.tone} glyph={t.glyph} label={COPY.tags[t.id]} revealed={isIn(t.band)} className="relative" />
        </Satellite>
      ))}

      {/* 9 invisible 60px trigger bands: doc y 0.7*vh + 400 + 60i (1030..1510 @1440x900) */}
      {Array.from({ length: 9 }, (_, i) => (
        <div
          key={i}
          data-motion="hero-trigger-band"
          data-band={i}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-[60px]"
          style={{ top: bandDocTop(vp.w, vp.h, i) - stageTop }}
        />
      ))}
    </div>
  )
}

// Phone (<810) and tablet (810–1199) share the Mobile-Hero-image-Section on live. Measured at 390x844,
// 860x900 and 1000x800: no Photo-Center zoom; Unicorn bg y 0 -> +281 over R; five items revealed by bands
// 0/2/3/4/5 (same 1.5s reveal) with small parallax rates.
const PHONE_ITEMS = {
  center: { band: 0, k: -0.02, hidden: { x: 37, y: -6, s: 1.2 } },
  leftPhoto: { band: 2, k: 0, hidden: { x: -37, y: 41, s: 1.2 } }, // stays permanently blurred (5px) on live
  blTag: { band: 3, k: 0.05, hidden: { x: -71, y: 37, s: 1.1 } },
  rightPhoto: { band: 4, k: 0.04, hidden: { x: 64, y: 46, s: 1.1 } }, // blur 5px -> 0 with the reveal
  trTag: { band: 5, k: -0.03, hidden: { x: 67, y: 24, s: 1.3 } },
}

function PhoneStage({ scrollY, smoothY, vp, reduce }) {
  // Live Mobile-Hero-image-Section (Phone <810 and Tablet 810–1199): column gap 32; phone padding 0 16px 32px,
  // tablet padding 0 32px. Photo-Center fluid width (phone 358x362 aspect, tablet fixed 629 tall). Below it two
  // equal columns (gap 8; phone 306 / tablet 522 tall). Positions re-measured at 390, 860 and 1000 (layout boxes,
  // parallax excluded): left-column items left-anchored, right-column items right-anchored.
  const R = scrollRange(vp.w, vp.h)
  const glowY = useTransform(smoothY, (v) => (reduce ? 0 : 281 * Math.min(1, Math.max(0, v / R))))
  const isIn = useBands(scrollY, vp)
  // Tablet (810–1199): the BL/TR tags sit 27px higher on live at every scroll position (measured at 1000x800:
  // TR cy 1540.5 vs 1568, BL 1519.5 vs 1547 @3000; same at scroll 0) -> the same -27 rest translateY as desktop.
  const ry = (key) => (vp.w >= 810 && (key === 'blTag' || key === 'trTag') ? -27 : 0)
  const sat = (key) => ({ scrollY, reduce, ry: ry(key), k: PHONE_ITEMS[key].k, hidden: PHONE_ITEMS[key].hidden, revealed: isIn(PHONE_ITEMS[key].band), 'data-reveal-order': PHONE_ITEMS[key].band, 'data-parallax': PHONE_ITEMS[key].k })
  return (
    <div data-motion="hero-phone-stage" className="relative flex w-full flex-col gap-8 px-4 pb-8 md:px-8 md:pb-0 lg:hidden">
      {/* Unicorn bg: width = viewport + 437 (827 @390, 1437 @1000), aspect 827:531, centred, top -344 */}
      <motion.div
        aria-hidden="true"
        data-motion="hero-glow"
        style={{ x: '-50%', y: glowY }}
        className="hero-glow-placeholder hero-glow-drift pointer-events-none absolute left-1/2 top-[-344px] aspect-[827/531] w-[calc(100%+437px)]"
      >
        <div className="hero-glow-placeholder__colour" />
        <div className="hero-glow-placeholder__stripes" />
      </motion.div>

      <div className="relative aspect-[358/362] w-full md:aspect-auto md:h-[629px]">
        <PhotoPlaceholder
          fill="bg-gradient-to-br from-tint-lavender via-card-gray to-tint-yellow"
          photo={PHOTOS.center}
          eager
          frame={6}
          flush={false}
          className="inset-0"
        />
        <Satellite
          {...sat('center')}
          data-motion="hero-phone-tag"
          className="absolute -right-[20.5px] top-[179px] md:right-[70px] md:top-[306px]"
        >
          <HeroTag tone="yellow" glyph="ticket" label={COPY.tags.center} revealed={isIn(PHONE_ITEMS.center.band)} tint={false} className="relative" />
        </Satellite>
      </div>

      {/* Photo-Stack-Front: two columns, gap 8 */}
      <div className="relative flex gap-2">
        <div className="relative h-[306px] flex-1 md:h-[522px]">
          {/* left photo is a permanently blurred, frameless depth layer on the live site */}
          <Satellite
            {...sat('leftPhoto')}
            data-motion="hero-satellite"
            className="absolute -left-1 top-[21px] h-[186px] w-[143px] md:left-[26px] md:top-[2px] md:h-[283px] md:w-[218px]"
          >
            <PhotoPlaceholder fill="bg-gradient-to-br from-card-gray to-tint-yellow" photo={PHOTOS.bl} frame={0} className="inset-0 blur-reveal" />
          </Satellite>
          <Satellite {...sat('blTag')} data-motion="hero-satellite" className="absolute left-12 top-2.5 md:left-[175px] md:top-[37px]">
            <HeroTag tone="green" glyph="stack" label={COPY.tags.bl} revealed={isIn(PHONE_ITEMS.blTag.band)} tint={false} className="relative" />
          </Satellite>
        </div>
        <div className="relative h-[306px] flex-1 md:h-[522px]">
          <Satellite
            {...sat('rightPhoto')}
            blur
            data-motion="hero-satellite"
            className="absolute right-0 top-[97px] h-[209px] w-[154px] md:right-[18px] md:top-[99px] md:h-[372px] md:w-[274px]"
          >
            <PhotoPlaceholder fill="bg-gradient-to-b from-tint-pink to-line-gray" photo={PHOTOS.tr} className="inset-0" />
          </Satellite>
          <Satellite {...sat('trTag')} data-motion="hero-satellite" className="absolute right-8 top-[220px] md:right-[134px] md:top-[298px]">
            <HeroTag tone="lavender" glyph="search" label={COPY.tags.tr} revealed={isIn(PHONE_ITEMS.trTag.band)} tint={false} className="relative" />
          </Satellite>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const stageRef = useRef(null)
  const reduce = useReducedMotion()
  const vp = useViewport()
  const scrollY = useWindowScrollY()
  // Photo-Center zoom + Unicorn bg follow scroll with the live ~100ms exponential lag; parallax does not.
  const smoothY = useSmoothFollow(scrollY, 0.1)
  const desktop = vp.w >= 1200

  return (
    <section
      data-section="hero"
      // phone gap 96 / tablet gap 8 between headline block and image section (live).
      // overflow-x: clip keeps the oversized glow stand-ins from widening the page (clip, not hidden, so no
      // scroll container is created for the scroll-linked children).
      className="relative mx-auto flex max-w-page flex-col items-center gap-24 overflow-x-clip bg-white md:gap-2 lg:h-[1592px] lg:gap-0 xl:h-[1651px]"
    >
      {/* Hero-Section-Headline: padding 150px 80px 40px (tablet 150px 32px 80px, phone 125px 10px 0), h 718 / 659.
          No entrance animation on live (SSR-visible, transform none). */}
      <div className="relative z-[1] w-full overflow-hidden px-gutter-phone pt-[125px] md:px-8 md:pb-20 md:pt-[150px] lg:h-[659px] lg:px-gutter lg:pb-10 xl:h-[718px]">
        <div className="mx-auto flex max-w-container flex-col items-center gap-[62px]">
          <AnnouncementPill>{COPY.announcement}</AnnouncementPill>

          <div className="flex w-full flex-col items-center gap-4">
            <h1 className="font-framer text-center font-display text-h1-phone tracking-display-sub text-ink md:text-h1-md md:tracking-display-sub lg:text-h1-lg lg:tracking-display-sub xl:text-h1-xl xl:tracking-display-sub">
              {COPY.h1[0]}
              <br className="hidden md:block" /> {COPY.h1[1]}
            </h1>

            <div className="flex w-full flex-col items-center gap-6 md:gap-10">
              <p className="text-center font-sans text-sub-phone text-body md:max-w-hero-sub-md md:text-sub-md md:tracking-sub-md-inter lg:max-w-hero-sub-lg lg:text-sub-lg xl:max-w-hero-sub-xl xl:text-sub-xl">
                <span className="lg:hidden xl:inline">{COPY.sub}</span>
                <span className="hidden lg:inline xl:hidden">{COPY.subLg}</span>
              </p>

              <div className="flex flex-col items-center gap-3.5">
                <div className="flex gap-3">
                  <Button variant="dark">{COPY.primary}</Button>
                  <Button variant="light">{COPY.secondary}</Button>
                </div>
                {/* live "Self-serve line": opacity 0 at every scroll position and width sampled – no reveal */}
                <p
                  data-motion="hero-reassurance"
                  className="text-center font-sans text-small-13-tight text-body opacity-0 md:text-small-13 xl:text-small"
                >
                  {COPY.reassurance}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {desktop ? (
        <DesktopStage stageRef={stageRef} scrollY={scrollY} smoothY={smoothY} vp={vp} reduce={reduce} />
      ) : (
        <PhoneStage scrollY={scrollY} smoothY={smoothY} vp={vp} reduce={reduce} />
      )}
    </section>
  )
}
