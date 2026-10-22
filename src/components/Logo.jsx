// Placeholder brand lockup for the fictional "Kestrel" product.
// Geometry matches the original slots (CLONE_SPEC §4 / §16): mark 21x28 + wordmark 99x22, gap 8px.
// Original artwork: a monochrome geometric glyph and a set wordmark (no Lorikeet marks used).

export function KestrelMark({ className = '' }) {
  return (
    <svg
      width="21"
      height="28"
      viewBox="0 0 21 28"
      aria-hidden="true"
      className={`fill-ink-900 ${className}`}
    >
      {/* stem */}
      <rect x="1" y="2" width="5" height="24" rx="1.5" />
      {/* upper wing */}
      <path d="M8 13.2 17.2 2.6c.4-.4.9-.6 1.4-.6H20L10.6 14H8.6c-.5 0-.8-.5-.6-.8Z" />
      {/* lower wing */}
      <path d="M8.6 15.2h2.6l8.6 10.8H17c-.6 0-1.1-.3-1.5-.7L8.6 16.4c-.3-.4 0-1.2 0-1.2Z" opacity=".55" />
    </svg>
  )
}

export function KestrelWordmark({ className = '' }) {
  return (
    <svg width="99" height="22" viewBox="0 0 99 22" aria-hidden="true" className={`fill-ink-900 ${className}`}>
      <text
        x="0"
        y="18"
        textLength="99"
        lengthAdjust="spacingAndGlyphs"
        className="font-display"
        style={{ fontSize: 25 }}
      >
        Kestrel
      </text>
    </svg>
  )
}

// `href` added for the standalone pages (default unchanged).
export default function Logo({ className = '', href = '#' }) {
  return (
    <a href={href} aria-label="Kestrel home" className={`flex items-center gap-2 ${className}`}>
      <KestrelMark />
      <KestrelWordmark />
    </a>
  )
}
