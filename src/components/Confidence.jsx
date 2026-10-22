import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { KestrelMark } from './Logo.jsx'
import { useReducedMotion, useScrubProgress, useViewport } from '../lib/motion.js'

// Motion (live bundle scroll-target transforms + 1440 / 1000 / 390 sweeps):
//   confidence-line-mask  y 0 -> end (1961 lg+ / 1390 md (live Tablet value) / 752 phone) while the section top
//                         travels from (vh - 50) up by one section height (1440: scrollY 3845 -> 5131; 1000: 4035 ->
//                         5152; 390: 2812 -> 3612). Linear.
//   brain-tag / brain-tag-phone  same section, threshold .5: from (vh/2 - 50) up by one section height
//                         (1440: 4292 -> 5582; 1000: 4484 -> 5613; 390: 3235 -> 4035). Linear, from/to in data-*.
//   logo-glow             Framer loop: rotate 0 -> 360deg, 8s, linear, repeat (45deg/s; measured 35.1 -> 163.4deg
//                         over 2852ms).

// LOGO-ICON GLOW + "CONFIDENCE" HEADER + BRAIN TAGS – CLONE_SPEC §10 (1440), §15 (1200–1439: gap 52, glow square
// 276, body max 419), §16/§17 (phone; also used 810–1199 like Nav/Hero).
// Static state: line fully drawn (mask slid away); brain tags at the START of their scrub (t = 0).
// Motion hooks for the animation pass:
//   [data-motion="confidence-line-mask"]  white mask over the centre line: translateY 0 -> var(--line-mask-end) (1961px lg+,
//                                         1340px md, 752px phone) scrubbed over scrollY ~3845 -> 5200 @1440 (~1.45px/px).
//                                         Rendered at the end via the CSS `translate` property.
//   [data-motion="brain-tag"]             scrubbed linearly over scrollY 4300 -> 5600 @1440; per-tag from/to values in
//                                         data-scale / data-x / data-y / data-opacity ("from,to"). Rendered at "from".
//                                         Verified on live @1440 and @1000: same from/to values on both.
//   [data-motion="brain-tag-phone"]       phone pills, same idea; live scrub runs while the brain top travels from the
//                                         viewport bottom to the viewport top (scrollY ~3230 -> 4074 @390). Rendered at "from".
//   [data-motion="logo-glow"]             glow square behind the logo tile. On live its bounding box changes between
//                                         samples (217x216 at rest, 266x267 and 243x243 (phone) at other times) =>
//                                         it rotates (likely the shared 72deg/s loop).

const COPY = {
  h3: ['Finishes what it starts.', 'Knows who to call when it can’t.'], // 2nd clause wraps at 390 (3 lines) like live
  body: 'Every playbook has two endings: the case is closed, or a named person picks it up with a note of what was checked and why.',
}

/* ---------- capability tags ---------- */

const ICONS = {
  search: <path d="M6.8 11.6a4.8 4.8 0 1 0 0-9.6 4.8 4.8 0 0 0 0 9.6ZM10.3 10.3 13.5 13.5M5 6.8l1.3 1.3 2.4-2.4" />,
  data: <path d="M2.5 4c0-1.1 2.2-2 5-2s5 .9 5 2-2.2 2-5 2-5-.9-5-2Zm0 0v7c0 1.1 2.2 2 5 2s5-.9 5-2V4M2.5 7.5c0 1.1 2.2 2 5 2s5-.9 5-2" />,
  puzzle: <path d="M3 3h3.5a1.5 1.5 0 1 1 3 0H13v3.5a1.5 1.5 0 1 0 0 3V13H9.5a1.5 1.5 0 1 0-3 0H3Z" />,
  wand: <path d="M2.5 12.5 9 6M10.5 2v2M10.5 7v2M8 4.5h-2M15 4.5h-2M12.2 2.8 11.5 3.5M9.5 5.5l-.7.7" />,
}

// Unscaled tags are 54 tall (sizes in §10 are rendered at the base scales: 265x70 / 1.3 = 204x54 etc).
// Layout centres (dx from section centre, y from brain top) measured on live at scrub t = 0 minus the "from"
// transform: lg/xl (Desktop) and md (Tablet, *Md). Live end state (t = 1) = layout + translate "to".
const TAGS = [
  { id: 1, dx: -190, y: 234, dxMd: -109, yMd: 177, icon: 'search', parts: ['Intent classifier'], scale: [1.3, 1.5], x: [0, 21], ty: [0, 95], o: [1, 1] },
  { id: 2, dx: 136, y: 236, dxMd: 133, yMd: 225, icon: 'data', parts: ['fetchLatestStatement'], scale: [1.1, 0.9], x: [0, 17], ty: [0, 18], o: [1, 0.9] },
  { id: 3, dx: -233, y: 402, dxMd: -160, yMd: 375, icon: 'puzzle', parts: ['Flag priority'], scale: [1.2, 1.0], x: [0, -20], ty: [-27, -16], o: [1, 1] },
  { id: 4, dx: 232, y: 395, dxMd: 204, yMd: 375, icon: 'wand', parts: ['Collect', 'Policy ID'], scale: [1.0, 1.3], x: [0, 5], ty: [-27, -106], o: [1, 1] },
  { id: 5, dx: 152, y: 458, dxMd: 196, yMd: 420, icon: 'search', parts: ['Branch', 'Route by request type'], scale: [0.8, 0.8], x: [-149, -126], ty: [0, -22], o: [1, 0.9] },
]

