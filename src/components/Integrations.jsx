import { useAnimationFrame, useMotionValue, motion } from 'framer-motion'
import { mirrorLoop, sinceHydration, useReducedMotion } from '../lib/motion.js'

// SYSTEM-FIND / INTEGRATIONS – CLONE_SPEC §11 (1440; §15 identical structure at 1200–1439), §16 (phone).
// 810–1199 = live Tablet variant (column: headline over a 710x925 connector tree with 56px tiles). Phone and tablet
// tiles/tree overflow the section bottom (live section is overflow-visible there) and are partly covered by the
// playbook header's white fade, exactly as on live.
// [data-motion="integration-tile"]: time-based mirror loops (see the Motion note below); data-loop = distance/duration.

// Motion (live Framer bundle: __framer__loop on each tile container, repeatType "mirror", linear tween, all tiles start
// at phase 0 when Framer hydrates the page (LIVE_HYDRATION_S in motion.js), running offscreen too,
// not scroll-linked – the spec's "k * scrollY" was the loop drifting while the page was scrolled):
//   desktop tiles 1..8: y 0 -> -206 / 258 / -258 / 200 / -199 / 258 / -258 / 203 px over 15 / 80 / 60 / 15 / 10 / 70 / 25 / 30 s
//   tablet + phone tiles 1..8: y 0 -> 74 / 62 / -55 / -34 / 65 / 18 / -38 / -27 px, all 20 s
// The static tops below are live snapshots (desktop taken ~10.5s after load) and stay the reduced-motion frame; with
// motion on, transform = loop(t - hydration) - loop(phase), where loop(phase) = static top - live layout top, so the
// tile sits at the live layout top before hydration and then tracks live's phase.

const COPY = {
  h2: 'Kestrel uses your own tools to settle issues from start to end',
  // ~530 chars (live 568 in Ginto; Inter sets wider): 9 lines @lg (500px, 16/22.4), 8 @md (14/19.6), 12 @phone (313px)
  sub: 'Kestrel runs inside the platforms your team already relies on, from help desk and CRM to billing, order management and identity systems, and settles requests by taking real actions through your own APIs. There is nothing to migrate and no new inbox to learn: your existing workflows, permissions and audit trails stay exactly where they are. Every plan includes hands-on onboarding, and you can replay Kestrel against thousands of real past tickets to see how it would have handled each one before a single customer ever meets it.',
}

// Third-party integration logos (group (b)) -> generic monochrome shapes, 39x39 (phone 28x28).
const MARKS = [
  <path key="0" d="M4 4h31L4 35h31" fill="none" strokeWidth="5" strokeLinejoin="round" />,
  <path key="1" d="M6 30 19 6l14 24Zm6-3h14L19 14Z" />,
  <rect key="2" x="5" y="5" width="29" height="29" rx="6" fill="none" strokeWidth="5" />,
  <path key="3" d="M8 8l10 0 0 10-10 0Zm13 13h10v10H21Zm0-13h10v10H21Z" />,
  <circle key="4" cx="19.5" cy="19.5" r="14" fill="none" strokeWidth="5" />,
  <path key="5" d="M6 33 33 6M6 22 22 6M17 33 33 17" fill="none" strokeWidth="4.5" strokeLinecap="round" />,
  <path key="6" d="M19.5 4 35 19.5 19.5 35 4 19.5Z" />,
  <path key="7" d="M5 14a9 9 0 0 1 18 0 7 7 0 0 1 11 6 7 7 0 0 1-7 7H11a7 7 0 0 1-6-13Z" />,
]

// Desktop tiles: stack-relative x = i * 87 (4 x 67 + 3 x 20 gap = 328); stack is 423 tall, vertically centred in
// the 554 section (stack top 65.5). Tops = live, section centred in the viewport.
const LEFT = [
  { top: 162.5 },
  { top: 83.5 },
  { top: 261.5 },
  { top: 189.5 },
]
const RIGHT = [
  { top: 115.5 },
  { top: 88.5 },
  { top: 198.5 },
  { top: 120.5 },
]

// one shared clock for all tiles
const DESKTOP_LOOP = [
  [-206, 15], [258, 80], [-258, 60], [200, 15], [-199, 10], [258, 70], [-258, 25], [203, 30],
]
const SMALL_LOOP = [74, 62, -55, -34, 65, 18, -38, -27].map((d) => [d, 20])
// static top - live layout top (px): desktop = live snapshot at t = 10.5s; tablet / phone from live layout tops
const DESKTOP_SNAP_T = 10.5
const TABLET_OFFSET = [58, 48, -45, -28, 51, 13, -32, -23]
const PHONE_OFFSET = [66, 56, -47, -29, 58, 17, -32, -22]

function phaseFor(offset, distance, duration) {
  // first (outbound) half of the mirror loop: loop(phase) = offset
  return Math.min(1, Math.max(0, offset / distance)) * duration
}

