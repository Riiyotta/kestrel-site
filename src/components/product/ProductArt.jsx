// ProductArt – static placeholder panel for the content media on the product templates: the T1 hero/callout Rive
// tiles and mux videos (SPEC_PAGES_A T1.1 / T1.7), the 1:1 product-UI screenshots in feature rows (T1.5 / T2.4),
// the coach bento media (T2.7), the voice explainer / case-study images (T2.8 / T2.9) and the video posters.
// The spec classes all of these as brand/content assets -> placeholder of the same box. Each panel is a tint-token
// gradient with a simple, original illustration built from generic Kestrel UI shapes (chat bubbles, cards,
// toggles, bars). No product UI, no text. The SVG is centred and scaled to fit (`meet`), so one drawing works in
// every footprint (542², 472², 600x671, 1200x549, 16:9 posters). Static: no motion (the Rive play/pause logic is moot).
// The parent sets the box (size + radius + overflow); this fills it.

const TINTS = {
  lavender: 'from-tint-lavender via-white to-tint-pink',
  pink: 'from-tint-pink via-white to-tint-lavender',
  yellow: 'from-tint-yellow via-white to-tint-green',
  green: 'from-tint-green via-white to-tint-lavender',
  peach: 'from-tint-peach via-white to-tint-yellow',
  grey: 'from-card-gray via-tag-bg to-white',
  brand: 'from-brand-magenta/80 via-brand-indigo/70 to-brand-sun/60',
}

// shared shapes (viewBox 400x400)
const Lines = ({ x, y, w, n = 2, dark = false }) =>
  Array.from({ length: n }, (_, i) => (
    <rect key={i} x={x} y={y + i * 14} width={i === n - 1 ? w * 0.62 : w} height="7" rx="3.5" className={dark ? 'fill-white/70' : 'fill-card-gray'} />
  ))

function Bubble({ x, y, w, h, n = 2, dark = false }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="16" className={dark ? 'fill-ink-900' : 'fill-white'} />
      <Lines x={x + 16} y={y + (h - (n - 1) * 14 - 7) / 2} w={w - 32} n={n} dark={dark} />
    </g>
  )
}

function Avatar({ cx, cy, r = 12, className = 'fill-brand-indigo' }) {
  return <circle cx={cx} cy={cy} r={r} className={className} />
}

function Check({ cx, cy, r = 9, ok = true }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className={ok ? 'fill-tag-text-green' : 'fill-brand-ember'} />
      {ok ? (
        <path d={`M${cx - 4} ${cy}l3 3 5-6`} className="stroke-white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <rect x={cx - 4} y={cy - 1} width="8" height="2" rx="1" className="fill-white" />
      )}
    </g>
  )
}

function Toggle({ x, y, on = true }) {
  return (
    <g>
      <rect x={x} y={y} width="30" height="16" rx="8" className={on ? 'fill-brand-indigo' : 'fill-card-gray'} />
      <circle cx={on ? x + 22 : x + 8} cy={y + 8} r="6" className="fill-white" />
    </g>
  )
}

const Card = ({ x, y, w, h, className = 'fill-white' }) => <rect x={x} y={y} width={w} height={h} rx="18" className={className} />

