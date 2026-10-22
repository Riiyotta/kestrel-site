// RuledFrame – SPEC_PAGES_A T5.2 pricing frame: everything from the plans to the compare table sits inside one
// ruled box. Exports the frame plus its two measured rows (PlansRow, Footnotes).
//   Ruled wrapper padding 0 48px (0 on phone; 24px at 810–1199 – derived from the 888px tablet card, not stated).
//   Inner max-w 1280 with a 1px rgba(24,24,24,.07) border on all sides (Framer ::after overlay -> inset ring here).
//   PlansRow: padding 32px 32px 40px (32px 20px 40px phone), radial indigo/magenta/sun glow bg; cards flush (each
//   draws its own 1px rule, so shared edges read as a grid); stacked with no gap below 1200.
//   Footnotes: padding 20px 40px (16px 20px phone), top rule; left note Ginto 14/18 #666, right an underlined
//   14/18 #4348DC link.
// No motion.

export default function RuledFrame({ children, className = '' }) {
  return (
    <div data-ui="ruled-frame" className={`w-full px-0 md:px-6 lg:px-12 ${className}`}>
      <div className="relative mx-auto max-w-container after:pointer-events-none after:absolute after:inset-0 after:z-[3] after:shadow-[inset_0_0_0_1px_theme(colors.rule-soft)]">
        {children}
      </div>
    </div>
  )
}

export function PlansRow({ children, className = '' }) {
  return <div className={`flex flex-col bg-plans-glow px-5 pb-10 pt-8 md:px-8 lg:flex-row ${className}`}>{children}</div>
}

export function Footnotes({ note, link, className = '' }) {
  return (
    <div className={`flex flex-col gap-2 px-5 py-4 shadow-[inset_0_1px_0_theme(colors.rule-soft)] md:flex-row md:items-center md:justify-between md:px-10 md:py-5 ${className}`}>
      <p className="font-sans text-small text-muted">{note}</p>
      {link ? (
        <a href={link.href || '#'} className="font-sans text-small text-brand-indigo underline">
          {link.label}
        </a>
      ) : null}
    </div>
  )
}
