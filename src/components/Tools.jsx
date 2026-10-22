import { useLayoutEffect, useRef, useState } from 'react'
import { MotionConfig, motion, useTransform } from 'framer-motion'
import { REVEAL_04, useReducedMotion, useScrollTrigger, useScrubProgress } from '../lib/motion.js'

// "YOUR TOOLS" ICON ARC – CLONE_SPEC §9 (1440; §15: identical geometry at 1200–1439), §16 (phone); 810–1199 = live
// Tablet variant (118px tiles, gap 40, 40/40 H3) measured on the live site. Settled state: tiles revealed, gradient tree fully drawn (mask slid away).
// Motion hooks for the animation pass:
//   [data-motion="tools-tile"]        whileInView, replays when scrolled back above: initial opacity .5, scale .7,
//                                     translateY data-reveal-y (150; outer pair 200) -> 1, 1, 0, ~450ms ease-out,
//                                     triggered when the icon row enters the viewport bottom
//   [data-motion="tools-tree-mask"]   white mask over the tree: translateY 0 -> var(--tree-mask-end) (842px lg+, 718px md,
//                                     417px phone) scrubbed while scrollY goes ~3057 -> 3870 @1440 (~1.04px/px).
//                                     Rendered at its end via the CSS `translate` property (so a motion `transform`
//                                     can replace it: set translate:none when animating).

// Motion (live bundle + frame samples, verified at 1440 / 1000 / 390):
//   tools-tile       replaying appear: Icon-Stack top reaches the viewport bottom (offset 0) -> opacity .5 / scale .7 /
//                    y data-reveal-y -> 1 / 1 / 0, 0.4s cubic-bezier(.12,.23,.5,1); delays middle 0, inner .05,
//                    outer .1s; the same tween runs backwards when the row drops back below the viewport. All widths.
//   tools-tree-mask  scrub 0 -> --tree-mask-end while the tree's top travels from (vh - 50) up by one tree height
//                    (1440: scrollY 3057 -> 3846 = 789px; 1000: 3391 -> 4065 = 674px; 390: 2469 -> 2836 = 367px).

const COPY = {
  h3: 'Five channels, one agent.',
  body: 'A caller, a texter and an emailer get the same answer from the same playbook, with the same audit trail sitting behind each one.',
}

/* ---------- channel glyphs (generic UI icons, own drawings; 58x48 box) ---------- */

const GLYPHS = {
  chat: <path d="M8 6h42a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4h-6v8l-9-8H8a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4Z" />,
  email: (
    <>
      <rect x="4" y="8" width="50" height="32" rx="4" />
      <path d="m6 11 23 17 23-17" />
    </>
  ),
  voice: <path d="M5 20v8M12 15v18M19 19v10M26 6v36M33 12v24M40 18v12M47 14v20M54 21v6" />,
  sms: (
    <>
      <path d="M8 4h42a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H40l-8 8v-8H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" />
      <circle cx="17" cy="20" r="3.5" />
      <circle cx="29" cy="20" r="3.5" />
      <circle cx="41" cy="20" r="3.5" />
    </>
  ),
  api: <path d="M20 10 7 24l13 14M38 10l13 14-13 14M33 6 25 42" />,
}

// x: 260 / 454 / 648 / 842 / 1036 @1440 (row gap 50, centred). Arc via top padding 124/68/0/68/124 (md+), 50/25/0 phone.
const TILES = [
  { id: 'chat', label: 'Chat', pt: 'pt-[50px] md:pt-[124px]', revealY: 200, delay: 0.1 },
  { id: 'email', label: 'Email', pt: 'pt-[25px] md:pt-[68px]', revealY: 150, delay: 0.05 },
  { id: 'voice', label: 'Voice', pt: 'pt-0', revealY: 150, delay: 0 },
  { id: 'sms', label: 'SMS', pt: 'pt-[25px] md:pt-[68px]', revealY: 150, delay: 0.05 },
  { id: 'api', label: 'API', pt: 'pt-[50px] md:pt-[124px]', revealY: 200, delay: 0.1 },
]

