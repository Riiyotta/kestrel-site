import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Button from '../Button.jsx'
import { BAND_SPRING } from '../../lib/uiMotion.js'
import { CIRKA, QUOTE_SCALE } from './type.js'

// CompareTable – one component for the three comparison tables, sharing one data shape (src/data/types.js:
// columns: CompareColumn[] (columns[0] = the label column), groups: CompareGroup[] of rows with values aligned to
// columns[1..]) and one cell renderer (CellValue: true / false / string / { text, note, align }).
//
// variant "grid" (SPEC_PAGES_B T7 competitor index): max-w 1280, header -> rows gap 20, rows gap 10. Sticky header
//   (top 120): 3 equal columns gap 10, padding 20px 0, bg rgba(255,255,255,.2) + blur 20, radius 8; cells pl 12,
//   Cirka 30/30 −1.2 (28 / 26 / 24). Rows: label cell bg #F7F7F7 radius 4 padding 20, Ginto 16/22.4 #000, centred
//   vertically; value cells bg #FBFBFB radius 4 padding 20px 10px, Ginto 16/22.4 #666 (14/19.6 at 810–1199).
//   Phone: label cell full width, then the value cells two-up; header keeps the value columns only.
// variant "matrix" (SPEC_PAGES_B T8 competitor detail): max-w 1200, bg #FFF, radius 16, 1px #E5E7EB, soft shadow,
//   overflow hidden. Head row 62 tall bg #FAFAFB: empty label column (479) + two 359 columns (first tinted
//   rgba(79,70,229,.04)); titles w500 16/20.8 −0.16 #111827 centred. Rows: bottom 1px #F3F4F6; label w500 15/21
//   #111827 (padding 18px 16px 18px 24px); values centred – 24px status icon (yes: #34D399 circle + white check;
//   no / partial: #FB7185 circle + white bar) or text 14/19.6 #374151. Row hover tint exists live
//   (background-color .16s) but its colour was not captured: no hover here. Phone: one card per row (radius 12,
//   1px #E5E7EB) – label, then "us" / "them" sub-rows (14px #6B7280 label left, value right, 1px #F3F4F6 rule);
//   card padding not measured (16 used).
// variant "pricing" (SPEC_PAGES_A T5.3): top rule rgba(24,24,24,.07). Sticky header (top 0, z 2, bg #FFF,
//   padding-top 100, top + bottom rules): title column 420 (padding 32px 20px 32px 40px, Cirka 40/36 −1.6) + plan
//   columns 280/280/300 (padding 32px 20px, last 32px 40px 32px 20px, gap 6, side rules): plan name Ginto Medium
//   16/18, price Cirka 30/30 (28 / 26 / 24) + "/mo" 14/18 #666, full-width Button dark lg. Accordion bands (one per
//   group, first open): 66 tall, padding 20px 40px, bg #FBFBFB, bottom rule, label Ginto 20/26 (16/20.8 phone),
//   20x20 plus/minus (vertical bar collapses to 0 when open); panel height spring {duration .45, bounce 0}; no
//   hover. Rows: bottom rule; feature cell 14/18 #000 (padding 16px 20px 16px 40px; underlined when it has an
//   href); plan cells padding 16px 20px (last 16px 40px 16px 20px), right rule: text 14/18 #666, right-aligned
//   value 14/18 #000, optional note 11/11 −0.22 #666, or a 20x20 check (`true`). `false` renders an empty cell
//   (not on live). <1200: horizontal scroll (inner 940 tablet / 820 phone – column split derived from the
//   desktop ratio) with a sticky-left first column (240 / 150 wide, padding 24px 16px 24px 24px /
//   20px 12px 20px 20px, z 3, bg #FFF). Whether the header still sticks vertically there was not measured
//   (inside the scroller it does not).

function StatusIcon({ ok }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-label={ok ? 'Yes' : 'No'} className={ok ? 'text-matrix-yes' : 'text-matrix-no'}>
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      {ok ? (
        <path d="M7 12.5 10.5 16 17 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      ) : (
        <rect x="7" y="10.75" width="10" height="2.5" rx="1.25" fill="white" />
      )}
    </svg>
  )
}

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" role="img" aria-label="Included" className="text-ink">
      <path d="M4.5 10.5 8 14l7.5-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// Shared cell renderer. `look` picks the icon set and text tokens per variant.