function useLoopY(loop, phase) {
  const reduce = useReducedMotion()
  const y = useMotionValue(0)
  useAnimationFrame(() => {
    if (reduce || !loop) return
    const [d, T] = loop
    // live: every loop starts at phase 0 when Framer hydrates (LIVE_HYDRATION_S after navigation start), tiles sit at
    // their layout top until then. The static top already includes loop(phase) (snapshot = reduced-motion frame), so
    // subtract it: position = live layout top + loop(time since hydration).
    y.set(mirrorLoop(Math.max(0, sinceHydration()), d, T) - mirrorLoop(0, d, T, phase))
  })
  return y
}

function Tile({ mark, size = 'lg', className = '', style, loop, phase = 0, ...rest }) {
  const y = useLoopY(loop, phase)
  // 67x67 padding 14 logo 39 (desktop) / 56x56 padding 12 logo 32 (md) / 52x52 padding 12 logo 28 (phone);
  // white, radius 8, tile shadow
  const box = { lg: 'h-[67px] w-[67px] p-[14px]', md: 'h-[56px] w-[56px] p-3', sm: 'h-[52px] w-[52px] p-3' }[size]
  return (
    <motion.div
      data-motion="integration-tile"
      data-loop={loop ? `${loop[0]}px/${loop[1]}s` : undefined}
      className={`absolute flex items-center justify-center rounded-sm bg-white shadow-tile ${box} ${className}`}
      style={{ ...style, y }}
      {...rest}
    >
      <svg viewBox="0 0 39 39" aria-hidden="true" className="h-full w-full fill-ink-900 stroke-ink-900">
        {MARKS[mark]}
      </svg>
    </motion.div>
  )
}

function Stack({ tiles, offset }) {
  return (
    <div className="relative h-[423px] w-[328px] shrink-0">
      {tiles.map((t, i) => (
        <Tile
          key={i}
          mark={offset + i}
          data-tile={offset + i + 1}
          loop={DESKTOP_LOOP[offset + i]}
          phase={DESKTOP_SNAP_T}
          style={{ left: i * 87, top: t.top }}
        />
      ))}
    </div>
  )
}

/* ---------- connector line art (original SVG paths on the live anchors) ---------- */

// One loop per tile column and side: from the centre line, a horizontal run (top) to the column edge with
// radius-r corners, down the edge, back along a bottom run to the centre. Anchors measured on live:
//   desktop (centre-relative, 1440 box): edges ±572 / ±491 / ±410 / ±315, runs at y 61.4 / 482, r 60, line 0 -> 554
//   tablet 710x925 box: edges 4.1 / 52.1 / 104.5 / 163.2 (+ mirrors), runs 76.8 / 497.3, r 60, loops 4.4 -> 600,
//     then a centre line 599 -> 920
//   phone 316x603 box: edges 4 / 41.2 / 80.6 / 119.5 (+ mirrors), runs 118.7 / 390, r 18, loops 72 -> 464, then a
//     centre line 464 -> 602
// Gradients (live): loops magenta 15.4% -> sun 46.6% -> indigo 80.3% top to bottom.
const loopPath = ({ cx, x, top, t, b, end, r }) => {
  const s = x < cx ? -1 : 1 // -1 = loop to the left
  const sw = s < 0 ? [1, 0, 0, 1] : [0, 1, 1, 0]
  return [
    `M${cx} ${top}V${t - r}`,
    `A${r} ${r} 0 0 ${sw[0]} ${cx + s * r} ${t}`,
    `H${x - s * r}A${r} ${r} 0 0 ${sw[1]} ${x} ${t + r}`,
    `V${b - r}A${r} ${r} 0 0 ${sw[2]} ${x - s * r} ${b}`,
    `H${cx + s * r}A${r} ${r} 0 0 ${sw[3]} ${cx} ${b + r}`,
    `V${end}`,
  ].join('')
}

function LoopGradient({ id, y1, y2 }) {
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1={y1} x2="0" y2={y2}>
      <stop offset="0.154" className="stop-magenta" />
      <stop offset="0.466" className="stop-sun" />
      <stop offset="0.803" className="stop-indigo" />
    </linearGradient>
  )
}

const DESKTOP_EDGES = [-572, -491, -410, -315, 315, 410, 491, 572]

function DesktopLines() {
  return (
    <svg
      viewBox="0 0 1440 554"
      fill="none"
      aria-hidden="true"
      className="absolute left-[calc(50%-720px)] top-0 hidden h-[554px] w-[1440px] max-w-none lg:block"
    >
      <defs>
        <LoopGradient id="integrations-grad" y1="-11" y2="638" />
      </defs>
      {DESKTOP_EDGES.map((dx) => (
        <path
          key={dx}
          d={loopPath({ cx: 720, x: 720 + dx, top: -11, t: 61.4, b: 482, end: 554, r: 60 })}
          stroke="url(#integrations-grad)"
          strokeWidth="2"
        />
      ))}
    </svg>
  )
}

const TABLET_EDGES = [4.1, 52.1, 104.5, 163.2, 546.9, 605.6, 658, 706]
// tablet tiles (live, section-relative; dx from the section centre)
const TABLET_TILES = [
  { dx: -382, y: 724, mark: 0 },
  { dx: -328, y: 488, mark: 1 },
  { dx: -274, y: 661, mark: 2 },
  { dx: -220, y: 452, mark: 3 },
  { dx: 162, y: 717, mark: 4 },
  { dx: 216, y: 483, mark: 5 },
  { dx: 270, y: 674, mark: 6 },
  { dx: 324, y: 487, mark: 7 },
]