// Phone (<810, live @390): five round pills (radius 50, h 54, chip 24 radius 38) showing only the last label part.
// Centres at scrub t = 0 (scrub runs while the brain top goes from the viewport bottom to the viewport top):
const PHONE_TAGS = [
  { id: 1, dx: -86, y: 44, x: [0, 3], ty: [0, 16], scale: [1, 1], o: [1, 1] },
  { id: 2, dx: 53, y: 104, x: [0, 0], ty: [0, -7], scale: [1, 1], o: [1, 0.7] },
  { id: 3, dx: -92, y: 159, x: [0, -2], ty: [0, -9], scale: [1, 1], o: [1, 1] },
  { id: 4, dx: 113, y: 182, x: [0, 0], ty: [0, -13], scale: [1, 1.1], o: [1, 1] },
  { id: 5, dx: 0, y: 246, x: [0, -3], ty: [0, -11], scale: [1, 1], o: [1, 0.3] },
]

function TagIcon({ icon, round }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center bg-tint-lavender ${round ? 'rounded-chip-round border border-chip-border' : 'rounded-brain-chip'}`}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 15 15"
        fill="none"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-tag-meta-lavender"
        aria-hidden="true"
      >
        {ICONS[icon]}
      </svg>
    </span>
  )
}

function Labels({ parts }) {
  // Two-part tags: first word Ginto Medium 16/18, rest Ginto Regular 16/22.4, gap 12 (live).
  if (parts.length === 1) return <span className="whitespace-nowrap font-sans text-body-16 text-ink-900">{parts[0]}</span>
  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      <span className="font-sans font-medium text-tag text-ink-900">{parts[0]}</span>
      <span className="font-sans text-body-16 text-ink-900">{parts[1]}</span>
    </span>
  )
}

function BrainTag({ tag, round = false }) {
  // Live: outer rgba(231,231,231,.5) + blur 10, radius 15 (round 50), 3px padding, no border of its own.
  // Inner white (round: white .8) radius 14, padding 0 12, with a .5px rgba(0,0,0,.2) ::after rim (inset ring here).
  return (
    <div className={`flex h-[54px] w-fit bg-tag-glass p-[3px] backdrop-blur-tag ${round ? 'rounded-hero-tag' : 'rounded-brain-outer'}`}>
      <div
        className={`flex items-center gap-2 px-3 ${round ? 'rounded-hero-tag bg-tag-glass-inner' : 'rounded-inner bg-white ring-[0.5px] ring-inset ring-tag-border'}`}
      >
        <TagIcon icon={tag.icon} round={round} />
        <Labels parts={round ? tag.parts.slice(-1) : tag.parts} />
      </div>
    </div>
  )
}

/* ---------- section ---------- */

function lerp(a, b, t) {
  return a + (b - a) * t
}

function ScrubTag({ tag, p, phone = false, children }) {
  const reduce = useReducedMotion()
  const transform = useTransform(p, (v) => {
    const t = reduce ? 0 : v
    return `translate(${lerp(tag.x[0], tag.x[1], t)}px, ${lerp(tag.ty[0], tag.ty[1], t)}px) scale(${lerp(tag.scale[0], tag.scale[1], t)})`
  })
  const opacity = useTransform(p, (v) => lerp(tag.o[0], tag.o[1], reduce ? 0 : v))
  return (
    <motion.div
      className="shrink-0"
      data-motion={phone ? 'brain-tag-phone' : 'brain-tag'}
      data-tag={tag.id}
      data-scale={tag.scale.join(',')}
      data-x={tag.x.join(',')}
      data-y={tag.ty.join(',')}
      data-opacity={tag.o.join(',')}
      style={{ transform, opacity }}
    >
      {children}
    </motion.div>
  )
}

export default function Confidence() {
  const reduce = useReducedMotion()
  const { w } = useViewport()
  const sectionRef = useRef(null)
  const line = useScrubProgress(sectionRef, { threshold: 1 })
  const tags = useScrubProgress(sectionRef, { threshold: 0.5 })
  const lineEnd = w >= 1200 ? 1961 : w >= 810 ? 1390 : 752
  const lineY = useTransform(line, (v) => (reduce ? 1 : v) * lineEnd)
  return (
    <section
      ref={sectionRef}
      data-section="confidence"
      className="relative flex w-full flex-col items-center gap-[10px] overflow-hidden pt-5 md:pt-0 lg:gap-[52px] xl:gap-[10px]"
    >
      {/* gradientLine (live): solid magenta; phone 1px from y 99, 777 tall; md 2px from 0, 1212 tall; lg+ full height. */}
      <div
        aria-hidden="true"
        className="absolute left-[calc(50%-0.5px)] top-[99px] h-[777px] w-px bg-brand-magenta md:left-[calc(50%-1px)] md:top-0 md:h-[1212px] md:w-[2px] lg:h-full"
      />
      {/* white mask over the line, rendered at its end (live end: phone 752, md 1340, lg+ 1961 from the section top) */}
      <motion.div
        data-motion="confidence-line-mask"
        aria-hidden="true"
        className="reveal-mask absolute inset-x-0 top-0 h-[879px] [--line-mask-end:752px] md:h-[1168px] md:[--line-mask-end:1390px] lg:h-[1336px] lg:[--line-mask-end:1961px]"
        style={{ translate: 'none', y: lineY }}
      />

      {/* Logo tile 139x138 (phone 113x112, 20px from the top) + glow */}
      <div className="relative z-[1]">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 flex h-[132px] w-[133px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-logo-tile-phone blur-glow md:h-[158px] md:w-[159px] md:rounded-logo-tile"
        >
          <motion.div
            data-motion="logo-glow"
            className="h-[191px] w-[190px] shrink-0 bg-brand-4 md:h-[216px] md:w-[217px] lg:h-[276px] lg:w-[276px] xl:h-[216px] xl:w-[217px]"
            animate={reduce ? { rotate: 0 } : { rotate: 360 }}
            transition={reduce ? { duration: 0 } : { duration: 8, ease: 'linear', repeat: Infinity }}
          />
        </div>
        {/* brand mark -> original Kestrel glyph (mark 59x74; phone 48x60) */}
        <div className="relative flex h-[112px] w-[113px] items-center justify-center rounded-logo-tile-phone bg-white px-[32.61px] py-[26.09px] md:h-[138px] md:w-[139px] md:rounded-logo-tile md:px-10 md:py-8">
          <KestrelMark className="h-full w-full" />
        </div>
      </div>

      {/* Header paragraph: padding 56px 10px / 76px 128px, gap 16 / 12, white-fade bg */}
      <div className="relative z-[1] flex w-full flex-col items-center gap-4 bg-white-fade px-[10px] py-14 md:gap-3 md:px-32 md:py-[76px]">
        <h3 className="font-framer text-center font-display text-h3-phone tracking-display-sub text-ink md:text-h3-md md:tracking-display-sub lg:text-h3-lg lg:tracking-display-sub xl:text-h3-xl xl:tracking-display-sub">
          {COPY.h3[0]}
          <br />
          {COPY.h3[1]}
        </h3>
        <p className="max-w-confidence-phone text-center font-sans text-para-14-phone text-ink md:max-w-header-body-md lg:max-w-body-lg-narrow lg:text-body-16 xl:max-w-confidence-body">
          {COPY.body}
        </p>
      </div>

      {/* Lorikee-brain (live): phone 333 tall (300 scene + 32 bottom padding), md 657, lg+ 799; brain-fade bg */}
      <div className="relative z-[1] h-[333px] w-full bg-brain-fade md:h-[657px] lg:h-[799px]">
        <div
          aria-hidden="true"
          className="brain-glow-placeholder brain-glow-drift absolute left-[calc(50%-250.5px)] top-0 h-[300px] w-[501px] [--brain-cell:60px] md:left-[calc(50%-548.5px)] md:h-[657px] md:w-[1097px] md:[--brain-cell:132px] lg:left-[calc(50%-613.5px)] lg:h-[735px] lg:w-[1227px] lg:[--brain-cell:147px]"
        >
          <div className="brain-glow-placeholder__blobs" />
          <div className="brain-glow-placeholder__grid" />
        </div>

        {/* md+ square tags */}
        {TAGS.map((t) => (
          <div
            key={t.id}
            className="absolute hidden h-0 w-0 items-center justify-center md:flex md:left-[calc(50%+var(--dx-md))] md:top-[var(--y-md)] lg:left-[calc(50%+var(--dx))] lg:top-[var(--y)]"
            style={{ '--dx': `${t.dx}px`, '--y': `${t.y}px`, '--dx-md': `${t.dxMd}px`, '--y-md': `${t.yMd}px` }}
          >
            <ScrubTag tag={t} p={tags}>
              <BrainTag tag={t} />
            </ScrubTag>
          </div>
        ))}

        {/* phone round pills */}
        {PHONE_TAGS.map((p) => {
          const t = TAGS[p.id - 1]
          return (
            <div
              key={p.id}
              className="absolute flex h-0 w-0 items-center justify-center md:hidden"
              style={{ left: `calc(50% + ${p.dx}px)`, top: p.y }}
            >
              <ScrubTag tag={{ ...p, id: t.id }} p={tags} phone>
                <BrainTag tag={t} round />
              </ScrubTag>
            </div>
          )
        })}
      </div>
    </section>
  )
}
