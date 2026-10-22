import { useState } from 'react'

// ShareRail – SPEC_PAGES_B T4 (blog post) + T6 (article), fixed right, >=1200 only.
//   position fixed, right 24, top 50% (translateY −50%), 52 wide, column gap 6, padding 8, radius 999,
//   bg rgba(255,255,255,.9), backdrop blur 12, shadow 0 0 0 1px rgba(0,0,0,.06) + 0 8px 24px −8px rgba(0,0,0,.12).
//   Items: 36x36 round buttons with 18px #1A1A1A icons – copy link, two share links, a 20x1 #E5E5E5 divider, then
//   "summarise with an assistant" links (third-party glyphs -> generic placeholder icons).
//   Hover: bg -> #F4F6F8 (background-color .2s; live also tweens transform .2s cubic-bezier(.65,0,.35,1), but the
//   transform value was not captured – none here). Tooltip 10px to the left: bg #1A1A1A, radius 6, padding 6px 8px,
//   Ginto 12/14 #FFF, fades in (opacity .15s) sliding from translateX(4px) to 0.
//   Below 1200 live swaps to an inline "Share" chip (not fully measured) – not rendered here.
// Copy link writes the current URL to the clipboard (local only). Share hrefs default to '#'.

const ICONS = {
  link: (
    <path d="M7.5 10.5a3 3 0 0 0 4.24 0l2.5-2.5a3 3 0 0 0-4.24-4.24l-.75.75M10.5 7.5a3 3 0 0 0-4.24 0l-2.5 2.5a3 3 0 0 0 4.24 4.24l.75-.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  ),
  network: (
    <path d="M3 3.5h12v11H3zM6 7.5v4M6 5.6v.1M9 11.5V9.3a1.6 1.6 0 0 1 3.2 0v2.2M9 7.5v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  post: <path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />,
  spark: <path d="M9 2.5 10.6 7.4 15.5 9l-4.9 1.6L9 15.5l-1.6-4.9L2.5 9l4.9-1.6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />,
  bubble: <path d="M3.5 4.5h11v7h-6l-3 2.5v-2.5h-2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />,
  orbit: (
    <g fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="9" cy="9" r="2.2" />
      <ellipse cx="9" cy="9" rx="6.5" ry="3" transform="rotate(-30 9 9)" />
    </g>
  ),
  grid: <path d="M3.5 3.5h4.5V8H3.5zM10 3.5h4.5V8H10zM3.5 10H8v4.5H3.5zM10 10h4.5v4.5H10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />,
}

export const DEFAULT_SHARE_ITEMS = [
  { id: 'copy', label: 'Copy link', icon: 'link', action: 'copy' },
  { id: 'li', label: 'Share on LinkedIn', icon: 'network', href: '#' },
  { id: 'x', label: 'Share on X', icon: 'post', href: '#' },
  { id: 'div', divider: true },
  { id: 'ai1', label: 'Summarise with assistant A', icon: 'spark', href: '#' },
  { id: 'ai2', label: 'Summarise with assistant B', icon: 'bubble', href: '#' },
  { id: 'ai3', label: 'Summarise with assistant C', icon: 'orbit', href: '#' },
  { id: 'ai4', label: 'Summarise with assistant D', icon: 'grid', href: '#' },
]

function Tip({ children }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute right-full top-1/2 mr-2.5 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-photo-sm bg-ink-900 px-2 py-1.5 font-sans text-tip-12 text-white opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
    >
      {children}
    </span>
  )
}

export default function ShareRail({ items = DEFAULT_SHARE_ITEMS, className = '' }) {
  const [copied, setCopied] = useState(false)
  const btn =
    'group relative flex h-9 w-9 items-center justify-center rounded-full text-ink-900 transition-colors duration-200 ease-ui hover:bg-share-hover motion-reduce:transition-none'
  return (
    <aside
      aria-label="Share"
      data-ui="share-rail"
      className={`fixed right-6 top-1/2 z-[31] hidden w-[52px] -translate-y-1/2 flex-col items-center gap-1.5 rounded-nav-pill bg-share-bg p-2 shadow-share-rail backdrop-blur-share lg:flex ${className}`}
    >
      {items.map((it) => {
        if (it.divider) return <span key={it.id} aria-hidden="true" className="h-px w-5 bg-card-gray" />
        const icon = (
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            {ICONS[it.icon] || ICONS.link}
          </svg>
        )
        if (it.action === 'copy') {
          return (
            <button
              key={it.id}
              type="button"
              aria-label={it.label}
              className={btn}
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href).then(
                  () => setCopied(true),
                  () => {},
                )
                setTimeout(() => setCopied(false), 1500)
              }}
            >
              {icon}
              <Tip>{copied ? 'Copied' : it.label}</Tip>
            </button>
          )
        }
        return (
          <a key={it.id} href={it.href || '#'} aria-label={it.label} className={btn}>
            {icon}
            <Tip>{it.label}</Tip>
          </a>
        )
      })}
    </aside>
  )
}