const SCENES = {
  // conversation: three alternating bubbles and a composer bar
  chat: (
    <g>
      <Card x={70} y={60} w={260} h={280} className="fill-white/60" />
      <Avatar cx={98} cy={110} r={11} className="fill-brand-magenta" />
      <Bubble x={116} y={88} w={170} h={46} />
      <Bubble x={130} y={150} w={170} h={46} dark />
      <Avatar cx={98} cy={236} r={11} className="fill-brand-magenta" />
      <Bubble x={116} y={212} w={190} h={60} n={3} />
      <rect x={90} y={292} width={220} height={30} rx="15" className="fill-white" />
      <circle cx={295} cy={307} r={10} className="fill-ink-900" />
    </g>
  ),
  // review: a scorecard with graded rows
  review: (
    <g>
      <Card x={80} y={70} w={240} h={260} />
      <rect x={104} y={94} width={96} height={10} rx="5" className="fill-ink-900" />
      <circle cx={282} cy={104} r={20} className="fill-tint-green" />
      <rect x={272} y={100} width={20} height={8} rx="4" className="fill-tag-text-green" />
      {[140, 182, 224, 266].map((y, i) => (
        <g key={y}>
          <Check cx={114} cy={y + 8} ok={i !== 2} />
          <rect x={132} y={y} width={120} height={7} rx="3.5" className="fill-card-gray" />
          <rect x={132} y={y + 12} width={150 - i * 18} height={5} rx="2.5" className={i === 2 ? 'fill-brand-sun' : 'fill-brand-indigo/60'} />
        </g>
      ))}
    </g>
  ),
  // safeguards: shield with a check, flanked by two toggle cards
  shield: (
    <g>
      <path d="M200 70 128 100v52c0 50 30 86 72 104 42-18 72-54 72-104v-52L200 70Z" className="fill-white" />
      <path d="m170 160 22 22 40-44" className="stroke-brand-indigo" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Card x={60} y={278} w={130} h={56} />
      <Toggle x={78} y={298} />
      <rect x={118} y={302} width={54} height={8} rx="4" className="fill-card-gray" />
      <Card x={210} y={278} w={130} h={56} />
      <Toggle x={228} y={298} on={false} />
      <rect x={268} y={302} width={54} height={8} rx="4" className="fill-card-gray" />
    </g>
  ),
  // test runs: a list of scripted runs with pass/fail markers and a progress bar
  test: (
    <g>
      <Card x={70} y={70} w={260} h={260} />
      <rect x={94} y={94} width={212} height={12} rx="6" className="fill-card-gray" />
      <rect x={94} y={94} width={150} height={12} rx="6" className="fill-brand-indigo" />
      {[130, 170, 210, 250, 290].map((y, i) => (
        <g key={y}>
          <rect x={94} y={y} width={212} height={28} rx="10" className="fill-tag-bg" />
          <rect x={108} y={y + 10} width={110 - (i % 3) * 18} height={8} rx="4" className="fill-card-gray" />
          <Check cx={290} cy={y + 14} r={8} ok={i !== 3} />
        </g>
      ))}
    </g>
  ),
  // phone call: handset with a waveform and call controls
  phone: (
    <g>
      <rect x={140} y={50} width={120} height={300} rx="28" className="fill-ink-900" />
      <rect x={150} y={64} width={100} height={272} rx="20" className="fill-white" />
      <Avatar cx={200} cy={118} r={22} className="fill-brand-sun" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const h = [14, 28, 40, 22, 48, 30, 18, 36, 12][i]
        return <rect key={i} x={164 + i * 8} y={200 - h / 2} width="4" height={h} rx="2" className="fill-brand-indigo" />
      })}
      <circle cx={176} cy={296} r={14} className="fill-card-gray" />
      <circle cx={224} cy={296} r={14} className="fill-brand-ember" />
    </g>
  ),
  // outreach: a scheduled-message card sending bubbles outward
  outreach: (
    <g>
      <Card x={60} y={110} w={150} h={170} />
      <rect x={60} y={110} width={150} height={40} rx="18" className="fill-brand-indigo" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={78 + c * 30} y={166 + r * 32} width="20" height="20" rx="6" className={r === 1 && c === 2 ? 'fill-brand-magenta' : 'fill-tag-bg'} />),
      )}
      <path d="M222 196h40" className="stroke-white" strokeWidth="4" strokeDasharray="6 6" strokeLinecap="round" />
      <Bubble x={270} y={110} w={90} h={40} n={1} />
      <Bubble x={270} y={176} w={90} h={40} n={1} dark />
      <Bubble x={270} y={242} w={90} h={40} n={1} />
    </g>
  ),
  // security: padlock over stacked documents
  lock: (
    <g>
      <Card x={96} y={90} w={170} h={210} className="fill-white/70" />
      <Card x={124} y={110} w={170} h={210} />
      <Lines x={148} y={140} w={120} n={4} />
      <path d="M220 212v-20a24 24 0 0 1 48 0v20" className="stroke-ink-900" strokeWidth="10" fill="none" />
      <rect x={204} y={210} width={80} height={64} rx="12" className="fill-ink-900" />
      <circle cx={244} cy={238} r={8} className="fill-brand-sun" />
    </g>
  ),
  // how it works: four connected step nodes
  flow: (
    <g>
      <path d="M120 110h160v90H120v90h160" className="stroke-white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {[
        [120, 110, 'fill-brand-magenta'],
        [280, 110, 'fill-brand-indigo'],
        [120, 290, 'fill-brand-sun'],
        [280, 290, 'fill-tag-text-green'],
      ].map(([cx, cy, cls]) => (
        <g key={`${cx}${cy}`}>
          <circle cx={cx} cy={cy} r={34} className="fill-white" />
          <circle cx={cx} cy={cy} r={14} className={cls} />
        </g>
      ))}
      <Card x={150} y={176} w={100} h={48} />
      <rect x={168} y={196} width={64} height={8} rx="4" className="fill-card-gray" />
    </g>
  ),
  // channels: five tiles around the centre
  channels: (
    <g>
      <circle cx={200} cy={200} r={46} className="fill-white" />
      <circle cx={200} cy={200} r={18} className="fill-ink-900" />
      {[
        [200, 82],
        [312, 162],
        [270, 300],
        [130, 300],
        [88, 162],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M200 200L${x} ${y}`} className="stroke-white" strokeWidth="3" strokeDasharray="4 6" />
          <rect x={x - 26} y={y - 26} width="52" height="52" rx="14" className="fill-white" />
          <rect x={x - 11} y={y - 11} width="22" height="22" rx="6" className={['fill-brand-indigo', 'fill-brand-magenta', 'fill-brand-sun', 'fill-tag-text-green', 'fill-brand-ember'][i]} />
        </g>
      ))}
    </g>
  ),
  // analytics: a line chart card with a legend
  chart: (
    <g>
      <Card x={50} y={80} w={300} h={240} />
      <rect x={74} y={102} width={90} height={9} rx="4.5" className="fill-ink-900" />
      {[150, 190, 230, 270].map((y) => (
        <rect key={y} x={74} y={y} width={252} height={1.5} className="fill-card-gray" />
      ))}
      <path d="M74 260c30-10 40-60 76-50s40 40 70 10 40-70 76-80" className="stroke-brand-indigo" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M74 240c40 10 60-30 90-20s50 30 80 10 50-10 82-30" className="stroke-brand-magenta" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx={80} cy={296} r={5} className="fill-brand-indigo" />
      <rect x={92} y={292} width={50} height={8} rx="4" className="fill-card-gray" />
      <circle cx={164} cy={296} r={5} className="fill-brand-magenta" />
      <rect x={176} y={292} width={50} height={8} rx="4" className="fill-card-gray" />
    </g>
  ),
  // team: three avatars around a shared note
  people: (
    <g>
      <Card x={110} y={150} w={180} h={110} />
      <Lines x={134} y={180} w={132} n={3} />
      <Avatar cx={110} cy={130} r={30} className="fill-brand-sun" />
      <Avatar cx={290} cy={130} r={30} className="fill-brand-magenta" />
      <Avatar cx={200} cy={300} r={30} className="fill-brand-indigo" />
    </g>
  ),
  // inbox: a queue of cards with one highlighted
  queue: (
    <g>
      {[80, 150, 220].map((y, i) => (
        <g key={y}>
          <Card x={70 + i * 6} y={y} w={260 - i * 12} h={56} className={i === 1 ? 'fill-ink-900' : 'fill-white'} />
          <Avatar cx={100 + i * 6} cy={y + 28} r={12} className={i === 1 ? 'fill-brand-sun' : 'fill-card-gray'} />
          <Lines x={124 + i * 6} y={y + 18} w={150} n={2} dark={i === 1} />
        </g>
      ))}
      <rect x={150} y={300} width={100} height={30} rx="15" className="fill-brand-indigo" />
    </g>
  ),
}

export const ART_SCENES = Object.keys(SCENES)

export default function ProductArt({ scene = 'chat', tint = 'lavender', className = '' }) {
  return (
    <div data-ui="product-art" aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${TINTS[tint] || TINTS.lavender} ${className}`}>
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
        {SCENES[scene] || SCENES.chat}
      </svg>
    </div>
  )
}
