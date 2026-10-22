import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import LetterReveal from './LetterReveal.jsx'
import { CARDS_OPEN, FAQ_PANEL, PLUS_ROTATE, ROWS_SPRING } from '../../lib/uiMotion.js'
import { CIRKA, H3_SCALE, QUOTE_SCALE } from './type.js'
import './ui.css'

// FaqAccordion – every collapsible FAQ in the templates, one component with four looks.
//
// look "panel"    SPEC_PAGES_A T5.4 (pricing P7). Item padding 20px 10px, radius 10, bg #FFF -> hover #F7F7F7,
//                 open bg #F7F7F7; question Cirka 30/30 −1.2 #000 + 21x21 chevron (rotates 180deg open); answer
//                 Ginto 16/22.4 #000, 20 below the question. Height + answer opacity: spring {duration .6, bounce 0}.
//                 List column gap 20. With `title` + layout "sidebar": 40% title column (padding 40, sticky top
//                 120) holding a Cirka 40/36 −1.6 H2 with the per-letter reveal (LetterReveal) + 60% list column
//                 (padding 8px 40px 8px 0). Section padding-top 100.
// look "rows"     SPEC_PAGES_B T7 QuestionAccordion. 900 max, gap 32 (24 phone); item 71 tall, padding 20px 10px,
//                 white, radius 10; question Cirka 30/30 -> 28 -> 26 -> 24, max-w 80%; 21x21 caret #252E3D.
//                 Open: height + opacity spring k400 / c40.
// look "hairline" SPEC_PAGES_B R.6 (article FAQ). Question Ginto 20/26 −0.2 (18/24 −0.18 phone), padding 20px 48px
//                 20px 0, border-top 1px #E8E8E8; 28px #F4F4F4 circle with a #111 plus (stroke 1.8) that rotates
//                 45deg in 0.3s ease-in-out; answer Ginto 17/26 rgba(0,0,0,.75), mt 20, shown/hidden instantly
//                 (display none on live). First item open by default.
// look "cards"    SPEC_PAGES_B T8 FaqCards. 900 max, gap 18; item padding 18, white, radius 16, 1px #EBECED, layered
//                 shadow; question Cirka 26/26 #0F0F10; "+"/"−" Cirka 28/28 #5A616E; answer Ginto 18/34.2 #595959,
//                 mt 16; opens in ~150ms (height auto, ease-out .2s, opacity .84 -> 1). All closed by default.
// Items toggle independently (`single` makes it one-open-at-a-time). Answers are inline HTML (links #4348DC).
// prefers-reduced-motion: open/close is instant.

