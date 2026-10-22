// Placeholder customer / partner marks (ASSET_MANIFEST group (b): customer logos must not be reused).
// Each renders a generic monochrome glyph + an original set wordmark for a fictional company, in a box
// of the exact slot geometry (w x h) so layout matches the original slots.
// The original marquee logos are filtered to black (`brightness(0)`, §7) – fill is ink by default.

const SHAPES = {
  circle: <circle cx="12" cy="12" r="10" />,
  square: <rect x="3" y="3" width="18" height="18" rx="4" />,
  triangle: <path d="M12 2.5 22 21H2Z" />,
  diamond: <path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" />,
  ring: <path fillRule="evenodd" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />,
  bars: <path d="M3 4h4v16H3Zm7 4h4v12h-4Zm7-6h4v18h-4Z" />,
  arc: <path d="M2 20a10 10 0 0 1 20 0h-5a5 5 0 0 0-10 0Z" />,
  plus: <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7Z" />,
}

export const SHAPE_NAMES = Object.keys(SHAPES)

// `mark` (added for the cx-jobs logo tiles): glyph only, centred in a w x h box at `markScale` of the short side.
export default function PlaceholderLogo({ name, shape = 'circle', w, h, align = 'left', className = 'fill-ink', mark = false, markScale = 0.5 }) {
  if (mark) {
    const s = Math.min(w, h) * markScale
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${name} logo (placeholder)`} className={`shrink-0 ${className}`}>
        <g transform={`translate(${(w - s) / 2} ${(h - s) / 2}) scale(${s / 24})`}>{SHAPES[shape]}</g>
      </svg>
    )
  }
  // glyph is h*0.8 square; wordmark fills the remaining width (textLength keeps the slot width exact).
  const g = h * 0.8
  const textX = g + h * 0.25
  const textW = Math.max(w - textX, 1)
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={`${name} logo (placeholder)`}
      className={`shrink-0 ${align === 'right' ? 'ml-auto' : ''} ${className}`}
    >
      <g transform={`translate(0 ${(h - g) / 2}) scale(${g / 24})`}>{SHAPES[shape]}</g>
      <text
        x={textX}
        y={h * 0.78}
        textLength={textW}
        lengthAdjust="spacingAndGlyphs"
        className="font-sans font-bold"
        style={{ fontSize: h * 0.82 }}
      >
        {name}
      </text>
    </svg>
  )
}
