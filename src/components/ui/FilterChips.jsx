import { useState } from 'react'
import './ui.css'

// FilterChips – every single-select filter row in the templates, one component with four looks.
// Selection is local UI state (controlled via value/onChange, or uncontrolled via defaultValue); filtering the
// list and syncing the URL (?selected-category= / ?topic=) is the template's job.
//
// variant "story"   SPEC_PAGES_B T1 category chips. 36 tall: 1px ring (bg #E5E5E5, selected #999) > fill (#FFF,
//                   selected = theme light; padding 8px 10px, radius 50) > 18px theme-dot circle holding a 12px
//                   glyph in theme dark + label Ginto Medium 14/14 theme dark (All: #1A1A1A), gap 5.23. Row gap 8,
//                   centred; phone: left-aligned horizontal scroller, label 11/14. No hover. Select: fill
//                   white -> theme light in ~425ms (fitted cubic-bezier(.75,0,.35,.85)).
//                   item.theme: 'pink' | 'yellow' | 'red' | 'green' | 'neutral' (B §1.1).
// variant "tabs"    SPEC_PAGES_B T3 "Browse all" tabs. 38 tall, padding 4px 12px, bg #FBFBFB, radius 100, 1px ring
//                   #DEDEDE (active #000), label Ginto 18/30 −0.36 (18/23 <1440). Hover bg #CCCCCC (~200ms ease).
//                   Row gap 8; phone row scrolls horizontally.
// variant "topic"   SPEC_PAGES_B T5 TopicBar chips. 36 tall, padding 0 14px, radius 999, gap 8; label Ginto Medium
//                   14/14 + count 12/12 at opacity .5. Active bg #1A1A1A / text #FFF; inactive bg #F4F4F4 / text
//                   #3C3C3C, hover #EAEAEA; transition bg .2s cubic-bezier(.65,0,.35,1), colour .2s.
// variant "sidebar" SPEC_PAGES_A T3.3 integration category list. Column gap 8; items 42 tall, padding 10px 8px,
//                   radius 8, label Ginto 16/22.4 #666. Hover bg #E0E0E0 + label #000; active label #000 + bg #CCCCCC
//                   (live value read while hovered – the un-hovered active bg was not measured). Instant.
// `itemClassName` (optional, added for the A T3.3 tablet chip row) is appended to every item button.

const THEME = {
  pink: { fill: 'bg-tint-pink', text: 'text-tag-text-pink', dot: 'bg-tint-dot-pink' },
  yellow: { fill: 'bg-tint-yellow', text: 'text-tag-text-yellow', dot: 'bg-tint-dot-yellow' },
  red: { fill: 'bg-tint-red', text: 'text-tag-text-red', dot: 'bg-tint-dot-red' },
  green: { fill: 'bg-tint-green', text: 'text-tag-text-green', dot: 'bg-tint-dot-green' },
  neutral: { fill: 'bg-card-gray', text: 'text-ink-900', dot: 'bg-tint-dot-neutral' },
}

// Generic 12px chip glyphs (the live category icons are brand glyphs -> own shapes).
const GLYPHS = {
  dot: <circle cx="6" cy="6" r="3" />,
  coin: <path d="M6 1.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2.2a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6Z" />,
  cross: <path d="M4.8 1.5h2.4v3.3h3.3v2.4H7.2v3.3H4.8V7.2H1.5V4.8h3.3Z" />,
  bolt: <path d="M7 1 2.5 7h3l-1 4L9.5 5h-3Z" />,
  stack: <path d="M6 1.5 10.5 4 6 6.5 1.5 4Zm-4.5 4L6 8l4.5-2.5V7L6 9.5 1.5 7Z" />,
}

export default function FilterChips({ items = [], value, defaultValue, onChange, variant = 'tabs', label = 'Filter', itemClassName = '', className = '' }) {
  const [inner, setInner] = useState(defaultValue ?? items[0]?.id)
  const current = value !== undefined ? value : inner
  const select = (id) => {
    if (value === undefined) setInner(id)
    onChange?.(id)
  }

  const rowCls = {
    story: 'flex gap-2 overflow-x-auto md:justify-center md:overflow-visible',
    tabs: 'flex gap-2 overflow-x-auto pt-4 md:flex-wrap md:overflow-visible',
    topic: 'flex gap-2 overflow-x-auto',
    sidebar: 'flex flex-col gap-2',
  }[variant]

  return (
    <div role="group" aria-label={label} data-ui="filter-chips" data-variant={variant} className={`ui-noscrollbar ${rowCls} ${className}`}>
      {items.map((item) => {
        const on = item.id === current
        if (variant === 'story') {
          const th = THEME[item.theme] || THEME.neutral
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onClick={() => select(item.id)}
              className={`h-9 shrink-0 rounded-hero-tag p-px ${on ? 'bg-silver' : 'bg-card-gray'}`}
            >
              <span
                className={`flex h-full items-center gap-[5.23px] rounded-hero-tag px-2.5 py-2 transition-colors duration-[425ms] ease-[cubic-bezier(0.75,0,0.35,0.85)] motion-reduce:transition-none ${on ? th.fill : 'bg-white'}`}
              >
                <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-full p-px ${th.dot}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={`fill-current ${th.text}`}>
                    {GLYPHS[item.glyph] || GLYPHS.dot}
                  </svg>
                </span>
                <span className={`whitespace-nowrap font-sans font-medium text-name-11 md:text-label ${th.text}`}>{item.label}</span>
              </span>
            </button>
          )
        }
        if (variant === 'tabs') {
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onClick={() => select(item.id)}
              className={`h-[38px] shrink-0 whitespace-nowrap rounded-announce bg-meta-card px-3 py-1 font-sans text-tab-18-tight text-ink transition-colors duration-200 ease-in-out hover:bg-preview-border motion-reduce:transition-none xl:text-tab-18 ${
                on ? 'shadow-[inset_0_0_0_1px_theme(colors.ink.DEFAULT)]' : 'shadow-[inset_0_0_0_1px_theme(colors.tab-ring)]'
              }`}
            >
              {item.label}
            </button>
          )
        }
        if (variant === 'topic') {
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onClick={() => select(item.id)}
              className={`flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-nav-pill px-3.5 font-sans font-medium text-label transition-colors duration-200 ease-ui motion-reduce:transition-none ${
                on ? 'bg-ink-900 text-white' : 'bg-chip-soft text-chip-soft-text hover:bg-chip-soft-hover'
              }`}
            >
              {item.label}
              {item.count != null ? <small className="font-normal text-name-12 opacity-50">{item.count}</small> : null}
            </button>
          )
        }
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={on}
            onClick={() => select(item.id)}
            className={`flex h-[42px] w-full items-center rounded-sm px-2 py-2.5 text-left font-sans text-body-16 hover:bg-filter-hover hover:text-ink ${on ? 'bg-preview-border text-ink' : 'text-muted'} ${itemClassName}`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