function TabletArt() {
  return (
    <div className="hidden md:block lg:hidden" aria-hidden="true">
      <svg viewBox="0 0 710 925" fill="none" className="absolute left-[calc(50%-355px)] top-[323px] h-[925px] w-[710px] overflow-visible">
        <defs>
          <LoopGradient id="integrations-grad-tablet" y1="4.4" y2="653" />
          <linearGradient id="integrations-grad-tablet-tail" gradientUnits="userSpaceOnUse" x1="0" y1="599" x2="0" y2="920">
            <stop offset="0" className="stop-indigo" />
            <stop offset="0.5" className="stop-sun" />
            <stop offset="1" className="stop-magenta" />
          </linearGradient>
        </defs>
        {TABLET_EDGES.map((x) => (
          <path key={x} d={loopPath({ cx: 355, x, top: 4.4, t: 76.8, b: 497.3, end: 600, r: 60 })} stroke="url(#integrations-grad-tablet)" strokeWidth="2" />
        ))}
        <path d="M355 599V920" stroke="url(#integrations-grad-tablet-tail)" strokeWidth="2" />
      </svg>
      {TABLET_TILES.map((t, i) => (
        <Tile
          key={i}
          size="md"
          mark={t.mark}
          data-tile={i + 1}
          loop={SMALL_LOOP[i]}
          phase={phaseFor(TABLET_OFFSET[i], ...SMALL_LOOP[i])}
          style={{ left: `calc(50% + ${t.dx}px)`, top: t.y }}
        />
      ))}
    </div>
  )
}

const PHONE_EDGES = [4, 41.2, 80.6, 119.5, 195.9, 234.8, 274.1, 311.4]
// phone tiles (live @390, section-relative; dx from the section centre)
const PHONE_TILES = [
  { dx: -180, y: 721, mark: 0 },
  { dx: -142, y: 604, mark: 1 },
  { dx: -104, y: 648, mark: 2 },
  { dx: -66, y: 559, mark: 3 },
  { dx: 11, y: 713, mark: 4 },
  { dx: 49, y: 595, mark: 5 },
  { dx: 87, y: 663, mark: 6 },
  { dx: 125, y: 596, mark: 7 },
]

function PhoneArt() {
  return (
    <div className="md:hidden" aria-hidden="true">
      <svg viewBox="0 0 316 603" fill="none" className="absolute left-[calc(50%-158px)] top-[406px] h-[603px] w-[316px] overflow-visible">
        <defs>
          <LoopGradient id="integrations-grad-phone" y1="72" y2="490.6" />
        </defs>
        {PHONE_EDGES.map((x) => (
          <path key={x} d={loopPath({ cx: 157.7, x, top: x === 311.4 ? 0.5 : 72, t: 118.7, b: 390, end: 464, r: 18 })} stroke="url(#integrations-grad-phone)" strokeWidth="1" />
        ))}
        <path d="M157.7 464V602" stroke="url(#integrations-grad-phone)" strokeWidth="1" />
      </svg>
      {PHONE_TILES.map((t, i) => (
        <Tile
          key={i}
          size="sm"
          mark={t.mark}
          data-tile={i + 1}
          loop={SMALL_LOOP[i]}
          phase={phaseFor(PHONE_OFFSET[i], ...SMALL_LOOP[i])}
          style={{ left: `calc(50% + ${t.dx}px)`, top: t.y }}
        />
      ))}
    </div>
  )
}

export default function Integrations() {
  return (
    <section
      data-section="integrations"
      className="relative flex h-[609px] w-full flex-col items-center bg-white px-[10px] md:h-[755px] md:px-0 lg:h-[554px] lg:flex-row lg:justify-center lg:overflow-hidden lg:px-32"
    >
      <DesktopLines />
      <TabletArt />
      <PhoneArt />

      <div className="relative hidden lg:block">
        <Stack tiles={LEFT} offset={0} />
      </div>

      {/* Headline column: phone full width, padding 56px 0, gap 16; md 568 wide, padding 56px 0, gap 12 (both on a
          white-fade bg, live); lg 568 wide, no padding/bg, vertically centred. */}
      <div className="relative z-[1] flex w-full flex-col items-center gap-4 bg-white-fade py-14 md:w-[568px] md:shrink-0 md:gap-3 lg:bg-none lg:py-0">
        <h2 className="max-w-system-phone-h font-framer text-center font-display text-h3-phone tracking-display-sub text-ink md:max-w-system md:text-h3-md md:tracking-display-sub lg:text-h3-lg lg:tracking-display-sub xl:text-h3-xl xl:tracking-display-sub">
          {COPY.h2}
        </h2>
        <p className="max-w-system-phone text-center font-sans text-para-14-phone text-ink md:max-w-system lg:text-body-16">
          {COPY.sub}
        </p>
      </div>

      <div className="relative hidden lg:block">
        <Stack tiles={RIGHT} offset={4} />
      </div>
    </section>
  )
}