export function CellValue({ value, look }) {
  if (look === 'matrix') {
    if (value === true) return <StatusIcon ok />
    if (value === false || value === 'partial') return <StatusIcon ok={false} />
    return <span className="font-sans text-para-14-phone text-matrix-value">{typeof value === 'object' ? value.text : value}</span>
  }
  if (look === 'pricing') {
    if (value === true) return <Check />
    if (value === false || value == null) return null
    const v = typeof value === 'object' ? value : { text: value }
    // `value` (optional, added for A T5.3 live cells like "Support package … Included"): grey text on the left and a
    // right-aligned 14/18 #000 value in the same cell, note underneath.
    if (v.value != null) {
      return (
        <span className="flex flex-col gap-1">
          <span className="flex items-start justify-between gap-4">
            <span className="font-sans text-small text-muted">{v.text}</span>
            <span className="shrink-0 text-right font-sans text-small text-ink">{v.value}</span>
          </span>
          {v.note ? <span className="font-sans text-new-tag text-muted">{v.note}</span> : null}
        </span>
      )
    }
    return (
      <span className={`flex flex-col gap-1 ${v.align === 'right' ? 'items-end text-right' : ''}`}>
        <span className={`font-sans text-small ${v.align === 'right' ? 'text-ink' : 'text-muted'}`}>{v.text}</span>
        {v.note ? <span className="font-sans text-new-tag text-muted">{v.note}</span> : null}
      </span>
    )
  }
  if (value === true) return <span>Yes</span>
  if (value === false) return <span>No</span>
  return <span>{typeof value === 'object' ? value.text : value}</span>
}

const rows = (groups) => groups.flatMap((g) => g.rows)

