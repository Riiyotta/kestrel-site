import { useEffect, useRef } from 'react'
import { MotionConfig, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { REVEAL_06, TREE_SPRING, useScrollTrigger, useViewport } from '../lib/motion.js'

// PLAYBOOK HEADER + BOTTOM TREE + CARD FAN – CLONE_SPEC §12 (1440), §15 (1200–1439: header padding 75px 128px,
// bottom-tree 907 tall, body max 419, fan identical), §16 (phone). 810–1199 = live Tablet variant (5-card fan,
// own 730x598 tree, 40/40 H3).
// Static settled state: fan fully spread (end of fan-in), tree fully drawn.
// Motion hooks for the animation pass:
//   [data-motion="playbook-card"]       fan-in on enter (whileInView, replays): from data-from-scale / data-from-x /
//                                       data-from-y to scale 1, x 0, y 0. Centre ~610ms ease-out; pairs start after
//                                       data-delay-ms (100 / 200 / 300 – middle pairs interpolated, §20) and take ~550ms.
//                                       Trigger: card stack top ~650px from viewport top (scrollY ~6500 @1440).
//   [data-motion="playbook-tree"]       scrubbed reveal of the tree via an animated mask-image on the SVG itself
//                                       (Desktop-tree-hidden: linear-gradient(0deg, transparent 100%, #000 100%), §12).
//                                       Rendered fully revealed; scroll range not measured – reuse the §9 approach.

// Motion (live Framer bundle + frame samples at 1440 / 1000 / 390):
//   playbook-card  replaying appear: card-stack top reaches viewport - 50px -> from data-from-* to identity, 0.6s
//                  cubic-bezier(.12,.23,.5,1), delays 0 / .1 / .2 / .3s centre -> outer; reverses when the stack drops
//                  back below that line. Phone start states differ (bundle animation32/34/36): centre scale 1.1 y -40,
//                  pair scale .7 x +/-90 (left pair starts toward the centre, as on desktop – live frame samples).
//   playbook-tree  variant switch (replays): mask linear-gradient(0deg, transparent X%, #000 X%) X 100 -> 0 on
//                  spring { duration 2, bounce 0 } when the bottom-tree block top (md+) / the phone tree top reaches
//                  viewport - 150px (1440: scrollY 6125, 1000: ~6250, 390: ~4470).

const COPY = {
  h3: ['Your steps, in order.', 'Every single time.'],
  body: 'Kestrel logs which step it took, what it checked and why, so any case can be replayed later.',
}

/* ---------- ticket cards ---------- */

const TONES = {
  pink: { quote: 'text-tag-text-pink', meta: 'text-tag-meta-pink', photo: 'from-tint-pink to-card-gray' },
  lavender: { quote: 'text-tag-text-lavender', meta: 'text-tag-meta-lavender', photo: 'from-tint-lavender to-card-gray' },
  green: { quote: 'text-tag-text-green', meta: 'text-tag-meta-green', photo: 'from-tint-green to-card-gray' },
  yellow: { quote: 'text-tag-text-yellow', meta: 'text-tag-meta-yellow', photo: 'from-tint-yellow to-card-gray' },
}

// Every card is the 278x265 centre card scaled: pairs are exactly .8 / .7 / .6 (222x212, 195x186, 167x159, §12).
// Centre offsets (dx) confirmed on live @1440/1280/1000: ±159 / ±269.5 / ±363; all vertically centred.
// md (810–1199) drops the outer pair. Phone (live @390): centre card unscaled 278x265, inner pair .8 at ±94.5
// (the spec's 306x292 / 156x148 do not match the live page).
// Fan-in start x (live frame samples @1440, wheel scroll): side cards start pushed TOWARD the centre (left cards
// translateX +160/+260/+360, right cards -160/-260/-360; visual centres 721/711/717 -> 561/451/357) and fan outwards.
const CARDS = [
  { id: 'p6l', dx: -363, s: 0.6, z: 'z-[1]', from: [0.7, 360, -20], delay: 300, tone: 'yellow', title: 'SMS Request Resolved', quote: '“I can’t make my flight”', meta: 'Imran Qureshi — 8:05 AM, 12 Feb 2026' },
  { id: 'p4l', dx: -269, s: 0.7, z: 'z-[2]', from: [0.7, 260, -40], delay: 200, tone: 'green', title: 'Voice Request Resolved', quote: '“My parcel went missing”', meta: 'Lena Vogt — 4:18 PM, 2 Mar 2026' },
  { id: 'p2l', dx: -159, s: 0.8, z: 'z-[3]', from: [0.7, 160, -60], delay: 100, tone: 'pink', title: 'Chat Request Resolved', quote: '“Pause my membership”', meta: 'Tomas Reyes — 7:52 PM, 9 Mar 2026', phone: { dx: -94.5, s: 0.8, from: [0.7, 90, 0] } },
  { id: 'c', dx: 0, s: 1, z: 'z-[4]', from: [1.4, 0, -80], delay: 0, tone: 'lavender', title: 'Voice Request Resolved', quote: '“Freeze my card, please”', meta: 'Ana Ruiz — 10:42 AM, 14 Mar 2026', phone: { dx: 0, s: 1, from: [1.1, 0, -40] } },
  { id: 'p2r', dx: 159, s: 0.8, z: 'z-[3]', from: [0.7, -160, -60], delay: 100, tone: 'yellow', title: 'Email Request Resolved', quote: '“Update my next of kin”', meta: 'Grace Okafor — 1:30 PM, 6 Mar 2026', phone: { dx: 94.5, s: 0.8, from: [0.7, -90, 0] } },
  { id: 'p4r', dx: 269, s: 0.7, z: 'z-[2]', from: [0.7, -260, -40], delay: 200, tone: 'lavender', title: 'Chat Request Resolved', quote: '“Switch to paper-free bills”', meta: 'Mei Tanaka — 11:09 AM, 4 Mar 2026' },
  { id: 'p6r', dx: 363, s: 0.6, z: 'z-[1]', from: [0.7, -360, -20], delay: 300, tone: 'pink', title: 'Email Request Resolved', quote: '“Add a second driver”', meta: 'Felix Brandt — 6:44 AM, 1 Mar 2026' },
]

function SearchGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="stroke-tag-meta-lavender" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.8 11.6a4.8 4.8 0 1 0 0-9.6 4.8 4.8 0 0 0 0 9.6ZM10.3 10.3 13.5 13.5M5 6.8l1.3 1.3 2.4-2.4" />
    </svg>
  )
}