function Tile({ tile, reveal }) {
  return (
    <div className={`shrink-0 ${tile.pt}`}>
      <motion.div
        data-motion="tools-tile"
        data-reveal-y={tile.revealY}
        initial={false}
        animate={reveal.on ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0.5, scale: 0.7, y: tile.revealY }}
        transition={reveal.instant ? { duration: 0 } : { ...REVEAL_04, delay: tile.delay }}
        // live: phone 67 (padding 4.5, radius 14) / md 118 / lg 144 (padding 8, radius 28); bg rgba(231,231,231,.3), blur 5
        className="h-[67px] w-[67px] rounded-inner bg-tile-glass p-[4.5px] backdrop-blur-glow md:h-[118px] md:w-[118px] md:rounded-icon-tile md:p-2 lg:h-36 lg:w-36"
      >
        {/* inner white: 58 radius 10 padding 10 / 102 radius 24 / 128 radius 24 padding 24 */}
        <div className="flex h-full w-full flex-col items-center justify-between rounded-tile bg-white p-2.5 md:rounded-icon-tile-inner md:p-5 lg:p-6">
          <svg
            viewBox="0 0 58 48"
            fill="none"
            aria-hidden="true"
            className="h-[22px] w-[27px] shrink-0 stroke-brand-indigo md:h-10 md:w-12 lg:h-12 lg:w-[58px]"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {GLYPHS[tile.id]}
          </svg>
          <span className="font-sans font-bold text-tile-label-phone text-ink-900 md:text-tile-label-md lg:text-tile-label">{tile.label}</span>
        </div>
      </motion.div>
    </div>
  )
}

/* ---------- gradient tree (original SVG; 752x789 box) ---------- */

// Own S-curves on the live anchors (measured from the live tree): every branch leaves the top at y 31.6
// (x 0.6 / 182.8 / 569.6 / 751.7, centre line from y 0) and lands on (376.2, 788.7). Colours = live gradients:
// side branches run horizontally indigo (24%) -> sun (65%) -> magenta (centre); the centre line runs vertically
// (y 29 -> 785) indigo 24% -> sun 55% -> magenta 80%. The same box is stretched to 642x674 (md) and 304x367
// (phone) with preserveAspectRatio none, as on live (stroke scales with it).
const CX = 376.2
const SIDE_X = [0.6, 182.8, 569.6, 751.7]
const sidePath = (x) => `M${x} 31.6C${x} 330 ${CX} 470 ${CX} 788.7`

function Tree({ id, className, svgRef }) {
  return (
    <svg ref={svgRef} viewBox="0 0 752 789" preserveAspectRatio="none" fill="none" aria-hidden="true" className={className}>
      <defs>
        {SIDE_X.map((x, i) => (
          <linearGradient key={x} id={`${id}-${i}`} gradientUnits="userSpaceOnUse" x1={x} y1="410" x2={CX} y2="410">
            <stop offset="0.24" className="stop-indigo" />
            <stop offset="0.65" className="stop-sun" />
            <stop offset="1" className="stop-magenta" />
          </linearGradient>
        ))}
        <linearGradient id={`${id}-c`} gradientUnits="userSpaceOnUse" x1={CX} y1="29.3" x2={CX} y2="785.1">
          <stop offset="0.24" className="stop-indigo" />
          <stop offset="0.55" className="stop-sun" />
          <stop offset="0.8" className="stop-magenta" />
        </linearGradient>
      </defs>
      {SIDE_X.map((x, i) => (
        <path key={x} d={sidePath(x)} stroke={`url(#${id}-${i})`} strokeWidth="2" />
      ))}
      <path d={`M${CX} 0V785.7`} stroke={`url(#${id}-c)`} strokeWidth="2" />
    </svg>
  )
}

