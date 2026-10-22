import { KestrelMark } from '../Logo.jsx'

// J4 stand-in for the cross-origin "MCP Flow Animation (prototype)" iframe (SPEC_PAGES_C T4 J4). Original artwork,
// same footprint: 1240x533 box (max-width 1240, scales with the column: 1152x495.5 @1280, 952x409.5 @1000) and a
// portrait 354x888 layout on phone. Flow, left to right (top to bottom on phone): 4 generic assistant-app tiles ->
// lavender connector curves -> a vertically auto-scrolling column of query chips (faded top/bottom) -> centre Kestrel
// tile -> a scrolling column of filter chips -> a small job card with an indigo "apply" button.
// Motion: chip columns scroll upwards linearly (.mcp-scroll in index.css; static under prefers-reduced-motion).
// Not measured (iframe content): every size, colour and speed inside the box is this build's own choice.

const QUERIES = [
  'Is support hiring picking up?',
  'Who needs conversation designers?',
  'Best AI support roles this week',
  'Remote CX ops roles in Lisbon?',
  'Senior support jobs in Europe',
  'Which teams run AI agents?',
]
const FILTERS = ['Seniority', 'Region', 'Function', 'Work type']
const PITCH = 46 // chip row pitch (px, viewBox units)
const CHIP_H = 30

const chipW = (text, perChar = 6.6) => Math.round(text.length * perChar + 22)

function Chip({ text, cx, y, strong = false }) {
  const w = chipW(text)
  return (
    <g className="mcp-chip">
      <rect x={cx - w / 2} y={y} width={w} height={CHIP_H} rx="6" className="fill-white" />
      <text
        x={cx}
        y={y + 19.5}
        textAnchor="middle"
        className={`font-inter ${strong ? 'fill-ink' : 'fill-jobs-muted'}`}
        style={{ fontSize: 12.5, fontWeight: 500 }}
      >
        {text}
      </text>
    </g>
  )
}

function FilterChip({ text, cx, y }) {
  const w = chipW(text, 6.8) + 14
  return (
    <g className="mcp-chip">
      <rect x={cx - w / 2} y={y} width={w} height={CHIP_H} rx="6" className="fill-white" />
      <rect x={cx - w / 2 + 10} y={y + 11} width="9" height="8" rx="2" className="fill-none stroke-jobs-muted" strokeWidth="1" />
      <text x={cx + 7} y={y + 19.5} textAnchor="middle" className="fill-ink font-inter" style={{ fontSize: 12.5, fontWeight: 500 }}>
        {text}
      </text>
    </g>
  )
}

// Vertically scrolling chip column clipped to a faded window [top, top+height], centred on cx.
function ChipColumn({ id, items, cx, top, height, duration, Item }) {
  const loop = items.length * PITCH
  const all = [...items, ...items, ...items]
  return (
    <g mask={`url(#${id}-fade)`}>
      <defs>
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="stop-mask-off" />
          <stop offset=".22" className="stop-mask-on" />
          <stop offset=".78" className="stop-mask-on" />
          <stop offset="1" className="stop-mask-off" />
        </linearGradient>
        <mask id={`${id}-fade`} maskUnits="userSpaceOnUse" x={cx - 160} y={top} width="320" height={height}>
          <rect x={cx - 160} y={top} width="320" height={height} fill={`url(#${id}-grad)`} />
        </mask>
      </defs>
      <g className="mcp-scroll" style={{ '--mcp-loop': `${loop}px`, animationDuration: `${duration}s` }}>
        {all.map((t, i) => (
          <Item key={i} text={t} cx={cx} y={top + 8 + i * PITCH} strong={i % items.length === 2} />
        ))}
      </g>
    </g>
  )
}

// Generic assistant-app glyphs (deliberately not real product logos).
const APP_GLYPHS = [
  <path key="a" d="M0-11 3 -3 11 0 3 3 0 11-3 3-11 0-3-3Z" className="fill-white" />,
  <circle key="b" r="9" className="fill-none stroke-ink-900" strokeWidth="2.4" />,
  <path key="c" d="M-9 6 0-10 9 6Z" className="fill-white" />,
  <g key="d"><circle cx="-4" r="6" className="fill-brand-indigo" /><circle cx="5" cy="-2" r="6" className="fill-brand-magenta" opacity=".7" /></g>,
]
const APP_FILLS = ['fill-brand-ember', 'fill-white', 'fill-ink-900', 'fill-tint-lavender']

function AppTile({ x, y, size, i }) {
  const s = size / 60
  return (
    <g transform={`translate(${x} ${y})`} className="mcp-chip">
      <rect width={size} height={size} rx={14 * s} className={APP_FILLS[i]} />
      <g transform={`translate(${size / 2} ${size / 2}) scale(${s * 1.3})`}>{APP_GLYPHS[i]}</g>
    </g>
  )
}