function Ticket({ card }) {
  const t = TONES[card.tone]
  // padding 6, ticket gradient bg, radius 12, ticket shadow, backdrop blur 20, white 6px Border frame (119deg mask).
  // Inner spacing (live): strip 56 tall, avatar 16 below it, text 12 below the avatar, meta 4 below the quote.
  return (
    <div className="relative h-[265px] w-[278px] rounded-playbook bg-ticket p-1.5 shadow-ticket backdrop-blur-ticket">
      {/* live Border layer = same box as the card (inset 0, radius 12, 6px white ::after, 119deg mask) */}
      <span aria-hidden="true" className="photo-frame" style={{ inset: 0, borderWidth: 6, borderRadius: 12 }} />
      <div className="relative flex h-full flex-col">
        <div className="flex h-14 shrink-0 items-center justify-center gap-2 rounded-t-[6px] bg-white">
          <span className="flex h-6 w-6 items-center justify-center rounded-chip-round bg-tint-lavender">
            <SearchGlyph />
          </span>
          <span className="whitespace-nowrap font-sans text-body-16 text-ink-900">{card.title}</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-3 pt-4">
          {/* avatar 102 (stock photo playbook-avatar-<id>, Pexels; tint gradient = loading backdrop), 3px rgba(0,0,0,.1) ring.
              alt="" – decorative next to the visible name in the meta line. */}
          <span className={`h-[102px] w-[102px] shrink-0 overflow-hidden rounded-full border-[3px] border-chip-border bg-white bg-gradient-to-br ${t.photo}`} aria-hidden="true">
            <img
              src={`/assets/photos/playbook-avatar-${card.id}.webp`}
              alt=""
              loading="lazy"
              decoding="async"
              draggable="false"
              className="block h-full w-full object-cover"
            />
          </span>
          <div className="flex flex-col items-center gap-1">
            <p className={`whitespace-nowrap font-sans text-body-16 ${t.quote}`}>{card.quote}</p>
            <p className={`whitespace-nowrap font-sans font-medium text-meta ${t.meta}`}>{card.meta}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FanCard({ card, phone = false, reveal }) {
  const pos = phone ? card.phone : { dx: card.dx, s: card.s }
  const from = phone ? card.phone.from : card.from
  // outer pair (s .6) only exists on the Desktop variants (lg+)
  const vis = !phone && card.s === 0.6 ? 'hidden lg:block' : ''
  return (
    <div
      className={`absolute left-[calc(50%-139px)] top-0 ${card.z} ${vis}`}
      style={{ marginLeft: pos.dx, transform: `scale(${pos.s})` }}
    >
      <motion.div
        data-motion="playbook-card"
        data-card={card.id}
        data-from-scale={from[0]}
        data-from-x={from[1]}
        data-from-y={from[2]}
        data-delay-ms={card.delay}
        initial={false}
        // live: the FX layer sits outside the static .8/.7/.6 scale, so its x/y are unscaled px; this layer is inside
        // the scaled wrapper, hence / pos.s
        animate={reveal.on ? { scale: 1, x: 0, y: 0 } : { scale: from[0], x: from[1] / pos.s, y: from[2] / pos.s }}
        transition={reveal.instant ? { duration: 0 } : { ...REVEAL_06, delay: card.delay / 1000 }}
      >
        <Ticket card={card} />
      </motion.div>
    </div>
  )
}

/* ---------- branching trees (original SVG paths on the live anchors) ---------- */

// Anchors + colours measured from the live trees (one per breakpoint). Each branch is an own S-curve from the
// fork to its tip (vertical tangents at both ends); branch gradients run horizontally indigo 24% -> sun 65% ->
// magenta at the trunk (x1 = live gradient start), trunk gradients run vertically.
const TREES = {
  // lg+: 732x749 box, top -258 in the bottom-tree block. Trunk 0 -> 321 (indigo -> sun -> magenta), fork at 282.3,
  // lower centre line 283.8 -> 674 (magenta at the fork -> indigo at the bottom), tips at the card stack.
  desktop: {
    w: 732, h: 749, cx: 365.6, fork: 282.3, sw: 2,
    tips: [[0, 749, -157.3], [108.6, 719, -2], [206.3, 697, 206.3], [731.2, 749, 888.5], [622.6, 719, 733.2], [525, 697, 525]],
    lines: [
      { d: 'M365.6 0V321', g: { y1: 0, y2: 321, stops: [[0, 'indigo'], [0.5, 'sun'], [1, 'magenta']] } },
      { d: 'M365.6 283.8V674', g: { y1: 659.4, y2: 284.1, stops: [[0.24, 'indigo'], [0.55, 'sun'], [0.8, 'magenta']] } },
    ],
  },
  // md: 730x598 box, top -105. Trunk 0 -> 523 (indigo bottom -> magenta top), fork at 131.
  tablet: {
    w: 730, h: 598, cx: 365, fork: 131, sw: 2,
    tips: [[109, 568, -1], [206, 546, 206], [621, 568, 731], [525, 546, 525]],
    lines: [{ d: 'M365 0V523', g: { y1: 503, y2: 0, stops: [[0.154, 'indigo'], [0.394, 'sun'], [0.635, 'magenta']] } }],
  },
  // phone: 228x272 box stretched to 370x441 (top -109, preserveAspectRatio none, stroke scales like live).
  phone: {
    w: 228, h: 272, cx: 113.5, fork: 51, sw: 1,
    tips: [[0, 245, 5.75], [227, 245, 227]],
    lines: [{ d: 'M113.5 0V271.7', g: { y1: 261.6, y2: 0.25, stops: [[0.24, 'indigo'], [0.408, 'sun'], [0.649, 'magenta']] } }],
  },
}

function Tree({ id, variant, className, mask, svgRef }) {
  const t = TREES[variant]
  const branch = ([x, y]) => {
    const mid = t.fork + (y - t.fork) * 0.5
    return `M${t.cx} ${t.fork}C${t.cx} ${mid} ${x} ${mid} ${x} ${y}`
  }
  return (
    <motion.svg
      viewBox={`0 0 ${t.w} ${t.h}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      data-motion="playbook-tree"
      className={className}
      ref={svgRef}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <defs>
        {t.tips.map(([x, y, x1], i) => (
          <linearGradient key={i} id={`${id}-b${i}`} gradientUnits="userSpaceOnUse" x1={x1} y1={y} x2={t.cx} y2={y}>
            <stop offset="0.24" className="stop-indigo" />
            <stop offset="0.649" className="stop-sun" />
            <stop offset="1" className="stop-magenta" />
          </linearGradient>
        ))}
        {t.lines.map((l, i) => (
          <linearGradient key={i} id={`${id}-l${i}`} gradientUnits="userSpaceOnUse" x1={t.cx} y1={l.g.y1} x2={t.cx} y2={l.g.y2}>
            {l.g.stops.map(([o, c]) => (
              <stop key={o} offset={o} className={`stop-${c}`} />
            ))}
          </linearGradient>
        ))}
      </defs>
      {t.lines.map((l, i) => (
        <path key={i} d={l.d} stroke={`url(#${id}-l${i})`} strokeWidth={t.sw} />
      ))}
      {t.tips.map((tip, i) => (
        <path key={i} d={branch(tip)} stroke={`url(#${id}-b${i})`} strokeWidth={t.sw} />
      ))}
    </motion.svg>
  )
}

function useTreeReveal(blockRef, phoneTreeRef) {
  const { w } = useViewport()
  const phone = w < 810
  // ref Le on live: Bottom-tree block (md+) / the phone tree itself, offset -150, replays
  // live keeps the mask spring under prefers-reduced-motion (frame samples identical to the default run)
  const block = useScrollTrigger(blockRef, { offset: -150, enabled: !phone })
  const tree = useScrollTrigger(phoneTreeRef, { offset: -150, enabled: phone })
  const st = phone ? tree : block
  const pct = useMotionValue(st.on ? 0 : 100)
  useEffect(() => {
    const target = st.on ? 0 : 100
    if (st.instant) {
      pct.jump(target)
      return
    }
    const a = animate(pct, target, TREE_SPRING)
    return () => a.stop()
  }, [st.on, st.instant, pct])
  return useTransform(pct, (v) => `linear-gradient(0deg, transparent ${v}%, #000 ${v}%)`)
}

export default function Playbook() {
  const blockRef = useRef(null)
  const phoneTreeRef = useRef(null)
  const stackRef = useRef(null)
  const phoneStackRef = useRef(null)
  const mask = useTreeReveal(blockRef, phoneTreeRef)
  // live (Framer MotionConfig reducedMotion "user", frame-sampled with prefers-reduced-motion: reduce): the reveal still
  // fires; opacity tweens as usual, transforms (y / scale / x) jump to their target at the trigger, delays ignored.
  const fan = useScrollTrigger(stackRef, { offset: -50 })
  const phoneFan = useScrollTrigger(phoneStackRef, { offset: -50 })
  return (
    <MotionConfig reducedMotion="user">
    <section data-section="playbook" className="relative w-full">
      {/* 2x256 gradient-line (live: solid indigo #4248DB, starts 23px above the header; lg+ only) */}
      <div aria-hidden="true" className="absolute left-[calc(50%-1px)] top-[-23px] hidden h-[256px] w-[2px] bg-brand-indigo lg:block" />

      {/* Header: padding 56px 10px / 80px 128px (md, xl) / 75px 128px (lg), gap 16 / 12, white-fade bg */}
      <div className="relative z-[2] flex flex-col items-center gap-4 bg-white-fade px-[10px] py-14 md:gap-3 md:px-32 md:py-20 lg:py-[75px] xl:py-20">
        <h3 className="font-framer text-center font-display text-h3-phone tracking-display-sub text-ink md:text-h3-md md:tracking-display-sub lg:text-h3-lg lg:tracking-display-sub xl:text-h3-xl xl:tracking-display-sub">
          {COPY.h3[0]}
          <br />
          {COPY.h3[1]}
        </h3>
        <p className="max-w-playbook-phone text-center font-sans text-para-14-phone text-ink md:max-w-header-body-md lg:max-w-body-lg-narrow lg:text-body-16 xl:max-w-playbook-body">
          {COPY.body}
        </p>
      </div>

      {/* Bottom-tree (live): 453 / 839 (md) / 907 (lg) / 965 (xl) tall, card stack bottom padding 70 / 240 / 320 */}
      <div ref={blockRef} className="relative mx-auto flex h-[453px] max-w-page flex-col items-center justify-end px-[10px] pb-[70px] md:h-[839px] md:px-20 md:pb-60 lg:h-[907px] lg:pb-80 xl:h-[965px]">
        {/* Bottom-tree-Unicorn-Bg stand-in (same scene as the hero), mask #000 70% -> transparent 98%. Phone 707x511 at
            (-158, -29) like live; md+ fills the block. */}
        <div
          aria-hidden="true"
          className="bottomtree-glow-placeholder hero-glow-drift pointer-events-none absolute left-[calc(50%-353.5px)] top-[-29px] h-[511px] w-[707px] md:inset-0 md:h-auto md:w-auto"
        >
          <div className="hero-glow-placeholder__colour" />
          <div className="hero-glow-placeholder__stripes" />
        </div>

        <Tree id="playbook-tree" variant="desktop" mask={mask} className="absolute left-[calc(50%-366px)] top-[-258px] z-[1] hidden h-[749px] w-[732px] lg:block" />
        <Tree id="playbook-tree-tablet" variant="tablet" mask={mask} className="absolute left-[calc(50%-365px)] top-[-105px] z-[1] hidden h-[598px] w-[730px] md:block lg:hidden" />
        <Tree id="playbook-tree-phone" variant="phone" mask={mask} svgRef={phoneTreeRef} className="absolute left-[calc(50%-185px)] top-[-109px] z-[1] h-[441px] w-[370px] md:hidden" />

        {/* Card-Stack: max-width 892, 265 tall (md: 5 cards, lg+: 7) */}
        <div ref={stackRef} className="relative z-[2] hidden h-[265px] w-full max-w-card-stack md:block">
          {CARDS.map((c) => (
            <FanCard key={c.id} card={c} reveal={fan} />
          ))}
        </div>
        <div ref={phoneStackRef} className="relative z-[2] h-[265px] w-full md:hidden">
          {CARDS.filter((c) => c.phone).map((c) => (
            <FanCard key={c.id} card={c} phone reveal={phoneFan} />
          ))}
        </div>
      </div>
    </section>
    </MotionConfig>
  )
}