// reads the breakpoint's --tree-mask-end (842 / 718 / 417 px) from the mask element
function useCssPx(ref, name) {
  const [v, setV] = useState(0)
  useLayoutEffect(() => {
    const read = () => ref.current && setV(parseFloat(getComputedStyle(ref.current).getPropertyValue(name)) || 0)
    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [ref, name])
  return v
}

export default function Tools() {
  const reduce = useReducedMotion()
  const rowRef = useRef(null)
  const treeRef = useRef(null)
  const maskRef = useRef(null)
  // live (Framer MotionConfig reducedMotion "user", frame-sampled with prefers-reduced-motion: reduce): the reveal still
  // fires; opacity tweens as usual, transforms (y / scale / x) jump to their target at the trigger, delays ignored.
  const reveal = useScrollTrigger(rowRef, { offset: 0 })
  const end = useCssPx(maskRef, '--tree-mask-end')
  const p = useScrubProgress(treeRef, { threshold: 1 })
  const maskY = useTransform(p, (v) => (reduce ? end : v * end))
  return (
    <MotionConfig reducedMotion="user">
    <section
      data-section="tools"
      className="relative h-[463px] w-full overflow-hidden bg-tools-fade px-[10px] pt-[54px] md:h-[892px] md:px-0 md:pt-32 lg:h-[1036px]"
    >
      {/* Tree (live): phone 304x367 at top 120, md 642x674 / lg 752x789 at top 248, centred */}
      <Tree
        svgRef={treeRef}
        id="tools-tree"
        className="absolute left-1/2 top-[120px] h-[367px] w-[304px] -translate-x-1/2 md:top-[248px] md:h-[674px] md:w-[642px] lg:h-[789px] lg:w-[752px]"
      />
      {/* White mask over the tree, rendered at its end position (live end: phone 487, md 916, lg 1040 from the
          section top; mask is tree-wide, tree height + 50 tall (phone + 50), feathered top). */}
      <motion.div
        ref={maskRef}
        data-motion="tools-tree-mask"
        aria-hidden="true"
        className="reveal-mask absolute left-[calc(50%-152px)] top-[70px] h-[417px] w-[304px] [--tree-mask-end:417px] md:left-[calc(50%-321px)] md:top-[198px] md:h-[724px] md:w-[642px] md:[--tree-mask-end:718px] lg:left-[calc(50%-376px)] lg:h-[839px] lg:w-[752px] lg:[--tree-mask-end:842px]"
        style={end ? { translate: 'none', y: maskY } : { translate: '0 var(--tree-mask-end)' }}
      />

      <div ref={rowRef} className="relative z-[2] flex items-start justify-center gap-1.5 md:gap-10 lg:gap-[50px]">
        {TILES.map((t) => (
          <Tile key={t.id} tile={t} reveal={reveal} />
        ))}
      </div>

      {/* Copy block: padding 76px 10px (phone, inside the 10px section padding) / 76px 128px, gap 16 / 12, white-fade bg */}
      <div className="relative z-[1] flex flex-col items-center gap-4 bg-white-fade px-[10px] py-[76px] md:gap-3 md:px-32">
        <h3 className="font-framer text-center font-display text-h3-phone tracking-display-sub text-ink md:text-h3-md md:tracking-display-sub lg:text-h3-lg lg:tracking-display-sub xl:text-h3-xl xl:tracking-display-sub">
          {COPY.h3}
        </h3>
        {/* Phone: Inter 16/19.2 #333 (§16, live). md: 14/19.6 #000; lg+: 16/22.4 #000. */}
        <p className="max-w-tools-body text-center font-inter text-ai-note text-body md:font-sans md:text-para-14-phone md:text-ink lg:text-body-16">
          {COPY.body}
        </p>
      </div>
    </section>
    </MotionConfig>
  )
}