/* ---------- grid ---------- */
function GridTable({ columns, groups }) {
  const valueCols = columns.slice(1)
  return (
    <div data-ui="compare-table" data-variant="grid" className="mx-auto flex w-full max-w-container flex-col gap-5">
      <div className="sticky top-[120px] z-[2] grid grid-cols-2 gap-2.5 rounded-sm bg-grid-head py-5 backdrop-blur-ticket md:grid-cols-3">
        {columns.map((c, i) => (
          <div key={c.key} className={`pl-3 text-ink ${QUOTE_SCALE} ${i === 0 ? 'hidden md:block' : ''}`}>
            {c.label}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {rows(groups).map((r, ri) => (
          <div key={ri} className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
            <div className="col-span-2 flex items-center rounded-xs bg-tag-bg p-5 font-sans text-body-16 text-ink md:col-span-1 md:text-para-14-phone lg:text-body-16">
              {r.label}
            </div>
            {valueCols.map((c, ci) => (
              <div key={c.key} className="rounded-xs bg-meta-card px-2.5 py-5 font-sans text-body-16 text-muted md:text-para-14-phone lg:text-body-16">
                <CellValue value={r.values[ci]} look="grid" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- matrix ---------- */
function MatrixTable({ columns, groups }) {
  const [, us, them] = columns
  const all = rows(groups)
  return (
    <div data-ui="compare-table" data-variant="matrix" className="mx-auto w-full max-w-[1200px]">
      {/* md+: real table layout */}
      <div className="hidden overflow-hidden rounded-card border border-matrix-border bg-white shadow-matrix md:block">
        <div className="grid h-[62px] grid-cols-[479fr_359fr_359fr] border-b border-matrix-border bg-matrix-head">
          <div className="py-5 pl-6 pr-4" />
          <div className="flex items-center justify-center bg-matrix-us font-sans font-medium text-matrix-title text-matrix-text">{us.label}</div>
          <div className="flex items-center justify-center font-sans font-medium text-matrix-title text-matrix-text">{them.label}</div>
        </div>
        {all.map((r, i) => (
          <div key={i} className={`grid min-h-[57px] grid-cols-[479fr_359fr_359fr] transition-colors duration-[160ms] ${i < all.length - 1 ? 'border-b border-matrix-row' : ''}`}>
            <div className="flex items-center py-[18px] pl-6 pr-4 font-sans font-medium text-matrix-label text-matrix-text">{r.label}</div>
            <div className="flex items-center justify-center bg-matrix-us px-4 py-[18px] text-center">
              <CellValue value={r.values[0]} look="matrix" />
            </div>
            <div className="flex items-center justify-center py-[18px] pl-4 pr-6 text-center">
              <CellValue value={r.values[1]} look="matrix" />
            </div>
          </div>
        ))}
      </div>
      {/* phone: one card per row */}
      <div className="flex flex-col gap-3 md:hidden">
        {all.map((r, i) => (
          <div key={i} className="rounded-playbook border border-matrix-border bg-white p-4">
            <p className="pb-3 font-sans font-medium text-matrix-label text-matrix-text">{r.label}</p>
            {[us, them].map((c, ci) => (
              <div key={c.key} className="flex items-center justify-between gap-4 border-t border-matrix-row py-3">
                <span className="font-sans text-small text-matrix-sub">{c.label}</span>
                <span className="text-right">
                  <CellValue value={r.values[ci]} look="matrix" />
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- pricing ---------- */
// first column 150 / 240 / 420fr; plan columns split the rest in the desktop 280:280:300 ratio
const COLS = 'grid-cols-[150px_220px_220px_230px] md:grid-cols-[240px_228px_228px_244px] lg:grid-cols-[420fr_280fr_280fr_300fr]'
const STICKY_FIRST = 'sticky left-0 z-[3] bg-white lg:static'
const RULE_B = 'shadow-[inset_0_-1px_0_theme(colors.rule-soft)]'

function PlusMinus({ open, reduce }) {
  return (
    <span aria-hidden="true" className="relative flex h-5 w-5 shrink-0 items-center justify-center">
      <span className="absolute h-px w-3 bg-ink" />
      <motion.span className="absolute w-px bg-ink" initial={false} animate={{ height: open ? 0 : 12 }} transition={reduce ? { duration: 0 } : BAND_SPRING} />
    </span>
  )
}

function PricingTable({ columns, groups, title }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(() => new Set(groups.map((g, i) => (g.open ?? i === 0 ? i : -1)).filter((i) => i >= 0)))
  const plans = columns.slice(1)
  const lastPad = (i) => (i === plans.length - 1 ? 'lg:pl-5 lg:pr-10' : 'lg:px-5')
  return (
    <div data-ui="compare-table" data-variant="pricing" className="w-full shadow-[inset_0_1px_0_theme(colors.rule-soft)]">
      <div className="ui-noscrollbar overflow-x-auto lg:overflow-visible">
        <div className="min-w-[820px] md:min-w-[940px] lg:min-w-0">
          {/* sticky header */}
          <div className={`sticky top-0 z-[2] grid bg-white pt-[100px] ${COLS}`}>
            <div className={`${STICKY_FIRST} py-6 pl-5 pr-3 shadow-[inset_0_1px_0_theme(colors.rule-soft),inset_0_-1px_0_theme(colors.rule-soft)] md:py-6 md:pl-6 md:pr-4 lg:py-8 lg:pl-10 lg:pr-5`}>
              <h2 className={`${CIRKA} text-compare-lg tracking-display-sub text-ink xl:text-compare-xl xl:tracking-display-sub`}>{title || columns[0].label}</h2>
            </div>
            {plans.map((p, i) => (
              <div
                key={p.key}
                className={`flex flex-col gap-1.5 px-5 py-8 shadow-[inset_1px_0_0_theme(colors.rule-soft),inset_0_1px_0_theme(colors.rule-soft),inset_0_-1px_0_theme(colors.rule-soft)] ${lastPad(i)}`}
              >
                <p className="font-sans font-medium text-tag text-ink">{p.label}</p>
                <p className="flex items-end gap-1">
                  <span className={`text-ink ${QUOTE_SCALE}`}>{p.price}</span>
                  {p.per ? <span className="font-sans text-small text-muted">{p.per}</span> : null}
                </p>
                {p.cta ? (
                  <Button variant="dark" href={p.cta.href || '#'} className="mt-1.5 w-full">
                    {p.cta.label}
                  </Button>
                ) : null}
              </div>
            ))}
          </div>

          {groups.map((g, gi) => {
            const isOpen = open.has(gi)
            return (
              <div key={gi}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpen((prev) => {
                      const next = new Set(prev)
                      if (next.has(gi)) next.delete(gi)
                      else next.add(gi)
                      return next
                    })
                  }
                  className={`flex h-[66px] w-full items-center bg-meta-card px-5 py-5 md:px-10 ${RULE_B}`}
                >
                  {/* label + icon stay in view while the table scrolls sideways (<1200) */}
                  <span className="sticky left-5 flex w-[calc(100vw-40px)] max-w-full items-center justify-between gap-4 md:left-10 md:w-[calc(100vw-80px)] lg:static lg:w-full">
                    <span className="font-sans text-body-16-md text-ink md:text-body-20">{g.label}</span>
                    <PlusMinus open={isOpen} reduce={reduce} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="rows"
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={reduce ? { duration: 0 } : BAND_SPRING}
                      className="overflow-hidden"
                    >
                      {g.rows.map((r, ri) => (
                        <div key={ri} className={`grid ${COLS} ${RULE_B}`}>
                          <div className={`${STICKY_FIRST} py-5 pl-5 pr-3 font-sans text-small text-ink md:py-6 md:pl-6 md:pr-4 lg:py-4 lg:pl-10 lg:pr-5 ${RULE_B}`}>
                            {r.href ? (
                              <a href={r.href} className="underline">
                                {r.label}
                              </a>
                            ) : (
                              r.label
                            )}
                          </div>
                          {plans.map((p, pi) => (
                            <div key={p.key} className={`px-5 py-4 shadow-[inset_-1px_0_0_theme(colors.rule-soft)] ${lastPad(pi)}`}>
                              <CellValue value={r.values[pi]} look="pricing" />
                            </div>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function CompareTable({ variant = 'grid', columns = [], groups = [], title, className = '' }) {
  const Table = variant === 'matrix' ? MatrixTable : variant === 'pricing' ? PricingTable : GridTable
  return (
    <div className={className}>
      <Table columns={columns} groups={groups} title={title} />
    </div>
  )
}