function Chevron({ className = '' }) {
  return (
    <svg width="21" height="21" viewBox="0 0 256 256" aria-hidden="true" className={className} fill="currentColor">
      <path d="M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

function PlusCircle({ open, reduce }) {
  return (
    <span aria-hidden="true" className="absolute right-0 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-chip-soft">
      <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-toc-tick" animate={{ rotate: open ? 45 : 0 }} transition={reduce ? { duration: 0 } : PLUS_ROTATE}>
        <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </motion.svg>
    </span>
  )
}

const DEFAULT_OPEN = { panel: [], rows: [], hairline: [0], cards: [] }

function Answer({ html, className }) {
  return <p className={`ui-inline ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
}

function Collapse({ open, transition, initialOpacity = 0, children }) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="a"
          className="overflow-hidden"
          initial={{ height: 0, opacity: initialOpacity }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: initialOpacity }}
          transition={transition}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Item({ item, look, open, onToggle, reduce }) {
  const id = useId()
  const T = (t) => (reduce ? { duration: 0 } : t)

  if (look === 'hairline') {
    return (
      <div data-faq-item>
        <h3 className="m-0">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={onToggle}
            className="relative w-full py-5 pr-12 text-left font-sans text-faq-q-phone text-ink shadow-[inset_0_1px_0_theme(colors.hairline)] md:text-faq-q"
          >
            {item.q}
            <PlusCircle open={open} reduce={reduce} />
          </button>
        </h3>
        <div id={id} hidden={!open}>
          <Answer html={item.a} className="mt-5 font-sans text-body-17 text-body-75" />
        </div>
      </div>
    )
  }

  if (look === 'cards') {
    return (
      <section data-faq-item className="rounded-card border border-faq-border bg-white p-[18px] shadow-faq-card">
        <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className="flex w-full items-center justify-between gap-4 text-left">
          <span className={`${CIRKA} text-faq-card-q text-ink-deep`}>{item.q}</span>
          <span aria-hidden="true" className={`${CIRKA} flex h-7 w-7 shrink-0 items-center justify-center text-faq-glyph text-faq-plus`}>
            {open ? '−' : '+'}
          </span>
        </button>
        <div id={id}>
          <Collapse open={open} transition={T(CARDS_OPEN)} initialOpacity={0.84}>
            <Answer html={item.a} className="pt-4 font-sans text-body-18-loose text-muted-4" />
          </Collapse>
        </div>
      </section>
    )
  }

  // panel + rows share the white rounded row
  const panel = look === 'panel'
  return (
    <div
      data-faq-item
      className={`rounded-tile px-2.5 py-5 ${panel ? (open ? 'bg-tag-bg' : 'bg-white hover:bg-tag-bg') : 'bg-white'}`}
    >
      <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className="flex w-full items-center justify-between gap-4 text-left">
        <span className={`text-ink ${panel ? `${CIRKA} text-quote tracking-display-sub` : `max-w-[80%] ${QUOTE_SCALE}`}`}>{item.q}</span>
        {panel ? (
          <motion.span className="flex shrink-0 text-ink" animate={{ rotate: open ? 180 : 0 }} transition={T(FAQ_PANEL)}>
            <Chevron />
          </motion.span>
        ) : (
          <span className="flex shrink-0 text-faq-icon">
            <Chevron />
          </span>
        )}
      </button>
      <div id={id}>
        <Collapse open={open} transition={T(panel ? FAQ_PANEL : ROWS_SPRING)}>
          {/* rows: answer style + spacing not measured on live (rendered only when open) – spec's suggested
              Ginto 16/22.4 #666 and the panel look's 20px gap are used */}
          <Answer html={item.a} className={`pt-5 font-sans text-body-16 ${panel ? 'text-ink' : 'text-muted'}`} />
        </Collapse>
      </div>
    </div>
  )
}

export default function FaqAccordion({ items = [], look = 'panel', title, layout = 'sidebar', single = false, defaultOpen, className = '' }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(() => new Set(defaultOpen ?? DEFAULT_OPEN[look] ?? []))
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(single ? [] : prev)
      if (prev.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  const LIST_GAP = { panel: 'gap-5', rows: 'gap-6 md:gap-8', hairline: 'gap-0', cards: 'gap-[18px]' }
  const list = (
    <div data-ui="faq-list" data-look={look} className={`flex w-full flex-col ${LIST_GAP[look]} ${look === 'rows' || look === 'cards' ? 'mx-auto max-w-[900px]' : ''}`}>
      {items.map((item, i) => (
        <Item key={i} item={item} look={look} open={open.has(i)} onToggle={() => toggle(i)} reduce={reduce} />
      ))}
    </div>
  )

  if (look === 'panel' && title && layout === 'sidebar') {
    // A T5.4: 1280 row; title column 512 (40%, padding 40, sticky top 120) + list column 768 (padding 8px 40px 8px 0).
    // Below 1200 not measured: stacked (title above the list) with the same paddings.
    return (
      <section data-ui="faq-accordion" className={`mx-auto flex w-full max-w-container flex-col pt-[100px] lg:flex-row ${className}`}>
        <div className="p-10 lg:w-2/5">
          <div className="lg:sticky lg:top-[120px]">
            <LetterReveal text={title} className={`text-ink ${CIRKA} text-compare-xl tracking-display-sub`} />
          </div>
        </div>
        <div className="px-10 py-2 lg:w-3/5 lg:pl-0">{list}</div>
      </section>
    )
  }

  if (title && (look === 'rows' || look === 'cards')) {
    // B T7 / T8 sections: H2 Cirka 60/60 centred, max-w 900, 64 above the list (section padding is the page's job)
    return (
      <section data-ui="faq-accordion" className={`flex w-full flex-col items-center gap-16 ${className}`}>
        <h2 className={`mx-auto max-w-[900px] text-center text-ink ${H3_SCALE}`}>{title}</h2>
        {list}
      </section>
    )
  }

  return (
    <div data-ui="faq-accordion" className={className}>
      {list}
    </div>
  )
}