function CentreTile({ x, y, size }) {
  const k = (size * 0.55) / 28 // mark height = 55% of the tile
  return (
    <g transform={`translate(${x} ${y})`} className="mcp-chip">
      <rect width={size} height={size} rx={size * 0.21} className="fill-white" />
      <g transform={`translate(${(size - 21 * k) / 2} ${(size - 28 * k) / 2}) scale(${k})`}>
        <KestrelMark />
      </g>
    </g>
  )
}

function MiniJobCard({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} className="font-inter">
      <rect width="202" height="164" rx="10" className="mcp-chip fill-white" />
      <rect x="14" y="14" width="28" height="28" rx="6" className="fill-jobs-logo-tile" />
      <circle cx="28" cy="28" r="7" className="fill-ink" />
      <text x="50" y="25" className="fill-ink" style={{ fontSize: 10, fontWeight: 600 }}>Northwind Labs</text>
      <text x="50" y="37" className="fill-jobs-muted-2" style={{ fontSize: 8 }}>Port Arden</text>
      <text x="188" y="22" textAnchor="end" className="fill-tag-meta-green" style={{ fontSize: 8 }}>2d ago</text>
      <text x="14" y="64" className="fill-ink" style={{ fontSize: 12.5, fontWeight: 500 }}>Support Automation Lead,</text>
      <text x="14" y="80" className="fill-ink" style={{ fontSize: 12.5, fontWeight: 500 }}>AI Agents</text>
      <rect x="14" y="92" width="40" height="15" rx="7.5" className="fill-chip" />
      <text x="34" y="102.5" textAnchor="middle" className="fill-jobs-muted" style={{ fontSize: 7 }}>Remote</text>
      <rect x="58" y="92" width="38" height="15" rx="7.5" className="fill-chip" />
      <text x="77" y="102.5" textAnchor="middle" className="fill-jobs-muted" style={{ fontSize: 7 }}>Senior</text>
      <rect x="14" y="118" width="174" height="1" className="fill-jobs-hairline" />
      <rect x="14" y="129" width="57" height="23" rx="5" className="fill-brand-indigo" />
      <text x="42.5" y="144" textAnchor="middle" className="fill-white" style={{ fontSize: 8.5, fontWeight: 600 }}>Apply →</text>
      <rect x="172" y="132" width="16" height="16" rx="4" className="fill-none stroke-jobs-hairline" />
    </g>
  )
}

const LINE = 'fill-none stroke-brand-indigo'

export default function McpFlowIllustration({ className = '' }) {
  return (
    <div className={`w-full max-w-mcp ${className}`} role="img" aria-label="Illustration: AI assistants send job questions through Kestrel, which filters roles and returns a matching job card">
      {/* tablet / desktop: 1240x533 */}
      <svg viewBox="0 0 1240 533" className="hidden h-auto w-full md:block" aria-hidden="true">
        {[114, 198, 282, 366].map((cy, i) => (
          <g key={cy}>
            <path d={`M101 ${cy} C 165 ${cy}, 170 240, 230 240`} className={LINE} strokeOpacity=".25" strokeWidth="1.2" />
            <AppTile x={41} y={cy - 30} size={60} i={i} />
          </g>
        ))}
        <ChipColumn id="mcp-q" items={QUERIES} cx={376} top={105} height={270} duration={16} Item={Chip} />
        <path d="M525 240H600M742 240H820M950 240H1012" className={LINE} strokeOpacity=".25" strokeWidth="1.2" />
        <CentreTile x={600} y={169} size={142} />
        <ChipColumn id="mcp-f" items={FILTERS} cx={885} top={150} height={180} duration={11} Item={FilterChip} />
        <MiniJobCard x={1012} y={158} />
      </svg>
      {/* phone: 354x888 */}
      <svg viewBox="0 0 354 888" className="block h-auto w-full md:hidden" aria-hidden="true">
        {[57, 137, 217, 297].map((cx, i) => (
          <g key={cx}>
            <path d={`M${cx} 92 C ${cx} 135, 177 130, 177 170`} className={LINE} strokeOpacity=".25" strokeWidth="1.2" />
            <AppTile x={cx - 26} y={40} size={52} i={i} />
          </g>
        ))}
        <ChipColumn id="mcp-qp" items={QUERIES} cx={177} top={180} height={260} duration={16} Item={Chip} />
        <path d="M177 440V478M177 590V600M177 700V716" className={LINE} strokeOpacity=".25" strokeWidth="1.2" />
        <CentreTile x={121} y={478} size={112} />
        <ChipColumn id="mcp-fp" items={FILTERS} cx={177} top={600} height={100} duration={11} Item={FilterChip} />
        <MiniJobCard x={76} y={716} />
      </svg>
    </div>
  )
}
