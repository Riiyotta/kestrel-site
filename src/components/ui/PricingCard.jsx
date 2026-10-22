import Button from '../Button.jsx'
import { H3_SCALE, QUOTE_SCALE } from './type.js'

// PricingCard – SPEC_PAGES_A P6 (T5.2). Sits inside RuledFrame > PlansRow, flush with its neighbours.
//   405x697 @1440, 373x685 @1280, full width below 1200 (888 @1000, 350 @390). bg #FFF, own 1px
//   rgba(24,24,24,.07) rule, padding 32px 28px 36px (32px 24px 36px tablet, 32px 20px 36px phone), column:
//   plan name Cirka 30/30 −1.2 (28 / 26 / 24) -> price row (pt 28, gap 10): price Cirka 60/60 −2.4 (50 / 40 /
//   40/36) + "/mo" Ginto 16/22.4 #666 on the baseline (pb 12) -> billing note (pt 10) 14/18 #666 -> CTA (pt 24)
//   full-width Button dark lg -> "best for" (pt 28) 16/22.4 #000 -> divider (32px 0 24px, 1px rule) -> rate
//   groups: label (16px 0 6px) 16/22.4 #000, rows (4px 0, gap 16) 14/18 #666 label + 14/18 #000 value right
//   -> "view all features ↓" (pt 32) 14/18 #000, 6px gap arrow, jumps to the compare table.
//   The live per-row tooltip is empty and never shows: skipped.
// No hover beyond the Button's own, no motion.

export default function PricingCard({ name, price, per = '/mo', note, cta, bestFor, groups = [], featuresHref = '#compare', featuresLabel = 'View all features', className = '' }) {
  return (
    <article
      data-ui="pricing-card"
      className={`relative flex flex-col bg-white px-5 pb-9 pt-8 shadow-[inset_0_0_0_1px_theme(colors.rule-soft)] md:px-6 lg:flex-1 lg:px-7 ${className}`}
    >
      <h2 className={`text-ink ${QUOTE_SCALE}`}>{name}</h2>
      <div className="flex items-end gap-2.5 pt-7">
        <span className={`text-ink ${H3_SCALE}`}>{price}</span>
        {per ? <span className="pb-3 font-sans text-body-16 text-muted">{per}</span> : null}
      </div>
      {note ? <p className="pt-2.5 font-sans text-small text-muted">{note}</p> : null}
      {cta ? (
        <div className="pt-6">
          <Button variant="dark" href={cta.href || '#'} className="w-full">
            {cta.label}
          </Button>
        </div>
      ) : null}
      {bestFor ? <p className="pt-7 font-sans text-body-16 text-ink">{bestFor}</p> : null}
      <div className="pb-6 pt-8" aria-hidden="true">
        <div className="h-px w-full bg-rule-soft" />
      </div>
      {groups.map((g, gi) => (
        <div key={gi}>
          <p className="pb-1.5 pt-4 font-sans text-body-16 text-ink">{g.label}</p>
          {g.rows.map((r, ri) => (
            <div key={ri} className="flex justify-between gap-4 py-1">
              <span className="font-sans text-small text-muted">{r.label}</span>
              <span className="text-right font-sans text-small text-ink">{r.value}</span>
            </div>
          ))}
        </div>
      ))}
      <a href={featuresHref} className="flex items-center gap-1.5 pt-8 font-sans text-small text-ink">
        {featuresLabel}
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
          <path d="M5 1v10M1.5 7.5 5 11l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </article>
  )
}
